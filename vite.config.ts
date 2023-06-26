import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/unit-converter/',
  root: 'src',

  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./src/index.html', import.meta.url)),
        docs: fileURLToPath(new URL('./src/docs/index.html', import.meta.url)),
        credits: fileURLToPath(new URL('./src/credits/index.html', import.meta.url))
      }
    },
    outDir: '../dist',
    target: 'es2022'
  },

  assetsInclude: [
    '/node_modules/bootstrap/dist/js/bootstrap.bundle.js'
  ],

})
