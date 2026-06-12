import type { BookingStatus } from '../types'

export const statusLabel: Record<BookingStatus, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
}

export const statusBadge: Record<BookingStatus, string> = {
  pending: 'bg-amber-100 text-amber-900 ring-amber-200',
  confirmed: 'bg-folha/15 text-folha ring-folha/30',
  cancelled: 'bg-vinho/10 text-vinho/45 ring-vinho/10 line-through',
}

export const statusCelula: Record<BookingStatus, string> = {
  pending:
    'border-amber-300/80 bg-gradient-to-br from-amber-50 to-amber-100/80 text-amber-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]',
  confirmed:
    'border-folha/40 bg-gradient-to-br from-folha/10 to-folha/20 text-vinho-tinta shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]',
  cancelled:
    'border-vinho/10 bg-creme-2/80 text-vinho/35 opacity-60',
}

export const statusDot: Record<BookingStatus, string> = {
  pending: 'bg-amber-500',
  confirmed: 'bg-folha',
  cancelled: 'bg-vinho/30',
}
