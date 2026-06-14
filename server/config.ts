import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const config = {
  host: process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT) || 3001,
  adminPassword: process.env.ADMIN_PASSWORD || 'gaby123',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
  publicUrl:
    process.env.PUBLIC_URL ||
    process.env.FRONTEND_URL ||
    `http://localhost:${Number(process.env.PORT) || 3001}`,
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== 'false',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    notifyEmail: process.env.NOTIFY_EMAIL || '',
  },
  databasePath:
    process.env.DATABASE_PATH ||
    path.join(__dirname, 'data', 'database.sqlite'),
  isProd: process.env.NODE_ENV === 'production',
}
