import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { cp, access } from 'node:fs/promises';

/**
 * Vite bundles assets it finds in src/href on tags it processes, but it does not
 * follow <a href="...pdf">. The certificate PDFs are linked that way, so copy
 * them into the build verbatim — otherwise they 404 on the built site.
 */
function copyStaticDirs(dirs) {
  return {
    name: 'megaduct-copy-static',
    apply: 'build',
    async closeBundle() {
      for (const dir of dirs) {
        const from = resolve(import.meta.dirname, dir);
        try {
          await access(from);
        } catch {
          this.warn(`skipped missing directory: ${dir}`);
          continue;
        }
        await cp(from, resolve(import.meta.dirname, 'dist', dir), { recursive: true });
      }
    },
  };
}

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

  plugins: [copyStaticDirs(['assets/cert'])],

  server: {
    port: 5173,
    // Fail loudly if 5173 is taken instead of silently drifting to 5174 —
    // a moved port is the usual reason the page "stops connecting".
    strictPort: true,
    host: 'localhost',
    open: '/index.html',
    watch: {
      // Watching build output makes `npm run build` trigger a reload storm
      // that can wedge the dev server. Ignore anything not a source file.
      ignored: [
        '**/dist/**',
        '**/.git/**',
        '**/node_modules/**',
        '**/scripts/**',
        '**/*.log',
      ],
    },
    hmr: {
      // Pin the HMR socket to the same origin so the browser cannot end up
      // trying to reconnect to a stale port after a restart.
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      overlay: true,
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      // Every page needs listing, or only index.html gets built.
      // Two sites live here: MEGADUCT at the root, LINKK under linkk/.
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        products: resolve(import.meta.dirname, 'products.html'),
        research: resolve(import.meta.dirname, 'research.html'),
        support: resolve(import.meta.dirname, 'support.html'),
        projects: resolve(import.meta.dirname, 'projects.html'),
        media: resolve(import.meta.dirname, 'media.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),

        linkkIndex: resolve(import.meta.dirname, 'linkk/index.html'),
        linkkAbout: resolve(import.meta.dirname, 'linkk/about.html'),
        linkkProducts: resolve(import.meta.dirname, 'linkk/products.html'),
        linkkResearch: resolve(import.meta.dirname, 'linkk/research.html'),
        linkkSupport: resolve(import.meta.dirname, 'linkk/support.html'),
        linkkProjects: resolve(import.meta.dirname, 'linkk/projects.html'),
        linkkMedia: resolve(import.meta.dirname, 'linkk/media.html'),
        linkkContact: resolve(import.meta.dirname, 'linkk/contact.html'),
      },
    },
  },
});
