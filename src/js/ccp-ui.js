// File: src/js/ccp-ui.js (The View)
// This file has been refactored to ONLY contain rendering logic.
// The HTML template is now in ccp-templates.js.

function injectCCPHTML(ccpWin) {
    // ccpHtmlTemplate is now a global variable from ccp-templates.js
    ccpWin.document.write(ccpHtmlTemplate);
    ccpWin.document.close();
}

function renderCCP() {
    if (!appState.ccpWindow || appState.ccpWindow.closed) return;

    const doc = appState.ccpWindow.document;
    doc.body.className = `ccp-body theme-${appState.settings.theme}`;
    
    const views = ['welcome-view', 'incoming-call-view', 'call-view', 'acw-view'];
    views.forEach(id => doc.getElementById(id)?.classList.add('hidden'));
    
    if (appState.isIncoming) {
        doc.getElementById('incoming-call-view').classList.remove('hidden');
        doc.getElementById('incoming-number-display').textContent = appState.incomingCallNumber;
    } else if (appState.calls.length > 0) {
        doc.getElementById('call-view').classList.remove('hidden');
        renderCallView(doc);
    } else if (appState.isInACW) {
        const acwView = doc.getElementById('acw-view');
        acwView.classList.remove('hidden');
        const acwNumDisplay = doc.getElementById('acw-number-display');
        if (acwNumDisplay) acwNumDisplay.innerHTML = `<strong>${appState.lastCallInfo}</strong>`;
        const acwTimer = doc.getElementById('acw-timer');
        if (acwTimer) acwTimer.textContent = formatTime(appState.acwTimeRemaining);
    } else {
        const welcomeView = doc.getElementById('welcome-view');
        welcomeView.classList.remove('hidden');
        doc.getElementById('welcome-message').textContent = `Welcome ${appState.agentName}`;
    }
    
    const overlays = ['numpad-overlay', 'quick-connects-overlay', 'settings-overlay'];
    const panelMap = { numpad: 'numpad-overlay', quickConnects: 'quick-connects-overlay', settings: 'settings-overlay' };
    overlays.forEach(id => {
        const el = doc.getElementById(id);
        if(el) el.classList.toggle('hidden', panelMap[appState.activePanel] !== id);
    });

    // Handle state of controls inside overlays when they are active
    if (appState.activePanel === 'settings') {
        doc.getElementById('toggle-biller-info').checked = appState.settings.displayBillerInfo;
        doc.getElementById('toggle-contact-info').checked = appState.settings.displayContactInfo;
        doc.getElementById('toggle-location-info').checked = appState.settings.displayLocationInfo;
    }
    // [Other overlay logic for numpad, quick-connects is omitted for brevity but is unchanged]
    if (appState.activePanel === 'numpad') { const numpadInput = doc.getElementById('numpad-input'); if (numpadInput) numpadInput.value = appState.outboundDialNumber; const callBtn = doc.getElementById('numpad-call-btn'); if (callBtn) { const showOutboundControls = appState.isNumpadForOutbound; callBtn.style.display = showOutboundControls ? 'flex' : 'none'; doc.getElementById('numpad-quick-connects-btn').style.display = showOutboundControls ? 'flex' : 'none'; callBtn.disabled = !appState.outboundDialNumber; } }
    if (appState.activePanel === 'quickConnects') { const listContainer = doc.querySelector('.ccp-quick-connects-list'); listContainer.innerHTML = ''; const isIdle = appState.calls.length === 0; const qcsToShow = isIdle ? appState.quickConnects.filter(q => q.type === 'phone') : appState.quickConnects; qcsToShow.forEach(qc => { const item = doc.createElement('div'); item.className = 'qc-item'; item.dataset.id = qc.id; const icon = qc.type === 'agent' ? 'fa-user' : (qc.type === 'queue' ? 'fa-users' : 'fa-phone'); item.innerHTML = `<i class="fa-solid ${icon}"></i><span>${qc.name}</span>`; listContainer.appendChild(item); }); }
}


function renderCallView(doc) {
    const callCount = appState.calls.length;
    const container = doc.getElementById('multi-call-container');
    container.innerHTML = '';

    if (callCount > 0) {
        appState.calls.forEach(call => {
            const strip = doc.createElement('div');
            let statusText = 'Connected';
             if (call.status === 'onHold') { statusText = 'On hold'; } 
             else if (appState.isConferenced) { statusText = 'Conference'; }
            
            strip.className = `call-strip status-${call.status}`;
            strip.innerHTML = `
                <div class="call-strip-info">
                    <div class="call-strip-left-stack">
                        <div class="call-strip-number">
                            <i class="fa-solid fa-file-invoice"></i>
                            <span>${call.displayName}</span>
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
            contextContainer.innerHTML = `<div class="context-error">...</div>`;
        } else {
            const data = appState.currentCallData;
            
            // ::: UPDATE: Each card is now rendered conditionally based on settings :::
            let billerInfoHtml = '';
            if (appState.settings.displayBillerInfo) {
                const statusTag = data.isLive ? `<span class="context-tag status-live">Live</span>` : `<span class="context-tag status-not-live">Not Live</span>`;
                let linksHTML = '';
                if (data.kbLink) { linksHTML += `<a href="${data.kbLink}" target="_blank" class="context-link-btn">KB Link</a>`; }
                if (data.adLink) { linksHTML += `<a href="${data.adLink}" target="_blank" class="context-link-btn">AD Link</a>`; }
                billerInfoHtml = `
                    <div class="context-card">
                        <div class="context-item-main">
                            <i class="fa-solid fa-building"></i>
                            <div class="context-text">
                                <span class="context-label">Biller</span>
                                <span class="context-value-large">${data.billerName} (${data.tla})</span>
                            </div>
                            ${statusTag}
                        </div>
                        <div class="context-item">
                            <i class="fa-solid fa-file-invoice-dollar"></i>
                            <div class="context-text">
                                <span class="context-label">Payment Type</span>
                                <span class="context-value">${data.paymentType || 'N/A'}</span>
                            </div>
                        </div>
                        <div class="context-item-links">${linksHTML}</div>
                    </div>`;
            }

            let contactInfoHtml = '';
            if (appState.settings.displayContactInfo) {
                contactInfoHtml = `
                    <div class="context-card">
                        <div class="context-item">
                            <i class="fa-solid fa-phone-volume"></i>
                            <div class="context-text">
                                <span class="context-label">IVR Number</span>
                                <span class="context-value">${data.ivrNumber || 'N/A'}</span>
                            </div>
                            ${data.ivrNumber ? `<i class="fa-solid fa-copy copy-icon" title="Copy IVR #" data-copy-text="${data.ivrNumber}"></i>` : ''}
                        </div>
                        <div class="context-item">
                            <i class="fa-solid fa-headset"></i>
                            <div class="context-text">
                                <span class="context-label">Customer Service</span>
                                <span class="context-value">${data.csrNumber || 'N/A'}</span>
                            </div>
                            ${data.csrNumber ? `<i class="fa-solid fa-copy copy-icon" title="Copy CSR #" data-copy-text="${data.csrNumber}"></i>` : ''}
                        </div>
                    </div>`;
            }
            
            let locationInfoHtml = '';
            if (appState.settings.displayLocationInfo && data.callerLocation) {
                locationInfoHtml = `
                    <div class="context-card">
                        <div class="context-item">
                            <i class="fa-solid fa-map-location-dot"></i>
                            <div class="context-text">
                                <span class="context-label">Caller Location (from Area Code)</span>
                                <span class="context-value">${data.callerLocation.primaryCity}, ${data.callerLocation.state}</span>
                            </div>
                        </div>
                        <div class="context-item">
                            <i class="fa-solid fa-clock"></i>
                            <div class="context-text">
                                <span class="context-label">Caller's Current Time</span>
                                <span class="context-value">${data.callerTime}</span>
                            </div>
                        </div>
                    </div>`;
            }

            contextContainer.innerHTML = billerInfoHtml + contactInfoHtml + locationInfoHtml;
        }
    } else {
        contextContainer.innerHTML = '';
    }

    // Call controls logic remains unchanged
    const singleControls = doc.getElementById('single-call-controls');
    const multiControls = doc.getElementById('multi-call-controls');
    const confControls = doc.getElementById('conference-controls');
    const inConsultState = callCount === 2 && !appState.isConferenced;
    singleControls.classList.toggle('hidden', callCount !== 1);
    multiControls.classList.toggle('hidden', !inConsultState);
    confControls.classList.toggle('hidden', !appState.isConferenced);
    if (callCount > 0) { const holdBtn = doc.getElementById('hold-resume-btn'); const muteBtn = doc.getElementById('mute-unmute-btn'); if (appState.calls.some(c => c.status === 'onHold') && callCount === 1) { holdBtn?.classList.add('active'); if(holdBtn) holdBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Resume</span>`; } else if (holdBtn) { holdBtn.classList.remove('active'); holdBtn.innerHTML = `<i class="fa-solid fa-pause"></i> <span>Hold</span>`; } if (appState.isMuted) { muteBtn?.classList.add('active'); doc.getElementById('mute-btn-multi')?.classList.add('active'); doc.getElementById('conf-mute-btn')?.classList.add('active'); } else { muteBtn?.classList.remove('active'); doc.getElementById('mute-btn-multi')?.classList.remove('active'); doc.getElementById('conf-mute-btn')?.classList.remove('active'); } }
}