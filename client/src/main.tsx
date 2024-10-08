import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LoadingProvider } from './contexts/loading.tsx'
import { ThemeProvider } from './contexts/theme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ThemeProvider>
        <App />
        </ThemeProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>,
)
