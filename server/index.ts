import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { config } from './config.js'
import { runMigrations } from './db.js'
import publicRoutes from './routes/public.js'
import adminRoutes from './routes/admin.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

runMigrations()

const app = express()

app.use(helmet({ contentSecurityPolicy: false }))
app.use(
  cors({
    origin: config.isProd
      ? process.env.FRONTEND_URL || true
      : ['http://localhost:5173', 'http://localhost:4173'],
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())

app.use('/api', publicRoutes)
app.use('/api/admin', adminRoutes)

// Em produção na VPS: servir build do frontend
if (config.isProd) {
  const distPath = path.join(__dirname, '..', 'dist')
  app.use(express.static(distPath))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(config.port, () => {
  console.log(`API Gaby Nails rodando em http://localhost:${config.port}`)
})
