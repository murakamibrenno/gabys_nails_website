import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Agendamento, DadosCliente } from '../types'

interface RascunhoAgendamento {
  servicoId: string | null
  data: string | null
  horario: string | null
  cliente: DadosCliente
}

const clienteVazio: DadosCliente = { nome: '', telefone: '', observacoes: '' }

const rascunhoInicial: RascunhoAgendamento = {
  servicoId: null,
  data: null,
  horario: null,
  cliente: clienteVazio,
}

interface AgendamentoContextValue {
  rascunho: RascunhoAgendamento
  agendamentos: Agendamento[]
  setServico: (servicoId: string) => void
  setDataHora: (data: string, horario: string) => void
  setCliente: (cliente: DadosCliente) => void
  confirmar: (agendamento: Agendamento) => void
  resetar: () => void
}

const AgendamentoContext = createContext<AgendamentoContextValue | undefined>(
  undefined,
)

const STORAGE_KEY = 'gaby-nails-agendamentos'

export function AgendamentoProvider({ children }: { children: ReactNode }) {
  const [rascunho, setRascunho] = useState<RascunhoAgendamento>(rascunhoInicial)
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY)
      return salvo ? (JSON.parse(salvo) as Agendamento[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agendamentos))
  }, [agendamentos])

  const setServico = (servicoId: string) =>
    setRascunho((r) => ({ ...r, servicoId }))

  const setDataHora = (data: string, horario: string) =>
    setRascunho((r) => ({ ...r, data, horario }))

  const setCliente = (cliente: DadosCliente) =>
    setRascunho((r) => ({ ...r, cliente }))

  const confirmar = (agendamento: Agendamento) =>
    setAgendamentos((lista) => [agendamento, ...lista])

  const resetar = () => setRascunho(rascunhoInicial)

  return (
    <AgendamentoContext.Provider
      value={{
        rascunho,
        agendamentos,
        setServico,
        setDataHora,
        setCliente,
        confirmar,
        resetar,
      }}
    >
      {children}
    </AgendamentoContext.Provider>
  )
}

export function useAgendamento() {
  const ctx = useContext(AgendamentoContext)
  if (!ctx) {
    throw new Error('useAgendamento deve ser usado dentro de AgendamentoProvider')
  }
  return ctx
}
