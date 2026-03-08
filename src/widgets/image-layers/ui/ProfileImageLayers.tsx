import { env } from '@/shared/config'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback'

interface ProfileImageLayersProps {
  username: string
}

export function ProfileImageLayers({ username }: ProfileImageLayersProps) {
  const avatar = (layer: 1 | 2 | 3) => `${env.apiUrl}/uploads/${username}/${layer}`

  return (
    <>
      {/* Deep background — brightness 0.15 */}
      <div className="under-underground">
        <div style={{ filter: 'brightness(0.15)' }}>
          <div className="image-box-under-underground">
            <div className="image image-mask-under-underground" style={{ backgroundColor: 'var(--color-active)' }} />
            <ImageWithFallback src={avatar(3)} className="image image-under-underground" alt="" />
          </div>
        </div>
      </div>

      {/* Mid background — brightness 0.6 */}
      <div className="underground">
        <div style={{ filter: 'brightness(0.6)' }}>
          <div className="image-box-underground">
            <div className="image image-border-underground" style={{ backgroundColor: 'transparent', border: '3px solid var(--color-active)' }} />
            <div className="image image-mask-underground" style={{ backgroundColor: 'var(--color-active)' }} />
            <ImageWithFallback src={avatar(2)} className="image image-underground" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
