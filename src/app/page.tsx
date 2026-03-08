'use client'

import Link from 'next/link'
import { useAuth } from '@/features/auth'
import { CHANNELS } from '@/shared/config'

export default function IndexPage() {
  const { isAuthenticated, user, hasHydrated } = useAuth()

  return (
    <main className="index_page">
      <div>
        <h1 className="header">
          <Link className="wheat_text_link" href="/home">
            UYEBAR RADIO
          </Link>
        </h1>

        {hasHydrated && (
          isAuthenticated && user ? (
            <div className="btn-group">
              <Link className="button wheat_text_link" href={`/user/${user.username}`}>
                profile
              </Link>
              <Link className="button wheat_text_link" href="/log-out">
                log_out
              </Link>
            </div>
          ) : (
            <div className="btn-group">
              <Link className="button wheat_text_link" href="/sign-up">
                sign_up
              </Link>
              <Link className="button wheat_text_link" href="/sign-in">
                sign_in
              </Link>
            </div>
          )
        )}

        <ul className="list" style={{ marginTop: '2vh' }}>
          {CHANNELS.map((ch) => (
            <li key={ch.id}>
              <Link className="wheat_text_link" href={`/channel/${ch.id}`}>
                CHANNEL {ch.id}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
