// Verifica stato completo del sistema
// Eseguire con: node status-check.js

const API_BASE = 'http://localhost:5000/api';

async function checkSystemStatus() {
  console.log('Verifica stato sistema IVI Trasporti\n');

  try {
    // 1. Server health
    const health = await fetch(`${API_BASE}/health`).then(r => r.json());
    console.log('Server:', health.status === 'ok' ? 'Attivo' : 'Errore');

    // 2. Contenuti globali
    const contents = await fetch(`${API_BASE}/contents?section=globale`).then(r => r.json());
    const keys = Object.keys(contents);
    console.log(`Contenuti globali: ${keys.length} elementi`);

    // 3. Contenuti chiave
    console.log('\nContenuti principali:');
    const mainContents = {
      'Logo': contents.logo_text || 'Mancante',
      'Telefono': contents.phone_number || 'Mancante',
      'Menu Home': contents.nav_home || 'Mancante',
      'Footer Copyright': contents.footer_copyright || 'Mancante'
    };
    
    Object.entries(mainContents).forEach(([label, value]) => {
      const status = value.includes('Mancante') ? value : 'Configurato';
      console.log(`  ${label}: ${status}`);
    });

    // 4. Test login admin
    console.log('\nTest login admin...');
    try {
      const loginRes = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@ivitrasporti.it',
          password: 'admin123'
        })
      });
      
      if (loginRes.ok) {
        const { role, name } = await loginRes.json();
        console.log(`Login OK: ${name} (${role})`);
      } else {
        console.log('Login fallito');
      }
    } catch {
      console.log('Errore login');
    }

    // 5. Riepilogo
    console.log('\nSTATO SISTEMA:');
    const allGood = keys.length > 0 && contents.logo_text && contents.phone_number;
    
    if (allGood) {
      console.log('TUTTO FUNZIONANTE!');
      console.log('\nAccessi rapidi:');
      console.log('• Sito: http://localhost:3000');
      console.log('• Admin: http://localhost:3000/admin/login');
      console.log('• Globale: http://localhost:3000/admin/globale');
      console.log('\nCredenziali admin:');
      console.log('Email: admin@ivitrasporti.it');
      console.log('Password: admin123');
    } else {
      console.log('CONFIGURAZIONE INCOMPLETA');
      console.log('\nDa fare:');
      if (keys.length === 0) console.log('• Inizializzare contenuti: node init-admin-and-content.js');
      if (!contents.logo_text) console.log('• Configurare logo nell\'admin');
    }

    console.log('\nIl componente debug è attivo in sviluppo');
    console.log('Clicca "DEBUG" in basso a destra per monitorare');

  } catch (error) {
    console.log('Errore sistema:', error.message);
    console.log('\nSoluzioni:');
    console.log('1. Avvia server: npm run dev');
    console.log('2. Controlla MongoDB');
    console.log('3. Verifica .env in server/');
  }
}

// Node.js fetch polyfill
if (typeof fetch === 'undefined') {
  const { default: fetch } = await import('node-fetch');
  globalThis.fetch = fetch;
}

checkSystemStatus();