---
id: 87
path: /posts/87-smarter-heredoc-syntax-in-vim/
title: "Smarter heredoc syntax in vim"
author: miguel-palhas
date: 2016-06-02
tags:
  - development
intro: "I have lately run into a problem with my editor of choice, vim (well, actually, it's [neovim](https://github.com/neovim/neovim)), and the syntax highlighting in Ruby files."
---

I have lately run into a problem with my editor of choice, vim (well, actually, it's [neovim](https://github.com/neovim/neovim)), and the syntax highlighting in Ruby files.

Particularly, I ran into problems with the Heredoc syntax.

## What is heredoc?

Long story short, it's a feature present in many programming languages that lets you write multiline strings without all the hassle of dealing with quoting issues, newline characters, etc. Here's an example:

```ruby
puts <<HEREDOC
  a heredoc block can contain anything
  "even quotes."
HEREDOC

## output:
  a heredoc block can contain anything
  "even quotes."
```

Instead of the placeholder `HEREDOC`, you can write any other name, as long as both ends match.

Ruby 2.3 also introduced the squiggly heredoc syntax, which strips off the indentation in every line, allowing you to keep your code indented without messing up the output, similar to rails' `strip_heredoc` method. But I'll let Avdi Grimm explain that in his [own blog post](http://devblog.avdi.org/2016/01/06/about-the-ruby-squiggly-heredoc-syntax/).

## Heredoc syntax in vim

Getting back to the subject, Ruby has 3 three different heredoc syntaxes. They're mostly similar, but have slight differences:

![file](https://subvisual.s3.amazonaws.com/blog/post_image/126/image-1464871761215.png)

As you can see from the screenshot, at the time of writing, my vim setup has yet to recognize the new squiggly heredoc syntax, which is what prompted me to look for a fix.

I ended up finding a way to not only properly highlight the new syntax but also provide some powerful syntax highlighting to the heredoc content's themselves:

```vim
## ~/.vim/after/syntax/ruby.vim

let s:bcs = b:current_syntax
unlet b:current_syntax
syntax include @SQL syntax/sql.vim
let b:current_syntax = s:bcs

syntax region hereDocText    matchgroup=Statement start=+<<[-~.]*\z([A-Z]\+\)+ end=+^\s*\z1+ contains=NONE

syntax region hereDocDashSQL matchgroup=Statement start=+<<[-~.]*\z(SQLDOC\)+  end=+^\s*\z1+ contains=@SQL
```

Place the above code in `~/.vim/after/syntax/ruby.vim`, and you'll be able to do the following:

![file](https://subvisual.s3.amazonaws.com/blog/post_image/127/image-1464871768376.png)

The vim code did two things:

1. Told vim to match all heredoc syntaxes (using an appropriate RegEx), and use no highlight within it.;
2. When the heredoc keyword is `SQLDOC`, the inner text is highlighted as SQL code.

The same principle can be applied to create keywords for any syntax supported by vim. Here's an example for both SQL and Shell Scripting:

```vim
let s:bcs = b:current_syntax
unlet b:current_syntax
syntax include @SQL syntax/sql.vim

" this unlet instruction is needed
" before we load each new syntax
unlet b:current_syntax
syntax include @SHELL syntax/sh.vim

let b:current_syntax = s:bcs

syntax region hereDocText    matchgroup=Statement start=+<<[-~.]*\z([A-Z]\+\)+ end=+^\s*\z1+ contains=NONE

syntax region hereDocDashSQL matchgroup=Statement start=+<<[-~.]*\z(SQLDOC\)+  end=+^\s*\z1+ contains=@SQL

syntax region hereDocDashShell matchgroup=Statement start=+<<[-~.]*\z(SHELLDOC\)+  end=+^\s*\z1+ contains=@SHELL
```

The only caveat here is that you're forced to use a keyword that matches the syntax you want, and the fact that your coworkers won't see any changes unless they also use Vim and apply this patch as well.

That being said, I believe it is still a very useful change nonetheless, and a great example of the capabilities of Vim.

### More Ruby goodness

If you've enjoyed this bit of knowledge you should really subscribe to [our newsletter](https://subvisual.co/newsletter/), where this and other great articles from the Web are shared every week.

If you want to meet us and/or see some talks on Ruby topics, come join us at RubyConf Portugal 2016. For making all the way to the end of this article you get [25% off the price of the ticket](https://ti.to/subvisual/rubyconfpt-2016/discount/good-reader-method).
