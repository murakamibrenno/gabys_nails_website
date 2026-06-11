import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

const links = [
  { to: '/', label: 'Início' },
  { to: '/catalogo', label: 'Serviços' },
  { to: '/galeria', label: 'Galeria' },
  { to: '/agendamento', label: 'Agendar' },
]

export default function Navbar() {
  const [aberto, setAberto] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 border-b border-vinho/10 bg-creme/80 backdrop-blur-md">
      <nav className="container-app flex items-center justify-between py-3">
        <Link
          to="/"
          className="group flex items-center gap-3"
          onClick={() => setAberto(false)}
        >
          <span className="relative">
            <span className="absolute inset-0 -rotate-6 rounded-full bg-rosa/50 transition-transform group-hover:rotate-0" />
            <img
              src={logo}
              alt="Gaby Nails"
              className="relative h-12 w-12 rounded-full object-cover ring-2 ring-creme"
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold tracking-tight text-vinho">
              Gaby
            </span>
            <span className="-mt-1 text-[0.6rem] font-semibold uppercase tracking-ultra text-cereja">
              Nails
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'text-cereja'
                      : 'text-vinho/70 hover:text-vinho'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-cereja" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate('/agendamento')}
          className="hidden md:inline-flex btn-primary !py-2 !px-5 text-sm"
        >
          Reservar
        </button>

        <button
          className="rounded-full border-2 border-vinho p-1.5 text-vinho md:hidden"
          onClick={() => setAberto((a) => !a)}
          aria-label="Abrir menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {aberto ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {aberto && (
        <ul className="container-app flex flex-col gap-1 pb-4 md:hidden">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={() => setAberto(false)}
                className={({ isActive }) =>
                  `block rounded-2xl border-2 px-4 py-3 font-semibold transition ${
                    isActive
                      ? 'border-vinho bg-cereja text-creme'
                      : 'border-vinho/10 bg-creme_branco text-vinho'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
