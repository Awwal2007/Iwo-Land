import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ssr } from 'vite-plugin-ssr-ssg';

export default defineConfig({
  plugins: [react(), tailwindcss(), ssr({ prerender: true,})],
  optimizeDeps: {
    include: ["swiper"], // 👈 force pre-bundling Swiper
  },
})
