import type { Servico, DadosCliente } from '../../types'
import { formatarPreco } from '../../data/servicos'
import { formatarDataExtenso } from '../../data/agenda'

interface Props {
  servico: Servico
  data: string
  horario: string
  cliente: DadosCliente
}

export default function Confirmacao({ servico, data, horario, cliente }: Props) {
  const linhas = [
    { rotulo: 'Serviço', valor: servico.nome },
    { rotulo: 'Valor', valor: formatarPreco(servico.preco) },
    { rotulo: 'Data', valor: formatarDataExtenso(data) },
    { rotulo: 'Horário', valor: horario },
    { rotulo: 'Nome', valor: cliente.nome },
    { rotulo: 'Contato', valor: cliente.telefone },
  ]

  return (
    <div>
      <span className="eyebrow">Passo 4</span>
      <h2 className="mt-1 font-display text-3xl font-light text-vinho-tinta">
        Confirme seu <span className="italic text-cereja">agendamento</span>
      </h2>
      <p className="mt-1 text-sm text-vinho/70">
        Revise os detalhes antes de finalizar.
      </p>

      <dl className="mt-6 divide-y divide-vinho/10 rounded-3xl border border-vinho/10 bg-creme-2 p-5">
        {linhas.map((linha) => (
          <div key={linha.rotulo} className="flex justify-between gap-4 py-2.5">
            <dt className="text-sm text-vinho/70">{linha.rotulo}</dt>
            <dd className="text-right text-sm font-semibold text-vinho-tinta">
              {linha.valor}
            </dd>
          </div>
        ))}
        {cliente.observacoes && (
          <div className="py-2.5">
            <dt className="text-sm text-vinho/70">Observações</dt>
            <dd className="mt-1 text-sm text-vinho-tinta">{cliente.observacoes}</dd>
          </div>
        )}
      </dl>

      <p className="mt-4 rounded-2xl border border-dashed border-vinho/25 bg-creme-2 p-3 text-center text-xs text-vinho/70">
        Esta é uma simulação. Nenhuma mensagem real será enviada.
      </p>
    </div>
  )
}
