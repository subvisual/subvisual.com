---
path: /posts/get-started-with-liveview-and-tailwind
title: "Get going with Phoenix LiveView and Tailwind"
author: luis-zamith
date: 2023-02-16
cover:
seoImage:
intro: "As with any tech stack there some details on how to put all the parts
together that are good to put in writing and share, in the hope it makes using
it that much faster and painless."
---

I have previously written about a [tech stack I've been feeling particularly
productive with](https://subvisual.com/blog/posts/building-prototypes-with-liveview),
which includes Phoenix LiveViews and Tailwind. As with any tech stack there some
details on how to put all the parts together that are good to put in writing and
share, in the hope it makes using it that much faster and painless.

## The Phoenix App

The very first thing we'll need a Phoenix App, that will glue everything
together. There are plenty of resources on [how to do that online](https://hexdocs.pm/phoenix/up_and_running.html),
an eventually be able to run `mix phx.new sample`, to create our app, named
Sample.

At this point, after following the guides, we should have a working Phoenix App,
which comes with LiveView by default.

### Surface

In my other article, I also mentioned Surface as a library that plays well with
LiveView, we can install it pretty easily, by adding it to the deps in
`mix.exs`:

```elixir
defp deps do
  [
    ...
    {:surface, "~> 0.9.1"}
  ]
end
```

*Note:* At the time of writing this version of surface uses a version of
live_view that is above the one in the Phoenix default installation. That means
you might have to bump some versions of live_view related packages.

```elixir
  {:phoenix_live_reload, "~> 1.3", only: :dev},
  {:phoenix_live_view, "~> 0.18.2"},
  {:phoenix_live_dashboard, "0.7.0"},
```

With this upgrade ensure that you don't have `gettext` as one of you compilers,
meaning that your `project/0` function in `mix.exs` should look like this:

```elixir
  def project do
    [
      app: :sample,
      version: "0.1.0",
      elixir: "~> 1.12",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end
```

Lastly, ensure your views have access to the functions that have been moved to
`Phoenix.Component`, by importing it in `view/0` at `lib/sample_web.ex`.

```elixir
  def view do
    quote do
      use Phoenix.View,
        root: "lib/sample_web/templates",
        namespace: SampleWeb

      # Import convenience functions from controllers
      import Phoenix.Controller,
        only: [get_flash: 1, get_flash: 2, view_module: 1, view_template: 1]

      # Import reusable function components with HEEx templates
      import Phoenix.Component

      # Include shared imports and aliases for views
      unquote(view_helpers())
    end
  end
```

## Our first LiveView

With all of this set up, we can add our first LiveView, which will be a simple
page with an on/off switch that will change the from normal to dark mode. Before
we add the styling though, we will add the markup and event handling. This
should be enough to test if everything is working correctly.

Personally I prefer to have the templates have their own files, so our LiveView
will be pretty barebones for now:

```elixir
defmodule SampleWeb.Pages.DarkmodeLive do
  use SampleWeb, :live_view
end
```

All the behaviour comes from that `use` call, which is the next thing we need to
change because we want to use `Surface.LiveView` instead of `Phoenix.LiveView`,
so go to `lib/sample_web.ex` and make sure all of the references to Phoenix are
changed to Surface:

```elixir
  def live_view do
    quote do
      use Surface.LiveView,
        layout: {SampleWeb.LayoutView, :live}

      unquote(view_helpers())
    end
  end

  def live_component do
    quote do
      use Surface.LiveComponent

      unquote(view_helpers())
    end
  end

  def component do
    quote do
      use Surface.Component

      unquote(view_helpers())
    end
  end
```

### Template

As I've said, we will add a separate file for the template. That file should be
called the exact same as our component, but have the `.sface` extension. For now
it will be as simple as this:

```elixir
<div>
  <h1>Hello World!</h1>
</div>
```

### Routes

We have everything ready, but no way of accessing it yet. For that we need to
add a live route to `lib/sample_web/router.ex`.

```elixir
  scope "/", SampleWeb do
    pipe_through :browser

    get "/", PageController, :index
    live "/darkmode", Pages.DarkmodeLive, :index, as: :darkmode
  end
```

That's it! We can now visit `http://localhost:4000/darkmode` and we should have
our LiveView working.

## Tailwind

Last but not least we need to tailwind, so we can start styling our LiveView.
There are many ways you can do this, but I found that the tailwind phoenix
library works quite well.

```elixir
defp deps do
  [
    ...
    {:tailwind, "~> 0.1.9", runtime: Mix.env() == :dev},
  ]
end
```

Once it is installed, you have to configure it in `config/config.exs`:

```elixir
config :tailwind,
  version: "3.2.4",
  default: [
    args: ~w(
    --config=tailwind.config.js
    --input=css/app.css
    --output=../priv/static/assets/app.css
  ),
    cd: Path.expand("../assets", __DIR__)
  ]
```

Run `mix tailwind.install`, which will download the specified version of
Tailwind as well as create an `assets/tailwind.config.js` file, which you can
read about in Tailwind's official docs. We do need to tell it about `.sface`
files, so it knows which classes we are using and only actually import those.
Make sure you tailwind config looks like this:

```js
// See the Tailwind configuration guide for advanced usage
// https://tailwindcss.com/docs/configuration

let plugin = require("tailwindcss/plugin")

module.exports = {
  content: [
    "./js/**/*.js",
    "../lib/*_web.ex",
    "../lib/*_web/**/*.*ex",
    "../lib/*_web/**/*.sface"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(({addVariant}) => addVariant("phx-no-feedback", ["&.phx-no-feedback", ".phx-no-feedback &"])),
    plugin(({addVariant}) => addVariant("phx-click-loading", ["&.phx-click-loading", ".phx-click-loading &"])),
    plugin(({addVariant}) => addVariant("phx-submit-loading", ["&.phx-submit-loading", ".phx-submit-loading &"])),
    plugin(({addVariant}) => addVariant("phx-change-loading", ["&.phx-change-loading", ".phx-change-loading &"]))
  ]
}
```

We can then import the tailwind components by adding them to
`assets/css/app.css`. There's a bunch of stuff there that comes with a default
Phoenix app, it's up to you if you keep it or remove it, just be sure to add
this to the top of the file:

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

### Styling our LiveView

First thing I did was remove the whole `header` from
`templates/layout/root.html.heex` and remove the `class="container"` from the
`main` element in `templates/layout/live.html.heex`, which gives us a clean
slate to play with.

Then added the base style for our LiveView, which should cover the entire screen
with a light gray background.

```html
<div class="flex flex-col items-center justify-center bg-gray-100 h-screen">
  <h1 class="text-7xl">Hello World!</h1>
</div>
```

### Adding a switch

Next thing is adding a switch to change the theme, which can be done like this:

```html
<div class="flex flex-col items-center justify-center bg-gray-100 h-screen">
  <h1 class="text-7xl">Hello World!</h1>

  <Label class="relative flex items-center cursor-pointer mt-4">
    <Checkbox class="sr-only peer" />
    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  </Label>
</div>
```

All those classes create a custom toggle, which can be copy and pasted anywhere
and still work, which is pretty neat.

## Handling events

The next and final step for us, is to handle the event that happens when we
click on the toggle. Here's how it looks both from the template and view
perspective.

```html
{#if @darkmode}
  <div class="flex flex-col items-center justify-center bg-slate-800 h-screen">
    <h1 class="text-7xl text-white">Hello World!</h1>

    <Label class="relative flex items-center cursor-pointer mt-4">
      <Checkbox click="toggle-modes" class="sr-only peer" />
      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </Label>
  </div>
{#else}
  <div class="flex flex-col items-center justify-center bg-gray-100 h-screen">
    <h1 class="text-7xl">Hello World!</h1>

    <Label class="relative flex items-center cursor-pointer mt-4">
      <Checkbox click="toggle-modes" class="sr-only peer" />
      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </Label>
  </div>
{/if}
```

```elixir
defmodule SampleWeb.Pages.DarkmodeLive do
  use SampleWeb, :live_view

  alias Surface.Components.Form.{
    Checkbox,
    Label
  }

  data(darkmode, :boolean, default: false)

  def handle_event("toggle-modes", _params, %{assigns: %{darkmode: darkmode}} = socket) do
    {:noreply, assign(socket, darkmode: !darkmode)}
  end
end
```

This works fine, but we can actually take advantage of tailwind's dark mode
support. First we need to configure it to use the `class` method, so that we can
turn it on by adding a class, which we do in our `tailwind.config.js` file:

```js
// See the Tailwind configuration guide for advanced usage
// https://tailwindcss.com/docs/configuration

let plugin = require("tailwindcss/plugin")

module.exports = {
  ...
  darkmode: "class",
  theme: {
    extend: {},
  },
  ...
}
```

And then we update the  template, since the view can stay the same:

```html
<div class={if @darkmode, do: "dark", else: ""}>
  <div class="flex flex-col items-center justify-center bg-gray-100 dark:bg-slate-800 h-screen">
    <h1 class="text-7xl dark:text-white">Hello World!</h1>

    <Label class="relative flex items-center cursor-pointer mt-4">
      <Checkbox click="toggle-modes" class="sr-only peer" />
      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </Label>
  </div>
</div>
```

Note the `dark:` variant to some of the utility classes. That means that they
only are in effect when there is a `dark` class somewhere above them in the HTML
tree.

## Conclusion

This should be enough to get you going with Phoenix LiveView, Surface and
Tailwind and hopefully also give you an idea of how quick it is to develop in
this stack. I do recommend referring to the docs for each of these technologies
as you are getting started, especially Tailwind, but the more you use it, the
simpler it will be.

All the code used in the article is in a [repo that you can refer
to](https://github.com/zamith/live_view_sample).
