import { env } from '@/shared/config'
import type { User } from '@/entities/user'

export interface ProfileEditPayload {
  bio: string
  avatarNumber?: number
  avatarFile?: File
  trackIdsToDelete?: number[]
}

export const profileApi = {
  getUser: async (username: string): Promise<User> => {
    const res = await fetch(`${env.apiUrl}/api/users/${username}`, {
      credentials: 'include',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  },

  updateProfile: async (payload: ProfileEditPayload): Promise<User> => {
    const form = new FormData()
    form.append('bio', payload.bio)
    if (payload.avatarNumber !== undefined) {
      form.append('number', String(payload.avatarNumber))
    }
    if (payload.avatarFile) {
      form.append('file', payload.avatarFile)
    }
    if (payload.trackIdsToDelete) {
      payload.trackIdsToDelete.forEach((id) => form.append('delete_tracks', String(id)))
    }

    const res = await fetch(`${env.apiUrl}/api/profile`, {
      method: 'POST',
      credentials: 'include',
      body: form,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  },

  getAvatarUrl: (username: string, layer: 1 | 2 | 3) =>
    `${env.apiUrl}/uploads/${username}/${layer}`,

  getCoverUrl: (channelId: number, layer: 1 | 2 | 3) =>
    `${env.apiUrl}/covers/cover-${channelId}-${layer}.jpg`,
}
