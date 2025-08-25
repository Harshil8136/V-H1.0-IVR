// File 1 of 3: app.js (The Conductor)
// This file manages the launcher page and connects the state logic with the UI.

document.addEventListener('DOMContentLoaded', () => {
    // --- LAUNCHER PAGE ELEMENTS ---
    const launchBtn = document.getElementById('launch-ccp-btn');
    const simulateCallBtn = document.getElementById('simulate-call-btn');
    const billerDropdown = document.getElementById('biller-select-dropdown');
    const logTableBody = document.getElementById('log-table-body');

    /**
     * ::: UPDATE: Populates the dropdown from the embedded billerData variable. :::
     */
    const loadBillers = () => {
        // The billerData and simulationData variables are now globally available from index.html
        if (typeof billerData !== 'undefined' && typeof simulationData !== 'undefined') {
            // Load the data into our central state object
            appState.billerData = billerData;
            appState.simulationData = simulationData;

            // Clear the "Loading..." option
            billerDropdown.innerHTML = '<option value="">-- Select a Biller --</option>';

            appState.billerData.forEach(biller => {
                const option = document.createElement('option');
                option.value = biller.id;
                option.textContent = biller.billerName;
                billerDropdown.appendChild(option);
            });
            
            billerDropdown.disabled = false;
            logMessage('System', 'Biller data loaded successfully.');
        } else {
            billerDropdown.innerHTML = '<option value="">Error: Data not found</option>';
            logMessage('Error', 'Embedded billerData or simulationData variable not found.');
        }
    };

    /**
     * Creates the pop-up window, injects the HTML, and sets up all event listeners.
     */
    const launchCCP = () => {
        if (appState.ccpWindow && !appState.ccpWindow.closed) {
            appState.ccpWindow.focus();
            logMessage('System', 'CCP window already open. Focussing.');
            return;
        }

        appState.ccpWindow = window.open('', 'CCP_Simulator', 'width=340,height=600,resizable=yes');
        
        if (!appState.ccpWindow) {
            logMessage('Error', 'Pop-up was blocked. Please allow pop-ups for this site.');
            return;
        }

        injectCCPHTML(appState.ccpWindow);

        appState.ccpWindow.onload = () => {
            initializeCCPEvents();
            logMessage('System', 'CCP window launched and events initialized.');
        };
        
        appState.ccpWindow.onbeforeunload = () => {
            logMessage('System', 'CCP window closed.');
            appState.calls.forEach(call => clearInterval(call.timerInterval));
            clearInterval(appState.acwTimerInterval);
            resetState();
            appState.ccpWindow = null;
            simulateCallBtn.disabled = true;
            billerDropdown.selectedIndex = 0;
        };
    };

    /**
     * Triggers the simulation for the SPECIFIC biller selected in the dropdown.
     */
    const simulateIncomingCall = () => {
        if (!appState.ccpWindow || appState.ccpWindow.closed) {
            logMessage('Warning', 'Cannot simulate call. CCP window is not open.');
            return;
        }
        
        const selectedBillerId = billerDropdown.value;
        if (!selectedBillerId) {
            logMessage('Warning', 'Please select a biller from the dropdown before simulating a call.');
            return;
        }

        setIncomingCall(selectedBillerId); 
    };

    // --- LAUNCHER PAGE EVENT LISTENERS ---
    launchBtn.addEventListener('click', launchCCP);
    simulateCallBtn.addEventListener('click', simulateIncomingCall);

    billerDropdown.addEventListener('change', () => {
        if (billerDropdown.value) {
            simulateCallBtn.disabled = false;
        } else {
            simulateCallBtn.disabled = true;
        }
    });

    // --- INITIALIZATION ---
    logMessage('System', 'Launcher initialized. Loading embedded biller data...');
    loadBillers();
});