interface DecorProps {
  className?: string
}

// Par de cerejas — motivo principal da logo.
export function Cherry({ className = '' }: DecorProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path
        d="M30 12c-2 8-12 10-18 16M34 12c4 7 15 7 22 13"
        stroke="#2E7D4F"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M30 10c3-3 8-3 9 1"
        stroke="#2E7D4F"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="18" cy="44" r="13" fill="#D81830" />
      <circle cx="44" cy="46" r="13" fill="#B01228" />
      <circle cx="14" cy="40" r="3.2" fill="#fff" opacity="0.65" />
      <circle cx="40" cy="42" r="3.2" fill="#fff" opacity="0.55" />
    </svg>
  )
}

// Estrela de 4 pontas — brilho/sparkle do fundo da logo.
export function Sparkle({ className = '' }: DecorProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 0c.7 6.3 5 10.6 12 12-7 1.4-11.3 5.7-12 12-.7-6.3-5-10.6-12-12C7 10.6 11.3 6.3 12 0z"
        fill="currentColor"
      />
    </svg>
  )
}

// Gota de esmalte.
export function Drop({ className = '' }: DecorProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2c4 6 7 9.5 7 13a7 7 0 11-14 0c0-3.5 3-7 7-13z"
        fill="currentColor"
      />
    </svg>
  )
}
