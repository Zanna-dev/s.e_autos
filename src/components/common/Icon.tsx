type IconName = 'arrow' | 'diagonal' | 'sun' | 'moon' | 'close' | 'menu' | 'search' | 'plus' | 'check' | 'chevron' | 'spark' | 'pin'
const paths: Record<IconName, string> = {
  arrow: 'M4 12h16m-6-6 6 6-6 6', diagonal: 'M6 18 18 6M6 6h12v12', sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  moon: 'M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z', close: 'm6 6 12 12M6 18 18 6', menu: 'M4 8h16M4 16h16', search: 'm16 16 5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0', plus: 'M12 4v16M4 12h16', check: 'm5 12 4 4L19 6', chevron: 'm9 5 7 7-7 7', spark: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z', pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0',
}
export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg className={`icon ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>
}
