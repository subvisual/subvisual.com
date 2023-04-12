---
path: /your-tech-stack-matters/
title: "Your tech stack matters"
author: luis-zamith
date: 2020-07-03
tags:
  - development
intro: Your about to start building a digital product? Here's some consideration to consider before defining your tech stack.
---

There's a common idea that when building a digital product, particularly online,
all tech stacks are created equally and regardless of what you choose you'll
live or die on something else. I believe this to be blatantly untrue, but maybe
not for the reasons you're thinking.

Here's the gist of it:

1. Some tech stacks add boilerplate, impeding rapid learning
2. More moving pieces equals more headaches
3. What your team is excited about matters
4. There are no silver bullets

This should be enough to give an idea of what I'm talking about, but let's dig a
bit deeper into each of these points. A disclaimer before we get going though,
this is my personal point of view and it sure has a lot of controversial ideas,
however after many years in the business of creating products I belive them to
be true. Proceed at your own peril.

## Some tech stacks add boilerplate, impeding rapid learning

Let's start looking at this from the programming language angle. You can build
anything with pretty much any programming language, as long as it is Turing
complete, but there are languages that are a better fit for different types of
jobs. I personally don't think that the language itself is going to be the
biggest pain, but you get what you paid for. I wouldn't recommend that you start
your business using COBOL, as I wouldn't recommend that you start it in Java
either, but it does boil down to personal preference.

Where I think it starts to really matter is when it comes to productivity and
even more importantly, speed of change. Full disclosure, I'm a big fan of both Ruby
and Elixir, and by extension have used Rails and Phoenix a lot. However, even
with all its know issues, Rails is still a huge productivity boost that I would
be remiss not to recommend. As Ryan Singer (Head of Strategy at Basecamp) puts
it "it's a 10x multipler for them".

Phoenix is great in a lot of ways, but not as malleable as Rails, which in all
honesty is all you should care about when you're still trying to figure out what
your product should do. That's the main reason I am not a fan of "batteries not
included" type of frameworks like Sinatra in Ruby or Express in JS, which trick
you into thinking you're better off starting small with something that is not
"bloated", but ultimately make you reimplement pretty much everything (or import
it via libraries many times not controlled by the core team).

You don't have to choose Rails. There are technical downsides too, like memory
usage or being late to the interactive apps game (mitigated by webpacker,
ActionCable and Stymulus), but when starting an online product prioritise for
batteries included and easy to change, because trust me, you will change, a lot.

## More moving pieces equals more headaches

Having way more parts to a tech stack than what you really need to validate your
product in the market, is something I see time and time again in the wild. It
usually boils down to two things:

1. Developer overexcitement
2. Mimicking large companies

Don't get me wrong, developers being excited about things is not bad, but we
tend to get overexcited with the shiny new toy. It's very common to see huge
adoption of new technologies, hundreds of blog posts about how they moving from
technology X to Y was so awesome, only to never hear about it again in a few
months, while those teams now have to maintain that codebase as it becomes
apparent that the grass is not greener anymore.

The bigger issue is when small companies try to do what large companies are
doing. Please, just stop! The one competitive advantage you have as a small
company is that you are small, you are agile, can pivot quickly, don't throw
that away. For me the corolary of this are Single Page Application (SPAs),
there's no good reason for the vast majority of new products to do it, yet it is
now extremely prevalent. Think of Conway's Law:

>  Any organization that designs a system (defined broadly) will produce a
>  design whose structure is a copy of the organization's communication
>  structure.

For a large company, with many different teams and departments, communication
across them is hard, therefore they design a system that makes that
communication hard as well. In this case, you have a Front End application that
only talks to the Back End via a well defined API (contract) and changes to that
contracts must be agreed upon by both parties. Moreover, both parties will
implements their own state management, routing, translations and even data
validations. Obviously there are ways to make these things less obvious and
(debatably) less painful, but as a small company, why go there in the first
place?

Again, I advocate for easy to change here, because remember that's what we are
prioritising. If you really need the interactivity in the client, which is a
resonable argument to make, use something like PJAX, Stymulus or LiveView (there
are likely others), which allows you to handle mostly everything from your server
and remove the duplication of routing, state management, etc. You do lose the
ability to have the app work offline, which, let's face it, is a fringe scenario
anyway and in most (if not all) cases not relevant at this stage.

Every line of code is a potential bug, the ideal system does all you want with
zero lines of code, therefore you want to minimize the amount of code needed to
achieve your goals. Not using a Front End framework is a good start, but it can
go to infrastructure too. Why not get rid of Docker, Kubernetes, Kafka,
Tensorflow, and so on? All of these tools have a time and a place to
be used, don't get me wrong, I just think it shouldn't be top of mind for the great
majority of products just getting started.

Ah, and for those that took my ideal system to be a serverless one, that's
simply moving lines of code from a place under your control to a place you don't
control. That's not ideal at all, especially if your core business is that
system. Same with no-code platforms, for that matter. I'm sure you can build
things quickly, but I'm personally a bit reluctant of being overly dependent on
any platform (it's impossible not to be somewhat dependent though).

## What your team is excited about matters

This one should be a no brainer, but sometimes it doesn't seem that way. Having
a team that's excited to work on a product is probably the most important factor
to take into consideration. For example, if you consider Java, Python or Ruby to
be the safe bets, but your team is super excited about building the product in
Elixir, have a conversation with them and try to understand why. It's possible
(likely?) that they're falling into the overexcitement mentioned above, but
there's also the chance that it really is a good technology for your company and
a huge morale and productivity boost.

Obviously there are other considerations in play here, you might want to use a
certain technology because it attracts investors (such as Blockchain a few years
ago, or Machine Learning and AI) or you might think it's hard to hire more
people if the technology you choose is too niche (I usually don't agree, but
I'll write about it later).

Ultimately, a happy team is a productive team, a happy team welcomes change, a
"going through the motions" team dreads it. Remember, we are optimizing for ease
of change.

## There are no silver bullets

I believe deeply in all that I said so far, but I also believe that there is no
true answer and you'll learn a lot as you go along. Regardless, if you know
where your priorities lie, and I'm arguing they should start on ease of change,
it makes these decisions that much easier and straightforward.

Moreover, I hope I was able to convince you that your tech stack in and of
itself is not that important, and only matters as long as it allows you to stay
nimble and adapt quickly. That won't guarantee success, but allied with a
willingness to experiment and learn will increase your odds tremendously.
