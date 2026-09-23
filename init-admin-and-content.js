// Script per inizializzare admin user e contenuti di default
// Eseguire con: node init-admin-and-content.js

const API_BASE = 'http://localhost:5000/api';

async function initAdminAndContent() {
  console.log('🚀 Inizializzazione admin e contenuti...\n');

  try {
    // Test connessione server
    console.log('1. Verifica connessione server...');
    const healthRes = await fetch(`${API_BASE}/health`);
    if (!healthRes.ok) {
      throw new Error('Server non raggiungibile. Assicurati che sia avviato con: npm run dev');
    }
    console.log('✅ Server connesso');

    // Crea admin user se non esiste
    console.log('\n2. Creazione utente admin...');
    try {
      const registerRes = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@ivitrasporti.it',
          password: 'admin123',
          name: 'Amministratore',
          role: 'admin'
        })
      });
      
      if (registerRes.ok) {
        console.log('✅ Admin user creato: admin@ivitrasporti.it / admin123');
      } else {
        const errorData = await registerRes.json().catch(() => ({}));
        if (registerRes.status === 400 && errorData.message?.includes('esiste')) {
          console.log('ℹ️  Admin user già esistente');
        } else {
          console.log('⚠️  Errore creazione admin:', errorData.message || 'Sconosciuto');
        }
      }
    } catch (err) {
      console.log('⚠️  Errore nella creazione admin:', err.message);
    }

    // Login admin
    console.log('\n3. Login admin...');
    const loginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@ivitrasporti.it',
        password: 'admin123'
      })
    });

    if (!loginRes.ok) {
      const loginError = await loginRes.json().catch(() => ({}));
      throw new Error(`Login fallito: ${loginError.message || 'Credenziali non valide'}`);
    }

    const { token } = await loginRes.json();
    console.log('✅ Login effettuato con successo');

    // Inizializza contenuti di default
    console.log('\n4. Inizializzazione contenuti di default...');
    const initRes = await fetch(`${API_BASE}/contents/init-defaults`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!initRes.ok) {
      throw new Error('Errore nell\'inizializzazione contenuti');
    }

    const initData = await initRes.json();
    console.log(`✅ Contenuti inizializzati: ${initData.created} creati, ${initData.updated} aggiornati`);

    // Verifica caricamento contenuti
    console.log('\n5. Verifica contenuti caricati...');
    const contentRes = await fetch(`${API_BASE}/contents?section=globale`);
    const content = await contentRes.json();
    const keys = Object.keys(content);
    
    console.log(`✅ ${keys.length} contenuti globali disponibili`);
    
    // Mostra alcuni contenuti chiave
    console.log('\n📋 Contenuti principali:');
    const mainKeys = ['logo_text', 'phone_number', 'footer_copyright'];
    mainKeys.forEach(key => {
      if (content[key]) {
        console.log(`  ${key}: "${content[key]}"`);
      }
    });

    console.log('\n🎉 Inizializzazione completata con successo!');
    console.log('\n📝 Prossimi passi:');
    console.log('1. Vai su http://localhost:3000 per vedere il sito');
    console.log('2. Login admin: http://localhost:3000/admin/login');
    console.log('   Email: admin@ivitrasporti.it');
    console.log('   Password: admin123');
    console.log('3. Configura: http://localhost:3000/admin/globale');
    console.log('4. Carica il logo e personalizza i contenuti');

  } catch (error) {
    console.log('\n❌ Errore durante l\'inizializzazione:', error.message);
    console.log('\n🔧 Possibili soluzioni:');
    console.log('1. Assicurati che il server sia avviato: npm run dev');
    console.log('2. Controlla che MongoDB sia in esecuzione');
    console.log('3. Verifica la configurazione in server/.env');
  }
}

// Aggiungi fetch per Node.js se necessario
if (typeof fetch === 'undefined') {
  console.log('Installing fetch...');
  const { default: fetch } = await import('node-fetch');
  globalThis.fetch = fetch;
}

initAdminAndContent();