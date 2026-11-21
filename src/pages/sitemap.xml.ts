// /sitemap.xml: every page a search engine should find. Home, My corner, the case studies that are ready, the notes
// list and each published note (no drafts, no external notes). No dates: the site shows none, so neither does this.
import type { APIRoute } from 'astro';
import { cases } from '../data/cases';
import { getNotes, isExternal } from '../lib/notes';

export const GET: APIRoute = async ({ site }) => {
  const notes = (await getNotes()).filter((n) => !isExternal(n));
  const paths = ['/', '/corner/', ...cases.filter((c) => c.ready).map((c) => `/work/${c.slug}/`), ...(notes.length ? ['/notes/'] : []), ...notes.map((n) => `/notes/${n.id}/`)];
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
