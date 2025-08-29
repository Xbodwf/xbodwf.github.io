import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import legacy from '@vitejs/plugin-legacy'
//import htmlPostBuildPlugin from './no-attr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    /*legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    htmlPostBuildPlugin()*/
  ],
  base: '/',
  build: {
    outDir: 'dist',
  }
})
