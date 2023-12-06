---
highlight: false
path: unsucking-your-project-onboarding
title: Unsucking your project onboarding
categories:
  - engineering
author: fernando-mendes
date: 2020-08-21
seoImage: ./seo.png
intro: >
  So you have a new developer joining your project. And, as usual, everything
  changed in Javascript landscape since 37s ago. At Subvisual we have a system
  to handle this.
tags:
  - development
  - devops
---

So you have a new developer joining your project. And, as usual, everything
changed in Javascript landscape since 37s ago. Everyone is already on a shiny
new framework. Of course, you, being an amazing developer, are ahead of the
landscape for at least 112s! You're already 3 frameworks and 7 minor versions
ahead.

However, the new developer isn't. And now they have to install the new backend
language version, let's say Elixir, which by the way needs this really specific
OTP 22 version, oh and let's not forget the frontend. Yeah, we're going to need
a new node version which might mean having to import the team keyring, plus the
whole Webpack thingy. Wait, you used `npm`? Nope, not gonna happen, we use
`yarn`.  Yeah, run that again and delete this file. Is it done? Ok, you can run
the app!

It's not working? Oh yeah, the environment variables. We need them to start the
app in development sometimes. Well, I'll send them to you through Slack even
though Slack isn't encrypted.

Ah, let's not forget setting up the database, migrating and seeding it. I guess
that's all? Oh, how could we have forgotten... To use Phoenix you need to do the
mix archive install thing, besides the usual dependency declaration. You're
gonna need to do that as well.

Well, this took all week. See you Monday!

.

.

.

.

.

Sound familiar? In **every** (and I mean every) project Subvisual does, we use
`bin/` scripts. And not just to set up the project. **The programming languages
and frameworks should be accessories to what you're doing. They're tools you use
and making use of them should be as simple as possible.** In every project we
have a setup to do, a server to run and linters to check. So we abstract those
steps with `bin/setup`, `bin/server` and `bin/lint`.

This is particularly important for open source projects where you want people to
join in and help with as little friction as possible.

These first three scripts are so common, I have `s`, `se` and `l` aliased to
`bin/{server,setup,lint}` just to avoid having to type all those extra letters.

We don't stop there. **If anything requires you to memorise a command, we
automate it.** This allows us to onboard people into the project by doing a
simple `git clone` and `bin/setup`. **Time to first contribution is a couple of
hours instead of 1+ days**.

Let's get right into the basic scripts, the advanced scripts and the insane ones.

## Into the basics

As I mentioned, there are three essential scripts: `bin/server`, `bin/setup` and
`bin/lint`. The first runs the development server. The second installs
everything you might need to run the project. The third runs all linters and
checks, usually being equivalent to running the CI locally.

### bin/server

Usually the simplest script, these are examples for Elixir, Ruby and JavaScript
(Gatsby) projects:

```shell
#!/usr/bin/env sh

# Phoenix
iex -S mix phx.server

# Ruby
bundle exec foreman start -f Procfile.dev

# JavaScript
yarn start
```

Sometimes, however, we need to do complex operations. As an example, in an
internal project we had to set up `ngrok` before starting the server. Because
this is something we tend to forget and newcommers might not be aware of, I made
this `bin/` script that launches `ngrok` in the background, gets generated URL,
launches the server and kills `ngrok` before exiting.

```shell
#!/usr/bin/env bash

set -e

trap ctrl_c INT

ctrl_c() {
  printf "\n"
  echo "Received kill signal, stopping ngrok... "
  $(killall ngrok &>/dev/null);

  printf "Done!\n"

  exit 1
}

PORT=${PORT:-4000}

echo "Starting ngrok... "

ngrok http $PORT > /dev/null &

sleep 2

REGEX="\"public_url\":\s*\"(https://([^\"]+))\"[^{]+{\"addr\":\s*\"http:\/\/localhost:$PORT\""

JSON_RESPONSE=$(curl http://localhost:4040/api/tunnels 2>/dev/null)

if [[ "$JSON_RESPONSE" =~ $REGEX ]]; then
  export WEBHOOK_URL=${BASH_REMATCH[1]}
  export HOST=${BASH_REMATCH[2]}
  export ENDPOINT_PORT="443"
  export SCHEME="https"

  printf "Done!\n\n"
  echo "Your webhook url is $WEBHOOK_URL"
else
  echo "Wow, something went wrong with ngrok!";
  ctrl_c
fi

echo "Starting development server with options HOST=$HOST SCHEME=$SCHEME ENDPOINT_PORT=$ENDPOINT_PORT..."

iex -S mix
```

<a href="https://asciinema.org/a/Jbbe7Fvt5OYHEvqAfqEAyJeXc" target="_blank">
  <img src="https://asciinema.org/a/Jbbe7Fvt5OYHEvqAfqEAyJeXc.svg" alt="bin/server in action" style="max-width: 100%"/>
</a>

Anyone coming into the project doesn't need to be aware of this complexity, they
would just run a command and voilá. Magic.

### bin/lint

Usually nothing more than the scripts you would run on CI. As an example, here's
what we have on a project that runs the linters for frontend (in JavaScript) and
backend (in Elixir). Notice the `set -e`. This causes the script to exit if a
command has a non-zero exit code. The reasoning behind this is to mimic the CI
behaviour.

```shell
#!/usr/bin/env sh

set -e

echo "running the CSS linter..."
yarn lint-styles

echo "running the javascript linter..."
yarn lint

echo "running the elixir formatter..."
mix format --check-formatted

echo "running elixir credo..."
mix credo --strict

echo "no problems found!"
```

<a href="https://asciinema.org/a/5LcwnppxHGFAh4AViIMYG9gme" target="_blank">
  <img src="https://asciinema.org/a/5LcwnppxHGFAh4AViIMYG9gme.svg" alt="bin/server in action" style="max-width: 100%"/>
</a>

### bin/setup

Ah, the crown jewel. Usually the most complex script as it installs everything
a developer might need. We usually make a few small assumptions:

1. You have a database server installed and running. It's difficult to guess the
   way someone might install it and for such a rare edge case, the script would
   get unnecessarily complex.
2. We usually use `.envrc` files for environment variables, with `direnv`
   although this is not mandatory (the script should handle this).
3. We use [`asdf`][asdf] to manage versions, although this is not mandatory (the script
   should also handle this).

With this in mind, let's breakdown a simple `bin/setup` script. The first step
is usually to ensure the needed languages are installed. Afterwards we should
set up the environment variables and source them. Finally, install any needed
dependencies and create and migrate the database.

#### Helpers

Before we dive into the script, a small detour. I usually add a `bin/functions`
script containing some helper functions. It gets passed around from project to
project and all it does is provide some pretty printing functions, a
`not_installed` helper and functions to `ensure_confirmation` and
`ask_confirmation`:

```shell
#!/usr/bin/env sh

BLUE='\033[1;34m'
GREEN='\033[1;32m'
YELLOW='\033[1;99m'
RED='\033[1;91m'
RESET='\033[0m'

pp() {
  printf "$1[$2]: $3${RESET}\n"
}

pp_info() {
  pp $BLUE "$1" "$2"
}

pp_success() {
  pp $GREEN "$1" "$2"
}

pp_error() {
  pp $RED "$1" "$2"
}

pp_warn() {
  pp $YELLOW "$1" "$2"
}

not_installed() {
  [ ! -x "$(command -v "$@")" ]
}

ensure_confirmation() {
  read -r "confirmation?please confirm you want to continue [y/n] (default: y) "
  confirmation=${confirmation:-"y"}

  if [ "$confirmation" != "y" ]; then
    exit 1
  fi
}

ask_confirmation() {
  read -r "confirmation?please confirm you want to continue [y/n] (default: y) "
  confirmation=${confirmation:-"y"}

  [[ "$confirmation" == "y" ]];
}
```

#### Language Install

Having this, let's set up our script:

```shell
#!/usr/bin/env sh

set -e
. "./bin/functions"

env=${1:-"dev"}
```

As usual we use the `-e` flag to make sure we stop the script if any command
fails and we `source` the `bin/functions` helpers. We also allow defining an
`env`, which defaults to `dev` as the first argument.

The first step is then to install the required languages. In this sample
project, let's assume we are using Elixir for the backend and the frontend is a
classic React app.

```shell
pp_info "setup" "Installing required languages..."

if not_installed "asdf"; then
  pp_error "setup" "
    We are using asdf (https://github.com/asdf-vm/asdf) to manage tool
    dependencies, since it was not found on your system we cannot ensure that you
    are using the correct versions of all the tools. Please install it and run
    this script again, or proceed at your own peril.
  "

  ensure_confirmation
else
  set +e
  asdf plugin-add erlang https://github.com/asdf-vm/asdf-erlang.git 2>/dev/null
  asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git 2>/dev/null
  asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git 2>/dev/null
  set -e

  printf "Importing nodejs release team keyring... "
  $HOME/.asdf/plugins/nodejs/bin/import-release-team-keyring
  echo "Done!"

  asdf install
fi

pp_info "setup" "resourcing environment"
source ~/.asdf/asdf.sh
```

As mentioned, we favour `asdf` for language version management. Usually this
means we'll commit a `.tool-versions` in the repo to ensure everyone is running
the same language versions.

Notice that since `asdf` is not required, we check if it isn't installed and if
not, we notify the developer and ask for confirmation. Otherwise, we dive right
into the `asdf` parts.

We run `set +e` before adding the plugins in case it fails since they're
probably already added. Afterwards we'll need to import the `nodejs` release
team keyring, before safely installing node, which is conveniently made
available by `asdf-node`.

#### Environment setup

Having the languages available, we then move on to setting up the environment
through environment variables. This usually happens through `dotenv` (less
common) or (more common nowadays) `direnv`.

Lately all projects I've been on have been built with `direnv` in mind, so let's
focus on that:

```shell
pp_info "setup" "Setting up the env..."

if [ ! -f .envrc ]; then
  cp .envrc.sample .envrc
  printf "env file created, you might want to open .envrc and set the correct values. We recommend using direnv to manage it.\n\n"
else
  printf "envrc file already exists, skipping...\n\n"
fi

. "./.envrc"
```

We always add a `.envrc.sample` to the project to document the environment
variables we need. The condition makes sure no `.envrc` is present when doing
the copy as to not override it. **We always try to make sure `bin/setup` is
idempotent**, allowing others to run it repeatedly without making any damages.

There have also been some variations of this snippet that check for the
installation of `direnv`, similarly to what we do with `asdf`, but it has since
been dropped.

As a sidenote, if you are using `dotenv`, replace `.envrc` with `.env` and it
should work!

#### Installing dependencies

In a typical Elixir + React project, this breaks down into three steps: making
sure `yarn` is available, installing Node dependencies, installing Elixir
dependencies:

```shell
pp_info "setup" "Ensuring yarn is installed"
if not_installed "yarn"; then
  curl -o- -L https://yarnpkg.com/install.sh | bash
else
  echo "All done!"
fi

pp_info "setup" "Installing node requirements"
yarn install

pp_info "setup" "Installing elixir dependencies..."
MIX_ENV=$env mix local.hex --force
MIX_ENV=$env mix local.rebar --force
MIX_ENV=$env mix deps.get
```

Digging through different projects, I also found these several variations for
this step across old projects:

```shell
# Python project
pp_info "setup" "Attempting to upgrade pip"
pip install --upgrade pip

pp_info "setup" "Installing python requirements"
pip install -r requirements.txt

# Gatsby project (after ensuring the yarn install)
pp_info "setup" "Ensuring gatsby is installed..."
npm install -g gatsby-cli

pp_info "setup" "Installing dependencies..."
yarn install

# Ruby project
pp_info "setup" "Attempting to install bundler..."
gem install bundler --conservative

pp_info "setup" "Installing all the gems..."
bundle check || bundle install

# Elixir project that required ngrok also included this:
pp_info "setup" "Installing ngrok..."
npm install -g ngrok
```

#### Setting up the database

Finally, when all is said and done, just run with the database:

```shell
MIX_ENV=$env mix deps.get
MIX_ENV=$env mix ecto.create
MIX_ENV=$env mix ecto.migrate
```

The use of `$env` allows us to mimic production environments locally (usually in
extremes cases that require extreme measures).

Here's the full `bin/setup` script for a project using Phoenix and React:

```shell
#!/usr/bin/env sh

set -e
. "./bin/functions"

env=${1:-"dev"}

pp_info "setup" "Installing required languages..."

if not_installed "asdf"; then
  pp_error "setup" "
    We are using asdf (https://github.com/asdf-vm/asdf) to manage tool
    dependencies, since it was not found on your system we cannot ensure that you
    are using the correct versions of all the tools. Please install it and run
    this script again, or proceed at your own peril.
  "

  ensure_confirmation
else
  set +e
  asdf plugin-add erlang https://github.com/asdf-vm/asdf-erlang.git 2>/dev/null
  asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git 2>/dev/null
  asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs.git 2>/dev/null
  set -e

  printf "Importing nodejs release team keyring... "
  $HOME/.asdf/plugins/nodejs/bin/import-release-team-keyring
  echo "Done!"

  asdf install
fi

pp_info "setup" "resourcing environment"
source ~/.asdf/asdf.sh

pp_info "setup" "Setting up the env..."

if [ ! -f .envrc ]; then
  cp .envrc.sample .envrc
  printf "env file created, you might want to open .envrc and set the correct values. We recommend using direnv to manage it.\n\n"
else
  printf "envrc file already exists, skipping...\n\n"
fi

. "./.envrc"

pp_info "setup" "Ensuring yarn is installed"
if not_installed "yarn"; then
  curl -o- -L https://yarnpkg.com/install.sh | bash
else
  echo "All done!"
fi

pp_info "setup" "Installing node requirements"
yarn install

pp_info "setup" "Installing elixir dependencies..."
MIX_ENV=$env mix local.hex --force
MIX_ENV=$env mix local.rebar --force
MIX_ENV=$env mix deps.get

pp_info "setup" "Setting up the database"
MIX_ENV=$env mix deps.get
MIX_ENV=$env mix ecto.create
MIX_ENV=$env mix ecto.migrate

pp_success "setup" "You're good to go! Run bin/server to get the development server running."
```

And here you can see it in action:

<a href="https://asciinema.org/a/3FmioM9u8d8wNinke8PypNAm0" target="_blank">
  <img src="https://asciinema.org/a/3FmioM9u8d8wNinke8PypNAm0.svg" alt="bin/server in action" style="max-width: 100%"/>
</a>

### The curious case of bin/secrets

I previously mentioned the difficulty of managing secrets and environment
variables. In projects that allow mock values for environment variables in
development, we tend to put these fakes in `.envrc.sample`.

Sometimes, however, we need to use sensitive data in development (e.g. API
client ID and secrets). For those scenarios we make use of Keybase's encrypted
git repos. They work just like a normal git repo, which means we can add them
to our project as submodules. Usually we call the repo `secrets` and in them,
files with the name of the environment they correspond to. So the `dev`
environment would have a `dev` file and so on.

Consequently, we'll need a small tweak to allow `bin/setup` to initialise them
after cloning the repo for the first time.

```shell
# old code:

pp_info "setup" "Setting up the env..."

if [ ! -f .envrc ]; then
  cp .envrc.sample .envrc
  printf "env file created, you might want to open .envrc and set the correct values. We recommend using direnv to manage it.\n\n"
else
  printf "envrc file already exists, skipping...\n\n"
fi

. "./.envrc"

# new code:

bin/secrets "$env"
. "./.envrc"
```

This new `bin/secrets` handles the submodule initialisation and symlinks the
`.envrc` to `.secrets/$env`, following our naming convention.

We'll also need to be able to update the submodule whenever we need, in case
someone makes changes or adds a new variable, so `bin/secrets` should handle all
this.

```shell
#!/usr/bin/env sh

set -e
source "./bin/functions"

env=${1:-"dev"}

if [ -z "$(ls -A .secrets)" ]; then
  pp_info "setup" "Initialising submodule..."
  git submodule update --init --recursive
fi

pp_info "setup" "Setting up envrc..."
if [ -f .envrc ]; then
  git submodule update --recursive --remote
  printf "env file updated.\n"
else
  ln -s .secrets/$env .envrc
  printf "env file created.\n"
fi
```

In terms of making this manageable on Keybase, we have a Subvisual team. For
each project, we create a subteam containing the developers in that project. The
encrypted git repo belongs to this same team. Protip: make sure you turn off "announce
pushes on `#general`". Everyone will thank you for it.

## Into the wild

Occasionally, in the wild of our safari called Subvisual, we find other `bin/`
scripts.

### bin/test

Found when the tests are complex or require multiple commands (e.g running
integration tests separately, running frontend and backend tests). It's not that
common to find these since most of us use setups with `vim-test`, similar to
what [Miguel uses for Elixir][vim-test].

Example:

```shell
#!/usr/bin/env sh

set -e

. "./bin/functions"
. "./.envrc"

pp_info "test" "running frontend tests"
yarn jest

pp_info "test" "running elixir tests"
mix test

pp_success "test" "tests passed!"
```

### bin/client

When the backend and frontend are run separately, `bin/server` becomes
responsible for running the server only and we add in a `bin/client`.

As an example, this is a Node script that runs `webpack-dev-server` separately:

```javascript
#!/usr/bin/env node

/* eslint-disable no-console */

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.config");

new WebpackDevServer(webpack(config), config.devServer).listen(
  config.devServer.port,
  config.devServer.host,
  err => {
    if (err) console.error(err);
  }
);

process.stdin.resume();
process.stdin.on("end", () => {
  process.exit(0);
});
```

### bin/ci

Sometimes found as an abstraction to help developers mimic the CI behaviour.
Usually comprised by `bin/test` and `bin/lint`.

```shell
#!/usr/bin/env sh

set -e

. "./bin/functions"

pp_info "ci" "running local ci script"

./bin/lint
./bin/test

pp_success "ci" "all good"
```

### bin/ci-helpers

When the CI has a complex setup, it's usually easier to abstract these into
helper scripts and call them directly. We usually don't call these scripts
locally, instead they're only used by the CI.

This script would manage Elixir caching on Semaphore:

```shell
#!/usr/bin/env sh

set -e

ELIXIR_VERSION=$(cat .tool-versions | grep elixir | cut -d ' ' -f 2)
ELIXIR_CACHE_KEY=kiex-elixir-$ELIXIR_VERSION

if cache has_key "$ELIXIR_CACHE_KEY"; then
  cache restore $ELIXIR_CACHE_KEY
else
  kiex install $ELIXIR_VERSION
  cache store $ELIXIR_CACHE_KEY $HOME/.kiex/elixirs
fi

kiex default $ELIXIR_VERSION
. $HOME/.kiex/elixirs/elixir-$ELIXIR_VERSION.env

mix local.hex --force
mix local.rebar --force
```

### bin/console

Sometimes we need special instructions to connect to a production or staging
server or even locally, when there are complex steps to connect to the console.

This is the example used in our [`filecoin-ruby`][filecoin-ruby] gem, added by
default when a new gem is created by Bundler:

```ruby
#!/usr/bin/env ruby

require "bundler/setup"
require "filecoin"

# You can add fixtures and/or initialization code here to make experimenting
# with your gem easier. You can also use a different console, if you like.

# (If you use this, don't forget to add pry to your Gemfile!)
# require "pry"
# Pry.start

require "irb"
IRB.start(__FILE__)
```

### bin/docs

Simple scripts to call to generate docs. Usually just to abstract the doc
generation process so that newcommers don't need to know the intricacies of each
language of framework.

```shell
#!/bin/sh

mix docs
```

### bin/deploy

Sometimes deploying is a cumbersome task, not managed automagically by a build
system. Back in the far off year of 2018, we used this to deploy our [Mirror
Conf website][mirror-2018]:

```shell
#!/bin/sh

environment=staging

usage () {
  cat <<EOS
Usage: $0 [environment]
Deploys the site to the target environment (staging by default).
Options:
  -e [environment]
    Sets the target environment.
    Accepted values:
    * staging: Deploys the website to GitHub Pages (default).
    * production: Deploys to AWS S3.
  -h
    Shows this message and exits.
EOS
}

while getopts ':e:h' opt; do
  case $opt in
    e)
      environment=$OPTARG
      ;;
    h)
      usage
      exit 0
      ;;
  esac
done

case $environment in
  stag|staging)
    yarn run deploy-staging
    ;;
  prod|production)
    yarn run deploy-production
    ;;
  *)
    echo "Unknown environment '$environment'" >&2
    usage >&2
    exit 1
    ;;
esac
```

## Into hyperdrive

As much as we aim to simplify and abstract the process of joining a new project,
several of us take this to a different level: abstracting the process of getting
a new computer. **The philosophy is that your tool should be expendable. Having to
set up a new one should be a matter of minutes or, at most, a couple of hours.
Not days.**

Personally, [I use an install script][dotfiles-install], 100% made in `zsh`. It
installs and sets up [my dotfiles][my-dotfiles] and the apps I need.

[Gabriel][gabriel-dotfiles] has a different philosophy, going with Ansible.
[Miguel][miguel-dotfiles] uses `rcup` and [Pedro][pedro-dotfiles] made a
monster that has CI checks and is completely provisioned through Ansible.

To each their own thing, but the reasoning remains: it's a one-liner to set up a
new computer.

## In summary

**Your computer is your tool and tools should help you, not slow you down**.
Automate as much as possible. Having someone join a project should be as
simple as running `bin/setup`.

**Your computer is your tool and tools should be expendable.** If it becomes
damaged and you need to setup everything anew in a new machine, it should as
simple as running a command.

**Your computer is your tool, don't make a tool of yourself.**

Ta-ta.
<br />
Mendes

---

PS: Drop any suggestions, ideas or questions [on Twitter][my-twitter]. I always
love to hear what people use on their projects, so feel free to reach out!

[vim-test]: https://subvisual.com/blog/posts/vim-elixir-ide
[my-twitter]: https://twitter.com/frmcodes
[gabriel-dotfiles]: https://github.com/gabrielpoca/dotfiles
[miguel-dotfiles]: https://github.com/naps62/dotfiles
[pedro-dotfiles]: https://github.com/pfac/.files
[my-dotfiles]: https://github.com/frm/dotfiles
[dotfiles-install]: https://github.com/frm/dotfiles/blob/4965c426d4199477a91b27e3505b14386ad5a1d6/install
[asdf]: https://asdf-vm.com
[filecoin-ruby]: https://github.com/subvisual/filecoin-ruby
[mirror-2018]: https://github.com/subvisual/2018.mirrorconf.com
