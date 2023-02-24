---
path: /dictator-1-0-a-new-perspective/
title: "Dictator 1.0: A new perspective"
author: fernando-mendes
date: 2020-09-16
tags:
  - development
  - elixir
seoImage: ./seo.png
intro: >
  A few months ago, Miguel and I got together and reimplemented much of
  Dictator.
---

A few months ago, [Miguel][miguel] and I got together and reimplemented much of
[Dictator][dictator].

If you don't know, Dictator is a tiny library that authorises users based on
policies. Here's how you would authorise users creating and updating their own
posts and reading posts by other users:

```elixir
# config/config.exs
config :dictator, repo: Client.Repo

# lib/client_web/controllers/post_controller.ex
defmodule ClientWeb.PostController do
  use ClientWeb, :controller

  plug Dictator

  # ...
end

# lib/client_web/policies/post.ex
defmodule ClientWeb.Policies.Post do
  alias Client.Context.Post

  use Dictator.Policies.BelongsTo, for: Post
end
```

That's it. That's all that's needed. There are policies that allow for more or
less granularity but the complexity is as little as what's shown here.

## A new perspective

After using it in our projects for a while, we got together to look at it under
new shades. The reasoning for that was based on three main ideas:

1. We wanted a clearer API.
2. We wanted less magic and more maintainability.
3. We wanted to accommodate requests that do not load resources.

The latter is one of the biggest proponents for change. At the time, Dictator
tried to load the source being accessed. But what if we wanted to check if the
`current_user` is an admin? There's no need for resource loading. In theory, we
could `plug` Dictator into a router pipeline and it would attempt to authorise
admins only. However, due to the implementation, it would fail attempting to
load resources.

At the time, the separation of concerns regarding what was a policy and what was
resource loading wasn't that clear. With that in mind, we created two separate
concepts regarding policies:

1. A policy is a policy. There are no resources. It implements a `can?/3`
   function.
2. A resource loading policy is a different policy. It's an augmentation of the
   latter. Resource loading has its peculiarities in every system, so it should
   be easily extended. Besides a `can?/3` function, a resource loading policy
   also implements a `load_resource/1` function.

As a result, dictator has 3 policies implemented:

* `Dictator.Policy`
* `Dictator.Policies.EctoSchema`
* `Dictator.Policies.BelongsTo`

### Policies are policies

The concept is simply that. Imagine you want to ensure only admins could access
a certain component of the system. The policy would be akin to this:

```elixir
defmodule MyApp.Policies.Admin do
  use Dictator.Policy

  def can?(%User{admin: true}, _action, _params), do: true
end
```

If you want to add granularity and ensure that only admins can write, you would
dig deep into the allowed actions:

```elixir
defmodule MyApp.Policies.Admin do
  use Dictator.Policy

  def can?(%User{admin: true}, action, _params)
    when action in [:create, :update],
    do: true

  def can?(_, _, _), do: false
end
```

You can also be granular to the point of matching on the request params. The
final argument of the `can?/3` function is a map with three keys:

* `:resource` - the resource being loaded, `nil` in this scenario.
* `:opts` - the options passed to the `plug`.
* `:params` - the request params.

This allows you to be as specific as you want when setting rules:

```elixir
defmodule MyApp.Policies.Admin do
  use Dictator.Policy

  def can?(%User{admin: true}, action, _params)
    when action in [:create, :update],
    do: true

  def can?(_user, _action, %{params: params}),
    do: params["id"] == "1"

  def can?(_, _, _), do: false
end
```

By keeping these policies not bound to a resource, we are able to not only plug
dictator on a controller level but to keep the logic bound to a namespace. Both
of these are valid options to authorise your users against an `AdminPolicy`.

```elixir
defmodule MyAppWeb.Admin.PostController do
  use MyAppWeb, :controller

  plug Dictator, policy: MyAppWeb.Policies.Admin

  # ...
end

#
# or, if you prefer router level authorisation
#

defmodule MyAppWeb.Router do
  pipeline :admin do
   plug Dictator, policy: MyAppWeb.Policies.Admin
  end
end
```

### Resource loading is something different

Policies that load resources are still policies and the `can?/3` API is still in
effect. However, these policies require an integration with Ecto. Since
different resources have different peculiarities, these policies allow for some
sensible overrides. Let's start with the most basic one,
`Dictator.Policies.EctoSchema`.

This policy always requires you to provide the schema you are attempting to
authorise against:

```elixir
defmodule MyAppWeb.Policies.Post do
  alias MyApp.Content.Post

  use Dictator.Policies.EctoSchema, for: Post
end
```

You are always advised to override the `can?/3` function, as the default
implementation only returns `false`. To authorise users to only update and
delete their own posts we could do the following:

```elixir
defmodule MyAppWeb.Policies.Post do
  alias MyApp.Content.Post
  alias MyApp.Accounts.User

  use Dictator.Policies.EctoSchema, for: Post

  def can?(_, action, _) when action in ~w[index show new create]a,
    do: true

  def can?(%User{id: id}, action, %{resource: %Post{user_id: id})
    when action in ~w[edit update delete]a,
    do: true

  def can?(_, _, _), do: false
end
```

This scenario is the most common we have found in our projects. It represents a
basic `belongs_to` association. The owner is allowed write access and everyone
is allowed read access. Consequently, this is abstracted into a different
policy: `Dictator.Policies.BelongsTo`. There a few caveats and custom options
but we will get there.

In the meantime, we should focus on how the `Post` resource of the aforementioned
example is loaded. The `EctoSchema` policy implements a `load_resource/1`
function that receives the HTTP request parameters as the one argument and
attempts to do `Repo.get(params["id"])`. This simple line has two assumptions:

1. You have somehow provided us the repo.
2. The request has an `id` parameter.

These are very strong assumptions to make. The first one is managed by having
you configure the repo. On your `config.exs` file:

```elixir
config :dictator, repo: MyApp.Repo
```

Of course, you might have multiple repos and want a specific repo for a specific
policy. This configuration can be overriden on a per-policy basis by doing:

```elixir
use Dictator.Policies.EctoSchema, for: Post, repo: MyApp.OtherRepo
```

As for the second assumption, that the request has an `id` parameter, while true
for the majority of the cases, it must be configurable as well. If your `Post`
resource is identified by a `uuid` instead, you may do:

```elixir
use Dictator.Policies.EctoSchema, for: Post, key: :uuid
```

There is a final underlying assumption, a much larger one, hidden by these
concepts: that all resources are loaded by calling `Repo.get_by(resource, key:
params[value])`.

Loading a resource varies with application requirements and there must be
flexibility when doing so. `load_resource/1` does provide a default
implementation but it can be overridden. If your resource loading is a complex
operation, you can do the following:

```elixir
defmodule MyAppWeb.Policies.Post do
  alias MyApp.Content.Post
  alias MyApp.Accounts.User

  use Dictator.Policies.EctoSchema, for: Post

  # can?/3 definitions here...

    def load_resource(%{"email" => email, "team_id" => team_id}) do
      Repo.get_by(email: email, team_id: team_id)
    end
end
```

#### BelongsTo as an extension

As I mentioned before, `belongs_to` associations tend to fall under a specific pattern:

1. The parent resource (e.g. `User`) has an `id` key.
2. The children (e.g. `Post`) has a `user_id` key.
3. The parent resource has write access to their own children resources.
4. All parent resources can have read access to any child resource.

`Dictator.Policies.BelongsTo` is a specification of the `EctoSchema` policy for
those scenarios. Doing `use Dictator.Policies.BelongsTo, for: Post` generates
the following code:

```elixir
@impl Policy
def can?(_, action, _)
  when action in [:index, :show, :new, :create],
  do: true

@impl Policy
def can?(%{id: owner_id}, action, %{
      resource: %Post{user_id: owner_id}
    })
    when action in [:edit, :update, :delete],
    do: true

@impl Policy
def can?(_user, _action, _params), do: false
```

Points 1 and 2 I mentioned above are, again, assumptions that do not hold for
every scenario. With that in mind, you can configure 1. through the `owner_key`
option and 2. through the `foreign_key` option.

Imagining the `User` resource had a `uuid` primary key and the corresponding
foreign key on the `Post` resource was `user_uuid`, to implement a policy you
would do the following:

```elixir
defmodule MyAppWeb.Policies.Post do
  alias MyApp.Content.Post

  use Dictator.Policies.BelongsTo,
    for: Post,
    owner_key: :uuid,
    foreign_key: :user_uuid
end
```

### Current User

As with the previous version, it is assumed that the currently logged in user is
available in `conn.assigns`. By default, the key it is under is `current_user`.
However, this is configurable on a project-wide basis or on a `plug` basis:

```elixir
# config/config.exs
# configure for the whole project
config :dictator, key: :current_resource

# configure for a single controller
# overrides the previous option
plug Dictator, key: :current_owner
```

### Unauthorised Handlers

One final assumption that the first version of dictator took was what to send
back to the user. At the time, it was a simple `401` with the body set to
`you're not authorised to do that`. This, of course, becomes cumbersome when
developers are writing APIs to be compliant with certain standards, such as
JSON:API. With extensibility in mind, we introduced the concept of unauthorised
handlers.

When the user is not authorised to access a certain resource, an unauthorised
handler is called. This is a module that implements the `Plug` behaviour. There
are two available: `Default` and `JsonApi`. The former is the already existing
behaviour of `dictator` and the latter is a JSON:API compliant implementation.

You can choose which one to use by setting:

```elixir
config :dictator, unauthorised_handler: Dictator.UnauthorizedHandlers.JsonApi
```

This gives the flexibility for you to add your own custom handler, as well. As
long as it implements the `Plug` behaviour, it should work by just configuring
`:dictator` to use your module.

## In Summary

We gave this version a lot more thought than the initial one. We removed some of
the magic (for example, attempting to guess what Ecto repo your application was
using) and decided to bet on extensibility and readibility. It's preferable to
be explicit than to rely on automagic.

The project aims to keep sane defaults but allow you to easily override and make
your own implementation. The API is much clearer, well defined and allows for
generic scenarios which it was very much lacking in the initial version.

The `1.0` version is up, we've been using it internally for quite some time and
we're very happy with the results. As always, [we're open to pull requests and
issues][dictator]. We're very receptive to new ideas and suggestions, as well,
feel free to reach out [on Twitter][twitter].

Set `{:dictator, "~> 1.0.0"}` on your `mix.exs` and go and get 'em tiger!

Ta-ta,
<br/>
[Mendes][twitter]

[dictator]: https://github.com/subvisual/dictator
[miguel]: https://twitter.com/naps62
[twitter]: https://twitter.com/frmcodes
