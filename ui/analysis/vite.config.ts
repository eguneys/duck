import { defineConfig } from 'vite'


export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'analysis.[ext]'
      }
    },
    outDir: '../../public/compiled',
    lib: {
      entry: 'src/index.ts',
      formats: ['es']
    }
  }
})