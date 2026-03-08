'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { MainLayout } from '@/widgets/layout'
import { ProfileImageLayers } from '@/widgets/image-layers'
import { useAuth, useLogout } from '@/features/auth'
import { profileApi } from '@/features/profile'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'
import { trackApi } from '@/features/track-library'
import type { Track } from '@/entities/track'

export function UserPageClient() {
  const { username } = useParams<{ username: string }>()

  const { isAuthenticated, user: currentUser, hasHydrated } = useAuth()
  const { handleLogout, isPending: isLoggingOut } = useLogout()

  const { data: profileUser } = useQuery({
    queryKey: ['user', username],
    queryFn: () => profileApi.getUser(username),
    retry: false,
  })

  const { data: tracks = [], isLoading: isTracksLoading } = useQuery<Track[]>({
    queryKey: ['tracks', username],
    queryFn: () => trackApi.getUserTracks(username),
    retry: false,
  })

  return (
    <MainLayout>
      <main className="main">
        <ProfileImageLayers username={username} />

        {/* Left column — username, bio, avatar */}
        <div className="background">
          <div className="column column-left">
            <div className="wrapper-flex">
              <div className="flex-top-1">
                <div className="wrapper-info">
                  <p className="wheat_text">@{username}</p>
                  <p className="wheat_text" style={{ color: 'grey', fontSize: '12px' }}>
                    {profileUser?.bio ?? ''}
                  </p>
                </div>
              </div>
              <div className="flex-top-2" />
              <div className="flex-middle" />
              <div className="flex-bottom">
                <div className="image-box-front">
                  <img src="/images/border_2.png" className="image image-border" alt="" />
                  <div className="image image-mask" style={{ backgroundColor: 'var(--color-active)' }} />
                  <ImageWithFallback
                    src={profileApi.getAvatarUrl(username, 1)}
                    className="image"
                    style={{ filter: 'brightness(0.8)' }}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column — buttons + track history */}
        <div className="foreground">
          <div className="column column-right">
            <div className="wrapper-flex">
              <div className="flex-top-1" />
              <div className="flex-top-2">
                {hasHydrated && (
                  isAuthenticated && currentUser ? (
                    <div className="btn-group" style={{ textAlign: 'left' }}>
                      <Link className="button wheat_text_link" href="/profile-edit">
                        __edit
                      </Link>
                      <button
                        className="button wheat_text_link"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                      >
                        log_out
                      </button>
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
                <div className="fixed-height-container">
                  <div className="content liked-songs">
                    {isTracksLoading ? (
                      <p style={{ color: 'gray' }}>loading…</p>
                    ) : (
                      tracks.map((track) => (
                        <p key={track.id}>
                          {track.song_title} — {track.artist}
                          <br />
                          <span style={{ color: 'gray' }}>
                            {track.year} — {track.album_title}
                          </span>
                        </p>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}
