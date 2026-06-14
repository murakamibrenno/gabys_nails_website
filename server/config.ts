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
  databasePath:
    process.env.DATABASE_PATH ||
    path.join(__dirname, 'data', 'database.sqlite'),
  isProd: process.env.NODE_ENV === 'production',
}
