import { defineConfig } from 'astro/config';

// Link previews (Open Graph), canonical links and the markdown twins need absolute URLs. The production domain is
// fixed here, so every build (local, preview or production) writes the same, correct URLs.
export default defineConfig({
  site: 'https://nityashree.vercel.app',
  // Minify CSS for browsers back to Safari 14 / Chrome 100 / Firefox 100, so the hand-written fallbacks in
  // global.css (vh before svh, px before cqw, longhands before inset) are kept instead of being merged away.
  vite: { build: { cssTarget: ['safari14', 'ios14', 'chrome100', 'edge100', 'firefox100'] } },
});
