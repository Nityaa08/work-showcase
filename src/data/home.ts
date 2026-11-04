// Home page content. Used by the page (src/pages/index.astro) and its markdown twin (src/pages/index.md.ts).
export const hero = {
  hi: 'Hi, I’m Nitya.',
  headline: 'I build AI agents that hold up in production.',
  sub: 'Most of my days go into AI agents: the connectors they use, the evals that tell me they work, and the guardrails that keep people safe. I like the quiet part of the job, where you prove something works before anyone has to trust it.',
};
export const how = {
  title: 'One laptop, a team of agents, and me in the loop.',
  text: 'I don’t hand-write code. I direct AI coding agents, and I prove every change before it ships. Subagents research, challenge and review in parallel, while I set the bar, read every line and own what goes out.',
  steps: ['Plan', 'Delegate', 'Prove', 'Own'],
  tools: 'Tools I work with: Claude Code, Claude Design, Cursor, DeepSeek and Grok, plus personal agents in Slack that run my pull-request workflow.',
};
export const contact = {
  email: 'nitya08shree@gmail.com',
  linkedin: 'https://www.linkedin.com/in/nityashree-s-b34b1b291',
  github: 'https://github.com/Nityaa08',
  resume: '/Nityashree_S_Resume.pdf',
};
export const path = [
  { when: '01', title: 'Studied', line: 'I studied computer science, with a focus on AI and data science, at SASTRA University.' },
  { when: '02', title: 'Payments data', line: 'I looked after the payments data an AI assistant answered from, and learned how much an answer depends on its data.' },
  { when: '03', title: 'Testing AI', line: 'I tested that assistant before launch and caught its wrong answers. That’s when AI engineering clicked for me.' },
  { when: '04', title: 'Shipping agents', line: 'Then I moved to building and securing AI agents that people relied on at work: the platform, the tools and the guardrails.' },
];
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
  hintSub: 'Each thing opens a little note from me.',
};
/*
 * "When I'm not working": the things on my desk (src/components/Desk.astro).
 * Each item is one object in the drawing. Edit `note` (what I say) and `ask` (the "Ask me…" prompt) freely.
 * `id` ties the item to its drawing, so leave it as it is. Keep every line true, and no numbers.
 * Keep the wording timeless: no "used to", "in school" or "nowadays".
 *
 * Spots to add more later:
 *  - My dance forms: the `note` of the item with id 'ghungroo'. For example, change
 *    "not one but two Indian classical forms" to "not one but two Indian classical forms, … and …".
 *  - My favourite books: the `note` of the item with id 'books'. Add a line after
 *    "…and I have opinions." such as "Current favourite: …", and you can make its `ask` "Ask me why I loved …".
 */
export const desk = [
  { id: 'books', name: 'Books', label: 'My stack of books', note: 'Books over movies, always. If it’s been adapted, I’ve read it first, and I have opinions.', ask: 'Ask me: the book or the movie?' },
  { id: 'ghungroo', name: 'Ghungroo', label: 'My ghungroo, the ankle bells of Indian classical dance', note: 'Dance is the first thing I ever picked up, and I went all in: not one but two Indian classical forms, all the way to competition stages.', ask: 'Ask me which is harder: classical dance or debugging.' },
  { id: 'mat', name: 'Yoga mat', label: 'My yoga mat', note: 'Yoga started as a daily routine and turned into competitions. Best reset button I know.', ask: 'Ask me which pose is harder than it looks.' },
  { id: 'mug', name: 'Mug', label: 'My mug', note: 'Every good desk needs a mug. This one’s for you: pull up a chair.', ask: 'Ask me anything, really.' },
  { id: 'globe', name: 'Globe', label: 'A small globe', note: 'Work took me from India to Mexico. People from all over the world at one table? Count me in, every time.', ask: 'Ask me what I learnt working across borders.' },
  { id: 'events', name: 'Run-sheet', label: 'An event run-sheet on a clipboard', note: 'Clipboard, run-sheet, a hall full of students: the fun and management events I ran in college. Best bonding there is.', ask: 'Ask me what makes an event actually fun.' },
  { id: 'mic', name: 'The mic', label: 'A stage mic under a spotlight', note: 'Hand me a mic and I’m home: my college club’s main stage, and every event I ran.', ask: 'Ask me how to fill an awkward pause on stage.' },
] as const;
export const contactLine = 'Whether it’s a role, an idea or a question about agents, I’d love to hear from you.';
/*
 * Contact: a hand-drawn envelope. Nothing is sent anywhere: "Write to me" opens the
 * visitor's own email app with the topic below as the subject. Without JavaScript every
 * topic and the button are plain mailto links.
 */
export const letter = {
  write: 'Write to me',
  caption: 'Opens your email app.',
  topicsLabel: 'What’s it about?',
  topics: [
    { label: 'Say hello', subject: 'Hello!', body: 'Hi Nitya,\n\n\n\nCheers,\n' },
    { label: 'Talk about AI agents', subject: 'Let’s talk about AI agents', body: 'Hi Nitya,\n\nI’d love to hear what you think about:\n\n\nThanks,\n' },
    { label: 'Build something together', subject: 'Let’s build something together', body: 'Hi Nitya,\n\nI have an idea I’d love to build with you:\n\n\nThanks,\n' },
  ],
} as const;
/** A ready-to-use mailto link: subject and body URL-encoded. */
export const mailto = (subject: string, body: string) => `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
