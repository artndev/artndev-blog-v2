import { OrderContext } from '@/contexts/OrderContext'
import { useContext } from 'react'

export const useOrderContext = () => useContext(OrderContext)
