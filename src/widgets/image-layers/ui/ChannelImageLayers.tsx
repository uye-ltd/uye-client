import { env } from '@/shared/config'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'

interface ChannelImageLayersProps {
  channelId: number
  color: string
}

export function ChannelImageLayers({ channelId, color }: ChannelImageLayersProps) {
  const cover = (layer: 1 | 2 | 3) => `${env.apiUrl}/covers/cover-${channelId}-${layer}.jpg`

  const maskStyle: React.CSSProperties = {
    backgroundColor: color,
    mixBlendMode: 'multiply',
    pointerEvents: 'none',
    userSelect: 'none',
  }

  return (
    <>
      {/* Deep background — brightness 0.15 */}
      <div className="under-underground">
        <div style={{ filter: 'brightness(0.15)' }}>
          <div className="image-box-under-underground">
            <div className="image image-mask-under-underground" style={maskStyle} />
            <ImageWithFallback src={cover(3)} className="image image-under-underground" alt="" id="cover3" style={{ filter: 'grayscale(1)' }} />
          </div>
        </div>
      </div>

      {/* Mid background — brightness 0.6 */}
      <div className="underground">
        <div style={{ filter: 'brightness(0.6)' }}>
          <div className="image-box-underground">
            <div className="image image-border-underground" style={{ backgroundColor: 'transparent', border: '3px solid var(--color-active)' }} />
            <div className="image image-mask-underground" style={maskStyle} />
            <ImageWithFallback src={cover(2)} className="image image-underground" alt="" id="cover2" style={{ filter: 'grayscale(1)' }} />
          </div>
        </div>
      </div>
    </>
  )
}
