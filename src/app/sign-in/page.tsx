'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useAuthStore, authApi, type SignInPayload } from '@/features/auth'

export default function SignInPage() {
  const router = useRouter()
  const { login } = useAuthStore()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInPayload>()

  const onSubmit = async (values: SignInPayload) => {
    try {
      const user = await authApi.signIn(values)
      login(user)
      router.push(`/user/${user.username}`)
    } catch {
      setError('password', { message: 'Invalid username or password' })
    }
  }

  return (
    <main className="index_page">
      <div>
        <h1 className="header">SIGN_IN</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <p>
            <label className="form-label">username</label>
            <br />
            <input className="form-input" type="text" autoComplete="username" {...register('username', { required: true })} />
            {errors.username && (
              <span style={{ color: 'red', fontSize: '1rem' }}>[required]</span>
            )}
          </p>
          <p>
            <label className="form-label">password</label>
            <br />
            <input className="form-input" type="password" autoComplete="current-password" {...register('password', { required: true })} />
            {errors.password && (
              <span style={{ color: 'red', fontSize: '1rem' }}>[{errors.password.message ?? 'required'}]</span>
            )}
          </p>
          <p className="btn-group" style={{ marginTop: '5vh' }}>
            <button className="button form-button" type="submit" disabled={isSubmitting}>
              sign_in
            </button>
          </p>
        </form>
      </div>
    </main>
  )
}
