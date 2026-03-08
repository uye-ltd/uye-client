import { apiClient } from '@/shared/api/client'
import type { Track } from '@/entities/track'

export const trackApi = {
  saveCurrentTrack: (channelNumber: number) =>
    apiClient.get<string>(`/api/background-save/${channelNumber}`),

  getUserTracks: (username: string) =>
    apiClient.get<Track[]>(`/api/users/${username}/tracks`),

  deleteTrack: (trackId: number) =>
    apiClient.delete<void>(`/api/tracks/${trackId}`),
}
