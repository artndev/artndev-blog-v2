import type { T_ArticleFormSchema } from '@/lib/schemas'
import type { Content } from '@tiptap/react'

export interface I_RichEditorProps {
  value?: Content | undefined
  onChange?: ((value: Content) => void) | undefined
  className?: string | undefined
}

export interface I_ArticleFormProps {
  formTitle: string
  onSubmit: (data: T_ArticleFormSchema) => Promise<void> | void
  defaultValues?: T_ArticleFormSchema
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
