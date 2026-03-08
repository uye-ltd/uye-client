import { apiClient } from '@/shared/api/client'
import type { NowPlaying } from '@/entities/channel'

export const nowPlayingApi = {
  get: (channelNumber: number) =>
    apiClient.get<NowPlaying>(`/api/now-playing/${channelNumber}`),
}
