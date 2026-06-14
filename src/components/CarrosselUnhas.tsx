import { useEffect, useMemo, useRef, useState } from 'react'
import { sortearFotosGaleria } from '../utils/galeriaAleatoria'

const INTERVALO_MS = 3200
const QTD_FOTOS = 5

function proximoAleatorio(atual: number, total: number) {
  if (total <= 1) return 0
  let prox = atual
  while (prox === atual) {
    prox = Math.floor(Math.random() * total)
  }
  return prox
}

export default function CarrosselUnhas() {
  const fotos = useMemo(() => sortearFotosGaleria(QTD_FOTOS), [])
  const total = fotos.length
  const [indice, setIndice] = useState(() =>
    total > 0 ? Math.floor(Math.random() * total) : 0,
  )
  const pausado = useRef(false)

  useEffect(() => {
    if (total <= 1) return
    const id = setInterval(() => {
      if (!pausado.current) {
        setIndice((atual) => proximoAleatorio(atual, total))
      }
    }, INTERVALO_MS)
    return () => clearInterval(id)
  }, [total])

  if (total === 0) return null

  const atual = fotos[indice]

  return (
    <div
      className="relative"
      onMouseEnter={() => (pausado.current = true)}
      onMouseLeave={() => (pausado.current = false)}
    >
      <div className="relative aspect-square h-72 w-72 overflow-hidden rounded-[1.8rem] sm:h-80 sm:w-80">
        {fotos.map((foto, i) => (
          <img
            key={foto.id}
            src={foto.src}
            alt={foto.titulo}
            loading={i === indice ? 'eager' : 'lazy'}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === indice ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-vinho-tinta/80 to-transparent p-3">
          <span className="block text-[0.6rem] uppercase tracking-ultra text-rosa">
            {atual.categoria}
          </span>
          <span className="font-display text-base text-creme">{atual.titulo}</span>
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {fotos.map((foto, i) => (
          <button
            key={foto.id}
            type="button"
            aria-label={`Ver ${foto.titulo}`}
            onClick={() => setIndice(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === indice ? 'w-5 bg-cereja' : 'w-1.5 bg-vinho/25'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
