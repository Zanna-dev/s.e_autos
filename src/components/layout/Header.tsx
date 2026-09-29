import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Logo } from '../common/Logo'
import { Icon } from '../common/Icon'
import { useContact } from '../../context/ContactContext'
const links = [{ label: 'Collection', href: '/inventory' }, { label: 'Your drive', href: '/#your-drive' }, { label: 'Visit us', href: '#visit' }]
export function Header({ theme, onToggleTheme }: { theme: 'light' | 'dark'; onToggleTheme: () => void }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const trigger = useRef<HTMLButtonElement>(null)
  const contact = useContact()
  useEffect(() => {
    const marker = document.getElementById('header-marker')
    if (!marker) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    observer.observe(marker)
    let frame = 0
    const update = () => {
      const threshold = Math.min(window.innerHeight * .35, 240)
      const footer = document.getElementById('visit')
      const atBottom = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      let next = ''
      if (footer && (footer.getBoundingClientRect().top <= threshold || atBottom)) next = '#visit'
      else if (location.pathname === '/') {
        for (const id of ['collection', 'your-drive']) {
          const rect = document.getElementById(id)?.getBoundingClientRect()
          if (rect && rect.top <= threshold && rect.bottom > threshold) next = `#${id}`
        }
      } else if (location.pathname === '/inventory' || location.pathname.startsWith('/vehicles/')) next = '#collection'
      setActive(next)
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const mutations = new MutationObserver(schedule)
    mutations.observe(document.getElementById('main-content') ?? document.body, { childList: true, subtree: true })
    schedule()
    return () => { observer.disconnect(); mutations.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule) }
  }, [location.pathname])

  return <header className={`site-header ${scrolled || location.pathname !== '/' ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`} onKeyDown={(event) => { if (event.key === 'Escape' && open) { setOpen(false); trigger.current?.focus() } }}>
    <Link className="brand" to="/" aria-label="Double S.E Autos home" onClick={() => setOpen(false)}><Logo /></Link>
    <nav className={`navigation ${open ? 'is-open' : ''}`} id="main-navigation" aria-label="Main navigation">{links.map((link) => <Link key={link.href} to={link.href} aria-current={active === (link.href === '/inventory' ? '#collection' : link.href.replace('/', '')) ? 'location' : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}<button className="mobile-contact" onClick={() => { setOpen(false); contact() }}>Start a conversation <Icon name="diagonal" /></button></nav>
    <div className="header-actions"><button className="icon-button theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button><button className="header-contact" onClick={() => contact()}>Let’s talk <Icon name="diagonal" /></button><button ref={trigger} className="icon-button menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button></div>
  </header>
}
