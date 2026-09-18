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
        linkkSandwich: resolve(import.meta.dirname, 'linkk/sandwich-busduct.html'),
        linkkNspb: resolve(import.meta.dirname, 'linkk/non-segregated-phase-product.html'),
        linkkPrivacy: resolve(import.meta.dirname, 'linkk/privacy-policy.html'),

        // The nineteen sandwich busduct component pages.
        linkkPartCombinationElbow: resolve(import.meta.dirname, 'linkk/part-combination-elbow.html'),
        linkkPartEdgewiseElbow: resolve(import.meta.dirname, 'linkk/part-edgewise-elbow.html'),
        linkkPartEdgewiseOffset: resolve(import.meta.dirname, 'linkk/part-edgewise-offset.html'),
        linkkPartEdgewiseTee: resolve(import.meta.dirname, 'linkk/part-edgewise-tee.html'),
        linkkPartEndCover: resolve(import.meta.dirname, 'linkk/part-end-cover.html'),
        linkkPartEndFeedBox: resolve(import.meta.dirname, 'linkk/part-end-feed-box.html'),
        linkkPartExpansionUnit: resolve(import.meta.dirname, 'linkk/part-expansion-unit.html'),
        linkkPartFeR1: resolve(import.meta.dirname, 'linkk/part-fe-r1.html'),
        linkkPartFeederWithHangerRodSupport: resolve(import.meta.dirname, 'linkk/part-feeder-with-hanger-rod-support.html'),
        linkkPartFeeder: resolve(import.meta.dirname, 'linkk/part-feeder.html'),
        linkkPartFixedSupport: resolve(import.meta.dirname, 'linkk/part-fixed-support.html'),
        linkkPartFlatwiseElbow: resolve(import.meta.dirname, 'linkk/part-flatwise-elbow.html'),
        linkkPartFlatwiseOffset: resolve(import.meta.dirname, 'linkk/part-flatwise-offset.html'),
        linkkPartFlatwiseTee: resolve(import.meta.dirname, 'linkk/part-flatwise-tee.html'),
        linkkPartPhaseTransportation: resolve(import.meta.dirname, 'linkk/part-phase-transportation.html'),
        linkkPartPlugInFeederAssembly: resolve(import.meta.dirname, 'linkk/part-plug-in-feeder-assembly.html'),
        linkkPartReducer: resolve(import.meta.dirname, 'linkk/part-reducer.html'),
        linkkPartTou: resolve(import.meta.dirname, 'linkk/part-tou.html'),
        linkkPartVshR1: resolve(import.meta.dirname, 'linkk/part-vsh-r1.html'),
      },
    },
  },
});
