import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Sparkle } from './Decor'
import { sortearFotosGaleria } from '../utils/galeriaAleatoria'

const QTD_FOTOS = 5

export default function VitrineGaleria() {
  const fotos = useMemo(() => sortearFotosGaleria(QTD_FOTOS), [])
  const [featured, ...resto] = fotos

  if (!featured) return null

  return (
    <section className="relative overflow-hidden py-16">
      <Sparkle className="absolute right-[10%] top-12 h-6 w-6 animate-twinkle text-rosa-forte" />

      <div className="container-app">
        <div className="flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Feito à mão</span>
            <h2 className="mt-2 font-display text-5xl font-light leading-[0.95] text-vinho-tinta sm:text-6xl">
              Um gostinho do <br />
              nosso <span className="italic text-cereja">trabalho</span>
            </h2>
          </div>
          <Link
            to="/galeria"
            className="group flex items-center gap-2 font-semibold text-cereja"
          >
            Ver galeria completa
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
          <Link
            to="/galeria"
            className="group relative col-span-2 row-span-2 overflow-hidden rounded-[1.75rem] border-2 border-vinho"
          >
            <img
              src={featured.src}
              alt={featured.titulo}
              loading="eager"
              decoding="async"
              className="h-full min-h-[260px] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 rounded-full bg-cereja px-3 py-1 text-xs font-semibold uppercase tracking-wide text-creme">
              Destaque
            </span>
            <span className="absolute bottom-4 left-4 font-display text-2xl text-creme drop-shadow-[0_2px_8px_rgba(74,10,20,0.8)]">
              {featured.titulo}
            </span>
          </Link>

          {resto.map((foto) => (
            <Link
              key={foto.id}
              to="/galeria"
              className="group relative overflow-hidden rounded-[1.5rem] border-2 border-vinho/15 transition hover:border-vinho"
            >
              <img
                src={foto.src}
                alt={foto.titulo}
                loading="lazy"
                decoding="async"
                className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-vinho-tinta/90 to-transparent p-3 transition duration-300 group-hover:translate-y-0">
                <span className="font-display text-sm text-creme">{foto.titulo}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
