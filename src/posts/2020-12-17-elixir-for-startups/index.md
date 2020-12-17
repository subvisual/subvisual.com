---
path: /posts/elixir-for-startups/
title: Elixir for Startups
author: miguel-palhas
date: 2020-12-17
seoImage: ./seo.png
tags:
  - development
  - elixir
intro: >
  We believe that Elixir is more than capable of providing the same agility
  as Ruby for new teams, while also laying the foundation for a highly scalable
  system.
---

We started out as a consultancy company, working mainly with [Ruby on
Rails](https://rubyonrails.org/).

Ruby is an awesome tool for getting things off the ground quickly. A lot of
now-huge startups, such as Twitter, GitHub and Shopify, [made their first
steps](https://www.nopio.com/blog/ruby-on-rails-startups/) with it. There's a
lot of reasons for that, both related to the practicality of the language, and
the community itself.

However, in recent years, along with a sizable part of that community, we've
been moving more and more towards [Elixir](https://elixir-lang.org/) and
[Phoenix](https://www.phoenixframework.org/). It started out with a few pet
projects and quickly grew to become the main backend language used at Subvisual.

We now believe that Elixir is more than capable of providing the same agility
as Ruby for new teams, while also laying the foundation for a highly scalable
system. This post is a summary of the beliefs we acquired over this time and
why we believe Elixir is a great tool for Startups.

![Banner](./banner.png)

## What is a Startup?

There's often not a single definition of this, but for the
purposes of this post we'll go with a more general definition which fits most
of the products & teams we have had a chance to work with in recent years:
- A small team. Could just be a couple of developers, or an entrepreneur
  looking for someone to help to  bring their  idea to life;
- Cross functional roles. Since the team starts out so small, people often need
  to wear many hats;
- Quick to adapt and pivot. A startup shouldn't get too attached to a failed
  idea. If they get evidence that they're going in the wrong direction they
  should be able to pivot quickly.

This is opposed to more established companies where both the people and the
goals are already a lot more static and not likely to change dramatically in
the near future.


## What is Elixir?

Elixir is a modern programming language, created by [Jose
Valim](https://twitter.com/josevalim), a former Ruby and Rails contributor. It
tries to provide the best of two worlds: readability and a strong, welcoming
community (famous Ruby traits), with highly-scalable distributed systems
technology.

Ruby itself has many benefits that are attractive to startups. The community is
considered one of the best out there, meaning that help is there for whoever
needs it. The language itself and the tooling around it, are built with
developer happiness and agility in mind. It's often easy and fast to build
something from scratch, making it a perfect language for quickly putting
together a Minimum Viable Product for your idea.

All of those benefits translate very nicely into Elixir as well.


## Elixir for Startups

Let's now explore some pros and cons of the Elixir ecosystem under the lens of
a Startup's common needs. Let's get started with the drawbacks.

### Drawbacks of using Elixir

Like any other technology, Elixir is not a silver bullet. We believe it's
important to acknowledge this upfront, and consider some of the drawbacks it
can bring along.

In our view, most of these are a consequence of Elixir's young age. Most
notably, the lack of existing resources & libraries, as well as the lack of a
huge community to ask questions to, although the one that does exist is very
helpful and responsive.

Elixir's first version was released in 2011, and the Phoenix web framework was
first released in 2014. For comparison, Ruby was first released in 1995, and
Ruby on Rails in 2004.

Similar comparisons could also be made with other well established frameworks
(e.g.: Django, ASP.NET), which would just reinforce the point: the Elixir
ecosystem is pretty recent. However, it's important to note that Elixir works
on top of a battle-tested virtual machine called BEAM, which has been around
since the 80s and powers a lot of the telecommunications around the world,
including products like WhatsApp.

The novelty of Elixir is often a selling point for developers looking for a
shiny new toy (which is more common than most would like to admit), we,
however, consider this to be a drawback, as it can definitely make things more
difficult.

A second but related issue is the talent pool. Elixir can still be considered a
niche language even when it comes to developers. There are a few community
pockets (e.g.: Central and Eastern Europe have a rather strong community), but
outside of those it can sometimes be a challenge to find experienced
developers.


### Advantages


#### The community

Even before getting into the technical aspects, one of the main selling points
is the community itself. A lot of this comes from its close history with Ruby,
where many Elixir developers came from (even the creator himself).

The Elixir community is small but it is one of the most welcoming out there and
is always working towards improving and growing the ecosystem. As a Startup,
this can be especially important so that your development team doesn't feel it
is fighting an uphill battle. The Elixir Forum is a great place where you can
find and offer support to fellow Elixir developers.


#### Recruiting

Might seem contradictory given we just mentioned how small the
talent pool is, but the truth is, a smaller talent pool also means that
whatever talent you find is more likely to be deeply interested in the
technology. If you're willing to have a couple of junior spots, you'll find
that a lot of developers are receptive to giving it a go even if they don't
have much experience with it. 

Even senior developers coming from other ecosystems will find that the learning
curve is not as hard as it may seem, since it borrows a lot from many previous
technologies and the official documentation is excellent. 

In our experience this allows you to get top level talent without having to
overpay, since the opportunity to work with these technologies and in an
innovative environment is many times good enough.

Remember that the similarities in style to Ruby and in structure to Erlang
allow you more or less easily hire from those communities as well, which
broadens the spectrum quite a bit.


#### Operations

[Docker](https://www.docker.com/) containers are currently the preferred
approach by most communities to package and deploy software, and that's no
exception in Elixir. That approach completely abstracts your software from the
infrastructure it's running on, meaning it is now straightforward to deploy any
individual stack, without having to worry about its runtime details.

What this means for your business is that your infrastructure work becomes much
easier, and decoupled from whichever hosting solution you're using. Migrating
to a new cloud provider is a much easier job now than it was a few years ago.
What this all means is that your monthly bill and time spent on maintenance can
be greatly reduced if you're doing things in "the Elixir way".

But there are additional features you can leverage in addition to, or instead
of, containers.

[Erlang](https://www.erlang.org/), the underlying system, was built for
large-scale, real-time, telecommunications infrastructures. It was built to
handle distribution and scalability with ease. Those advantages are available in
Elixir as well, should you need them. In practical terms this means delaying or
completely foregoing the decision of using systems for intercommunication
reasons, such as Redis, Kubernetes or Kafka.


#### Distribution

With a single small Elixir node, you can already go a long way.  And that's
often how a product will start. But should the need arise to scale up your
business, there's many ways we can scale the technology, and Elixir plays
nicely and safely with most of them.

Sometimes, the sensible solution is to split your application into separate
individual nodes, which then communicate over a network. In most stacks, this
requires huge amounts of work to re-architect the software. Elixir, due to
being built with distributed communication in mind, allows this migration to be
performed a lot more seamlessly. You can move towards a microservices approach,
without much of the infrastructure and overhead costs that are usually inherent
to that. This allows you to delay that decision until it becomes a real
necessity, rather than trying to cover that overhead from the start, which can
be a big shot in the foot.


#### Resilience

Another important aspect of Elixir/Erlang philosophy is the assumption that, at
some point, something will go wrong. Instead of trying to prevent errors, the
focus is on minimizing their impact, and recovering as quickly as possible.

Every layer of the system is designed to crash and restart quickly, resuming
its work right away. This reduces the need for tools that are often used to
achieve similar effects at the infrastructure level, resulting in a much
simpler system overall.

Although we feel this is a good approach, it's one that will not come to you
naturally if you come from other backgrounds. That's why it's very important to
understand how the OTP works and when and why to use processes in Elixir.


#### What option should I go with?

Ultimately, Elixir also allows you to start small, in a more traditional
containerized approach, but provides an easy path to migrate to a more custom
solution should the need arise, without having to re-do your whole
technological approach.

There might be specific requirements we need to tackle right away, but as a
rule of thumb, less is more. Since the overhead in shaping the system
differently is not as high as other technologies, you are even more encouraged
to not commit to those decisions right away.


## Should I use Elixir on my next Startup?

This is ultimately a choice only you and your team can make and do not take a
team's preference lightly. Developers that enjoy the technologies they are
using will be more productive.

That being said, Elixir is a great fit for most startup scenarios since it
comes with a lot of tools out of the box, allowing you to build the first
version of your app without any external tool.

For example, background jobs (even if only for email sending) is something that
we see in all applications we build and is something that we would usually
handle with a tool like Redis. However, since running separate processes is
kind of the bread and butter of Elixir, you don't need that extra dependency.
Less things to run, less things to pay for (if you're using Heroku, for
example). You'll still use libraries to speed up your development, but it
simplifies development and deployment.

Another benefit of this ‘batteries included' approach is that it allows you to
easily experiment and change things as you learn, but since the BEAM (the VM
behind Elixir) was designed for consistent and predictable performance, there
is no need to completely re-architect everything in order to grow. Elixir
scales very very well.

Lastly, the bar to make an impact in the community is lower, as it is smaller,
giving you a good opportunity to increase your employer brand, which in turn
can attract even better talent.

In conclusion, technology choices will not (for the most part) dictate the
success or failure of your startup, however, when building a web based product,
we feel like the Elixir/Phoenix combination is a powerful one that can give you
an edge over your competitors. Above all, we hope that this article gives you
the confidence to try it out and if you end up liking it enough to start your
new project with it, let us know, we might be able to help you or at least
cheer you on on your journey!
