import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const IsAdminSchema = z.object({
  auth_token: z.string().uuid({
    message: 'Auth token is invalid',
  }),
})

export type T_IsAdminSchema = z.infer<typeof IsAdminSchema>
