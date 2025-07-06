import axios from '@/lib/axios.js'
import type { I_Article, I_AxiosResponse, I_OrderContext } from '@/types'
import React, { createContext, useEffect, useState } from 'react'

const getOrder = (articles: I_Article[]) => {
  const res: I_OrderContext['order'] = {}

  articles.forEach((article, i) => {
    if (!articles[i + 1]) {
      res[article.id] = null
      return
    }

    res[article.id] = articles[i + 1].id
  })

  return res
}

export const OrderContext = createContext<I_OrderContext>({} as I_OrderContext)
const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [order, setOrder] = useState<I_OrderContext['order'] | null>(null)

  useEffect(() => {
    axios
      .get('/articles')
      .then((res: I_AxiosResponse<I_Article[]>) =>
        setOrder(getOrder(res.data.answer))
      )
      .catch(err => console.log(err))
  }, [])

  return (
    <OrderContext.Provider value={{ order }}>{children}</OrderContext.Provider>
  )
}

export default OrderProvider
