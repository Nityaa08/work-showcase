---
title: "I knew nothing about finance. Then I built agents for a finance team."
summary: "What it took to build AI agents for a domain I didn't understand: asking with real examples, writing every answer down, and letting the people who know decide."
tag: "LEARNING · finance agents"
kind: work
draft: false
readMinutes: 4
order: 11
---

I was asked to build AI agents for our finance team: agents that read the shared finance inbox, sort every email, and help turn vendor invoices into bills.

I knew nothing about finance. Not a little. Nothing.

This was one of the hardest things I've worked on, and one of the things I learned the most from. Not because the code was hard, but because I didn't know what "right" looked like.

## The problem with not knowing the domain

In most projects, I can tell when something is wrong. A page doesn't load, a test fails, an answer is obviously off.

Here, I couldn't. An agent could read an invoice, fill every field, and look perfect to me, and a finance person would glance at it and say "that one shouldn't be paid". I didn't have the instinct to catch that.

And in finance, "mostly right" isn't good enough. One wrong row can mean paying the wrong vendor, or paying the same bill twice.

## What actually worked: ask with a real example

My first questions were too abstract. "How should the agent handle unusual invoices?" gets a vague answer, because it's a vague question.

What worked was a document of open questions where **every question came with a real example**: an actual email, an actual bill, a short quote. "This one arrived like this. What should happen to it?"

Finance could answer that in a sentence. And sometimes the answer was not what I expected at all.

One example, kept vague: I assumed two bills with the same amount from the same vendor were a warning sign. Finance told me no. Lots of things cost the same every month. The real signal was the same vendor, for the same thing, for the same period. If I'd guessed, I'd have built a check that flagged normal bills and missed the real problem.

## Write every answer down

Every answer went into the document with the date it was given. Every rule the agents followed pointed back to an answer someone in finance had actually given.

That did three things:

- When a rule changed later, I could see exactly what changed and why.
- When something new came up, I could check whether we'd already decided it.
- When someone asked "why did the agent do that?", there was always an answer that wasn't "the model thought so".

The open questions stayed in the document too, written down instead of guessed. Some were still open at the end, and that's fine. A written-down "we don't know yet" is much safer than a quiet assumption.

## The model reads. Finance's rules decide.

Because I couldn't trust my own judgement here, I definitely wasn't going to trust a model's.

So the design was simple: the AI model only reads the documents. Plain, tested code applies the rules finance gave us. And when the agent wasn't sure, it didn't guess. It handed the case to a person with the reason written out.

Some things always go to a person, no matter how confident the agent is. Anything that changes where money is sent is one of them.

## Hold rather than guess

This is the biggest thing I'm taking from the project.

In a domain you don't know, your instinct to "make it work" is dangerous. Making it work, to me, meant handling every case. To finance, a delay is annoying, but a wrong payment is a real problem.

So "hold for a person" became a normal, good outcome, not a failure. The agents started by doing less, and earned more as finance checked their work.

## What I'd tell someone starting in a domain they don't know

1. **Ask with examples, not abstractions.** A real case gets a real answer.
2. **Write every answer down with its date.** Your memory of a conversation is not a spec.
3. **Let the experts decide, and build so they can check.** Their rules, your code, their review.
4. **Make "I'm not sure" a safe answer for the system.** Holding is cheaper than being wrong.

I still wouldn't call myself a finance person. But I know how to learn a domain I don't understand now, and I think that's the more useful skill anyway.
