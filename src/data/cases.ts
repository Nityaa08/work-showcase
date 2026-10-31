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
    intro: 'Teams across a company created their own AI agents, each with skills, memory and tools, working inside their chat apps. I worked on the services underneath: the engine that runs every turn, the studio where agents are made, and the gateways that connect them to chat and to tools.',
    glance: [
      ['My role', 'AI engineer on the platform team. I took fixes and features end to end: root cause, failing test, review, release, and watching it after.'],
      ['Scope', 'A multi-tenant agent platform used by teams across the company: engine, studio, chat and tool gateways.'],
      ['Stack', 'Go · TypeScript/React · PostgreSQL · MongoDB · Docker · Kubernetes · AWS'],
      ['Shipped', 'Guest access across five services, a reply-language resolver, per-turn outcome records, and the fix for an outage caused by one bad file.'],
    ],
    lessons: [
      ['Prove the cause before the fix', 'The day’s release looked guilty, and rolling it back would have felt productive. Comparing the broken agent with the healthy ones found the real cause instead.'],
      ['Refuse bad input where it enters', 'Check a file when it is saved, and survive it when it is read. One bad file should cost one skill, not a whole agent.'],
      ['Ship risky logic in the shadows first', 'The language resolver ran beside the old logic and was scored on a labelled test set before it replaced anything.'],
      ['Measure the model, not just the code', 'A small A/B with the prompt held fixed showed the model was ignoring instructions. The team changed the default model on that evidence.'],
    ],
    card: { medium: 'logs', label: 'engine', lines: [
      log('09:00:02', 'INFO', 'engine', 'turn started  agent=finance-helper  channel=slack'),
      log('09:00:03', 'INFO', 'engine', 'tool call  logs.search  412ms  ok'),
      log('09:00:05', 'INFO', 'engine', 'reply sent  language=es  guard=pass'),
    ]},
    steps: [
      { state: 'Report', heading: 'Something breaks', text: 'A team reported that their agent had stopped replying. Before touching any code, I went to the logs.',
        stage: { medium: 'logs', label: 'service:engine  status:error', lines: [
          { t: 'cmd', s: 'service:engine status:error' },
          log('14:02:11', 'ERROR', 'engine', 'turn failed  agent=support-bot  parse frontmatter: yaml: line 2'),
          log('14:02:40', 'ERROR', 'engine', 'turn failed  agent=support-bot  parse frontmatter: yaml: line 2'),
          log('14:03:05', 'ERROR', 'engine', 'turn failed  agent=support-bot  parse frontmatter: yaml: line 2'),
          { t: 'dim', s: 'one agent · every turn · all other agents healthy' },
        ]},
      },
      { state: 'Diagnose', heading: 'Find the real cause', text: 'A release had gone out that day, and it looked guilty. Instead of rolling it back on a hunch, I compared the broken agent with the healthy ones. The real cause was one badly formatted file.',
        stage: { medium: 'claude', label: 'agent-platform — claude', lines: [
          { t: 'you', s: 'Only support-bot fails. What does it have that the healthy agents do not?' },
          { t: 'tool', s: 'Bash(git diff --stat previous-release..this-release -- skills/)' },
          { t: 'out', s: '(empty — the deploy did not touch skills)' },
          { t: 'tool', s: 'Search logs("parse frontmatter", 3 days, by agent)' },
          { t: 'out', s: 'support-bot only' },
          { t: 'ai', s: 'One skill header has a second ": " on line 2. YAML cannot parse it, and the engine fails the whole agent.' },
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
      { state: 'Ship', heading: 'Ship it safely', text: 'Tested and reviewed before merging, then checked on dev before production, so the fix didn’t break anything else.',
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
          log('16:52:13', 'WARN', 'engine', 'skill disabled: bad header  agent=support-bot  turn ok'),
          { t: 'dim', s: '0 failed turns since release' },
        ]},
      },
    ],
    features: [
      { name: 'Chat sharing', demo: 'share', icon: 'M8 12a3 3 0 1 0 0-.01M16 6a3 3 0 1 0 0-.01M16 18a3 3 0 1 0 0-.01M10.6 10.7l2.8-1.6M10.6 13.3l2.8 1.6', text: 'Teams wanted to share an agent without sharing their data. I built guest access across five services: per-guest permissions, separate credentials and isolated sessions.' },
      { name: 'Memory', demo: 'memory', icon: 'M12 3a6 6 0 0 0-6 6c0 2.2 1.2 3.6 2.4 4.6.6.5 1 1.2 1 2V17h5.2v-1.4c0-.8.4-1.5 1-2 1.2-1 2.4-2.4 2.4-4.6a6 6 0 0 0-6-6ZM9.5 20h5', text: 'Agents remember what you asked for, across chats. Sensitive values are redacted before anything is saved.' },
      { name: 'Language guard', demo: 'guard', icon: 'M4 5h9M8.5 3v2M6 5c.6 3.2 2.6 5.7 5.5 7M11 5c-.8 3.5-3.4 6.4-7 8M13 21l4-9 4 9M14.5 18h5', text: 'Users wrote in more than one language. I built the resolver that decides each reply’s language, ran it in shadow mode, scored it on a labelled test set, then shipped it.' },
      { name: 'Skills', demo: 'skills', icon: 'M7 4h7l4 4v12H7zM14 4v4h4M10 13h5M10 16h5', text: 'Owners teach agents with small instruction files. The studio checks each file as it is saved and points to the exact line that needs fixing.' },
      { name: 'Scheduled runs', demo: 'schedule', icon: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', text: 'Teams wanted morning summaries without asking. Scheduled runs post one clean message to the channel.' },
      { name: 'Toolkits', demo: 'tools', icon: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4Z', text: 'Agents connect to real apps (logs, code, docs, travel) through one tool gateway. That story is case 02.' },
    ],
    model: [
      { title: 'Choosing how the model runs', lane: 'runs', items: [
        ['fix/settings-per-model-family', 'Settings per model family', 'New model families rejected a setting older ones accepted, so tool calls failed. Settings are now chosen per family.'],
        ['fix/clamp-tools-to-provider-limit', 'Respecting each provider’s limits', 'Providers cap how many tools one request may carry. Requests are trimmed to the limit instead of failing the turn.'],
        ['fix/real-context-window', 'Knowing the real context window', 'A routed model name hid the model’s true memory size. The real one is resolved, so long chats aren’t cut short.'],
      ]},
      { title: 'Fencing what the model reads', lane: 'reads', items: [
        ['fix/untrusted-fence-on-trim', 'Untrusted text stays untrusted', 'Tool results are wrapped in a fence the model treats as data, never instructions — even when the result is cut short.'],
        ['fix/redact-memory-saves', 'No secrets in memory', 'Sensitive values are redacted before an agent remembers anything.'],
        ['fix/internal-context-off-channels', 'Internal context stays internal', 'Instructions meant for the agent are blocked from what it posts to a channel.'],
      ]},
      { title: 'Checking what it writes', lane: 'writes', items: [
        ['feat/language-guard', 'Right language, every time', 'An output guard catches a reply in the wrong language and rewrites it — and the rewrite step can’t be talked into anything else.'],
        ['test/assert-on-the-wire', 'Tests that check the real request', 'Tests assert what is actually sent to the provider, not just what the code meant to send.'],
        ['feat/log-fallback-model', 'Seeing which model answered', 'When a fallback model steps in, it’s logged, so a quality change is never a mystery.'],
      ]},
    ],
    bugs: [
      { title: 'Deleting an agent hid its history', where: 'engine · studio', symptom: 'once an agent was deleted, its owner could no longer see what it had used', fix: 'the owner keeps read access to the usage history after a delete', deep: 'Usage history was reached through the agent itself, so deleting the agent cut the owner off from records they still needed. Now the owner’s access to that history survives the delete, in both the engine and the studio.' },
      { title: 'A release broke credentials for every agent', where: 'tool gateway', symptom: 'tool calls lost their credentials', fix: 'rolled back the same day; the missing test now exists', deep: 'A gateway change started refusing calls without an identity, on the premise that the engine sends one on every call. One path never did. The release was rolled back the same day, and the test that was missing is exactly that caller shape: a call that arrives without an identity.' },
      { title: 'New models could not call tools', where: 'model layer', symptom: 'a provider rejected a setting for a new model family', fix: 'per-family settings and a clearer error', deep: 'A new model family rejected a reasoning setting the engine sent alongside tools, so tool calls failed. Settings are now chosen per model family, and the error names the provider’s reason instead of looking like a platform bug.' },
      { title: 'A message vanished when a turn stopped early', where: 'engine · chat', symptom: 'the user’s message was never saved', fix: 'save the message the moment the turn is accepted', deep: 'When a turn stopped before the model ran, the user’s message was never written, so it disappeared from the chat. The message is now saved the moment the turn is accepted, and tests cover the failure branches that used to skip the save.' },
    ],
  },
  {
    slug: 'mcp-connections', no: '02', ready: true, custom: true,
    title: 'Building MCP connections',
    intro: 'The connectors that let AI agents use real company apps with each person’s own access, and the gateway every call passes through.',
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
      ['Scope', 'Six layers: edge, identity, tenant isolation, what the model reads, the sandbox, and dependencies.'],
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
