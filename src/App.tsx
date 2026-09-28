import { useState } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home/Home'
import { ContactDialog } from './components/contact/ContactDialog'
import { ContactContext } from './context/ContactContext'
import { useTheme } from './hooks/useTheme'
export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [enquiry, setEnquiry] = useState<string | null>(null)
  return <ContactContext value={(interest = '') => setEnquiry(interest)}><div id="home"><a className="skip-link" href="#main-content">Skip to content</a><div id="header-marker" aria-hidden="true" /><Header theme={theme} onToggleTheme={toggleTheme} /><Home /><Footer />{enquiry !== null && <ContactDialog interest={enquiry} onClose={() => setEnquiry(null)} />}</div></ContactContext>
}
