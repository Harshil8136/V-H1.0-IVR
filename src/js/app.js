// File: src/js/app.js (The Conductor)
// This file manages the launcher page and connects the state logic with the UI.

document.addEventListener('DOMContentLoaded', () => {
    // --- LAUNCHER PAGE ELEMENTS ---
    const launchBtn = document.getElementById('launch-ccp-btn');
    const simulateCallBtn = document.getElementById('simulate-call-btn');
    const billerDropdown = document.getElementById('biller-select-dropdown');
    const sizeDropdown = document.getElementById('ccp-size-select');

    const CCP_SIZES = {
        small: { width: 300, height: 550 },
        default: { width: 340, height: 650 },
        large: { width: 380, height: 750 }
    };

    const initializeSize = () => {
        const savedSize = localStorage.getItem('ccpWindowSize') || 'small';
        const dimensions = CCP_SIZES[savedSize] || CCP_SIZES.default;
        appState.ccpWidth = dimensions.width;
        appState.ccpHeight = dimensions.height;
        if (sizeDropdown) { sizeDropdown.value = savedSize; }
        logMessage('System', `CCP size set to ${savedSize} (${appState.ccpWidth}x${appState.ccpHeight}).`);
    };

    const handleSizeChange = (event) => {
        const newSize = event.target.value;
        const dimensions = CCP_SIZES[newSize] || CCP_SIZES.default;
        appState.ccpWidth = dimensions.width;
        appState.ccpHeight = dimensions.height;
        localStorage.setItem('ccpWindowSize', newSize);
        logMessage('Settings', `Default CCP size changed to ${newSize}.`);
    };

    const loadData = () => {
        // ::: UPDATE: Made the data loading more robust. :::
        // It will now load billers even if area-code-data.js is missing.
        if (typeof billerData !== 'undefined' && typeof quickConnectsData !== 'undefined') {
            appState.billerData = billerData;
            appState.quickConnects = quickConnectsData;

            billerDropdown.innerHTML = '<option value="">-- Select a Biller --</option>';
            appState.billerData.forEach(biller => {
                const option = document.createElement('option');
                option.value = biller.id;
                option.textContent = biller.billerName;
                billerDropdown.appendChild(option);
            });
            billerDropdown.disabled = false;
            logMessage('System', `${appState.billerData.length} billers loaded successfully.`);

            // Gracefully handle the optional area code data
            if (typeof areaCodeData !== 'undefined') {
                appState.areaCodeData = areaCodeData;
                logMessage('System', `${appState.areaCodeData.length} area codes loaded.`);
            } else {
                logMessage('Warning', 'area-code-data.js not found. Geo-location feature is disabled.');
            }
        } else {
            logMessage('Error', 'Data files not found. Ensure biller-data.js is loaded.');
        }
    };

    const initializeCCPEvents = () => {
        if (!appState.ccpWindow || appState.ccpWindow.closed) return;
        const doc = appState.ccpWindow.document;

        // General listeners
        const statusToggleBtn = doc.getElementById('status-toggle-btn');
        const statusMenu = doc.getElementById('status-menu');
        statusToggleBtn?.addEventListener('click', (event) => { event.stopPropagation(); statusMenu.style.display = statusMenu.style.display === 'block' ? 'none' : 'block'; });
        appState.ccpWindow.document.body.addEventListener('click', () => { if (statusMenu && statusMenu.style.display === 'block') statusMenu.style.display = 'none'; });
        statusMenu?.addEventListener('click', (event) => { if (event.target.classList.contains('ccp-status-menu-item')) { changeAgentStatus(event.target.dataset.status); } });
        doc.getElementById('header-numpad-btn')?.addEventListener('click', () => openOverlay('numpad'));
        doc.getElementById('close-numpad-btn')?.addEventListener('click', closeOverlays);
        doc.getElementById('close-quick-connects-btn')?.addEventListener('click', closeOverlays);
        doc.getElementById('close-settings-btn')?.addEventListener('click', closeOverlays);
        
        // Settings Panel Listeners
        doc.getElementById('settings-btn')?.addEventListener('click', () => openOverlay('settings'));
        doc.getElementById('ringtone-interval-select')?.addEventListener('change', (e) => updateSetting('ringtoneInterval', e.target.value));
        doc.getElementById('ringtone-select-group')?.addEventListener('change', (e) => { if (e.target.name === 'ringtone') updateSetting('ringtoneFile', e.target.value); });
        doc.getElementById('theme-select-group')?.addEventListener('change', (e) => { if (e.target.name === 'theme') updateSetting('theme', e.target.value); });
        doc.getElementById('settings-overlay')?.addEventListener('change', (e) => {
            if (e.target.matches('input[type="checkbox"][data-setting]')) {
                const setting = e.target.dataset.setting;
                const value = e.target.checked;
                updateSetting(setting, value);
            }
        });

        // Other event listeners are unchanged and omitted for brevity
        doc.getElementById('idle-numpad-btn')?.addEventListener('click', () => openOverlay('numpad')); doc.getElementById('idle-quick-connects-btn')?.addEventListener('click', () => openOverlay('quickConnects')); doc.getElementById('close-contact-btn')?.addEventListener('click', endACW); doc.getElementById('acw-numpad-btn')?.addEventListener('click', () => openOverlay('numpad')); doc.getElementById('acw-quick-connects-btn')?.addEventListener('click', () => openOverlay('quickConnects'));
        doc.getElementById('accept-call-btn')?.addEventListener('click', acceptCall); doc.getElementById('reject-call-btn')?.addEventListener('click', rejectCall); doc.getElementById('end-leave-call-btn')?.addEventListener('click', leaveCall);
        doc.getElementById('hold-resume-btn')?.addEventListener('click', () => { if (appState.calls[0]) toggleHoldIndividual(appState.calls[0].id); }); doc.getElementById('mute-unmute-btn')?.addEventListener('click', muteAllToggle); doc.getElementById('numpad-btn')?.addEventListener('click', () => openOverlay('numpad')); doc.getElementById('quick-connects-btn')?.addEventListener('click', () => openOverlay('quickConnects')); doc.getElementById('swap-btn')?.addEventListener('click', swapCalls); doc.getElementById('join-btn')?.addEventListener('click', joinCalls); doc.getElementById('transfer-btn')?.addEventListener('click', completeTransfer); doc.getElementById('hold-all-btn')?.addEventListener('click', holdAll); doc.getElementById('mute-btn-multi')?.addEventListener('click', muteAllToggle); doc.getElementById('conf-hold-all-btn')?.addEventListener('click', holdAll); doc.getElementById('conf-mute-btn')?.addEventListener('click', muteAllToggle); doc.getElementById('conf-numpad-btn')?.addEventListener('click', () => openOverlay('numpad'));
        doc.getElementById('multi-call-container')?.addEventListener('click', (e) => { if (e.target.classList.contains('drop-call-btn')) { const callId = parseInt(e.target.dataset.id, 10); dropCall(callId); } });
        doc.getElementById('call-context-display')?.addEventListener('click', (e) => { const copyIcon = e.target.closest('.copy-icon'); if (copyIcon) { const textToCopy = copyIcon.dataset.copyText; if (textToCopy) { navigator.clipboard.writeText(textToCopy).then(() => { logMessage('System', `Copied: ${textToCopy}`); copyIcon.classList.add('copied'); setTimeout(() => { copyIcon.classList.remove('copied'); }, 1500); }).catch(err => { logMessage('Error', `Failed to copy text: ${err}`); }); } } });
        doc.getElementById('numpad-overlay')?.addEventListener('click', (e) => { const numpadButton = e.target.closest('.ccp-numpad-grid button'); if (numpadButton) { const digit = numpadButton.childNodes[0].nodeValue; if (appState.isNumpadForOutbound) { appendToDialNumber(digit); } else { logMessage('DTMF', `Sent tone: ${digit}`); } } else if (e.target.closest('#numpad-call-btn')) { dialOutbound(); } else if (e.target.closest('#numpad-delete-btn')) { deleteFromDialNumber(); } else if (e.target.closest('#numpad-quick-connects-btn')) { openOverlay('quickConnects'); } });
        doc.getElementById('quick-connects-overlay')?.addEventListener('click', (e) => { const qcItem = e.target.closest('.qc-item'); if (qcItem) { const qcId = qcItem.dataset.id; initiateQuickConnect(qcId); } });
    };

    const launchCCP = () => {
        if (appState.ccpWindow && !appState.ccpWindow.closed) { appState.ccpWindow.focus(); logMessage('System', 'CCP window already open. Focusing.'); return; }
        const windowFeatures = `width=${appState.ccpWidth},height=${appState.ccpHeight},resizable=yes`;
        appState.ccpWindow = window.open('', 'CCP_Simulator', windowFeatures);
        if (!appState.ccpWindow) { logMessage('Error', 'Pop-up was blocked. Please allow pop-ups for this site.'); return; }
        injectCCPHTML(appState.ccpWindow);
        const checkReadyState = setInterval(() => { if (!appState.ccpWindow || appState.ccpWindow.closed) { clearInterval(checkReadyState); return; } if (appState.ccpWindow.document.readyState === 'complete') { clearInterval(checkReadyState); initializeCCPEvents(); logMessage('System', 'CCP window launched and events initialized.'); } }, 100);
        appState.ccpWindow.onbeforeunload = () => { logMessage('System', 'CCP window closed.'); resetState(); appState.ccpWindow = null; simulateCallBtn.disabled = true; billerDropdown.selectedIndex = 0; };
    };

    const simulateIncomingCall = () => {
        if (!appState.ccpWindow || appState.ccpWindow.closed) { logMessage('Warning', 'Cannot simulate call. CCP window is not open.'); return; }
        const selectedBillerId = billerDropdown.value;
        if (!selectedBillerId) { logMessage('Warning', 'Please select a biller from the dropdown.'); return; }
        setIncomingCall(selectedBillerId); 
    };

    // --- LAUNCHER PAGE EVENT LISTENERS ---
    launchBtn.addEventListener('click', launchCCP);
    simulateCallBtn.addEventListener('click', simulateIncomingCall);
    billerDropdown.addEventListener('change', () => { simulateCallBtn.disabled = !billerDropdown.value; });
    sizeDropdown.addEventListener('change', handleSizeChange);

    // --- INITIALIZATION ---
    logMessage('System', 'Launcher initialized. Loading data...');
    initializeSize();
    loadData();
});