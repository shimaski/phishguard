function createWarningBanner(findings) {
    const banner = document.createElement('div');
    banner.id = 'phishguard-banner';
    banner.innerHTML = `
        <div style="background: #ff4444; color: white; padding: 12px; text-align: center; position: fixed; top: 0; left: 0; right: 0; z-index: 999999; font-family: Arial; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">
            <strong>⚠️ AVISO PhishGuard:</strong> Este site pode ser uma tentativa de phishing!
            <button id="phishguard-details" style="margin-left: 10px; background: white; color: #ff4444; border: none; padding: 5px 15px; border-radius: 3px; cursor: pointer; font-weight: bold;">
                Ver Detalhes
            </button>
        </div>
    `;
    
    document.body.prepend(banner);
    document.body.style.paddingTop = '50px';
    
    document.getElementById('phishguard-details').addEventListener('click', () => {
        alert(generateWarningText(findings));
    });
}

function generateWarningText(findings) {
    let warnings = [];
    
    if (findings.homoglyphs) {
        warnings.push(`Homóglifos detectados: ${findings.homoglyphs.map(h => 
            `"${h.found}" parece "${h.original}" na posição ${h.position}`
        ).join(', ')}`);
    }
    
    if (findings.mixedScripts) {
        warnings.push(`Scripts mistos detectados: ${findings.mixedScripts.join(' + ')}`);
    }
    
    if (findings.whitelistMatch) {
        warnings.push(`Similar ao domínio legítimo "${findings.whitelistMatch.match}"`);
    }
    
    return warnings.join('\n\n');
}

function checkCurrentUrl() {
    chrome.runtime.sendMessage({
        type: 'analyze',
        url: window.location.href
    }, (response) => {
        if (response && response.result) {
            const { homoglyphs, mixedScripts, whitelistMatch } = response.result;
            if (homoglyphs || mixedScripts || whitelistMatch) {
                createWarningBanner(response.result);
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkCurrentUrl);
} else {
    checkCurrentUrl();
}