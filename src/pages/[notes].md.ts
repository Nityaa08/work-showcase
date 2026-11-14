// /notes.md, the markdown twin of /notes/. A dynamic route only so that it is not built at all while no note is
// published (every note is `draft: true`); then it returns the one path, "notes".
import type { APIRoute } from 'astro';
import { notesMd, mdResponse } from '../lib/markdown';
import { getNotes } from '../lib/notes';

export async function getStaticPaths() {
  return (await getNotes()).length ? [{ params: { notes: 'notes' } }] : [];
}

export const GET: APIRoute = async ({ site }) => mdResponse(notesMd(site, await getNotes()));
