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
    rollupOptions: {
      output: { 
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      },

    },
  },

})
