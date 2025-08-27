// File 3 of 3: ccp-state.js (The Brain)
// Defines the application state and all functions that manipulate it.

const appState = {
    ccpWindow: null,
    agentStatus: 'Available',
    agentName: 'Harshil', // Added for personalization
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
    quickConnects: [],
    outboundDialNumber: '',
    isNumpadForOutbound: false,
    // ::: UPDATE: State for settings and ringtone control :::
    settings: {
        theme: 'default', // 'default', 'blue', 'green', etc.
        ringtoneFile: 'src/audio/ringtone.mp3',
        ringtoneInterval: 3, // in seconds
    },
    activeRingtoneInterval: null, // Holds the setInterval ID for the ringtone
};

function playRingtone() {
    if (!appState.ccpWindow || appState.ccpWindow.closed) {
        clearInterval(appState.activeRingtoneInterval);
        appState.activeRingtoneInterval = null;
        return;
    }
    const ringtone = new Audio(appState.settings.ringtoneFile);
    ringtone.play().catch(error => {
        // Autoplay is often blocked until user interaction.
        // This is a silent catch as the user will see the incoming call UI anyway.
        console.log("Ringtone play failed:", error.message);
    });
}

function updateSetting(key, value) {
    if (appState.settings.hasOwnProperty(key)) {
        // Ensure numeric values are stored as numbers
        if (key === 'ringtoneInterval') {
            appState.settings[key] = parseInt(value, 10);
        } else {
            appState.settings[key] = value;
        }
        logMessage('Settings', `Setting '${key}' updated to '${value}'.`);
        renderCCP(); // Re-render to apply changes like themes
    }
}


function logMessage(type, details) {
    const mainDoc = window.opener ? window.opener.document : window.document;
    const logTableBody = mainDoc.getElementById('log-table-body');
    if (!logTableBody) return;

    const timestamp = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit'});
    // ::: UPDATE: Append logs to the bottom for chronological order :::
    const newRow = logTableBody.insertRow(-1); 
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
    clearInterval(appState.activeRingtoneInterval); // Ensure ringtone stops
    appState.currentCallData = null;
    appState.outboundDialNumber = '';
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

    // ::: UPDATE: Start the repeating ringtone :::
    clearInterval(appState.activeRingtoneInterval); // Clear any existing interval
    playRingtone(); // Play immediately
    appState.activeRingtoneInterval = setInterval(playRingtone, appState.settings.ringtoneInterval * 1000);
    
    renderCCP();
}

function acceptCall() {
    // ::: UPDATE: Stop the ringtone when call is accepted :::
    clearInterval(appState.activeRingtoneInterval);
    appState.activeRingtoneInterval = null;

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

// ::: UPDATE: Created a dedicated function for rejecting calls :::
function rejectCall() {
    clearInterval(appState.activeRingtoneInterval);
    appState.activeRingtoneInterval = null;
    appState.isIncoming = false;
    appState.currentCallData = null;
    logMessage('Call Event', 'Call rejected.');
    renderCCP();
}

function appendToDialNumber(digit) {
    if (appState.outboundDialNumber.length < 15) {
        appState.outboundDialNumber += digit;
        renderCCP();
    }
}

function deleteFromDialNumber() {
    appState.outboundDialNumber = appState.outboundDialNumber.slice(0, -1);
    renderCCP();
}

function dialOutbound() {
    if (!appState.outboundDialNumber) return;

    if (appState.calls.length === 0) {
        const newCall = { id: Date.now(), phoneNumber: appState.outboundDialNumber, status: 'connected' };
        appState.calls.push(newCall);
        startTimer(newCall);
        logMessage('Call Event', `Outbound call initiated to ${newCall.phoneNumber}`);
        closeOverlays();
    } else {
        initiateConsult(appState.outboundDialNumber);
    }
    appState.outboundDialNumber = '';
}

function initiateConsult(targetNumber) {
    if (appState.calls.length === 0) return;
    
    const activeCall = appState.calls.find(c => c.status === 'connected');
    if (activeCall) {
        activeCall.status = 'onHold';
    }

    const consultCall = { id: Date.now(), phoneNumber: targetNumber, status: 'connected' };
    appState.calls.push(consultCall);
    startTimer(consultCall);
    logMessage('Call Event', `Consult call initiated to ${targetNumber}`);
    closeOverlays();
}

function initiateQuickConnect(qcId) {
    const qc = appState.quickConnects.find(q => q.id === qcId);
    if (!qc) {
        logMessage('Error', `Quick Connect with id ${qcId} not found.`);
        return;
    }

    if (appState.calls.length === 0) {
        const newCall = { id: Date.now(), phoneNumber: qc.target, status: 'connected' };
        appState.calls.push(newCall);
        startTimer(newCall);
        logMessage('Call Event', `Outbound call from Quick Connect to ${qc.target}`);
        closeOverlays();
    } else {
        initiateConsult(qc.target);
    }
}

function completeTransfer() {
    if (appState.calls.length !== 2) return;
    const agentLeg = appState.calls.find(c => c.status === 'connected');
    if (agentLeg) {
        logMessage('Call Event', `Agent is completing transfer, dropping their leg.`);
        dropCall(agentLeg.id);
    }
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

function startACW() {
    const lastCallNumbers = appState.calls.map(c => c.phoneNumber).join(', ') || 'Unknown';
    appState.calls.forEach(call => clearInterval(call.timerInterval));
    resetState(); // Use resetState to clean up, including ringtone
    appState.isInACW = true;
    appState.acwTimeRemaining = 10;

    renderCCP(); // Render ACW view first
    
    // Now manipulate the newly rendered DOM
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
    if (panelName === 'numpad') {
        appState.isNumpadForOutbound = appState.calls.length === 0;
        if (appState.isNumpadForOutbound) {
            appState.outboundDialNumber = '';
        }
    }
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

// ::: UPDATE: The initializeCCPEvents function has been REMOVED from this file. :::
// It will be relocated to app.js as per the devised plan to improve architectural purity.