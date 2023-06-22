import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/unit-converter/',

  build: {
    rollupOptions: {
      input: {
        main: `${import.meta.url}/index.html`,
        nested: `${import.meta.url}/docs/index.html`,
      }
    }
  },
})
