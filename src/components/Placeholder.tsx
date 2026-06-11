import type { FotoGaleria } from '../types'
import { Sparkle } from './Decor'

export default function Placeholder({ foto }: { foto: FotoGaleria }) {
  return (
    <figure className="group relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border-2 border-vinho/15 bg-creme-2 transition hover:border-vinho">
      {foto.src ? (
        <img
          src={foto.src}
          alt={foto.titulo}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-cereja/60">
          <Sparkle className="h-8 w-8 text-rosa-forte/60 transition group-hover:scale-110" />
          <span className="text-xs font-semibold uppercase tracking-wide">
            Foto em breve
          </span>
        </div>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-vinho-tinta/90 to-transparent p-4 text-left text-creme transition duration-300 group-hover:translate-y-0">
        <span className="block text-[0.65rem] uppercase tracking-ultra text-rosa">
          {foto.categoria}
        </span>
        <span className="font-display text-base">{foto.titulo}</span>
      </figcaption>
    </figure>
  )
}
