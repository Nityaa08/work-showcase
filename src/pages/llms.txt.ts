import type { APIRoute } from 'astro';
import { llmsTxt, mdResponse } from '../lib/markdown';
import { getNotes } from '../lib/notes';

export const GET: APIRoute = async ({ site }) => mdResponse(llmsTxt(site, await getNotes()), 'text/plain');
