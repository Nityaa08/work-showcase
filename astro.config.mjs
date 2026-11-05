import { defineConfig } from 'astro/config';

// On Vercel, link previews (Open Graph) need absolute URLs. Vercel provides the production
// domain at build time; locally the site falls back to localhost.
const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export default defineConfig({
  site: prod ? `https://${prod}` : 'http://localhost:4321',
  // Minify CSS for browsers back to Safari 14 / Chrome 100 / Firefox 100, so the hand-written fallbacks in
  // global.css (vh before svh, px before cqw, longhands before inset) are kept instead of being merged away.
  vite: { build: { cssTarget: ['safari14', 'ios14', 'chrome100', 'edge100', 'firefox100'] } },
});
