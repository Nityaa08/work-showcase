---
title: "I stopped repeating myself to AI. Skills did that."
summary: "What Claude skills are, how I use them to give every agent my rules from the start, and the one-character mistake that taught me to respect them."
tag: "HOW I WORK"
kind: work
draft: false
readMinutes: 3
order: 3
---

For a while, every time I started work with an AI agent, I'd type the same things. Write the failing test first. Don't trust a setting that might be missing. Explain the change in plain English. Don't touch what I didn't ask you to touch.

Every. Single. Time.

Then I started using **skills**, and I haven't typed those lines since.

## So what is a skill?

A skill is just a small folder with an instruction file inside, written in plain language. It teaches an agent how to do one kind of job the way *I* want it done.

The clever part is how it loads. Each skill has a short description at the top, something like "use this when reviewing a pull request". The agent only reads that one line until the job matches. When it does, it opens the full instructions and follows them. So I can have lots of skills sitting there without cluttering every conversation.

## What mine look like

Most of my skills are just my habits, written down:

- **How I fix bugs.** Reproduce it first, write a test that fails, then fix it, then prove it in the real place.
- **How I review.** The questions I always ask: is there a test that would have caught this? Does it fail safely? Did anything sneak in that wasn't asked for?
- **How I write things for people.** Short sentences, plain words, no jargon unless I explain it.

None of these are fancy. That's the point. They're the things I'd tell a new teammate on their first day, except now every agent starts with them already in its head.

## The part people miss

A skill is only as good as its description. If the one line at the top is vague, the agent won't know when to use it, and the instructions just sit there unused. I've rewritten descriptions more times than the instructions themselves.

And keep them small. One skill, one job. The moment a skill tries to cover everything, the agent starts following half of it.

## The time a skill broke everything

I have a soft spot for skills partly because of the day one took down a whole agent. One stray colon in a skill's header, and the engine refused to load the agent at all. (I wrote about [that one](/notes/one-colon/) separately.) It taught me that these little files are real configuration, and they deserve the same care as code: checked when they're written, not just when they're read.

## Why I'd recommend it

If you work with AI agents and catch yourself typing the same instructions again and again, that's your sign. Write it down once, as a skill, and let the agent remember it for you.

It made my agents more consistent. Honestly, it made *me* more consistent too, because writing my rules down made me notice which ones I actually follow.
