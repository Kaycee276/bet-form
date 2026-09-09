import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StellarWalletProvider } from './context/StellarWalletContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StellarWalletProvider>
        <App />
      </StellarWalletProvider>
    </BrowserRouter>
  </StrictMode>,
)

