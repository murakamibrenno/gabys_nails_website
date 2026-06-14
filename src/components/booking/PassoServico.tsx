import { servicos, formatarPreco, AVISO_PRECO } from '../../data/servicos'

interface Props {
  servicoId: string | null
  onSelecionar: (id: string) => void
}

export default function PassoServico({ servicoId, onSelecionar }: Props) {
  return (
    <div>
      <span className="eyebrow">Passo 1</span>
      <h2 className="mt-1 font-display text-3xl font-light text-vinho-tinta">
        Escolha o <span className="italic text-cereja">serviço</span>
      </h2>
      <p className="mt-1 text-sm text-vinho/70">
        Valores base já com esmaltação em gel e decorações inclusas.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {servicos.map((servico) => {
          const ativo = servicoId === servico.id
          return (
            <button
              key={servico.id}
              type="button"
              onClick={() => onSelecionar(servico.id)}
              className={`rounded-3xl border-2 p-5 text-left transition ${
                ativo
                  ? 'border-vinho bg-creme-2'
                  : 'border-vinho/15 bg-creme_branco hover:border-vinho'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl text-vinho-tinta">
                  {servico.nome}
                </h3>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                    ativo
                      ? 'border-vinho bg-cereja text-creme'
                      : 'border-vinho/30'
                  }`}
                >
                  {ativo && (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
              </div>
              <p className="mt-1 text-sm text-vinho/70">{servico.descricao}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-vinho/50">
                A partir de
              </p>
              <p className="font-display text-3xl font-semibold text-cereja">
                {formatarPreco(servico.preco)}
              </p>
              <p className="text-xs text-vinho/60">≈ {servico.duracaoMin} min</p>
            </button>
          )
        })}
      </div>

      <p className="mt-4 rounded-2xl border border-dashed border-vinho/20 bg-creme-2 p-3 text-xs leading-relaxed text-vinho/70">
        {AVISO_PRECO}
      </p>
    </div>
  )
}
