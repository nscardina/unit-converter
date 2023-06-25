import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/unit-converter/',

  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        docs: fileURLToPath(new URL('./docs/index.html', import.meta.url)),
        credits: fileURLToPath(new URL('./credits/index.html', import.meta.url))
      }
    },

    target: 'es2022'
  },

  assetsInclude: [
    '/node_modules/bootstrap/dist/js/bootstrap.bundle.js'
  ],

})
