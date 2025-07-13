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

export interface I_ArticleProps extends React.RefAttributes<HTMLDivElement> {
  id: number
  title: string
  content: string
  updated: string
  tags: string[]
  className?: string | string[]
  i?: number
}

export {}
