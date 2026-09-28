import { useEffect, useRef, useState } from 'react'
import { Logo } from '../common/Logo'
import { Icon } from '../common/Icon'
import { useContact } from '../../context/ContactContext'
const links = [{ label: 'Collection', href: '#collection' }, { label: 'Your drive', href: '#your-drive' }, { label: 'Visit us', href: '#visit' }]
export function Header({ theme, onToggleTheme }: { theme: 'light' | 'dark'; onToggleTheme: () => void }) {
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
    const sections = new IntersectionObserver((entries) => { for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`) }, { rootMargin: '-20% 0px -50% 0px' })
    const register = () => document.querySelectorAll('main section[id], footer[id]').forEach((section) => sections.observe(section))
    register()
    const mutations = new MutationObserver(register)
    const main = document.getElementById('main-content')
    if (main) mutations.observe(main, { childList: true })
    return () => { observer.disconnect(); sections.disconnect(); mutations.disconnect() }
  }, [])
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`} onKeyDown={(event) => { if (event.key === 'Escape' && open) { setOpen(false); trigger.current?.focus() } }}>
    <a className="brand" href="#home" aria-label="Double S.E Autos home" onClick={() => setOpen(false)}><Logo /></a>
    <nav className={`navigation ${open ? 'is-open' : ''}`} id="main-navigation" aria-label="Main navigation">{links.map((link) => <a key={link.href} href={link.href} aria-current={active === link.href ? 'location' : undefined} onClick={() => setOpen(false)}>{link.label}</a>)}<button className="mobile-contact" onClick={() => { setOpen(false); contact() }}>Start a conversation <Icon name="diagonal" /></button></nav>
    <div className="header-actions"><button className="icon-button theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button><button className="header-contact" onClick={() => contact()}>Let’s talk <Icon name="diagonal" /></button><button ref={trigger} className="icon-button menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button></div>
  </header>
}
