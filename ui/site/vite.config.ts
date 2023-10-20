import { defineConfig } from 'vite'


export default defineConfig({
  build: {
    outDir: '../../public/compiled',
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'duckchess24'
    }
  }
})