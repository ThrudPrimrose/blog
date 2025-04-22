import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    open: true,
    port: 3000,
  }
  // Remove the css/postcss section entirely
});