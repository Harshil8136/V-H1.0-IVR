// File: src/js/ccp-state.js (The Brain)
// This file defines the application state and all functions that manipulate it.

const appState = {
    ccpWindow: null, ccpWidth: 340, ccpHeight: 650, agentStatus: 'Available', agentName: 'Harshil', calls: [], isMuted: false, activePanel: 'none', isConferenced: false, isIncoming: false, isInACW: false, acwTimerInterval: null, acwTimeRemaining: 10, lastCallInfo: '', incomingCallNumber: '', currentCallData: null, billerData: [], quickConnects: [], outboundDialNumber: '', isNumpadForOutbound: false,
    quickConnectsSearchTerm: '',
    settings: {
        theme: 'default', ringtoneFile: 'src/ring.mp3', ringtoneInterval: 3,
        displayBillerInfo: true, displayContactInfo: true,
        acwDuration: 10, // ::: NEW: Configurable ACW duration :::
    },
    activeRingtoneInterval: null,
    currentRingtone: null, // ::: UPDATE: To hold the currently playing audio object :::
    // ::: NEW: State for tracking agent status durations :::
    agentStatusTimers: { Lunch: 0, Break: 0 },
    currentStatusTimerInterval: null,
};

// ::: NEW: Transfer feature core logic :::
function normalizePhoneDigits(raw) {
    if (!raw) return '';
    const digits = (raw.match(/[0-9]/g) || []).join('');
    return digits.length >= 10 && digits.length <= 15 ? digits : '';
}

function extractCandidateNumbers(raw) {
    if (!raw) return [];
    const parts = String(raw).split(/\/|,|\bor\b/gi).map(s => s.trim()).filter(Boolean);
    const uniques = new Set();
    parts.forEach(p => {
        const d = normalizePhoneDigits(p);
        if (d) uniques.add(d);
    });
    if (uniques.size === 0) {
        (String(raw).match(/\d{10,15}/g) || []).forEach(d => uniques.add(d));
    }
    return Array.from(uniques);
}

function transferToNumber(rawTarget, label = 'Destination') {
    if (appState.calls.length === 0) {
        logMessage('Warning', 'No active call to transfer.');
        return;
    }
    if (appState.calls.length !== 1 || appState.isConferenced) {
        logMessage('Error', 'Transfer allowed only with a single, non-conference call.');
        return;
    }
    const candidates = extractCandidateNumbers(rawTarget);
    if (candidates.length === 0) {
        logMessage('Error', `No dialable number found for ${label}.`);
        return;
    }
    const target = candidates[0];
    logMessage('Call Event', `Initiating consult to ${label}: ${target}`);
    initiateConsult(target);
}

function playRingtone() {
    if (appState.currentRingtone) {
        appState.currentRingtone.pause();
    }
    const ringtone = new Audio(appState.settings.ringtoneFile);
    ringtone.play().catch(error => { console.log("Ringtone play failed:", error.message); });
    appState.currentRingtone = ringtone;
}

function stopRinging() {
    clearInterval(appState.activeRingtoneInterval);
    appState.activeRingtoneInterval = null;
    if (appState.currentRingtone) {
        appState.currentRingtone.pause();
        appState.currentRingtone = null;
    }
}

function updateSetting(key, value) { if (appState.settings.hasOwnProperty(key)) { if (key === 'ringtoneInterval' || key === 'acwDuration') { appState.settings[key] = parseInt(value, 10); } else { appState.settings[key] = value; } logMessage('Settings', `Setting '${key}' updated to '${value}'.`); renderCCP(); } }
function logMessage(type, details) { const mainDoc = window.opener ? window.opener.document : window.document; const logTableBody = mainDoc.getElementById('log-table-body'); if (!logTableBody) return; const timestamp = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit'}); const newRow = logTableBody.insertRow(-1); const cell1 = newRow.insertCell(0); const cell2 = newRow.insertCell(1); const cell3 = newRow.insertCell(2); cell1.textContent = timestamp; cell2.textContent = type; cell3.textContent = details; };
function resetState() { appState.calls = []; appState.isMuted = false; appState.isConferenced = false; appState.isIncoming = false; appState.isInACW = false; clearInterval(appState.acwTimerInterval); stopRinging(); appState.currentCallData = null; appState.outboundDialNumber = ''; }

function startTimer(call) {
    call.timerInterval = setInterval(() => {
        const callInState = appState.calls.find(c => c.id === call.id);
        if (callInState && (!appState.ccpWindow || !appState.ccpWindow.closed)) {
            callInState.elapsedSeconds++;
            renderCCP();
        } else {
            clearInterval(call.timerInterval);
        }
    }, 1000);
}

function formatTime(seconds) { const mins = Math.floor(seconds / 60).toString().padStart(2, '0'); const secs = (seconds % 60).toString().padStart(2, '0'); return `${mins}:${secs}`; }

function setIncomingCall(billerId) {
    const biller = appState.billerData.find(b => b.id == billerId);
    if (!biller) {
        logMessage('Error', `Biller with ID ${billerId} not found.`);
        appState.currentCallData = { error: true, message: `Biller data for ID ${billerId} not found.` };
        appState.incomingCallNumber = 'Unknown Caller';
    } else {
        appState.currentCallData = { isLive: biller.isLive, billerName: biller.billerName, tla: biller.tla, paymentType: biller.paymentType, adLink: biller.adLink, kbLink: biller.kbLink, ivrNumber: biller.ivrNumber, csrNumber: biller.csrNumber, error: false };
        appState.incomingCallNumber = `+1 (555) 123-4567`;
        logMessage('Simulation', `Incoming call simulated for ${biller.billerName}`);
    }
    appState.isIncoming = true;
    stopRinging();
    playRingtone();
    appState.activeRingtoneInterval = setInterval(playRingtone, appState.settings.ringtoneInterval * 1000);
    renderCCP();
}

function acceptCall() {
    stopRinging();
    closeOverlays();
    if (appState.currentCallData && appState.currentCallData.error) {
        appState.isIncoming = false;
        logMessage('System', 'Blocked call acceptance due to data error.');
        renderCCP();
        return;
    }
    appState.isIncoming = false;
    const newCall = { id: Date.now(), phoneNumber: appState.incomingCallNumber, displayName: appState.currentCallData.billerName, status: 'connected', elapsedSeconds: 0 };
    appState.calls.push(newCall);
    startTimer(newCall);
    renderCCP();
    logMessage('Call Event', `Accepted call for ${appState.currentCallData.tla}`);
}

function rejectCall() {
    stopRinging();
    appState.isIncoming = false;
    appState.currentCallData = null;
    logMessage('Call Event', 'Call rejected.');
    renderCCP();
}

function appendToDialNumber(digit) { if (appState.outboundDialNumber.length < 15) { appState.outboundDialNumber += digit; renderCCP(); } }
function deleteFromDialNumber() { appState.outboundDialNumber = appState.outboundDialNumber.slice(0, -1); renderCCP(); }
function dialOutbound() { if (!appState.outboundDialNumber) return; if (appState.calls.length === 0) { const newCall = { id: Date.now(), phoneNumber: appState.outboundDialNumber, displayName: appState.outboundDialNumber, status: 'connected', elapsedSeconds: 0 }; appState.calls.push(newCall); startTimer(newCall); logMessage('Call Event', `Outbound call initiated to ${newCall.phoneNumber}`); closeOverlays(); } else { initiateConsult(appState.outboundDialNumber); } appState.outboundDialNumber = ''; }
function initiateConsult(targetNumber) { if (appState.calls.length === 0) return; const activeCall = appState.calls.find(c => c.status === 'connected'); if (activeCall) { activeCall.status = 'onHold'; } const consultCall = { id: Date.now(), phoneNumber: targetNumber, displayName: targetNumber, status: 'connected', elapsedSeconds: 0 }; appState.calls.push(consultCall); startTimer(consultCall); logMessage('Call Event', `Consult call initiated to ${targetNumber}`); closeOverlays(); }
function initiateQuickConnect(qcId) { const qc = appState.quickConnects.find(q => q.id === qcId); if (!qc) { logMessage('Error', `Quick Connect with id ${qcId} not found.`); return; } if (appState.calls.length === 0) { const newCall = { id: Date.now(), phoneNumber: qc.target, displayName: qc.name, status: 'connected', elapsedSeconds: 0 }; appState.calls.push(newCall); startTimer(newCall); logMessage('Call Event', `Outbound call from Quick Connect to ${qc.target}`); closeOverlays(); } else { initiateConsult(qc.target); } }
// ::: UPDATE: completeTransfer now simulates agent leaving, triggering ACW. :::
function completeTransfer() {
    if (appState.calls.length === 2 && !appState.isConferenced) {
        logMessage('Call Event', 'Agent completed transfer and is leaving the call.');
        startACW();
    } else {
        logMessage('Warning', 'Complete Transfer is only available during a two-party consult call.');
    }
}
function swapCalls() { if (appState.calls.length !== 2 || appState.isConferenced) return; const status1 = appState.calls[0].status; appState.calls[0].status = appState.calls[1].status; appState.calls[1].status = status1; logMessage('Call Event', `Swapped calls.`); renderCCP(); }
function joinCalls() { if (appState.calls.length < 2) return; appState.isConferenced = true; appState.calls.forEach(call => { call.status = 'joined' }); logMessage('Call Event', `Calls joined in conference.`); renderCCP(); }
function dropCall(callId) { const callIndex = appState.calls.findIndex(c => c.id === callId); if (callIndex === -1) return; const droppedCall = appState.calls[callIndex]; clearInterval(droppedCall.timerInterval); appState.calls.splice(callIndex, 1); logMessage('Call Event', `Dropped call with ${droppedCall.displayName}`); if (appState.calls.length < 2) appState.isConferenced = false; if (appState.calls.length === 1) appState.calls[0].status = 'connected'; if (appState.calls.length === 0) { startACW(); } else { renderCCP(); } }
function leaveCall() { logMessage('Call Event', 'Agent left all calls. Entering ACW.'); startACW(); }
function startACW() { appState.lastCallInfo = appState.calls.map(c => c.displayName).join(', ') || 'Unknown'; appState.calls.forEach(call => clearInterval(call.timerInterval)); appState.calls = []; appState.isConferenced = false; appState.isIncoming = false; appState.currentCallData = null; appState.isInACW = true; appState.acwTimeRemaining = appState.settings.acwDuration; clearInterval(appState.acwTimerInterval); appState.acwTimerInterval = setInterval(() => { appState.acwTimeRemaining--; if (appState.acwTimeRemaining < 0) { endACW(); } else { renderCCP(); } }, 1000); renderCCP(); }
function endACW() { closeOverlays(); logMessage('System', 'ACW ended. Agent is now idle.'); clearInterval(appState.acwTimerInterval); appState.isInACW = false; appState.activePanel = 'none'; renderCCP(); }
function toggleHoldIndividual(callId) { const call = appState.calls.find(c => c.id === callId); if (!call) return; call.status = call.status === 'onHold' ? 'connected' : 'onHold'; logMessage('Call Event', `Call is now ${call.status === 'onHold' ? 'On hold' : 'Resumed'}.`); renderCCP(); }
function holdAll() { if (appState.calls.length === 0) return; appState.calls.forEach(c => c.status = 'onHold'); logMessage('Call Event', 'All calls placed on hold.'); renderCCP(); }
function muteAllToggle() { appState.isMuted = !appState.isMuted; logMessage('Agent Event', `Agent is now ${appState.isMuted ? 'muted' : 'unmuted'}.`); renderCCP(); }

// ::: UPDATE: changeAgentStatus now tracks time spent in each status. :::
function changeAgentStatus(newStatus) {
    if (appState.agentStatus === newStatus) return;

    clearInterval(appState.currentStatusTimerInterval);
    appState.currentStatusTimerInterval = null;

    appState.agentStatus = newStatus;

    if (appState.agentStatusTimers.hasOwnProperty(newStatus)) {
        appState.currentStatusTimerInterval = setInterval(() => {
            appState.agentStatusTimers[newStatus]++;
            logMessage('Status Timing', `${newStatus}: ${formatTime(appState.agentStatusTimers[newStatus])}`);
        }, 1000);
    }
    
    if (appState.ccpWindow && !appState.ccpWindow.closed) {
        const doc = appState.ccpWindow.document;
        const el = doc.getElementById('agent-status-text');
        if (el) el.textContent = newStatus;
        const menu = doc.getElementById('status-menu');
        if (menu) menu.style.display = 'none';
    }
    logMessage('Agent Event', `Status changed to: ${newStatus}`);
}

function openOverlay(panelName) { if (panelName === 'numpad') { appState.isNumpadForOutbound = appState.calls.length === 0; if (appState.isNumpadForOutbound) { appState.outboundDialNumber = ''; } } appState.activePanel = panelName; logMessage('UI Event', `${panelName} panel opened.`); renderCCP(); }
function closeOverlays() { if (appState.activePanel !== 'none') { logMessage('UI Event', `${appState.activePanel} panel closed.`); appState.activePanel = 'none'; renderCCP(); } }