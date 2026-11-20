---
title: "Making an AI research tool show its homework"
summary: "AI answers sound just as confident when they're wrong. So I made mine check every sentence against its sources, and list the ones it couldn't back up."
tag: "GROUNDING · meridian"
kind: work
draft: false
readMinutes: 4
order: 6
---

You know that feeling when an AI gives you a beautiful, confident paragraph, citations and all, and you have no idea which bits are actually real?

That's what I wanted to poke at with Meridian, a small research tool I built. You ask it a question, and instead of one search and one answer, a few agents split the question into parts, search each part, rank what they find, look for gaps, and then write a report with sources.

It looked really good. That was the problem.

## A citation isn't proof

The first reports had neat little source links after every claim, and they *felt* trustworthy. But a link after a sentence only tells you the writer had that page open. It doesn't tell you the page actually says that.

When I checked by hand, sometimes it didn't. A sentence would be mostly right, with one extra detail the model had filled in from "general knowledge". Or a point would be cited to a page that was about something nearby, not the thing itself. Nothing dramatic. Just the quiet kind of wrong that people don't catch, because the citation makes them stop checking.

## So I made it check itself

After the report is written, a separate step goes through it sentence by sentence and asks one question: *can I actually find this in the sources it's allowed to cite?*

I kept the check deliberately simple. It looks at the important words in a sentence and sees if enough of them show up together in one of the sources. No second AI grading the first one. Just a plain rule I can read, test and explain to anyone.

Then every report comes with a small scorecard: how many sentences were checked, how many were backed up, and a list of the ones that weren't. Shown to the reader, not hidden.

Two more rules came with it:

- If the writer cites a link the tool never actually fetched, the citation gets removed. You can't cite a page you didn't read.
- Each section is only checked against *its own* sources. Otherwise a claim could borrow support from a page it never cited.

## The checker had bugs too

Funny thing about building a checker: now you have two things that can be wrong. A couple of mine:

- The checker was reading the whole source page, but the writer only ever saw the first part of it. So a sentence could "pass" using text the writer never even had. Now the checker only uses what the writer actually saw.
- If a point ended with its source's title in brackets, the checker counted the title as part of the claim. Free marks. Fixed.

Each one got a test that failed first, and passes now.

## What it can't do

I want to be really clear about this, because it's the whole spirit of the thing. Matching words isn't the same as understanding. A sentence can use all the right words and still twist what the source meant. So this catches made-up details and wandering citations, not every possible mistake. And I haven't measured answer quality against a proper labelled set yet. The README says that too.

## What I took away

I was never trying to build a tool that's always right. I wanted one that's honest about what it can back up, so you know where to look twice.

That's honestly what I want from any AI that writes things people rely on. Not more confidence. Just its homework, shown. You can try it on my [workbench](/corner/) and see the checklist under the report.
