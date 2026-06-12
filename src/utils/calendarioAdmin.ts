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

export type HorarioSlot = (typeof HORARIOS_BASE)[number]

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

export interface DiaCalendario {
  iso: string
  diaSemana: string
  diaMes: number
  mes: string
  hoje: boolean
}

const MESES = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
]

function toIso(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Segunda-feira da semana que contém `ref`. */
export function inicioDaSemana(ref: Date): Date {
  const d = new Date(ref)
  d.setHours(0, 0, 0, 0)
  const dia = d.getDay()
  const diff = dia === 0 ? -6 : 1 - dia
  d.setDate(d.getDate() + diff)
  return d
}

/** Segunda a sábado (6 dias úteis do salão). */
export function diasDaSemana(ref: Date): DiaCalendario[] {
  const inicio = inicioDaSemana(ref)
  const hojeIso = toIso(new Date())
  const dias: DiaCalendario[] = []

  for (let i = 0; i < 6; i++) {
    const d = new Date(inicio)
    d.setDate(inicio.getDate() + i)
    dias.push({
      iso: toIso(d),
      diaSemana: DIAS_SEMANA[d.getDay()],
      diaMes: d.getDate(),
      mes: MESES[d.getMonth()],
      hoje: toIso(d) === hojeIso,
    })
  }
  return dias
}

export function tituloSemana(ref: Date): string {
  const dias = diasDaSemana(ref)
  const a = dias[0]
  const b = dias[dias.length - 1]
  return `${a.diaMes} ${a.mes} – ${b.diaMes} ${b.mes} ${new Date(a.iso).getFullYear()}`
}

export function semanaAnterior(ref: Date): Date {
  const d = new Date(ref)
  d.setDate(d.getDate() - 7)
  return d
}

export function proximaSemana(ref: Date): Date {
  const d = new Date(ref)
  d.setDate(d.getDate() + 7)
  return d
}
