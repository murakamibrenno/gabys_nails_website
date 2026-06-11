# Gaby Nails — Mockup de Agendamento

Mockup de plataforma de agendamento para o estúdio **Gaby Nails**, feito com **React + Vite + TypeScript + Tailwind CSS**. Sem backend: os dados são estáticos e os agendamentos são salvos no `localStorage` do navegador.

## Como rodar

```bash
npm install
npm run dev
```

Acesse o endereço exibido no terminal (por padrão `http://localhost:5173`).

Outros comandos:

```bash
npm run build     # build de produção (gera a pasta dist/)
npm run preview   # pré-visualiza o build
```

## Estrutura

- `src/pages/` — páginas: Início, Serviços (catálogo), Galeria e Agendamento.
- `src/components/` — componentes de UI (Navbar, Footer, Hero, cards, motivos decorativos em `Decor.tsx`) e o wizard de agendamento em `components/booking/`.
- `src/assets/` — imagens importadas pelo bundler (logo).
- `src/data/` — dados mockados:
  - `servicos.ts` — Alongamento (R$ 190) e Manutenção (R$ 115), com esmaltação em gel e decorações inclusas.
  - `galeria.ts` — placeholders prontos para receber as fotos reais.
  - `agenda.ts` — geração de dias e horários disponíveis (simulados).
- `src/context/AgendamentoContext.tsx` — estado do fluxo de agendamento.

## Personalização

- **Cores e fontes:** definidas em `tailwind.config.js` (paleta creme + cereja extraída da logo; fontes Fraunces, Sacramento e Hanken Grotesk).
- **Fotos da galeria:** preencha o campo `src` de cada item em `src/data/galeria.ts`.
- **Logo:** `src/assets/logo.png` (usada nos componentes) e `public/logo.png` (favicon).

## Observações

Este é um mockup demonstrativo. O fluxo de agendamento é uma simulação e não envia nenhuma mensagem ou requisição real.
