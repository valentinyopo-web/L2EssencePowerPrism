import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    // Proxy API calls to Express during local development
    proxy: {
      '/api': {
        target: 'http://localhost:10000/api/',
        changeOrigin: true,
      },
    },
  },
});
