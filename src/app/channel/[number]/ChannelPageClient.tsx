'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { MainLayout } from '@/widgets/layout'
import { ChannelImageLayers } from '@/widgets/image-layers'
import { useAuth, useLogout } from '@/features/auth'
import { useAudioPlayer } from '@/features/audio-player'
import { useNowPlaying } from '@/features/now-playing'
import { trackApi } from '@/features/track-library'
import { CHANNELS, getRandomTags, env } from '@/shared/config'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'

export function ChannelPageClient() {
  const { number } = useParams<{ number: string }>()
  const channelNumber = Number(number)

  const { isAuthenticated, user, hasHydrated } = useAuth()
  const { handleLogout, isPending: isLoggingOut } = useLogout()
  const channel = CHANNELS.find((c) => c.id === channelNumber)
  const streamUrl = channel ? `${env.icecastUrl}${channel.streamPath}` : ''

  const { audioRef, isPlaying, toggle } = useAudioPlayer({ streamUrl })
  const { data: nowPlaying } = useNowPlaying(channelNumber)

  const [tags, setTags] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setTags(channel ? getRandomTags(channel, 8) : '')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelNumber])

  const handleSave = async () => {
    if (!isAuthenticated || isSaving) return
    setIsSaving(true)
    try {
      await trackApi.saveCurrentTrack(channelNumber)
    } catch {
      // silently ignore — track already saved or no track playing
    } finally {
      setIsSaving(false)
    }
  }

  const nowPlayingText = nowPlaying
    ? `${nowPlaying.song_title} — ${nowPlaying.artist}`
    : ''

  return (
    <MainLayout>
      <main className="main" id={String(channelNumber)}>
        <ChannelImageLayers channelId={channelNumber} color={channel?.color ?? '#dc2626'} />

        {/* Left column — tags + cover art */}
        <div className="background">
          <div className="column column-left">
            <div className="wrapper-flex">
              <div className="flex-top-1">
                <div className="wrapper-info">
                  <div style={{ width: '80%', float: 'left' }}>
                    <span className="wheat_text" style={{ color: 'grey', fontSize: '0.75rem' }}>
                      {tags}
                    </span>
                  </div>
                  <div style={{ width: '20%', float: 'right' }}>
                    <p className="wheat_text" style={{ fontSize: '4.5rem', color: channel?.color ?? 'red' }}>
                      {channelNumber}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-top-2" />
              <div className="flex-middle" />
              <div className="flex-bottom">
                <div style={{ position: 'relative' }}>
                  <img src="/images/border_2.png" className="image image-border" alt="" />
                  <div
                    className="image image-mask"
                    style={{ backgroundColor: channel?.color ?? '#dc2626', mixBlendMode: 'multiply', pointerEvents: 'none' }}
                  />
                  <ImageWithFallback
                    src={`${env.apiUrl}/covers/cover-${channelNumber}-1.jpg`}
                    className="image"
                    style={{ filter: 'grayscale(1) brightness(0.9)' }}
                    alt=""
                    id="cover1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column — controls + now playing */}
        <div className="foreground">
          <div className="column column-right">
            <div className="wrapper-flex">
              <div className="flex-top-1" />
              <div className="flex-top-2">
                <div className="btn-group" style={{ textAlign: 'left' }}>
                  <button className="button wheat_text_link" onClick={toggle}>
                    {isPlaying ? 'stop' : 'play'}
                  </button>
                  {hasHydrated && (
                    isAuthenticated && user ? (
                      <>
                        <button
                          className="button-no-hover wheat_text_link"
                          onClick={handleSave}
                          disabled={isSaving}
                        >
                          {isSaving ? 'saving…' : 'save'}
                        </button>
                        <Link className="button wheat_text_link" href={`/user/${user.username}`}>
                          profile
                        </Link>
                        <button
                          className="button wheat_text_link"
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                        >
                          log_out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link className="button wheat_text_link" href="/sign-up">
                          sign_up
                        </Link>
                        <Link className="button wheat_text_link" href="/sign-in">
                          sign_in
                        </Link>
                      </>
                    )
                  )}
                  <div style={{ width: 105 }} />
                </div>
              </div>
              <div className="flex-middle" />
              <div className="flex-bottom-1" />
              <div className="flex-bottom-2">
                <p className="wheat_text" id="song_title">
                  {nowPlayingText}
                </p>
                <audio ref={audioRef} preload="auto" muted hidden id="my-audio">
                  <source src={streamUrl} type="audio/mpeg" />
                </audio>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  )
}
