import { Link } from 'react-router-dom'
import { Cherry, Sparkle, Drop } from './Decor'
import CarrosselUnhas from './CarrosselUnhas'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh-cereja">
      {/* Sparkles flutuantes */}
      <Sparkle className="absolute left-[8%] top-24 h-5 w-5 animate-twinkle text-rosa-forte" />
      <Sparkle className="absolute right-[12%] top-16 h-7 w-7 animate-twinkle text-cereja [animation-delay:1s]" />
      <Sparkle className="absolute left-[42%] bottom-12 h-4 w-4 animate-twinkle text-rosa [animation-delay:1.6s]" />

      <div className="container-app relative grid items-center gap-12 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div>
          <span className="pill animate-fade-up">
            <Drop className="h-3.5 w-3.5 text-cereja" />
            Esmaltação em gel + decorações inclusas
          </span>

          <h1 className="mt-6 font-display text-6xl font-light leading-[0.95] text-vinho-tinta sm:text-7xl lg:text-8xl">
            <span className="animate-fade-up animate-delay-1 block">Unhas que</span>
            <span className="animate-fade-up animate-delay-2 block italic text-cereja">
              encantam
            </span>
            <span className="animate-fade-up animate-delay-3 block">
              de verdade.
            </span>
          </h1>

          <p className="mt-6 max-w-md animate-fade-up animate-delay-3 text-lg leading-relaxed text-vinho/75">
            Alongamento e manutenção em gel com acabamento impecável. No
            <span className="font-script text-2xl text-cereja"> Gaby Nails</span>,
            cada detalhe é feito com capricho — do brilho à última decoração.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up animate-delay-4">
            <Link to="/agendamento" className="btn-primary">
              Agendar agora
              <span aria-hidden>→</span>
            </Link>
            <Link to="/catalogo" className="btn-ghost">
              Ver serviços
            </Link>
          </div>

          <dl className="mt-12 flex gap-8 animate-fade-up animate-delay-4">
            <div>
              <dt className="font-display text-3xl font-semibold text-cereja">2</dt>
              <dd className="text-xs uppercase tracking-wide text-vinho/60">
                Serviços
              </dd>
            </div>
            <div className="border-l border-vinho/10 pl-8">
              <dt className="font-display text-3xl font-semibold text-cereja">100%</dt>
              <dd className="text-xs uppercase tracking-wide text-vinho/60">
                Tudo incluso
              </dd>
            </div>
            <div className="border-l border-vinho/10 pl-8">
              <dt className="font-display text-3xl font-semibold text-cereja">★</dt>
              <dd className="text-xs uppercase tracking-wide text-vinho/60">
                Hora marcada
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative flex justify-center animate-fade-up animate-delay-2">
          <Cherry className="absolute -left-2 top-2 z-10 h-16 w-16 animate-float drop-shadow" />
          <Cherry className="absolute -right-1 bottom-6 z-10 h-12 w-12 animate-float [animation-delay:2s]" />

          {/* Moldura recortada estilo selo */}
          <div className="relative">
            <div className="absolute -inset-3 -rotate-3 rounded-[2.6rem] border-2 border-vinho" />
            <div className="absolute -inset-3 rotate-2 rounded-[2.6rem] bg-blush/70" />
            <div className="relative overflow-hidden rounded-[2.4rem] border-2 border-vinho bg-creme_branco p-3 shadow-suave">
              <CarrosselUnhas />
            </div>
          </div>
        </div>
      </div>

      {/* Faixa marquee na base */}
      <div className="border-y-2 border-vinho bg-cereja py-2.5 text-creme">
        <div className="flex w-max animate-marquee gap-6 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, bloco) => (
            <span key={bloco} className="flex items-center gap-6 text-sm font-semibold uppercase tracking-ultra">
              {[
                'Alongamento em gel',
                'Manutenção',
                'Esmaltação em gel',
                'Nail art & decorações',
                'Atendimento exclusivo',
              ].map((txt) => (
                <span key={txt} className="flex items-center gap-6">
                  {txt}
                  <Sparkle className="h-3 w-3 text-creme/80" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
