import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// {
//   src: path.resolve(__dirname, './src')
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  }
})
