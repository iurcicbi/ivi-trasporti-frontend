import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const requireEnv = (key: string, fallback?: string): string => {
  const val = process.env[key] || fallback;
  if (!val) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return val;
};

export const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  user: process.env.SMTP_USER || '',
  pass: process.env.SMTP_PASS || '',
  from: process.env.MAIL_FROM || 'info@ivi-trasporti.online',
  replyTo: process.env.MAIL_REPLY_TO || '',
  to: process.env.MAIL_TO || 'info@ivi-trasporti.online',
};

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  mongodbUri: requireEnv('MONGODB_URI', 'mongodb://localhost:27017/ivi-trasporti'),
  jwtSecret: requireEnv('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  adminPassword: process.env.ADMIN_PASSWORD,
  smtp: smtpConfig,
};