import { useState } from 'react'
import GaleriaGrid from '../components/GaleriaGrid'
import { Sparkle } from '../components/Decor'
import { galeria, categorias } from '../data/galeria'

export default function Galeria() {
  const [categoria, setCategoria] = useState('Todas')

  const fotosFiltradas =
    categoria === 'Todas'
      ? galeria
      : galeria.filter((f) => f.categoria === categoria)

  return (
    <div className="container-app py-16">
      <header className="mb-10 text-center">
        <Sparkle className="mx-auto mb-3 h-9 w-9 text-cereja animate-twinkle" />
        <span className="eyebrow">Portfólio</span>
        <h1 className="mt-2 font-display text-6xl font-light text-vinho-tinta">
          <span className="italic text-cereja">Galeria</span> de trabalhos
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-vinho/70">
          Uma seleção dos nossos trabalhos em gel — do alongamento à nail art.
          Use os filtros para explorar por estilo.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
              categoria === cat
                ? 'border-vinho bg-cereja text-creme'
                : 'border-vinho/15 bg-creme_branco text-vinho/70 hover:border-vinho hover:text-vinho'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <GaleriaGrid fotos={fotosFiltradas} />
    </div>
  )
}
