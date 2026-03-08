import { useAuthStore } from './authStore'

export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const hasHydrated = useAuthStore((state) => state._hasHydrated)
  return { user, isAuthenticated, hasHydrated }
}
