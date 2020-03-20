---
id: 89
path: /posts/89-stumbling-into-a-product/
title: "Stumbling into a product"
author: luis-zamith
date: 2016-06-22
cover: https://subvisual.s3.amazonaws.com/blog/hero/156/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/156/image@2x.jpg
tags:
  - community
intro: "This is the story of [Shelf](https://getshelf.io/?utm_source=subvisual-blog&utm_medium=blog&utm_campaign=stumble-into-product),"
---

This is the story of [Shelf](https://getshelf.io/?utm_source=subvisual-blog&utm_medium=blog&utm_campaign=stumble-into-product),
a product we just recently launched but has been in the making for almost 3
years now. Why has it taken so long? What was the process to get it into the
wild? Those are the questions I aim to answer with this article, and hopefully
you can draw some inspiration to do something similar in your company.

## The start (October 2013)

As with most products, Shelf started with a pain we felt. At the time we had
just grown from 4 to 7 people and already had a fair amount of books owned by
the company, but that anyone could take home. What eventually started happening
was that we quickly started losing track of who had which books, or an easy way
to check if we had a particular book.

We then decided to build an internal tool to help solve this problem, which was
the beginning of Shelf, at the time called "Bookinc".

From there [Bruno](https://twitter.com/azevedo_252) picked it up and did most of
the foundational work, while me and [Miguel](https://twitter.com/naps62) helped
when we could. In this first incarnation Shelf also served as a good excuse for
Bruno to level up his Rails knowledge as he was starting at Subvisual.

## The first rename (November 2013)

Very early we decided that "Bookinc" was not a great name and changed to
"TheShelf", which made sense at the time, since it was an internal project that
represented the state of our physical book shelf.

It was actively developed on as a breakable toy / internal project until around
April of 2014. There was no one really responsible for it, but was a code base
we used to test all kinds of techniques and to relax a bit after working on
client projects.

## Apprenticeship with Shelf (August 2014)

TheShelf makes its debut as something else other than an internal project in our
first ever apprenticeship. During this 3 month period
[Justo](https://twitter.com/jpjustonunes), then an apprentice but now a
developer here, did a lot of work on it with the supervision of some of the
Subvisual developers. Again this served as an entry point to Rails, that allowed
him to get up to speed with both the technologies we used and how we used them.
Even though this was not all that he did, it was an important piece of "real
world" code that he could work on at will, which proved very important for the
overall success of the program.

## Interviews with Shelf (August 2014 - Present)

Another use we have had for Shelf for a while now is as part of the last stage
in our interview process. This stage is when the candidate comes to our office
to meet everyone as well as for some hands-on coding. Having an internal project
with real features that needed to be implemented, and that we could pair on has
been invaluable for how much we can learn from these pairing sessions.

We have other internal projects that we will now start to use more for this, but
having such a project has proved to be a valuable asset to have.

## Break all the things™ with Shelf (November 2014 - April 2015)

For a few months Shelf was also our go to project to try all the technologies
and techniques we wanted to but couldn't in a client project. We have an API
only version of Shelf with token based auth, along with an AngularJS frontend
that came about when we were starting to use Angular (we've since mostly moved
to React).

It was one of our first experiments with [CSS Architecture](https://subvisual.co/blog/posts/32-our-css-sass-project-architecture-and-styleguide)
where we tried everything from SMACSS to Atomic Design and eventually set on
SUIT CSS.

We also did a [Clean Architecture](https://subvisual.co/blog/posts/20-clean-architecture)
version of Shelf in a hackathon that never really saw the light of day. Pretty
much any crazy idea we had we tested it on Shelf, which was another way it
proved useful since we wouldn't have used in client projects many of the
technologies and techniques we do now if we didn't have a place to safely try
them out.

## Rebirth as a product (January 2016 - Present)

For almost a year TheShelf was a project we used but did pretty much no changes
to. This happened because we had other internal projects and a lot of work,
including a complete [rebranding of our company](https://subvisual.co/blog/posts/58-our-biggest-announcement-yet).

As part of our [winter offsite](https://subvisual.co/blog/posts/77-culture-design) we
decided our [OKRs](https://library.gv.com/how-google-sets-goals-okrs-a1f69b0b72c7#.cmakzbthh)
and one of the objectives for 2016 was to launch a product. That gave me the
idea of productising TheShelf, which couldn't be very hard, right? Well, it
turns out that moving a project from being self hosted and internal to something
you can actually sell to people and let them use without your intervention is
not that easy.

Since January we moved to Heroku, added teams, payments, a landing page,
analytics, a complete redesign and bunch of other small improvements to make it
easier and more pleasant to use. We also renamed it from TheShelf to
[Shelf](https://getshelf.io/?utm_source=subvisual-blog&utm_medium=blog&utm_campaign=stumble-into-product)
since it now represents more than just our book shelf.

## Conclusion

Small internal projects can be used in a lot of different ways, and when they
solve a real problem they can be a really good asset to have. A word of caution
though, do not start too many projects or you might not take any of them to an
interesting state.

Ultimately an internal project can become a product, big or small, that you can
use to practice other types of techniques such as marketing, email writing,
customer support, customer development, etc...

Shelf is a brand new product with a very focused problem it tries to solve, but
we feel it solves that problem pretty well and is getting better every day. Give
it a
[try](https://getshelf.io/?utm_source=subvisual-blog&utm_medium=blog&utm_campaign=stumble-into-product)!
