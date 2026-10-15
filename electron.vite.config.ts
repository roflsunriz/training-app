import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    build: { externalizeDeps: true },
  },
  preload: {
    build: { externalizeDeps: true },
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer'),
        '@types': resolve('src/types'),
      },
    },
    plugins: [tailwindcss(), react()],
  },
})
