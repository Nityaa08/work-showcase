---
title: "My router scored 23 out of 24. Then I gave it new questions."
summary: "I built a gateway that sends each prompt to the cheapest model that can handle it. The score looked amazing, until I tested it on prompts it had never seen."
tag: "EVALS · smart router"
kind: work
draft: false
readMinutes: 4
order: 5
---

Something that's always bugged me: most apps send every prompt to their biggest, most expensive model. "What's 2+2?" and "design a distributed caching system" get exactly the same treatment, and the same bill.

So I built Smart Router. It sits between an app and its models, reads each prompt, and sends it to the cheapest tier that can actually handle it. Easy questions go to a small model, hard ones go to a big one, and every request is logged with what it cost.

## The bit I was proud of

The router doesn't use AI to make the call. It uses plain rules. How long is the prompt? Is there code in it? Is it asking for steps, or a design? Each rule adds to a score, and the score picks the tier. It decides in under a millisecond and costs nothing, because there's no model call to decide the model call.

To test it, I hand-labelled 24 prompts with the tier I thought each one deserved, tuned my rules, and ran it.

**23 out of 24.**

I was very, very pleased with myself.

## Then I did the annoying thing

I wrote 24 *new* prompts. Same idea, same labelling. The only difference: my rules had never seen them.

**10 out of 24.**

Yeah. That hurt for a minute. But it's honestly the most useful number in the whole project.

## What the 23 really meant

It meant my rules were great at the 24 prompts I'd tuned them on. That's all. I'd been nudging a threshold here and a keyword there until every one of those prompts landed in the right place. The rules had learnt my test, not the actual problem.

It's like memorising last year's question paper. Brilliant marks in the practice exam, not so brilliant in the real one. People call this overfitting, and it doesn't care that there's no machine learning involved. Rules you write by hand overfit too, if you tune them on the same examples you test them on.

## The detail that changed how I saw it

When I looked at the 14 misses, every single one went the *same way*: too low. The router never sent an easy question to the expensive model. It only ever sent harder questions to a model that was too small.

That actually made me feel better. If it was wrong in random directions, it'd just be noise. Wrong in one direction means it's telling me something: its idea of "hard" is too narrow. That's a clear, fixable problem. It's also the costly direction to get wrong if you care about quality, because the user ends up with a worse answer.

## What I did with it

I didn't hide the 10. Both numbers sit side by side on the demo page, with the misses listed. The tuning prompts and the new prompts are kept separate in the code too, so nobody (including future me) can accidentally tune on the test.

What I'd do next: figure out *why* those missed prompts are hard, instead of adding one keyword per miss, which would just overfit all over again. And add a fallback, so if a small model's answer looks weak, it tries the next tier up.

## What I took away

Every eval I build now has two sets: the one I'm allowed to look at, and the one I'm not. The first tells me if my idea works. The second tells me if I'm fooling myself.

23 out of 24 felt great for about an hour. 10 out of 24 taught me a lot more. If you want to see where it would send your own prompts, it's on my [workbench](/corner/).
