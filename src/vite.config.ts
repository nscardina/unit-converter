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
    root: (command === "serve") ? "./" : "../",
  
    build: {
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
          docs: fileURLToPath(new URL('./docs/index.html', import.meta.url)),
          credits: fileURLToPath(new URL('./credits/index.html', import.meta.url))
        }
      },
      outDir: '../dist/unit-converter/',
      target: 'es2022'
    },
  
    envDir: '.',
  
  })
})