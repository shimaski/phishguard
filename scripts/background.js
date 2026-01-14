// PhishGuard Pro v2.0
const CONFIG = {
  SAFE_BROWSING_API_KEY: '', // Será configurado nas opções
  CACHE_DURATION: 3600000
};

class StorageManager {
  static async get(key, defaultValue = null) {
    const result = await chrome.storage.local.get(key);
    return result[key] || defaultValue;
  }

  static async set(key, value) {
    await chrome.storage.local.set({ [key]: value });
  }

  static async getStats() {
    return await this.get('stats', {
      totalScans: 0,
      threatsBlocked: 0,
      safeSites: 0,
      lastScan: null,
      threatHistory: []
    });
  }

  static async updateStats(isThreat, url, type) {
    const stats = await this.getStats();
    stats.totalScans++;
    stats.lastScan = new Date().toISOString();
    
    if (isThreat) {
      stats.threatsBlocked++;
      stats.threatHistory.unshift({
        url, timestamp: new Date().toISOString(), type
      });
      stats.threatHistory = stats.threatHistory.slice(0, 100);
    } else {
      stats.safeSites++;
    }
    
    await this.set('stats', stats);
  }

  static async getCustomWhitelist() {
    return await this.get('customWhitelist', []);
  }

  static async addToWhitelist(domain) {
    const whitelist = await this.getCustomWhitelist();
    if (!whitelist.includes(domain)) {
      whitelist.push(domain);
      await this.set('customWhitelist', whitelist);
    }
  }
}

const DEFAULT_WHITELIST = new Set([
  'google.com', 'github.com', 'paypal.com', 'amazon.com',
  'mercadolivre.com.br', 'bancodobrasil.com.br', 'itau.com.br'
]);

const HOMOGLYPHS = {
  'a': ['а', 'α'], 'c': ['с', 'ϲ'], 'e': ['е'],
  'i': ['і'], 'o': ['о', 'ο'], 'p': ['р']
};

function checkHomoglyphs(domain) {
  const results = [];
  for (let i = 0; i < domain.length; i++) {
    const char = domain[i];
    for (const [latin, variants] of Object.entries(HOMOGLYPHS)) {
      if (variants.includes(char)) {
        results.push({ position: i, original: latin, found: char });
      }
    }
  }
  return results.length > 0 ? results : false;
}

async function analyzeDomain(url) {
  const cleanDomain = url.replace(/^https?:\/\//, '').split('/')[0];
  const results = {
    original: url,
    homoglyphs: checkHomoglyphs(cleanDomain),
    timestamp: new Date().toISOString()
  };
  
  const isThreat = results.homoglyphs;
  await StorageManager.updateStats(isThreat, url, 'homoglyph');
  
  return results;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'analyze') {
    analyzeDomain(request.url).then(result => {
      if (result.homoglyphs) {
        chrome.action.setBadgeText({ text: '!' });
        chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
      } else {
        chrome.action.setBadgeText({ text: '' });
      }
      sendResponse({ result });
    });
    return true;
  }
  
  if (request.type === 'getStats') {
    StorageManager.getStats().then(sendResponse);
    return true;
  }
  
  if (request.type === 'addToWhitelist') {
    StorageManager.addToWhitelist(request.domain).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});