import type { FotoGaleria } from '../types'
import Placeholder from './Placeholder'

export default function GaleriaGrid({ fotos }: { fotos: FotoGaleria[] }) {
  if (fotos.length === 0) {
    return (
      <p className="py-12 text-center text-vinho/60">
        Nenhuma foto nesta categoria ainda.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {fotos.map((foto) => (
        <Placeholder key={foto.id} foto={foto} />
      ))}
    </div>
  )
}
