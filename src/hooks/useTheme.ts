import { useEffect, useState } from 'react'
type Theme = 'light' | 'dark'
function initialTheme(): Theme {
  try { const saved = localStorage.getItem('dse-theme'); if (saved === 'light' || saved === 'dark') return saved } catch { /* Storage may be disabled. */ }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('dse-theme', theme) } catch { /* Theme still works for this visit. */ }
  }, [theme])
  return { theme, toggleTheme: () => setTheme((current) => current === 'dark' ? 'light' : 'dark') }
}
