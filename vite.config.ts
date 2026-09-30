import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue({ features: { optionsAPI: false } }),
    vueDevTools(),
    tailwindcss(),
    // `npm run analyze` → dist/stats.html
    analyzer({ enabled: mode === 'analyze', analyzerMode: 'static', openAnalyzer: false, defaultSizes: 'gzip' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@juggle/resize-observer': fileURLToPath(new URL('./src/shims/resize-observer.ts', import.meta.url)),
    },
  },
}))
