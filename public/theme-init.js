// Apply the chosen theme before rendering to avoid a light/dark flash.
try {
  const savedTheme = localStorage.getItem('dse-theme')
  document.documentElement.dataset.theme = savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
} catch {
  document.documentElement.dataset.theme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}
