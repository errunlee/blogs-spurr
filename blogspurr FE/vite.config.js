import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@tinymce/tinymce-react'],
      // Add other rollup options if needed
    },
  },
  optimizeDeps: {
    include: ['@tinymce/tinymce-react'],
  },
  server: {
    host: '0.0.0.0', // Allows access from any network interface
    port: 5173,      // Explicitly set the port
  },
})
