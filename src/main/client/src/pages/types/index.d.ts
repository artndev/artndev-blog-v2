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
