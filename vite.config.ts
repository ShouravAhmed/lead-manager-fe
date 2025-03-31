import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const base = command === 'serve' ? '/' : '/portfolio-ai/'
  
  return {
    plugins: [react()],
    base,
    build: {
      assetsInlineLimit: 0, // Disable inlining assets
    }
  }
})
