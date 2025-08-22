// File 3 of 3: ccp-state.js (The Brain)
// Defines the application state and all functions that manipulate it.

const appState = {
    ccpWindow: null,
    agentStatus: 'Available',
    calls: [],
    isMuted: false,
    activePanel: 'none',
    isConferenced: false,
    isIncoming: false,
    isInACW: false,
    acwTimerInterval: null,
    acwTimeRemaining: 10,
    incomingCallNumber: '+1 541-979-2208',
    outboundCallNumber: '+1 888-221-7070',
};

function logMessage(type, details) {
    const logTableBody = document.getElementById('log-table-body');
    if (!logTableBody) return;
    const timestamp = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit'});
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const newRow = logTableBody.insertRow(0);
    newRow.innerHTML = `<td>${currentDate}, ${timestamp}</td><td>${type}</td><td>${details}</td>`;
};

function resetState() {
    appState.calls = [];
    appState.isMuted = false;
    appState.isConferenced = false;
    appState.isIncoming = false;
    appState.isInACW = false;
    clearInterval(appState.acwTimerInterval);
}

function startTimer(call) {
    call.startTime = Date.now();
    call.timerInterval = setInterval(() => {
        if (appState.ccpWindow && !appState.ccpWindow.closed) {
            const elapsed = Math.floor((Date.now() - call.startTime) / 1000);
            const timerEl = appState.ccpWindow.document.getElementById(`timer-${call.id}`);
            if (timerEl) timerEl.textContent = formatTime(elapsed);
        } else {
            clearInterval(call.timerInterval);
        }
    }, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function setIncomingCall() {
    appState.isIncoming = true;
    logMessage('Simulation', `Incoming call from ${appState.incomingCallNumber}`);
    renderCCP();
}

function acceptCall() {
    appState.isIncoming = false;
    const newCall = { id: Date.now(), phoneNumber: appState.incomingCallNumber, status: 'connected' };
    appState.calls.push(newCall);
    startTimer(newCall);
    logMessage('Call Event', `Accepted call from ${newCall.phoneNumber}`);
    renderCCP();
}

function addSecondCall() {
    if (appState.calls.length !== 1) return;
    appState.calls[0].status = 'onHold';
    const newCall = { id: Date.now(), phoneNumber: appState.outboundCallNumber, status: 'connected' };
    appState.calls.push(newCall);
    startTimer(newCall);
    logMessage('Call Event', `Adding 2nd call to ${newCall.phoneNumber}. First call on hold.`);
    renderCCP();
}

function swapCalls() {
    if (appState.calls.length !== 2 || appState.isConferenced) return;
    const status1 = appState.calls[0].status;
    appState.calls[0].status = appState.calls[1].status;
    appState.calls[1].status = status1;
    logMessage('Call Event', `Swapped calls.`);
    renderCCP();
}

function joinCalls() {
    if (appState.calls.length < 2) return;
    appState.isConferenced = true;
    appState.calls.forEach(call => { call.status = 'joined' });
    logMessage('Call Event', `Calls joined in conference.`);
    renderCCP();
}

function dropCall(callId) {
    const callIndex = appState.calls.findIndex(c => c.id === callId);
    if (callIndex === -1) return;
    const droppedCall = appState.calls[callIndex];
    clearInterval(droppedCall.timerInterval);
    appState.calls.splice(callIndex, 1);
    logMessage('Call Event', `Dropped call with ${droppedCall.phoneNumber}`);
    if (appState.calls.length < 2) appState.isConferenced = false;
    if (appState.calls.length === 1) appState.calls[0].status = 'connected';
    if (appState.calls.length === 0) {
        startACW();
    } else {
        renderCCP();
    }
}

function leaveCall() {
    logMessage('Call Event', 'Agent left all calls. Entering ACW.');
    appState.calls.forEach(call => clearInterval(call.timerInterval));
    startACW();
}

function startACW() {
    // Capture the numbers before clearing the calls array
    const lastCallNumbers = appState.calls.map(c => c.phoneNumber).join(', ');
    if (appState.ccpWindow && !appState.ccpWindow.closed) {
        appState.ccpWindow.document.getElementById('acw-number-display').innerHTML = `<strong>${lastCallNumbers}</strong>`;
    }

    resetState();
    appState.isInACW = true;
    appState.acwTimeRemaining = 10;
    
    appState.acwTimerInterval = setInterval(() => {
        appState.acwTimeRemaining--;
        if (appState.ccpWindow && !appState.ccpWindow.closed) {
            const timerEl = appState.ccpWindow.document.getElementById('acw-timer');
            if (timerEl) timerEl.textContent = formatTime(appState.acwTimeRemaining);
        }
        if (appState.acwTimeRemaining <= 0) {
            endACW();
        }
    }, 1000);
    renderCCP();
}

function endACW() {
    logMessage('System', 'ACW ended. Agent is now idle.');
    resetState();
    renderCCP();
}

function toggleHoldIndividual(callId) {
    const call = appState.calls.find(c => c.id === callId);
    if (!call) return;
    call.status = call.status === 'onHold' ? 'connected' : 'onHold';
    logMessage('Call Event', `Call is now ${call.status === 'onHold' ? 'On hold' : 'Resumed'}.`);
    renderCCP();
}

function toggleMute() {
    appState.isMuted = !appState.isMuted;
    logMessage('Agent Event', `Agent is now ${appState.isMuted ? 'muted' : 'unmuted'}.`);
    renderCCP();
}

function changeAgentStatus(newStatus) {
    appState.agentStatus = newStatus;
    const doc = appState.ccpWindow.document;
    doc.getElementById('agent-status-text').textContent = newStatus;
    logMessage('Agent Event', `Status changed to: ${newStatus}`);
    doc.getElementById('status-menu').style.display = 'none';
}

function openOverlay(panelName) {
    appState.activePanel = panelName;
    logMessage('UI Event', `${panelName} panel opened.`);
    renderCCP();
}

function closeOverlays() {
    if (appState.activePanel !== 'none') {
        logMessage('UI Event', `${appState.activePanel} panel closed.`);
        appState.activePanel = 'none';
        renderCCP();
    }
}

function initializeCCPEvents() {
    const doc = appState.ccpWindow.document;

    // Status Dropdown
    const statusDropdown = doc.getElementById('status-dropdown');
    const statusMenu = doc.getElementById('status-menu');
    statusDropdown.addEventListener('click', (event) => { event.stopPropagation(); statusMenu.style.display = statusMenu.style.display === 'block' ? 'none' : 'block'; });
    statusMenu.addEventListener('click', (event) => { if (event.target.classList.contains('ccp-status-menu-item')) { changeAgentStatus(event.target.dataset.status); } });
    doc.body.addEventListener('click', () => { if (statusMenu.style.display === 'block') statusMenu.style.display = 'none'; });

    // Idle View
    doc.getElementById('idle-numpad-btn').addEventListener('click', () => openOverlay('numpad'));
    doc.getElementById('idle-quick-connects-btn').addEventListener('click', () => openOverlay('quickConnects'));

    // Call Lifecycle
    doc.getElementById('accept-call-btn').addEventListener('click', acceptCall);
    doc.getElementById('reject-call-btn').addEventListener('click', () => { appState.isIncoming = false; renderCCP(); });
    doc.getElementById('end-leave-call-btn').addEventListener('click', leaveCall);
    doc.getElementById('close-contact-btn').addEventListener('click', endACW);

    // Single-Call Controls
    doc.getElementById('hold-resume-btn').addEventListener('click', () => { if (appState.calls[0]) toggleHoldIndividual(appState.calls[0].id); });
    doc.getElementById('mute-unmute-btn').addEventListener('click', toggleMute);
    doc.getElementById('numpad-btn').addEventListener('click', addSecondCall);
    doc.getElementById('quick-connects-btn').addEventListener('click', () => openOverlay('quickConnects'));

    // Multi-Call Controls
    doc.getElementById('swap-btn').addEventListener('click', swapCalls);
    doc.getElementById('join-btn').addEventListener('click', joinCalls);
    
    // Overlay Close Buttons
    doc.getElementById('close-numpad-btn').addEventListener('click', closeOverlays);
    doc.getElementById('close-quick-connects-btn').addEventListener('click', closeOverlays);
    
    // Delegated listener for drop buttons
    doc.getElementById('multi-call-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('drop-call-btn')) {
            const callId = parseInt(e.target.dataset.id, 10);
            dropCall(callId);
        }
    });
}