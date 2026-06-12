import { useEffect, useState } from 'react'
import { proximosDias } from '../../data/agenda'
import { fetchAvailability } from '../../services/api'
import type { HorarioDisponivel } from '../../types'

interface Props {
  data: string | null
  horario: string | null
  onSelecionarData: (iso: string) => void
  onSelecionarHorario: (horario: string) => void
}

const dias = proximosDias(14)

export default function PassoDataHora({
  data,
  horario,
  onSelecionarData,
  onSelecionarHorario,
}: Props) {
  const [horarios, setHorarios] = useState<HorarioDisponivel[]>([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!data) {
      setHorarios([])
      return
    }

    setCarregando(true)
    setErro('')
    fetchAvailability(data)
      .then((res) => setHorarios(res.horarios))
      .catch(() => setErro('Não foi possível carregar os horários.'))
      .finally(() => setCarregando(false))
  }, [data])

  return (
    <div>
      <span className="eyebrow">Passo 2</span>
      <h2 className="mt-1 font-display text-3xl font-light text-vinho-tinta">
        Data e <span className="italic text-cereja">horário</span>
      </h2>
      <p className="mt-1 text-sm text-vinho/70">
        Escolha o melhor dia e horário para o seu atendimento.
      </p>

      <h3 className="mt-6 text-xs font-semibold uppercase tracking-wide text-vinho/60">
        Dia
      </h3>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
        {dias.map((dia) => {
          const ativo = data === dia.iso
          return (
            <button
              key={dia.iso}
              type="button"
              onClick={() => onSelecionarData(dia.iso)}
              className={`flex min-w-[64px] flex-col items-center rounded-2xl border-2 px-3 py-2 transition ${
                ativo
                  ? 'border-vinho bg-cereja text-creme'
                  : 'border-vinho/15 bg-creme_branco text-vinho hover:border-vinho'
              }`}
            >
              <span className="text-[0.65rem] uppercase tracking-wide">
                {dia.diaSemana}
              </span>
              <span className="font-display text-xl font-semibold">
                {dia.diaMes}
              </span>
              <span className="text-[0.65rem]">{dia.mes}</span>
            </button>
          )
        })}
      </div>

      {data && (
        <>
          <h3 className="mt-6 text-xs font-semibold uppercase tracking-wide text-vinho/60">
            Horário
          </h3>
          {carregando && (
            <p className="mt-3 text-sm text-vinho/60">Carregando horários...</p>
          )}
          {erro && (
            <p className="mt-3 text-sm text-cereja">{erro}</p>
          )}
          {!carregando && !erro && (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {horarios.map(({ horario: h, ocupado }) => {
                const ativo = horario === h
                return (
                  <button
                    key={h}
                    type="button"
                    disabled={ocupado}
                    onClick={() => onSelecionarHorario(h)}
                    className={`rounded-xl border-2 py-2 text-sm font-semibold transition ${
                      ocupado
                        ? 'cursor-not-allowed border-transparent bg-creme-2 text-vinho/30 line-through'
                        : ativo
                          ? 'border-vinho bg-cereja text-creme'
                          : 'border-vinho/15 bg-creme_branco text-vinho hover:border-vinho'
                    }`}
                  >
                    {h}
                  </button>
                )
              })}
            </div>
          )}
          <p className="mt-3 text-xs text-vinho/60">
            Horários riscados já estão reservados.
          </p>
        </>
      )}
    </div>
  )
}
