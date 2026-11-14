// My corner (src/pages/corner.astro): the personal page with my side projects, my notes (once published) and my bookshelf.
// The projects live in ./projects.ts and the notes in src/content/notes/ (one .md file each).

export const corner = {
  /** The page's name: in the command menu, the home link row and the desk's laptop note. */
  name: 'My corner',
  /** The workbench: the side projects as small technical cards. Projects themselves live in ./projects.ts. */
  bench: { kicker: 'Workbench', title: 'Things I’ve built' },
  /** Field notes only show once at least one note is published (not `draft: true`). */
  notes: { kicker: 'Field notes', title: 'Notes from the field', text: 'Short write-ups of things that broke, and what I changed.', all: 'All notes' },
  shelf: { kicker: 'Shelf', title: 'On my shelf', text: 'The books from my desk, with a note on each.', hint: 'Tap a book on my shelf.' },
};

/**
 * The words that depend on whether any note is published yet. Until one is, nothing mentions writing or notes:
 * the title, intro, jump links, home link row, the desk laptop's note, the menu and the markdown all leave them out.
 */
export function cornerCopy(hasNotes: boolean) {
  return hasNotes
    ? {
        title: 'Things I build, write and read.',
        intro: 'What I make on my own: small tools I built to learn, short notes on what I’ve learnt, and the books on my shelf.',
        homeRow: { label: 'More I build, write and read', hint: 'Side projects, notes and my bookshelf' },
        laptop: 'Where the things I make on my own live: side projects to try, short notes, and the books on my shelf.',
        menuHint: 'Side projects, notes, books',
        summary: 'side projects to try, my notes and the books on my shelf',
      }
    : {
        title: 'Things I build and read.',
        intro: 'What I make on my own: small tools I built to learn, and the books on my shelf.',
        homeRow: { label: 'More I build and read', hint: 'Side projects and my bookshelf' },
        laptop: 'Where the things I make on my own live: side projects to try, and the books on my shelf.',
        menuHint: 'Side projects, books',
        summary: 'side projects to try and the books on my shelf',
      };
}

/*
 * On my shelf. Titles and authors only: no covers, cover art or logos.
 * `why`: one short line on why I liked it, in my voice. While it is '' the book's note card says `whySoon`.
 * Room for more: add a book here and the shelf draws it (Shelf.astro lays the row out from this list).
 * `series: true` names it as a series ("Harry Potter (the series)"); it is still drawn as one spine.
 */
export type Book = { id: string; title: string; author: string; why: string; series?: boolean };
/** Shown on a book's note card while its `why` is still ''. */
export const whySoon = 'Note coming soon.';

export const books: Book[] = [
  { id: 'itc', title: 'If Tomorrow Comes', author: 'Sidney Sheldon', why: '' },
  { id: 'hp', title: 'Harry Potter', author: 'J.K. Rowling', why: '', series: true },
  { id: 'dm', title: 'Dark Matter', author: 'Blake Crouch', why: '' },
  { id: 'sp', title: 'The Silent Patient', author: 'Alex Michaelides', why: '' },
];
