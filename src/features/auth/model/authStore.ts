import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/entities/user'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  _hasHydrated: boolean
  login: (user: User) => void
  logout: () => void
  setUser: (user: User) => void
  _setHasHydrated: (val: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,

      login: (user) => set({ user, isAuthenticated: true }),

      logout: () => set({ user: null, isAuthenticated: false }),

      setUser: (user) => set({ user }),

      _setHasHydrated: (val) => set({ _hasHydrated: val }),
    }),
    {
      name: 'uyebar-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        state?._setHasHydrated(true)
      },
    },
  ),
)
