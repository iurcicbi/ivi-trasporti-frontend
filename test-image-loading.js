// Test caricamento immagini
// Eseguire con: node test-image-loading.js

const API_BASE = 'http://localhost:5000/api';
const FRONTEND_BASE = 'http://localhost:3000';

async function testImageLoading() {
  console.log('Test caricamento immagini...\n');

  try {
    // 1. Ottieni contenuti per verificare immagini configurate
    console.log('1. Verifica immagini nei contenuti...');
    const contents = await fetch(`${API_BASE}/contents?section=globale`).then(r => r.json());
    
    const imageKeys = Object.entries(contents)
      .filter(([key, value]) => key.includes('img_src') && value)
      .map(([key, value]) => ({ key, value: String(value) }));

    if (imageKeys.length === 0) {
      console.log('Nessuna immagine configurata nei contenuti');
      console.log('Vai su /admin/globale per caricare un logo');
      return;
    }

    console.log(`Trovate ${imageKeys.length} immagini:`);
    imageKeys.forEach(({ key, value }) => {
      console.log(`  ${key}: ${value}`);
    });

    // 2. Test accesso diretto al server backend
    console.log('\n2. Test accesso diretto server backend...');
    for (const { key, value } of imageKeys) {
      if (value.startsWith('/uploads/')) {
        const directUrl = `${API_BASE}${value}`;
        try {
          const response = await fetch(directUrl, { method: 'HEAD' });
          console.log(`  ${key}: ${response.ok ? 'OK' : 'ERRORE'} (${response.status}) - ${directUrl}`);
        } catch (err) {
          console.log(`  ${key}: ERRORE - ${err.message}`);
        }
      }
    }

    // 3. Test rewrite Next.js
    console.log('\n3. Test rewrite Next.js...');
    for (const { key, value } of imageKeys) {
      if (value.startsWith('/uploads/')) {
        const rewriteUrl = `${FRONTEND_BASE}${value}`;
        try {
          const response = await fetch(rewriteUrl, { method: 'HEAD' });
          console.log(`  ${key}: ${response.ok ? 'OK' : 'ERRORE'} (${response.status}) - ${rewriteUrl}`);
        } catch (err) {
          console.log(`  ${key}: ERRORE - ${err.message}`);
        }
      }
    }

    console.log('\nTest completato!');
    console.log('\nSe vedi errori:');
    console.log('1. Verifica che entrambi i server siano avviati: npm run dev');
    console.log('2. Controlla il browser: apri Network tab e ricarica la pagina');
    console.log('3. Usa il debug component: clicca "DEBUG" sulla pagina');

  } catch (error) {
    console.log('Errore durante il test:', error.message);
  }
}

// Node.js fetch polyfill
if (typeof fetch === 'undefined') {
  const { default: fetch } = await import('node-fetch');
  globalThis.fetch = fetch;
}

testImageLoading();