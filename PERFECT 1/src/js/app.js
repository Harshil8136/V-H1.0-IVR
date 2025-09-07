// File 1 of 3: app.js (The Conductor)
// This file manages the launcher page and connects the state logic with the UI.

document.addEventListener('DOMContentLoaded', () => {
    // --- LAUNCHER PAGE ELEMENTS ---
    const launchBtn = document.getElementById('launch-ccp-btn');
    const simulateCallBtn = document.getElementById('simulate-call-btn');
    const billerDropdown = document.getElementById('biller-select-dropdown');

    const loadBillers = () => {
        if (typeof billerData !== 'undefined' && typeof simulationData !== 'undefined' && typeof quickConnectsData !== 'undefined') {
            appState.billerData = billerData;
            appState.simulationData = simulationData;
            appState.quickConnects = quickConnectsData;

            const availableSimIds = new Set(appState.simulationData.map(sim => sim.billerId));
            billerDropdown.innerHTML = '<option value="">-- Select a Biller --</option>';

            const availableBillers = appState.billerData.filter(biller => availableSimIds.has(biller.id));

            availableBillers.forEach(biller => {
                const option = document.createElement('option');
                option.value = biller.id;
                option.textContent = biller.billerName;
                billerDropdown.appendChild(option);
            });
            
            billerDropdown.disabled = false;
            logMessage('System', `${availableBillers.length} biller simulations loaded successfully.`);
        } else {
            billerDropdown.innerHTML = '<option value="">Error: Data not found</option>';
            logMessage('Error', 'Embedded data variables not found in index.html.');
        }
    };

    const launchCCP = () => {
        if (appState.ccpWindow && !appState.ccpWindow.closed) {
            appState.ccpWindow.focus();
            logMessage('System', 'CCP window already open. Focusing.');
            return;
        }

        appState.ccpWindow = window.open('', 'CCP_Simulator', 'width=340,height=650,resizable=yes');
        
        if (!appState.ccpWindow) {
            logMessage('Error', 'Pop-up was blocked. Please allow pop-ups for this site.');
            return;
        }

        injectCCPHTML(appState.ccpWindow);

        // ::: FIX: Harden the initialization sequence for the pop-up window :::
        // This robustly checks for when the pop-up is ready before wiring events.
        const checkReadyState = setInterval(() => {
            // Check if the window is still open before accessing its properties
            if (!appState.ccpWindow || appState.ccpWindow.closed) {
                clearInterval(checkReadyState);
                return;
            }
            if (appState.ccpWindow.document.readyState === 'complete') {
                clearInterval(checkReadyState);
                initializeCCPEvents();
                logMessage('System', 'CCP window launched and events initialized.');
            }
        }, 100);

        appState.ccpWindow.onbeforeunload = () => {
            logMessage('System', 'CCP window closed.');
            appState.calls.forEach(call => clearInterval(call.timerInterval));
            clearInterval(appState.acwTimerInterval);
            
            appState.calls = [];
            appState.isIncoming = false;
            appState.isConferenced = false;
            appState.isInACW = false;
            appState.activePanel = 'none';
            
            appState.ccpWindow = null;
            simulateCallBtn.disabled = true;
            billerDropdown.selectedIndex = 0;
        };
    };

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
    logMessage('System', 'Launcher initialized. Loading embedded data...');
    loadBillers();
});