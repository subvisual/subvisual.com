---
path: /posts/large-scale-in-a-rush-utrust-ico
title: "Large-scale in a rush: The Utrust ICO"
author: miguel-palhas
date: 2021-04-23
tags:
  - general
  - elixir
  - blockchain
intro: >
    This is the story of how we ended up with an unrealistic time-frame to launch
    a platform, of the decisions we made along the way, and fortunately, of how it
    all turned out really well.
seoImage: ./meta.png
---

This is the story of how we ended up with an unrealistic time-frame to launch
a platform, of the decisions we made along the way, and fortunately, of how it
all turned out really well.

[Utrust](https://utrust.com) is one of Subvisual's biggest success cases. I'm measuring success here
not just from a financial perspective, but also from the product development and
startup creation point of view.

We started with nothing but a couple of founders with an idea. We invested a lot
of our resources into building not just a functional and scalable product, but
also an entire team, which has since taken over the entire thing.

Our hands-on work at Utrust is pretty much over. I was there from the start
until the end of our contribution. And recently I was reminded of a few of the
stories of how it all started. So this is not the usual post-mortem post about
all the bad decisions we made. Surprisingly enough, it's about how most of them
were actually good ones, in retrospect!

## It started with an ICO

If you're out of the loop when it comes to cryptocurrencies: an ICO, or Initial
Coin Offering, was all the rage in 2017. Companies would launch an ICO as a way
to crowdfund their proposed projects. In return, investors would receive tokens,
with the hopes of selling them for a larger price once the project reached its
goals, or using them for special benefits within the platform that was to be
built.

Now, this all may sound a bit fishy to you, and you're not alone. I have my own
thoughts about a lot of the financial aspects, and most of all, the amount of
vaporware and opportunism that was taking place at the time. Fortunately, we
were way above that.

## On the legal side of it all

I know our team had similar feelings, and that's probably why one of Utrust's
core principles from the start, was to go through the entire process in a fully
transparent and legally sound way. In a market filled by 90% noise and scam
projects, we wanted to be different.

And we honestly would have refused to do it in any other way.

This included things such as: registering the business in Switzerland, where
cryptocurrency companies had, at the time, a much better legal infrastructure
than other countries; Ensuring all investments were done in a regulated manner,
by enforcing a KYC process on every investor. And paying attention to the
community, to make the whole process easy for them, as well as look out for
potential issues or bad actors.

As it turns out, history benefited the good guys here. Other ICOs that happened
around the same time, but didn't follow such a strict protocol went as far as
having all their funds freezed. And the community also seemed to appreciate our
efforts.

But enough about legal-speak. The focus of this post is the tech...

## Rushing to production

The ICO was split into two separate events: an initial and smaller pre-ICO, with
a limited amount of tokens available for a smaller price, and then a main event
2 months later.

Looking now at the Github log, the first line of code was committed almost
exactly a month before the launch date. But this was simply a static webpage
that would serve marketing purposes to build.

There was a lot of "real tech" that had to be developed in time for the pre-ICO:

### Receiving transactions

We needed the ability to receive and identify blockchain transactions (commonly
in Ethereum, but we also wanted to support Bitcoin).

Using Ethereum meant you could deploy a smart contract that would automatically
detect and process incoming transactions. However, since we wanted Bitcoin as
well, that wasn't an option. So we opted for generating regular crypto wallets,
and assigning them uniquely to each new user.

But generating them dynamically (using an HDWallet or some other similar
process) was way beyond my knowledge at the time. In the spirit of "fake it till
you make it", I ended up generating 200.000 wallets and uploading them to the
database one day before going live.

That solved only part of the problem.

### Monitoring blockchains

We still needed to interact with blockchains, and to say that we didn't know how
to would be an understatement.

There's a lot of unintuitive concepts one needs to understand when querying
a blockchain node, such as the fact that what you read from it [might not be
final](https://medium.com/utrust/blockchain-immutability-823e1f3983eb).
Or even worse, the fact that a lot of the tooling and 3rd party services were
still in early stages, and suffered from bugs, poor support, and all the usual
nightmares a developer can face.

Here's an excerpt from an email thread from 2018, a full 5 months after the ICO
had happened, where we were still running into critical bugs:

![bug report email thread](./screenshot.png)

### Keeping things safe

This was by far my biggest source of anxiety for a full year. We were going to
receive millions of dollars, and store them in a bunch of private keys. This is
an uncomfortable responsibility, to say the least.

The entire process around generating and storing those keys was our \#1 concern.
We didn't know how others were doing it, but we had a baseline of what we
wanted.

When generating those 200.000 wallets for our investors, we had to do it
completely offline, on a clean computer.

The process was a bit more ad-hoc than I would have liked, but given the time
constraints it worked perfectly: I used my own laptop, booting a LiveCD (no
access to my disk, or to the internet. Everything ran in memory). I then ran
a Docker image that had been tested obsessively over the previous week. Out of
that image came two outputs:

- Thousands of public blockchain addresses, in a text file ready for me to upload;
- GPG-encrypted archives, using keys from 4 members of our team, where all the
blockchain private keys were, in such a way that we'd need at least two of the
four GPG keys in order to decrypt the data.

I sometimes joke that I went home after the ICO with a USB stick containing
millions of dollars. In reality, I couldn't have done anything with it, as my
key alone wasn't enough to access anything.  There was no single point of
failure.

## Launching at scale

There was an additional difficulty that isn't as common in new product launches.

There was a lot of demand for crypto investment opportunities at the time,
particularly ICOs. And the heavy marketing efforts we did surely helped as well.
So we were expecting most of the server load to show up as a very short burst in
the launch hour, rather than something that would grow organically.

We were aiming for a magnitude of 20000 users within the first few minutes (an
educated guess from watching how similar projects progressed).

That meant a lot of extra risk. Not only was our system supposed to handle that
from the very beginning, it also meant that any launch-day bugs would have
a much bigger impact, maybe even a business-breaking one. So many things could
have gone wrong, and a few really did.

## Adopting new tech

What ended up being the main solution for the scale problem was our tech stack
choice.

We have always been a Ruby/Rails team. However, purely by coincidence, Utrust
came along around the same time we were learning more about Elixir.

We had previously discussed that we were ready to take on real projects with it,
and Utrust happened to be the first one.

To this day, a lot of us still recall this shift from Ruby to Elixir as the
smoothest tech stack change we ever had. Most other things (from CSS frameworks
to project management platforms) often ended up bringing more problems than
solutions. Elixir allowed us to keep the flexibility of Ruby, and add to it the
scalability and distributed nature of Erlang.

The community was still growing, and some tooling was lacking. But we also found
nifty tricks to keep a single project scalable, that Elixir allowed us to
implement in elegant ways. One example is how we later [found a way to mix multiple Phoenix servers in a single process](https://naps62.com/posts/routing-in-phoenix-umbrella-apps/),
instead of starting directly with a multi-repo approach, which is something our
team had very strong feelings against.

I'm one of those guys that hates the whole "Ruby does not scale" idea (and
[Nate Berkopec's blog](https://www.speedshop.co/blog/) is a great
resource if you need to find out why). But it definitely would have given us
a few more potential points of worry work if we were to consider such a high
amount of load from the beginning.

In hindsight, looking at our server metrics after launch-day was the biggest
validator for this decision. We hadn\'t worried about performance at all (we
didn't have time to), yet each request went through our server like hot butter.

**But on the flip side...**

Not all of our tech stack choices turned out so well. For instance, we had some
weird problems with Websockets. We went with [Phoenix
Channels](https://hexdocs.pm/phoenix/channels.html) to make the UI as
responsive as possible without much effort, and to minimize server load. Soon
after launch, we got complaints that the UI wasn't responding at all. So there
we were, 10 minutes after launch, hotfixing the code to use HTTP instead, and
deploy to production right during the critical peak. I'm still astonished that
this worked.

And I still have nightmares about deleting production data by mistake, minutes
before launch. Never again will I [mix up my local console with the production
one](https://subvisual.com/blog/posts/elixir-console-safety-first).  No
critical data was deleted, and Heroku's automatic backups meant we would only
lose a few minutes to properly restore everything.

## Throwing money at big-tech for help

The spike we were expecting also allowed us to do some additional preventive
measures that are usually not in reach when you're starting a product with no
funding yet. Since we only needed to ensure that that small time frame was
smooth, we could bump up all the bells and whistles that our infrastructure
would allow us to.

What would once demand yearly contracts, or time-consuming learning and
configuration processes, can nowadays be done with the simple click of a button.
Using Heroku, we could turn up all the relevant sliders, and ensure we were
using a large instance, and a high-speed PostgreSQL instance.

Sure, pricing in Heroku scales easily, but we would quickly scale back down
a few days later, so the overall impact in costs was manageable.

Similarly, we also turned to Cloudflare for help. A common theme with ICOs was
the amount of DoS and phishing attacks that happened constantly. Someone would
put up a shady-looking clone of your website online, with their own Ethereum
address on full display, in the hopes of having people send their funds to them
instead.

It happened way more often than you'd expect. To protect both our users and the
viability of our own ICO, we contracted the Cloudflare Enterprise plan for
3 months, which is the shortest timeframe they offer.

It sure as hell worth the price. We ended up needing it more than initially
planned, since we were victims of several fake websites, as well as few DDoS
attacks.

I must also say that getting access to a 24/7 support number to which I could
call on a Saturday morning, and ask for a scam website to be shut down, was
actually pretty fun.

## Impostor Syndrome

On a more personal note, It also feels important to mention that despite all the
technical challenges that were ahead, me and the rest of the team knew next to
nothing about a lot of these technologies when all this started.

I had worked on a couple of small Bitcoin projects, but always using a 3rd party
API. I had never worked with the blockchain itself, much less multiple ones.
I had no idea how smart contracts worked.

So I got to work, and learned as quickly as possible.

A few months later, I was in charge of coordinating the deployment of our own
smart contract (the Utrust ERC20 token), and I had become "the blockchain guy"
at the office, to which everyone turned to for input over the next 3 years.
Similarly, people in other areas, from front-end to marketing and business, had
to struggle and learn about a world that felt a bit alien at first.

**Overall, it was one amazing learning experience for everyone involved.**

And if there's one thing I took from this whole story, it's that our team is
great at just figuring things under pressure. There's actually a portuguese word
for this, with no direct english translation that I know of:

"Desenrascar"

> to pull a 'MacGyver'. The art of slapping together a solution to a problem at
> the last minute, with no advanced planning and no resources.

*"He portuguesed himself out of that situation."*
