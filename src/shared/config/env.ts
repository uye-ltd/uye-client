export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8092',
  icecastUrl: process.env.NEXT_PUBLIC_ICECAST_URL ?? 'http://localhost:8090',
} as const
