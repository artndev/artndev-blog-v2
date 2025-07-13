import type {
  Cookie,
  CookieSetOptions,
} from 'node_modules/universal-cookie/cjs/types'

declare global {
  export type Dictionary<T> = {
    [key: string]: T
  }
}

export interface I_AxiosResponse<T> {
  data: {
    message: string
    answer: T
  }
}

export interface I_AxiosError {
  status?: number // not always axios
}

export interface I_Article {
  id: number
  title: string
  subtitle: string
  content: string
  tags: string
  updated: string
}

export interface I_AdminContext {
  cookies: {
    auth_token_provided?: boolean
  }
  setCookie: (
    name: 'auth_token_provided',
    value: Cookie,
    options?: CookieSetOptions
  ) => void
}

export interface I_IPContext {
  ip: string | null
}

export interface I_OrderContext {
  order: Dictionary<number | null> | null
}

export {}
