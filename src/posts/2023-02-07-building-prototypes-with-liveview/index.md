---
path: /posts/building-prototypes-with-liveview
title: "Building quick prototypes with Phoenix LiveView and Tailwind"
author: luis-zamith
date: 2023-02-07
cover:
seoImage:
intro: "Quick prototyping plays a vital role in the development process of new
projects. It allows for quicker iterations and faster learning, enabling
developers to make changes and refine their ideas quickly. We have been
exploring a new technology stack that includes Elixir, Phoenix, LiveView,
Surface, and Tailwind for rapid prototyping."
---


Quick prototyping plays a vital role in the development process of new projects.
It allows for quicker iterations and faster learning, enabling developers to
make changes and refine their ideas quickly. When building prototypes, it is
often necessary to make trade-offs such as sacrificing security or scalability
in favor of speed and agility. This means that the focus is on being able to
make changes quickly, from the frontend and design to the database structure,
without having to worry about certain constraints.

We at Subvsiual are long time fans of Ruby on Rails for prototyping. Over the
years, the we've seen success in using Rails for this purpose. However, in an
effort to continuously innovate and improve, we have been exploring a new
technology stack that includes [Elixir](https://elixir-lang.org/),
[Phoenix](https://www.phoenixframework.org/),
[LiveView](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html),
[Surface](https://surface-ui.org/), and [Tailwind](https://tailwindcss.com/).
This new stack offers new possibilities for rapid prototyping and I'm personally
very excited to see what results it will yield.

##  Why Elixir and Phoenix?

As upstanding Ruby developers, we've been keeping an eye on Elixir for a few
years now, especially since we do a lot of web development and Phoenix is a
interesting web framework, when put together with Elixir's Actor Model. While
there are many resources available that explain what each of these technologies
is, I don't want to go into too much detail here.

One of my main concerns when considering a switch from Ruby on Rails to Elixir
was how Ecto, the Elixir equivalent of ActiveRecord, would compare, mainly in
terms of ease of use. Ecto has many benefits, but I found it to be more verbose
than its Ruby on Rails counterpart. However, I was pleasantly surprised to find
that updating the schema and adding migrations was relatively straightforward.
The only challenging part was keeping the context module updated with functions
that made working with Ecto smoother.

## Are LiveViews really that cool?

The short answer is yes, if that's enough for you, move on to the next section.
For those that decided to stay, LiveViews are a unique feature of Phoenix that
provide a way to create rich, real-time user experiences in web applications.
This is made possible by leveraging Phoenix's Channels, a websocket wrapper, and
the underlying understanding of Elixir processes. While LiveViews share some
similarities with React, such as the ability to have a LiveView with co-located
templates and the capability to re-render the relevant parts upon updates to the
socket variables, there are significant differences. One key difference is that
the updates happen through websockets and require minimal to no JavaScript
coding, as the LiveView runs on the server side, giving direct access to all the
code and data without the need for an API. Choosing to use LiveViews over other
approaches has its tradeoffs, but in the context of prototyping speed, the
absence of an API makes it a clear choice.

Moreover, as LiveViews continue to evolve, there have been new concepts such as
LiveComponents or Components that aim to improve usability and reusability,
similar to React components. Depending on the specifics of what you're building,
you may choose to break it down into components or not. However, in general,
breaking it down into components can provide benefits, even though the
ergonomics of doing so with LiveViews have been improving over time, I still
believe that LiveViews can be further improved and this is where Surface comes
in.

### Surface

Surface is a tool that can be used to enhance the experience of working with
LiveViews in Phoenix. It positions itself as a server-side rendering component
library for Phoenix, but it can also be thought of as a layer that adds extra
functionality and convenience to LiveView. The developers behind Surface have
been working hard to make the experience of using LiveViews as smooth as
possible, especially for those who have prior experience with React or similar
frontend frameworks. Over the past few years, the work done by Surface has had a
significant impact on the evolution of LiveView and Phoenix, making the platform
more accessible and user-friendly.

While it is possible to achieve similar development speeds with just LiveView, I
personally prefer the added benefits that Surface offers. These benefits include
static validations on component properties, and event handling at the component
level instead of the parent view. Whether or not to use Surface is a debatable
topic and ultimately comes down to personal preference and the specific needs of
the project being developed.

## Styling with Tailwind

Tailwind provides a set of pre-designed, ready-to-use CSS classes that can be
quickly and easily applied to HTML elements. There have been countless debates
about this approach to CSS compared to others, and while I won't delve into that
discussion here, it's worth noting that in the context of rapid prototyping, I
believe it saves time and effort compared to writing custom CSS from scratch,
and helps ensure a consistent look and feel across a website or application. In
addition, Tailwind's utility-first approach prioritizes functional styles, such
as positioning and spacing, over visual styles, like colors and fonts, making it
easier to create quick prototypes and make changes on the fly.

While the increased verbosity of the HTML files may be a concern, I actually
think it makes the code easier to manage and maintain. The styling is tightly
integrated with the markup, so there are no separate CSS files to keep track of.
This also makes it easier to make changes to the look and feel of the site, as
you can see the effects of your modifications right in the HTML code.

Another advantage of Tailwind is its straightforward integration with Phoenix.
With the library available to help set everything up, you can have Tailwind
integrated into your Phoenix project in no time. This saves you the hassle of
having to manually configure and manage the CSS framework, and lets you focus on
building the core functionality of your application.

Overall, Tailwind's utility-first approach and easy integration with Phoenix
make it a valuable tool for rapid prototyping and efficient web development.

## Conclusion

The purpose of this article is to introduce a tech stack for quick prototyping
that may be new or unfamiliar to you. This is especially relevant for those with
experience in Elixir, who want to simplify the process by avoiding the
complexity of a frontend framework. The proposed tech stack is also beneficial
for small teams who are working on the same repository or project, as it
minimizes the number of components and files that need to be modified when
changes are required.

In addition to proposing a tech stack, this article aims to raise awareness
about the underutilized potential of prototyping as a tool for product
development. It's important to note that there is no mention of automated tests,
as I believe that in this context, these should only be used when they
contribute to a better understanding of the work at hand. Automated tests should
not be a goal in and of themselves, especially since most, if not all, of the
prototype code is typically discarded once enough information has been gathered.
