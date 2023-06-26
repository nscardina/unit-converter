import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {ViteEjsPlugin} from 'vite-plugin-ejs'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteEjsPlugin()
  ],
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

  envDir: '.',

  assetsInclude: [
    '/node_modules/bootstrap/dist/js/bootstrap.bundle.js'
  ],

})
