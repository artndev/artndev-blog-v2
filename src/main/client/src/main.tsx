import App from '@/App'
import { TooltipProvider } from '@/components/ui/tooltip'
import AdminProvider from '@/contexts/AdminContext'
import IPProvider from '@/contexts/IPContext'
import OrderProvider from '@/contexts/OrderContext'
import '@/index.css'
import { StrictMode } from 'react'
import { CookiesProvider } from 'react-cookie'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <AdminProvider>
        <OrderProvider>
          <TooltipProvider>
            <IPProvider>
              <App />
            </IPProvider>
          </TooltipProvider>
        </OrderProvider>
      </AdminProvider>
    </CookiesProvider>
  </StrictMode>
)
