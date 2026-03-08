import type { Metadata } from 'next'
import { Providers } from './providers'
import '@/shared/styles/globals.css'

export const metadata: Metadata = {
  title: 'UYEBAR RADIO',
  description: 'Online radio with music from uyebar residents',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
