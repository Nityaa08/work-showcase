// The command menu (src/components/CommandMenu.astro): opens with Cmd+K / Ctrl+K, "/" or the button in the nav.
// Labels are what a visitor reads and types to filter; `keys` are extra words that also match.
import { cases } from './cases';
import { contact, mailto, letter } from './home';

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

export const menuItems: MenuItem[] = [
  ...cases.filter((c) => c.ready).map((c) => ({
    id: `case-${c.slug}`, group: 'Case studies', label: c.title, hint: `Case ${c.no}`,
    keys: `case study work ${c.slug.replace(/-/g, ' ')}`, href: `/work/${c.slug}/`,
  })),
  { id: 'projects', group: 'On the home page', label: 'Try my side projects', hint: 'Live demos', keys: 'projects demos side smart router meridian fee fraud', href: '/#projects' },
  { id: 'resume', group: 'Get in touch', label: 'Download resume', hint: 'PDF', keys: 'cv resume pdf', href: contact.resume, download: true },
  { id: 'email', group: 'Get in touch', label: 'Email me', hint: 'Opens your email app', keys: `mail contact write hello ${contact.email}`, href: mailto(letter.subject, letter.body) },
  { id: 'github', group: 'Get in touch', label: 'GitHub', hint: 'Opens in a new tab', keys: 'code repos source', href: contact.github, newTab: true },
  { id: 'linkedin', group: 'Get in touch', label: 'LinkedIn', hint: 'Opens in a new tab', keys: 'profile connect', href: contact.linkedin, newTab: true },
];
