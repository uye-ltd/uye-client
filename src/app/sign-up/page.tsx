'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { authApi } from '@/features/auth'

interface SignUpValues {
  username: string
  password: string
  password2: string
}

export default function SignUpPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>()

  const onSubmit = async (values: SignUpValues) => {
    try {
      await authApi.signUp(values)
      router.push('/sign-in')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      setError('username', { message })
    }
  }

  return (
    <main className="index_page">
      <div>
        <h1 className="header">SIGN UP</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>
            <label className="form-label">Username</label>
            <br />
            <input
              className="form-input"
              type="text"
              autoComplete="username"
              {...register('username', { required: 'required' })}
            />
            {errors.username && (
              <span style={{ color: 'red' }}>[{errors.username.message}]</span>
            )}
          </p>
          <p>
            <label className="form-label">Password</label>
            <br />
            <input
              className="form-input"
              type="password"
              autoComplete="new-password"
              {...register('password', { required: 'required' })}
            />
            {errors.password && (
              <span style={{ color: 'red' }}>[{errors.password.message}]</span>
            )}
          </p>
          <p>
            <label className="form-label">Repeat Password</label>
            <br />
            <input
              className="form-input"
              type="password"
              autoComplete="new-password"
              {...register('password2', {
                required: 'required',
                validate: (val) => val === watch('password') || 'passwords do not match',
              })}
            />
            {errors.password2 && (
              <span style={{ color: 'red' }}>[{errors.password2.message}]</span>
            )}
          </p>
          <p className="btn-group" style={{ marginTop: '5vh' }}>
            <button className="button form-button" type="submit" disabled={isSubmitting}>
              Register
            </button>
          </p>
        </form>
      </div>
    </main>
  )
}
