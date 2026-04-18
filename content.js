let currentCSS = '';

function applyCSS() {
    let style = document.getElementById('x-badge-blocker-style');
    
    if (!style) {
        style = document.createElement('style');
        style.id = 'x-badge-blocker-style';
        document.documentElement.appendChild(style);
    }
    
    if (style.innerHTML !== currentCSS) {
        style.innerHTML = currentCSS;
    }
}

function loadSettings() {
    chrome.storage.local.get({ isActive: true, blockedProfiles: [] }, (data) => {
        if (!data.isActive || data.blockedProfiles.length === 0) {
            currentCSS = '';
        } else {
            let cssRules = '';
            data.blockedProfiles.forEach(input => {
                const clean = input.replace('@', '').trim();
                if (clean) {
                    cssRules += `
                        [href$="/${clean}" i],
                        [href*="/${clean}/" i],
                        [href*="/${clean}?" i],
                        img[src*="${clean}" i],
                        span:has(> img[src*="${clean}" i]),
                        div:has(> img[src*="${clean}" i]) {
                            display: none !important;
                            opacity: 0 !important;
                            width: 0 !important;
                            height: 0 !important;
                            pointer-events: none !important;
                        }
                    `;
                }
            });
            currentCSS = cssRules;
        }
        applyCSS();
    });
}

loadSettings();

const observer = new MutationObserver(() => {
    if (!document.getElementById('x-badge-blocker-style')) {
        applyCSS();
    }
});

observer.observe(document.documentElement, { childList: true, subtree: true });

chrome.storage.onChanged.addListener(() => {
    loadSettings();
});