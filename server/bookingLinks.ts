import { createHmac, timingSafeEqual } from 'node:crypto'
import { config } from './config.js'
import type { BookingRow } from './db.js'

function signingPayload(row: Pick<BookingRow, 'id' | 'created_at'>): string {
  return `${row.id}:${row.created_at}`
}

export function createBookingConfirmToken(
  row: Pick<BookingRow, 'id' | 'created_at'>,
): string {
  return createHmac('sha256', config.jwtSecret)
    .update(signingPayload(row))
    .digest('hex')
}

export function isValidBookingConfirmToken(
  row: Pick<BookingRow, 'id' | 'created_at'>,
  token: string,
): boolean {
  const expected = createBookingConfirmToken(row)
  const a = Buffer.from(token)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function bookingConfirmUrl(
  row: Pick<BookingRow, 'id' | 'created_at'>,
): string {
  const url = new URL(`/api/admin/bookings/${row.id}/confirm`, config.publicUrl)
  url.searchParams.set('token', createBookingConfirmToken(row))
  return url.toString()
}

export function adminBookingsUrl(): string {
  return new URL('/admin', config.publicUrl).toString()
}
