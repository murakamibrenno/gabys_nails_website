/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base quente (creme / blush) em vez de branco puro
        creme: '#FFF7F1',
        'creme-2': '#FDEDE4',
        blush: '#F9DAD0',
        rosa: '#F4A6BB',
        'rosa-forte': '#EE6E8C',
        // Acentos cereja extraidos da logo
        cereja: '#D81830',
        'cereja-escuro': '#B01228',
        vinho: '#7A1020',
        'vinho-tinta': '#4A0A14',
        folha: '#2E7D4F',
        creme_branco: '#FFFDFB',
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        script: ['Sacramento', 'cursive'],
        sans: ['"Hanken Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        suave: '0 18px 40px -20px rgba(122, 16, 32, 0.35)',
        bloco: '8px 8px 0 0 rgba(122, 16, 32, 0.9)',
        'bloco-rosa': '6px 6px 0 0 rgba(238, 110, 140, 0.55)',
        recorte: '0 1px 0 rgba(255,255,255,0.6) inset',
      },
      backgroundImage: {
        'mesh-cereja':
          'radial-gradient(60% 55% at 15% 10%, rgba(244,166,187,0.55) 0%, transparent 60%), radial-gradient(50% 50% at 90% 5%, rgba(238,110,140,0.35) 0%, transparent 55%), radial-gradient(55% 60% at 80% 95%, rgba(216,24,48,0.18) 0%, transparent 60%)',
      },
      letterSpacing: {
        ultra: '0.32em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(4deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.25', transform: 'scale(0.85)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
