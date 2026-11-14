import type { APIRoute } from 'astro';
import { noteMd, mdResponse } from '../../lib/markdown';
import { getNotes, type Note } from '../../lib/notes';

export async function getStaticPaths() {
  return (await getNotes()).filter((n) => !n.data.externalUrl).map((n) => ({ params: { slug: n.id }, props: { n } }));
}

export const GET: APIRoute = ({ props, site }) => mdResponse(noteMd(site, (props as { n: Note }).n));
