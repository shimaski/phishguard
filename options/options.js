// Tab Navigation
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab + '-tab').classList.add('active');
  });
});

// Whitelist Management
async function loadWhitelist() {
  const result = await chrome.storage.local.get('customWhitelist');
  const customList = result.customWhitelist || [];
  const customUl = document.getElementById('customWhitelist');
  
  customUl.innerHTML = customList.length === 0 
    ? '<li style="color: #999;">Nenhum domínio</li>'
    : customList.map(d => `<li><span>${d}</span></li>`).join('');
}

document.getElementById('addDomain').addEventListener('click', async () => {
  const domain = document.getElementById('newDomain').value.trim();
  if (!domain) return;
  
  const result = await chrome.storage.local.get('customWhitelist');
  const list = result.customWhitelist || [];
  list.push(domain);
  await chrome.storage.local.set({ customWhitelist: list });
  document.getElementById('newDomain').value = '';
  loadWhitelist();
});

// Statistics
async function loadStats() {
  const result = await chrome.storage.local.get('stats');
  const stats = result.stats || { totalScans: 0, threatsBlocked: 0, safeSites: 0 };
  
  document.getElementById('totalScans').textContent = stats.totalScans;
  document.getElementById('threatsBlocked').textContent = stats.threatsBlocked;
  document.getElementById('safeSites').textContent = stats.safeSites;
}

document.getElementById('exportStats').addEventListener('click', () => {
  chrome.storage.local.get('stats', (result) => {
    const blob = new Blob([JSON.stringify(result.stats, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phishguard-stats.json';
    a.click();
  });
});

// API Configuration
document.getElementById('saveApiKey').addEventListener('click', async () => {
  const apiKey = document.getElementById('apiKey').value.trim();
  if (apiKey) {
    await chrome.storage.local.set({ apiKey });
    alert('✅ API Key salva!');
  }
});

loadWhitelist();
loadStats();