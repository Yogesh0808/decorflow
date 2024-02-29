import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000, // Adjust this value as needed
    rollupOptions: {
      external: ['parallax-js']
    }
  }
});
