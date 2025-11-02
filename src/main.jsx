import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Import debug utilities for development
if (import.meta.env.DEV) {
  import('./utils/debug.js').then(() => {
    console.log('🔧 Debug utilities loaded. Type window.debugApi.diagnostics() to run diagnostics.');
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
