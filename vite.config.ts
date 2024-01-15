import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {ViteEjsPlugin} from 'vite-plugin-ejs'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  return ({
    plugins: [
      react(),
      ViteEjsPlugin(config => ({
        env: config.env
      }))
    ],
    
    base: '/unit-converter/',
    root: (command === "serve") ? "./src" : "./",
  
    build: {
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('./src/index.html', import.meta.url)),
          docs: fileURLToPath(new URL('./src/docs/index.html', import.meta.url)),
          credits: fileURLToPath(new URL('./src/credits/index.html', import.meta.url))
        }
      },
      outDir: 'dist',
      target: 'es2022'
    },
  
    envDir: '.',
  
  })
})