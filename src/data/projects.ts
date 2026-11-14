// "Things I've built" on my corner page (src/pages/corner.astro), its markdown twin and llms.txt (src/lib/markdown.ts).
// One plain line per project, in my voice: what it does, no numbers, no dates. `live` is the hosted demo, `code` the repo.
// `short` is the card line on My corner's workbench (one plain line); `line` is the fuller one for markdown and llms.txt.
export type Project = { id: string; name: string; line: string; short: string; live: string; code: string };

export const projectsIntro = {
  title: 'Things I’ve built',
  text: 'Small things I built on my own, each live and open source.',
  /** Honest about what the demos run on. */
  note: 'The demos run on sample data or simulated model answers, so no sign-up or API key is needed.',
};

export const projects: Project[] = [
  {
    id: 'invoice-agent', short: 'The model reads the invoice, tested code decides whether it can be paid, and anything doubtful waits for a person.', name: 'Invoice Agent',
    line: 'An invoice agent where the model reads the invoice and tested code decides whether it can be paid; anything doubtful waits for a person.',
    live: 'https://invoice-agent-nityashree.vercel.app', code: 'https://github.com/Nityaa08/invoice-agent',
  },
  {
    id: 'smart-router', short: 'An LLM gateway that sends each prompt to a model tier by rules, and estimates what it costs.', name: 'Smart Router',
    line: 'An OpenAI-compatible LLM gateway that sends each prompt to a model tier by rules and estimates what it costs.',
    live: 'https://smart-router-nityashree.vercel.app', code: 'https://github.com/Nityaa08/smart-router',
  },
  {
    id: 'meridian', short: 'A research API that splits a question, ranks the evidence and streams a cited report.', name: 'Meridian',
    line: 'A multi-agent research API: it splits a question, searches each part, ranks the evidence and streams a cited report.',
    live: 'https://meridian-nityashree.vercel.app', code: 'https://github.com/Nityaa08/meridian',
  },
  {
    id: 'cross-border-fee-api', short: 'The all-in price of a payment into Latin America, every fee on its own line.', name: 'Cross-Border Fee API',
    line: 'The all-in price of a cross-border payment into Latin America, with every fee and the rule behind it on its own line.',
    live: 'https://cross-border-fee-api.vercel.app/demo', code: 'https://github.com/Nityaa08/cross-border-fee-api',
  },
  {
    id: 'fraud-pattern-explorer', short: 'A risk dashboard where every chart is a filter, from a spike to the transactions behind it.', name: 'Fraud Pattern Explorer',
    line: 'A risk dashboard where every chart is also a filter, to get from a suspicious spike to the transactions behind it.',
    live: 'https://fraud-pattern-explorer.vercel.app', code: 'https://github.com/Nityaa08/fraud-pattern-explorer',
  },
];
