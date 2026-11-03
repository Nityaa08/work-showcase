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
};
// Each card has a small animated illustration (src/components/OutsideArt.astro), keyed by `art`.
export const outside = [
  { t: 'Reading', d: 'I read a lot, and there’s nearly always a book on the go.', art: 'read' },
  { t: 'Classical dance', d: 'I’ve trained in Indian classical dance since school.', art: 'dance' },
  { t: 'Yoga', d: 'It’s how I slow down and come back to focus.', art: 'yoga' },
  { t: 'Events and the stage', d: 'I organised big, fun events with college clubs, and emceed on the main stage.', art: 'stage' },
  { t: 'Working across borders', d: 'I enjoy working with people across India and Latin America.', art: 'globe' },
] as const;
export const contactLine = 'Whether it’s a role, an idea or a question about agents, I’d love to hear from you.';
export const contactOpen = 'Open to AI engineer and forward-deployed engineer roles.';
