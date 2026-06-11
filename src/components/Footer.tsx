import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Sparkle } from './Decor'

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-vinho bg-vinho-tinta text-creme">
      <div className="container-app grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Gaby Nails"
              className="h-14 w-14 rounded-full object-cover ring-2 ring-creme/30"
            />
            <span className="font-script text-3xl text-creme">Gaby Nails</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-creme/70">
            Unhas em gel com esmaltação e decorações inclusas. Capricho do
            começo ao fim, no seu ritmo.
          </p>
        </div>

        <div>
          <h3 className="flex items-center gap-2 font-display text-lg text-creme">
            <Sparkle className="h-3.5 w-3.5 text-rosa" /> Navegação
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-creme/70">
            <li><Link to="/catalogo" className="transition hover:text-rosa">Serviços</Link></li>
            <li><Link to="/galeria" className="transition hover:text-rosa">Galeria</Link></li>
            <li><Link to="/agendamento" className="transition hover:text-rosa">Agendar</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2 font-display text-lg text-creme">
            <Sparkle className="h-3.5 w-3.5 text-rosa" /> Contato
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-creme/70">
            <li>WhatsApp: (00) 00000-0000</li>
            <li>Instagram: @gabynails</li>
            <li>Atendimento com hora marcada</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-creme/15 py-5 text-center text-xs tracking-wide text-creme/50">
        © {new Date().getFullYear()} Gaby Nails · Mockup demonstrativo
      </div>
    </footer>
  )
}
