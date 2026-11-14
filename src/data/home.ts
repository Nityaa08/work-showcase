// Home page content. Used by the page (src/pages/index.astro) and its markdown twin (src/pages/index.md.ts).
export const hero = {
  hi: 'Hi, I’m Nitya, an AI engineer.',
  headline: 'I build AI agents that hold up in production.',
  sub: 'I build the systems companies run AI agents on: the MCP connectors they use, the evals that tell me they work, and the guardrails that keep people safe. I like the quiet part of the job, where I prove something works before anyone has to trust it.',
};
export const how = {
  title: 'One laptop, a team of agents, and me in the loop.',
  text: 'I don’t hand-write code. I direct AI coding agents, and I prove every change before it ships. Subagents research, challenge and review in parallel, while I set the bar, read every line and own what goes out.',
  /** One sentence about working close to the people who use the work (only facts from the career kit). */
  people: 'I like working close to the people who use what I build: real questions from Sales and Business Development shaped how I tested, and finance’s own rules shaped the agents I built for them.',
  steps: ['Plan', 'Delegate', 'Prove', 'Own'],
  tools: 'Tools I work with: Claude Code and Claude Design every day, plus Cursor, DeepSeek and Grok. Personal agents in Slack run my pull-request workflow. My side projects, an LLM gateway and a multi-agent research API, are on my GitHub.',
};
export const contact = {
  email: 'nityashreesundararajan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nityashree-s-b34b1b291',
  github: 'https://github.com/Nityaa08',
  resume: '/Nityashree_S_Resume.pdf',
};
/*
 * My path: four stops on a hand-drawn trail (src/components/Trail.astro), oldest first. Each stop shows its `title`
 * and its `line` under a small drawing. No dates. `when` is the stop's number, used by the markdown twin.
 */
export const path = [
  { when: '01', title: 'Studied', line: 'Computer science, with a focus on AI and data science, at SASTRA University.' },
  { when: '02', title: 'Payments data', line: 'I looked after the payments data an AI assistant answered from, and learnt how much an answer depends on its data.' },
  { when: '03', title: 'Testing AI', line: 'I tested that assistant before launch and caught its wrong answers. That’s when AI engineering clicked for me.' },
  { when: '04', title: 'Shipping agents', line: 'Then I moved to building and securing AI agents that people rely on at work: the platform, the tools and the guardrails.' },
];
/** The label that marks the switch from work to the personal part of the page. */
export const offClock = 'Off the clock';
// Work cards on home: an outcome headline in my voice; the topic and one line underneath.
export const cards: Record<string, { headline: string; text: string }> = {
  'agent-platform': { headline: 'An agent went offline. I found the one file that did it.', text: 'The engine, studio and gateways behind company-wide AI agents, and how I kept them running.' },
  'mcp-connections': { headline: 'Agents that see only what you’re allowed to see.', text: 'Connectors that let agents use real apps with each person’s own access, never a shared key.' },
  security: { headline: 'I attacked our agents before anyone else could.', text: 'Every layer closed by default, and every fix proven by replaying the attack.' },
};
/** One-line summary per case, for markdown and llms.txt. */
export const blurbs: Record<string, string> = Object.fromEntries(Object.entries(cards).map(([k, v]) => [k, `${v.headline} ${v.text}`]));
export const outsideIntro = {
  title: 'When I’m not working',
  text: 'Away from the screen: books, classical dance, yoga, a stage and a mic. Everything on my desk comes with a note.',
  hint: 'Tap anything on my desk.',
};
/*
 * "When I'm not working": the things on my desk (src/components/Desk.astro).
 * Each item is one object in the drawing. Edit `note` (what I say) freely: one or two short sentences, in my voice.
 * `id` ties the item to its drawing, so leave it as it is. Keep every line true, and no numbers.
 * Keep the wording timeless: no "used to", "in school" or "nowadays". No questions to the reader.
 *
 * Spots to add more later:
 *  - My dance forms: the `note` of the item with id 'ghungroo' (for example "…two Indian classical forms, … and …").
 *  - My favourite books: the `note` of the item with id 'books' (for example add "Current favourite: …").
 */
export type DeskItem = { id: string; name: string; label: string; note: string; href?: string; link?: string };
export const desk: DeskItem[] = [
  { id: 'books', name: 'Books', label: 'My stack of books', note: 'Any book adaptation out there? I’ve probably read the book first.', href: '/corner/#shelf', link: 'See my shelf' },
  // The books and the laptop lead to My corner (its shelf, and its top): `href` and `link` add a link under the note.
  // The laptop's note is replaced by cornerCopy().laptop (src/data/corner.ts), which mentions notes only once one is published.
  { id: 'laptop', name: 'Laptop', label: 'My laptop', note: 'Where the things I make on my own live: side projects to try, short notes, and the books on my shelf.', href: '/corner/', link: 'Open my corner' },
  { id: 'ghungroo', name: 'Ghungroo', label: 'My ghungroo, the ankle bells of Indian classical dance', note: 'Dance came first, before almost anything else I learnt. Not one but two Indian classical forms, all the way to competition stages.' },
  { id: 'mat', name: 'Yoga mat', label: 'My yoga mat', note: 'Yoga began as a daily ritual and grew into competitions. It taught me that stillness takes practice.' },
  { id: 'mug', name: 'Mug', label: 'My mug', note: 'Not every object needs a story. This one just keeps the desk company.' },
  { id: 'globe', name: 'Globe', label: 'A small globe', note: 'Work took me from India to Mexico. Working with people from all over the world was the most fun kind of learning.' },
  { id: 'events', name: 'Run-sheet', label: 'An event run-sheet on a clipboard', note: 'Clipboard in hand, I ran fun and management events for students in college. The best way to bond, and we had a blast.' },
  { id: 'mic', name: 'Mic', label: 'A stage mic under a spotlight', note: 'Now and then the mic found me: I emceed a few events on my college club’s main stage, and it was a lot of fun.' },
] as const;
export const contactLine = 'An idea, a question about agents, or simply hello: I’d love to hear from you.';
/*
 * Contact: a hand-drawn envelope addressed to me. Clicking it (or the address on it) opens the
 * visitor's own email app with the subject and body below; nothing is sent anywhere. A small icon
 * beside the address copies it. Without JavaScript the address is a plain email link.
 */
export const letter = {
  hint: 'Click the envelope to write to me.',
  hintTouch: 'Tap the envelope to write to me.',
  fallback: 'Nothing opened? The icon beside my address copies it.',
  subject: 'Hello, Nitya',
  body: 'Hi Nitya,\n\n\n\nThanks,\n',
} as const;
/** A ready-to-use mailto link: subject and body URL-encoded. */
export const mailto = (subject: string, body: string) => `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
