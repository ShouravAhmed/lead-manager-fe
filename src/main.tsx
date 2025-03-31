import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import the favicon from assets directory
import favicon from './assets/portfolio-icon.svg'

// Set the favicon programmatically
const link = document.createElement('link')
link.rel = 'icon'
link.type = 'image/svg+xml'
link.href = favicon
document.head.appendChild(link)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
