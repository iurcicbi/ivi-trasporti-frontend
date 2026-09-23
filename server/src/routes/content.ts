import { Router, Request, Response } from 'express';
import Content from '../models/Content';
import { protect, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const { section } = _req.query;
    let contents;
    if (section && typeof section === 'string') {
      contents = await Content.find({ section }).lean();
    } else {
      contents = await Content.find().lean();
    }
    const map: Record<string, any> = {};
    contents.forEach((c) => {
      map[c.key] = c.value;
    });
    res.json(map);
  } catch {
    res.status(500).json({ message: 'Errore nel caricamento dei contenuti' });
  }
});

router.get('/list', async (_req: Request, res: Response) => {
  try {
    const { section } = _req.query;
    let contents;
    if (section && typeof section === 'string') {
      contents = await Content.find({ section }).lean();
    } else {
      contents = await Content.find().lean();
    }
    const list = contents.map((c) => ({
      key: c.key,
      value: c.value,
      label: c.label,
      type: c.type,
    }));
    res.json(list);
  } catch {
    res.status(500).json({ message: 'Errore nel caricamento dei contenuti' });
  }
});

router.put('/bulk', protect, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const { updates } = req.body as { updates: { key: string; value: any; section?: string; label?: string; type?: string }[] };
    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ message: 'Nessun aggiornamento fornito' });
    }
    
    for (const u of updates) {
      // Determina la sezione, tipo e label se non forniti
      const section = u.section || (u.key.startsWith('seo_') ? 'seo' : 'globale');
      const type = u.type || 'text';
      const label = u.label || u.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      await Content.updateOne(
        { key: u.key },
        {
          $set: {
            key: u.key,
            value: u.value,
            section,
            label,
            type
          }
        },
        { upsert: true } // Crea il documento se non esiste
      );
    }
    
    const updated = await Content.find().lean();
    const map: Record<string, any> = {};
    updated.forEach((c) => {
      map[c.key] = c.value;
    });
    res.json({ message: 'Contenuti aggiornati', contents: map });
  } catch (error) {
    console.error('Errore nel salvataggio dei contenuti:', error);
    res.status(500).json({ message: 'Errore nel salvataggio dei contenuti' });
  }
});

// Endpoint per inizializzare i contenuti di default (solo per sviluppo)
router.post('/init-defaults', protect, authorize('admin'), async (req: AuthRequest, res: Response) => {
  try {
    const defaultContents = [
      // Logo e brand
      { key: 'logo_text', value: 'IVI Trasporti', section: 'globale', label: 'Testo Logo', type: 'text' },
      { key: 'logo_img_src', value: '', section: 'globale', label: 'Logo Immagine', type: 'image' },
      
      // Menu navigazione
      { key: 'nav_home', value: 'Home', section: 'globale', label: 'Menu Home', type: 'text' },
      { key: 'nav_services', value: 'Servizi', section: 'globale', label: 'Menu Servizi', type: 'text' },
      { key: 'nav_about', value: 'Chi Siamo', section: 'globale', label: 'Menu Chi Siamo', type: 'text' },
      { key: 'nav_contact', value: 'Contatti', section: 'globale', label: 'Menu Contatti', type: 'text' },
      
      // Telefono
      { key: 'phone_number', value: '+393288625535', section: 'globale', label: 'Numero Telefono', type: 'text' },
      { key: 'phone_label', value: 'Chiama Ora', section: 'globale', label: 'Testo Pulsante Chiamata', type: 'text' },
      
      // Footer
      { key: 'footer_sede_title', value: 'Sede Operativa', section: 'globale', label: 'Titolo Sede', type: 'text' },
      { key: 'footer_sede_indirizzo', value: 'Via dell\'Industria, 42', section: 'globale', label: 'Indirizzo', type: 'text' },
      { key: 'footer_sede_citta', value: '43122 Parma (PR)', section: 'globale', label: 'Città', type: 'text' },
      { key: 'footer_sede_paese', value: 'Italia', section: 'globale', label: 'Paese', type: 'text' },
      { key: 'footer_contatti_title', value: 'Contatti Diretti', section: 'globale', label: 'Titolo Contatti', type: 'text' },
      { key: 'footer_telefono', value: 'Tel: +39 0521 1234567', section: 'globale', label: 'Footer Telefono', type: 'text' },
      { key: 'footer_email', value: 'Email: info@ivitrasporti.it', section: 'globale', label: 'Footer Email', type: 'text' },
      { key: 'footer_pec', value: 'PEC: ivitrasportisrls@pec.it', section: 'globale', label: 'Footer PEC', type: 'text' },
      { key: 'footer_legali_title', value: 'Informazioni Legali', section: 'globale', label: 'Titolo Legali', type: 'text' },
      { key: 'footer_piva', value: 'P.IVA 01234567890', section: 'globale', label: 'Partita IVA', type: 'text' },
      { key: 'footer_rea', value: 'REA: PR-123456', section: 'globale', label: 'REA', type: 'text' },
      { key: 'footer_privacy_label', value: 'Privacy Policy', section: 'globale', label: 'Link Privacy', type: 'text' },
      { key: 'privacy_policy_url', value: '', section: 'globale', label: 'URL Privacy Policy', type: 'text' },
      { key: 'footer_termini_label', value: 'Cookie Policy', section: 'globale', label: 'Link Cookie', type: 'text' },
      { key: 'cookie_policy_url', value: '', section: 'globale', label: 'URL Cookie Policy', type: 'text' },
      { key: 'footer_seguici_title', value: 'Seguici', section: 'globale', label: 'Titolo Social', type: 'text' },
      { key: 'footer_copyright', value: '© 2024 IVI Trasporti S.r.l. - Parma, Italia - Tutti i diritti riservati.', section: 'globale', label: 'Copyright', type: 'textarea' },
      { key: 'footer_lang_label', value: 'ITALIANO', section: 'globale', label: 'Lingua', type: 'text' },
      { key: 'footer_version', value: 'v2.1.0', section: 'globale', label: 'Versione', type: 'text' },
    ];
    
    let created = 0;
    let updated = 0;
    
    for (const content of defaultContents) {
      const existing = await Content.findOne({ key: content.key });
      if (existing) {
        // Se esiste già, aggiorna solo se il valore è vuoto
        if (!existing.value || existing.value === '') {
          await Content.updateOne({ key: content.key }, { $set: content });
          updated++;
        }
      } else {
        // Se non esiste, crea nuovo
        await Content.create(content);
        created++;
      }
    }
    
    res.json({ 
      message: 'Contenuti di default inizializzati', 
      created, 
      updated,
      total: defaultContents.length 
    });
  } catch (error) {
    console.error('Errore nell\'inizializzazione:', error);
    res.status(500).json({ message: 'Errore nell\'inizializzazione dei contenuti' });
  }
});

export default router;
