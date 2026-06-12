import type { Agendamento } from '../../types'
import { formatarPreco } from '../../data/servicos'
import { formatarDataExtenso } from '../../data/agenda'
import { statusBadge, statusLabel } from '../../utils/bookingStatus'
import { whatsappLink } from '../../services/api'

interface Props {
  agendamento: Agendamento
  acaoId: string | null
  onFechar: () => void
  onConfirmar: (id: string) => void
  onCancelar: (id: string) => void
}

export default function PainelAgendamento({
  agendamento: b,
  acaoId,
  onFechar,
  onConfirmar,
  onCancelar,
}: Props) {
  const status = b.status ?? 'pending'
  const processando = acaoId === b.id

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-vinho-tinta/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onFechar}
      role="dialog"
      aria-modal="true"
      aria-labelledby="painel-agendamento-titulo"
    >
      <div
        className="animate-fade-up w-full max-h-[90vh] overflow-y-auto rounded-t-[2rem] border-2 border-vinho bg-creme_branco shadow-suave sm:max-w-lg sm:rounded-[2rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-vinho/10 bg-creme_branco px-5 py-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusBadge[status]}`}
          >
            {statusLabel[status]}
          </span>
          <button
            type="button"
            onClick={onFechar}
            className="rounded-full p-2 text-vinho/60 hover:bg-creme-2 hover:text-vinho"
            aria-label="Fechar"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          <h2
            id="painel-agendamento-titulo"
            className="font-display text-3xl font-light text-vinho-tinta"
          >
            {b.cliente.nome}
          </h2>
          <p className="mt-1 text-lg font-semibold text-cereja">
            {formatarDataExtenso(b.data).split(',')[0]} · {b.horario}
          </p>

          <dl className="mt-5 space-y-3 rounded-2xl border border-vinho/10 bg-creme-2/60 p-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-vinho/60">Serviço</dt>
              <dd className="text-right font-semibold">{b.servicoNome}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-vinho/60">Valor</dt>
              <dd className="font-semibold text-cereja">{formatarPreco(b.preco)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-vinho/60">Telefone</dt>
              <dd className="font-semibold">{b.cliente.telefone}</dd>
            </div>
            {b.cliente.observacoes && (
              <div>
                <dt className="text-vinho/60">Observações</dt>
                <dd className="mt-1 text-vinho-tinta">{b.cliente.observacoes}</dd>
              </div>
            )}
          </dl>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <a
              href={whatsappLink(b.cliente.telefone, b.cliente.nome)}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost flex-1 text-center"
            >
              WhatsApp
            </a>
            {status === 'pending' && (
              <>
                <button
                  type="button"
                  disabled={processando}
                  onClick={() => onConfirmar(b.id)}
                  className="flex-1 rounded-full bg-folha py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {processando ? 'Salvando...' : 'Confirmar'}
                </button>
                <button
                  type="button"
                  disabled={processando}
                  onClick={() => onCancelar(b.id)}
                  className="flex-1 rounded-full border-2 border-vinho py-3 text-sm font-semibold text-vinho transition hover:bg-vinho hover:text-creme disabled:opacity-50"
                >
                  Cancelar
                </button>
              </>
            )}
            {status === 'confirmed' && (
              <button
                type="button"
                disabled={processando}
                onClick={() => onCancelar(b.id)}
                className="flex-1 rounded-full border-2 border-vinho py-3 text-sm font-semibold text-vinho"
              >
                Cancelar agendamento
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
