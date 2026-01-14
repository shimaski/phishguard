document.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById('status');
  const resultsEl = document.getElementById('results');
  const scanBtn = document.getElementById('scan');
  const statsBtn = document.getElementById('stats');
  const falsePositiveBtn = document.getElementById('falsePositive');
  const confirmThreatBtn = document.getElementById('confirmThreat');
  
  let currentUrl = '';
  
  function updateUI(results) {
    if (!results.homoglyphs) {
      statusEl.textContent = '✅ Nenhuma ameaça detectada';
      statusEl.style.color = '#27ae60';
      resultsEl.innerHTML = '<p style="text-align:center;color:#27ae60;">Site seguro! 🛡️</p>';
      falsePositiveBtn.style.display = 'none';
      confirmThreatBtn.style.display = 'none';
      return;
    }
    
    statusEl.textContent = '⚠️ Ameaças detectadas!';
    statusEl.style.color = '#e74c3c';
    falsePositiveBtn.style.display = 'block';
    confirmThreatBtn.style.display = 'block';
    
    let html = '<div class="warning"><h3>🔤 Homóglifos Detectados</h3><ul>';
    results.homoglyphs.forEach(h => {
      html += `<li>"${h.found}" parece "${h.original}" (pos: ${h.position})</li>`;
    });
    html += '</ul></div>';
    resultsEl.innerHTML = html;
  }
  
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      currentUrl = tabs[0].url;
      chrome.runtime.sendMessage({ type: 'analyze', url: currentUrl }, (response) => {
        if (response && response.result) updateUI(response.result);
      });
    }
  });
  
  scanBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) chrome.tabs.reload(tabs[0].id);
    });
  });
  
  statsBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
  
  falsePositiveBtn.addEventListener('click', () => {
    if (!currentUrl) return;
    const domain = new URL(currentUrl).hostname;
    chrome.runtime.sendMessage({ type: 'addToWhitelist', domain }, () => {
      alert('✅ Site adicionado à whitelist!');
      window.close();
    });
  });
  
  confirmThreatBtn.addEventListener('click', () => {
    alert('✅ Obrigado! Sua confirmação ajuda a melhorar a detecção.');
    window.close();
  });
});