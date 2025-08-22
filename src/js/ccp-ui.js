// File 2 of 3: ccp-ui.js (The View)
// This file holds the HTML template and the master rendering function.

const ccpHtmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Amazon Connect CCP</title>
        <link rel="stylesheet" href="src/css/style.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    </head>
    <body class="ccp-body">
        <header class="ccp-header">
            <div class="ccp-status-dropdown" id="status-dropdown">
                <i class="fa-solid fa-microphone"></i>
                <span id="agent-status-text">Available</span>
                <i class="fa-solid fa-chevron-down"></i>
                <div class="ccp-status-menu" id="status-menu">
                    <div class="ccp-status-menu-item" data-status="Available">Available</div>
                    <div class="ccp-status-menu-item" data-status="Lunch">Lunch</div>
                    <div class="ccp-status-menu-item" data-status="Break">Break</div>
                    <div class="ccp-status-menu-item" data-status="Offline">Offline</div>
                </div>
            </div>
            <div class="ccp-header-icons">
                <i class="fa-solid fa-phone" id="header-numpad-btn"></i>
                <i class="fa-solid fa-gear"></i>
            </div>
        </header>
        
        <main class="ccp-main">
            <div class="ccp-view" id="welcome-view">
                <h2>Welcome Harshil</h2>
                <div class="welcome-icon"><i class="fa-regular fa-comments"></i></div>
                <div class="idle-controls">
                    <button id="idle-quick-connects-btn"><i class="fa-solid fa-users"></i> Quick connects</button>
                    <button id="idle-numpad-btn"><i class="fa-solid fa-grip"></i> Number pad</button>
                </div>
            </div>

            <div class="ccp-view hidden" id="incoming-call-view">
                <div class="incoming-call-info">
                    <strong id="incoming-number-display">+1 541-979-2208</strong><br>
                    Incoming call
                </div>
                <div class="incoming-call-actions">
                    <button id="accept-call-btn"><i class="fa-solid fa-check"></i> Accept call</button>
                    <button id="reject-call-btn"><i class="fa-solid fa-xmark"></i> Reject call</button>
                </div>
            </div>

            <div class="ccp-view hidden" id="call-view">
                <div id="multi-call-container"></div>
                <div class="call-controls" id="single-call-controls">
                    <button id="hold-resume-btn"><i class="fa-solid fa-pause"></i> <span>Hold</span></button>
                    <button id="mute-unmute-btn"><i class="fa-solid fa-microphone-slash"></i> <span>Mute</span></button>
                    <button id="numpad-btn"><i class="fa-solid fa-grip"></i> Number pad</button>
                    <button id="quick-connects-btn"><i class="fa-solid fa-users"></i> Quick connects</button>
                </div>
                <div class="call-controls hidden" id="multi-call-controls">
                    <button id="hold-all-btn"><i class="fa-solid fa-pause"></i> Hold All</button>
                    <button id="mute-btn-multi"><i class="fa-solid fa-microphone-slash"></i> Mute</button>
                    <button id="join-btn"><i class="fa-solid fa-people-arrows"></i> Join</button>
                    <button id="swap-btn"><i class="fa-solid fa-right-left"></i> Swap</button>
                    <button id="numpad-btn-multi"><i class="fa-solid fa-grip"></i> Number pad</button>
                </div>
                <div class="call-controls hidden" id="conference-controls">
                    <button id="conf-hold-all-btn"><i class="fa-solid fa-pause"></i> Hold All</button>
                    <button id="conf-mute-btn"><i class="fa-solid fa-microphone-slash"></i> Mute</button>
                    <button id="conf-numpad-btn"><i class="fa-solid fa-grip"></i> Number pad</button>
                </div>
                <div class="end-call-container">
                    <button id="end-leave-call-btn"><i class="fa-solid fa-phone-slash"></i> End call</button>
                </div>
            </div>

            <div class="ccp-view hidden" id="acw-view">
                <div class="acw-info">
                    <div id="acw-number-display"></div>
                    <div><span>After call work</span><span id="acw-timer">00:10</span></div>
                </div>
                <div class="acw-controls">
                    <button id="acw-numpad-btn"><i class="fa-solid fa-grip"></i> Number pad</button>
                    <button id="acw-quick-connects-btn"><i class="fa-solid fa-users"></i> Quick connects</button>
                </div>
                <div class="close-contact-container">
                    <button id="close-contact-btn">Close contact</button>
                </div>
            </div>

            <div class="ccp-overlay hidden" id="numpad-overlay">
                <div class="ccp-overlay-header">
                    <h3>Number pad</h3>
                    <i class="fa-solid fa-xmark" id="close-numpad-btn"></i>
                </div>
                <div class="ccp-numpad-grid">
                    <button>1</button><button>2</button><button>3</button>
                    <button>4</button><button>5</button><button>6</button>
                    <button>7</button><button>8</button><button>9</button>
                    <button>*</button><button>0</button><button>#</button>
                </div>
            </div>
            <div class="ccp-overlay hidden" id="quick-connects-overlay">
                <div class="ccp-overlay-header">
                    <h3>Quick connects</h3>
                    <i class="fa-solid fa-xmark" id="close-quick-connects-btn"></i>
                </div>
                <div class="ccp-quick-connects-list">
                    <div class="qc-item">AETX - Customer Service</div>
                    <div class="qc-item">AWK - IVR</div>
                    <div class="qc-item">BGE - Customer Service</div>
                    <div class="qc-item">CEB - Cust Service (Power)</div>
                </div>
            </div>
        </main>
    </body>
    </html>
`;

function injectCCPHTML(ccpWin) {
    ccpWin.document.write(ccpHtmlTemplate);
    ccpWin.document.close();
}

function renderCCP() {
    if (!appState.ccpWindow || appState.ccpWindow.closed) return;

    const doc = appState.ccpWindow.document;
    const views = ['welcome-view', 'incoming-call-view', 'call-view', 'acw-view'];
    views.forEach(id => doc.getElementById(id)?.classList.add('hidden'));

    if (appState.isIncoming) {
        doc.getElementById('incoming-call-view').classList.remove('hidden');
        doc.getElementById('incoming-number-display').textContent = appState.incomingCallNumber;
    } else if (appState.calls.length > 0) {
        doc.getElementById('call-view').classList.remove('hidden');
        renderCallView(doc);
    } else if (appState.isInACW) {
        doc.getElementById('acw-view').classList.remove('hidden');
    } else {
        doc.getElementById('welcome-view').classList.remove('hidden');
    }

    doc.getElementById('numpad-overlay')?.classList.toggle('hidden', appState.activePanel !== 'numpad');
    doc.getElementById('quick-connects-overlay')?.classList.toggle('hidden', appState.activePanel !== 'quickConnects');
}

/**
 * Renders the detailed view when one or more calls are active.
 * @param {Document} doc - The document object of the pop-up window.
 */
function renderCallView(doc) {
    const callCount = appState.calls.length;
    const container = doc.getElementById('multi-call-container');
    container.innerHTML = ''; 

    appState.calls.forEach(call => {
        const strip = document.createElement('div');
        let statusText = call.status.charAt(0).toUpperCase() + call.status.slice(1);
        if (call.status === 'onHold') statusText = 'On hold';
        
        strip.className = `call-strip status-${call.status}`;

        // ::: BUG FIX & STYLE UPDATE :::
        // This HTML is updated to match the new stacked layout and font style.
        strip.innerHTML = `
            <div class="call-strip-info">
                <div class="call-strip-left-stack">
                    <div class="call-strip-number">
                        <i class="fa-solid fa-phone"></i>
                        <span>${call.phoneNumber}</span>
                    </div>
                    <div class="call-strip-timer" id="timer-${call.id}">
                        <i class="fa-solid fa-clock"></i>
                        <span>00:00</span>
                    </div>
                </div>
            </div>
            <div class="call-strip-status">
                <span>${statusText}</span>
                <i class="fa-solid fa-xmark drop-call-btn" data-id="${call.id}"></i>
            </div>
        `;
        container.appendChild(strip);
    });

    // --- The rest of this function has no changes ---
    const singleControls = doc.getElementById('single-call-controls');
    const multiControls = doc.getElementById('multi-call-controls');
    const confControls = doc.getElementById('conference-controls');
    const endLeaveBtn = doc.getElementById('end-leave-call-btn');

    singleControls.classList.toggle('hidden', callCount !== 1);
    multiControls.classList.toggle('hidden', callCount < 2 || appState.isConferenced);
    confControls.classList.toggle('hidden', !appState.isConferenced);

    if (callCount === 1) {
        const call = appState.calls[0];
        const holdBtn = doc.getElementById('hold-resume-btn');
        const muteBtn = doc.getElementById('mute-unmute-btn');

        if (call.status === 'onHold') {
            holdBtn.classList.add('active');
            holdBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Resume</span>`;
        } else {
            holdBtn.classList.remove('active');
            holdBtn.innerHTML = `<i class="fa-solid fa-pause"></i> <span>Hold</span>`;
        }

        if (appState.isMuted) {
            muteBtn.classList.add('active');
            muteBtn.innerHTML = `<i class="fa-solid fa-microphone"></i> <span>Unmute</span>`;
        } else {
            muteBtn.classList.remove('active');
            muteBtn.innerHTML = `<i class="fa-solid fa-microphone-slash"></i> <span>Mute</span>`;
        }
    }

    endLeaveBtn.innerHTML = `<i class="fa-solid fa-phone-slash"></i> ${callCount > 1 ? 'Leave call' : 'End call'}`;
}