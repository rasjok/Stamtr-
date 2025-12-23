import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // For Netlify/Vercel, use './'
  // For GitHub Pages, use '/your-repo-name/'
  base: './',
  
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  
  plugins: [react()],
  
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
