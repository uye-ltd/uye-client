'use client'

import Link from 'next/link'
import { useAuth } from '@/features/auth'
import { MainLayout } from '@/widgets/layout'
import { env } from '@/shared/config'

export default function AboutPage() {
  const { isAuthenticated, user, hasHydrated } = useAuth()
  const imgSrc = `${env.apiUrl}/static/images/uyebar_radio_2.jpg`

  return (
    <MainLayout>
      <main className="main">
        {/* Deep background */}
        <div className="under-underground">
          <div className="column-under-underground">
            <div className="wrapper-flex">
              <div className="flex-middle-under-underground">
                <div style={{ filter: 'brightness(0.15)', position: 'relative' }}>
                  <img src={imgSrc} className="image image-under-underground" alt="" />
                </div>
              </div>
              <div className="flex-bottom-under-underground" />
            </div>
          </div>
        </div>

        {/* Mid background */}
        <div className="underground">
          <div className="column-underground">
            <div className="wrapper-flex">
              <div className="flex-middle-underground">
                <div style={{ filter: 'brightness(0.8)', position: 'relative' }}>
                  <img src={imgSrc} className="image image-underground" alt="" />
                </div>
              </div>
              <div className="flex-bottom-underground" />
            </div>
          </div>
        </div>

        {/* Left column */}
        <div className="background">
          <div className="column column-left">
            <div className="wrapper-flex">
              <div className="flex-top-1">
                <div className="wrapper-info">
                  <p>The best fucking sound you&apos;ll hear tonight.</p>
                  <p>24/7 rotation. Mundane digging in music collections.</p>
                </div>
              </div>
              <div className="flex-top-2" />
              <div className="flex-middle" />
              <div className="flex-bottom">
                <div style={{ position: 'relative' }}>
                  <img src={imgSrc} className="image" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="foreground">
          <div className="column column-right">
            <div className="wrapper-flex">
              <div className="flex-top-1" />
              <div className="flex-top-2">
                {hasHydrated && (
                isAuthenticated && user ? (
                  <div className="btn-group" style={{ textAlign: 'left' }}>
                    <Link className="button wheat_text_link" href={`/user/${user.username}`}>
                      profile
                    </Link>
                    <Link className="button wheat_text_link" href="/log-out">
                      log_out
                    </Link>
                    <div style={{ width: 105 }} />
                  </div>
                ) : (
                  <div className="btn-group" style={{ textAlign: 'left' }}>
                    <Link className="button wheat_text_link" href="/sign-up">
                      sign_up
                    </Link>
                    <Link className="button wheat_text_link" href="/sign-in">
                      sign_in
                    </Link>
                    <div style={{ width: 105 }} />
                  </div>
                )
              )}
              </div>
              <div className="flex-middle" />
              <div className="flex-bottom">
                <ul className="list text-logo">
                  <li className="wheat_text_link_green">Beauty.</li>
                  <li className="wheat_text_link_yellow">Audacity.</li>
                  <li className="wheat_text_link_red">Luck.</li>
                  <br />
                  <li className="wheat_text_link" style={{ cursor: 'pointer' }}>
                    &gt;UYEBAR.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}
