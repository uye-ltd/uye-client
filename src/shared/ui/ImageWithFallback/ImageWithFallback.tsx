'use client'

import { useState } from 'react'
import { getRandomAvatarUrl } from '@/shared/lib/avatar'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

export function ImageWithFallback({ src, alt, ...props }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  const handleError = () => {
    const fallback = getRandomAvatarUrl()
    setImgSrc(fallback)
  }

  return <img {...props} src={imgSrc} alt={alt} onError={handleError} />
}
