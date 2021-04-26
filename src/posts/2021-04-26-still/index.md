---
path: /posts/announcing-still
title: "Still building static websites in Elixir"
author: gabriel-poca
date: 2021-04-26
tags:
  - community
intro: >
  We are announcing Still, a new tools to build static sites in Elixr.
---

You know the saying: _You don't get to 500 million users without making a few static sites_.

![You don't get to 500 million users without making a few static sites](./millions.jpeg)

I enjoy building a website every once in a while, and I've been doing it since we designed websites in Photoshop, sliced them, and imported the slices to Dreamweaver.
Things have come a long way, and now it’s easier than ever to make websites with drag-and-drop tools, a simple editor, or custom-made scripts.

There are many “modern” and “professional” tools to get you up to speed in no time. I think that it's awesome that we can scaffold a project in a couple of seconds, write a React component, and there we have it, a static website super optimized for the modern “professional” world. But do we need all of that? Would it be possible to achieve the same thing without having to buy into a massive ecosystem of packages that keep breaking and making upgrades almost impossible? Should we be buying into those technologies just because that's what everyone does?

Websites don’t have to be this complicated, and the browser already does a lot. We need simpler tools that don’t compromise on the developer experience and pack enough features to build a “modern” website. Other tools fit the description, but Elixir would do a much better job than everything else, as you’ll see in a bit.

## Modern development environment

Tools like [Gatsby][gatsby] and [Next.js][next] changed the game for static websites. I remember going from Jekyll to Middleman and from the latter to Gatsby. Damn, Gatsby was fast at the time. The [asset pipeline][asset-pipeline] served us well, but it was time to say goodbye. It suddenly became easy to handle images, and extracting and inlining the above-the-fold CSS came by default.

Gatsby was great, but it soon became clear that our goals were not aligned. They still aren't. Gatsby is huge. Upgrades were hard; documentation was sparse; and newer features increased its complexity but didn't do us any favor. The abstractions were great until they stopped working, then you’re on your own, digging through all the layers.

If we were to build a “modern” and “professional” static site builder, what would we need? What would you expect? I know many people would say React, but do we really need a library that’s almost a new language, alongside its own runtime to write HTML? Let's simplify, stay focused, and on track. _What do we actually need?_

- A development server that automatically compiles the website and refreshes the browser on change.
- An error overlay on the browser to show what’s failing and where.
- Support for all kinds of assets.
- A way to generate responsive images from a source image.
- A templating engine.
- A mechanism to add metadata to the pages of our website so that we can change the browser’s page title, or group pages together.
- A straightforward way to extend it.

## Why Elixir

Why Elixir, you ask? Because we love Elixir. That's it. There's no other reason. We can also say that if there was a Elixir static site builder, we might not have built this one.

Elixir works well with other languages. One of my favorite packages to use is [elixir-nodejs][elixir-nodejs], which allows me to use NPM packages. Behind the scenes, it uses [Port][elixir-port] to talk with a pool of NodeJS processes. [Mogrify][mogrify] is also a nice wrapper for ImageMagick's command line. You can also interact with C through NIFs to use something like [SASS][elixir-sass]. Maybe you want to write your NIFs in Rust? [Rustler][rustler] has you covered. You can do these things in other languages, but when you bring OTP into the mix, your Elixir app becomes an operating system, managing other processes. That's hard to beat.

We built [Still][stillstatic]. You can write your templates in HTML, Slime, Markdown, or any other templating language you chose to add. You can embed Elixir everywhere: in your HTML, CSS, JS, Markdown, etc. You can just drop a module in the _lib_ and call it from anywhere. Yeah, that simple. We built a processing pipeline that handles different types of content, and it’s easy to extend: just an Elixir module with one function. Do you [still][stillstatic] want to use packages from NPM on the browser? There’s an [integration with Snowpack][still_snowpack]. Do you want to see some websites built with still?

- [http://gabrielpoca.com/](http://gabrielpoca.com/) and its [source code](https://github.com/gabrielpoca/gabrielpoca.com/tree/master/priv/site).

- [http://stillstatic.io/](http://stillstatic.io/) and its [source code](https://github.com/still-ex/still/tree/master/priv/site).

- [https://alchemyconf.com/](https://alchemyconf.com/) and its [source code](https://github.com/subvisual/alchemyconf.com/tree/master/priv/site).

Still doesn’t handle SCSS out of the box, but do you want it? Add the dependency:

```elixir
  defp deps do
    [
      {:sass, git: "https://github.com/scottdavis/sass.ex", submodules: true},
      {:still, git: "https://github.com/still-ex/still"}
    ]
  end
```

Add a preprocessor:

```elixir
defmodule YourSite.SassPreprocessor do
  use Still.Preprocessor

  @impl true
  def render(%{content: content} = file) do
    {:ok, content} = Sass.compile(content)
    %{file | extension: ".css", content: content}
  end
end
```

And you’re done. You can write SASS now. Do you also want to make some API requests during build time? Maybe fetch the number of stars from Github’s API?

```elixir
  defmodule YourSite.Github do
    def stars do
      {:ok, {_, _, body}} =
        :httpc.request(
          :get,
          {"https://api.github.com/repos/still-ex/still",
           [{'Accept', 'application/vnd.github.v3+json'}]},
          [],
          []
        )

      body
      |> Jason.decode!()
      |> Map.get("stargazers_count")
    end
  end
```

Done, now just call this function from literally anywhere on your website:

```
= link @env, to: "https://github.com/still-ex/still", class: "quote" do
  .small -- #{YourSite.stars} stargazers on GitHub
```

Everything you need to get started is in there! If I caught your attention, you can find more information on the [website][stillstatic], the [docs][docs] and on [Github][still_github]. If you have questions, open an issue, or send me a message on [Twitter][twitter].

## So much left to do

**Still** is just starting, but you can already do a lot with it. We are focused on making it extendable while ensuring that it includes everything necessary to build great websites out of the box. If you want to be an open-source contributor, [Still is also a great way to start][still_github].

**If you liked our poster, in the beginning, we have a few more on our [website][stillstatic].**

_You should probably get a ticket for Alchemy Conf. All proceeds are for charity, and you get to see some of the best speakers around._

[stillstatic]: https://stillstatic.io/
[docs]: https://hexdocs.pm/still/getting_started.html
[gatsby]: https://www.gatsbyjs.com/
[eleventy]: https://www.11ty.dev/
[elixir-nodejs]: https://github.com/revelrylabs/elixir-nodejs
[elixir-port]: https://hexdocs.pm/elixir/Port.html
[mogrify]: https://github.com/route/mogrify
[elixir-sass]: https://github.com/scottdavis/sass.ex
[rustler]: https://github.com/rusterlium/rustler
[gatsby]: https://www.gatsbyjs.com/
[next]: https://nextjs.org/
[asset-pipeline]: https://github.com/rails/sprockets
[still_snowpack]: https://github.com/still-ex/still_snowpack
[still_github]: https://github.com/still-ex/still
[twitter]: https://twitter.com/gabrielgpoca
