import { HORARIOS_BASE } from './slots.js'
import { getServico } from './servicos.js'

/** Horário limite para término do atendimento (19:00). */
const FIM_EXPEDIENTE_MIN = 19 * 60

export function horarioParaMinutos(horario: string): number {
  const [h, m] = horario.split(':').map(Number)
  return h * 60 + m
}

export interface ReservaAtiva {
  time: string
  duracaoMin: number
}

function intervalo(inicio: string, duracaoMin: number): [number, number] {
  const start = horarioParaMinutos(inicio)
  return [start, start + duracaoMin]
}

function sobrepoe(a: [number, number], b: [number, number]): boolean {
  return a[0] < b[1] && b[0] < a[1]
}

export function reservasFromRows(
  rows: { time: string; service_id: string }[],
): ReservaAtiva[] {
  return rows.flatMap((row) => {
    const servico = getServico(row.service_id)
    if (!servico) return []
    return [{ time: row.time, duracaoMin: servico.duracaoMin }]
  })
}

export function slotDisponivel(
  horario: string,
  duracaoMin: number,
  reservas: ReservaAtiva[],
): boolean {
  const candidato = intervalo(horario, duracaoMin)
  if (candidato[1] > FIM_EXPEDIENTE_MIN) return false

  return !reservas.some((r) => sobrepoe(candidato, intervalo(r.time, r.duracaoMin)))
}

export function horariosDisponiveis(
  duracaoMin: number,
  reservas: ReservaAtiva[],
): { horario: string; ocupado: boolean }[] {
  return HORARIOS_BASE.map((horario) => ({
    horario,
    ocupado: !slotDisponivel(horario, duracaoMin, reservas),
  }))
}
