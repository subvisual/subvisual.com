---
path: /posts/building-utrust-how-to-scale-a-team-and-product
title: Building Utrust And Advice On How To Scale A Product Team
author: gabriel-poca
date: 2022-02-25
intro: "Building Utrust was one of the highlights of my career, and this is an attempt to document some of the key learning from the product and technology team."
---

My coworker [Miguel wrote about Utrust's ICO](https://subvisual.com/blog/posts/large-scale-in-a-rush-utrust-ico) from the point of view of the tech team, and that got me thinking that we did some of our finest work at [Utrust]. It's one of the highlights of my career, and I would love to keep those memories and learnings around for the future. This is my attempt to distill some of the key learning points from the product and technology side that I think can be interesting to others. If there's anything else you would like to know, feel free to [reach out to me on Twitter](https://twitter.com/gabrielgpoca).

**What is Utrust?**

Quick introduction: Utrust is an online payment gateway using cryptocurrencies. It's available in many online stores and marketplaces. It started from an ICO, and it's going full throttle. The main goal of  Utrust is to allow merchants to seamlessly accept crypto payments while buyers can be fully exposed to their ecosystem of choice and be protected by a trusted middleman.

**My role**

I always find it hard to describe my role because, in a small team, we tend to wear many hats. I'm a developer at the core, but my contributions usually go beyond that: hiring, team building, community, product management, devops, etc. But as we hired more people for Utrust, I focused more on our blockchain integrations and infrastructure.

## Using New and Old Technology

Utrust's backend was (primarily) written on Elixir, which was very new at the time. Some of us at [Subvisual] were already familiar with it, and we bet that Elixir would be the best decision for Utrust (Miguel also wrote about this). I'm not sure it was the best decision, but I can say that it was a good one.

At the time, we had been comfortably building with Ruby for many years, and it would have been the safe choice. But Elixir didn't slow us down (quite the opposite), and using it made us happy. Because of that, we could do a better job and hire more talented developers (more on that later). We try to stick to proven technologies, but it's also essential that we try new things.

Node.js also found its way into Utrust: back in 2017, most client libraries for blockchain projects were written in JavaScript. To use anything else meant trusting a third party or trusting ourselves to write that code. We couldn't afford it, so we wrote a small Node.js RPC server in TypeScript to generate blockchain addresses and sign transactions. We had to write some of the typings ourselves because TypeScript wasn't as popular back then. It was a simple solution that I don't remember giving us any headaches. It was deployed as a separate service in a private network.

The point of all of this is: use _simple_, documented, and battle-tested technology. But don't forget that there may be better ways to do things, and you should take small, controlled risks to learn and improve.

## Throwing money at problems

Throwing money at problems is one of our core principles, and we should have it written down on a t-shirt. Throwing money at problems is not about wasting money; it's about buying services instead of hiring (and managing) people. It's cheaper to purchase services than to deploy and manage them ourselves. Your time is likely more valuable than the service you are trying not to pay for. We buy many services: AWS, Datadog, Sentry, Github, CircleCI, etc. This principle is fundamental for the way we work. Hiring and managing a team is much much more expensive than buying services.

Now, there's a point where your company is so big that it's cheaper to hire a team to deploy and manage some services, but it will take you a while to get there.

## Owning your system

The underlying systems of Utrust are a wallet to receive money and a block explorer to verify transactions. The wallet generates addresses for payments and signs transactions to move the funds. The block explorer goes through the transactions in the chains and their mempools, looking for information relevant to the product.

For those interactions, we need to call blockchain nodes. You may be guessing that we paid some service(s) for those, and we did, but we also deployed our own. We forced ourselves to maintain a layer of abstraction to switch between our blockchain nodes and the services we use. It is a tricky job, and the nodes were the source of many headaches, but it helped us sleep at night, knowing that if a service goes down or something happens where they drop us, we could still operate by changing to our nodes.

Reading back on this section, it seems to go against the previous one of **throwing money at problems**, but the key takeaway is that you should **own the most critical pieces of your system**. If you can, have a layer of abstraction that allows you to change services. This isn't always possible, and there's a balance to be found, but keep that in mind because you don't want to be in the hands of services. Their goals are usually not aligned with yours, and they will fail you. I've seen it happen many times.

## Always be deploying

Every team is different, and what works for some may not work for others. I'm not saying that others don't have anything to teach you, but I also have to point out that you shouldn't trust everything others say. I've seen enough companies promote practices that don't even work for them.

If you're curious about what has always worked for me: create small teams, review progress frequently, make sure everyone is accountable. Let teams manage themselves. Don't run sprints. Software development is not sprinting. We need enough time to have meaningful outputs. Don't force people into busy works: estimations, shirt-sizing, etc. Break up your goals into deliverable working packages that can be built in a couple of months. Always be deploying.

If you need something more structured, start with [Shape Up](https://basecamp.com/shapeup) and adjust to your needs.

## Attracting talent

I've found that some people apply to our job openings because they've heard good things about Subvisual. How so? We organize the best conferences [1](https://2016.rubyconf.pt/) [2](https://www.alchemy.com/) [3](https://mirrorconf.com/) and meetups [1](https://www.meetup.com/bragajs/) [2](https://www.meetup.com/braga-blockchain/). We make a huge effort to ensure everyone has an awesome experience, and that matters.

On top of that, we also have partnerships inside the university; we speak at events; we have a summer camp program; an apprenticeship program; and many other moments where we interact with people and make a good impression. We also deliver the best work we can, and our clients help spread the word.

Besides our community, we had two other things in our favor: Elixir and Blockchain. The technologies you use are a marketing tool whether you like it or not. Those two allowed us to attract experienced developers in many countries. There weren't a lot of Blockchain and Elixir jobs at the time, so our pipeline was full of talent. The downside is that we couldn't hire experienced developers in Portugal, but we had decided that the tech team would be remote from the start.

## Building a team

Attracting talent is step one, but the hiring process may be where you lose more people. Answer quickly and provide an excellent experience to applicants. Take controlled risks when hiring and make sure the people you hire align with you and will feel accomplished working with you. Don't skip important steps in the process because a bad hire is more expensive than a missed opportunity.

I could go on about this subject forever, so here's a quick set of ideas to improve how your team works: company retreats are the best thing ever, and you can see a before and after for the team. Try to run two a year. Conferences are also a good opportunity for team members to hang out and build relationships. Try renting an office for a couple of days before and/or after the conference. Encourage people to share and create moments just for that: our Friday Talks have been the stage for many. We even had a talk about bagpipe with a performance in the end. Encouraging people to share will make them feel welcomed and help them get to know each other. Something weird that I found worked great for us was having people taking turns answering/reporting/giving feedback on calls. Instead of asking if anyone has any feedback or anything to say, ask each person the question and wait for the answer. Do this every time, and you'll be surprised: your developers may start convincing their friends to join them.

## Knowing when to leave

Subvisual started to phase out from Utrust in 2019. I was one of the last ones to leave at the beginning of 2020. Miguel stayed for a couple more months. We could have stayed there longer, but, as consultants/partners/investors, our job was done: we built a team that could function without us. Now, two years after we left, [Utrust has been acquired by Elrond][acquired] and I (and everyone at Subvisual) couldn't be prouder of the team at Utrust.

I have to thank everyone I worked with at Utrust for some of the best years in my career.

[utrust]: https://utrust.com/
[Subvisual]: https://subvisual.com/
[acquired]: https://www.coindesk.com/business/2022/01/11/elrond-foundation-acquires-crypto-payments-firm-utrust/
