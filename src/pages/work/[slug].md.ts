import type { APIRoute } from 'astro';
import { cases } from '../../data/cases';
import { caseMd, mdResponse } from '../../lib/markdown';

export function getStaticPaths() {
  return cases.filter((c) => c.ready).map((c) => ({ params: { slug: c.slug } }));
}

export const GET: APIRoute = ({ params, site }) => mdResponse(caseMd(site, params.slug!));
