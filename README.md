# Gaby Nails — Site + Agendamento

Plataforma do estúdio **Gaby Nails** com site institucional, galeria, agendamento online e painel administrativo. Stack: **React + Vite + Express + SQLite**.

## Rodar localmente (testar na sua máquina)

```bash
npm install
cp .env.example .env    # Windows: copy .env.example .env
npm run db:migrate
npm run dev
```

| O quê | URL |
|---|---|
| Site | http://localhost:5173 |
| API | http://localhost:3001 |
| Admin | http://localhost:5173/admin/login |
| Senha admin (padrão) | `gaby123` (definida no `.env`) |

O comando `npm run dev` sobe **frontend + API** juntos. O Vite faz proxy de `/api/*` para a API local.

## Fluxo

1. **Cliente** — agenda sem login; o horário fica reservado (`pending`).
2. **Admin** — entra em `/admin`, vê pendentes, fala no WhatsApp e confirma ou cancela.
3. **Conflito** — dois clientes no mesmo horário: o segundo recebe erro 409.

## Estrutura

```
src/           → frontend React
server/        → API Express + SQLite
server/data/   → database.sqlite (gerado localmente, não vai pro git)
```

## Variáveis de ambiente (`.env`)

```
PORT=3001
ADMIN_PASSWORD=gaby123
JWT_SECRET=troque-este-segredo-antes-de-producao
DATABASE_PATH=./server/data/database.sqlite
NODE_ENV=production   # usar na VPS
PUBLIC_URL=https://seudominio.com

# Email de notificação de agendamentos
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=seu-email@gmail.com
SMTP_PASS=senha-de-app-google
NOTIFY_EMAIL=email-que-recebe-os-agendamentos@gmail.com
```

## Produção (VPS)

```bash
npm install
npm run db:migrate
npm run build
npm start
```

Configure Nginx para proxy + HTTPS e faça backup diário de `server/data/database.sqlite`.

## Comandos

```bash
npm run dev          # frontend + API (desenvolvimento)
npm run dev:client   # só frontend
npm run dev:server   # só API
npm run db:migrate   # criar/atualizar tabelas
npm run build        # build do frontend
npm start            # API + serve dist/ (produção)
```
