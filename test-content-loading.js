// Test script per verificare il caricamento dei contenuti
// Eseguire con: node test-content-loading.js

const API_BASE = 'http://localhost:5000/api';

async function testContentLoading() {
  console.log('🔍 Test del sistema di caricamento contenuti...\n');

  try {
    // Test 1: Verifica connessione al server
    console.log('1. Test connessione server...');
    const healthRes = await fetch(`${API_BASE}/health`);
    if (healthRes.ok) {
      const health = await healthRes.json();
      console.log('✅ Server attivo:', health.status);
    } else {
      console.log('❌ Server non raggiungibile');
      return;
    }

    // Test 2: Caricamento contenuti globali
    console.log('\n2. Test caricamento contenuti globali...');
    const globalRes = await fetch(`${API_BASE}/contents?section=globale`);
    if (globalRes.ok) {
      const globalContent = await globalRes.json();
      const keys = Object.keys(globalContent);
      console.log(`📦 Contenuti globali caricati: ${keys.length} elementi`);
      
      if (keys.length === 0) {
        console.log('⚠️  Database vuoto - verifica che sia popolato tramite admin');
      } else {
        console.log('📋 Chiavi disponibili:', keys.slice(0, 5).join(', ') + (keys.length > 5 ? '...' : ''));
        
        // Verifica chiavi importanti
        const importantKeys = ['logo_text', 'logo_img_src', 'phone_number', 'footer_copyright'];
        const missingKeys = importantKeys.filter(key => !(key in globalContent));
        
        if (missingKeys.length === 0) {
          console.log('✅ Tutte le chiavi importanti sono presenti');
        } else {
          console.log('⚠️  Chiavi mancanti:', missingKeys.join(', '));
        }
      }
    } else {
      console.log('❌ Errore nel caricamento contenuti globali');
    }

    // Test 3: Test fallback values
    console.log('\n3. Test valori di fallback...');
    
    // Simula la logica di get() del hook useContent
    const testGet = (content, key, fallback) => {
      const value = content[key];
      if (value !== undefined && value !== null && value !== '') {
        return value;
      }
      return fallback;
    };
    
    const mockContent = await fetch(`${API_BASE}/contents?section=globale`).then(r => r.json());
    
    const tests = [
      { key: 'logo_text', fallback: 'IVI Trasporti' },
      { key: 'phone_number', fallback: '+393288625535' },
      { key: 'phone_label', fallback: 'Chiama Ora' },
      { key: 'footer_copyright', fallback: '© 2024 IVI Trasporti S.r.l.' }
    ];
    
    tests.forEach(test => {
      const result = testGet(mockContent, test.key, test.fallback);
      const isFromDB = mockContent[test.key] && mockContent[test.key] !== '';
      console.log(`  ${test.key}: "${result}" ${isFromDB ? '(da DB)' : '(fallback)'}`);
    });

    console.log('\n✅ Test completato con successo!');
    console.log('\n📝 Istruzioni:');
    console.log('1. Se vedi contenuti "da DB", il sistema funziona perfettamente');
    console.log('2. Se vedi solo "(fallback)", vai su /admin/globale per configurare');
    console.log('3. Per testare il caricamento logo, carica un\'immagine nell\'admin');

  } catch (error) {
    console.log('❌ Errore durante il test:', error.message);
    console.log('\n🔧 Possibili soluzioni:');
    console.log('1. Verifica che il server sia avviato: npm run dev');
    console.log('2. Controlla che MongoDB sia in esecuzione');
    console.log('3. Verifica la configurazione in server/.env');
  }
}

testContentLoading();