---
title: "Why your AI agent should sign in as you"
summary: "One shared key is the fastest way to connect an agent to your apps. It's also the fastest way for it to read things you're not allowed to see."
tag: "DECISION · access"
kind: work
draft: false
readMinutes: 4
order: 8
case: mcp-connections
---

An AI agent that can only chat is a nice toy. It becomes actually useful the moment it can reach real things: the company wiki, the logs, the code, team chat.

On the platform I worked on, agents reached those through MCP, which is basically the standard way an agent finds and uses tools. And for every connector we built, the first question was never *how do we connect it?* It was *whose access is the agent using?*

## The shortcut everyone reaches for

The quick answer is one shared key. Create a service account, paste its key into the settings, done. Works on day one, demos beautifully.

Here's the catch. The app checks permissions against whoever owns that key. So every agent, for every person, can see everything that key can see.

Picture this: someone asks the agent about a document they aren't allowed to open. The agent, holding a key that *can* open it, happily reads it out to them. Nobody hacked anything. The system did exactly what it was set up to do. That's what makes it scary.

## What we did instead

We went with per-person sign-in, and I built the connector for our knowledge search that works this way.

Each person signs in once, with the same "Sign in with…" kind of flow you've used a hundred times. It lets an app act for you without ever seeing your password, plus an extra one-time secret that makes a stolen sign-in code useless. Their token goes into a vault, kept separately for each person and each tool.

When the agent calls a tool, a gateway in the middle checks the agent is allowed to use it, picks up *that person's* token, and attaches it to the call. The model never sees a token. It just gets the answer, with exactly the access that person would have had if they'd searched themselves.

## Why it was worth the extra effort

- **If something leaks, less leaks.** A leaked shared key opens everything it can reach. A leaked personal token is one person's limited access, and you cancel one token, not everyone's.
- **You know who did what.** With a shared key, the logs just say "the bot". With personal tokens, they name the actual person, so "who read this?" has a real answer.
- **The app's own rules, for free.** The app already has proper permission rules, maintained by the people who own it. The agent just inherits them, instead of me trying to rewrite them in a prompt (which is not where you want your security living).

## It wasn't free

I won't pretend this was easy. You need a sign-in flow. Safe storage for tokens. Refreshing them before they expire. A friendly "please reconnect" when one does. And something sensible for people who never connect at all.

There was one surprise too. A vendor-hosted server simply ignored the permission information we sent it. Which, fair enough: it doesn't run our code, so it can't follow our rules. So we moved the check into our own gateway, which decides *before* the vendor is ever called. If you can't trust the other side to enforce a rule, enforce it on your side.

## How I knew it worked

First, tests against a fake app: one person's token is never reused for someone else, and no token means no access. Boring tests, and exactly the ones that matter.

Then the real test. A teammate who hadn't built any of it asked their own agent a normal question, without naming any tool. The agent picked the right tool, signed in as them, and found the answer with their access, not mine.

Honestly, that moment was the best part. Because that's the whole point. An agent shouldn't be a master key that opens every door. It should be you, just faster.
