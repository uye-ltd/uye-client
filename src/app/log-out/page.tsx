'use client'

import { useEffect } from 'react'
import { useLogout } from '@/features/auth'

export default function LogOutPage() {
  const { handleLogout } = useLogout()

  useEffect(() => {
    handleLogout()
  // handleLogout is stable (useCallback) — safe to omit from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
