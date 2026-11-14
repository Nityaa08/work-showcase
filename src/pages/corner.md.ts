import type { APIRoute } from 'astro';
import { cornerMd, mdResponse } from '../lib/markdown';
import { getNotes } from '../lib/notes';

export const GET: APIRoute = async ({ site }) => mdResponse(cornerMd(site, await getNotes()));
