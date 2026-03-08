import { useQuery } from '@tanstack/react-query'
import { nowPlayingApi } from '../api/nowPlayingApi'
import type { NowPlaying } from '@/entities/channel'

const POLL_INTERVAL_MS = 10_000

export function useNowPlaying(channelNumber: number) {
  return useQuery<NowPlaying>({
    queryKey: ['now-playing', channelNumber],
    queryFn: () => nowPlayingApi.get(channelNumber),
    refetchInterval: POLL_INTERVAL_MS,
    retry: false,
  })
}
