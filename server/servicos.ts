export const servicos = [
  {
    id: 'alongamento',
    nome: 'Alongamento em Gel',
    preco: 190,
    duracaoMin: 150,
  },
  {
    id: 'manutencao',
    nome: 'Manutenção',
    preco: 115,
    duracaoMin: 120,
  },
] as const

export function getServico(id: string) {
  return servicos.find((s) => s.id === id)
}
