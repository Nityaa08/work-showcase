---
title: "My first design got rejected. It was the best thing that happened to it."
summary: "Letting people share their AI assistant with a guest sounds simple. My first design guarded the risk. The one we shipped removed it."
tag: "DESIGN · guest access"
kind: work
draft: false
readMinutes: 4
order: 9
case: agent-platform
---

People loved their personal AI assistants. So, naturally, they wanted to share them. "Can my teammate ask my assistant something while I'm on leave?" "Can I let someone from another team use it for a day?"

Sounds simple, right? Add a "share" button, done.

It's not. An assistant like that is connected to its owner's world: their documents, their tickets, their calendar. Sharing the assistant without sharing all of that is the whole problem. And it turned into the hardest thing I've built.

## My first design

My first idea was the obvious one. A guest talks to the owner's assistant, and the assistant acts with the owner's permissions, but with limits. The guest can read this, not that. Can do this, not that.

I was quite happy with it. I wrote it up and took it to our lead.

The lead rejected it.

## Why they were right

Here's the thing about "the owner's permissions, with limits": every limit is a place where it can go wrong. If even one of them has a gap, a guest can act as the owner. And with an AI agent in the middle, you have to assume someone *will* go looking for that gap. I'd spent weeks red-teaming agents. I knew exactly how creative people get.

So the lead set three rules instead:

1. Only personal assistants can have guests.
2. A guest's tool calls always use the **guest's own** credentials, never the owner's.
3. The owner's data reaches a guest only through what the owner chooses to share.

Read rule 2 again, because it's the clever one. It doesn't guard the risk. It removes it. There's no owner credential anywhere near a guest's turn, so there's nothing to leak.

Honestly? It was a better design than mine. That stung for about a day, and then it became the thing I'm proudest of learning: **if you can remove a risk, don't guard it.**

## Rebuilding it

Then came the actual work, across five services owned by different people, all of which had to agree on who a guest is and what they're allowed to do.

- **Per-guest permissions,** so each guest gets exactly what they were given and nothing more.
- **Separate credentials** for every guest, never mixed with the owner's.
- **An isolated conversation** for each guest, so nothing from the owner's chats leaks into theirs.

And every permission is checked at the gateway, outside the model. This came straight from my red-teaming: a rule written in the prompt is a request, and requests can be talked around. A rule checked in code is a guarantee. At worst, a tricked agent can *ask* for something it shouldn't have. The gateway still says no.

Anything missing, unknown or unclear also means no. Never "probably fine".

To keep five teams in sync, I wrote one shared design first, made small changes in each service, and ran one end-to-end test across all five before anything was switched on in production.

## The bug I still think about

One feature lets the owner say "ask my guests a question". Each guest moves through simple states: not asked, question delivered, answered.

An early version accepted *any* message from a guest as their answer. So if a guest said "hi" before the question had even reached them, that "hi" got recorded as their reply. To a question they'd never seen.

It's a funny bug. It's also exactly the kind that makes a product feel broken in a way nobody can explain. The fix was one rule: a message only counts as an answer after the question is confirmed delivered. And, of course, a test that sends a greeting first and expects no answer to be recorded.

## How it shipped

I built it the way I build everything: directing AI coding agents, reviewing every change myself, and proving it in the real place. It was tested end to end on the dev environment with real test accounts, and then went to production behind a feature switch, so it could be turned off without a new release if anything looked wrong.

## What I'd do next

Watch each guest conversation, so a stuck question shows up as an alert, not as a confused owner wondering why nobody answered.

## What I took away

The hardest part of this project wasn't five services or the gateway. It was letting go of my first design. The rejection made the feature safer than anything I'd have built alone, and it gave me the rule I now use everywhere: **remove the risk if you can. Guard it only if you can't.**
