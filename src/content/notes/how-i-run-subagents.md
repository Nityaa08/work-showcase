---
title: "How I run a team of AI agents (without losing the plot)"
summary: "Subagents are brilliant at parallel work and terrible at knowing when they're wrong. The few habits that make them actually useful."
tag: "HOW I WORK"
kind: work
draft: false
readMinutes: 4
order: 2
---

In my [first note](/notes/how-i-build/) I said I don't type my code by hand. I run a small team of AI agents instead. Here's what that actually looks like, day to day.

Quick definition first. A **subagent** is a separate AI worker that my main agent hands one job to. It starts fresh, does that one job, and comes back with a report. I can have a few running at the same time: one reading the code, one writing a fix, one trying to break it.

Sounds amazing, and it is. It's also really easy to get wrong. Here's what I've learnt.

## One job each. Really one.

The biggest mistake I made early on was giving one agent a huge, fuzzy task. "Fix the site and make it faster and clean up the code." It would do *something*, very confidently, and I'd spend longer checking it than if I'd split it up.

Now every subagent gets exactly one job, with a clear finish line. Not "improve the tests", but "add a test that fails when a refund is approved as a bill, then make it pass". If I can't write the finish line in a sentence or two, the job isn't ready to hand off.

## Give them the context you'd give a new teammate

A subagent starts with zero memory of what we've been talking about. It doesn't know my rules, the thing we tried yesterday, or the one file it absolutely must not touch.

So I brief it like I'd brief a new person joining for one afternoon: what we're doing, why, what "done" looks like, what's off limits, and how to prove it worked. It feels like extra effort. It saves me every single time.

## Never let the worker grade its own work

This is the big one. An agent that just wrote some code will almost always tell you the code is great. It's not lying exactly. It just believes itself.

So the one who builds is never the one who checks. I have a separate reviewer agent go through the work, and for anything important, a final bot reviewer with all my review rules (a different model, so a different set of blind spots). And then me, reading the diff myself.

"The agent says it's fixed" and "it's fixed" are two different statements. I've learnt to only trust the second one when I've seen it with my own eyes.

## Run things in parallel, but merge carefully

The best part of subagents is speed. While one agent fixes a bug in one project, another can be writing the tests for a different one, and a third can be checking whether the live site still works.

The catch is when two of them touch the same thing. Two agents editing the same file at once is a mess waiting to happen. So parallel work goes to separate areas, and anything that overlaps runs one after the other.

## Ask for proof, not promises

Every subagent's report has to come with evidence. The test that failed before and passes now. The command that was run and what it printed. A screenshot of the page. If the report just says "done!", it goes back.

This one rule probably catches more problems than anything else I do.

## What I actually spend my time on

People imagine that working this way means sitting back while the agents do everything. It's honestly the opposite. I spend my time on the parts that need judgement: deciding what to build, writing the finish line, reading the work, and saying no when something looks right but isn't.

The agents are fast. My job is to make sure they're fast in the right direction.
