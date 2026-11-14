// Plain-markdown versions of every page, for AI agents and screening tools.
// Built from the same data the pages use (src/data/*), so the two never drift apart.
import { cases, stackOf, type Case, type Line } from '../data/cases';
import * as home from '../data/home';
import * as mcp from '../data/mcp';
import * as sec from '../data/security';
import { projects, projectsIntro } from '../data/projects';
import { corner, cornerCopy, books } from '../data/corner';
import type { Note } from './notes';

export const SITE_NAME = 'Nityashree S';
const abs = (site: URL | undefined, p: string) => (site ? new URL(p, site).href : p);
const bullets = (xs: string[]) => xs.map((x) => `- ${x}`).join('\n');
const numbered = (xs: string[]) => xs.map((x, i) => `${i + 1}. ${x}`).join('\n');
const code = (lines: Line[]) => '```\n' + lines.map((l) => (l.t === 'log' ? l.s.split('|').join('  ') : l.s)).join('\n') + '\n```';
const glance = (c: Case) => (c.glance ?? []).map(([k, v]) => `- **${k}:** ${v}`).join('\n');
const projectList = () => projects.map((p) => `- **${p.name}.** ${p.line} Try it: ${p.live} · Code: ${p.code}`).join('\n');
const lessons = (items: [string, string][], title = 'Lessons') => `## ${title}\n\n` + items.map(([h, p]) => `- **${h}.** ${p}`).join('\n');
// Same order as the case nav at the end of each page: no loop-around.
const caseFooter = (site: URL | undefined, c: Case) => {
  const ready = cases.filter((x) => x.ready);
  const i = ready.findIndex((x) => x.slug === c.slug);
  const prev = ready[i - 1], next = ready[i + 1];
  const links = [
    prev ? `- Previous: [${prev.title}](${abs(site, `/work/${prev.slug}.md`)})` : `- [All work](${abs(site, '/index.md')})`,
    next ? `- Next: [${next.title}](${abs(site, `/work/${next.slug}.md`)})` : `- [Back to home](${abs(site, '/index.md')})`,
  ];
  return `## More\n\n${links.join('\n')}`;
};

export function homeMd(site: URL | undefined, notes: Note[] = []) {
  const cc = cornerCopy(notes.length > 0);
  const work = cases.filter((c) => c.ready);
  return `# ${SITE_NAME}: AI engineer

${home.hero.hi} ${home.hero.headline}

${home.hero.sub}

Resume: ${abs(site, home.contact.resume)}

## Selected work

${work.map((c) => `### Case ${c.no}: ${home.cards[c.slug].headline}\n\n**${c.title}.** ${home.cards[c.slug].text}\n\n- Stack: ${stackOf(c).join(', ')}\n- Case study: ${abs(site, `/work/${c.slug}/`)} (markdown: ${abs(site, `/work/${c.slug}.md`)})`).join('\n\n')}

## How I work

${home.how.title} ${home.how.text}

${home.how.people}

${numbered(home.how.steps)}

${home.how.tools}

## My path

On the page this is a hand-drawn trail, a journey with four stops, oldest first: a mortarboard resting on an open book, a payment card in front of a small bar chart, a magnifying glass with a tick checking a chat bubble, and an agent network (a hub with an AI sparkle linked to three tools: a document, a terminal and a shield) with a paper plane landing beside it.

${home.path.map((p) => `${Number(p.when)}. **${p.title}.** ${p.line}`).join('\n')}

## ${home.outsideIntro.title}

*${home.offClock}.* ${home.outsideIntro.text}

${home.desk.filter((d) => d.id !== 'laptop').map((d) => `- **${d.name}.** ${d.note}${d.href ? ` ${d.link}: ${abs(site, d.href)}` : ''}`).join('\n')}

## ${corner.name}

${cc.homeRow.label}: ${cc.summary}. ${abs(site, '/corner/')} (markdown: ${abs(site, '/corner.md')})

## Contact

${home.contactLine}

- Email: ${home.contact.email}
- LinkedIn: ${home.contact.linkedin}
- GitHub: ${home.contact.github}
- Resume (PDF): ${abs(site, home.contact.resume)}
`;
}

const changed = (c: Case) => (c.changed ? `**What changed:** ${c.changed}\n\n` : '');

function platformMd(site: URL | undefined, c: Case) {
  return `# Case ${c.no}: ${c.title}

${changed(c)}${c.intro}

Stack: ${stackOf(c).join(', ')}

## At a glance

${glance(c)}

## How I fix a bug in production

${(c.steps ?? []).map((s, i) => `### ${i + 1}. ${s.state}: ${s.heading}\n\n${s.text}\n\n${code(s.stage.lines)}`).join('\n\n')}

## What the platform does

${(c.features ?? []).map((f) => `- **${f.name}.** ${f.text}`).join('\n')}

## The AI part isn’t just calling a model

${(c.model ?? []).map((col) => `### ${col.title}\n\n${col.items.map(([br, t, d]) => `- **${t}** (\`${br}\`). ${d}`).join('\n')}`).join('\n\n')}

## Things that broke

${(c.bugs ?? []).map((b) => `### ${b.title}\n\n- Where: ${b.where}\n- Symptom: ${b.symptom}\n- Fix: ${b.fix}\n\n${b.deep}`).join('\n\n')}

${lessons(c.lessons ?? [])}

${caseFooter(site, c)}
`;
}

function mcpMd(site: URL | undefined, c: Case) {
  return `# Case ${c.no}: ${c.title}

${changed(c)}${mcp.intro}

Stack: ${stackOf(c).join(', ')}

## How a tool call flows

${mcp.flow.map(([t, d], i) => `${i + 1}. **${t}.** ${d}`).join('\n')}

## At a glance

${glance(c)}

## The decisions that shaped every connector

${mcp.chapters.map((ch, i) => `${i + 1}. **${ch.title}.** ${ch.key} ${ch.text} (${ch.tag})`).join('\n')}

## One name, one permission

Every tool is named \`service_product_action\` and carries exactly one permission. An agent can only call what its owner granted, checked before the app is contacted.

${mcp.tools.map(([n, d, sc]) => `- \`${n}\`: ${d} (permission \`${sc}\`)`).join('\n')}

## How I tested it

### 1. Against a fake app

Before any real app was involved, a fake one checked that each person’s token is used only for them, and that a request without one is refused.

${code(mcp.proof.lines)}

### 2. With a real teammate

A teammate who didn’t build it asked their own agent a normal question, without naming the connector. The agent chose the right tool by itself, found the answer in a ticket, and named the tools it used so the answer could be checked.

## Where it plugs in: many apps, one gateway

${mcp.connectors.map(([, n, d]) => `- **${n}:** ${d}`).join('\n')}

What broke along the way, and the fix:

${mcp.fixes.map(([a, b]) => `- ${a}: ${b}.`).join('\n')}

${lessons(c.lessons ?? [])}

${caseFooter(site, c)}
`;
}

function securityMd(site: URL | undefined, c: Case) {
  return `# Case ${c.no}: ${c.title}

${changed(c)}${sec.intro}

Stack: ${stackOf(c).join(', ')}

## Every layer closed by default

${sec.layers.map(([n, d], i) => `${i + 1}. **${n}** (${d}). Attack: ${sec.attacks[i].try}. Blocked: ${sec.attacks[i].stop}.`).join('\n')}

## At a glance

${glance(c)}

## Replay the attack

Each finding is an attack I closed, replayed: the attack, what happened before, and what happens now.

${sec.findings.map((f, i) => `### ${f.id} (${f.layer})\n\n${f.risk} Fix: ${f.fix}\n\n- Before: ${sec.table[i].before}\n- Now: ${sec.table[i].after}\n\n${code(f.lines)}`).join('\n\n')}

## The sweep

${sec.sweepText}

${code(sec.sweep.lines)}

${lessons(sec.principles.map(([h, d]) => [h.replace(/\.$/, ''), d] as [string, string]))}

${caseFooter(site, c)}
`;
}

export function caseMd(site: URL | undefined, slug: string) {
  const c = cases.find((x) => x.slug === slug)!;
  if (slug === 'mcp-connections') return mcpMd(site, c);
  if (slug === 'security') return securityMd(site, c);
  return platformMd(site, c);
}

const noteLink = (site: URL | undefined, n: Note) => n.data.externalUrl ?? abs(site, `/notes/${n.id}.md`);
const noteList = (site: URL | undefined, notes: Note[]) =>
  notes.map((n) => `- [${n.data.title}](${noteLink(site, n)})${n.data.tag ? ` (${n.data.tag})` : ''}: ${n.data.summary} (${n.data.readMinutes} min read)`).join('\n');

export function cornerMd(site: URL | undefined, notes: Note[]) {
  const cc = cornerCopy(notes.length > 0);
  return `# ${corner.name}: ${cc.title}

${cc.intro}

## ${projectsIntro.title}

${projectsIntro.text} ${projectsIntro.note}

${projectList()}
${notes.length ? `
## ${corner.notes.title}

${corner.notes.text}

${noteList(site, notes)}
` : ''}
## ${corner.shelf.title}

${corner.shelf.text}

${books.map((b) => `- *${b.title}*${b.series ? ' (the series)' : ''} by ${b.author}${b.why ? `. ${b.why}` : ''}`).join('\n')}

## More

- [Home](${abs(site, '/index.md')})
`;
}

export function notesMd(site: URL | undefined, notes: Note[]) {
  return `# Notes

${corner.notes.text}

${noteList(site, notes)}

- [${corner.name}](${abs(site, '/corner.md')})
`;
}

export function noteMd(site: URL | undefined, n: Note) {
  const c = n.data.case ? cases.find((x) => x.slug === n.data.case && x.ready) : undefined;
  return `# ${n.data.title}

${n.data.tag ? `\`${n.data.tag}\` · ` : ''}*${n.data.summary}* (${n.data.readMinutes} min read)

${(n.body ?? '').trim()}
${c ? `\nThe full story: [Case ${c.no}: ${c.title}](${abs(site, `/work/${c.slug}.md`)})\n` : ''}
- [All notes](${abs(site, '/notes.md')})
`;
}

export function llmsTxt(site: URL | undefined, notes: Note[] = []) {
  const work = cases.filter((c) => c.ready);
  return `# ${SITE_NAME}

> ${home.hero.hi} ${home.hero.headline} ${home.hero.sub} Every page on this site also has a plain markdown version, linked below.

## Pages

- [Home](${abs(site, '/index.md')}): who I am, selected work, how I work, my path (a journey with four stops), life outside work, contact
${work.map((c) => `- [Case ${c.no}: ${c.title}](${abs(site, `/work/${c.slug}.md`)}): ${home.blurbs[c.slug]}`).join('\n')}
- [${corner.name}](${abs(site, '/corner.md')}): ${cornerCopy(notes.length > 0).title.replace(/\.$/, '')}: ${cornerCopy(notes.length > 0).summary}
${notes.length ? `- [Notes](${abs(site, '/notes.md')}): ${corner.notes.text}

## ${corner.notes.kicker}

${noteList(site, notes)}
` : ''}
## Side projects (live demos)

${projects.map((p) => `- [${p.name}](${p.live}): ${p.line} Code: ${p.code}`).join('\n')}

## Contact

- [Resume (PDF)](${abs(site, home.contact.resume)})
- [GitHub](${home.contact.github})
- [LinkedIn](${home.contact.linkedin})
- Email: ${home.contact.email}

## Notes

- Screens on the site are illustrations of how the work behaves, not screenshots of company systems.
- Internal names and metrics are left out on purpose.
`;
}

export const mdResponse = (body: string, type = 'text/markdown') =>
  new Response(body, { headers: { 'Content-Type': `${type}; charset=utf-8` } });
