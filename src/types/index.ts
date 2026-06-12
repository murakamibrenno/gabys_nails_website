export interface Servico {
  id: string
  nome: string
  preco: number
  duracaoMin: number
  descricao: string
  inclui: string[]
  destaque?: boolean
}

export interface FotoGaleria {
  id: string
  titulo: string
  categoria: string
  src?: string
}

export interface DadosCliente {
  nome: string
  telefone: string
  observacoes: string
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Agendamento {
  id: string
  servicoId: string
  servicoNome: string
  preco: number
  data: string
  horario: string
  status?: BookingStatus
  cliente: DadosCliente
  criadoEm: string
}

export interface HorarioDisponivel {
  horario: string
  ocupado: boolean
}
