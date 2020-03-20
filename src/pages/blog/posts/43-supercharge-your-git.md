---
id: 43
path: /posts/43-supercharge-your-git/
title: "Supercharge your git"
author: luis-zamith
date: 2014-11-17
tags:
  - development
intro: ""
---


Git is so awesome and packs so much power that I could hardly fit it all in a
blog post (or 100 for that matter). What this post will talk about though, are a
couple of ways to extend your git for it to better serve you on your everyday
tasks.

### ZSH

This is post is **not** about ZSH, but it is awesome and you should install it. All
the configs will assume you are using it, but surely there are ways of doing the
same for your shell of choice.

### Hub

> hub is a command line tool that wraps `git` in order to extend it with extra
> features and commands that make working with GitHub easier.

This is the description taken straight out of the project's README. Hub is
written by the guys at Github, so it is very much compliant with everything on
the site. As of recently you can install it with Homebrew (non-mac users will
have to compile it manuallly, I believe).

```bash
brew install --HEAD hub  # For the 2.x version
```

Now you can use `hub` and all it's powers. The sane thing to do though, is to
alias `git` to `hub`, which works perfectly as `hub` will delegate all non-hub
commands to `git`.

Just open your `.zshrc` and add the alias:

```bash
alias git='hub'
```

When you brew install `hub` you will see that it installs completion files to
you system.

```bash
zsh completion has been installed to:
  /usr/local/share/zsh/site-functions
```

If you run `echo $fpath` on your terminal that path should be there. `fpath`
stands for functions path and you can store you functions in any directory
listed in `fpath`. Read more about zsh functions
[here](https://zsh.sourceforge.net/Doc/Release/Functions.html).

This will provide auto-complete functionality for all your `git` needs.

If you are like me, though, and `git` is the command you use more often (about
30% of the time in my case), you will probably want to alias it to something
shorter, such as `g`.

```bash
alias g='git'
```

So now `g` maps to `git` which maps to `hub`. Great! We have, however,
introduced an issue. Auto-complete is broken. That is because the git auto
completion function is only expecting `git` or `gitk` as commands to auto
complete.

You can add `g` to that set easily enough. Again, open your `.zshrc` and add
`compdef g=git`.

You should have everything ready to go.

### Git commands

Hub adds some really nice things, but what about those specific commands you
love to use? At some point all of us have added commands as aliases in
`gitconfig`.

```bash
[alias]
    ia = add --intent-to-add -A
```

This is not inherently bad, but it can go out of hand pretty quickly. Moreover,
you don't really have a lot of scripting power with these aliases. As you might
have guessed by now, there is a better way of doing this and it is so cool that
even some of the [builtin commands use this strategy](https://github.com/git/git/blob/master/git-bisect.sh).

The basic idea is that any executable script on you `PATH` that is named
`git-some-name` will be available as a git subcommand, which means you could do
`git some-name` to run the script.

Git is so awesome that it even adds them to `git help -a` under the title "git
commands available from elsewhere on your $PATH", which will then power the auto
completion, so that will also work for any command you add.

Going back to our example, there's a couple of things to do to remove it from an
alias into a command, add a directory to the `PATH` and create a script on that
directory.

```bash
mkdir -p ~/dotfiles/git_commands
export PATH="$HOME/dotfiles/git_commands"  # Also add this to you zshrc, to persist it
echo "git add --intent-to-add -A" > ~/dotfiles/git_commands/git-ia
```

You should now be able to remove the alias from the `gitconfig` and still be able
to run `git ia`.

#### Bonus round

Git will just grab the scripts that follow the aforementioned convention and run
them. That means that as long as the shebang is correctly set, you can write a
script in any scripting language.

Here's one in ruby:

```ruby
##!/usr/bin/env ruby

puts "Hello"
```

Just name it `git-hello`, put it in your `git_commands` directory and you should
be able to type `g hello` and have git say "Hello" back.

#### Further reading

If you want to check some actual examples you can do it in [my dotfiles](https://github.com/zamith/dotfiles/tree/master/git_plugins)
or in [Wynn Netherland's dotfiles](https://github.com/pengwynn/dotfiles/tree/master/bin).
This post was inspired by a talk given by Wynn at the [DallasRB meetup](https://www.dallasrb.org/),
so do check his stuff.

