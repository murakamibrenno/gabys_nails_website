import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAgendamento } from '../context/AgendamentoContext'
import { getServico, formatarPreco } from '../data/servicos'
import { formatarDataExtenso } from '../data/agenda'
import type { DadosCliente, Agendamento } from '../types'
import { createBooking } from '../services/api'
import PassoServico from '../components/booking/PassoServico'
import PassoDataHora from '../components/booking/PassoDataHora'
import PassoDados from '../components/booking/PassoDados'
import Confirmacao from '../components/booking/Confirmacao'

const PASSOS = ['Serviço', 'Data e hora', 'Dados', 'Confirmação']

export default function AgendamentoPage() {
  const {
    rascunho,
    setServico,
    setDataHora,
    setCliente,
    resetar,
  } = useAgendamento()
  const [params] = useSearchParams()
  const [passo, setPasso] = useState(0)
  const [erros, setErros] = useState<Partial<Record<keyof DadosCliente, string>>>({})
  const [concluido, setConcluido] = useState<Agendamento | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState('')

  useEffect(() => {
    const servicoParam = params.get('servico')
    if (servicoParam && getServico(servicoParam)) {
      setServico(servicoParam)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const servico = rascunho.servicoId ? getServico(rascunho.servicoId) : undefined

  const podeAvancar = () => {
    if (passo === 0) return Boolean(rascunho.servicoId)
    if (passo === 1) return Boolean(rascunho.data && rascunho.horario)
    return true
  }

  const validarDados = () => {
    const novosErros: Partial<Record<keyof DadosCliente, string>> = {}
    if (rascunho.cliente.nome.trim().length < 2) {
      novosErros.nome = 'Informe seu nome.'
    }
    if (rascunho.cliente.telefone.replace(/\D/g, '').length < 10) {
      novosErros.telefone = 'Informe um telefone válido.'
    }
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const avancar = () => {
    if (passo === 2 && !validarDados()) return
    setPasso((p) => Math.min(p + 1, PASSOS.length - 1))
  }

  const voltar = () => setPasso((p) => Math.max(p - 1, 0))

  const finalizar = async () => {
    if (!servico || !rascunho.data || !rascunho.horario) return
    setEnviando(true)
    setErroEnvio('')
    try {
      const agendamento = await createBooking({
        servicoId: servico.id,
        data: rascunho.data,
        horario: rascunho.horario,
        cliente: rascunho.cliente,
      })
      setConcluido(agendamento)
    } catch (err) {
      setErroEnvio(
        err instanceof Error ? err.message : 'Erro ao confirmar agendamento.',
      )
    } finally {
      setEnviando(false)
    }
  }

  const recomecar = () => {
    resetar()
    setConcluido(null)
    setPasso(0)
    setErros({})
  }

  if (concluido) {
    return <TelaSucesso agendamento={concluido} onNovo={recomecar} />
  }

  return (
    <div className="container-app py-12">
      <header className="mb-8 text-center">
        <span className="eyebrow">Reserva</span>
        <h1 className="mt-2 font-display text-6xl font-light text-vinho-tinta">
          Agendar <span className="italic text-cereja">atendimento</span>
        </h1>
        <p className="mt-3 text-vinho/70">
          Em poucos passos você garante o seu horário.
        </p>
      </header>

      <ol className="mx-auto mb-8 flex max-w-2xl items-center">
        {PASSOS.map((nome, i) => (
          <li key={nome} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition ${
                  i <= passo
                    ? 'border-vinho bg-cereja text-creme'
                    : 'border-vinho/15 bg-creme_branco text-vinho/40'
                }`}
              >
                {i + 1}
              </span>
              <span className="mt-1 hidden text-xs font-medium text-vinho/70 sm:block">
                {nome}
              </span>
            </div>
            {i < PASSOS.length - 1 && (
              <span
                className={`mx-2 h-0.5 flex-1 rounded transition ${
                  i < passo ? 'bg-cereja' : 'bg-vinho/15'
                }`}
              />
            )}
          </li>
        ))}
      </ol>

      <div className="mx-auto max-w-2xl">
        <div className="card">
          {passo === 0 && (
            <PassoServico
              servicoId={rascunho.servicoId}
              onSelecionar={setServico}
            />
          )}
          {passo === 1 && (
            <PassoDataHora
              data={rascunho.data}
              horario={rascunho.horario}
              onSelecionarData={(iso) => setDataHora(iso, '')}
              onSelecionarHorario={(h) =>
                setDataHora(rascunho.data ?? '', h)
              }
            />
          )}
          {passo === 2 && (
            <PassoDados
              cliente={rascunho.cliente}
              erros={erros}
              onAlterar={setCliente}
            />
          )}
          {passo === 3 && servico && rascunho.data && rascunho.horario && (
            <Confirmacao
              servico={servico}
              data={rascunho.data}
              horario={rascunho.horario}
              cliente={rascunho.cliente}
            />
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            {passo > 0 ? (
              <button onClick={voltar} className="btn-ghost">
                Voltar
              </button>
            ) : (
              <Link to="/catalogo" className="btn-ghost">
                Ver serviços
              </Link>
            )}

            {passo < PASSOS.length - 1 ? (
              <button
                onClick={avancar}
                disabled={!podeAvancar()}
                className="btn-primary"
              >
                Continuar
              </button>
            ) : (
              <button
                onClick={finalizar}
                disabled={enviando}
                className="btn-primary"
              >
                {enviando ? 'Reservando...' : 'Confirmar agendamento'}
              </button>
            )}
          </div>

          {erroEnvio && (
            <p className="mt-4 rounded-2xl border border-cereja/30 bg-creme-2 p-3 text-center text-sm text-cereja">
              {erroEnvio}
            </p>
          )}
        </div>

        {servico && passo < 3 && (
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-vinho/10 bg-creme_branco px-5 py-3 text-sm shadow-suave">
            <span className="text-vinho/70">
              {servico.nome}
              {rascunho.data && ` · ${formatarDataExtenso(rascunho.data).split(',')[0]}`}
              {rascunho.horario && ` · ${rascunho.horario}`}
            </span>
            <span className="font-bold text-cereja">
              {formatarPreco(servico.preco)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function TelaSucesso({
  agendamento,
  onNovo,
}: {
  agendamento: Agendamento
  onNovo: () => void
}) {
  return (
    <div className="container-app py-16">
      <div className="card mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-folha text-white">
          <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="mt-5 font-display text-4xl font-light text-vinho-tinta">
          Agendamento <span className="italic text-cereja">confirmado!</span>
        </h1>
        <p className="mt-2 text-vinho/70">
          Olá {agendamento.cliente.nome.split(' ')[0]}, seu horário está
          reservado. Entraremos em contato pelo WhatsApp para confirmar!
        </p>

        <dl className="mt-6 space-y-2 rounded-3xl border border-vinho/10 bg-creme-2 p-5 text-left text-sm">
          <div className="flex justify-between">
            <dt className="text-vinho/70">Serviço</dt>
            <dd className="font-semibold text-vinho-tinta">{agendamento.servicoNome}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-vinho/70">Valor</dt>
            <dd className="font-semibold text-vinho-tinta">{formatarPreco(agendamento.preco)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-vinho/70">Quando</dt>
            <dd className="font-semibold text-vinho-tinta">
              {formatarDataExtenso(agendamento.data).split(',')[0]} ·{' '}
              {agendamento.horario}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button onClick={onNovo} className="btn-primary">
            Novo agendamento
          </button>
          <Link to="/" className="btn-ghost">
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}
