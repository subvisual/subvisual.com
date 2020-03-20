---
id: 134
path: /posts/134-super-powered-vim-part-ii-snippets/
title: "Super-powered Vim, part II: Snippets"
author: miguel-palhas
date: 2017-04-28
tags:
  - development
  - vim
intro: "This post is a follow-up to [Super-powered Vim, part I: Projections](https://subvisual.co/blog/posts/133-super-powered-vim-part-i-projections)."
---

This post is a follow-up to [Super-powered Vim, part I: Projections](https://subvisual.co/blog/posts/133-super-powered-vim-part-i-projections).

Keeping the same line of thought of the previous post, about taking the effort out of the boring tasks that come with writing code, let's now talk about a simple yet powerful concept: snippets.

## Writing code is boring

Open up three different code files in your current project. Now look at them, and compare them.

Chances are you'll see a lot of duplication between them. Maybe not the duplication that you can refactor away though. But, and let's assume here we're talking about a Ruby project, you're seeing something along these lines:

* All 3 files have a class or module, named after the path and file they're in;
* For classes, there might be a constructor that sets up some instance variables;
* You probably have a corresponding test file somewhere, with the same RSpec boilerplate you use everywhere.

Ever thought about not having to write most of this anymore?

As I said above, this is all duplicated code. And while we cannot refactor our app to remove that duplication (without coming up with a new programming language, at least), we can surely make our editor do the heavy-lifting for us:

![file](https://subvisual.s3.amazonaws.com/blog/post_image/247/original.gif)

In the above image, I'm using two snippets created with [UltiSnips].

1. The first one, invoked with the keyword `class` creates a Ruby class, naming it after the path and filename where currently editing. The snippet is intelligent enough to know that `app/models/my_namespace/a_very_long_class_name.rb` should probably hold a `MyNamespace::AVeryLongClassName` class. This is most likely the desired name for the class (following Ruby conventions) so the snippet goes with it as the default.
2. Afterwards, I'm using a `defi` snippet which sets up a Ruby initializer method. This does even more magic behind the curtains so that as I type new arguments in the method header, these get added as instance variable assignments in the body.

You can start to see the power of this approach, as with just some small keywords and a shortcut, I can easily insert any kind of boilerplate code.

## But how?

UltiSnips is powered by Python and it has the extremely useful feature of allowing us to introduce actual Python code within the snippets. This code will be evaluated in real time, as we expand and complete snippets. Here's the code for that `class` snippet I showed earlier:

```vimscript
snippet class "class definition"
class `!p rb_class_name(path, snip)`
  $0
end
endsnippet
```

There's a [great series of screencasts] that explains very well how to use UltiSnips, so I won't go into detail here. The only thing worth mentioning is that `!p rb_class_name(path, snip)` defines a block of Python code.

`rb_class_name` is a simple function I defined in a helper file that does the necessary text transformations to the file path (given as argument) to infer the name of the Ruby class.

## What's next?

This was all very cool and whatnot, but there are still a few keystrokes we can shave off of this.

Typing that `class` snippet and expanding it for every new file will be a bit boring, won't it?

In [part III], I'll explain how we can integrate `vim-projectionist` (mentioned in [part I]) with snippets to go even further in the art of *not writing code*™.

[part I]: https://subvisual.co/blog/posts/133-super-powered-vim-part-i-projections
[part III]: https://subvisual.co/blog/posts/135-super-powered-vim-part-iii-skeletons
[UltiSnips]: https://github.com/SirVer/ultisnips
