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
                    <strong id="incoming-number-display"></strong><br>
                    Incoming call
                </div>
                <div class="incoming-call-actions">
                    <button id="accept-call-btn"><i class="fa-solid fa-check"></i> Accept call</button>
                    <button id="reject-call-btn"><i class="fa-solid fa-xmark"></i> Reject call</button>
                </div>
            </div>

            <div class="ccp-view hidden" id="call-view">
                <div id="multi-call-container"></div>
                <div id="call-context-display"></div>
                <div class="ccp-footer-actions">
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
                        <button id="transfer-btn"><i class="fa-solid fa-phone-arrow-right"></i> Transfer</button>
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
                <div class="numpad-body">
                    <div class="numpad-input-wrapper">
                        <label for="numpad-input">Phone number</label>
                        <div class="numpad-input-field">
                            <i class="fa-solid fa-flag-usa"></i>
                            <input type="text" id="numpad-input" placeholder="Enter a phone number" readonly>
                        </div>
                    </div>
                    <div class="ccp-numpad-grid">
                        <button>1</button>
                        <button>2<span class="numpad-letters">ABC</span></button>
                        <button>3<span class="numpad-letters">DEF</span></button>
                        <button>4<span class="numpad-letters">GHI</span></button>
                        <button>5<span class="numpad-letters">JKL</span></button>
                        <button>6<span class="numpad-letters">MNO</span></button>
                        <button>7<span class="numpad-letters">PQRS</span></button>
                        <button>8<span class="numpad-letters">TUV</span></button>
                        <button>9<span class="numpad-letters">WXYZ</span></button>
                        <button>*</button>
                        <button>0<span class="numpad-letters">+</span></button>
                        <button>#</button>
                    </div>
                </div>
                <div class="numpad-footer-actions">
                    <button id="numpad-quick-connects-btn" class="numpad-footer-btn"><i class="fa-solid fa-users"></i> Quick connects</button>
                    <button id="numpad-call-btn" class="numpad-footer-btn primary"><i class="fa-solid fa-phone"></i> Call</button>
                </div>
            </div>

            <div class="ccp-overlay hidden" id="quick-connects-overlay">
                <div class="ccp-overlay-header">
                    <h3>Quick connects</h3>
                    <i class="fa-solid fa-xmark" id="close-quick-connects-btn"></i>
                </div>
                <div class="ccp-quick-connects-list"></div>
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
    
    if (appState.activePanel !== 'none' && !appState.isIncoming && appState.calls.length === 0 && !appState.isInACW) {
        appState.activePanel = 'none';
    }

    if (appState.isIncoming) {
        doc.getElementById('incoming-call-view').classList.remove('hidden');
        doc.getElementById('incoming-number-display').textContent = appState.incomingCallNumber;
        if (appState.calls.length === 0) renderCallView(doc);
    } else if (appState.calls.length > 0) {
        doc.getElementById('call-view').classList.remove('hidden');
        renderCallView(doc);
    } else if (appState.isInACW) {
        doc.getElementById('acw-view').classList.remove('hidden');
    } else {
        doc.getElementById('welcome-view').classList.remove('hidden');
    }

    const numpadOverlay = doc.getElementById('numpad-overlay');
    if (numpadOverlay) {
        numpadOverlay.classList.toggle('hidden', appState.activePanel !== 'numpad');
        if (appState.activePanel === 'numpad') {
            // ::: UPDATE: Populate the new input field instead of the old div :::
            const numpadInput = doc.getElementById('numpad-input');
            if (numpadInput) {
                numpadInput.value = appState.outboundDialNumber;
            }

            const callBtnContainer = doc.getElementById('numpad-call-btn');
            const qcBtnContainer = doc.getElementById('numpad-quick-connects-btn');
            if (callBtnContainer && qcBtnContainer) {
                const showOutboundControls = appState.isNumpadForOutbound;
                // Only show the footer buttons in outbound dial mode
                callBtnContainer.style.display = showOutboundControls ? 'flex' : 'none';
                qcBtnContainer.style.display = showOutboundControls ? 'flex' : 'none';
            }
        }
    }

    const qcOverlay = doc.getElementById('quick-connects-overlay');
    if (qcOverlay) {
        qcOverlay.classList.toggle('hidden', appState.activePanel !== 'quickConnects');
        if (appState.activePanel === 'quickConnects') {
            const listContainer = doc.querySelector('.ccp-quick-connects-list');
            listContainer.innerHTML = '';
            const isIdle = appState.calls.length === 0;
            const qcsToShow = isIdle 
                ? appState.quickConnects.filter(q => q.type === 'phone') 
                : appState.quickConnects;
            
            qcsToShow.forEach(qc => {
                const item = doc.createElement('div');
                item.className = 'qc-item';
                item.dataset.id = qc.id;
                item.innerHTML = `<i class="fa-solid fa-headset"></i><span>${qc.name}</span>`;
                listContainer.appendChild(item);
            });
        }
    }
}

function renderCallView(doc) {
    const callCount = appState.calls.length;
    const container = doc.getElementById('multi-call-container');
    container.innerHTML = '';

    if (callCount > 0) {
        appState.calls.forEach(call => {
            const strip = doc.createElement('div');
            let statusText = (call.status === 'onHold')
              ? 'On hold'
              : (appState.isConferenced ? 'Conference' : 'Connected call');
            
            strip.className = `call-strip status-${call.status}`;
            strip.innerHTML = `
                <div class="call-strip-info">
                    <div class="call-strip-left-stack">
                        <div class="call-strip-number">
                            <i class="fa-solid fa-phone"></i>
                            <span>${call.phoneNumber}</span>
                        </div>
                        <div class="call-strip-timer">
                            <i class="fa-solid fa-clock"></i>
                            <span id="timer-${call.id}">00:00</span>
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
    }

    const contextContainer = doc.getElementById('call-context-display');
    if (appState.currentCallData) {
        if (appState.currentCallData.error) {
            contextContainer.innerHTML = `<div class="context-error">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>${appState.currentCallData.message}</span>
            </div>`;
        } else {
            const data = appState.currentCallData;
            let linksHTML = '';
            if (data.kbLink) linksHTML += `<a href="${data.kbLink}" target="_blank" class="context-link-btn">KB Link</a>`;
            if (data.adLink) linksHTML += `<a href="${data.adLink}" target="_blank" class="context-link-btn">AD Link</a>`;
            contextContainer.innerHTML = `
                <div class="context-card">
                    <div class="context-item-main">
                        <i class="fa-solid fa-building"></i>
                        <div class="context-text">
                            <span class="context-label">Biller</span>
                            <span class="context-value-large">${data.billerName} (${data.billerTla})</span>
                        </div>
                    </div>
                    <div class="context-item-main">
                        <i class="fa-solid fa-user"></i>
                        <div class="context-text">
                            <span class="context-label">Customer Name</span>
                            <span class="context-value-large">${data.customerName}</span>
                        </div>
                    </div>
                    <div class="context-item">
                        <i class="fa-solid fa-hashtag"></i>
                        <div class="context-text">
                            <span class="context-label">Account Number</span>
                            <span class="context-value">${data.accountNumber}</span>
                        </div>
                        <i class="fa-solid fa-copy copy-icon" title="Copy Account #" data-copy-text="${data.accountNumber}"></i>
                    </div>
                </div>
                <div class="context-card">
                    <div class="context-item">
                        <i class="fa-solid fa-circle-info"></i>
                        <div class="context-text">
                            <span class="context-label">Reason for Call</span>
                            <span class="context-tag">${data.reasonForCall}</span>
                        </div>
                    </div>
                    <div class="context-item">
                        <i class="fa-solid fa-phone-volume"></i>
                         <div class="context-text">
                            <span class="context-label">IVR # / CX Tel</span>
                            <span class="context-value">${data.billerIvrNumber} / ${data.customerTel} (${data.customerState})</span>
                        </div>
                        <i class="fa-solid fa-copy copy-icon" title="Copy Phone #" data-copy-text="${data.customerTel}"></i>
                    </div>
                    <div class="context-item-links">
                        ${linksHTML}
                    </div>
                </div>
            `;
        }
    } else {
        contextContainer.innerHTML = '';
    }

    const singleControls = doc.getElementById('single-call-controls');
    const multiControls = doc.getElementById('multi-call-controls');
    const confControls = doc.getElementById('conference-controls');
    const transferBtn = doc.getElementById('transfer-btn');

    const inConsultState = callCount === 2 && !appState.isConferenced;

    singleControls.classList.toggle('hidden', callCount !== 1);
    multiControls.classList.toggle('hidden', !inConsultState);
    confControls.classList.toggle('hidden', !appState.isConferenced);

    if (transferBtn) {
        transferBtn.style.display = inConsultState ? 'flex' : 'none';
    }

    if (callCount > 0) {
        const holdBtn = doc.getElementById('hold-resume-btn');
        const muteBtn = doc.getElementById('mute-unmute-btn');

        if (appState.calls.some(c => c.status === 'onHold') && callCount === 1) {
            holdBtn?.classList.add('active');
            if(holdBtn) holdBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Resume</span>`;
        } else if (holdBtn) {
            holdBtn.classList.remove('active');
            holdBtn.innerHTML = `<i class="fa-solid fa-pause"></i> <span>Hold</span>`;
        }

        if (appState.isMuted) {
            muteBtn?.classList.add('active');
            doc.getElementById('mute-btn-multi')?.classList.add('active');
            doc.getElementById('conf-mute-btn')?.classList.add('active');
        } else {
            muteBtn?.classList.remove('active');
            doc.getElementById('mute-btn-multi')?.classList.remove('active');
            doc.getElementById('conf-mute-btn')?.classList.remove('active');
        }
    }
}