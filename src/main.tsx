import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AgendamentoProvider } from './context/AgendamentoContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AgendamentoProvider>
        <App />
      </AgendamentoProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
