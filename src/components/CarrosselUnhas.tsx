import { useEffect, useRef, useState } from 'react'
import { galeria } from '../data/galeria'

const INTERVALO_MS = 3200

// Sorteia um proximo indice diferente do atual.
function proximoAleatorio(atual: number, total: number) {
  if (total <= 1) return 0
  let prox = atual
  while (prox === atual) {
    prox = Math.floor(Math.random() * total)
  }
  return prox
}

export default function CarrosselUnhas() {
  const total = galeria.length
  const [indice, setIndice] = useState(() =>
    Math.floor(Math.random() * total),
  )
  const pausado = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausado.current) {
        setIndice((atual) => proximoAleatorio(atual, total))
      }
    }, INTERVALO_MS)
    return () => clearInterval(id)
  }, [total])

  return (
    <div
      className="relative"
      onMouseEnter={() => (pausado.current = true)}
      onMouseLeave={() => (pausado.current = false)}
    >
      <div className="relative aspect-square h-72 w-72 overflow-hidden rounded-[1.8rem] sm:h-80 sm:w-80">
        {galeria.map((foto, i) => (
          <img
            key={foto.id}
            src={foto.src}
            alt={foto.titulo}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === indice ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Legenda da foto atual */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-vinho-tinta/80 to-transparent p-3">
          <span className="block text-[0.6rem] uppercase tracking-ultra text-rosa">
            {galeria[indice].categoria}
          </span>
          <span className="font-display text-base text-creme">
            {galeria[indice].titulo}
          </span>
        </div>
      </div>

      {/* Indicadores */}
      <div className="mt-3 flex justify-center gap-1.5">
        {galeria.map((foto, i) => (
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
