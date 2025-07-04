import type {
  Cookie,
  CookieSetOptions,
} from 'node_modules/universal-cookie/cjs/types'

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

export {}
