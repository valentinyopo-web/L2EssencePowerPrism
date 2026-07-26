import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    // Proxy API calls to Express during local development
    proxy: {
      '/api': {
        target: 'http://l2essencepowerprism-api:3001',
        changeOrigin: true,
      },
    },
  },
});
