// Case 02 content. Used by the page (src/pages/work/mcp-connections.astro) and its markdown twin.
import type { Stage as StageT } from './cases';

export const intro = 'MCP is the standard way an AI agent uses a real tool. I built connectors that speak it and hardened the gateway every call passes through, so agents could use company apps without ever holding a key.';
export const flow = [
  ['Agent asks for a tool', 'An agent decides it needs outside data, so it calls a tool over MCP.'],
  ['Gateway checks the grant', 'The gateway confirms this agent holds that tool’s permission, and that the tool isn’t switched off.'],
  ['Vault attaches the user’s token', 'The vault adds the signed-in person’s own token. The agent never sees it.'],
  ['The MCP server calls the app', 'The connector turns the tool call into a request to the real app.'],
  ['Only what this person may see', 'The app answers with what this person is allowed to read, and the answer flows back.'],
];

// Each decision: the one line that matters (bold), then the reason in a sentence.
export const chapters = [
  { title: 'We refused a shared key', key: 'Each person signs in with their own account, using OAuth with PKCE.', text: 'Apps check permissions against the token’s owner, so a shared company key would have shown everyone the same documents.', tag: 'Per-user access' },
  { title: 'The vendor ignored our rules, so we moved them', key: 'The gateway enforces permissions before the vendor is ever contacted.', text: 'Vendor-hosted servers run none of our code, so they ignored our permission headers.', tag: 'Gateway' },
  { title: 'Then we built our own', key: 'Our own MCP server publishes its tools, checks permissions itself, and never keeps a token between requests.', text: 'The vendor’s server couldn’t, and our copy of its tool list kept drifting.', tag: 'Tested end to end' },
];
// Which diagram box each numbered step lights first (the numbers on the boxes match the list).
export const nodeNo: Record<string, number> = { n0: 1, n1: 2, n4: 3, n2: 4, n3: 5 };

export const tools = [
  ['knowledge_search_query', 'Search', 'knowledge:search:read'],
  ['knowledge_chat_ask', 'Ask a question', 'knowledge:chat:read'],
  ['knowledge_documents_read', 'Read a document', 'knowledge:documents:read'],
];

export const proof: StageT = { medium: 'shell', label: '~/connector-mcp', lines: [
  { t: 'cmd', s: 'go test ./...' },
  { t: 'ok', s: '✓ the user’s token becomes the outbound credential' },
  { t: 'ok', s: '✓ back-to-back callers never share a token' },
  { t: 'ok', s: '✓ no credential → refused, the app is never called' },
  { t: 'ok', s: '✓ a tool without permission never reaches the app' },
  { t: 'ok', s: '✓ the tool catalog is served without credentials' },
  { t: 'out', s: 'ok   connector-mcp   all green' },
]};

export const connectors = [
  ['Kn', 'Company knowledge', 'search, ask, read documents'],
  ['Ob', 'Observability', 'logs, metrics, monitors'],
  ['Ch', 'Team chat', 'read and write, scoped'],
  ['Tr', 'Travel', 'flights and stays'],
  ['Co', 'Code', 'repositories and pull requests'],
  ['Da', 'Data', 'saved queries'],
];

export const fixes = [
  ['A cancelled call failed its neighbours', 'each caller isolated; the upstream wait bounded'],
  ['A connector failed every call, silently', 'caught by the new logs; routing fixed'],
  ['Callers could set control headers', 'stripped at the edge'],
  ['Status checks disagreed', 'aligned into a single answer'],
];
