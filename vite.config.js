import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~bootstrap': path.resolve('node_modules/bootstrap/scss/bootstrap'),
      '@scss': '/src/scss',
      '@layouts': '/src/views/layouts',
    }
  }
})
