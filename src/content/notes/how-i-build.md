---
title: "Do I actually code? Not the way you think."
summary: "How I build with a small team of AI agents, the reviewer bot that knows all my rules, and the question I get asked in every interview."
tag: "HOW I WORK"
kind: work
draft: false
readMinutes: 4
order: 1
---

Every interview has a moment where someone leans in a little and asks, "So… do you actually code?"

Fair question. Here's the honest answer: I don't type my code by hand. What I do is closer to running a very fast, very literal team that never gets tired and occasionally does something deeply weird. My job is to point that team in the right direction, keep it honest, and own what comes out the other end.

Here's what that actually looks like.

## First, I decide what "done" means

Before any agent touches anything, I write down what I want in plain words. Not "add a feature", but something like: *if an invoice's total doesn't match its line items, it should never be approved, and the person reviewing it should see why in one sentence.*

This sounds boring. It's the most important part of my day. An AI agent will happily build exactly what you asked for, so if what you asked for is vague, you get something confidently, beautifully wrong.

## Then the team gets to work

I build with Claude, and the thing it's genuinely brilliant at is running subagents: smaller agents, each with one job, working in parallel. A typical setup:

- a **planner** that reads the code and proposes how to do the change,
- a **coder** that writes it,
- a **reviewer** that tries to find everything the coder got wrong.

They argue. Genuinely. The reviewer flags something, the coder pushes back, and I'm the one who decides who's right. Some days it feels less like programming and more like chairing a meeting where everyone is extremely confident.

## I wrote my rules down, so the agents can follow them

Early on I noticed I kept giving the same instructions over and over. Write the failing test first. Never trust a secret that might be missing. Explain the change in plain English. So I stopped repeating myself and turned those habits into **Claude skills**: small instruction files that teach an agent how *I* want a certain job done. Now every agent starts with my rules already in its head, instead of me remembering to say them.

## And then there's the final boss

Before anything gets merged, it goes past one more reviewer: a bot I set up on Grok whose whole job is to review my pull requests the way I would. It has every rule I use to judge code. Is there a test that would have caught this? Does it fail safely if something's missing? Would I understand this change in six months? Did anything sneak in that wasn't asked for?

It's strict. It's supposed to be. A different model from the one that wrote the code also means a different set of blind spots, which is exactly what you want from a reviewer.

## The part I never hand off

Here's what people miss: the agents write the code, but I own what ships. So a few things stay with me, always.

1. **Make it fail first.** Before fixing a bug, I want a test that reproduces it and goes red. If I can't make a bug happen on purpose, I don't understand it yet.
2. **Read every change.** Every diff, every time. Agents are very good at code that *looks* right.
3. **Prove it in the real place.** Green tests on my machine are a promise, not proof. I check it where it actually runs.

My favourite example: an agent once went completely silent. The "obvious" fix was to roll back that day's release. I didn't, because nothing in the release touched how agents load their files. The real cause was a single stray colon in one instruction file. One character. If I'd rolled back, we'd have "fixed" nothing and felt great about it.

## So, do I code?

I'd put it this way: I design the system, I decide what correct looks like, I direct the work, and I prove it works before anyone else has to trust it. The typing is the part I've delegated.

And honestly? It's made me *more* careful, not less. When you're not the one writing every line, you can't assume you know what's in it. You have to check.

Everything on my [workbench](/corner/) was built this way, including an invoice agent that I then spent a full day [trying to break on purpose](/notes/break-my-invoice-agent/).
