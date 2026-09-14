import { defineConfig } from 'vite';
import { resolve } from 'node:path';

/**
 * MEGADUCT — Vite config.
 *
 * The site is plain multi-page HTML. Vite serves the files in this directory
 * as-is during `npm run dev` (with live reload); `npm run build` emits an
 * optimised copy into dist/.
 */
export default defineConfig({
  // Relative asset URLs so the build works from a subdirectory
  // (e.g. a GitHub Pages project site) as well as from a domain root.
  base: './',

  server: {
    port: 5173,
    open: '/index.html',
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Every page needs listing, or only index.html gets built.
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        products: resolve(import.meta.dirname, 'products.html'),
        projects: resolve(import.meta.dirname, 'projects.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
      },
    },
  },
});
