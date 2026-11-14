// Notes (the blog). One markdown file in src/content/notes/ is one note: the file name becomes its address
// (src/content/notes/one-colon.md is /notes/one-colon/). How to post, in plain words: HOW-TO-POST.md in the career kit.
// There is no date field on purpose: the site shows no dates.
// While a note is unpublished, keep `draft: true` (or keep the file out of this public repo): nothing about notes is
// built or mentioned anywhere until at least one note has no draft flag.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    /** One line under the title, on the card and at the top of the note. */
    summary: z.string(),
    /** 'work' notes read on the dark case-study page; 'personal' notes on the light one. */
    kind: z.enum(['work', 'personal']),
    /** Posted somewhere else (dev.to, Hashnode…)? Put its link here; the card opens it and no page is made here. */
    externalUrl: z.string().url().optional(),
    /** The small mono tag line on the card, like an engineer's notebook entry: 'INCIDENT · agent offline'.
        Work notes: INCIDENT, DECISION, ATTACK… Personal notes: softer ones, like READING or TIL. */
    tag: z.string().optional(),
    readMinutes: z.number().int().positive(),
    /** true keeps a note off the site entirely (no page, card, menu entry or markdown) until it is ready. */
    draft: z.boolean().default(false),
    /** Optional: where it sits in lists, lowest first. Notes without it come after, A to Z. */
    order: z.number().optional(),
    /** Optional: a case study it belongs to (agent-platform, mcp-connections or security). */
    case: z.string().optional(),
  }),
});

export const collections = { notes };
