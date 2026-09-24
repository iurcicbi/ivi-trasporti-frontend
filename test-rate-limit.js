// Test veloce per verificare il rate limiting
// Eseguire con: node test-rate-limit.js

const API_BASE = 'http://localhost:5000/api';

async function testRateLimit() {
  console.log('Test Rate Limiting - Simulazione navigazione veloce\n');

  try {
    const requests = [];
    const maxRequests = 20; // Simula 20 navigazioni rapide
    
    console.log(`Eseguendo ${maxRequests} richieste in parallelo...`);
    
    for (let i = 0; i < maxRequests; i++) {
      const request = fetch(`${API_BASE}/contents?section=globale`)
        .then(r => ({ status: r.status, ok: r.ok, index: i + 1 }))
        .catch(e => ({ error: e.message, index: i + 1 }));
      requests.push(request);
    }
    
    const results = await Promise.all(requests);
    
    console.log('\nRisultati:');
    let success = 0;
    let failed = 0;
    let rateLimited = 0;
    
    results.forEach(result => {
      if (result.ok) {
        success++;
        console.log(`   Richiesta ${result.index}: OK (${result.status})`);
      } else if (result.status === 429) {
        rateLimited++;
        console.log(`   Richiesta ${result.index}: RATE LIMITED (429)`);
      } else if (result.error) {
        failed++;
        console.log(`   Richiesta ${result.index}: ERRORE (${result.error})`);
      } else {
        failed++;
        console.log(`   Richiesta ${result.index}: FALLITA (${result.status})`);
      }
    });
    
    console.log(`\nStatistiche:`);
    console.log(`   Successo: ${success}/${maxRequests}`);
    console.log(`   Rate Limited: ${rateLimited}/${maxRequests}`);
    console.log(`   Altri errori: ${failed}/${maxRequests}`);
    
    if (rateLimited > 0) {
      console.log(`\nPROBLEMA: Rilevato rate limiting dopo ${success} richieste`);
      console.log(`   Soluzione: Aumentare i limiti o migliorare la cache`);
    } else {
      console.log(`\nPERFETTO: Nessun rate limiting rilevato!`);
      console.log(`   La cache e i nuovi limiti funzionano correttamente`);
    }
    
  } catch (error) {
    console.log('Errore durante il test:', error.message);
  }
}

// Node.js fetch polyfill
if (typeof fetch === 'undefined') {
  const { default: fetch } = await import('node-fetch');
  globalThis.fetch = fetch;
}

testRateLimit();