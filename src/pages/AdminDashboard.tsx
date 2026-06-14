import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  adminLogout,
  checkAdminAuth,
  fetchAdminBookings,
  updateBookingStatus,
  whatsappLink,
} from '../services/api'
import { formatarPreco } from '../data/servicos'
import { formatarDataExtenso } from '../data/agenda'
import type { Agendamento, BookingStatus } from '../types'
import { statusBadge, statusLabel } from '../utils/bookingStatus'
import AdminAgendaCalendario from '../components/admin/AdminAgendaCalendario'
import logo from '../assets/logo.png'

type Visao = 'agenda' | 'lista'

const filtros: { label: string; status?: BookingStatus }[] = [
  { label: 'Todos' },
  { label: 'Pendentes', status: 'pending' },
  { label: 'Confirmados', status: 'confirmed' },
  { label: 'Cancelados', status: 'cancelled' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [visao, setVisao] = useState<Visao>('agenda')
  const [filtro, setFiltro] = useState<BookingStatus | undefined>('pending')
  const [lista, setLista] = useState<Agendamento[]>([])
  const [agendaTodos, setAgendaTodos] = useState<Agendamento[]>([])
  const [carregando, setCarregando] = useState(true)
  const [acaoId, setAcaoId] = useState<string | null>(null)

  const carregarLista = useCallback(async () => {
    setCarregando(true)
    try {
      const data = await fetchAdminBookings({ status: filtro })
      setLista(data)
    } finally {
      setCarregando(false)
    }
  }, [filtro])

  const carregarAgenda = useCallback(async () => {
    setCarregando(true)
    try {
      const data = await fetchAdminBookings()
      setAgendaTodos(data)
    } finally {
      setCarregando(false)
    }
  }, [])

  const recarregar = useCallback(async () => {
    if (visao === 'agenda') await carregarAgenda()
    else await carregarLista()
  }, [visao, carregarAgenda, carregarLista])

  useEffect(() => {
    checkAdminAuth().then((ok) => {
      setAuthed(ok)
      if (!ok) navigate('/admin/login')
    })
  }, [navigate])

  useEffect(() => {
    if (!authed) return
    if (visao === 'agenda') carregarAgenda()
    else carregarLista()
  }, [authed, visao, carregarAgenda, carregarLista])

  const alterarStatus = async (
    id: string,
    status: 'confirmed' | 'cancelled',
  ) => {
    setAcaoId(id)
    try {
      await updateBookingStatus(id, status)
      await recarregar()
    } finally {
      setAcaoId(null)
    }
  }

  const sair = async () => {
    await adminLogout()
    navigate('/admin/login')
  }

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center text-vinho/60">
        Verificando acesso...
      </div>
    )
  }

  const pendentesAgenda = agendaTodos.filter((b) => b.status === 'pending').length
  const confirmadosAgenda = agendaTodos.filter(
    (b) => b.status === 'confirmed',
  ).length

  return (
    <div className="min-h-screen bg-mesh-cereja">
      <header className="sticky top-0 z-30 border-b border-vinho/10 bg-creme/95 backdrop-blur-md">
        <div className="container-app flex flex-wrap items-center justify-between gap-3 py-3 sm:py-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt=""
              className="h-10 w-10 rounded-full object-cover ring-2 ring-creme"
            />
            <div>
              <span className="font-display text-xl text-vinho-tinta sm:text-2xl">
                Gerenciamento
              </span>
              <span className="block text-xs text-vinho/60">Gaby Nails · Admin</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/" className="btn-ghost !py-2 !px-3 text-sm sm:!px-4">
              Site
            </Link>
            <button
              onClick={sair}
              className="btn-ghost !py-2 !px-3 text-sm sm:!px-4"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Tabs Agenda / Lista */}
        <div className="container-app flex gap-2 pb-3">
          {(
            [
              ['agenda', 'Agenda'],
              ['lista', 'Lista'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setVisao(id)}
              className={`flex-1 rounded-full border-2 py-2.5 text-sm font-semibold transition sm:flex-none sm:px-8 ${
                visao === id
                  ? 'border-vinho bg-cereja text-creme shadow-suave'
                  : 'border-vinho/15 bg-creme_branco text-vinho hover:border-vinho'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="container-app py-6 sm:py-8">
        {/* Resumo */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="card !py-4">
            <span className="text-xs uppercase tracking-wide text-vinho/60">
              Pendentes
            </span>
            <p className="font-display text-3xl text-cereja">
              {visao === 'agenda'
                ? pendentesAgenda
                : lista.filter((b) => b.status === 'pending').length}
            </p>
          </div>
          <div className="card !py-4">
            <span className="text-xs uppercase tracking-wide text-vinho/60">
              Confirmados
            </span>
            <p className="font-display text-3xl text-folha">
              {visao === 'agenda'
                ? confirmadosAgenda
                : lista.filter((b) => b.status === 'confirmed').length}
            </p>
          </div>
          <div className="card flex items-center !py-4 text-sm text-vinho/70">
            Toque em um horário ocupado para confirmar, cancelar ou abrir o
            WhatsApp.
          </div>
        </div>

        {carregando ? (
          <p className="py-12 text-center text-vinho/60">
            Carregando agendamentos...
          </p>
        ) : visao === 'agenda' ? (
          <AdminAgendaCalendario
            agendamentos={agendaTodos}
            acaoId={acaoId}
            onConfirmar={(id) => alterarStatus(id, 'confirmed')}
            onCancelar={(id) => alterarStatus(id, 'cancelled')}
          />
        ) : (
          <>
            <div className="mb-4 flex flex-wrap gap-2">
              {filtros.map((f) => (
                <button
                  key={f.label}
                  onClick={() => setFiltro(f.status)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                    filtro === f.status
                      ? 'border-vinho bg-cereja text-creme'
                      : 'border-vinho/15 bg-creme_branco text-vinho hover:border-vinho'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {lista.length === 0 ? (
              <div className="card text-center text-vinho/60">
                Nenhum agendamento neste filtro.
              </div>
            ) : (
              <div className="space-y-4">
                {lista.map((b) => {
                  const status = b.status ?? 'pending'
                  return (
                    <article key={b.id} className="card">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${statusBadge[status]}`}
                          >
                            {statusLabel[status]}
                          </span>
                          <h3 className="mt-2 font-display text-xl text-vinho-tinta">
                            {b.cliente.nome}
                          </h3>
                          <p className="text-sm text-vinho/70">
                            {b.servicoNome} · {formatarPreco(b.preco)}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-cereja">
                            {formatarDataExtenso(b.data).split(',')[0]} ·{' '}
                            {b.horario}
                          </p>
                          {b.cliente.observacoes && (
                            <p className="mt-2 text-sm text-vinho/60">
                              Obs: {b.cliente.observacoes}
                            </p>
                          )}
                          {b.cliente.email && (
                            <p className="mt-1 text-sm text-vinho/60">
                              Email: {b.cliente.email}
                            </p>
                          )}
                        </div>
                        <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
                          <a
                            href={whatsappLink(
                              b.cliente.telefone,
                              b.cliente.nome,
                            )}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-ghost !py-2 !px-4 text-sm text-center"
                          >
                            WhatsApp
                          </a>
                          {status === 'pending' && (
                            <div className="flex gap-2">
                              <button
                                disabled={acaoId === b.id}
                                onClick={() =>
                                  alterarStatus(b.id, 'confirmed')
                                }
                                className="flex-1 rounded-full bg-folha px-4 py-2 text-sm font-semibold text-white sm:flex-none"
                              >
                                Confirmar
                              </button>
                              <button
                                disabled={acaoId === b.id}
                                onClick={() =>
                                  alterarStatus(b.id, 'cancelled')
                                }
                                className="flex-1 rounded-full border-2 border-vinho px-4 py-2 text-sm font-semibold text-vinho sm:flex-none"
                              >
                                Cancelar
                              </button>
                            </div>
                          )}
                          {status === 'confirmed' && (
                            <button
                              disabled={acaoId === b.id}
                              onClick={() => alterarStatus(b.id, 'cancelled')}
                              className="rounded-full border-2 border-vinho px-4 py-2 text-sm font-semibold text-vinho"
                            >
                              Cancelar
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
