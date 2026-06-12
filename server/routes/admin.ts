import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { timingSafeEqual } from 'node:crypto'
import { config } from '../config.js'
import { getDb, type BookingRow } from '../db.js'
import { requireAdmin } from '../middleware/auth.js'

const router = Router()

function rowToJson(row: BookingRow) {
  return {
    id: row.id,
    servicoId: row.service_id,
    servicoNome: row.service_name,
    preco: row.price,
    data: row.date,
    horario: row.time,
    status: row.status,
    cliente: {
      nome: row.client_name,
      telefone: row.client_phone,
      observacoes: row.notes ?? '',
    },
    criadoEm: row.created_at,
  }
}

function senhaCorreta(informada: string): boolean {
  const a = Buffer.from(informada)
  const b = Buffer.from(config.adminPassword)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

router.post('/login', (req, res) => {
  const password = String(req.body?.password ?? '')
  if (!senhaCorreta(password)) {
    res.status(401).json({ error: 'Senha incorreta.' })
    return
  }

  const token = jwt.sign({ role: 'admin' }, config.jwtSecret, {
    expiresIn: '7d',
  })

  res.cookie('admin_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: config.isProd,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
  res.json({ ok: true })
})

router.post('/logout', (_req, res) => {
  res.clearCookie('admin_token')
  res.json({ ok: true })
})

router.get('/me', requireAdmin, (_req, res) => {
  res.json({ ok: true })
})

router.get('/bookings', requireAdmin, (req, res) => {
  const status = req.query.status ? String(req.query.status) : undefined
  const date = req.query.date ? String(req.query.date) : undefined

  let sql = 'SELECT * FROM bookings WHERE 1=1'
  const params: string[] = []

  if (status && ['pending', 'confirmed', 'cancelled'].includes(status)) {
    sql += ' AND status = ?'
    params.push(status)
  }
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    sql += ' AND date = ?'
    params.push(date)
  }

  sql += ' ORDER BY date ASC, time ASC, created_at DESC'

  const rows = getDb().prepare(sql).all(...params) as BookingRow[]
  res.json(rows.map(rowToJson))
})

router.patch('/bookings/:id', requireAdmin, (req, res) => {
  const { id } = req.params
  const status = req.body?.status as string

  if (!['confirmed', 'cancelled'].includes(status)) {
    res.status(400).json({ error: 'Status inválido.' })
    return
  }

  const existing = getDb()
    .prepare('SELECT * FROM bookings WHERE id = ?')
    .get(id) as BookingRow | undefined

  if (!existing) {
    res.status(404).json({ error: 'Agendamento não encontrado.' })
    return
  }

  if (existing.status === 'cancelled') {
    res.status(400).json({ error: 'Agendamento já cancelado.' })
    return
  }

  getDb()
    .prepare('UPDATE bookings SET status = ? WHERE id = ?')
    .run(status, id)

  const updated = getDb()
    .prepare('SELECT * FROM bookings WHERE id = ?')
    .get(id) as BookingRow

  res.json(rowToJson(updated))
})

export default router
