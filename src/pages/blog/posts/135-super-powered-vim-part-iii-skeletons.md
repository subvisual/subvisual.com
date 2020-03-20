---
id: 135
path: /posts/135-super-powered-vim-part-iii-skeletons/
title: "Super-powered Vim, part III: Skeletons"
author: miguel-palhas
date: 2017-04-28
tags:
  - development
  - vim
intro: "This post is the third of a three-part series. If you're interested, you can start by checking out [part I](https://subvisual.co/blog/posts/133-super-powered-vim-part-i-projections) and [part II](https://subvisual.co/blog/posts/134-super-powered-vim-part-ii-snippets)."
---

This post is the third of a three-part series. If you're interested, you can start by checking out [part I](https://subvisual.co/blog/posts/133-super-powered-vim-part-i-projections) and [part II](https://subvisual.co/blog/posts/134-super-powered-vim-part-ii-snippets).

Writing code is boring.

In the previous parts I showed how we could speed things up a bit, by having some powerful shortcuts for file navigation and inserting repeatable blocks of code (snippets).

Now, let's see how we can go one step further:

Let's stick with Ruby as our sample language. The common practice in the community is to have a class or module in each file, with the name matching the file path. So `app/models/user.rb` will have a `class User`, and `app/models/foo/bar.rb` will have a `class Foo::Bar`.

So wouldn't it be pretty cool if, when creating one of these files, it got be pre-populated by that class definition?

## Wait... What?

In [part II], I already mentioned a `class` snippet, which creates a Ruby class based on the path of the file.

Now I want this snippet to be automatically inserted in any new files created in the `app` directory.

Could we define some kind of attribute for these paths? Say... a projection?

Let's take the `.projections.json` example from [part I] and expand it a bit:

```json
{
  "app/*.rb": {
    "alternate": "spec/{}_spec.rb",
    "skeleton": "class"
  },
  "spec/*_spec.rb": {
    "alternate": "app/{}.rb",
    "skeleton": "spec"
  }
}
```

We now have a `skeleton` attribute for both `app` and `spec` files. `class` and `spec` are snippet names, which insert a class definition, and some RSpec boilerplate, respectively.

Now let's look at some vimscript magic (I know... sorry):

```vimscript
augroup UltiSnips_custom
  autocmd!
  autocmd BufNewFile * silent! call skel#InsertSkeleton()
augroup END
```

This is defining an autogroup ([more on what that is here]) that listens to the `BufNewFile` event. This event is called when a buffer is created for a new file (i.e.: a file that is not yet persisted to disk). All of this happens when we do the `:edit` command for with a non-existing path.

That command will then call the `skel#InsertSkeleton` function (see the code snippet at the end of the post for its definition). In short, the function will:

1. Make sure the buffer does not exist and is empty (we probably don't want to do anything in these cases)
2. Loop through the existing projections, to look for a `skeleton` key matching the current file path
3. If a skeleton is found, insert the snippet's name, and expand it using the appropriate function from UltiSnips.

For the example of `app/models/foo.rb`, this will literally insert the word `class` into the buffer, and call `UltiSnips#ExpandSnippet()` for us, creating the class definition.

![magic](http://i.imgur.com/Efolbol.gif)

## But wait, there's more

You just created a Ruby class by simply opening a new file.

Now you want to write some tests for it, so you use your newly learnt `vim-projectionist` skills, and type `:A` (or whatever shortcut you have) to go to it's alternate file, as defined by the projections. This should match to `spec/models/foo_spec.rb`

This file also does not exist, but `vim-projectionist` is aware of this (see [part I] for more on this). This will conveniently ask you if you want to create it on the fly.

Once you accept to do so, the same events will be triggered, and this time, the `spec` snippet will be inserted on this file.

You can then proceed to writing the interesting part of your app. Or you can take a break, enjoying those 15 seconds of work you just avoided. You deserve it.

## Full code

I avoided going through the entire vim code in this post, as that would've been a bit offtopic, and probably hard as well, given how much VimL sucks. All the vimscript code needed to reproduce my setup is right here for those who want it.

Feel free to [reach me out through twitter] for any questions you might have, or bugs you might find, or checkout [my dotfiles] if you want to dig some more useful tips from there.

```vimscript
augroup UltiSnips_custom
  autocmd!
  " autocmd User ProjectionistActivate silent! call skel#InsertSkeleton()
  autocmd BufNewFile * silent! call skel#InsertSkeleton()
augroup END

function s:try_insert(skel)
  execute "normal! i" . a:skel . "\<C-r>=UltiSnips#ExpandSnippet()\<CR>"

  if g:ulti_expand_res == 0
    silent! undo
    return
  endif

  " enter insert mode and advance cursor (equivalent to typing `a` instead of `i`)
  execute "startinsert"
  call cursor( line('.'), col('.') + 1)

  return g:ulti_expand_res
endfunction

function! skel#InsertSkeleton() abort
  let filename = expand('%')

  " abort on non-empty buffer or exitant file
  if !(line('$') == 1 && getline('$') == '') || filereadable(filename)
    return
  endif

  if !empty('b:projectionist')
    " Loop through projections with 'skeleton' key and try each one until the
    " snippet expands
    for [root, value] in projectionist#query('skeleton')
      echo value
      if s:try_insert(value)
        return
      endif
    endfor
  endif

  call s:try_insert('skel')
endfunction

```

## What's next?

If you haven't seen the prequels to this post, maybe now would be a good time to do so?

Check out [part I] and [part II] for more details on what projections and snippets are, and how to use them!

Or take a look at [another post by one of our developers](https://subvisual.co/blog/posts/tag/development). Happy coding!


[part I]: https://subvisual.co/blog/posts/133-super-powered-vim-part-i-projections
[part II]: https://subvisual.co/blog/posts/134-super-powered-vim-part-ii-snippets
[more on what that is here]: http://learnvimscriptthehardway.stevelosh.com/chapters/14.html
[another post by one of our developers]: https://subvisual.co/blog/posts/tag/development
[reach me out through twitter]: https://twitter.com/naps62
[my dotfiles]: https://github.com/naps62/dotfiles
