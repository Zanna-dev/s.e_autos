import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { Inventory } from './pages/Inventory'
import { VehicleDetail } from './components/vehicle/VehicleDetail'
import { ConversationCTA } from './components/layout/ConversationCTA'
import { useEffect, useState } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home/Home'
import { ContactDialog } from './components/contact/ContactDialog'
import { ContactContext } from './context/ContactContext'
import { useTheme } from './hooks/useTheme'
export default function App() { return <BrowserRouter><Application /></BrowserRouter> }
function RouteEffects() {
 const { pathname, hash } = useLocation()
 useEffect(() => {
   if (!pathname.startsWith('/vehicles/')) document.title = pathname === '/inventory' ? 'Vehicle Inventory | Double S.E Autos' : pathname === '/' ? 'Double S.E Autos | Your next chapter' : 'Vehicle Collection | Double S.E Autos'
   if (!pathname.startsWith('/vehicles/')) document.querySelector('meta[name="description"]')?.setAttribute('content', pathname === '/inventory' ? 'Explore Nigerian-used, foreign-used and new vehicle concepts. Search and compare the Double S.E Autos demo collection in Abuja.' : 'Quality vehicles. Trusted dealer. Explore Double S.E Autos in Asokoro, Abuja.')
   if (hash) {
     const find = () => { const target = document.getElementById(hash.slice(1)); if (target) { target.scrollIntoView(); return true } return false }
     if (find()) return
     const observer = new MutationObserver(() => { if (find()) observer.disconnect() })
     observer.observe(document.body, { childList: true, subtree: true })
     return () => observer.disconnect()
   }
   window.scrollTo({ top: 0, behavior: 'instant' })
   document.getElementById('main-content')?.focus({ preventScroll: true })
 }, [pathname, hash])
 return null
}
function Application() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [enquiry, setEnquiry] = useState<string | null>(null)
  return <ContactContext value={(interest = '') => setEnquiry(interest)}><div id="home"><a className="skip-link" href="#main-content">Skip to content</a><div id="header-marker" aria-hidden="true" /><Header theme={theme} onToggleTheme={toggleTheme} /><RouteEffects /><div className="route-transition" key={location.pathname}><Routes><Route path="/" element={<Home />} /><Route path="/inventory" element={<Inventory />} /><Route path="/vehicles/:vehicleId" element={<VehicleDetail />} /><Route path="*" element={<main id="main-content" tabIndex={-1} className="route-page section-shell"><h1>A different road.</h1><p>This page does not exist.</p><Link className="button primary" to="/inventory">Explore the collection</Link></main>} /></Routes></div><ConversationCTA /><Footer />{enquiry !== null && <ContactDialog interest={enquiry} onClose={() => setEnquiry(null)} />}</div></ContactContext>
}
