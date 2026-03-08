'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { MainLayout } from '@/widgets/layout'
import { ProfileImageLayers } from '@/widgets/image-layers'
import { useAuth } from '@/features/auth'
import { profileApi } from '@/features/profile'
import { trackApi } from '@/features/track-library'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'
import type { Track } from '@/entities/track'

interface EditFormValues {
  bio: string
  number: string
}

export default function ProfileEditPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user, hasHydrated } = useAuth()
  const username = user?.username ?? ''

  useEffect(() => {
    if (hasHydrated && !user) router.replace('/sign-in')
  }, [hasHydrated, user, router])

  const { data: tracks = [], isLoading: isTracksLoading } = useQuery<Track[]>({
    queryKey: ['tracks', username],
    queryFn: () => trackApi.getUserTracks(username),
    enabled: !!username,
  })

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<EditFormValues>({
    defaultValues: { bio: user?.bio ?? '', number: '0' },
  })

  const fileRef = useRef<HTMLInputElement>(null)
  const [toDelete, setToDelete] = useState<Set<number>>(new Set())
  const [submitError, setSubmitError] = useState<string | null>(null)

  const toggleDelete = (trackId: number) => {
    setToDelete((prev) => {
      const next = new Set(prev)
      next.has(trackId) ? next.delete(trackId) : next.add(trackId)
      return next
    })
  }

  const onSubmit = async (values: EditFormValues) => {
    setSubmitError(null)
    try {
      await profileApi.updateProfile({
        bio: values.bio,
        avatarNumber: Number(values.number),
        avatarFile: fileRef.current?.files?.[0],
        trackIdsToDelete: [...toDelete],
      })
      await queryClient.invalidateQueries({ queryKey: ['tracks', username] })
      router.push(`/user/${username}`)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to save profile')
    }
  }

  if (!hasHydrated || !user) return null

  return (
    <MainLayout>
      <main className="main">
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <ProfileImageLayers username={username} />

          {/* Left column — bio + avatar */}
          <div className="background">
            <div className="column column-left">
              <div className="wrapper-flex">
                <div className="flex-top-1" style={{ zIndex: 100 }}>
                  <div className="wrapper-info" style={{ userSelect: 'auto', position: 'relative', zIndex: 100 }}>
                    <p className="wheat_text">@{username} bio:</p>
                    <p>
                      <textarea
                        maxLength={140}
                        rows={6}
                        cols={26}
                        className="wheat_text text-input"
                        {...register('bio')}
                      />
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

          {/* Right column — controls + track list with delete */}
          <div className="foreground">
            <div className="column column-right">
              <div className="wrapper-flex">
                <div className="flex-top-1" />
                <div className="flex-top-2">
                  <div className="btn-group" style={{ textAlign: 'left', verticalAlign: 'baseline' }}>
                    <input
                      className="button wheat_text_link"
                      type="number"
                      min={0}
                      max={228}
                      style={{ width: '6vw', minWidth: 100 }}
                      {...register('number')}
                    />
                    <button
                      type="button"
                      className="button wheat_text_link"
                      style={{ width: '7vw', minWidth: 100 }}
                      onClick={() => fileRef.current?.click()}
                    >
                      file
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif"
                      style={{ display: 'none' }}
                    />
                    <button
                      type="submit"
                      className="button wheat_text_link"
                      style={{ width: '8vw', minWidth: 120 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'saving…' : 'apply'}
                    </button>
                    <Link
                      className="button wheat_text_link"
                      href={`/user/${username}`}
                      style={{ width: '8vw', minWidth: 120 }}
                    >
                      cancel
                    </Link>
                  </div>
                </div>
                <div className="flex-middle" />
                <div className="flex-bottom">
                  <div className="fixed-height-container">
                    <div className="content liked-songs">
                      {submitError && (
                        <p style={{ color: 'red', fontSize: '0.85rem' }}>{submitError}</p>
                      )}
                      {isTracksLoading ? (
                        <p style={{ color: 'gray' }}>loading…</p>
                      ) : tracks.map((track) => (
                        <label key={track.id} className="checkbox-group">
                          <div className="liked-songs-wrapper">
                            <div className="left-container">
                              <div>
                                {track.song_title} — {track.artist}
                              </div>
                              <div style={{ color: 'gray' }}>
                                {track.year} — {track.album_title}
                              </div>
                            </div>
                            <div className="right-container">
                              <div
                                className="checkmark"
                                style={{ opacity: toDelete.has(track.id) ? 1 : 0.4 }}
                                onClick={() => toggleDelete(track.id)}
                              >
                                del
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </MainLayout>
  )
}
