import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // here we configure vite to proxy request to the Express backend. This way React app will make requests like /api/data, and Vite will proxy them to http://localhost:5000/api/data. 
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
