---
id: 51
path: /posts/51-getting-hooked/
title: "Getting Hooked"
author: miguel-palhas
date: 2015-02-18
tags:
  - development
intro: "I said it before and I'll say it again, several times: Automation is awesome."
---

I said it before and I'll say it again, several times: Automation is awesome.

I previously showed an example of how you can automate the whole [process of merging pull requests](https://blog.groupbuddies.com/posts/44-easily-merging-pull-requests).

Now I'd like to share another git tip that helps me speed up my workflow. This one is about [git hooks](http://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).

## What are git hooks?

A git hook is a script that gets triggered automatically when certain events happen (e.g. when creating a new commit). Now you're probably remembering that Github has something similar, called [Webhooks](https://developer.github.com/webhooks/). Those are the things that trigger your [Travis CI](https://travis-ci.org/) builds every time you push a new commit (that's just one example of the many integrations Github provides).

While those are great for their purpose, git itself has its own hooks that you can use to your advantage in your local copy of a repository.

Some of the most commonly used hooks include:

* **pre-commit** Triggered when you invoke `git commit`, but before the commit is actually created
* **post-commit** Same thing, but gets triggered after the commit is created
* **post-checkout** For when you use `git checkout`, or when the `HEAD` pointer changes.

You can see the full list in the [official docs](http://git-scm.com/docs/githooks), but this gives you a good overview already.

Hooks can also influence the behaviour of git itself. For instance, if a `pre-commit` hook exits with a non-zero status, the commit command is cancelled. This allows you to define some interesting behaviour.

## Your first hook

To create a git hook for your project, all you have to do is create an executable in the `.git/hooks/` directory of your local repository, with the filename being the name of the hook you want to listen to. You can use any language you want (but I'm sticking to Ruby and Bash scripts here).

Let's say you want to boost your morale, by printing a random joke to the terminal every time you create a new commit. You can do this with the following script:

```ruby
##!/usr/bin/env ruby

require 'net/http'
require 'json'

uri = URI.parse('http://api.icndb.com/jokes/random?limitTo=[nerdy]')
response = Net::HTTP.get(uri)
joke = JSON.parse(response)["value"]["joke"]

puts joke
```

Save this file as `.git/hooks/post-commit`, give it execution permissions with `chmod +x .git/hooks/post-commit`, and you're good to go:

```bash
$ git commit -m "Testing my git hook"
Chuck Norris doesn't need to use AJAX because pages are too afraid to postback anyways.
[master e7c64d9] Testing my git hook
```

## How about something useful now?

Now we're ready to do some hooks that actually help our workflow.

### Preventing mistakes

Have you ever pushed something, only to find out 5 minutes later that you forgot to remove that nasty breakpoint from the code? Or maybe you tend to push commits with small code style issues that your CI warns you about right away.

A good solution could be having a hook that looked for those mistakes, and prevented you from committing them. For a Ruby project, it could be something like this:

```shell
##!/bin/sh

function check_gemfile {
  git diff --exit-code --cached -- Gemfile Gemfile.lock > /dev/null || bundle check
}

check_gemfile || rake test
```

The first function will check if your `Gemfile` and `Gemfile.lock` match each other. If you update the first one, but forget to stage the second one, that's usually a mistake. And you don't need to bother your CI server when mistakes are easily and quickly detected.

If that check passes, the script will also run your test suite.

That last detail is probably an overkill. You don't want your entire test suite to be run every time. But maybe you have a smaller subset of that, or a quick tool you use for code style checks? [Aaron Patterson](https://twitter.com/tenderlove) created a [gist](https://gist.github.com/tenderlove/fba8eaf2b2e3d84d77c5#file-cov-rb) that allows you to detect which specs are affected by your changes, and this is a great use case for it.
Another option is to run [rubocop](https://github.com/bbatsov/rubocop) or some other code quality tool that you might have integrated in your workflow.

### Updating your metrics

[Code Climate](https://codeclimate.com/) is a great tool. But it's also an expensive one (for private repositories, at least).

A poor man's alternative is to use a local tool like [metric_fu](https://github.com/metricfu), that compiles a list of issues found in your code. It also plots how the issues count progresses over time, which is interesting for analysing how your projects evolve (or degrade).

I liked the idea of maintaining a plot with the evolution of our projects, but I definitely can't rely on myself to remember to run metric_fu periodically. So I built a hook that does it for me.

But for this case, doing that after every commit was not an option. That would end up plotting data about my feature branches, which did not reflect the state of the final code.

I wanted to run this only for commits merged to the `master` branch. That requires a bit more work:

```shell
##!/bin/sh

## get current branch name
branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$branch" == "master" ] && [ -f Gemfile ] && [ -x $(which metric_fu) ]; then
  destination=".metrics"
  echo "Running metric_fu at ${destination}"
  mkdir -p $destination
  metric_fu --out $destination > /dev/null 2>&1 &
fi
```

Here I'm checking for three things before actually running metric_fu:
1. Is the current branch `master`?
2. Does this repository have a `Gemfile` (or rather, is this a Ruby project?)
3. Is metric_fu installed?

If everything checks, the metrics are saved to `.metrics`. The gem will take care of merging any previous results that already existed in there.

It's also worth nothing the way I'm invoking `metric_fu`:

```shell
metric_fu --out $destination > /dev/null 2>&1 &
```

I'm suppressing all output, including errors, and I'm running it in the background. Since it might be a long process, and I don't need the metrics right away, I can just keep going with my life.



### Be creative

You can think of all sorts of other things to automate this way. For example, [this article](http://tbaggery.com/2011/08/08/effortless-ctags-with-git.html) by Tim pope [Tim pope](https://twitter.com/tpope) covers how you can have your [ctags](http://ctags.sourceforge.net/) entirely managed by git hooks.
Be sure to leave a comment if you have an interesting idea for another git hook. I'm actively looking for more.
