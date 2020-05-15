---
path: /posts/jobs-and-timers-in-neovim-how-to-watch-your-builds-fail/
title: "Jobs and Timers in neovim: How to watch your builds fail"
author: fernando-mendes
date: 2019-06-07
tags:
  - development
intro: >
  TODO
---

Jobs and Timers in neovim: How to watch your builds fail
========================================================

If you're like me (and for your own sake, I truly hope you are not), you
probably tend to have a lot of builds fail. Even worse, if you really are like
me, you spend most of your time in vim.

If that is not the case, you're in the clear, there's nothing wrong with you,
feel free to go, end this blog post now, be free, happy, enjoy the sunlight and
the birds and the trees. Life is good.

.

.

.

.

.

.

.

.

.

.

.

.

... Are we, the sadists, all alone now? Cool. Ok, so you use vim a lot and you
make builds fail. Chances are you would like to know when that happens without
ever leaving vim. It's alright. I got you, mate.

Here's an asciicast of my nvim. Notice how the status bar includes, on the
bottom right, the status of the CI. Notice how it updates. Damn, that's neat.
You want that.

<script id="asciicast-5ynHiyckpQmQP7oWYI6HsVKKI" src="https://asciinema.org/a/5ynHiyckpQmQP7oWYI6HsVKKI.js" async></script>

First things first, either make an API wrapper, preferably in Rust or Go,
something compiled and fancy, that allows you to check the [GitHub checks API].
Got it? Good. Now stop being a muppet and use [hub] instead.

Now that you have `hub`, you can make use of the `hub ci-status` command.

```shell
$ hub ci-status
success
```

Coolio.

Now let's change our custom status bar.

First, we want to check if we're in a git project:

```vim
let s:in_git = system("git rev-parse — git-dir 2> /dev/null")if s:in_git == 0
 " call hub
endif
```

So now we need to call `hub`. However just doing a `system` call to `hub` would
be a blocking operation and we don't want our vim to block every few moments
for like 5 seconds. So let's use `jobstart`.

Start by calling `:h jobstart` from your (n)vim. You can see that it runs an
asynchronous job and it supports shell commands.

So let's create a `CiStatus` function that looks like this:

```vim
function! CiStatus()
 let l:callbacks = {
 \ 'on_stdout': function('OnCiStatus'),
 \ }call jobstart('hub ci-status', l:callbacks)
endfunction
```

We define a map of callbacks for `stdout` and delegate that to a new function
called `OnCiStatus`. This is a very simple function that gets the output from
`hub` and converts it to whatever we want, storing it in a `g:ci_status`
variable. We will later use this variable in our statusline.

```vim
function! OnCiStatus(job_id, data, event) dict
 if a:event == "stdout" && a:data[0] != ''
 let g:ci_status = ParseCiStatus(a:data[0])
 endif
endfunctionfunction! ParseCiStatus(out)
 let l:states = {
 \ 'success': "ci passed",
 \ 'failure': "ci failed",
 \ 'neutral': "ci yet to run",
 \ 'error': "ci errored",
 \ 'cancelled': "ci cancelled",
 \ 'action_required': "ci requires action",
 \ 'pending': "ci running",
 \ 'timed_out': "ci timed out",
 \ 'no status': "no ci",
 \ }return l:states[a:out] . ", "
endfunction
```

There are a couple of things missing though. This runs the `hub ci-status` job
only once. We want to have it perform constant checks. If we do `:h timers`, we
can see the new `time` API in neovim. Theres a `timer_start` that takes a
period and a callback to run after that period.

We can then change our `OnCiStatus` function to call `timer_start` with that
first `CiStatus` function again:

```vim
function! OnCiStatus(job_id, data, event) dict
 if a:event == "stdout" && a:data[0] != ''
 let g:ci_status = ParseCiStatus(a:data[0])
 call timer_start(30000, 'CiStatus') " relevant new part
 endif
endfunction
```

Now `CiStatus` gets called by `timer_start` every 3 seconds. `timer_start`,
however, passes the `timer_id` as an argument to the callback. So we will need
to modify `CiStatus` to accept an argument (that we can safely ignore):

```vim
function! CiStatus(timer_id)
 let l:callbacks = {
 \ 'on_stdout': function('OnCiStatus'),
 \ }call jobstart('hub ci-status', l:callbacks)
endfunction" We also need to change the first CiStatus call to receive an int
" Since we don't care about it, let's just use 0let s:in_git = system("git rev-parse — git-dir 2> /dev/null")if s:in_git == 0
 call CiStatus(0)
endif
```

All that's missing now is to take the value of `g:ci_status` and put into the
statusline. That's pretty simple, using some code borrowed from [Kade Killary].

```vim
set statusline=
set statusline+=\ \ \ " Empty space
set statusline+=%< " Where to truncate line
set statusline+=%f " Path to the file in the buffer, as typed or relative to current directory
set statusline+=%{&modified?'\ +':''}
set statusline+=%{&readonly?'\ ':''}
set statusline+=%= " Separation point between left and right aligned items
set statusline+=\ %{g:ci_status} " Our custom CI status check
set statusline+=col:\ %c
set statusline+=\ \ \ " Empty space
```

And that's that. Find a lot more goodies in [my dotfiles]. Cheerios. Hugs n
kisses and all that.


[GitHub checks API]: https://developer.github.com/v3/checks/
[hub]: https://hub.github.com/
[Kade Killary]: https://kadekillary.work/post/statusline-vim/
[my dotfiles]: https://github.com/justmendes/dotfiles
