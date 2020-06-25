---
path: /posts/rebuilding-subvisual-com
title: Rebuilding subvisual.com
author: pedro-costa
date: 2020-06-25
cover: ./dane-deaner-d0AcxMk33is-unsplash.jpg
intro: >
  In the end of 2018 we started working on a rebranding process for Subvisual.
  We grew beyond the identity we coined in 2015, and the brand needed to
  reflect it and our ambition for the future. We now have a story to tell.
---


# Rebuilding subvisual.com

In the end of 2018 we started working on the rebranding process for Subvisual.
We had grown beyond the identity we coined in 2015, and we felt the brand
needed to reflect both that growth and our ambition for the future.
Consequently, that brought along a new website.


## Telling a Story

When envisioning our new brand and website, we wanted it to tell a story. One
that reached deep into our past, but that held well into our future.

When we initially [became Subvisual], we wanted it to show how our work speaks
for us. How we go the extra mile in what we do and look at the smallest details
with the utmost attention. We wanted it to [convey our
craftsmanship][why-subvisual] as a seal of excellence.

> We reach for solutions that seem invisible or impossible for most by sweating
> the most intangible details.
>
> João Ferreira, in ["Why Subvisual?"][why-subvisual]

Five years later, we are now more than just ourselves,
[we][auroradigital.co] [are a][coverflex.com] [universe][finiam.com]
[of][keyruptive.com] [ideas][ondastudio.co] [being][sioslife.com]
[nurtured][utrust.com].

In this universe, we are but a single planet, and a rather small one. This
little planet is just an ambitious dream with a clear end goal: to empower
people, by helping give birth to countless little worlds and helping them grow.

More than show what we can do, we wanted our new website to tell this story.
When visitors reach our site, we want them to see the Subvisual name take the
shape of a small planet that hovers in the space of their browser. As they
scroll through our home page, the little planet follows them around. When they
reach the section where we show our ventures, this little planet spawns one
for each venture in there. And, as they keep scrolling, each planet takes its
stand by its venture. The little Subvisual planet stays on the side, just an
advisor watching them thrive.

As visitors keep scrolling past our ventures, the little planet fills the
screen, as if they zoomed in on our little world. We talk a bit of ourselves
and we show the people that make this world what it is, but that's it. Just as
we are not the stars in our own universe, we don't shine brighter in our own
website. Visitors now know us a bit better, and they know how to reach us. The
rest comes from working together.


## Picking Our Fights

We help make digital products for the Web, and we take pride in what we do. And
although showing our skills was not the main purpose of the website, we wanted
to do something that would make us proud and impress who was getting to know
us.

The idea was simple in theory. We wanted to show the story of the little planet
as visitors scrolled through our website. Which meant going deeper into Web
animations like we never did before.

Back when we were making the first Subvisual website, we went all out to show
our craftsmanship, from the [Bruno]'s animations of [the hero planets] and [the
origami bird], and [Justo]'s animations of [the pop-up buildings], both using
[GSAP's TweenLite library], to [Miguel]'s CSS-only [animated atom]. We invested
weeks in these details so that we could show how good we are.

This time we didn't feel such an effort would pay off. First, because we have
made a name for ourselves. Our clients and partners know how good we are and
their success is our best testimonial. And also, because the Web animations
ecosystem evolved a lot since, while the most our projects pushed us in terms
of animations was accomplished with CSS-only animations. This meant we would
have to reinvest all that effort for little more than bragging rights.

So we dialed back a little, but aimed high. We looked at others for
inspiration, dreamed big, and kept our feet on the ground. We would start
simple and build from there.


## Exploring Gatsby.js

The first version of the Subvisual website was generated using [Middleman], a
static generator in Ruby that hits very close to home for Ruby on Rails
developers. However using modern JavaScript tools to give the website the
dynamism we were aiming for was not trivial with Middleman.

We decided instead to go with [Gatsby.js]. We had already been using Gatsby
for our blog even before it reached version 1.0, and we had big hopes for it.
Not only would it allow us to create the website using React, which is by far
our preferred JavaScript framework, but it also had a plugin system we could
possibly make use of.

Gatsby is now very stable and reliable, but when we started rebuilding the
website we were constantly facing outdated documentation and examples. Another
pebble in our shoes then was having to use GraphQL to gather all the
information required. While we like GraphQL in our APIs, the truth is that it
introduced a whole new barrier where we previously only had to go straight for
a file.

That being said, Gatsby has proven to be an invaluable tool. The component
oriented approach of building the website with React and CSS Modules fitted our
existing approach of building UIs with [SuitCSS]. The generation of static pages
with server-side rendering allowed our website to be made available even where
JavaScript is not, and always blazing fast. And [the rehydration process]
seamlessly brought all the dynamic parts of the website back to life when the
client finishes loading everything.

The documentation has also since been updated, and now contains lots of useful
[recipes] and [guides]. And if there's anything else missing, the [plugin
ecosystem] will either contain an answer to our problems, or an inspiration
from where we can devise our own.


## Down the Animations Rabbit Hole

Gatsby was a major asset getting the first version of the new website done. It
was pretty much only static content, with some built-in goodies on the mix like
lazy-loading images. Now it was time to put some icing on this cake.

Historically the Subvisual team has changed very little over the years. But
when we started this endeavour, Bruno already had one foot out the door. He was
one of our front-end specialists, and was getting ready to embark on a journey
outside the world of programming. So Justo and I had to step up to the plate,
all without dropping the ball on any of our clients.

We went with [React Morph] right from the start. This wasn't an innocent choice
though. The creator, [Bruno Lourenço] from [Ginetta], is a close friend and has
been working with us from some years now. Having seen what React Morph could do
we jumped at the opportunity of it making our lives easier.

First we added the little blue Subvisual planet to the website. Its first stop
was on our why, right at the top of the page. We ended up editing the very font
(with the author's permission of course) and using a version without the tittle
(I learned then that's the name of the dot in an "i"). We then added it on our
venture section (where it would spawn new planets), to the side of our
portfolio (where it would sit and watch the ventures from), and
finally to the _About_ section (where it would become) the background.

And then we had our dreams crushed. Adding React Morph was a breeze, but the
animations were just not performant. As components disappeared in one place
and appeared in another, React Morph did its best to smoothly transition from
one place to the next, but we were just demanding too much of it. Our
animations ended up all "jittered". We knew we were probably being naive, but
we had hoped it would be that simple.

So we stepped back a bit, and decided to be pragmatic. We added the ventures
planets in all the places we wanted them to stop, and made the planets hover
randomly in their spots. This alone brought life to the website. We launched
it, quietly, on the night of our 7th anniversary.

Over the next months Justo fought hard to get a performant [splash screen],
while I fought my way to get our blog back from limbo. Completely unrelated, I
still believe, on October Justo announced he was leaving the company. We
reached out to our ventures and recruited [Francisco Sousa] from
[Aurora Digital][auroradigital.co] (at the time) who has since finished Justo's
masterpiece and added a beautiful animation to the hero text.


## The Aftermath

It has been over a year since we launched this new side of our brand, but it is
still too soon to feel the ripples coming back. Those closest to us saw us
grow, so they don't see any difference. But to the rest of the world we need to
show we are now a venture studio. We want to help nurture the ideas that will
empower people to change their world.

Our craftsmanship is not going away though. We'll help our ventures thrive by
being the best we can at designing and developing digital products. But now we
have a lot more experience and expertise added to our skills and curiosity.

I've told you the story we want to tell, but at the time I'm writing this you
will notice that the story of the little planet is still not complete. To this
day it is still waiting for someone better than me to make it travel among the
stars. [Are you up for the challenge?][hiring-a-front-end-developer]


[became Subvisual]: https://subvisual.com/blog/posts/58-our-biggest-announcement-yet/
[why-subvisual]: https://subvisual.com/blog/posts/59-why-subvisual/
[auroradigital.co]: https://auroradigital.co
[coverflex.com]: https://www.coverflex.com/
[finiam.com]: https://www.finiam.com/
[keyruptive.com]: https://keyruptive.com/
[ondastudio.co]: https://ondastudio.co
[sioslife.com]: https://sioslife.com/
[utrust.com]: https://utrust.com/
[Bruno]: https://twitter.com/azevedo_252
[the hero planets]: https://codepen.io/azevedo-252/pen/RPQvmd
[the origami bird]: https://codepen.io/azevedo-252/pen/rVvMXX
[Justo]: https://twitter.com/jpjustonunes
[the pop-up buildings]: https://codepen.io/joaojusto/pen/ZGrPKv
[GSAP's TweenLite library]: https://greensock.com/tweenlite
[Miguel]: https://twitter.com/naps62
[animated atom]: https://codepen.io/naps62/pen/MwVRXZ
[Middleman]: https://middlemanapp.com/
[Gatsby.js]: https://www.gatsbyjs.org
[SuitCSS]: https://suitcss.github.io/
[the rehydration process]: https://www.gatsbyjs.org/docs/adding-app-and-website-functionality/#how-hydration-makes-apps-possible
[recipes]: https://www.gatsbyjs.org/docs/recipes/
[guides]: https://www.gatsbyjs.org/docs/guides/
[plugin ecosystem]: https://www.gatsbyjs.org/plugins/
[React Morph]: https://github.com/brunnolou/react-morph
[Bruno Lourenço]: https://twitter.com/brunnolou
[Ginetta]: https://ginetta.net/
[splash screen]: https://en.wikipedia.org/wiki/Splash_screen
[Francisco Sousa]: https://twitter.com/goodxicosousa
[hiring-a-front-end-developer]: https://subvisual.com/blog/posts/146-subvisual-is-hiring-a-frontend-developer/
