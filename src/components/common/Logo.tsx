import { useId } from 'react'
export function Logo() {
  const id = useId().replace(/:/g, '')
  return <span className="brand-lockup">
    <svg className="brand-symbol" viewBox="350 200 1075 320" role="img" aria-label="DSE monogram">
      <defs><filter id={`${id}-invert`}><feColorMatrix type="matrix" values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0" /></filter>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="350" y="200" width="1075" height="320" style={{ maskType: 'luminance' }}><image href="/images/logo.webp" width="1774" height="887" filter={`url(#${id}-invert)`} /></mask></defs>
      <rect x="350" y="200" width="1075" height="320" fill="currentColor" mask={`url(#${id}-mask)`} />
    </svg>
    <span className="brand-wordmark">DOUBLE S.E<span>A U T O S</span></span>
  </span>
}
