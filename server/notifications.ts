import nodemailer from 'nodemailer'
import { config } from './config.js'
import type { BookingRow } from './db.js'
import { adminBookingsUrl, bookingConfirmUrl } from './bookingLinks.js'

function smtpEnabled(): boolean {
  const { host, user, pass } = config.smtp
  return Boolean(host && user && pass)
}

function adminNotificationEnabled(): boolean {
  return smtpEnabled() && Boolean(config.smtp.notifyEmail)
}

function createTransporter() {
  return nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  })
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return value
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function bookingText(row: BookingRow): string {
  const observacoes = row.notes?.trim() || 'Nenhuma observação.'
  const email = row.client_email?.trim() || 'Não informado.'

  return [
    'Novo agendamento recebido pelo site Gaby Nails.',
    '',
    `Cliente: ${row.client_name}`,
    `Telefone: ${formatPhone(row.client_phone)}`,
    `Email: ${email}`,
    `Servico: ${row.service_name}`,
    `Valor: ${formatCurrency(row.price)}`,
    `Data: ${row.date}`,
    `Horario: ${row.time}`,
    `Status: ${row.status}`,
    '',
    'Observacoes:',
    observacoes,
    '',
    `ID do agendamento: ${row.id}`,
    `Criado em: ${row.created_at}`,
    '',
    `Confirmar agendamento: ${bookingConfirmUrl(row)}`,
    `Gerenciar agendamentos: ${adminBookingsUrl()}`,
  ].join('\n')
}

function bookingHtml(row: BookingRow): string {
  const observacoes = row.notes?.trim() || 'Nenhuma observação.'
  const email = row.client_email?.trim() || 'Não informado.'
  const confirmUrl = bookingConfirmUrl(row)
  const manageUrl = adminBookingsUrl()
  const fields = [
    ['Cliente', row.client_name],
    ['Telefone', formatPhone(row.client_phone)],
    ['Email', email],
    ['Servico', row.service_name],
    ['Valor', formatCurrency(row.price)],
    ['Data', row.date],
    ['Horario', row.time],
    ['Status', row.status],
    ['Observacoes', observacoes],
    ['ID do agendamento', row.id],
    ['Criado em', row.created_at],
  ]

  return `
    <div style="font-family: Arial, sans-serif; color: #2b1a1f;">
      <h2 style="margin: 0 0 16px;">Novo agendamento recebido</h2>
      <p>Um novo agendamento foi reservado pelo site Gaby Nails.</p>
      <p style="margin: 20px 0;">
        <a href="${escapeHtml(confirmUrl)}" style="display: inline-block; margin: 0 8px 8px 0; padding: 12px 18px; border-radius: 999px; background: #4f7f52; color: #ffffff; font-weight: 700; text-decoration: none;">Confirmar agendamento</a>
        <a href="${escapeHtml(manageUrl)}" style="display: inline-block; margin: 0 0 8px 0; padding: 11px 18px; border: 1px solid #6b2a33; border-radius: 999px; color: #6b2a33; font-weight: 700; text-decoration: none;">Gerenciar agendamento</a>
      </p>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        <tbody>
          ${fields
            .map(
              ([label, value]) => `
                <tr>
                  <th style="border: 1px solid #ead7d1; padding: 8px; text-align: left; background: #fff5f2;">${escapeHtml(label)}</th>
                  <td style="border: 1px solid #ead7d1; padding: 8px;">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `
}

export async function notifyBookingCreated(row: BookingRow): Promise<void> {
  if (!adminNotificationEnabled()) return

  await createTransporter().sendMail({
    from: `"Gaby Nails" <${config.smtp.user}>`,
    to: config.smtp.notifyEmail,
    subject: `Novo agendamento: ${row.client_name} - ${row.date} ${row.time}`,
    text: bookingText(row),
    html: bookingHtml(row),
  })
}

function confirmedText(row: BookingRow): string {
  return [
    `Olá ${row.client_name.split(' ')[0]}, seu agendamento na Gaby Nails foi confirmado.`,
    '',
    `Servico: ${row.service_name}`,
    `Valor: ${formatCurrency(row.price)}`,
    `Data: ${row.date}`,
    `Horario: ${row.time}`,
    '',
    'Obrigada pela preferência!',
  ].join('\n')
}

function confirmedHtml(row: BookingRow): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #2b1a1f;">
      <h2 style="margin: 0 0 16px;">Agendamento confirmado</h2>
      <p>Olá ${escapeHtml(row.client_name.split(' ')[0])}, seu horário na Gaby Nails foi confirmado.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 520px; margin-top: 16px;">
        <tbody>
          ${[
            ['Serviço', row.service_name],
            ['Valor', formatCurrency(row.price)],
            ['Data', row.date],
            ['Horário', row.time],
          ]
            .map(
              ([label, value]) => `
                <tr>
                  <th style="border: 1px solid #ead7d1; padding: 8px; text-align: left; background: #fff5f2;">${escapeHtml(label)}</th>
                  <td style="border: 1px solid #ead7d1; padding: 8px;">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join('')}
        </tbody>
      </table>
      <p style="margin-top: 16px;">Obrigada pela preferência!</p>
    </div>
  `
}

export async function notifyBookingConfirmed(row: BookingRow): Promise<void> {
  if (!smtpEnabled() || !row.client_email) return

  await createTransporter().sendMail({
    from: `"Gaby Nails" <${config.smtp.user}>`,
    to: row.client_email,
    subject: `Agendamento confirmado: ${row.date} ${row.time}`,
    text: confirmedText(row),
    html: confirmedHtml(row),
  })
}
