import { Router, Request } from 'express';
import multer from 'multer';
import path from 'path';
import { protect, authorize } from '../middleware/auth';

const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    cb(null, name);
  },
});

const ALLOWED_MIMES_IMAGE = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const ALLOWED_MIMES_PDF = ['application/pdf'];

const imageFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const extOk = /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(path.extname(file.originalname));
  const mimeOk = ALLOWED_MIMES_IMAGE.includes(file.mimetype);
  if (extOk && mimeOk) {
    cb(null, true);
  } else {
    cb(new Error('Solo immagini (jpg, jpeg, png, webp, gif, avif) — formato non valido'));
  }
};

const pdfFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const extOk = /\.pdf$/i.test(path.extname(file.originalname));
  const mimeOk = ALLOWED_MIMES_PDF.includes(file.mimetype);
  if (extOk && mimeOk) {
    cb(null, true);
  } else {
    cb(new Error('Solo file PDF — formato non valido'));
  }
};

const uploadImage = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadPdf = multer({
  storage,
  fileFilter: pdfFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

const router = Router();

router.post('/', protect, authorize('admin'), uploadImage.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'Nessun file caricato' });
    return;
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

router.post('/pdf', protect, authorize('admin'), uploadPdf.single('pdf'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'Nessun file caricato' });
    return;
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

export default router;
