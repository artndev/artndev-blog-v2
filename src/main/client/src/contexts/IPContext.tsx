import type { I_IPContext } from '@/types'
import React, { createContext, useEffect, useState } from 'react'

export const IPContext = createContext<I_IPContext>({} as I_IPContext)
const IPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ip, setIp] = useState<string | null>(null)

  useEffect(() => {
    getIp()
  }, [])

  const getIp = async () => {
    const response = await fetch('https://geolocation-db.com/json/')
    const data: { IPv4: string | null } = await response.json()

    setIp(data.IPv4)
  }

  return <IPContext.Provider value={{ ip }}>{children}</IPContext.Provider>
}

export default IPProvider
