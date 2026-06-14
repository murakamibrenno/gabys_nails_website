import GaleriaGrid from '../components/GaleriaGrid'
import { Sparkle } from '../components/Decor'
import { galeria } from '../data/galeria'

export default function Galeria() {
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
        </p>
      </header>

      <GaleriaGrid fotos={galeria} />
    </div>
  )
}
