document.addEventListener('DOMContentLoaded', () => {
    const statusEl = document.getElementById('status');
    const resultsEl = document.getElementById('results');
    const scanBtn = document.getElementById('scan');
    
    function updateUI(results) {
        if (!results.homoglyphs && !results.mixedScripts && !results.whitelistMatch) {
            statusEl.textContent = '✅ Nenhuma ameaça detectada';
            statusEl.style.color = '#22c55e';
            resultsEl.innerHTML = '<p class="safe">Este site parece seguro!</p>';
            return;
        }
        
        statusEl.textContent = '⚠️ Ameaças potenciais detectadas!';
        statusEl.style.color = '#ff4444';
        
        let html = '';
        
        if (results.homoglyphs) {
            html += '<div class="warning"><h3>Homóglifos Detectados</h3><ul>';
            results.homoglyphs.forEach(h => {
                html += `<li>"${h.found}" parece "${h.original}" (pos: ${h.position})</li>`;
            });
            html += '</ul></div>';
        }
        
        if (results.mixedScripts) {
            html += `<div class="warning"><h3>Scripts Mistos</h3><p>Scripts: ${results.mixedScripts.join(' + ')}</p></div>`;
        }
        
        if (results.whitelistMatch) {
            html += `<div class="warning"><h3>Similaridade Suspeita</h3><p>Similar a "${results.whitelistMatch.match}"</p></div>`;
        }
        
        resultsEl.innerHTML = html;
    }
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.runtime.sendMessage({
                type: 'analyze',
                url: tabs[0].url
            }, (response) => {
                if (response && response.result) {
                    updateUI(response.result);
                }
            });
        }
    });
    
    scanBtn.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.reload(tabs[0].id);
            }
        });
    });
});