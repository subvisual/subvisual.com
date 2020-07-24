---
path: /posts/the-worst-decision-of-my-career/
title: "The Worst Decision Of My Career"
author: gabriel-poca
date: 2020-09-29
tags:
  - development
intro: "A complex system that works is invariably found to have evolved from a simple system that worked. A complex system designed from scratch never works and cannot be patched up to make it work. You have to start over with a working simple system"
---

# The Worst Decision Of My Career

This is a reflection on software development and complexity. Let's start with
some quotes to make me look smart:

> A complex system that works is invariably found to have evolved from a simple
> system that worked. A complex system designed from scratch never works and
> cannot be patched up to make it work. You have to start over with a working
> simple system -- _Gall's law_

I only came across this quote recently, but I think that it summarizes what
I've learned these past seven years.

> Programming in isolation is problem-solving, but software engineering is all
> about managing complexity.

This is an idea that can be found in many books, and the distinction between
programming and software engineering makes sense to me, probably because of my
mental models. I'm sure we can all disagree on this, but that's not the topic
of today. Complexity is.

## Complexity

Almost everyone I know in the software industry wants to build products that
solve real and challenging problems. Change the world! The last thing you want
is to build another CRUD application. They are fine, but it gets boring after
a while.

Most of us will get bored without novelty. That's why the software industry has
a recycling mechanism to keep things fresh and interesting for us: every once
in a while a new, or different, language/framework will rise and light the path
for a brighter future, overthrowing the existing standard, demanding that we
learn it to be on top of the game.

We change our tools, but we keep building the same things over and over. I've
been doing this long enough to see that we are just going in circles. Let's be
honest, most of us aren't building life-changing products that wouldn't have
been possible ten years ago, so let's not jump straight into another shiny
technology that just came out and is going to solve all of our problems.

## Solutions, solutions, solutions

> For a while, the solution to every problem I encountered was a Rails app. --
> _this one is mine_

Over the years, I've seen companies rewrite their products to change languages,
frameworks, or architectures because they were told that the change would make
their product better, run faster, and scale. By the way, you're only a true
Ruby developer after you've heard the question "but does it scale?" at least
one hundred times (kidding, but it'll happen).

Think about it, how many times were you sold a new programming language,
technology, or a concept like microservices, serverless, event sourcing, clean
architecture, micro frontends. There are many preachers in the software world.

At Subvisual, we started using Elixir a lot these past years, so I've learned
a bit about the history of Erlang. If you don't know, Erlang uses the Actor
Model, and the interesting part is that the designers of Erlang only learned
about the Actor Model after having designed Erlang. This is important because
the designers of Erlang didn't start with the intent of applying the Actor
Model; it came as a solution to fault-tolerant distributed programming.

> If all you have is a hammer, everything looks like a nail _Abraham Maslow_

The designers of Erlang picked the right tool for the job and most of us want
to do the same. Unfortunately, there's usually more than one "tool" that would
be "right," but to know which ones, you need to know what "job" you're solving.
All of us **should** know this, but I keep learning about teams that fail to do
it. There are so many companies, with a handful of experienced developers, that
don't know what they are building, don't have a clear business yet, but their
product is already built on complex architectures and technologies such as
microservices, Kubernetes or event-sourcing.

## Improving

Every project we start from scratch is an opportunity to do it right. We'll
think to ourselves: _This time I won't fall into the same traps! I have learned
my lessons, I've studied the books, and I even met some of my gurus that wrote
them! This time I'll follow "industry standards"!_

_I am the "architect"; I will design the perfect system! Without me, none of
this will be possible. Those mindless programmers have no idea what they are
doing. I, and only I, am the true heir of Martin Fowler!_

This was a bit dramatic, but I needed a break from all of that whining. I know
it's easy to fall into these traps. It's even easier when your company raised
money, and everyone is expecting you to deliver the absolute best product ever
because they are paying you for it! This is why your starting team is so
important; they have to withstand the pressure. They must know that to build
the grand vision, they have to go one step at a time.

## The decision

I've made many bad decisions, and I've been fortunate enough to suffer the
consequences of those decisions. A lot of developers don't get to experience
consequences, so they never learn.

So what was the worst decision of my career? I don't know. But the title of
this blog post is inspired by something an old colleague said. At the time, we
were working for a product company that reached for event-driven architecture
and event-sourcing too soon. They knew little about their market, and the
choices the software team made were crippling their ability to change. Business
rules were almost set in stone. Migrating data was a pain and the source of
many bugs. And unfortunately, because the team didn't have experience with
event-sourcing, the event store, which kept the state of all services, was also
being used as an event-bus to communicate between services. Because of that, it
was possible to couple one service to the internal state of another, which
happened a lot. This almost invisible coupling made everything worse.

What did we do against such an unpredictable system? We took it apart: merging
services that were too coupled; defining clear boundaries between services;
moving some services away from the event-store into a traditional database;
making some communication channels synchronous; writing integration and
end-to-end tests.

When we were finished it was still an unnecessarily complex system, but it was
one that we could change with some confidence. After that, we defined
a long-term plan for the product's architecture and technology, but we didn't
implement it. We waited for the right moment when something was starting to
slow us down to make a small step in that direction. When the business goals
changed, we changed our long-term plan, and once again made small steps in that
direction when we felt the need for it.

Eventually, complexity found its way again into the codebase, but it was fine
because the codebase was evolving slowing, adding and removing complexity when
necessary.

## Making the right call

Was that the worst decision of his career? I don't think so. The issue with him
going for event-sourcing and event-driven architecture was that it wasn't the
right moment, but my colleague didn't know that. He thought the goals for the
next years were well defined, but unfortunately, they never are.

Should you use microservices or event-sourcing? Sure, it depends on the context
and the client. The decisions I make are the best that I can with the
information that I have. For instance, when I'm part of the team that's
starting a product, the technology we pick will depend on how we'll hire: if
you want to build an office in Braga, we have to make sure we have developers
for that technology available. We have to think things through, and some things
you only learn from experience. This applies to the systems we design as well.
I've seen enough people design around what they believe the product will become
in two years to know that those designs always fail to accommodate the changes
that will come. So we design systems for small, incremental changes. Do the
smallest thing that will get us started and not compromise our ability to
change once we know what the business needs.
