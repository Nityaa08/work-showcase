// Turns resume/resume.html into public/Nityashree_S_Resume.pdf (one A4 page).
// Run from the repo root:  node resume/make-pdf.mjs
// Needs Playwright once:   npm i -D playwright && npx playwright install chromium
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const b = await chromium.launch();
const p = await b.newPage();
await p.goto('file://' + path.join(root, 'resume/resume.html'), { waitUntil: 'load' });
await p.pdf({ path: path.join(root, 'public/Nityashree_S_Resume.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true, scale: 0.96 });
await b.close();
console.log('Wrote public/Nityashree_S_Resume.pdf');
