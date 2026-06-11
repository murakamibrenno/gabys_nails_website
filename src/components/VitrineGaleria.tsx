import { Link } from 'react-router-dom'
import { galeria } from '../data/galeria'
import { Sparkle } from './Decor'

const featured = galeria[0]
const resto = galeria.slice(1, 5)

export default function VitrineGaleria() {
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
          {/* Destaque grande */}
          <Link
            to="/galeria"
            className="group relative col-span-2 row-span-2 overflow-hidden rounded-[1.75rem] border-2 border-vinho"
          >
            <img
              src={featured.src}
              alt={featured.titulo}
              className="h-full min-h-[260px] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 rounded-full bg-cereja px-3 py-1 text-xs font-semibold uppercase tracking-wide text-creme">
              {featured.categoria}
            </span>
            <span className="absolute bottom-4 left-4 font-display text-2xl text-creme drop-shadow-[0_2px_8px_rgba(74,10,20,0.8)]">
              {featured.titulo}
            </span>
          </Link>

          {/* Mosaico secundário */}
          {resto.map((foto) => (
            <Link
              key={foto.id}
              to="/galeria"
              className="group relative overflow-hidden rounded-[1.5rem] border-2 border-vinho/15 transition hover:border-vinho"
            >
              <img
                src={foto.src}
                alt={foto.titulo}
                className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-vinho-tinta/90 to-transparent p-3 transition duration-300 group-hover:translate-y-0">
                <span className="block text-[0.6rem] uppercase tracking-ultra text-rosa">
                  {foto.categoria}
                </span>
                <span className="font-display text-sm text-creme">{foto.titulo}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
