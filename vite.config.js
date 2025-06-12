import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: './',
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
  },
  server: {
    port: 3030,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
