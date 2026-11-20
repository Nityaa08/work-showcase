---
title: "One colon took an AI agent offline"
summary: "An agent went silent on release day. Rolling back would have felt great and fixed nothing. The real cause was one character."
tag: "INCIDENT · agent offline"
kind: work
draft: false
readMinutes: 4
order: 7
case: agent-platform
---

One morning, an AI agent just stopped talking. Every message its team sent failed. No useful error, no hint. Silence.

And of course, a release had gone out that same day.

You can guess what everyone's first instinct was. Roll it back. It's fast, it's the obvious move, and it *feels* like you're doing something. It was tempting.

## Why I didn't

Before touching anything, I read what the release actually changed. Nothing in it touched how agents load their files. So rolling back would have meant undoing a perfectly good release, waiting to see if the agent woke up, and then (when it didn't) being right back where we started, an hour later.

So I asked a different question instead: *what does the broken agent have that the working ones don't?*

## The culprit

One skill file. A skill is a small instruction file that teaches an agent how to do one job, and it starts with a tiny header written in a format called YAML.

That header had a description with a second colon in it. Something like `description: Summarise: the short version`.

To you and me, that's a normal sentence. To YAML, a colon followed by a space in the middle of a line looks like the start of a new field, so it refused to read the header at all. And the engine, instead of skipping that one broken file, treated it as fatal and gave up on the *whole agent*.

One character. One file. An entire agent offline.

## Make it fail first

Before I changed a single line, I wrote a test that broke the same way: one bad file sitting next to good ones, and the whole agent going down. Watching that test go red is genuinely my favourite part of any fix, because it proves I actually understand the bug. If I can't make it happen on purpose, I'm just guessing.

## Then I fixed it in two places

One fix wasn't enough, because the problem lived in two places.

- **Where the file is saved.** The studio where people write their agents now refuses a header the engine can't read, and explains why in plain words. It uses the engine's own rule instead of a copy, so the two can never quietly disagree.
- **Where the file is read.** The engine now skips only the broken file, reports it, and keeps the rest of the agent running.

The first stops new bad files getting in. The second protects the ones already saved, and any future case where the two sides disagree anyway.

## The thing review caught

My first version of the error message quoted the broken line back to the model, so it could explain the problem nicely. A reviewer pointed out something I'd completely missed: skill files are written by people. That text is untrusted. Handing it straight to the model is prompt injection through a side door.

They were right. Now the model only sees a line number, and the full error goes to the logs where a human reads it.

I love this about reviews. The bug I'd have shipped wasn't in the code I was worried about. It was in the "helpful" little thing I added at the end.

## What I'd do differently

I fixed it, tested it, and shipped it through dev and production. What I didn't do was go back through the logs to check no other agent had quietly hit the same thing. Next time, that search is part of the fix, not an afterthought.

## What I keep from it

Agents load instructions, tools and memory from lots of different places, and every one of those is an input that can break the agent. So check them where they're *written*, not only where they're read.

And when something breaks on release day, read the release before you roll it back. Sometimes the obvious suspect has an alibi.
