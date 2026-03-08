'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from './authStore'
import { authApi } from '../api/authApi'

export function useLogout() {
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)
  const [isPending, setIsPending] = useState(false)

  const handleLogout = useCallback(async () => {
    setIsPending(true)
    await authApi.logOut().catch(() => {})
    logout()
    router.replace('/')
  }, [logout, router])

  return { handleLogout, isPending }
}
