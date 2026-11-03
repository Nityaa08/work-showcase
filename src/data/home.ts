// Home page content. Used by the page (src/pages/index.astro) and its markdown twin (src/pages/index.md.ts).
export const hero = {
  hi: 'Hi, I’m Nitya.',
  headline: 'I build AI agents that hold up in production.',
  sub: 'I work on AI agents, the MCP connectors they use, the evals that check them and the security around them, from the first failing test to production.',
};
export const how = {
  title: 'One laptop, a team of agents, and me in the loop.',
  text: 'Subagents research, challenge and review in parallel. I set the bar, read every line, and own what ships.',
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
  { when: '01', title: 'Studied', line: 'Computer science (AI & Data Science) at SASTRA University.' },
  { when: '02', title: 'Payments data', line: 'Built the payments database an AI assistant answered from.' },
  { when: '03', title: 'Testing AI', line: 'Caught its wrong answers before launch. That’s how I found AI engineering.' },
  { when: '04', title: 'Shipping agents', line: 'Building and securing AI agents in production: platform, tools, guardrails.' },
];
export const blurbs: Record<string, string> = {
  'agent-platform': 'The engine, studio and gateways behind company-wide AI agents, and how I kept them running.',
  'mcp-connections': 'Connectors that let agents use real apps, with each person’s own access and no shared keys.',
  security: 'Every layer closed by default, and every fix proven by replaying the attack.',
};
export const outside = [
  { t: 'Reading', d: 'I read a lot.', icon: 'M4 5.5C6.5 4.5 9.5 4.5 12 6c2.5-1.5 5.5-1.5 8-.5V19c-2.5-1-5.5-1-8 .5-2.5-1.5-5.5-1.5-8-.5ZM12 6v13.5' },
  { t: 'Classical dance', d: 'Trained in Indian classical dance since school.', icon: 'M12 4.5a1.5 1.5 0 1 0 0 .01M12 7v6l-4 6M12 13l4 6M7 9.5l5-1 5-2' },
  { t: 'Yoga', d: 'Part of how I unwind and stay focused.', icon: 'M12 4.5a1.5 1.5 0 1 0 0 .01M12 7.5v5M5 10l7 2.5 7-2.5M8 19l4-6.5 4 6.5M6 19h12' },
  { t: 'Events and the stage', d: 'Organised big, fun events with college clubs, and emceed on the main stage.', icon: 'M9 10a3 3 0 1 1 6 0v2a3 3 0 1 1-6 0ZM12 15v4M8.5 19h7M6 11a6 6 0 0 0 12 0' },
  { t: 'Working across borders', d: 'Comfortable working with international clients and coworkers in Latin America.', icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z' },
];
