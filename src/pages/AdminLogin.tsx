import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminLogin } from '../services/api'
import logo from '../assets/logo.png'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCarregando(true)
    setErro('')
    try {
      await adminLogin(password)
      navigate('/admin')
    } catch {
      setErro('Senha incorreta.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-mesh-cereja px-4">
      <div className="card w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <img
            src={logo}
            alt="Gaby Nails"
            className="h-16 w-16 rounded-full object-cover ring-2 ring-creme"
          />
          <h1 className="mt-4 font-display text-3xl text-vinho-tinta">
            Área <span className="italic text-cereja">administrativa</span>
          </h1>
          <p className="mt-2 text-sm text-vinho/70">
            Gerencie agendamentos da Gaby Nails.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-vinho">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border-2 border-vinho/15 bg-creme_branco px-4 py-3 outline-none focus:border-cereja"
              placeholder="Senha de acesso"
              autoFocus
            />
          </div>
          {erro && <p className="text-sm text-cereja">{erro}</p>}
          <button
            type="submit"
            disabled={carregando || !password}
            className="btn-primary w-full"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-vinho/60 hover:text-cereja"
        >
          ← Voltar ao site
        </Link>
      </div>
    </div>
  )
}
