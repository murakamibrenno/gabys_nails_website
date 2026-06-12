export interface DiaDisponivel {
  iso: string
  diaSemana: string
  diaMes: number
  mes: string
}

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MESES = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
]

import { HORARIOS_BASE } from './horarios'

// Gera os proximos `qtd` dias uteis (seg-sab), a partir de amanha.
export function proximosDias(qtd = 14): DiaDisponivel[] {
  const dias: DiaDisponivel[] = []
  const data = new Date()
  data.setHours(0, 0, 0, 0)
  data.setDate(data.getDate() + 1)

  while (dias.length < qtd) {
    if (data.getDay() !== 0) {
      dias.push({
        iso: data.toISOString().slice(0, 10),
        diaSemana: DIAS_SEMANA[data.getDay()],
        diaMes: data.getDate(),
        mes: MESES[data.getMonth()],
      })
    }
    data.setDate(data.getDate() + 1)
  }
  return dias
}

// Horarios mockados: alguns ficam "ocupados" de forma deterministica por dia.
export function horariosDoDia(iso: string): { horario: string; ocupado: boolean }[] {
  const seed = iso
    .split('-')
    .reduce((acc, part) => acc + Number(part), 0)
  return HORARIOS_BASE.map((horario, i) => ({
    horario,
    ocupado: (seed + i) % 3 === 0,
  }))
}

export function formatarDataExtenso(iso: string): string {
  const [ano, mes, dia] = iso.split('-').map(Number)
  const data = new Date(ano, mes - 1, dia)
  return data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
