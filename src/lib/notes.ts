// The published notes, in list order: by `order` (lowest first), then A to Z by title. No dates anywhere.
// Drafts (`draft: true` in a note's frontmatter) are left out everywhere: every page, list, menu and markdown file
// gets its notes from here, so with no published note the Field notes section, /notes/ and the menu entry don't exist.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;
export const noteHref = (n: Note) => n.data.externalUrl ?? `/notes/${n.id}/`;
export const isExternal = (n: Note) => Boolean(n.data.externalUrl);

// No note files at all (drafts are kept out of this public repo): skip the collection, which would only warn it is empty.
const hasFiles = Object.keys(import.meta.glob('../content/notes/*.md')).length > 0;

export async function getNotes(): Promise<Note[]> {
  if (!hasFiles) return [];
  const all = await getCollection('notes', (n) => !n.data.draft);
  return all.sort((a, b) => (a.data.order ?? Infinity) - (b.data.order ?? Infinity) || a.data.title.localeCompare(b.data.title));
}
