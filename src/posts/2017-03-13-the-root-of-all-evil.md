---
id: 126
path: /posts/126-the-root-of-all-evil/
title: "The root of all evil"
author: miguel-palhas
date: 2017-03-13
tags:
  - development
intro: "**Spoiler alert:** it's premature optimizations."
---

**Spoiler alert:** it's premature optimizations.

I came to Web Development after a specialization in High-Performance computing during my MSc degree. You know... this:

I would spend my days studying Intel's microarchitecture, with all its weird and sometimes cheap tricks to improve performance (such as all the weird math that goes into [optimizing divisions behind your back]).

Our mindset at the time was to extract every last bit of juice from the hardware to optimize scientific simulations. All the data had to be aligned in memory to allow for the most efficient reads.

We were optimizing for CPU cache usage, not number of HTTP requests.

I spent the better part of two months in an open war with [CUDA] and the compiler bugs that would ruin an entire week's worth of work, and took at least as much time to debug. Tooling for those ecosystems was, let's say, pre-historic at best.

Apart from this last bit, I honestly loved the whole thing... and then I walked out to work with Ruby, for the Web.

## What I got out of it

Perhaps the thing that stuck the most with me was learning that *measurement is king*.

Our teacher and advisor was relentless about it (and I thank him for that).
Any measurement had to be properly explained and labeled.

> Under what conditions was this tested? How much RAM did you have? How would more RAM affect those results, and why? Did you do a [cache warm-up] first? Is the [average of all results really a good metric]?

**my advisor, for 2 entire years**

No claim could be stated that didn't have the data to back it up.
Our goal was not just to optimize code, but to know what code to optimize, how, and why.

And that is the important piece of the puzzle that too often I see missing.

The next half of this post is a summary of some of most common misconceptions and fallacies one often falls into when considering the performance of their application.

### 1. Is it really slow?

How often have you looked at a piece of code and concluded that its performance would not be good? The answer is probably "a lot". We've all done it.

The issue comes up when you don't benchmark your code to back up your claim before attempting to optimize.

Perhaps the slowdown does not come from where you think it does? (e.g.: *Maybe that SQL query is not really that slow, but you failed to notice the HTTP request your co-worker pushed to the codebase last night*)

Or maybe you're fed up because someone on your team insists of adding unit tests to every single line of code he writes, and that is slowing down your test suite... and then you measure it, only to find out that a single integration test takes as much time as all those unit tests combined.

After spending 2 years with my previously-mentioned teacher, and witnessing these fallacies over and over, I have now become very suspicious whenever someone says "this is slow". You'd be surprised at how frequently you're wrong when you say that.

Or maybe it is indeed slow, but...

### 2. Does it matter?

Yes, that endpoint in your app that takes 1.5 seconds to render a response is less than ideal. You should spend half of your next sprint bringing that number down!

Or you might remember to look at your usage metrics first (i.e. [Skylight]), and notice that in production, it represents only 0.05% of all the requests made to the app.

Absolute response time is generally a good metric. But it's not the only one. Should you waste 50% of your time improving 0.05% of your app?

The [Pareto Principle], also called 80/20 rule comes to mind here:

> 80% of effects come from 20% of causes and 80% of results come from 20% of effort.

### 3. Are you fixing it for the users, or for yourself?

You probably know that for the majority of web developers out there, the performance bottleneck will be the network itself. As long as you're not working for an internet giant, and dealing with millions of simultaneous requests, that's your situation.

So how arrogant is it to think that our 200ms response time must be improved upon? That we're better developers than that, and that we should, therefore, spend our time over-engineering a state-of-the-art caching solution for our 5K userbase?

And that bring us to our ego, which so often gets in the way. We're constantly thinking about doing things for the sake of doing, and not for the benefit of the end users.

It's in our blood: developers are problem solvers. We enjoy these challenges. We want to boast about them, write blog posts, give technical talks about how we came up with a technique no one had thought about before.
But when we're paid to build products for users, that's where our focus should be.

So, no! Let that endpoint take its time. No one will care about it but you.


### 4. Is that solution really any different?

What would be a better alternative for your slow code?

Are you sure it will work at all and also be faster than the current one?

And let's say it is indeed faster. Will it scale better? Or would the so-called slower version actually be better once you reached a higher scale?

If you don't come from a computer science background, there's a chance you might not know what [Big-O complexity](http://bigocheatsheet.com/) is. If so, I suggest you read a bit on the subject.

With that theoretical framework, you're able to reason about the complexity of your code in a more abstract way and predict how that would compare against other solutions as the scale of your input increases.

### 5. Is it a good idea in the long run?

From my experience, when you optimize code for performance, you're usually trading off expressiveness.
You know, that thing that allows other developers to understand what you wrote, and build on top of it.

It's not a strict trade-off and there are many exceptions, but often code is either easy to parse by a human or to parse by a machine (read: efficient).

When you shift the balance towards the machine side, you're making it difficult for someone else, or even your future self, to make further changes.

Plus, there's the fact that...

### 6. Your compiler does it better than you

Whenever you try to get clever about an algorithm and come up with a way that *"runs 1 less iteration than the previous version!"*, you should remember that a lot of those same tricks are already built into your computer/interpreter. I already mentioned [division optimizations] above, but there's a whole lot of [built-in optimizations](https://blog.ghaiklor.com/optimizations-tricks-in-v8-d284b6c8b183#.pg8xmg06q) that are doing many of the same tricks that we sometimes go to the trouble of doing manually.

That isn't to say that you should just ignore them at all. This is an evolving field, and compilers are not perfect. But try to measure what you're doing and make sure you're not trading off expressiveness for a useless optimization that looks clever but does the same thing under the hood.

### 7. The DHH way

So your app is slow, it's hurting your users, and you already measured all of this in a pretty stylesheet. Is this the time where you spend a week hunting for those performance bottlenecks?

Hold on just one more minute.

What will the cost of this work be?
Performance auditing is not cheap. Mainly because developers are not cheap. And time spent optimizing is time not spent building new features, or bug-fixing.
Your users also want those.

How about just adding an extra server? Hardware is cheap. Hardware can be turned on & off on-demand. Hardware doesn't even need to be bought. Just spin up a new [Heroku] dyno for now, wait until your post leaves the top of [HackerNews], and turn it off once things cool off.

> Computers are so f*****g cheap. If you run a real business... and you hire programmers at market rate, most computing spends are rounding errors (when it comes to applications of the kind that I build)

**David Heinemeier Hansson, creator of Ruby on Rails**

(quote taken from an interview he gave as part of [The Complete Guide to Rails Performance]).

## So what should I do instead?

As already mentioned above, try to optimize for readability instead and to minimize waste of time.

As your codebase grows, and features get in and out, your knowledge of the domain you're working on also increases. This will allow you to make more informed decisions later on and your changes are more likely to make sense in the long run.

If your code is coupled to some optimization techniques someone did early on, making those changes might prove difficult.

As another teacher of mine used to say:

> Don't do today what you can still do tomorrow. Because tomorrow, you may no longer need it.

## Further reading

If you enjoyed this post, you might also find the following useful:

1. [A code golfing challenge](https://subvisual.co/blog/posts/111-an-exercise-in-futility), where **not** optimizing was actually part of the process
2. [A look into Bloom Filters](https://subvisual.co/blog/posts/96-a-look-into-bloom-filters-with-ruby), a space-efficient probabilistic data structure.


[optimizing divisions behind your back]: https://zneak.github.io/fcd/2017/02/19/divisions.html
[division optimizations]: https://zneak.github.io/fcd/2017/02/19/divisions.html
[CUDA]: http://www.nvidia.com/object/cuda_home_new.html
[cache warm-up]: http://stackoverflow.com/questions/434259/what-is-a-warm-up-cache
[average of all results really a good metric]: https://www.loggly.com/blog/average-poor-metric-measuring-application-performance/
[Skylight]: https://www.skylight.io/
[Pareto Principle]: https://en.wikipedia.org/wiki/Pareto_principle
[The Complete Guide to Rails Performance]: https://www.railsspeed.com/
