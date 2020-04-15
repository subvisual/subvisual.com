---
id: 63
path: /posts/63-deploying-a-crystal-application-to-heroku/
title: "Deploying a Crystal application to Heroku"
author: luis-zamith
date: 2015-07-15
cover: https://subvisual.s3.amazonaws.com/blog/hero/125/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/125/image@2x.jpg
tags:
  - development
intro: "[Crystal](http://crystal-lang.org/) is a typed, LLVM compiled language that"
---

[Crystal](http://crystal-lang.org/) is a typed, LLVM compiled language that
reads (mostly) as Ruby. It's a modern language that comes bundled with support
for WebSockets, OAuth and other niceties.

Even at its early stage, there are already more than a couple web frameworks
gaining popularity in the community. We're going to use
[Amethyst](https://github.com/Codcore/Amethyst), which is currently the most
popular one (as far as GitHub stars go).

## Getting the dependencies

You should be able to find out how to install Crystal on your system, on the official
website. Once you have it installed you'll need to create a new directory for
the project and create a file that lists Amethyst as a dependency.

```
$ mkdir hello_subvisual
$ cd hello_subvisual
$ touch Projectfile
```

The `Projectfile` is Crystal's equivalent to Ruby's `Gemfile` or NPM's
`package.json`, and it should have the following content:

```ruby
deps do
  github "Codcore/amethyst"
  github "spalger/crystal-mime"
end
```

Make sure you use double quotes around the repository names, because there are no
single quoted strings in Crystal.

At the moment of writing there is no central repository for Crystal libraries
(which are called shards). They all just "live" on GitHub repositories. Also, it
does not handle recursive dependencies, that's why we need to specify
`crystal-mime` as a dependency. This should be fixed soon enough, but if you
wish to know more about the project trying to solve these issues, follow
[shards](https://github.com/ysbaddaden/shards) on GitHub.

To fetch the listed dependencies, run `crystal deps`. This will create a `libs`
directory that contains the source files of the cloned repositories, alongside
with a `.deps.lock` file, a `.deps` and a `.crystal` directories. They are all
needed for Crystal to function properly, but you shouldn't have to worry too
much about them.

Great! You are now ready to start developing your application.

## My first Crystal web application

The focus of this article is not to explain how Amethyst works, they do a pretty
good job at that themselves, in the project's README. We will just copy their
[hello world example](https://github.com/Codcore/Amethyst#example) and use that
as our application, modifying only the name we are greeting. We'll call it
`app.cr` and here's how it should look like:

```ruby
require "amethyst"

class WorldController < Base::Controller
  actions :hello

  view "hello", "#{__DIR__}/views"
  def hello
    @name = "Subvisual"
    respond_to do |format|
      format.html { render "hello" }
    end
  end
end

class HelloWorldApp < Base::App
  routes.draw do
    all "/",      "world#hello"
    get "/hello", "world#hello"
    register WorldController
  end
end

app = HelloWorldApp.new
app.serve
```

That takes care of routing, the controller and starting the app. The only
missing link for a functional application is the view, which should live under
`views/hello.ecr`, where `ecr` stands for embedded crystal, and allows us to
write HTML with some sprinkles of Crystal. Your view can be as simple as:

```ruby
Hello, <%= name %>
```

Finally, you should be able to run it with `crystal app.cr` and access it at
`http://localhost:8080`.

## Going live

We are now at a point where we can create an application on
[Heroku](https://www.heroku.com/). If you haven't yet done it, create an account
on Heroku and install the [Heroku Toolbelt](https://toolbelt.heroku.com/).

Crystal is not supported out of the box by Heroku, so we'll need to use a custom
buildpack. You can use the one I created, that uses the latest version of
Crystal:

```
$ heroku create subvisual-hello --buildpack https://github.com/zamith/heroku-buildpack-crystal
```

Heroku needs to be able to set the port our app runs on, and the buildpack
assumes it accepts a `--port PORT` option. We can add that to our code easily
enough.

```ruby
require "amethyst"
require "option_parser"

class WorldController < Base::Controller
...
end

class HelloWorldApp < Base::App
...
end

server_port = 8080
OptionParser.parse! do |opts|
  opts.on("-p PORT", "--port PORT", "define port to run server") do |port|
    server_port = port.to_i
  end
end
app = HelloWorldApp.new
app.serve(server_port)
```

All that's left is to create a git repository, add the Heroku remote and push it
there. Don't forget to add `.deps`, `.crystal` and `libs` to `.gitignore`.

```
$ git init
$ heroku git:remote -a subvisual-hello
$ git add -A
$ git commit -m "My first Crystal app"
$ git push heroku master
```

And that's it. You can visit your application's URL and see it live.

## More on Crystal

If you liked Crystal and want to know more, watch my [talk on Eurucamp 2015](http://confreaks.tv/videos/eurucamp2015-crystal-the-programming-language).
