import { useState } from 'react'
import type { VehicleImage } from '../../interfaces/vehicle'
export function VehiclePhoto({ image, priority = false, className = '' }: { image: VehicleImage; priority?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false)
  return failed ? <div className={`photo-fallback ${className}`} role="img" aria-label={image.alt}>Image unavailable<span>Ask our team for more photographs.</span></div> :
    <img className={className} src={image.src} srcSet={`${image.small} 720w, ${image.src} 1536w`} sizes={priority ? '100vw' : '(max-width: 700px) 100vw, 50vw'} width="1536" height="1024" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} alt={image.alt} onError={() => setFailed(true)} />
}
