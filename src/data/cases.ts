export type Line = { t: 'cmd' | 'out' | 'err' | 'ok' | 'dim' | 'you' | 'ai' | 'tool' | 'log' | 'bot'; s: string };
export type Medium = 'shell' | 'logs' | 'claude' | 'phone';
export type Stage = { medium: Medium; label: string; lines: Line[] };
export type Step = { state: string; heading: string; text: string; stage: Stage };
export type Feature = { name: string; text: string; demo: 'share' | 'memory' | 'guard' | 'skills' | 'schedule' | 'tools'; icon: string };
export type Bug = { title: string; where: string; symptom: string; fix: string; deep: string };
export type ModelWork = { title: string; lane: string; items: [string, string, string][] };
export type Case = {
  model?: ModelWork[];
  custom?: boolean;
  slug: string; no: string; title: string; intro: string; ready: boolean;
  /** One-sentence opener shown under the case title. */
  lede?: string;
  card: Stage;
  steps?: Step[];
  features?: Feature[];
  bugs?: Bug[];
  glance?: [string, string][];
  lessons?: [string, string][];
};

const log = (time: string, level: 'ERROR' | 'WARN' | 'INFO', service: string, msg: string): Line =>
  ({ t: 'log', s: [time, level, service, msg].join('|') });

export const cases: Case[] = [
  {
    slug: 'agent-platform', no: '01', ready: true,
    title: 'Building an AI agent platform',
    lede: 'I worked on the platform under company-wide AI agents: the engine behind every turn, the studio where agents are made, and the gateways to chat and tools.',
    intro: 'Teams across the company built their own AI agents, with skills, memory and tools, inside their chat apps. I worked on what runs underneath: the engine behind every turn, the studio where agents are made, and the gateways to chat and tools.',
    glance: [
      ['My role', 'AI engineer on the platform team. I took fixes and features end to end: root cause, failing test, review, release, then watching it.'],
      ['Scope', 'A multi-tenant agent platform used by teams across the company.'],
      ['Stack', 'Go · TypeScript/React · PostgreSQL · MongoDB · Docker · Kubernetes · AWS'],
      ['Shipped', 'Guest access across the services, a reply-language resolver, per-turn outcome records, and the fix for an outage caused by a single bad file.'],
    ],
    lessons: [
      ['Prove the cause before the fix', 'The day’s release looked guilty, and rolling it back would have felt productive. Comparing the broken agent with the healthy ones found the real cause instead.'],
      ['Refuse bad input where it enters', 'Check a file when it is saved, and survive it when it is read. A bad file should cost a single skill, not a whole agent.'],
      ['Ship risky logic in the shadows first', 'The language resolver ran beside the old logic and was scored on a labelled test set before it replaced anything.'],
      ['Measure the model, not just the code', 'A small A/B with the prompt held fixed showed the model was ignoring instructions. The team changed the default model on that evidence.'],
    ],
    card: { medium: 'logs', label: 'engine', lines: [
      log('09:00:02', 'INFO', 'engine', 'turn started  agent=finance-helper  channel=chat'),
      log('09:00:03', 'INFO', 'engine', 'tool call  logs.search  412ms  ok'),
      log('09:00:05', 'INFO', 'engine', 'reply sent  language=es  guard=pass'),
    ]},
    steps: [
      { state: 'Report', heading: 'Something breaks', text: 'A team reported that their agent had stopped replying. Before touching any code, I went to the logs.',
        stage: { medium: 'logs', label: 'service:engine  status:error', lines: [
          { t: 'cmd', s: 'service:engine status:error' },
          log('14:02:11', 'ERROR', 'engine', 'turn failed  agent=support-agent  parse frontmatter: yaml: line 2'),
          log('14:02:40', 'ERROR', 'engine', 'turn failed  agent=support-agent  parse frontmatter: yaml: line 2'),
          log('14:03:05', 'ERROR', 'engine', 'turn failed  agent=support-agent  parse frontmatter: yaml: line 2'),
          { t: 'dim', s: 'one agent · every turn · all other agents healthy' },
        ]},
      },
      { state: 'Diagnose', heading: 'Find the real cause', text: 'A release had gone out that day, and it looked guilty. Instead of rolling it back on a hunch, I compared the broken agent with the healthy ones. The real cause was a single badly formatted file.',
        stage: { medium: 'claude', label: 'agent-platform · claude', lines: [
          { t: 'you', s: 'Only support-agent fails. What does it have that the healthy agents do not?' },
          { t: 'tool', s: 'Bash(git diff --stat previous-release..this-release -- skills/)' },
          { t: 'out', s: '(empty: the deploy did not touch skills)' },
          { t: 'tool', s: 'Search logs("parse frontmatter", 3 days, by agent)' },
          { t: 'out', s: 'support-agent only' },
          { t: 'ai', s: 'Its skill header has a second ": " in the description line. YAML cannot parse it, so the engine fails the whole agent.' },
        ]},
      },
      { state: 'Reproduce', heading: 'Prove the bug, then fix it', text: 'I wrote a test that reproduces the bug and watched it fail. Then the fix: a bad file is refused when it is saved, and skipped safely when it is read, so it can’t take an agent down again.',
        stage: { medium: 'shell', label: '~/agent-platform', lines: [
          { t: 'cmd', s: 'go test ./internal/skills -run TestBadHeader' },
          { t: 'err', s: '--- FAIL: TestBadHeader_SkipsOnlyThatSkill' },
          { t: 'dim', s: '# refuse at save · skip at read' },
          { t: 'cmd', s: 'go test ./internal/skills -run TestBadHeader' },
          { t: 'ok', s: 'ok    internal/skills    0.41s' },
        ]},
      },
      { state: 'Ship', heading: 'Ship it safely', text: 'It was tested and reviewed before merging. Then I checked it on dev before production, so the fix didn’t break anything else.',
        stage: { medium: 'shell', label: '~/agent-platform', lines: [
          { t: 'cmd', s: 'git push origin fix/skill-header' },
          { t: 'ok', s: '✓ all tests pass   ✓ review approved' },
          { t: 'ok', s: '✓ merged   ✓ works on dev' },
          { t: 'ok', s: '✓ released to production' },
        ]},
      },
      { state: 'Watch', heading: 'Make sure it stays fixed', text: 'After the release, I watched the same logs that raised the alarm until they stayed quiet, then told the team it was fixed.',
        stage: { medium: 'logs', label: 'service:engine  env:prod', lines: [
          { t: 'cmd', s: 'service:engine env:prod "parse frontmatter"' },
          log('16:40:00', 'INFO', 'engine', 'release v1.4.2 live'),
          log('16:52:13', 'WARN', 'engine', 'skill disabled: bad header  agent=support-agent  turn ok'),
          { t: 'dim', s: 'no failed turns since release' },
        ]},
      },
    ],
    features: [
      { name: 'Chat sharing', demo: 'share', icon: 'M8 12a3 3 0 1 0 0-.01M16 6a3 3 0 1 0 0-.01M16 18a3 3 0 1 0 0-.01M10.6 10.7l2.8-1.6M10.6 13.3l2.8 1.6', text: 'Share an agent without sharing your data. I built guest access across the services: per-guest permissions, separate credentials, isolated sessions.' },
      { name: 'Memory', demo: 'memory', icon: 'M12 3a6 6 0 0 0-6 6c0 2.2 1.2 3.6 2.4 4.6.6.5 1 1.2 1 2V17h5.2v-1.4c0-.8.4-1.5 1-2 1.2-1 2.4-2.4 2.4-4.6a6 6 0 0 0-6-6ZM9.5 20h5', text: 'Agents remember how you like answers, across chats.' },
      { name: 'Reply language', demo: 'guard', icon: 'M4 5h9M8.5 3v2M6 5c.6 3.2 2.6 5.7 5.5 7M11 5c-.8 3.5-3.4 6.4-7 8M13 21l4-9 4 9M14.5 18h5', text: 'People write in many languages. I built the resolver that picks each reply’s language, ran it in shadow mode, scored it on a labelled test set, then shipped it.' },
      { name: 'Skills', demo: 'skills', icon: 'M7 4h7l4 4v12H7zM14 4v4h4M10 13h5M10 16h5', text: 'Owners teach agents with small instruction files. The studio checks each one on save and points to the line to fix.' },
      { name: 'Scheduled runs', demo: 'schedule', icon: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', text: 'Morning summaries without asking: a scheduled run posts a single clean message to the channel.' },
      { name: 'Toolkits', demo: 'tools', icon: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4Z', text: 'Agents reach real apps (logs, code, docs, travel) through a single tool gateway, covered in case 02.' },
    ],
    model: [
      { title: 'How the model runs', lane: 'runs', items: [
        ['fix/clear-provider-errors', 'Clear failure reasons', 'Every provider error used to show as the same vague failure. Each now maps to a precise reason, so people can see what went wrong.'],
        ['eval/model-not-prompt', 'Model, not prompt', 'Agents ignored instructions and every prompt rewrite failed differently. A small A/B with the prompt held fixed pointed at the model, and the team changed the default.'],
      ]},
      { title: 'What the model reads', lane: 'reads', items: [
        ['fix/untrusted-fence-on-trim', 'Untrusted text stays untrusted', 'A path that shortened long tool results skipped the fence that marks them as data. It uses the fence now.'],
        ['eval/stale-labels', 'When the answer key is wrong', 'A score dropped after a rule change. The test labels still used the old rule, so I separated real regressions from stale labels and model noise.'],
      ]},
      { title: 'What it writes', lane: 'writes', items: [
        ['fix/internal-context-off-channels', 'Internal instructions stay internal', 'A filter stops the agent’s own instructions leaking into replies. Its first version matched words and wrecked good replies in testing, so I rebuilt it to match the leaked section’s shape.'],
        ['feat/reply-language-resolver', 'The right reply language', 'The resolver ran in shadow mode beside the old logic and was scored on a labelled test set before it went live.'],
      ]},
    ],
    bugs: [
      { title: 'A job said “ok” after doing part of its work', where: 'engine · scheduled runs', symptom: 'a scheduled job stopped early and still logged success', fix: 'cause found: the step limit, not the rate limit', deep: 'A scheduled job hit its step limit partway through and still recorded success. The chat app’s rate limit looked guilty; the real cause was the step limit. A job that says ok when it isn’t is worse than one that fails loudly.' },
      { title: 'A release broke credentials for ordinary agents', where: 'tool gateway', symptom: 'tool calls lost their credentials', fix: 'rolled back the same day; the missing test now exists', deep: 'A gateway change refused calls without an identity, on the premise that every caller sends one. Some callers never did. The release was rolled back the same day, and the test that was missing covers exactly that caller: a call that arrives without an identity.' },
      { title: 'My own change caused a retry loop', where: 'engine · model catalogue', symptom: 'an empty model name was rejected and re-sent every few minutes', fix: 'my mistake, found and fixed', deep: 'A catalogue row was missing, so my change sent an empty model name. The engine rejected it, and the request was re-sent every few minutes. It was my mistake. I found it, fixed it, and now check for missing rows before I trust a lookup.' },
      { title: 'A message vanished when a turn stopped early', where: 'engine · chat', symptom: 'the user’s message was never saved', fix: 'save the message the moment the turn is accepted', deep: 'When a turn stopped before the model ran, the user’s message was never written, so it disappeared from the chat. The message is now saved the moment the turn is accepted, and tests cover both early-failure paths.' },
    ],
  },
  {
    slug: 'mcp-connections', no: '02', ready: true, custom: true,
    title: 'Building MCP connections',
    intro: 'Connectors that let AI agents use real company apps with each person’s own access, and the gateway every call passes through.',
    glance: [
      ['My role', 'Built the per-user OAuth (PKCE) connector and its MCP server. Audited the tool gateway and shipped its reliability fixes.'],
      ['Scope', 'Every tool call from every agent on the platform passes through this gateway.'],
      ['Stack', 'Go · MCP · OAuth 2.0 with PKCE · token vault · structured logs and metrics'],
      ['Shipped', 'Live in production: each person’s agent searches only what that person may see. Gateway: per-backend timeouts, isolated cancellations, metrics.'],
    ],
    lessons: [
      ['Permissions belong to people, not keys', 'A shared key would have shown everyone the same documents. Per-user sign-in cost more work and was the only honest answer.'],
      ['Don’t outsource your rules', 'A vendor server ignored our permission headers, so enforcement moved to the gateway, before the vendor is ever called.'],
      ['Better logs find bugs nobody reported', 'The structured logs I added exposed a connector that was failing silently in production. I fixed its routing.'],
      ['Let someone else prove it', 'The real test was a teammate asking a normal question and the agent choosing the right tool on its own.'],
    ],
    card: { medium: 'logs', label: 'tool gateway', lines: [
      log('12:15:20', 'INFO', 'gateway', 'tools/list  connector=knowledge'),
      log('12:15:21', 'INFO', 'gateway', 'tools/call  knowledge_search_query  ok'),
    ]},
  },
  {
    slug: 'security', no: '03', ready: true, custom: true,
    title: 'Security across an agent fleet',
    intro: 'Agents read untrusted text, hold people’s accounts and run code. Every layer has to say no by default.',
    glance: [
      ['My role', 'Found and closed security gaps across the agent fleet, each fix shipped with a test that replays the attack.'],
      ['Scope', 'Every layer: edge, identity, tenant isolation, what the model reads, the sandbox, and dependencies.'],
      ['Stack', 'Go · TypeScript · signed webhooks · govulncheck · container sandboxing'],
      ['Shipped', 'A CSRF logout fix, webhook signature checks, secrets that fail closed, role-based tenant checks, and reachable vulnerabilities patched across services.'],
    ],
    card: { medium: 'shell', label: '~/agent-fleet', lines: [
      { t: 'cmd', s: 'govulncheck ./...' },
      { t: 'err', s: 'vulnerability reachable from your code' },
      { t: 'ok', s: 'upgraded · no reachable vulnerabilities' },
    ]},
  },
];

/** The project's stack, from the "at a glance" strip, as a list of tags. */
export const stackOf = (c: Case | undefined) =>
  (c?.glance?.find(([k]) => k === 'Stack')?.[1] ?? '').split(' · ').map((t) => t.trim()).filter(Boolean);
