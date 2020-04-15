---
id: 119
path: /posts/119-open-files-on-existing-vim-sessions/
title: "Open files on existing vim sessions"
author: miguel-palhas
date: 2016-12-16
tags:
  - development
intro: "I recently watched Greg Hurrell's screencast about [Opening files in Terminal Vim](https://www.youtube.com/watch?v=DBUuhvS8nZ8&list=PLwJS-G75vM7kFO-yUkyNphxSIdbi_1NKX&index=45), in which he showcases an OSX-only solution for being able to open files on Vim when using Finder."
---

I recently watched Greg Hurrell's screencast about [Opening files in Terminal Vim](https://www.youtube.com/watch?v=DBUuhvS8nZ8&list=PLwJS-G75vM7kFO-yUkyNphxSIdbi_1NKX&index=45), in which he showcases an OSX-only solution for being able to open files on Vim when using Finder.

Being a Linux user, and having interest in the result he achieved, I decided to search for a more generic approach.

I often go look up files, either through the terminal, or the graphical file explorer, only to take note of its path and open it in an existing vim session.

How cool would it be to double-click the file, or type `xdg-open package.json` and have it magically open on my existing vim session, which is probably running on some other terminal?

## Remote vim commands

I didn't know it until now, but vim comes with client/server capabilities by default (as long as it is compiled with the `+clientserver` option).

If by any chance you're using `neovim`, as I am, those features are not included, but you can add them by installing [neovim-remote](https://github.com/mhinz/neovim-remote).

This allows you to do some interesting stuff:

```bash
## in one terminal:
vim --servername DEMO

## in another terminal or split:
vim --servername DEMO --remote some-file.txt
```

The first command opens a new vim instance, with the servername `DEMO`. When the second command is called, a server with that name already exists, so it will just connect to it and send it a command to open `some-file.txt`. This just works

You can also send vim commands to the running server:

```shell
## delete the 3rd line on the currently open buffer
vim --servername DEMO --remote-send ':3d<CR>'
```
 
## Vim as the default application

We can now create the following script, and place it somewhere in our `$PATH` (in my case, I use `~/.bin/remote-vim`):

```shell
##!/usr/bin/env sh

vim --servername DEMO --remote $@
```

This script can now be used as the default applications for whatever files I want.

![file](https://subvisual.s3.amazonaws.com/blog/post_image/227/original.png)

I can also go a step further, and edit the MIME type settings on my system. This allows me to use `xdg-open`, which I have aliased to just `o`, to open files in their default application while on a terminal.

To edit this, I use a tool called `perl-file-mimeinfo`. Let's see an example of configuring the default application for Ruby files:

```shell
$ /usr/bin/vendor_perl/mimeopen -d app/models/user.rb 
Please choose a default application for files of type application/x-ruby

        1) LibreOffice Writer  (libreoffice-writer)
        2) GVim  (gvim)
        3) Atom  (atom)
        4) Sublime Text  (sublime-text)
        5) Other...

use application #5
use command: ~/.bin/remote-vim
Opening "app/models/user.rb" with remote-vim  (application/x-ruby)
```

By choosing `Other...` I can enter a custom command, in which I enter my custom script, and boom! Now all my Ruby files are opened with Vim by default!

## Multiple sessions

You can see that this starts to break if you happen to run multiple vim sessions. There's no control at all over which one is used.

A solution for that will depend a lot on your workflow, so I won't go into detail here, but here's a quick rundown of how I'm doing it:

I tend to have multiple tmux sessions, but only one vim instance on each of them (each tmux session is assigned to a particular project I'm working on). So I can distinguish each vim session by their tmux sessions's name.

When starting a new tmux session, I can define a new environment variable:

```shell
VIM_SERVERNAME=vimsocket.`tmux display-message -p '#s'`
```

By using this variable within my vim alias and script, vim's servername will be something like `vimsocket.blog.subvisual.co`, and that server will be used only within that project's tmux session.

The caveat here is that this will only allow me to open files from within the tmux session. So no file explorer for me. But I don't use one anyway. tmux rocks!
