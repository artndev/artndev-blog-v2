import type { I_AdminContext } from '@/types'
import React, { createContext } from 'react'
import { useCookies } from 'react-cookie'

export const AdminContext = createContext<I_AdminContext>({} as I_AdminContext)
const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cookies, setCookie] = useCookies<
    'auth_token_provided',
    { auth_token_provided?: boolean }
  >(['auth_token_provided'])

  return (
    <AdminContext.Provider
      value={{
        cookies,
        setCookie,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export default AdminProvider
