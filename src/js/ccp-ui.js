// File: src/js/ccp-ui.js (The View)
// This file contains ONLY the rendering logic.

function injectCCPHTML(ccpWin) {
    // ccpHtmlTemplate is a global variable from ccp-templates.js
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
        const acwView = doc.getElementById('acw-view'); acwView.classList.remove('hidden');
        const acwNumDisplay = doc.getElementById('acw-number-display');
        if (acwNumDisplay) acwNumDisplay.innerHTML = `<strong>${appState.lastCallInfo}</strong>`;
        const acwTimer = doc.getElementById('acw-timer');
        if (acwTimer) acwTimer.textContent = formatTime(appState.acwTimeRemaining);
    } else {
        const welcomeView = doc.getElementById('welcome-view'); welcomeView.classList.remove('hidden');
        doc.getElementById('welcome-message').textContent = `Welcome ${appState.agentName}`;
    }
    
    const overlays = ['numpad-overlay', 'quick-connects-overlay', 'settings-overlay'];
    const panelMap = { numpad: 'numpad-overlay', quickConnects: 'quick-connects-overlay', settings: 'settings-overlay' };
    overlays.forEach(id => { const el = doc.getElementById(id); if(el) el.classList.toggle('hidden', panelMap[appState.activePanel] !== id); });

    if (appState.activePanel === 'settings') {
        doc.getElementById('toggle-biller-info').checked = appState.settings.displayBillerInfo;
        doc.getElementById('toggle-contact-info').checked = appState.settings.displayContactInfo;
    }
    
    if (appState.activePanel === 'numpad') {
        const numpadInput = doc.getElementById('numpad-input');
        if (numpadInput) numpadInput.value = appState.outboundDialNumber;
        const actionBtn = doc.getElementById('numpad-action-btn');
        const numpadTitle = doc.getElementById('numpad-title');
        if(actionBtn && numpadTitle) {
            if (appState.calls.length > 0) {
                numpadTitle.textContent = 'Keypad';
                actionBtn.innerHTML = `<i class="fa-solid fa-user-plus"></i> Add/Consult`;
            } else {
                numpadTitle.textContent = 'Dial number';
                actionBtn.innerHTML = `<i class="fa-solid fa-phone"></i> Call`;
            }
            actionBtn.disabled = !appState.outboundDialNumber;
        }
    }
    
    if (appState.activePanel === 'quickConnects') {
        const listContainer = doc.querySelector('.ccp-quick-connects-list');
        listContainer.innerHTML = '';
        const searchTerm = appState.quickConnectsSearchTerm.toLowerCase();
        let filteredQCs = appState.quickConnects;
        if (appState.calls.length === 0) { filteredQCs = appState.quickConnects.filter(q => q.type === 'phone'); }
        if (searchTerm) { filteredQCs = filteredQCs.filter(q => q.name.toLowerCase().includes(searchTerm)); }
        const grouped = { agents: [], queues: [], phones: [] };
        filteredQCs.forEach(qc => {
            if (qc.type === 'agent') grouped.agents.push(qc);
            else if (qc.type === 'queue') grouped.queues.push(qc);
            else if (qc.type === 'phone') grouped.phones.push(qc);
        });
        const renderGroup = (title, items) => {
            if (items.length === 0) return;
            const header = doc.createElement('div');
            header.className = 'qc-group-header';
            header.textContent = title;
            listContainer.appendChild(header);
            items.forEach(qc => {
                const item = doc.createElement('div');
                item.className = 'qc-item';
                item.dataset.id = qc.id;
                let statusHtml = '';
                if (qc.type === 'agent') { statusHtml = `<span class="qc-status ${qc.status.toLowerCase()}"></span>`; }
                const icon = qc.type === 'agent' ? 'fa-user' : (qc.type === 'queue' ? 'fa-users' : 'fa-phone');
                item.innerHTML = `<i class="fa-solid ${icon}"></i><span>${qc.name}</span>${statusHtml}`;
                listContainer.appendChild(item);
            });
        };
        renderGroup('Agents', grouped.agents);
        renderGroup('Queues', grouped.queues);
        renderGroup('External Numbers', grouped.phones);
    }
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
                            <span>${call.phoneNumber}</span>
                        </div>
                        <div class="call-strip-timer">
                            <i class="fa-solid fa-clock"></i>
                            <span id="timer-${call.id}">${formatTime(call.elapsedSeconds)}</span>
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
        if (appState.currentCallData.error) { contextContainer.innerHTML = `<div class="context-error">...</div>`; } 
        else {
            const data = appState.currentCallData;
            let billerInfoHtml = '';
            if (appState.settings.displayBillerInfo) {
                const statusTag = data.isLive ? `<span class="context-tag status-live">Live</span>` : `<span class="context-tag status-not-live">Not Live</span>`;
                let linksHTML = '';
                if (data.kbLink) { linksHTML += `<a href="${data.kbLink}" target="_blank" class="context-link-btn">KB Link</a>`; }
                if (data.adLink) { linksHTML += `<a href="${data.adLink}" target="_blank" class="context-link-btn">AD Link</a>`; }
                billerInfoHtml = `<div class="context-card"><div class="context-item-main"><div class="context-item-main-left"><i class="fa-solid fa-building"></i><div class="context-text"><span class="context-label">Biller</span><span class="context-value-large">${data.billerName} (${data.tla})</span></div></div>${statusTag}</div><div class="context-item"><i class="fa-solid fa-file-invoice-dollar"></i><div class="context-text"><span class="context-label">Payment Type</span><span class="context-value">${data.paymentType || 'N/A'}</span></div></div><div class="context-item-links">${linksHTML}</div></div>`;
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
                        ${data.ivrNumber ? `<button class="transfer-btn" data-number="${data.ivrNumber}" data-label="IVR">Transfer</button>` : ''}
                        ${data.ivrNumber ? `<i class="fa-solid fa-copy copy-icon" title="Copy IVR #" data-copy-text="${data.ivrNumber}"></i>` : ''}
                    </div>
                    <div class="context-item">
                        <i class="fa-solid fa-headset"></i>
                        <div class="context-text">
                            <span class="context-label">Customer Service</span>
                            <span class="context-value">${data.csrNumber || 'N/A'}</span>
                        </div>
                        ${data.csrNumber ? `<button class="transfer-btn" data-number="${data.csrNumber}" data-label="CSR">Transfer</button>` : ''}
                        ${data.csrNumber ? `<i class="fa-solid fa-copy copy-icon" title="Copy CSR #" data-copy-text="${data.csrNumber}"></i>` : ''}
                    </div>
                </div>`;
            }
            contextContainer.innerHTML = billerInfoHtml + contactInfoHtml;
        }
    } else {
        contextContainer.innerHTML = '';
    }
    
    const singleControls = doc.getElementById('single-call-controls'); 
    const multiControls = doc.getElementById('multi-call-controls'); 
    const confControls = doc.getElementById('conference-controls'); 
    const inConsultState = callCount === 2 && !appState.isConferenced; 
    singleControls.classList.toggle('hidden', callCount !== 1); 
    multiControls.classList.toggle('hidden', !inConsultState); 
    confControls.classList.toggle('hidden', !appState.isConferenced); 
    if (callCount > 0) { 
        const holdBtn = doc.getElementById('hold-resume-btn'); 
        const muteBtn = doc.getElementById('mute-unmute-btn'); 
        if (appState.calls.some(c => c.status === 'onHold') && callCount === 1) { 
            holdBtn?.classList.add('active'); 
            if(holdBtn) holdBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Resume</span>`; 
        } else if (holdBtn) { 
            holdBtn.classList.remove('active'); 
            holdBtn.innerHTML = `<i class="fa-solid fa-pause"></i> <span>Hold</span>`; 
        } 
        if (appState.isMuted) { 
            muteBtn?.classList.add('active'); 
            doc.getElementById('mute-btn-multi')?.classList.add('active'); 
            doc.getElementById('conf-mute-btn')?.classList.add('active'); 
        } else { 
            muteBtn?.classList.remove('active'); 
            doc.getElementById('mute-btn-multi')?.classList.remove('active'); 
            doc.getElementById('conf-mute-btn')?.classList.remove('active'); 
        } 
    }
}