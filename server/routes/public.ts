import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { randomUUID } from 'node:crypto'
import { getDb, type BookingRow } from '../db.js'
import { HORARIOS_BASE } from '../slots.js'
import { getServico } from '../servicos.js'

const router = Router()

const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Muitas tentativas. Tente novamente mais tarde.' },
})

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

router.get('/availability', (req, res) => {
  const date = String(req.query.date ?? '')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    res.status(400).json({ error: 'Data inválida.' })
    return
  }

  const db = getDb()
  const ocupados = db
    .prepare(
      `SELECT time FROM bookings
       WHERE date = ? AND status IN ('pending', 'confirmed')`,
    )
    .all(date) as { time: string }[]

  const setOcupados = new Set(ocupados.map((r) => r.time))
  const horarios = HORARIOS_BASE.map((horario) => ({
    horario,
    ocupado: setOcupados.has(horario),
  }))

  res.json({ date, horarios })
})

router.post('/bookings', bookingLimiter, (req, res) => {
  const {
    servicoId,
    data,
    horario,
    cliente,
  } = req.body as {
    servicoId?: string
    data?: string
    horario?: string
    cliente?: { nome?: string; telefone?: string; observacoes?: string }
  }

  const servico = servicoId ? getServico(servicoId) : undefined
  if (!servico) {
    res.status(400).json({ error: 'Serviço inválido.' })
    return
  }
  if (!data || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    res.status(400).json({ error: 'Data inválida.' })
    return
  }
  if (!horario || !HORARIOS_BASE.includes(horario as (typeof HORARIOS_BASE)[number])) {
    res.status(400).json({ error: 'Horário inválido.' })
    return
  }

  const nome = cliente?.nome?.trim() ?? ''
  const telefone = cliente?.telefone?.replace(/\D/g, '') ?? ''
  const observacoes = cliente?.observacoes?.trim() ?? ''

  if (nome.length < 2) {
    res.status(400).json({ error: 'Informe seu nome.' })
    return
  }
  if (telefone.length < 10) {
    res.status(400).json({ error: 'Informe um telefone válido.' })
    return
  }

  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const [y, m, d] = data.split('-').map(Number)
  const dataAg = new Date(y, m - 1, d)
  if (dataAg <= hoje) {
    res.status(400).json({ error: 'Escolha uma data futura.' })
    return
  }

  const id = randomUUID()
  const createdAt = new Date().toISOString()

  try {
    getDb()
      .prepare(
        `INSERT INTO bookings
         (id, service_id, service_name, price, date, time,
          client_name, client_phone, notes, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
      )
      .run(
        id,
        servico.id,
        servico.nome,
        servico.preco,
        data,
        horario,
        nome,
        telefone,
        observacoes || null,
        createdAt,
      )
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : ''
    if (msg.includes('UNIQUE constraint failed')) {
      res.status(409).json({ error: 'Este horário acabou de ser reservado. Escolha outro.' })
      return
    }
    throw err
  }

  const row = getDb()
    .prepare('SELECT * FROM bookings WHERE id = ?')
    .get(id) as BookingRow

  res.status(201).json(rowToJson(row))
})

export default router
