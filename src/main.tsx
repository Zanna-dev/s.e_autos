import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

if (window.location.pathname === '/' && (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined)?.type === 'reload') {
  history.scrollRestoration = 'manual'
  history.replaceState(history.state, '', window.location.pathname + window.location.search)
  window.scrollTo({ top: 0, behavior: 'instant' })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
