// File 1 of 3: app.js (The Conductor)
// This file manages the launcher page and connects the state logic with the UI.

document.addEventListener('DOMContentLoaded', () => {
    // --- LAUNCHER PAGE ELEMENTS ---
    const launchBtn = document.getElementById('launch-ccp-btn');
    const simulateCallBtn = document.getElementById('simulate-call-btn');
    const logTableBody = document.getElementById('log-table-body');

    // This function now lives in ccp-state.js, but we can use it here.
    // It's globally available because of the script loading order.
    logMessage('System', `Launcher initialized.`);

    /**
     * Creates the pop-up window, injects the HTML, and sets up all event listeners.
     */
    const launchCCP = () => {
        if (appState.ccpWindow && !appState.ccpWindow.closed) {
            appState.ccpWindow.focus();
            logMessage('System', 'CCP window already open. Focussing.');
            return;
        }

        // Create the pop-up window
        appState.ccpWindow = window.open('', 'CCP_Simulator', 'width=340,height=600,resizable=yes');
        
        if (!appState.ccpWindow) {
            logMessage('Error', 'Pop-up was blocked. Please allow pop-ups for this site.');
            return;
        }

        // Inject the HTML template from ccp-ui.js
        injectCCPHTML(appState.ccpWindow);

        // This function runs after the pop-up's content has loaded
        appState.ccpWindow.onload = () => {
            initializeCCPEvents(); // Connects all the buttons inside the CCP to their actions
            logMessage('System', 'CCP window launched and events initialized.');
            simulateCallBtn.disabled = false;
        };
        
        // This function handles what happens when the pop-up is closed
        appState.ccpWindow.onbeforeunload = () => {
            logMessage('System', 'CCP window closed.');
            // Clean up timers and state
            appState.calls.forEach(call => clearInterval(call.timerInterval));
            clearInterval(appState.acwTimerInterval);
            resetState(); // Reset the state object for a clean start next time
            appState.ccpWindow = null;
            simulateCallBtn.disabled = true;
        };
    };

    /**
     * Triggers the simulation of an incoming call.
     */
    const simulateIncomingCall = () => {
        if (!appState.ccpWindow || appState.ccpWindow.closed) {
            logMessage('Warning', 'Cannot simulate call. CCP window is not open.');
            return;
        }
        // This function is in ccp-state.js
        setIncomingCall(); 
    };

    // --- LAUNCHER PAGE EVENT LISTENERS ---
    launchBtn.addEventListener('click', launchCCP);
    simulateCallBtn.addEventListener('click', simulateIncomingCall);
});