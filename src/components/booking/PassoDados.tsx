import type { DadosCliente } from '../../types'
import { OBSERVACAO_SUGESTAO } from '../../data/servicos'

interface Props {
  cliente: DadosCliente
  erros: Partial<Record<keyof DadosCliente, string>>
  onAlterar: (cliente: DadosCliente) => void
}

const inputBase =
  'w-full rounded-2xl border-2 bg-creme_branco px-4 py-3 text-vinho-tinta outline-none transition placeholder:text-vinho/35 focus:border-cereja'

export default function PassoDados({ cliente, erros, onAlterar }: Props) {
  const campo = (chave: keyof DadosCliente, valor: string) =>
    onAlterar({ ...cliente, [chave]: valor })

  const sugestaoAtiva = cliente.observacoes === OBSERVACAO_SUGESTAO

  return (
    <div>
      <span className="eyebrow">Passo 3</span>
      <h2 className="mt-1 font-display text-3xl font-light text-vinho-tinta">
        Seus <span className="italic text-cereja">dados</span>
      </h2>
      <p className="mt-1 text-sm text-vinho/70">
        Precisamos de algumas informações para confirmar o agendamento.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold text-vinho">
            Nome completo *
          </label>
          <input
            type="text"
            value={cliente.nome}
            onChange={(e) => campo('nome', e.target.value)}
            placeholder="Como podemos te chamar?"
            className={`${inputBase} ${erros.nome ? 'border-cereja' : 'border-vinho/15'}`}
          />
          {erros.nome && <p className="mt-1 text-xs text-cereja">{erros.nome}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-vinho">
            WhatsApp / Telefone *
          </label>
          <input
            type="tel"
            value={cliente.telefone}
            onChange={(e) => campo('telefone', e.target.value)}
            placeholder="(00) 00000-0000"
            className={`${inputBase} ${erros.telefone ? 'border-cereja' : 'border-vinho/15'}`}
          />
          {erros.telefone && (
            <p className="mt-1 text-xs text-cereja">{erros.telefone}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-vinho">
            Email (opcional)
          </label>
          <input
            type="email"
            value={cliente.email}
            onChange={(e) => campo('email', e.target.value)}
            placeholder="seuemail@exemplo.com"
            className={`${inputBase} ${erros.email ? 'border-cereja' : 'border-vinho/15'}`}
          />
          {erros.email && (
            <p className="mt-1 text-xs text-cereja">{erros.email}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-vinho">
            Observações (opcional)
          </label>
          <textarea
            value={cliente.observacoes}
            onChange={(e) => campo('observacoes', e.target.value)}
            rows={3}
            placeholder="Alguma ideia de cor, decoração ou referência?"
            className={`${inputBase} resize-none border-vinho/15`}
          />
          <button
            type="button"
            onClick={() =>
              campo('observacoes', sugestaoAtiva ? '' : OBSERVACAO_SUGESTAO)
            }
            className={`mt-2 rounded-full border-2 px-3 py-1.5 text-xs font-semibold transition ${
              sugestaoAtiva
                ? 'border-vinho bg-cereja text-creme'
                : 'border-vinho/15 bg-creme_branco text-vinho hover:border-vinho'
            }`}
          >
            Não sei ainda — combinar no dia
          </button>
        </div>
      </div>
    </div>
  )
}
