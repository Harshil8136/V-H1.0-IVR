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
    incomingCallNumber: '',
    outboundCallNumber: '+1 888-221-7070',
    billerData: [],
    simulationData: [],
    currentCallData: null, 
};

function logMessage(type, details) {
    const mainDoc = window.opener ? window.opener.document : window.document;
    const logTableBody = mainDoc.getElementById('log-table-body');
    if (!logTableBody) return;

    const timestamp = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit'});
    const newRow = logTablebody.insertRow(0);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    cell1.textContent = timestamp;
    cell2.textContent = type;
    cell3.textContent = details;
};

function resetState() {
    appState.calls = [];
    appState.isMuted = false;
    appState.isConferenced = false;
    appState.isIncoming = false;
    appState.isInACW = false;
    clearInterval(appState.acwTimerInterval);
    appState.currentCallData = null;
}

function startTimer(call) {
    let elapsedSeconds = 0;
    const updateTimer = () => {
        if (!appState.ccpWindow || appState.ccpWindow.closed) {
            clearInterval(call.timerInterval);
            return;
        }
        const timerEl = appState.ccpWindow.document.getElementById(`timer-${call.id}`);
        if (timerEl) {
            timerEl.textContent = formatTime(elapsedSeconds);
        }
        elapsedSeconds++;
    };
    updateTimer();
    call.timerInterval = setInterval(updateTimer, 1000);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function setIncomingCall(billerId) {
    const sim = appState.simulationData.find(s => s.billerId == billerId);
    const biller = appState.billerData.find(b => b.id == billerId);

    if (!biller) {
        logMessage('Error', `Critical error: Biller with ID ${billerId} not found in billerData.`);
        return;
    }

    if (!sim) {
        logMessage('Warning', `No simulation data found for ${biller.billerName}.`);
        appState.currentCallData = {
            error: true,
            message: `No simulation data is available for ${biller.billerName}. Please select another biller to demonstrate.`
        };
        appState.incomingCallNumber = 'Unknown';
    } else {
        appState.currentCallData = {
            billerName: biller.billerName,
            billerTla: biller.tla,
            accountNumber: sim.accountNumber,
            adLink: biller.adLink,
            kbLink: biller.kbLink,
            reasonForCall: `${sim.ivrSelections.reason} (${sim.ivrSelections.service})`,
            customerTel: sim.customerPhoneNumber,
            customerState: sim.state,
            billerIvrNumber: biller.ivrNumber || 'N/A',
            customerName: sim.customerName,
        };
        appState.incomingCallNumber = sim.customerPhoneNumber;
        logMessage('Simulation', `Incoming call from ${appState.incomingCallNumber} for ${biller.billerName}`);
    }

    appState.isIncoming = true;
    renderCCP();
}

function acceptCall() {
    if (appState.currentCallData && appState.currentCallData.error) {
        appState.isIncoming = false;
        logMessage('System', 'Blocked call acceptance due to simulation data error.');
        renderCCP();
        return;
    }

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
    startACW();
}

// ::: FIX: Rewritten ACW transition logic for stability :::
function startACW() {
    const lastCallNumbers = appState.calls.map(c => c.phoneNumber).join(', ') || 'Unknown';

    appState.calls.forEach(call => clearInterval(call.timerInterval));

    appState.calls = [];
    appState.isIncoming = false;
    appState.isConferenced = false;
    appState.activePanel = 'none';
    appState.currentCallData = null;
    
    appState.isInACW = true;
    appState.acwTimeRemaining = 10;
    
    renderCCP();

    const doc = appState.ccpWindow && !appState.ccpWindow.closed ? appState.ccpWindow.document : null;
    if (doc) {
        const numEl = doc.getElementById('acw-number-display');
        const timerEl = doc.getElementById('acw-timer');
        if (numEl) numEl.innerHTML = `<strong>${lastCallNumbers}</strong>`;
        if (timerEl) timerEl.textContent = formatTime(appState.acwTimeRemaining);
    }

    clearInterval(appState.acwTimerInterval);
    appState.acwTimerInterval = setInterval(() => {
        appState.acwTimeRemaining--;
        const d = appState.ccpWindow && !appState.ccpWindow.closed ? appState.ccpWindow.document : null;
        if (d) {
            const t = d.getElementById('acw-timer');
            if (t) t.textContent = formatTime(appState.acwTimeRemaining);
        }
        if (appState.acwTimeRemaining <= 0) {
            endACW();
        }
    }, 1000);
}

// ::: FIX: Cleaned up ACW end logic :::
function endACW() {
    logMessage('System', 'ACW ended. Agent is now idle.');
    clearInterval(appState.acwTimerInterval);
    appState.isInACW = false;
    appState.activePanel = 'none';
    renderCCP();
}

function toggleHoldIndividual(callId) {
    const call = appState.calls.find(c => c.id === callId);
    if (!call) return;
    call.status = call.status === 'onHold' ? 'connected' : 'onHold';
    logMessage('Call Event', `Call is now ${call.status === 'onHold' ? 'On hold' : 'Resumed'}.`);
    renderCCP();
}

// ::: FIX: New multi-call helper functions :::
function holdAll() {
    if (appState.calls.length === 0) return;
    appState.calls.forEach(c => c.status = 'onHold');
    logMessage('Call Event', 'All calls placed on hold.');
    renderCCP();
}

function muteAllToggle() {
    appState.isMuted = !appState.isMuted;
    logMessage('Agent Event', `Agent is now ${appState.isMuted ? 'muted' : 'unmuted'}.`);
    renderCCP();
}

// ::: FIX: Safer status change with DOM guards :::
function changeAgentStatus(newStatus) {
    appState.agentStatus = newStatus;
    if (appState.ccpWindow && !appState.ccpWindow.closed) {
       const doc = appState.ccpWindow.document;
       const el = doc.getElementById('agent-status-text');
       if (el) el.textContent = newStatus;
       const menu = doc.getElementById('status-menu');
       if (menu) menu.style.display = 'none';
   }
    logMessage('Agent Event', `Status changed to: ${newStatus}`);
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
    if (!appState.ccpWindow || appState.ccpWindow.closed) return;
    const doc = appState.ccpWindow.document;

    const statusDropdown = doc.getElementById('status-dropdown');
    const statusMenu = doc.getElementById('status-menu');
    statusDropdown?.addEventListener('click', (event) => { event.stopPropagation(); statusMenu.style.display = statusMenu.style.display === 'block' ? 'none' : 'block'; });
    appState.ccpWindow.document.body.addEventListener('click', () => { if (statusMenu && statusMenu.style.display === 'block') statusMenu.style.display = 'none'; });
    statusMenu?.addEventListener('click', (event) => { if (event.target.classList.contains('ccp-status-menu-item')) { changeAgentStatus(event.target.dataset.status); } });

    doc.getElementById('idle-numpad-btn')?.addEventListener('click', () => openOverlay('numpad'));
    doc.getElementById('idle-quick-connects-btn')?.addEventListener('click', () => openOverlay('quickConnects'));
    doc.getElementById('accept-call-btn')?.addEventListener('click', acceptCall);
    doc.getElementById('reject-call-btn')?.addEventListener('click', () => { appState.isIncoming = false; renderCCP(); logMessage('Call Event', 'Call rejected.');});
    doc.getElementById('end-leave-call-btn')?.addEventListener('click', leaveCall);
    doc.getElementById('close-contact-btn')?.addEventListener('click', endACW);
    doc.getElementById('hold-resume-btn')?.addEventListener('click', () => { if (appState.calls[0]) toggleHoldIndividual(appState.calls[0].id); });
    doc.getElementById('mute-unmute-btn')?.addEventListener('click', muteAllToggle);
    doc.getElementById('numpad-btn')?.addEventListener('click', addSecondCall);
    doc.getElementById('quick-connects-btn')?.addEventListener('click', () => openOverlay('quickConnects'));
    doc.getElementById('swap-btn')?.addEventListener('click', swapCalls);
    doc.getElementById('join-btn')?.addEventListener('click', joinCalls);
    doc.getElementById('close-numpad-btn')?.addEventListener('click', closeOverlays);
    doc.getElementById('close-quick-connects-btn')?.addEventListener('click', closeOverlays);
    
    doc.getElementById('multi-call-container')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('drop-call-btn')) {
            const callId = parseInt(e.target.dataset.id, 10);
            dropCall(callId);
        }
    });

    doc.getElementById('call-view')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-icon')) {
            const textToCopy = e.target.dataset.copyText;
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    logMessage('System', `Copied: ${textToCopy}`);
                    e.target.classList.add('copied');
                    setTimeout(() => {
                        e.target.classList.remove('copied');
                    }, 1500);
                }).catch(err => {
                    logMessage('Error', `Failed to copy text: ${err}`);
                });
            }
        }
    });

    // ::: FIX: Wire all previously unhandled buttons :::
    doc.getElementById('header-numpad-btn')?.addEventListener('click', () => openOverlay('numpad'));
    doc.getElementById('hold-all-btn')?.addEventListener('click', holdAll);
    doc.getElementById('mute-btn-multi')?.addEventListener('click', muteAllToggle);
    doc.getElementById('numpad-btn-multi')?.addEventListener('click', () => openOverlay('numpad'));
    doc.getElementById('conf-hold-all-btn')?.addEventListener('click', holdAll);
    doc.getElementById('conf-mute-btn')?.addEventListener('click', muteAllToggle);
    doc.getElementById('conf-numpad-btn')?.addEventListener('click', () => openOverlay('numpad'));
    doc.getElementById('acw-numpad-btn')?.addEventListener('click', () => openOverlay('numpad'));
    doc.getElementById('acw-quick-connects-btn')?.addEventListener('click', () => openOverlay('quickConnects'));
}
