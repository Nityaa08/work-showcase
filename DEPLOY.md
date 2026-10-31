# Editing and deploying this site

Everything the site needs is in this repository. Nothing has to be downloaded on a new laptop
or on the host, and the site looks the same on every device.

## How changes go live

| Branch | What Vercel does |
|---|---|
| `main` | **The live site.** Every push or merged pull request republishes it in about a minute. |
| any other branch | Gets its own **preview link** (shown on the pull request and in Vercel → Deployments). Previews are private to your Vercel login by default. |

So the safe loop is: change on a branch → open the preview link on your phone → merge the pull request when it looks right.
If a release goes wrong: Vercel → Deployments → pick the last good one → **Promote to Production** (instant rollback).

## One-time setup on Vercel (about 2 minutes)

1. vercel.com → **Continue with GitHub** (account `Nityaa08`).
2. **Add New → Project → Import** `work-showcase`. If it isn't listed, choose *Adjust GitHub App permissions* and allow this repo.
3. Leave the settings as they are (`vercel.json` sets Astro, `npm run build`, output `dist`). **Deploy**.
4. Optional: Settings → Domains to add a custom domain, then point `tinyurl.com/nityashrees` at the new address.

## Run it on a laptop

Needs Node.js LTS (nodejs.org) and Git.

```bash
git clone https://github.com/Nityaa08/work-showcase.git
cd work-showcase
npm install
npx astro dev          # http://localhost:4321
npx astro dev --host   # also shows a Network address to open on your phone (same Wi-Fi)
npm run build          # what Vercel runs; output in dist/
```

To remove it all afterwards: delete the `work-showcase` folder (that includes `node_modules`).

## What's where

| To change | Edit |
|---|---|
| Home page text, side projects, contact | `src/pages/index.astro` |
| Case 01 content (steps, features, model work, incidents) | `src/data/cases.ts` |
| Case 02 / Case 03 pages | `src/pages/work/mcp-connections.astro`, `src/pages/work/security.astro` |
| Laptop on case 01 | `src/components/Laptop.astro` (pure HTML/CSS, no files needed) |
| Colours, spacing, type | `src/styles/global.css` (the "Final polish layer" at the end wins) |
| Link-preview tags | `src/components/Meta.astro`; the image is `public/og.png` (1200×630) |
| Resume PDF | `public/Nityashree_S_Resume.pdf` (public copy, no phone number) |
| Hosting headers and caching | `vercel.json` |

## The optional 3D laptop

`src/components/MacBook3D.astro` renders a licensed 3D MacBook model if
`public/models/macbook-pro-14.glb` exists **at build time**. That file is not in git (its licence
doesn't allow redistributing it), so by default the site uses the HTML laptop. Don't commit the
model unless you have a licence that permits publishing it.

## Fonts

Schibsted Grotesk and IBM Plex Mono are installed from npm (`@fontsource/*`) and served with the
site, so there's no dependency on Google Fonts.
