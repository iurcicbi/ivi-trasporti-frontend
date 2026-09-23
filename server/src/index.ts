import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import { config } from './config/env';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import contentRoutes from './routes/content';
import uploadRoutes from './routes/upload';

const app = express();

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Rate limiting globale - più permissivo in development
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuti
  max: config.nodeEnv === 'development' ? 1000 : 100, // 1000 in dev, 100 in produzione
  message: 'Troppe richieste da questo IP, riprova più tardi.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting per API - molto più permissivo in development
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.nodeEnv === 'development' ? 500 : 50, // 500 in dev, 50 in produzione
  message: 'Troppe richieste API, riprova più tardi.',
});

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "http://localhost:3000", "http://localhost:5000"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:3000", "http://localhost:5000"],
    },
  },
  crossOriginEmbedderPolicy: false, // Disabilita COEP per il caricamento immagini
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

app.use(globalLimiter);
app.use('/api', apiLimiter);

app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(mongoSanitize());

app.use('/uploads', express.static(uploadsDir, {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.svg') {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Content-Security-Policy', "script-src 'none'");
    }
  },
}));

app.use('/api/auth', authRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

connectDB().then(() => {
  if (config.nodeEnv === 'production') {
    console.log('Server avviato in modalità produzione');
  } else {
    console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
  }
  
  app.listen(config.port, () => {
    // Log minimo in produzione
  });
});

export default app;