---
title: "My job was to break our AI agent before anyone else could"
summary: "Small, harmless-looking problems that added up to something serious, why the fix couldn't live in the prompt, and the rule I use to decide a security fix is actually done."
tag: "RED TEAM · before launch"
kind: work
draft: false
readMinutes: 4
order: 10
case: security
---

Before a new AI agent went out to more people, I was asked to do something I really enjoy: try to break it.

Not "check that it works". Break it. Find the ways someone curious, careless or a little bit sneaky could make it do things it shouldn't.

A teammate had already found the first round of bugs, and some were serious. So I went looking for something different: not single bugs, but **chains**.

## Why chains

With AI agents, the scary stuff rarely comes from one big hole. It comes from small things that look harmless on their own and then line up.

Here's the shape of what I found, kept deliberately vague:

- I could get the agent to show me the hidden instructions it starts every conversation with.
- Reading those told me how its safety rules were worded.
- Knowing the wording, I could talk it out of following them. (And I checked it really behaved differently, not just *said* it would.)
- Without those rules, it was willing to change parts of its own setup.
- And some of those changes stuck around, into later conversations.

Each step on its own? A bit embarrassing, maybe. Not alarming. Put them together, and you go from "tell me your instructions" to changes that outlive the conversation.

## The real problem wasn't any one step

When I stepped back, every link in the chain came from the same design choice: the agent's safety rules lived in its instructions, as text the model could be talked out of.

That changed how I saw the whole thing. I could have blocked the exact phrasing that worked, and it would have fixed nothing, because a different phrasing would work tomorrow. You can't win that game one sentence at a time.

So the recommendation was to move those rules out of the prompt and into the platform, into code the model can't argue with. The team went with it.

It's the single biggest thing I learned about agent safety, and I still say it the same way: **a rule in the prompt is a request. A rule in code is a guarantee.**

## Writing it up so people could actually fix it

I wrote each link as its own report: how to reproduce it, what happened, what should have happened, and why it mattered. More reports to track, sure, but it meant different people could fix different links in parallel and check each one on its own.

I kept them at the level of patterns, not copy-paste attacks, and shared them only with the people who needed to fix them. (Which is also why this post stays vague. That's on purpose.)

## When is a security fix "done"?

For the fixes I worked on myself, I stuck to one rule: **a security fix is done when the attack fails, not when the code looks right.**

1. Send the exact attack and write down what happens.
2. Write a test that replays it and expects a refusal. Watch it fail first, so I know the test really catches the problem.
3. Make the fix. Watch the test pass.
4. Run the same attack again in the test environment, and make sure normal use still works.

The test stays in the suite forever, so that attack stays fixed.

## What I'd do differently

I went in mostly on instinct and creativity. Next time I'd start by writing down every single place untrusted text can get into the agent: messages, files, tool results, memory. Then test each one on purpose. Creativity finds the interesting bugs. A list finds *all* of them.

## Why I love this work

There's something really satisfying about being the person who finds the problem before a real user does. Every bug I found in a test environment was one nobody had to apologise for later.

It's also the reason I build my own projects the way I do. When I made my [invoice agent](/notes/break-my-invoice-agent/), the first thing I did after it worked was try to break it.
