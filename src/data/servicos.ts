import type { Servico } from '../types'

export const OBSERVACAO_SUGESTAO =
  'Ainda não decidi — vamos combinar os detalhes no dia do atendimento.'

export const AVISO_PRECO =
  'Valores base. O preço final pode variar conforme os detalhes do serviço, combinados diretamente com a Gaby antes ou no dia do atendimento.'

export const servicos: Servico[] = [
  {
    id: 'alongamento',
    nome: 'Alongamento em Gel',
    preco: 190,
    duracaoMin: 180,
    descricao:
      'Alongamento das unhas em gel com acabamento natural e resistente, ideal para quem quer unhas longas, bonitas e duradouras.',
    inclui: [
      'Alongamento em gel',
      'Esmaltação em gel inclusa',
      'Decorações inclusas',
      'Modelagem personalizada',
    ],
    destaque: true,
  },
  {
    id: 'manutencao',
    nome: 'Manutenção',
    preco: 115,
    duracaoMin: 120,
    descricao:
      'Manutenção do alongamento já existente, mantendo suas unhas sempre impecáveis com retoque completo.',
    inclui: [
      'Retoque do alongamento',
      'Esmaltação em gel inclusa',
      'Decorações inclusas',
      'Hidratação das cutículas',
    ],
  },
]

export function formatarPreco(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function getServico(id: string): Servico | undefined {
  return servicos.find((s) => s.id === id)
}
