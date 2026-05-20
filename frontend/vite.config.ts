/**
 * vite.config.ts — Frontend Geliştirme Sunucusu Yapılandırması
 *
 * ÇALIŞTIRMA: npm run dev   →  http://localhost:5173 adresinde açılır
 *
 * PROXY:
 *   Tarayıcıdan gelen /api/* istekleri backend'e (localhost:5000) yönlendirilir.
 *   Bu sayede frontend ve backend ayrı portlarda çalışsa da CORS sorunu olmaz.
 *   Örnek: fetch('/api/topics') → aslında http://localhost:5000/api/topics'e gider
 *
 * ÖNEMLİ NOT:
 *   BACKEND_HOST ortam değişkeni tanımlıysa o adres kullanılır,
 *   tanımlı değilse varsayılan olarak localhost:5000 kullanılır.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      // /api ile başlayan tüm istekleri backend'e ilet
      '/api': {
        target: process.env.BACKEND_HOST || 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
