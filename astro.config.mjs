import { defineConfig } from 'astro/config';

// On Vercel, link previews (Open Graph) need absolute URLs. Vercel provides the production
// domain at build time; locally the site falls back to localhost.
const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export default defineConfig({
  site: prod ? `https://${prod}` : 'http://localhost:4321',
});
