import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // Сайт публикуется по адресу https://zmrx.github.io/pdf-price-to-website/
  // — без этого все ассеты будут запрашиваться с корня домена и давать 404.
  base: '/pdf-price-to-website/',
  plugins: [vue()],
})
