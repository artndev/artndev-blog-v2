import { T_ArticleFormSchema } from '@/lib/schemas'

export interface I_ArticleFormProps {
  onSubmit: (data: T_ArticleFormSchema) => Promise<void> | void
}

export interface I_ArticleProps {
  id: number
  title: string
  content: string
  updated: string
  className?: string | string[]
}

export interface I_Article {
  id: number
  title: string
  subtitle: string
  content: string
  updated: string
}

export interface I_AxiosResponse<T> {
  data: {
    message: string
    answer: T
  }
}

export {}
