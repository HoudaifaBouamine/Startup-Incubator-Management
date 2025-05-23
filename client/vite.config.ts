import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist' },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/',
})
