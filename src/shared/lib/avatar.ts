const AVATAR_COUNT = 999

export function getRandomAvatarUrl(): string {
  const n = Math.floor(Math.random() * AVATAR_COUNT) + 1
  return `/images/avatars/${n}.jpg`
}
