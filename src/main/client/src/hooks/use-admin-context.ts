import { AdminContext } from '@/contexts/Admin'
import { useContext } from 'react'

export const useAdminContext = () => useContext(AdminContext)
