import type { APIRoute } from 'astro';
import { homeMd, mdResponse } from '../lib/markdown';

export const GET: APIRoute = ({ site }) => mdResponse(homeMd(site));
