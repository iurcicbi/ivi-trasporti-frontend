import { Router } from 'express';
import nodemailer from 'nodemailer';
import { config } from '../config/env';

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmailBody(payload: Record<string, unknown>) {
  const rows: { label: string; value: unknown }[] = [
    { label: 'Ragione Sociale / Nome', value: payload.company || payload.name },
    { label: 'Email di contatto', value: payload.email },
    { label: 'Telefono', value: payload.phone },
    { label: 'Punto di carico', value: payload.pickup },
    { label: 'Destinazione', value: payload.destination },
    { label: 'Tipologia servizio', value: payload.service },
    { label: 'Dettagli / Specifiche', value: payload.notes || payload.details },
  ];

  const rowsHtml = rows
    .filter((r) => r.value !== undefined && r.value !== null && String(r.value).trim() !== '')
    .map(
      (r) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#64748b;white-space:nowrap;">${escapeHtml(r.label)}</td>` +
        `<td style="padding:8px 12px;border-bottom:1px solid #eee;color:#0f172a;">${escapeHtml(r.value)}</td></tr>`
    )
    .join('');

  const textRows = rows
    .filter((r) => r.value !== undefined && r.value !== null && String(r.value).trim() !== '')
    .map((r) => `${r.label}: ${String(r.value)}`)
    .join('\n');

  return { html: rowsHtml, text: textRows };
}

router.post('/send', async (req, res) => {
  const body = req.body ?? {};

  const email = String(body.email || '').trim();
  const company = String(body.company || body.name || '').trim();

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Inserisci un indirizzo email valido' });
  }
  if (!company) {
    return res.status(400).json({ error: 'Inserisci la ragione sociale o il nome' });
  }
  if (body.privacy === false || body.privacy === 'false') {
    return res.status(400).json({ error: 'Devi accettare la privacy policy' });
  }
  if (
    !body.pickup &&
    !body.destination &&
    !body.service &&
    !body.phone &&
    !body.notes &&
    !body.details
  ) {
    return res.status(400).json({ error: 'Compila almeno un campo oltre a nome ed email' });
  }

  const { smtp } = config;
  if (!smtp.user || !smtp.pass) {
    console.error('SMTP non configurato: SMTP_USER e SMTP_PASS mancanti');
    return res.status(500).json({ error: 'Invio email non configurato sul server' });
  }

  const { html, text } = buildEmailBody(body);

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Sito IVI Trasporti" <${smtp.from}>`,
      to: smtp.to,
      replyTo: smtp.replyTo || email,
      subject: `Nuova richiesta dal sito — ${company}`,
      text: `Nuova richiesta ricevuta dal sito ivi-trasporti.online\n\n${text}\n\n—\nInviato in automatico dal form del sito.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#0a2540;">Nuova richiesta dal sito</h2>
          <p style="color:#64748b;">Ricevuta dal form del sito ivi-trasporti.online</p>
          <table style="width:100%;border-collapse:collapse;background:#fff;">${html}</table>
          <p style="color:#94a3b8;font-size:12px;margin-top:16px;">Inviato in automatico dal form del sito. Non rispondere a questo indirizzo.</p>
        </div>`,
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('Errore invio email:', err);
    return res.status(500).json({ error: "Errore nell'invio dell'email, riprova più tardi" });
  }
});

export default router;