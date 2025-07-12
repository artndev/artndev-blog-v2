import { z } from 'zod'

export const AdminFormSchema = z.object({
  auth_token: z.string().uuid({
    message: 'Auth token is invalid',
  }),
})

export type T_AdminFormSchema = z.infer<typeof AdminFormSchema>

export const ArticleFormSchema = z.object({
  title: z.string().nonempty({
    message: 'Title cannot be empty',
  }),
  subtitle: z.string().nonempty({
    message: 'Subtitle cannot be empty',
  }),
  content: z.string().nonempty({
    message: 'Content cannot be empty',
  }),
  tags: z.string() /* .optional() */,
})

export type T_ArticleFormSchema = z.infer<typeof ArticleFormSchema>
