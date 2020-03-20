---
id: 137
path: /posts/137-tutorial-deploying-elixir-applications-with-docker-and-digital-ocean/
title: "Tutorial: Deploying Elixir applications with Docker and Digital Ocean"
author: miguel-palhas
date: 2017-05-24
cover: https://subvisual.s3.amazonaws.com/blog/hero/205/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/205/image@2x.jpg
tags:
  - elixir
  - docker
  - development
intro: "While Elixir is becoming a popular language for web development, there is at least one topic that I still find lacking: Deploys."
---

While Elixir is becoming a popular language for web development, there is at least one topic that I still find lacking: Deploys.

There are already several options out there, but the community has not yet adopted a standard way to solve this problem, so documentation is not that easy to find or follow.

So I decided to compile what I consider to be a good standard for deploying a web application using Elixir & Phoenix in this post. This isn't a one-size-fits-all solution. I would argue that there's no such thing.

This is the solution to my particular problem:

- The focus is on development speed and getting something online fast
- You don't have special infrastructure needs (think Web Server + Database + maybe Redis or a couple of other services)
- You have a fast development cycle, possibly deploying to production several times every day

That said, if you have different requirements, this tutorial can be a good starting point to learn how to work with some of the tools, and you might be able to adapt it to your special needs, so don't shy away just now!

## Table of Contents

1. [Elixir Releases](#elixir-releases)
2. [Isolating the build with docker](#isolating-the-build)
3. [Setting up docker-compose](#setting-up-compose)
4. [Deploying with docker-machine](#deploying-with-docker-machine)
5. [Running Migrations](#running-migrations)
5. [Final thoughts](#final-thoughts)

<span id="elixir-releases"></span>
## Elixir Releases

There are two ways to get your Elixir code running on a server. The first is to push it and run `mix phx.server` or whichever command your application uses to start itself.

The second and most common approach is to build a release package. This is the approach I'll be focusing in here, but if for some reason you prefer the former method, adapting this tutorial shouldn't be hard. It mostly means you get to skip the first step.

A release is a pre-compiled form of an Elixir/OTP application. It is stripped of anything not necessary for production use, requires almost no dependencies, and can be deployed anywhere (at least in theory, but more on that below).

There are a couple of caveats to this approach, though:

1. You lose the ability to run `mix` or other tools, which means that database migrations and other tasks, need to be done in some other way;
1. You need to ensure the system architecture of the machine where the release is compiled matches the architecture of the server it'll run on.

Both of these issues will be discussed later on in the post.

### How do I build a release?

There are a couple of tools that make it straightforward to generate releases:

1.  [`distillery`](https://github.com/bitwalker/distillery) is currently the recommended project to use;
2.  [`exrm`](https://github.com/bitwalker/exrm) is a previous project by the same author. Despite having been replaced by distillery recently, it is still worth mentioning due to its heavy use. It still has it's own page in the [Phoenix framework docs](http://www.phoenixframework.org/v0.13.1/docs/advanced-deployment), for instance.

I'll be using distillery for this tutorial. However, I won't be using it directly, but via a Docker container, so that I can solve the system architecture problem mentioned above.

<span id="isolating-the-build"></span>
## Isolating the build with docker

The architectures of the server and the machine where we build our release need to match. So it's easy to see we can run into problems. We shouldn't have to worry about breaking our builds just by using a different computer.

Building directly on the server is an option, of course, but that takes away a lot of flexibility from our hands. It would mean that our server needs all the dependencies necessary to build a release, and will also spend some computing power from our server, which might have noticeable effects, especially if you're on a budget.

Instead, how about delegating the build process to a Docker container? That way, we ensure consistency, regardless of where we trigger the build. In the docker community, this is usually referred to as the [Builder Pattern](http://blog.terranillius.com/post/docker_builder_pattern/).
We'll have one Docker container to build the release package, and a different one for running it, with only the bare minimum runtime dependencies.

And that's exactly what [`mix_docker`](https://github.com/Recruitee/mix_docker) does for us. Out of the box, it includes two different Dockerfile descriptions, which are used to, respectively, build and release your Elixir app. Under the hood, it uses [`distillery`](https://github.com/bitwalker/distillery) to generate the releases.

Note: We could also take advantage of Docker's new feature: [Multi-stage builds](https://docs.docker.com/engine/userguide/eng-image/multistage-build/#use-multi-stage-builds), but mix_docker does not yet support those, so we're going with the two Dockerfile approach for convenience.

### Building a Release 

To set it up, add `mix_docker` to your `mix.exs` , and run `mix deps.get` . At the time of writing, the released version (0.3.0) does not work with Erlang 19, so I had to fetch the Github repo directly:

```elixir
def deps do
  [
    ...
    {:mix_docker, github: "Recruitee/mix_docker"},
  ]
end
```

And set it up using:

```shell
$ mix docker.init
```

This will setup Distillery as well, creating a `rel/config.exs` file in your project.

You might be interested in checking out [Distillery's Configuration options](https://hexdocs.pm/distillery/getting-started.html#configuration) and change that file if you need to.

Next, to build a release, run:

```shell
$ mix docker.build
```

This copies your entire application to a minimal Docker image running Alpine Linux. The image contains only the essential packages to build your application, which is nothing more than an Erlang/Elixir installation.

### Releasing a Release 

We now want this build to run on our server. For that, `mix_docker` provides another docker image and a command:

```shell
$ mix docker.release
```

An Elixir release is a self-contained project that requires no dependencies (at least for a simple project, as is the case here), so this second container has nothing more than the same Alpine Linux installation with a couple of system libraries, making it very compact.

### Publishing to Docker Hub 

Now we have a docker image that runs our app. Everything is contained there, so we just need to get that on a server. I use [Docker Hub](https://hub.docker.com/) for that since it integrates nicely with the rest of the Docker toolkit.

You need to set up an account and run `docker login` to connect locally.

On the free plan, it allows only one private repository, which fortunately is enough for me. If that doesn't suit your needs, you can look into alternatives, such as [hosting your own private Docker Registry](https://docs.docker.com/registry/deploying/).

Keeping with the Docker Hub approach:

```shell
$ mix docker.publish --tag 0.1.0
```

Since my docker username is `naps62`, and considering `demo` as the name of this particular project, this would upload an image called `naps62/demo:0.1.0`.

Having that out of the way, we still need a few things to make the containerized app work:

- Setting up any environment variables that might be necessary;
- Adding a database container as a dependency.

In the next section, I'll explain how to use [Docker Compose](https://docs.docker.com/compose/) to do just that.

<span id="setting-up-compose"></span>
## Setting up docker-compose

Compose is a tool that allows us to define and run a multi-container app, specifying how the networking and dependencies between them should work. Think of it as a low-scale orchestration tool.

To use it for our app, we need to create a `docker-compose.yml` looking like this:

```yaml
version: "2.0"
services:
  web:
    image: "naps62/demo:0.1.0"
    command: foreground
    depends_on:
      - db
    ports:
      - "4000:4000"
    environment:
      DATABASE_URL: "ecto://demo_db:demo_user@db/demo_db"
      PORT: 4000
      POOL_SIZE: 10

  db:
    image: postgres:9.6.2
    environment:
      POSTGRES_DB: "demo_db"
      POSTGRES_USER: "demo_user"
      POSTGRES_PASSWORD: "demo_pass"
```

I won't go through in much detail since there are already a lot of tutorials covering Docker Compose ( [exhibit A](https://docs.docker.com/compose/gettingstarted/), [exhibit B](https://blog.codeship.com/orchestrate-containers-for-development-with-docker-compose/), [exhibit C](https://thoughtbot.com/upcase/videos/intro-to-docker) ). I'll just to go through the relevant parts for this tutorial:

1.  `image: "naps62/demo:0.1.0"` refers to the image we just built. Notice the tag must be updated if we release a new version. Or alternatively, we can use `image: "naps62/demo:${TAG}"` to get the release tag from an environment variable, making it easier to update it in the future;
1.  `command: foreground` this is the command to be executed by the docker image. `foreground` just appends to be the executable included in a docker release to start the app. Other alternatives are available if we need to start it as a background job, but that is not what we need here;
1.  `ports: "4000:4000"` sets the port forwarding to the default port used by the Phoenix server. We'll later add an nginx reverse proxy to redirect requests to this port;
1.  `DATABASE_URL: "ecto://.."` This sets the full URL for Ecto to connect to our PostgreSQL database, which is running in a separate container. It contains the username, password, and database name; 

For that `DATABASE_URL` variable to be used, we also need to change our Ecto configs for production:

```elixir
## config/prod.exs
	
config :db, Demo.Repo,
  adapter: Ecto.Adapters.Postgres,
  url: {:system, "DATABASE_URL"},
  pool_size: 10,
  ssl: false m
```

With this setup, we can get our entire system running with `docker-compose up`. But we want to do that on a remote server, not locally, so let's dive into that now:

<span id="deploying-with-docker-machine"></span>
## Deploying with Docker Machine

Docker Machine is yet another tool in the large Docker ecosystem. It is used to handle docker installations and containers in remote machines without all the hassle of setting up a server manually and `ssh` 'ing into it.

In this case, we'll be using it to create a Digital Ocean droplet (via their API, not manually), and run our app.

### Grab your Digital Ocean token 

You'll need to get an API token from your Digital Ocean account so that Docker Machine can have access to it.

Go to [https://cloud.digitalocean.com/settings/api/tokens](https://cloud.digitalocean.com/settings/api/tokens) and create a new token:

![](https://s3-us-west-2.amazonaws.com/notion-static/4e595b7b24fc4ba0994a2c492f247b5f/2017-05-10-163456_1135x433_scrot.png)

Now, copy it to your terminal as an environment variable:

```shell
$ export DIGITAL_OCEAN_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Bonus: Persist your token with a secrets file 

To make this persistent, and prevent you from having to export this variable on every new terminal, you can create a `~/.secrets.sh` with the export command, and load it in your `.bashrc` or `.zshrc` :

```shell
[ -f ~/.secrets.sh ] && source ~/.secrets.sh
```

Just remember not to commit this to your dotfiles repository, if you have one. And, of course, this is only an option if you have enough control over who uses your computer, so tread lightly.

### Create Droplet 

Creating a droplet on Digital Ocean can be done with a single Docker Machine command, which will use the Digital Ocean API to do most of the work for us. Let's create a droplet called `docker-demo`:

```shell
$ docker-machine create --driver=digitalocean --digitalocean-access-token=$DIGITAL_OCEAN_TOKEN --digitalocean-size=512mb docker-demo 
```

That's it! The new droplet has Docker up and running, and an SSH key was created automatically for you, allowing you to run `docker-machine ssh docker-demo` to access its shell if needed.

But to deploy our app, there's an even easier way.

### Running Docker Compose remotely 

Docker Compose supports running containers on remote hosts rather than locally. For this, only a few environment variables are needed to point to the correct host, and Docker Machine also has us covered there:

```shell
$ eval $(docker-machine env docker-demo)
```

After running the above command, our terminal will have set `DOCKER_HOST` and a couple of other variables, pointing to the droplet we created.

And just like magic, we can now seamlessly start our docker containers on that host:

```shell
$ docker-compose up -d
```

All of Compose's commands will work as before, but their effects will happen remotely instead. The `-d` option ensures the containers are run as a background process, so our app is now fully running. You can run `docker-compose ps` to see the proof

Once you're done, you can either open a new terminal or run `eval $(docker-machine env -u)` to unset the environment variables and go back to local mode.

Now our app is running in a remote droplet, but it's not yet accessible to the outside world. Let's fix that with an nginx reverse proxy.

## Nginx reverse proxy

We first need to install nginx on the droplet, since it doesn't come pre-installed:

```shell
$ docker-machine ssh docker-demo
root@docker-demo:~$ sudo apt-get install nginx
```

All that's left is a simple nginx configuration, pointing all requests to port 4000, which we previously exposed in our Compose configuration. Add the following as `etc/nginx/sites-enabled/your-website.conf`, replacing `your-website.com` with the actual URL you want to use:

```nginx
upstream your-website {
  server 127.0.0.1:4000;
}

server {
  listen 80;
  server_name [your-website.com](http://your-website.com) www.your-website.com;

  location / {
    proxy_pass http://your-website;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Host $server_name;
  }
}
```

After this, run `service nginx start` to start the process. If you already did the previous `docker-compose up -d`, then your app should now be accessible. Congratulations!

<span id="running-migrations"></span>
## Running migrations

Now that you successfully deployed an Elixir web app, you need to take care of updates as well. One of the most common maintenance tasks of updating an app is to run database migrations.

In development, you usually do this by running `mix ecto.migrate` , but you might remember that, at the beginning of the post, I mentioned that this is not an option for release builds. The mix interface is not available in production, so we need a different solution.

Fortunately, it is really easy to run migrations programmatically, and both Ecto and Distillery provide us with the necessary tools.

With Distillery, we can specify hook scripts that will be executed when our app first starts. And through these scripts, we can make an RPC call to our app, triggering some code that will run the migration.

### Running migrations programmatically 

Define the following module somewhere in your codebase:

```elixir
defmodule Demo.Release.Tasks do
  def migrate do
     {:ok, _} = Application.ensure_all_started(:demo)

     path = Application.app_dir(:demo, "priv/repo/migrations")

    Ecto.Migrator.run(Demo.Repo, path, :up, all: true)
  end
end
```

This calls the Ecto API, which goes through your migrations and runs any new ones.

We now need to trigger this code to be called when our app is deployed, using a hook that Distillery provides us. Edit the production section of your `rel/config.exs` file:

```elixir
...

environment :prod do
  ...

  # add this line
  set post_start_hook: "rel/hooks/post_start"
``` 

This references a `rel/hooks/post_start` file, which we will now create. This is actually a regular shell script where we can do whatever we need.

In this case, we're going to use RPC to call the Elixir function defined above:

```shell
##!/bin/sh

set +e

while true; do
  nodetool ping
  EXIT_CODE=$?

  if [ $EXIT_CODE -eq 0 ]; then
    echo "Application is up!"
    break
  fi
done

set =e

echo "Running migrations"
bin/demo rpc Elixir.Release.Tasks migrate
echo "Migrations run successfully"
```

Now every time the app is deployed, our migration task will be called.

You can see that this is not tied to database migrations in any way. We can easily add other kinds of tasks to this hook, making it a very generic way of having additional deployment tasks running.
  
<span id="final-thoughts"></span>
## Final thoughts

If you enjoyed this tutorial, or if you have any questions feel free to reach me out through [Twitter](https://twitter.com/naps62) or via the comments below.

Or, if you're ready to take it to the next step, you can also take some hints from our tutorial for [building offline web applications](https://subvisual.co/blog/posts/130-how-to-build-offline-web-applications-with-couchdb-and-pouchdb).
