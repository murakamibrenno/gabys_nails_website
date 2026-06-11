import ServicoCard from '../components/ServicoCard'
import { Cherry } from '../components/Decor'
import { servicos } from '../data/servicos'

export default function Catalogo() {
  return (
    <div className="container-app py-16">
      <header className="relative mb-12 text-center">
        <Cherry className="mx-auto mb-4 h-12 w-12 animate-float" />
        <span className="eyebrow">Tudo incluso</span>
        <h1 className="mt-2 font-display text-6xl font-light text-vinho-tinta">
          Catálogo de <span className="italic text-cereja">serviços</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-vinho/70">
          Todos os valores já incluem a esmaltação em gel e as decorações. Sem
          surpresas, só capricho.
        </p>
      </header>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {servicos.map((servico) => (
          <ServicoCard key={servico.id} servico={servico} />
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-dashed border-vinho/25 bg-creme-2 p-5 text-center text-sm text-vinho/75">
        Os tempos de atendimento são estimativas e podem variar conforme o
        comprimento e o estilo escolhido.
      </div>
    </div>
  )
}
