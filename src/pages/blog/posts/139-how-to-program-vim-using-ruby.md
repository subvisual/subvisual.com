---
id: 139
path: /posts/139-how-to-program-vim-using-ruby/
title: "How to program Vim using Ruby"
author: gabriel-poca
date: 2017-09-04
cover: https://s3-eu-west-1.amazonaws.com/subvisual/blog/hero/139/ruby-vim.jpg
retina_cover: https://s3-eu-west-1.amazonaws.com/subvisual/blog/hero/139/ruby-vim.jpg
tags:
  - development
intro: "In this article, I hope to demonstrate how you can program Vim using Ruby."
---

I recently started working in an Angular project where I'm not able to use [vim-projectionist](https://github.com/tpope/vim-projectionist) to navigate the code. vim-projectionist is awesome, and I've grown used to it. Searching for files by name, in a code base with hundreds of files, started to become painful and I needed an alternative. Because I couldn't find a plug-in that satisfied my needs, I decided to do it myself. In this article, I hope to demonstrate how you can program Vim using Ruby.

Let's say that you have an HTML file that looks like this:

```html
...
<div class="timepicker">
  <timepicker>
    ...
  </timepicker>
</div>
...
```

When the cursor is on line two or four (the `timepicker` tag), you want to trigger a shortcut that opens the JavaScript file for the directive `timepicker`.

## Ruby to the rescue

In this project, every directive is in the folder `javascript/directives/`, where the directive's name is also the file's name. If the name has more than one word, such as *chart-timepicker*, the file name would be snake case: *chart_timepicker*.

I'm assuming you don't know enough VimScript to make this work (I don't), but fear not, if you compiled Vim with Ruby support, this will be enough:

```ruby
function! AngularTemplateToDirective()
ruby << EOF
  @buffer = VIM::Buffer.current # get current bufer
  match = @buffer.line.match(/<\/?([\w-]+)/) # match current line

  if match
    directive = match[1].gsub("-", "_") # get directive's file name
    VIM.command(":e javascript/directives/#{directive}.js") # open file
  end
EOF
endfunction

autocmd BufRead,BufNewFile *assets/templates*.html nnoremap <silent> <C-]> :call AngularTemplateToDirective()<cr>
```

It's a Vim function that you can trigger with `C-]` or call with `:call AngularTemplateToDirective()` (or map to a shortcut). Notice that it uses a module called `VIM` on line three. That module comes from Vim and it allows us to control it from the Ruby. If you want to learn more use `:help ruby` inside Vim.

This function fetches the current buffer and the current line. If the line matches an HTML tag (something like `<timepicker>` , `</timepicker>` or `<timepicker something>`), it takes the tag's name, turns it to snakecase, and opens the corresponding directive's file.

Cool right? Five years using Vim and there's still so much to learn!

## A little more advanced

With the function above, you can open directives from the HTML. How nice would it be to open CSS files from the HTML as well?

Taking the previous HTML example, when I'm in a line with `class="timepicker"` I want to open the [BEM](http://getbem.com/) component named `timepicker` that, by convention, sits in `stylesheets/components/timepicker.scss`.

Building on the previous implementation, you first check if the current line contains `class="`, if not then look for the tag using the code from before. If it does match, you extract the component's name from the class, turn it into snake case and open the file:

```ruby
function! AngularTemplateToDirectiveOrCSS()
ruby << EOF
  @buffer = VIM::Buffer.current

  if @buffer.line.include?("class=")
    match = @buffer.line.match(/class="([\w-]+)"/)

    if match
      file = match[1].split("__")[0].split("--")[0].gsub("-", "_")
      VIM.command(":e app/assets/stylesheets/application_nsx/components/#{file}.scss")
    end
  else
    match = @buffer.line.match(/<\/?([\w\-]+)/)

    if match
      directive = match[1].gsub("-", "_")
      VIM.command(":e app/assets/javascripts/angular/directives/#{directive}.js")
    end
  end
EOF
endfunction
```

I know that this code could be better, but I'm not concerned with that because it's part of my Vim configuration, I'm always changing it, and it actually works!

I hope that you've found something new in this blog post. If you're looking for more ideas for your Vim setup, check out [this blog post from Miguel](https://subvisual.co/blog/posts/133-super-powered-vim-part-i-projections/) and subscribe to our blog. There are many Vim users at Subvisual and we always publish new content.
