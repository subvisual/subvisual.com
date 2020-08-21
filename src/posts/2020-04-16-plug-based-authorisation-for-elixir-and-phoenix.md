---
path: /posts/147-plug-based-authorisation-for-elixir/
title: Plug-based authorisation for Elixir and Phoenix
author: fernando-mendes
date: 2020-04-16
tags:
  - development
  - elixir
intro: >
  A while ago I felt the shame of copying and pasting code around from projects.
  Eventually, I decided to stop being lazy, extract it and make a hex
  package out of it. This is story of that project and a walkthrough all the
  awesome things it does, with very little code. Yay Elixir!
---

Some years ago, most of us here at Subvisual got *really-perhaps-a-bit-too-much* into Elixir. Ever since then, whenever we are free to choose the technology to work with, we've pretty much been going Elixir all the way.

We learned a lot. We laughed a lot. And I copy and pasted some code from different projects a lot. Don't tell the rest of the development team. *Aaaaanyway*, I finally got around to open sourcing the copy/pasted code and releasing it as a package.

I called this thingy [Dictator](https://github.com/subvisual/dictator). It implements a plug-based authorisation system and allows you *dictate (get it??)* what your users can access, by defining *policies (hah! get it??)*. You can be as granular as you want and override pretty much everything. **The philosophy behind it is to implement sane defaults but be easily overridable as well. You might even call it *convention over configuration*.** Enough chit-chat, let's showcase it.

## How to use the thing

*very important pre-condition: it assumes you have a `current_user` or `current_resource` or similar in your `conn.assigns`*

**Dictator uses the concept of *policy*, which is a set of rules you implement to determine what actions your users can take.** To do that, you just define a `can?/3` function, which receives the current user as the first argument, the action (`:new`, `:index`, so on) as the second and finally the resource being accessed. Loading of all those is automagically handled for you.

Let's assume you want to define a `Post` policy:

```elixir
# lib/client_web/policies/post.ex
defmodule ClientWeb.Policies.Post do
  alias Client.Content.Post

  use Dictator.Policy, for: Post

  def can?(%User{id: user_id}, action, %Post{user_id: user_id})
    when action in [:edit, :update, :delete, :show], do: true
  def can?(_, action, _) when action in [:index, :new, :create], do: true
  def can?(_, _, _), do: false
end
```

In this scenario our users can update, edit and delete their own things. But anyone can index and create things, even if they don't belong to them. The last `can?/3` function branch prevents users from editing, updating or deleting post that don't belong to them.

This scenario is *so common* across different resources and projects I had, that I extracted it to a `Standard` policy. To do the above, you can just do the following:

```elixir
# lib/client_web/policies/post.ex
defmodule ClientWeb.Policies.Post do
  alias Client.Content.Post

  use Dictator.Policies.Standard, for: Post
end
```

This is a prime example of what I had in mind when  building and extracting the code from previous projects: implement the most common use cases and allow edge cases to be overridden.

Once you have defined a policy, **simply `plug` in `Dictator.Plug.Authorize` and it will even infer the policy** to use (provided some details explained below, but we'll get to that)

```elixir
# lib/client_web/controllers/post_controller.ex
defmodule ClientWeb.PostController do
  use ClientWeb, :controller

  plug Dictator.Plug.Authorize

  # ...
end
```

Tadaaaaaaa. Half-a-dozen lines of code and you're already bossing around your users. Screw *the user is always right*, we dictatin' everything 'round 'ere.

Well, it seems that so far Dictator does a lot of magic behind the scenes, but fear not. We'll go through how it loads resources, how it figures out the correct policy, how it determines which action the user is attempting and how we can override the stuff it uses. You and me, on a magic trip across the Land Of Code as if we were building `dictator` from scratch.

## How the thing loads resources

The first thing we need to do when enforcing a policy is to **figure what the hell we are dealing with**. This means figuring out what resource the user wants to access, what action they want to take and what specific policy decides if they can or cannot perform said action.

So let's start with getting the correct resource. The first piece of the puzzle we need is the module that defines the resource being accessed. Well, that's easy, **when defining the policy the developer needs to specify what resource it is referring to**:

```elixir
defmodule ClientWeb.Policies.Post do
  alias Client.Content.Post

  use Dictator.Policy, for: Post

  # ...
end
```

Nice work! What a team you and me are! So now we need to **get the correct repo**. If you dive into [`policy.ex`](https://github.com/subvisual/dictator/blob/4e1050a66718bda73aa2d510950240f5b68c4feb/lib/dictator/policy.ex), you'll figure out how much of lazy cheaters you and me are. We try two things and then give up.

First we try to use the namespace and see if that module exists (`get_repo_from_namespace/1`). If you are defining a policy for `Client.Content.Post` most of the time you'll have a `Client.Repo`. So let's just check if that exists and hope for the best. If that doesn't work, well, we can just use the `:ecto_repo` config that we are required to have when using `Ecto` and hope there is only one `Repo` defined (`get_repo_from_application/1`).

Sometimes this isn't the case. Sometimes our web apps need multiple repos or we even accidentally choose the wrong one (e.g. in the first scenario, if the developer has defined multiple repos we may end up with the wrong one). We really can't figure out what the developer wants in those cases. Instead let's just be lazy, raise an error and **ask the developer to specify the repo via the `:repo` key**:

```elixir
defmodule ClientWeb.Policies.Post do
  alias Client.Content.Post

  use Dictator.Policy, for: Post, repo: Client.MyFunkyWeirdRepo

  # ...
end
```

At this point we have the repo and module for the resource the user is trying to access. We also know the params of the HTTP call. So now we just need to call `repo.get(module, params["id"])`. Now, **this assumes the resource has a primary key named `id`**. For the large majority of the resources we code, this happens to be true and we can default to that. However, developers like to get picky and use different primary keys. We'll need to **accept a `:key` option**:

```elixir
defmodule ClientWeb.Policies.Post do
  alias Client.Content.Post

  use Dictator.Policy, for: Post, key: :uuid

  # ...
end
```

Note that this assumes the key has the same name in the HTTP call params hash. If we have `id` as the primary key, we expect the params hash to be `%{"id" => id}`. If it's `uuid`, we expect it to be `%{"uuid" => uuid}`. This logic is defined in the [`load_resource/1` function](https://github.com/subvisual/dictator/blob/4e1050a66718bda73aa2d510950240f5b68c4feb/lib/dictator/policy.ex#L47-L57).

But, we, developers, like to complicate things. Sometimes the primary key might be `uuid` but the HTTP param might be named something different. Sometimes we like to feel smart and have composite primary keys. Well, that's too much of a hassle to handle and there are way too many edge cases. **Let's just allow the `load_resource/1` function to be overridable and say "heh, developers can handle it":**

```elixir
defmodule ClientWeb.Policies.Post do
  alias Client.Content.Post
  alias Client.Repo

  use Dictator.Policy, for: Post

  def load_resource(params) do
	  Repo.get_by(Post, uuid: params["uuid"], id: params["id"])
  end

  # ...
end
```

You can notice we allow the function to be overridden in the same [`policy.ex`](https://github.com/subvisual/dictator/blob/4e1050a66718bda73aa2d510950240f5b68c4feb/lib/dictator/policy.ex) file and the `defoverridable` call.

Let's recap. At this point we know how to find repos, load resources and we've allowed developers that use our library to have a bunch of options when `use`-ing `Dictator.Policy`:

* **`:repo` allows them to specify which repo to use to load resources.**
* **`:key` allows them to specify a different primary key for the resource.**
* **`load_resource/1` is overridable to allow complex queries.**

Time to move along to how this Dictator thingy calls the police.

## How the thing calls the ~~police~~ policy

The next step on our tour is a detour (*get it?? I'm on fire today*) to [`plug/authorize.ex`](https://github.com/subvisual/dictator/blob/5c870ec348b9d18dc14770613dda5c9581763e36/lib/dictator/plug/authorize.ex), specifically the [`extract_policy_module/1`](https://github.com/subvisual/dictator/blob/5c870ec348b9d18dc14770613dda5c9581763e36/lib/dictator/plug/authorize.ex#L36-L50) function. The trick to inferring the correct policy is very obvious: use private Phoenix stuff that may or may not be in the documentation and get the controller from that. Obviously. We then use that to generate the policy module. If the controller is `ClientWeb.PostController`, we'll transform it to `ClientWeb.Policies.Post`.

With that in mind, we can again rely on the developers to be picky and define shared policies or to want to reuse them or do weird developer stuff. Which means that they'll need an override option. Luckily we can easily arrange it. When we are plugging the policy into the controller, **developers can provide a `:policy` key** and we'll only call `load_policy/1` if the key isn't present:

```elixir
# lib/client_web/controllers/post_controller.ex
defmodule ClientWeb.PostController do
  use ClientWeb, :controller

  plug Dictator.Plug.Authorize, policy: ClientWeb.Policies.Content

  # ...
end
```

We've covered how to load resources and how to select the policy. But we're missing a couple of things: how to get the current user and how to get the action.

## How the thing interacts with Phoenix

Starting with the current user, let's once again be lazy: **we assume there's a `current_user` in the `conn.assigns`**. Most of the time it will. Of course, them developers will not always call it that, so we can - guess what? - give them an **overridable `:resource_key` option** when they're `plug`-ing the policy in the controller. If your current user in `conn.assigns` is called `current_resource`, you can do:

```elixir
# lib/client_web/controllers/post_controller.ex
defmodule ClientWeb.PostController do
  use ClientWeb, :controller

  plug Dictator.Plug.Authorize, resource_key: :current_resource

  # ...
end
```

All we need now is the action. [`authorize.ex`](https://github.com/subvisual/dictator/blob/5c870ec348b9d18dc14770613dda5c9581763e36/lib/dictator/plug/authorize.ex) has the answer for that: use private Phoenix stuff, again. `conn.private.phoenix_action`, ez-pz.

For the sake of sanity, let's add one final option. **`:only` which specifies the actions which to enforce the policy**. By default, we enforce the policy to all them actions. But a developer might want to only call a policy for the `create` action:

```elixir
# lib/client_web/controllers/post_controller.ex
defmodule ClientWeb.PostController do
  use ClientWeb, :controller

  plug Dictator.Plug.Authorize, only: [:new]

  # ...
end
```

We finally have the current user, the action they want to take, the policy to be enforced. All we have to do in our `Authorize` plug is to [call `policy.can?(user, action, resource)`](https://github.com/subvisual/dictator/blob/5c870ec348b9d18dc14770613dda5c9581763e36/lib/dictator/plug/authorize.ex#L29-L34) and if they can, return an unchanged `conn`. If not, well, 401 it and halt everything.

The logic for all these tricks is straightforward and the whole project boils down to two relevant modules (`Dictator.Plug.Authorize` and `Dictator.Policy`) with a staggering total of 141 lines of code. Isn't Elixir awesome?

## Overrides for the Standard Policy

I mentioned in the beginning of this post that there's a very common scenario: when the developer wants to allow users to edit, update and delete their own resources and everyone to read or create new posts.

For that, Dictator comes bundled with the `Dictator.Policies.Standard` policy. However, this policy makes two assumptions:

1. the primary key of the user trying to access is `id`
2. the foreign key of the resource being accessed is `user_id`

Of course, this doesn't happen all the time. So when `use`-ing the `Standard` policy, developers have these corresponding override options:

1. **`owner_key` (e.g. if your user has a `uuid` field as primary key instead of `id`)**.
2. **`foreign_key` (e.g. if your resource has a `manager_id` instead of `user_id` as the foreign key in the relation)**.

## In Summary

Lots of stuff happening, small number of codes. Elixir awesome. Demo [here](https://github.com/subvisual/dictator_demo). Please contribute to project: [subvisual/dictator](https://github.com/subvisual/dictator).

[Have a nice.](https://www.youtube.com/watch?v=VvPaEsuz-tY)

Mendes

*If you enjoy my shenanigans, I usually say stuff on [twitter](https://twitter.com/frmcodes). Drop by and say hi*

---

PS: Looking to learn Elixir? We're having an Elixir workshop, 2h a day during 8 days. All proceedings from the workshop will be directed to fight COVID-19 and donated to a charity. Further details and tickets at: [getgoing.subvisual.com](http://getgoing.subvisual.com)
