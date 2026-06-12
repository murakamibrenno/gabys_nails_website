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
import logo from '../assets/logo.png'

const filtros: { label: string; status?: BookingStatus }[] = [
  { label: 'Todos' },
  { label: 'Pendentes', status: 'pending' },
  { label: 'Confirmados', status: 'confirmed' },
  { label: 'Cancelados', status: 'cancelled' },
]

const statusLabel: Record<BookingStatus, string> = {
  pending: 'Pendente',
  confirmed: 'Confirmado',
  cancelled: 'Cancelado',
}

const statusClass: Record<BookingStatus, string> = {
  pending: 'bg-amber-100 text-amber-900',
  confirmed: 'bg-folha/15 text-folha',
  cancelled: 'bg-vinho/10 text-vinho/50 line-through',
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [filtro, setFiltro] = useState<BookingStatus | undefined>('pending')
  const [lista, setLista] = useState<Agendamento[]>([])
  const [carregando, setCarregando] = useState(true)
  const [acaoId, setAcaoId] = useState<string | null>(null)

  const carregar = useCallback(async () => {
    setCarregando(true)
    try {
      const data = await fetchAdminBookings({ status: filtro })
      setLista(data)
    } finally {
      setCarregando(false)
    }
  }, [filtro])

  useEffect(() => {
    checkAdminAuth().then((ok) => {
      setAuthed(ok)
      if (!ok) navigate('/admin/login')
    })
  }, [navigate])

  useEffect(() => {
    if (authed) carregar()
  }, [authed, carregar])

  const alterarStatus = async (
    id: string,
    status: 'confirmed' | 'cancelled',
  ) => {
    setAcaoId(id)
    try {
      await updateBookingStatus(id, status)
      await carregar()
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

  const pendentes = lista.filter((b) => b.status === 'pending').length

  return (
    <div className="min-h-screen bg-creme">
      <header className="border-b border-vinho/10 bg-creme_branco">
        <div className="container-app flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <span className="font-display text-xl text-vinho-tinta">
                Painel admin
              </span>
              <span className="block text-xs text-vinho/60">Gaby Nails</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="btn-ghost !py-2 !px-4 text-sm">
              Site
            </Link>
            <button onClick={sair} className="btn-ghost !py-2 !px-4 text-sm">
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="container-app py-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="card">
            <span className="text-xs uppercase tracking-wide text-vinho/60">
              Nesta lista
            </span>
            <p className="font-display text-3xl text-cereja">{lista.length}</p>
          </div>
          <div className="card">
            <span className="text-xs uppercase tracking-wide text-vinho/60">
              Pendentes (filtro atual)
            </span>
            <p className="font-display text-3xl text-cereja">{pendentes}</p>
          </div>
          <div className="card text-sm text-vinho/70">
            Confirme ou cancele após falar com a cliente pelo WhatsApp.
          </div>
        </div>

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

        {carregando ? (
          <p className="text-vinho/60">Carregando agendamentos...</p>
        ) : lista.length === 0 ? (
          <div className="card text-center text-vinho/60">
            Nenhum agendamento neste filtro.
          </div>
        ) : (
          <div className="space-y-4">
            {lista.map((b) => (
              <article key={b.id} className="card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        statusClass[b.status ?? 'pending']
                      }`}
                    >
                      {statusLabel[b.status ?? 'pending']}
                    </span>
                    <h3 className="mt-2 font-display text-xl text-vinho-tinta">
                      {b.cliente.nome}
                    </h3>
                    <p className="text-sm text-vinho/70">
                      {b.servicoNome} · {formatarPreco(b.preco)}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-cereja">
                      {formatarDataExtenso(b.data).split(',')[0]} · {b.horario}
                    </p>
                    {b.cliente.observacoes && (
                      <p className="mt-2 text-sm text-vinho/60">
                        Obs: {b.cliente.observacoes}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 sm:items-end">
                    <a
                      href={whatsappLink(b.cliente.telefone, b.cliente.nome)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost !py-2 !px-4 text-sm"
                    >
                      WhatsApp
                    </a>
                    {b.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          disabled={acaoId === b.id}
                          onClick={() => alterarStatus(b.id, 'confirmed')}
                          className="rounded-full bg-folha px-4 py-2 text-sm font-semibold text-white"
                        >
                          Confirmar
                        </button>
                        <button
                          disabled={acaoId === b.id}
                          onClick={() => alterarStatus(b.id, 'cancelled')}
                          className="rounded-full border-2 border-vinho px-4 py-2 text-sm font-semibold text-vinho"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                    {b.status === 'confirmed' && (
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
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
