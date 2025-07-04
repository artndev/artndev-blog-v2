import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminProvider from '@/contexts/Admin.tsx'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <AdminProvider>
        <App />
      </AdminProvider>
    </CookiesProvider>
  </StrictMode>
)
