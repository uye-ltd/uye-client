'use client'

import { useRef, useState, useCallback } from 'react'

interface UseAudioPlayerOptions {
  streamUrl: string
}

export function useAudioPlayer({ streamUrl }: UseAudioPlayerOptions) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = false
    audio.play().then(() => setIsPlaying(true)).catch(() => {})
  }, [])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    isPlaying ? stop() : play()
  }, [isPlaying, play, stop])

  return { audioRef, isPlaying, toggle, streamUrl }
}
