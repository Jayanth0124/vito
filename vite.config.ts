import { defineConfig } from 'vite';

export default defineConfig({
  // Ensures proper building for multi-page apps
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        shop: 'shop.html',
        contact: 'contact.html'
      }
    }
  }
});