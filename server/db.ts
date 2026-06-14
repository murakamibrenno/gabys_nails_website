import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'
import { config } from './config.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (db) return db

  const dir = path.dirname(config.databasePath)
  fs.mkdirSync(dir, { recursive: true })

  db = new Database(config.databasePath)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  return db
}

export function runMigrations(): void {
  const database = getDb()
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8')
  database.exec(schema)

  const columns = database.prepare('PRAGMA table_info(bookings)').all() as {
    name: string
  }[]
  if (!columns.some((column) => column.name === 'client_email')) {
    database.exec('ALTER TABLE bookings ADD COLUMN client_email TEXT')
  }
}

export type BookingRow = {
  id: string
  service_id: string
  service_name: string
  price: number
  date: string
  time: string
  client_name: string
  client_phone: string
  client_email: string | null
  notes: string | null
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}
