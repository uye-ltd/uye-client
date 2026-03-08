import { apiClient } from '@/shared/api/client'
import type { User } from '@/entities/user'

export interface SignInPayload {
  username: string
  password: string
}

export interface SignUpPayload {
  username: string
  password: string
  password2: string
}

export const authApi = {
  signIn: (payload: SignInPayload) =>
    apiClient.post<User>('/api/auth/sign-in', payload),

  signUp: (payload: SignUpPayload) =>
    apiClient.post<User>('/api/auth/sign-up', payload),

  logOut: () =>
    apiClient.post<void>('/api/auth/log-out'),

  me: () =>
    apiClient.get<User>('/api/auth/me'),
}
