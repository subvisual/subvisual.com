---
id: 33
path: /posts/33-better-pushes-with-git/
title: "Better pushes with git"
author: luis-zamith
date: 2014-04-08
tags:
  - development
intro: "If you've been working with git for a while you've probably realised that it has a [LOT of configs](https://git-scm.com/docs/git-config). A pretty nice one is the `push.default`, which allows you to change the way your branches are pushed to a remote."
---

If you've been working with git for a while you've probably realised that it has a [LOT of configs](https://git-scm.com/docs/git-config). A pretty nice one is the `push.default`, which allows you to change the way your branches are pushed to a remote.

Here at Group Buddies we've been using the `current` configuration for this. The definition, straight from the official website is as follows:

> `current` - push the current branch to update a branch with the same name on the receiving end. Works in both central and non-central workflows.

What this means is that when you create a local branch and then do `git push`, a remote branch with the same name will automatically be created for you. Pretty cool.

You can add this as global git configuration:

``` bash
$ git config --global push.default current
```  
It does not however set the local branch to track the remote, since it is supposed to work for non-central workflows as well, but since we use a central workflow (using GitHub), we want it to be tracked. This config allows this to be done pretty easily, you just have to do `git push -u` the first time you push (any time really, since it is idempotent), and you're done.

Check out our [dotfiles](https://github.com/groupbuddies/dotfiles) for this an some other nice configurations of git, vim and zsh.
