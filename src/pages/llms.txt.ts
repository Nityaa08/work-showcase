import type { APIRoute } from 'astro';
import { llmsTxt, mdResponse } from '../lib/markdown';

export const GET: APIRoute = ({ site }) => mdResponse(llmsTxt(site), 'text/plain');
