import { galeria } from '../data/galeria'
import type { FotoGaleria } from '../types'

/** Embaralha in-place (Fisher-Yates) e devolve os primeiros `quantidade` itens. */
export function sortearFotosGaleria(quantidade: number): FotoGaleria[] {
  const copia = [...galeria]
  const limite = Math.min(quantidade, copia.length)

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }

  return copia.slice(0, limite)
}
