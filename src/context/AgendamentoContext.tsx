import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import type { DadosCliente } from '../types'

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
  setServico: (servicoId: string) => void
  setDataHora: (data: string, horario: string) => void
  setCliente: (cliente: DadosCliente) => void
  resetar: () => void
}

const AgendamentoContext = createContext<AgendamentoContextValue | undefined>(
  undefined,
)

export function AgendamentoProvider({ children }: { children: ReactNode }) {
  const [rascunho, setRascunho] = useState<RascunhoAgendamento>(rascunhoInicial)

  const setServico = (servicoId: string) =>
    setRascunho((r) => ({ ...r, servicoId }))

  const setDataHora = (data: string, horario: string) =>
    setRascunho((r) => ({ ...r, data, horario }))

  const setCliente = (cliente: DadosCliente) =>
    setRascunho((r) => ({ ...r, cliente }))

  const resetar = () => setRascunho(rascunhoInicial)

  return (
    <AgendamentoContext.Provider
      value={{
        rascunho,
        setServico,
        setDataHora,
        setCliente,
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
