// File: src/js/ccp-templates.js
// This file contains the main HTML structure for the CCP pop-up window.

const ccpHtmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Amazon Connect CCP</title>
        <link rel="stylesheet" href="src/css/style.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    </head>
    <body class="ccp-body">
        <header class="ccp-header">
            <div class="ccp-status-dropdown" id="status-dropdown">
                <div class="ccp-status-display">
                    <i class="fa-solid fa-microphone"></i>
                    <span id="agent-status-text">Available</span>
                </div>
                <div class="ccp-status-toggle" id="status-toggle-btn">
                     <i class="fa-solid fa-chevron-down"></i>
                </div>
                <div class="ccp-status-menu" id="status-menu">
                    <div class="ccp-status-menu-item" data-status="Available">Available</div>
                    <div class="ccp-status-menu-item" data-status="Lunch">Lunch</div>
                    <div class="ccp-status-menu-item" data-status="Break">Break</div>
                    <div class="ccp-status-menu-item" data-status="Offline">Offline</div>
                </div>
            </div>
            <div class="ccp-header-icons">
                <i class="fa-solid fa-phone" id="header-numpad-btn"></i>
                <i class="fa-solid fa-gear" id="settings-btn"></i>
            </div>
        </header>
        
        <main class="ccp-main">
            <div class="ccp-view" id="welcome-view"> <h2 id="welcome-message"></h2> <div class="welcome-icon"><i class="fa-regular fa-comments"></i></div> <div class="idle-controls"> <button id="idle-quick-connects-btn"><i class="fa-solid fa-users"></i> Quick connects</button> <button id="idle-numpad-btn"><i class="fa-solid fa-grip"></i> Number pad</button> </div> </div>
            <div class="ccp-view hidden" id="incoming-call-view"> <div class="incoming-call-info"> <strong id="incoming-number-display"></strong><br> Incoming call </div> <div class="incoming-call-actions"> <button id="accept-call-btn"><i class="fa-solid fa-check"></i> Accept call</button> <button id="reject-call-btn"><i class="fa-solid fa-xmark"></i> Reject call</button> </div> </div>
            <div class="ccp-view hidden" id="call-view"> <div id="multi-call-container"></div> <div id="call-context-display"></div> <div class="ccp-footer-actions"> <div class="call-controls" id="single-call-controls"> <button id="hold-resume-btn"><i class="fa-solid fa-pause"></i> <span>Hold</span></button> <button id="mute-unmute-btn"><i class="fa-solid fa-microphone-slash"></i> <span>Mute</span></button> <button id="numpad-btn"><i class="fa-solid fa-grip"></i> Number pad</button> <button id="quick-connects-btn"><i class="fa-solid fa-users"></i> Quick connects</button> </div> <div class="call-controls hidden" id="multi-call-controls"> <button id="hold-all-btn"><i class="fa-solid fa-pause"></i> Hold All</button> <button id="mute-btn-multi"><i class="fa-solid fa-microphone-slash"></i> Mute</button> <button id="join-btn"><i class="fa-solid fa-people-arrows"></i> Join</button> <button id="swap-btn"><i class="fa-solid fa-right-left"></i> Swap</button> <button id="transfer-btn"><i class="fa-solid fa-phone-arrow-right"></i> Transfer</button> </div> <div class="call-controls hidden" id="conference-controls"> <button id="conf-hold-all-btn"><i class="fa-solid fa-pause"></i> Hold All</button> <button id="conf-mute-btn"><i class="fa-solid fa-microphone-slash"></i> Mute</button> <button id="conf-numpad-btn"><i class="fa-solid fa-grip"></i> Number pad</button> </div> <div class="end-call-container"> <button id="end-leave-call-btn"><i class="fa-solid fa-phone-slash"></i> End call</button> </div> </div> </div>
            <div class="ccp-view hidden" id="acw-view"> <div class="acw-info"> <div id="acw-number-display"></div> <div class="acw-status-text"> <span>After call work</span> <span id="acw-timer">00:10</span> </div> </div> <div class="acw-controls"> <button id="acw-numpad-btn"><i class="fa-solid fa-grip"></i> Number pad</button> <button id="acw-quick-connects-btn"><i class="fa-solid fa-users"></i> Quick connects</button> </div> <div class="close-contact-container"> <button id="close-contact-btn">Close contact</button> </div> </div>

            <div class="ccp-overlay hidden" id="numpad-overlay">
                <div class="ccp-overlay-header">
                    <h3 id="numpad-title">Dial number</h3>
                    <i class="fa-solid fa-xmark" id="close-numpad-btn"></i>
                </div>
                <div class="numpad-body">
                    <div class="numpad-input-wrapper">
                        <label for="numpad-input">Phone number</label>
                        <div class="numpad-input-field">
                            <i class="fa-solid fa-flag-usa"></i>
                            <input type="text" id="numpad-input" placeholder="Enter a phone number" readonly>
                            <button id="numpad-delete-btn" class="icon-button"><i class="fa-solid fa-delete-left"></i></button>
                        </div>
                    </div>
                    <div class="ccp-numpad-grid">
                        <button>1</button> <button>2<span class="numpad-letters">ABC</span></button> <button>3<span class="numpad-letters">DEF</span></button> <button>4<span class="numpad-letters">GHI</span></button> <button>5<span class="numpad-letters">JKL</span></button> <button>6<span class="numpad-letters">MNO</span></button> <button>7<span class="numpad-letters">PQRS</span></button> <button>8<span class="numpad-letters">TUV</span></button> <button>9<span class="numpad-letters">WXYZ</span></button> <button>*</button> <button>0<span class="numpad-letters">+</span></button> <button>#</button>
                    </div>
                </div>
                <div class="numpad-footer-actions">
                    <button id="numpad-action-btn" class="numpad-footer-btn primary"><i class="fa-solid fa-phone"></i> Call</button>
                </div>
            </div>

            <div class="ccp-overlay hidden" id="quick-connects-overlay">
                <div class="ccp-overlay-header">
                    <h3>Quick connects</h3>
                    <i class="fa-solid fa-xmark" id="close-quick-connects-btn"></i>
                </div>
                <div class="qc-search-container">
                    <input type="text" id="qc-search-input" placeholder="Search quick connects...">
                </div>
                <div class="ccp-quick-connects-list"></div>
            </div>
            
            <div class="ccp-overlay hidden" id="settings-overlay">
                <div class="ccp-overlay-header">
                    <h3>Settings</h3>
                    <i class="fa-solid fa-xmark" id="close-settings-btn"></i>
                </div>
                <div class="settings-body">
                    <div class="settings-group">
                        <label>Display Options</label>
                        <div class="toggle-group">
                            <label class="toggle-switch"> <span>Biller Information</span> <input type="checkbox" id="toggle-biller-info" data-setting="displayBillerInfo" checked> <span class="slider"></span> </label>
                            <label class="toggle-switch"> <span>Contact Numbers</span> <input type="checkbox" id="toggle-contact-info" data-setting="displayContactInfo" checked> <span class="slider"></span> </label>
                        </div>
                    </div>
                    <div class="settings-group">
                        <label for="ringtone-interval-select">Ringtone Interval</label>
                        <select id="ringtone-interval-select">
                            <option value="1">Every 1 second</option><option value="2">Every 2 seconds</option><option value="3">Every 3 seconds</option><option value="4">Every 4 seconds</option><option value="5">Every 5 seconds</option><option value="6">Every 6 seconds</option><option value="7">Every 7 seconds</option><option value="8">Every 8 seconds</option><option value="9">Every 9 seconds</option><option value="10">Every 10 seconds</option>
                        </select>
                    </div>
                    <div class="settings-group">
                        <label>Ringtone Sound</label>
                        <div class="radio-group" id="ringtone-select-group">
                            <div><input type="radio" id="ringtone-default" name="ringtone" value="src/ring.mp3"><label for="ringtone-default">Default Ring</label></div>
                            <div><input type="radio" id="ringtone-alt" name="ringtone" value="src/audio/dtmf-tone.mp3"><label for="ringtone-alt">Alternate Tone</label></div>
                        </div>
                    </div>
                    <div class="settings-group">
                        <label>Color Theme</label>
                        <div class="radio-group" id="theme-select-group">
                             <div><input type="radio" id="theme-default" name="theme" value="default"><label for="theme-default">Default</label></div>
                             <div><input type="radio" id="theme-blue" name="theme" value="blue"><label for="theme-blue">Blue</label></div>
                             <div><input type="radio" id="theme-green" name="theme" value="green"><label for="theme-green">Green</label></div>
                             <div><input type="radio" id="theme-red" name="theme" value="red"><label for="theme-red">Red</label></div>
                             <div><input type="radio" id="theme-yellow" name="theme" value="yellow"><label for="theme-yellow">Yellow</label></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="transfer-modal-backdrop" class="ccp-modal-backdrop hidden"></div>
            <div id="transfer-modal" class="ccp-modal hidden">
                <div class="ccp-modal-header">
                    <span>Confirm Transfer</span>
                </div>
                <div class="ccp-modal-body">
                    <div class="context-item">
                        <i class="fa-solid fa-phone"></i>
                        <div class="context-text">
                            <span class="context-label" id="transfer-dest-label">Destination</span>
                            <span class="context-value" id="transfer-dest-number">—</span>
                        </div>
                    </div>
                    <div id="transfer-number-choices" class="ccp-number-choices hidden"></div>
                </div>
                <div class="ccp-modal-actions">
                    <button id="transfer-confirm-btn" class="modal-btn primary">Transfer</button>
                    <button id="transfer-cancel-btn" class="modal-btn cancel">Cancel</button>
                </div>
            </div>
            
        </main>
    </body>
    </html>
`;