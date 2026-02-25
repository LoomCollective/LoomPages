import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'assets/built',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.js'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
    assetsInlineLimit: 0,
    sourcemap: false,
  },
  server: {
    port: 3000,
    origin: 'http://localhost:3000',
  },
  plugins: [],
});
