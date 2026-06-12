export const HORARIOS_BASE = [
  '09:00',
  '10:00',
  '11:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
] as const

export type Horario = (typeof HORARIOS_BASE)[number]
