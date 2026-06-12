import { Fragment, useMemo, useState } from 'react'
import type { Agendamento } from '../../types'
import { HORARIOS_BASE } from '../../data/horarios'
import {
  diasDaSemana,
  tituloSemana,
  semanaAnterior,
  proximaSemana,
} from '../../utils/calendarioAdmin'
import { statusCelula, statusDot } from '../../utils/bookingStatus'
import PainelAgendamento from './PainelAgendamento'

interface Props {
  agendamentos: Agendamento[]
  acaoId: string | null
  onConfirmar: (id: string) => void
  onCancelar: (id: string) => void
}

export default function AdminAgendaCalendario({
  agendamentos,
  acaoId,
  onConfirmar,
  onCancelar,
}: Props) {
  const [semanaRef, setSemanaRef] = useState(() => new Date())
  const [diaMobile, setDiaMobile] = useState(() => {
    const dias = diasDaSemana(new Date())
    const hoje = dias.find((d) => d.hoje)
    return hoje?.iso ?? dias[0].iso
  })
  const [selecionado, setSelecionado] = useState<Agendamento | null>(null)

  const dias = useMemo(() => diasDaSemana(semanaRef), [semanaRef])

  const mapa = useMemo(() => {
    const m = new Map<string, Agendamento>()
    for (const b of agendamentos) {
      if (b.status !== 'cancelled') {
        m.set(`${b.data}|${b.horario}`, b)
      }
    }
    return m
  }, [agendamentos])

  const irSemana = (d: Date) => {
    setSemanaRef(d)
    const novosDias = diasDaSemana(d)
    setDiaMobile(novosDias[0].iso)
  }

  const celula = (iso: string, horario: string, compacto = false) => {
    const b = mapa.get(`${iso}|${horario}`)
    if (!b) {
      return (
        <div
          className={`flex min-h-[52px] items-center justify-center rounded-xl border border-dashed border-vinho/10 bg-creme/50 ${
            compacto ? 'min-h-[72px]' : 'md:min-h-[64px]'
          }`}
        >
          <span className="text-[0.65rem] text-vinho/25">Livre</span>
        </div>
      )
    }

    const st = b.status ?? 'pending'
    return (
      <button
        type="button"
        onClick={() => setSelecionado(b)}
        className={`group flex w-full min-h-[52px] flex-col justify-center rounded-xl border-2 px-2 py-1.5 text-left transition hover:scale-[1.02] hover:shadow-suave md:min-h-[64px] md:px-2.5 ${
          statusCelula[st]
        } ${compacto ? 'min-h-[72px] px-3 py-2' : ''}`}
      >
        <span className="flex items-center gap-1.5">
          <span className={`h-2 w-2 flex-shrink-0 rounded-full ${statusDot[st]}`} />
          <span className="truncate text-xs font-bold leading-tight sm:text-sm">
            {b.cliente.nome.split(' ')[0]}
          </span>
        </span>
        <span className="mt-0.5 truncate text-[0.65rem] opacity-80 sm:text-xs">
          {b.servicoNome}
        </span>
      </button>
    )
  }

  return (
    <>
      <div className="card overflow-hidden p-0">
        {/* Cabeçalho navegação semana */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-vinho/10 bg-gradient-to-r from-creme-2 to-creme_branco px-4 py-4 sm:px-6">
          <div>
            <span className="eyebrow">Agenda semanal</span>
            <h2 className="font-display text-2xl text-vinho-tinta sm:text-3xl">
              {tituloSemana(semanaRef)}
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => irSemana(semanaAnterior(semanaRef))}
              className="rounded-full border-2 border-vinho/15 px-3 py-2 text-sm font-semibold text-vinho hover:border-vinho"
              aria-label="Semana anterior"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => irSemana(new Date())}
              className="rounded-full border-2 border-vinho/15 px-3 py-2 text-xs font-semibold text-vinho hover:border-vinho sm:text-sm"
            >
              Hoje
            </button>
            <button
              type="button"
              onClick={() => irSemana(proximaSemana(semanaRef))}
              className="rounded-full border-2 border-vinho/15 px-3 py-2 text-sm font-semibold text-vinho hover:border-vinho"
              aria-label="Próxima semana"
            >
              →
            </button>
          </div>
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap gap-4 border-b border-vinho/10 px-4 py-3 text-xs sm:px-6">
          {(
            [
              ['pending', 'Pendente'],
              ['confirmed', 'Confirmado'],
              ['Livre', 'Horário livre'],
            ] as const
          ).map(([key, label]) => (
            <span key={label} className="flex items-center gap-1.5 text-vinho/70">
              {key === 'Livre' ? (
                <span className="h-2.5 w-2.5 rounded border border-dashed border-vinho/25" />
              ) : (
                <span className={`h-2.5 w-2.5 rounded-full ${statusDot[key]}`} />
              )}
              {label}
            </span>
          ))}
        </div>

        {/* Mobile: seletor de dia + coluna gigante */}
        <div className="lg:hidden">
          <div className="flex gap-2 overflow-x-auto border-b border-vinho/10 px-4 py-3">
            {dias.map((d) => (
              <button
                key={d.iso}
                type="button"
                onClick={() => setDiaMobile(d.iso)}
                className={`flex min-w-[56px] flex-col items-center rounded-2xl border-2 px-3 py-2 transition ${
                  diaMobile === d.iso
                    ? 'border-vinho bg-cereja text-creme'
                    : d.hoje
                      ? 'border-cereja/40 bg-creme-2 text-vinho'
                      : 'border-vinho/10 bg-creme_branco text-vinho'
                }`}
              >
                <span className="text-[0.6rem] uppercase">{d.diaSemana}</span>
                <span className="font-display text-xl font-semibold">{d.diaMes}</span>
              </button>
            ))}
          </div>
          <div className="space-y-2 p-4">
            {HORARIOS_BASE.map((h) => (
              <div key={h} className="grid grid-cols-[52px_1fr] items-stretch gap-2">
                <span className="flex items-center justify-end pr-1 text-sm font-semibold text-vinho/50">
                  {h}
                </span>
                {celula(diaMobile, h, true)}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grade semanal gigante */}
        <div className="hidden overflow-x-auto lg:block">
          <div className="min-w-[720px] p-4 sm:p-6">
            <div
              className="grid gap-1.5"
              style={{
                gridTemplateColumns: `56px repeat(${dias.length}, minmax(0, 1fr))`,
              }}
            >
              <div />
              {dias.map((d) => (
                <div
                  key={d.iso}
                  className={`rounded-xl py-2 text-center ${
                    d.hoje ? 'bg-cereja/10 ring-1 ring-cereja/30' : ''
                  }`}
                >
                  <span className="block text-[0.65rem] uppercase tracking-wide text-vinho/50">
                    {d.diaSemana}
                  </span>
                  <span className="font-display text-2xl font-semibold text-vinho-tinta">
                    {d.diaMes}
                  </span>
                  <span className="block text-[0.6rem] text-vinho/40">{d.mes}</span>
                </div>
              ))}

              {HORARIOS_BASE.map((h) => (
                <Fragment key={h}>
                  <div className="flex items-center justify-end pr-2 text-sm font-semibold text-vinho/45">
                    {h}
                  </div>
                  {dias.map((d) => (
                    <div key={`${d.iso}-${h}`}>{celula(d.iso, h)}</div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selecionado && (
        <PainelAgendamento
          agendamento={selecionado}
          acaoId={acaoId}
          onFechar={() => setSelecionado(null)}
          onConfirmar={(id) => {
            onConfirmar(id)
            setSelecionado(null)
          }}
          onCancelar={(id) => {
            onCancelar(id)
            setSelecionado(null)
          }}
        />
      )}
    </>
  )
}
