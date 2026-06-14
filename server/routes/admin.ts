import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { timingSafeEqual } from 'node:crypto'
import { config } from '../config.js'
import { getDb, type BookingRow } from '../db.js'
import { requireAdmin } from '../middleware/auth.js'
import { isValidBookingConfirmToken } from '../bookingLinks.js'
import { notifyBookingConfirmed } from '../notifications.js'

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
      email: row.client_email ?? '',
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

router.get('/bookings/:id/confirm', (req, res) => {
  const { id } = req.params
  const token = String(req.query.token ?? '')

  const existing = getDb()
    .prepare('SELECT * FROM bookings WHERE id = ?')
    .get(id) as BookingRow | undefined

  if (!existing || !isValidBookingConfirmToken(existing, token)) {
    res
      .status(404)
      .send(
        confirmPage(
          'Link inválido',
          'Não foi possível confirmar este agendamento.',
        ),
      )
    return
  }

  if (existing.status === 'cancelled') {
    res
      .status(400)
      .send(
        confirmPage(
          'Agendamento cancelado',
          'Este agendamento já estava cancelado.',
        ),
      )
    return
  }

  const shouldNotifyClient = existing.status !== 'confirmed'
  if (shouldNotifyClient) {
    getDb()
      .prepare('UPDATE bookings SET status = ? WHERE id = ?')
      .run('confirmed', id)
  }

  const updated = getDb()
    .prepare('SELECT * FROM bookings WHERE id = ?')
    .get(id) as BookingRow

  if (shouldNotifyClient) {
    notifyBookingConfirmed(updated).catch((err: unknown) => {
      console.error('Falha ao enviar email de confirmação ao cliente:', err)
    })
  }

  res.send(
    confirmPage(
      'Agendamento confirmado',
      `${updated.client_name} - ${updated.date} às ${updated.time}`,
    ),
  )
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

  const shouldNotifyClient =
    status === 'confirmed' && existing.status !== 'confirmed'

  getDb()
    .prepare('UPDATE bookings SET status = ? WHERE id = ?')
    .run(status, id)

  const updated = getDb()
    .prepare('SELECT * FROM bookings WHERE id = ?')
    .get(id) as BookingRow

  if (shouldNotifyClient) {
    notifyBookingConfirmed(updated).catch((err: unknown) => {
      console.error('Falha ao enviar email de confirmação ao cliente:', err)
    })
  }

  res.json(rowToJson(updated))
})

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function confirmPage(title: string, message: string): string {
  return `<!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${escapeHtml(title)}</title>
        <style>
          body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: Arial, sans-serif; background: #fff8f5; color: #2b1a1f; }
          main { width: min(92vw, 460px); border: 1px solid #ead7d1; border-radius: 24px; padding: 32px; background: #fffdfb; text-align: center; box-shadow: 0 18px 50px rgba(43, 26, 31, 0.12); }
          h1 { margin: 0 0 10px; color: #6b2a33; font-size: 28px; }
          p { margin: 0 0 24px; color: #6f5158; }
          a { display: inline-block; padding: 12px 18px; border-radius: 999px; background: #6b2a33; color: #fff; text-decoration: none; font-weight: 700; }
        </style>
      </head>
      <body>
        <main>
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(message)}</p>
          <a href="/admin">Ir para o painel</a>
        </main>
      </body>
    </html>`
}

export default router
