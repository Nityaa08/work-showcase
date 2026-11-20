// My corner (src/pages/corner.astro): my side projects and my notes on how I work. (The books live on the home desk.)
// The projects live in ./projects.ts and the notes in src/content/notes/ (one .md file each).

export const corner = {
  /** The page's name: in the command menu, the home link row and the desk's laptop note. */
  name: 'My corner',
  /** The workbench: the side projects as small technical cards. Projects themselves live in ./projects.ts. */
  bench: { kicker: 'Workbench', title: 'Things I’ve built' },
  /** Field notes only show once at least one note is published (not `draft: true`). */
  notes: { kicker: 'Field notes', title: 'Notes from the field', text: 'How I work, what broke, and what I changed.', all: 'All notes' },
  /** The one-line status strip under the Workbench heading (mono, like a terminal line). Facts, not boasts; no dates. */
  benchStatus: (count: number) => [`${count} live demos`, 'all open source', 'no sign-up'],
};



/**
 * The words that depend on whether any note is published yet. Until one is, nothing mentions writing or notes:
 * the title, intro, jump links, home link row, the desk laptop's note, the menu and the markdown all leave them out.
 */
export function cornerCopy(hasNotes: boolean) {
  return hasNotes
    ? {
        title: 'Things I build, and how I think about them.',
        intro: 'What I make on my own, and notes on how I work: what broke, what I changed, and what I’d tell the next person building agents.',
        homeRow: { sub: 'Side projects you can try, and notes on how I work.', cta: 'Open my corner' },
        laptop: 'Where the things I make on my own live: side projects to try, and notes on how I work.',
        menuHint: 'Side projects, notes',
        summary: 'side projects to try and my notes on how I work',
      }
    : {
        title: 'Things I build.',
        intro: 'What I make on my own: small tools I built to learn.',
        homeRow: { sub: 'Side projects you can try.', cta: 'Open my corner' },
        laptop: 'Where the things I make on my own live: side projects to try.',
        menuHint: 'Side projects',
        summary: 'side projects to try',
      };
}

/*
 * The books on the home desk's shelf, shown as spines in the Books note: titles and authors only, no covers, cover
 * art or logos, and no notes. Add a book here and the desk draws its spine.
 * `why` is kept for a later note but is not shown anywhere.
 * The spine shows the author's surname (`spineName`); the note card shows the full `author`.
 * `series: true` names it as a series ("Harry Potter (the series)"); it is still drawn as one spine.
 */
export type Book = { id: string; title: string; author: string; why: string; series?: boolean };
/** Shown on a book's note card while its `why` is still ''. */
export const whySoon = 'Note coming soon.';
/**
 * The name printed at the foot of a book's spine (in the Books note on the home desk): the author's surname,
 * set in small caps. Derived from `author`, so every book, including any added later, shows its author the same way.
 * The note card keeps the full name ("by Alex Michaelides").
 */
export const spineName = (author: string) => author.trim().split(/\s+/).pop()!.toUpperCase();

export const books: Book[] = [
  { id: 'itc', title: 'If Tomorrow Comes', author: 'Sidney Sheldon', why: '' },
  { id: 'hp', title: 'Harry Potter', author: 'J.K. Rowling', why: '', series: true },
  { id: 'dm', title: 'Dark Matter', author: 'Blake Crouch', why: '' },
  { id: 'sp', title: 'The Silent Patient', author: 'Alex Michaelides', why: '' },
  { id: 'gg', title: 'Gone Girl', author: 'Gillian Flynn', why: '' },
  { id: 'roa', title: 'Rage of Angels', author: 'Sidney Sheldon', why: '' },
];

export type Look = { w: number; h: number; fill: 'paper' | 'tint' | 'tint2' | 'ink' };
// Per-book look of each spine (the Books note on the home desk) in drawing units (1 unit = 1 CSS px at the drawing's natural size). Unknown books get a default.
// Every spine carries its title and, at the foot, the author's surname (`spineName`, derived from `author`). The
// heights are real-book proportions with room for both; the desk note scales these down, so
// the surname is never dropped.
export const looks: Record<string, Look> = {
  itc: { w: 36, h: 224, fill: 'paper' },
  hp: { w: 40, h: 206, fill: 'tint' },
  dm: { w: 34, h: 200, fill: 'ink' },
  sp: { w: 36, h: 240, fill: 'paper' },
  gg: { w: 33, h: 208, fill: 'tint2' },
  roa: { w: 36, h: 218, fill: 'paper' },
};
// Home's My corner card draws the same books at a small scale, with the same fills and surnames.
