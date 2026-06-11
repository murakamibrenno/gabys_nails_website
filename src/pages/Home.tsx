import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import VitrineGaleria from '../components/VitrineGaleria'
import ServicoCard from '../components/ServicoCard'
import { Cherry, Sparkle, Drop } from '../components/Decor'
import { servicos } from '../data/servicos'
import logo from '../assets/logo.png'

const destaques = [
  {
    titulo: 'Esmaltação em gel',
    texto: 'Brilho e durabilidade por semanas, inclusa em todos os serviços.',
    icone: <Drop className="h-6 w-6 text-cereja" />,
  },
  {
    titulo: 'Decorações inclusas',
    texto: 'Nail art e detalhes personalizados, sem custo adicional.',
    icone: <Sparkle className="h-6 w-6 text-cereja" />,
  },
  {
    titulo: 'Hora marcada',
    texto: 'Atendimento exclusivo, no dia e horário que você escolher.',
    icone: <Cherry className="h-7 w-7" />,
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      <VitrineGaleria />

      <section className="container-app pb-16 pt-4">
        <div className="grid gap-5 sm:grid-cols-3">
          {destaques.map((d) => (
            <div
              key={d.titulo}
              className="card flex items-start gap-4 transition hover:-translate-y-1"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-creme-2">
                {d.icone}
              </span>
              <div>
                <h3 className="font-display text-xl text-vinho-tinta">{d.titulo}</h3>
                <p className="mt-1 text-sm text-vinho/70">{d.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-app py-8">
        <div className="relative grid items-center gap-10 overflow-hidden rounded-[2rem] border-2 border-vinho bg-creme-2 p-8 md:grid-cols-2 md:p-12">
          <Sparkle className="absolute right-10 top-8 h-6 w-6 text-rosa-forte animate-twinkle" />
          <div>
            <span className="eyebrow">O estúdio</span>
            <h2 className="mt-3 font-display text-4xl font-light leading-tight text-vinho-tinta sm:text-5xl">
              Beleza no <span className="italic text-cereja">detalhe</span>,
              cuidado no <span className="italic text-cereja">gesto</span>.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-vinho/75">
              Na Gaby Nails, cada atendimento é pensado para realçar a sua beleza
              com técnica e carinho. Gel de alta qualidade, produtos de marca e
              muita atenção aos detalhes — porque unhas bonitas começam no
              cuidado.
            </p>
            <Link to="/galeria" className="btn-ghost mt-7">
              Conhecer trabalhos
            </Link>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute inset-6 rotate-3 rounded-full bg-rosa/40" />
            <img
              src={logo}
              alt="Gaby Nails"
              className="relative h-56 w-56 rounded-full object-cover ring-4 ring-creme_branco shadow-suave"
            />
          </div>
        </div>
      </section>

      <section className="container-app py-16">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="eyebrow">Tabela de preços</span>
          <h2 className="mt-2 font-display text-5xl font-light text-vinho-tinta">
            Nossos <span className="italic text-cereja">serviços</span>
          </h2>
          <p className="mt-3 max-w-md text-vinho/70">
            Valores que já incluem esmaltação em gel e decorações. Sem surpresas.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {servicos.map((servico) => (
            <ServicoCard key={servico.id} servico={servico} />
          ))}
        </div>
      </section>

      <section className="container-app pb-8">
        <div className="relative overflow-hidden rounded-[2rem] border-2 border-vinho bg-cereja px-8 py-14 text-center text-creme">
          <Sparkle className="absolute left-10 top-10 h-8 w-8 text-creme/40 animate-twinkle" />
          <Sparkle className="absolute right-14 bottom-10 h-5 w-5 text-creme/40 animate-twinkle [animation-delay:1.2s]" />
          <h2 className="font-display text-5xl font-light">
            Pronta para se <span className="italic">cuidar?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-creme/85">
            Garanta seu horário em poucos cliques e venha deixar suas unhas
            impecáveis.
          </p>
          <Link
            to="/agendamento"
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-creme bg-creme px-8 py-3 font-semibold text-cereja transition hover:bg-transparent hover:text-creme"
          >
            Agendar agora <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
