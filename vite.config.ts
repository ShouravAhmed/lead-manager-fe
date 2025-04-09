import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    base: '/',
    build: {
      assetsInlineLimit: 0, // Disable inlining assets
    }
  }
})
