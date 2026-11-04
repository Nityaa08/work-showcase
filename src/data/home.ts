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
  text: 'Away from the screen I’m usually reading, dancing or on a yoga mat. I love bringing people together, and some of my favourite work has been with people far from home.',
  hint: 'Tap anything on my desk.',
  hintSub: 'Each thing opens a little note from me.',
};
/*
 * "When I'm not working": the things on my desk (src/components/Desk.astro).
 * Each item is one object in the drawing. Edit `note` (what I say) and `ask` (the "Ask me…" prompt) freely.
 * `id` ties the item to its drawing, so leave it as it is. Keep every line true, and no numbers.
 *
 * Spots to add more later:
 *  - My dance forms: the `note` of the item with id 'ghungroo'. For example, change
 *    "I’ve trained in Indian classical dance since school." to name the forms there.
 *  - My favourite books: the `note` of the item with id 'books'. Add a line after
 *    "…a book on the go." such as "Lately it’s …", and you can make its `ask` "Ask me why I loved …".
 */
export const desk = [
  { id: 'books', name: 'Books', label: 'My stack of books', note: 'I read a lot, and there’s nearly always a book on the go.', ask: 'Ask me what I’m reading.' },
  { id: 'ghungroo', name: 'Ghungroo', label: 'My ghungroo, the ankle bells of Indian classical dance', note: 'Hear that jingle? These are ghungroo, the ankle bells of Indian classical dance. I’ve trained in Indian classical dance since school.', ask: 'Ask me which is harder: classical dance or debugging.' },
  { id: 'mat', name: 'Yoga mat', label: 'My rolled-up yoga mat', note: 'Yoga is how I slow down and come back to focus. It’s the one reset button I never have to debug.', ask: 'Ask me how I reset after a long day.' },
  { id: 'mug', name: 'Mug', label: 'My mug', note: 'Every good desk needs a mug. Pull up a chair and let’s talk.', ask: 'Ask me anything, really.' },
  { id: 'globe', name: 'Globe', label: 'A small globe', note: 'I enjoy working with people across India and Latin America. Different time zones, one team.', ask: 'Ask me about working across time zones.' },
  { id: 'mic', name: 'The mic', label: 'A stage mic under a spotlight', note: 'Backstage or in the spotlight, I’ve done both. I organised big, fun college events with student clubs and emceed on the main stage.', ask: 'Ask me about running an event for a packed auditorium.' },
] as const;
export const contactLine = 'Whether it’s a role, an idea or a question about agents, I’d love to hear from you.';
export const contactOpen = 'Open to AI engineer and forward-deployed engineer roles.';
/*
 * Contact: a small chat window. Nothing here is a bot and nothing is sent anywhere:
 * each reply chip opens the visitor's own email app with the subject and body below.
 * Without JavaScript the chips are plain mailto links.
 */
export const chat = {
  hello: 'Hey! What brings you here?',
  caption: 'This opens your email app. No bots here.',
  chips: [
    { label: 'Hiring for an AI role', reply: 'Lovely! Opening your email with that subject…', subject: 'Hiring for an AI role', body: 'Hi Nitya,\n\nI’m hiring for an AI role and would love to talk.\n\nRole:\nTeam / company:\nLink to the job:\n\nThanks,\n' },
    { label: 'Want to build something together', reply: 'Ooh, tell me more! Opening your email with that subject…', subject: 'Let’s build something together', body: 'Hi Nitya,\n\nI have an idea I’d love to build with you:\n\n\nThanks,\n' },
    { label: 'Just saying hi', reply: 'Hi back! Opening your email with that subject…', subject: 'Just saying hi', body: 'Hi Nitya,\n\n\n\nCheers,\n' },
  ],
} as const;
/** A ready-to-use mailto link: subject and body URL-encoded. */
export const mailto = (subject: string, body: string) => `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
