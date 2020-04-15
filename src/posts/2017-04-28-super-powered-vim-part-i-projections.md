---
id: 133
path: /posts/133-super-powered-vim-part-i-projections/
title: "Super-powered Vim, part I: Projections"
author: miguel-palhas
date: 2017-04-28
tags:
  - development
  - vim
intro: "One of my main focus of the past few months has been my productivity with my text editor."
---

One of my main focus of the past few months has been my productivity with my text editor.
This text editor happens to be [Vim], but the concepts of this post are applicable to any code-editing tool.

The main focus of this 3-part series is to minimise time spent on the boring and repetitive parts of writing code.

For now, let's focus on how dull of a task it is to navigate your codebase:

## Filesystems are boring

When working on a given feature, I'll probably be navigating between 2 or more files at a time. For instance:

1. When working on a model class, I'll probably touch the corresponding test files for that class as well;
2. When working on a React.js component, it's likely I'll have to touch the corresponding CSS file.

Navigating between these pairs of files might prove slightly difficult, especially if I have to do it several times during the same task. Even a couple of seconds of context switching can amount to a large time at the end of the day.

Using a component based approach, where all the files related to a given component or domain are stored next to each other, might alleviate this pain.
But for me, that's not necessarily a good solution.

The way I move about my code should not be coupled to what the file structure looks like. As developers, we can come up with much more powerful and context-aware methods of finding stuff.

And that's what [`vim-projectionist`] is all about.

## Defining projections 

There are several useful features within [`tpope/vim-projectionist`]. But the killer for me is the ability to define an alternate for each file.

With a simple configuration based on the naming of your files, you can create "pairs" of files. This can be done with a `.projections.json` file in your repository:

```json
{
  "app/*.rb": {"alternate": "spec/{}_spec.rb"},
  "spec/*_spec.rb": {"alternate": "app/{}.rb"}
}
```

With this simple mapping, we're defining a rule where for every file in the `app` directory, there's an alternate file in the `spec` directory, with a matching name and a trailing `_spec`.

The `{}` placeholder will be filled with whatever matches the `*` for each file.
This might not be the case 100% of the times, but it matches the conventions normally used for Rails apps, so it's a pretty good approximation.

The second projection in the file defines the projection in the opposite direction.

With these pairings in place, I can use simple commands to navigate between a file and its corresponding alternate:

![file](https://subvisual.s3.amazonaws.com/blog/post_image/239/original.gif)

I can switch to the alternate file, or open it in a split or tab, with commands such as `:A` or `:AV`

It's then just a matter of setting up some key maps to make this even easier:

```vimscript
map <leader>aa :A<CR>
map <leader>av :AV<CR>
```

This prevents me from having to think about the directory structure a project is using, and instead focus on actual work.

## System wide projections

It's pretty useful to be able to define projections for each individual project. But there might be cases where you'll end up using the same ones over and over. For instance, in a Rails app, you probably want to add a map between code files and spec files to always exist.

So we can instead make this a system-wide configuration, by applying it to our vim settings directly.

An efficient way to do that is via syntax specific files, so that each set of global projections only gets loaded when needed. Vim-projectionist also provides us with a callback that we can use to lazy-load them only when necessary:

```vimscript
## ~/.vim/syntax/ruby.vim

autocmd User ProjectionistDetect
\ call projectionist#append(getcwd(),
\ {
\    'app/*.rb': {
\      'alternate': 'spec/{}_spec.rb'
\    },
\    'spec/*_spec.rb': {
\      'alternate': 'app/{}.rb'
\    },
\ })
```

It's kind of awkward to define a json schema inline within a VimL file. But hey, it works!
These projections are now global, and are loaded only when necessary, whenever I invoke a projectionist method within a Ruby file.
 

## What's next?

In good ol' Hollywood fashion, this post is part of a trilogy. In [part II], I'll talk about a different concept - snippets - and how I build my own dynamic snippets for Vim.
Later, in [part III], I'll explain an awesome integration that can be done between [`vim-projectionist`] and these snippets, to go even further in the art of *not writing code*™.

[Vim]: http://www.vim.org/
[`vim-projectionist`]: https://github.com/tpope/vim-projectionist

[`tpope/vim-projectionist`]: https://github.com/tpope/vim-projectionist
[part II]: https://subvisual.co/blog/posts/134-super-powered-vim-part-ii-snippets
[part III]: https://subvisual.co/blog/posts/135-super-powered-vim-part-iii-skeletons
