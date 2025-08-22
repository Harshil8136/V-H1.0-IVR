document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selection ---
    const dnisSelect = document.getElementById('dnis-select');
    const startCallBtn = document.getElementById('start-call-btn');
    const ivrInterface = document.getElementById('ivr-interface');
    const promptDisplay = document.getElementById('prompt-display');
    const numberPad = document.getElementById('number-pad');
    const callSetup = document.querySelector('.call-setup');

    // CSR Panel Elements
    const infoCallStatus = document.getElementById('info-call-status');
    const infoBillerName = document.getElementById('info-biller-name');
    const infoCallReason = document.getElementById('info-call-reason');
    const infoIvrSelection = document.getElementById('info-ivr-selection');
    const infoKbLink = document.getElementById('info-kb-link');

    // Event Log
    const logOutput = document.getElementById('log-output');

    // --- State Management ---
    let isCallActive = false;
    let currentIvrFlow = null;
    let contactAttributes = {};

    // --- IVR "Engine" Data ---
    // This object defines all IVR flows. It's easy to add or modify billers here.
    const ivrFlows = {
        "833-254-9875": { // BGE Payment Line
            billerName: "Baltimore Gas and Electric (BGE)",
            callReason: "BGE Payment Line",
            kbLinkBase: "https://atlantis.confluence.com/display/KB/BGE",
            nodes: {
                "start": {
                    prompt: "Thank you for calling BGE. To make a payment, press 1. For your account balance, press 2.",
                    options: { "1": "payment_menu", "2": "balance_menu" }
                },
                "payment_menu": {
                    prompt: "You've selected payments. To pay by credit card, press 1. To pay from a bank account, press 2.",
                    action: { key: "IVR Input", value: "Make a payment" },
                    options: { "1": "transfer_agent", "2": "transfer_agent" }
                },
                "balance_menu": {
                    prompt: "You've selected account balance. Please hold while I transfer you to a representative.",
                    action: { key: "IVR Input", value: "Check account balance" },
                    type: "transfer"
                },
                "transfer_agent": {
                    prompt: "Thank you. Please hold while I connect you to the next available agent.",
                    type: "transfer"
                }
            }
        },
        "800-555-1234": { // Generic Biller
            billerName: "Generic Biller Inc.",
            callReason: "Main Customer Service",
            kbLinkBase: "https://atlantis.confluence.com/display/KB/GenericBiller",
            nodes: {
                "start": {
                    prompt: "Welcome to Generic Biller. For sales, press 1. For support, press 2.",
                    options: { "1": "sales_menu", "2": "support_menu" }
                },
                "sales_menu": {
                    prompt: "Connecting you to sales.",
                    action: { key: "IVR Input", value: "Sales Inquiry" },
                    type: "transfer"
                },
                "support_menu": {
                    prompt: "Connecting you to support.",
                    action: { key: "IVR Input", value: "Support Request" },
                    type: "transfer"
                }
            }
        }
    };


    // --- Helper Functions ---

    /** Adds a timestamped message to the event log */
    function logMessage(message) {
        const timestamp = new Date().toLocaleTimeString();
        logOutput.innerHTML += `[${timestamp}] ${message}\n`;
        logOutput.scrollTop = logOutput.scrollHeight; // Auto-scroll to bottom
    }

    /** Updates a specific field on the CSR dashboard */
    function updateCsrPanel(element, value) {
        element.textContent = value;
        logMessage(`CSR Panel Updated: ${element.parentElement.textContent}`);
    }

    /** Resets the entire simulator to its initial state */
    function resetSimulator() {
        isCallActive = false;
        contactAttributes = {};
        currentIvrFlow = null;

        infoCallStatus.textContent = "Not Connected";
        infoCallStatus.className = "status-disconnected";
        updateCsrPanel(infoBillerName, '--');
        updateCsrPanel(infoCallReason, '--');
        updateCsrPanel(infoIvrSelection, '--');
        updateCsrPanel(infoKbLink, '--');
        
        promptDisplay.innerHTML = `<p>Welcome! Please listen to the options.</p>`;
        ivrInterface.classList.add('hidden');
        callSetup.classList.remove('hidden');
        startCallBtn.disabled = false;
        startCallBtn.textContent = "Start Call";
        
        logMessage("Simulator reset. Ready for new call.");
    }
    
    /** Processes a node in the IVR flow */
    function processIvrNode(nodeName) {
        const node = currentIvrFlow.nodes[nodeName];
        if (!node) {
            logMessage("Error: Invalid IVR node name '" + nodeName + "'. Ending call.");
            processIvrNode("transfer_agent"); // Fail-safe transfer
            return;
        }

        logMessage(`Processing IVR node: ${nodeName}`);
        
        // 1. Play the prompt (for now, we just display it)
        // TO-DO: Integrate real audio or TTS here
        promptDisplay.innerHTML = `<p>${node.prompt}</p>`;
        
        // 2. Perform any defined action (like setting attributes)
        if (node.action) {
            contactAttributes[node.action.key] = node.action.value;
            if (node.action.key === "IVR Input") {
                updateCsrPanel(infoIvrSelection, node.action.value);
            }
        }
        
        // 3. Handle node type (e.g., transfer to agent)
        if (node.type === "transfer") {
            isCallActive = false; // Stop accepting keypad input
            infoCallStatus.textContent = "Connected to Agent";
            infoCallStatus.className = "status-connected";
            logMessage("Call transferred to agent. IVR ended.");
            startCallBtn.textContent = "End Call & Reset";
            startCallBtn.disabled = false;
        }
    }


    // --- Event Listeners ---

    /** Handles the Start/End Call Button */
    startCallBtn.addEventListener('click', () => {
        if (startCallBtn.textContent.includes("End")) {
            resetSimulator();
            return;
        }

        isCallActive = true;
        startCallBtn.disabled = true;

        // Hide setup and show IVR interface
        callSetup.classList.add('hidden');
        ivrInterface.classList.remove('hidden');

        // Get selected DNIS and load the flow
        const selectedDnis = dnisSelect.value;
        currentIvrFlow = ivrFlows[selectedDnis];

        logMessage(`Call initiated to ${selectedDnis}`);

        // Populate initial CSR data
        updateCsrPanel(infoCallStatus, "IVR Active");
        updateCsrPanel(infoBillerName, currentIvrFlow.billerName);
        updateCsrPanel(infoCallReason, currentIvrFlow.callReason);
        updateCsrPanel(infoKbLink, currentIvrFlow.kbLinkBase);
        
        // Start the IVR
        processIvrNode("start");
    });

    /** Handles all number pad clicks using event delegation */
    numberPad.addEventListener('click', (e) => {
        if (!isCallActive || !e.target.classList.contains('keypad-btn')) {
            return; // Do nothing if call is not active or if not a button
        }

        const keyPressed = e.target.dataset.key;
        logMessage(`Customer pressed key: ${keyPressed}`);

        // Find the current node to determine next step
        // This is a simplified logic; a real system would track the current node name in a variable
        const allNodes = Object.values(currentIvrFlow.nodes);
        const currentNode = allNodes.find(node => node.prompt === promptDisplay.textContent.trim());
        
        if (currentNode && currentNode.options && currentNode.options[keyPressed]) {
            const nextNodeName = currentNode.options[keyPressed];
            processIvrNode(nextNodeName);
        } else {
            logMessage(`No valid option for key '${keyPressed}' in current state.`);
            // Optionally, play an "invalid option" prompt here.
        }
    });

    // --- Initial Setup ---
    resetSimulator(); // Initialize the simulator on page load
});