import { Link } from 'react-router-dom'
import type { Servico } from '../types'
import { formatarPreco, AVISO_PRECO } from '../data/servicos'
import { Sparkle } from './Decor'

export default function ServicoCard({ servico }: { servico: Servico }) {
  const [reais, centavos] = formatarPreco(servico.preco).replace('R$', '').trim().split(',')

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border-2 bg-creme_branco p-7 transition-all duration-300 hover:-translate-y-1 ${
        servico.destaque
          ? 'border-vinho shadow-suave'
          : 'border-vinho/15 hover:border-vinho'
      }`}
    >
      {servico.destaque && (
        <span className="absolute right-0 top-6 flex items-center gap-1 rounded-l-full bg-cereja px-4 py-1 text-xs font-semibold uppercase tracking-wide text-creme">
          <Sparkle className="h-3 w-3" /> Favorito
        </span>
      )}

      <span className="eyebrow">{servico.duracaoMin} min de mimo</span>
      <h3 className="mt-2 font-display text-4xl font-light text-vinho-tinta">
        {servico.nome}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-vinho/70">
        {servico.descricao}
      </p>

      <div className="mt-6 flex items-baseline gap-1 text-cereja">
        <span className="mr-1 self-end text-xs font-semibold uppercase tracking-wide text-vinho/50">
          A partir de
        </span>
        <span className="text-lg font-semibold">R$</span>
        <span className="font-display text-5xl font-semibold leading-none">
          {reais}
        </span>
        <span className="text-lg font-semibold">,{centavos}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-vinho/60">{AVISO_PRECO}</p>

      <ul className="mt-6 space-y-2.5 border-t border-dashed border-vinho/15 pt-5">
        {servico.inclui.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-vinho/80">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-folha/15 text-folha">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Link
        to={`/agendamento?servico=${servico.id}`}
        className="btn-primary mt-7 w-full"
      >
        Agendar este serviço
        <span aria-hidden>→</span>
      </Link>
    </article>
  )
}
