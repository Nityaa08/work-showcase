// The command menu (src/components/CommandMenu.astro): opens with Cmd+K / Ctrl+K, "/" or the button in the nav.
// Labels are what a visitor reads and types to filter; `keys` are extra words that also match.
import { cases } from './cases';
import { contact, mailto, letter } from './home';
import { corner, cornerCopy } from './corner';

export type MenuItem = {
  id: string; group: string; label: string; hint: string; keys: string;
  href: string; newTab?: boolean; download?: boolean;
};

export const menuCopy = {
  title: 'Quick menu',
  placeholder: 'Jump to…',
  empty: 'Nothing matches. Try “case”, “resume” or “email”.',
  trigger: 'Open quick menu',
  footer: { move: 'move', open: 'open', close: 'close' },
};

/** The menu's entries. "Read my notes" is only there once a note is published (see src/lib/notes.ts). */
export const getMenuItems = (hasNotes: boolean): MenuItem[] => [
  ...cases.filter((c) => c.ready).map((c) => ({
    id: `case-${c.slug}`, group: 'Case studies', label: c.title, hint: `Case ${c.no}`,
    keys: `case study work ${c.slug.replace(/-/g, ' ')}`, href: `/work/${c.slug}/`,
  })),
  { id: 'corner', group: 'More', label: corner.name, hint: cornerCopy(hasNotes).menuHint, keys: 'corner projects demos side invoice smart router meridian fee fraud books shelf reading personal', href: '/corner/' },
  ...(hasNotes ? [{ id: 'notes', group: 'More', label: 'Read my notes', hint: 'Short write-ups', keys: 'notes blog writing posts articles', href: '/notes/' }] : []),
  { id: 'resume', group: 'Get in touch', label: 'Download resume', hint: 'PDF', keys: 'cv resume pdf', href: contact.resume, download: true },
  { id: 'email', group: 'Get in touch', label: 'Email me', hint: 'Opens your email app', keys: `mail contact write hello ${contact.email}`, href: mailto(letter.subject, letter.body) },
  { id: 'github', group: 'Get in touch', label: 'GitHub', hint: 'Opens in a new tab', keys: 'code repos source', href: contact.github, newTab: true },
  { id: 'linkedin', group: 'Get in touch', label: 'LinkedIn', hint: 'Opens in a new tab', keys: 'profile connect', href: contact.linkedin, newTab: true },
];
