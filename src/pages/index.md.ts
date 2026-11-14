import type { APIRoute } from 'astro';
import { homeMd, mdResponse } from '../lib/markdown';
import { getNotes } from '../lib/notes';

export const GET: APIRoute = async ({ site }) => mdResponse(homeMd(site, await getNotes()));
