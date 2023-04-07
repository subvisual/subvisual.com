---
path: /building-prototypes-with-liveview
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
highlight: true
---

Quick prototyping plays a vital role in the development process of new projects.
It allows for quicker iterations and faster learning, enabling developers to
make changes and refine their ideas quickly. When building prototypes, it is
often necessary to make trade-offs such as sacrificing security or scalability
in favor of speed and agility. This means that the focus is on being able to
make changes quickly, from the frontend and design to the database structure,
without having to worry about certain constraints.

We at Subvisual have been building prototypes for a long time with many
different tech stacks, more famously (I think) with Ruby/Rails and
Elixir/Phoenix. Over the years we've seen success in using Rails and Phoenix for
this purpose. However, in an effort to continuously innovate and improve, we
have been exploring other technology stacks and one that stood out to me
includes [Elixir](https://elixir-lang.org/),
[Phoenix](https://www.phoenixframework.org/),
[LiveView](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html),
[Surface](https://surface-ui.org/), and [Tailwind](https://tailwindcss.com/).
This new stack offers new possibilities for rapid prototyping and I'm personally
very excited to see what results it will yield.

## Why Elixir and Phoenix?

We've been using Elixir for many years in different capacities, to build various
types of applications, although mostly not with this particular stack, since a
lot of our projects end up having a React frontend. Personally I'm quite the fan
of Elixir and the Actor Model, which is a big reason to reach for LiveView,
because it gives Elixir everywhere. One of the tradeoffs made by Elixir is a
lack of a strong type system, which you can mitigate by using typespecs, but if
you want to rely heavily on types and a compiler, there's other options. Since
there are many resources available that explain what each of these technologies
is, I don't want to go into too much detail here.

A reason to choose Phoenix, other than what I already mentioned about Elixir, is
that it is not only a quite robust web framework with a lot of extensibility,
but also it was built around the concept of channels. Channels are basically a
wrapper for websockets and the technology that makes LiveView possible.

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
similar to React components. Here's an example of what a LiveComponent look
like:

```elixir
defmodule CardComponent do
  use Phoenix.LiveComponent

  def render(assigns) do
    ~H"""
    <form phx-submit="update_title" phx-target={@myself}>
      <input name="title"><%= @card.title %></input>
      ...
    </form>
    """
  end

  ...
end
```

The assigns represents the properties you have access to on the template, which
are you can access with `@`, which is some syntactic sugar. In this case the
template is in the component module, but you can easily have it in its own file
as well. An important part of this example is the `phx-submit` property, which
defines the event that is triggered when the form is submitted. Here's how that
could work:

```elixir
def handle_event("update_title", %{"title" => title}, socket) do
  updated_card = %{socket.assigns.card | title: title}

  socket =
    socket
    |> assign(:card, updated_card)

  {:noreply, socket}
end
```

By updating the card in the assigns in the socket, when this component re-render
(which will happen because of the `{:noreply, socket}` message being sent), the
new title will show up in the page.

All of this is backed by a WebSocket connection and has been highly optimised to
transmit as little data as possible in the messages through that socket. This is
happening under the hood and you don't really have to worry about it, but if
you're interested, [here's](https://www.youtube.com/watch?v=8xJzHq8ru0M) a good
presentation by Chris McCord, the creator of Phoenix.

Depending on the specifics of what you're building, you may choose to break it
down into components or not. However, in general, breaking it down into
components can provide benefits, even though the ergonomics of doing so with
LiveViews have been improving over time, I still believe that LiveViews can be
further improved and this is where Surface comes in.

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

Taking the example from above and rewriting it in Surface would look something
like this:

```elixir
defmodule CardComponent do
  use Surface.LiveComponent

  alias Surface.Components.Form
  alias Surface.Components.Form.TextInput

  data card, :struct

  def render(assigns) do
    ~F"""
    <Form submit="update_title">
      <TextInput name="title">{ @card.title }</TextInput>
      ...
    </Form>
    """
  end

  ...
end
```

Even in this contrived example we can already see some differences. Note how we
use Surface components that are wrappers around Phoenix HTML helpers that add
some nicities, such as taking events as props, so we don't need the `phx`
prefix, or the fact that the target of an event is the "closest" LiveComponent
or LiveView in the tree of components, as opposed to defaulting to the parent
LiveView, forcing you to define a `phx-target`.

Another thing of note is the `data` assign, which allows Surface to know a bit
more about the type of data in the assigns map, which turns leads to it being
able to add some static validations and syntactic sugar based on their type and
options. It also makes it easier to understand at a glance what information a
component holds.

The `handle_event` function would remain pretty much the same in this situation.

While it is possible to achieve similar development speeds with just LiveView, I
personally prefer the added benefits that Surface offers. As mentioned, these
benefits include static validations on component properties, and event handling
at the component level instead of the parent view. Whether or not to use Surface
is a debatable topic and ultimately comes down to personal preference and the
specific needs of the project being developed.

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

```html
<div>
  <label for="price" class="block text-sm font-medium text-gray-700"
    >Price</label
  >
  <div class="relative mt-1 rounded-md shadow-sm">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <span class="text-gray-500 sm:text-sm">$</span>
    </div>
    <input
      type="text"
      name="price"
      id="price"
      class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      placeholder="0.00"
    />
  </div>
</div>
```

In this example we are building an input group for prices, that has a dollar
symbol and the actual input. Clearly this would be less verbose if we had a
specific class for each element, but the more I work with Tailwind, the more I
come to appreaciate how easy it is to understand, update or copy a style.

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
