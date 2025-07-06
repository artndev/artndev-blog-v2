import { AdminContext } from '@/contexts/AdminContext'
import { useContext } from 'react'

export const useAdminContext = () => useContext(AdminContext)
