---
id: 75
path: /posts/75-ruby-bits-br-bundle-open/
title: "Ruby Bits:  Bundle open"
author: luis-zamith
date: 2016-03-29
cover: https://subvisual.s3.amazonaws.com/blog/hero/141/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/141/image@2x.jpg
tags:
  - ruby-bits
  - development
  - ruby
intro: "If you've ever used Ruby you have probably used `Bundler` through it's command"
---

If you've ever used Ruby you have probably used `Bundler` through it's command
line tool `bundle`. There's quite a few things you can do with `bundle`, from
the more common `bundle install` or `bundle exec`, to the less frequently
mentioned `bundle outdated`.

In between those there is a very useful command, `bundle open`, which will open
the code for a specified gem with an editor you can also configure.

Configuring the editor is as simple as defining an environment variable with
your editor of choice, which in my case is `vim`:

```bash
export $EDITOR=vim
```

Now, if I run `bundle open rails`, I'll have `vim` open with the rails source
code for the version in the current bundle. Neat.

## `ctags`

If you want to have something similar integrated with your editor you can look
at [`ctags`](http://ctags.sourceforge.net/) and how to install them in your
machine and editor. But it will basically go through source code of languages it
recognizes (a lot) and generate an index file for them, so that you can easily
look up methods, class definitions, etc.

For example, in my `vim` setup I have a map of `fd` (find definition) that uses
`ctags`, so that I can go directly from my source code to a gem's source code and
back without ever leaving my editor.

The main issue with `ctags` is that it's pretty much a cache, and you need to
update it every time you install a gem or update its version. Luckily (and for
those of you who use `vim` certainly not for the first time) Tim Pope comes to
the rescue with the [`gem-ctags`](https://github.com/tpope/gem-ctags) gem,
that will do that updating for you.

## More Ruby Bits

If you've enjoyed this Ruby Bit you should really subscribe to [our
newsletter](https://subvisual.co/newsletter/), where other Ruby Bits and
more great articles are shared every week.

