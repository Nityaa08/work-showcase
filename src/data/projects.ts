// "Try my side projects" on home (src/pages/index.astro), its markdown twin and llms.txt (src/lib/markdown.ts).
// One plain line per project, in my voice: what it does, no numbers, no dates. `live` is the hosted demo, `code` the repo.
export type Project = { id: string; name: string; line: string; live: string; code: string };

export const projectsIntro = {
  title: 'Try my side projects',
  text: 'Small things I built on my own, each live and open source.',
  /** Honest about what the demos run on. */
  note: 'The demos run on sample data or simulated model answers, so no sign-up or API key is needed.',
};

export const projects: Project[] = [
  {
    id: 'smart-router', name: 'Smart Router',
    line: 'An OpenAI-compatible LLM gateway that sends each prompt to a model tier by rules and estimates what it costs.',
    live: 'https://smart-router-nityashree.vercel.app', code: 'https://github.com/Nityaa08/smart-router',
  },
  {
    id: 'meridian', name: 'Meridian',
    line: 'A multi-agent research API: it splits a question, searches each part, ranks the evidence and streams a cited report.',
    live: 'https://meridian-nityashree.vercel.app', code: 'https://github.com/Nityaa08/meridian',
  },
  {
    id: 'cross-border-fee-api', name: 'Cross-Border Fee API',
    line: 'The all-in price of a cross-border payment into Latin America, with every fee and the rule behind it on its own line.',
    live: 'https://cross-border-fee-api.vercel.app', code: 'https://github.com/Nityaa08/cross-border-fee-api',
  },
  {
    id: 'fraud-pattern-explorer', name: 'Fraud Pattern Explorer',
    line: 'A risk dashboard where every chart is also a filter, to get from a suspicious spike to the transactions behind it.',
    live: 'https://fraud-pattern-explorer.vercel.app', code: 'https://github.com/Nityaa08/fraud-pattern-explorer',
  },
];
