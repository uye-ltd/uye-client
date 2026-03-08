'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CHANNELS, getRandomTags } from '@/shared/config'
import { useState, useEffect } from 'react'
import styles from './Sidebar.module.css'

export function Sidebar() {
  const pathname = usePathname()
  const [channelTags, setChannelTags] = useState<{ id: number; tags: string }[] | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  useEffect(() => {
    setChannelTags(CHANNELS.map((ch) => ({ id: ch.id, tags: getRandomTags(ch, 6) })))
  }, [])

  return (
    <div className={styles.sidebar}>
      {CHANNELS.map((ch) => {
        const isActive = pathname === `/channel/${ch.id}` || pathname === `/channel/${ch.id}/`
        const isHovered = hoveredId === ch.id
        const color = isActive || isHovered ? ch.color : undefined

        return (
          <Link
            key={ch.id}
            href={`/channel/${ch.id}`}
            className={styles.link}
            style={color ? { color } : undefined}
            onMouseEnter={() => setHoveredId(ch.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            CHANNEL {ch.id}
            <span className={styles.tags}>
              {channelTags ? `(${channelTags.find((t) => t.id === ch.id)?.tags ?? ''})` : ''}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
