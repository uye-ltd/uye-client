import { ChannelPageClient } from './ChannelPageClient'

export function generateStaticParams() {
  return Array.from({ length: 9 }, (_, i) => ({ number: String(i + 1) }))
}

export default function ChannelPage() {
  return <ChannelPageClient />
}
