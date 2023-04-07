---
path: /44-easily-merging-pull-requests/
title: "Easily Merging Pull Requests"
author: miguel-palhas
date: 2014-11-24
tags:
  - development
intro: "I try to automate all the annoying repetitive things I can. And not long ago, merging Pull Request was certainly on top of my list."
---

I try to automate all the annoying repetitive things I can. And not long ago, merging Pull Request was certainly on top of my list.

Whether it is for my own personal projects or within [Group Buddies](https://www.groupbuddies.com/), the process is mostly the same all the time:

1. **Update my local copy of the master branch**, or whichever branch the pull request was targeting.
2. **Go back to the branch I'm about to merge, and rebase it against master**. Conflicts might show up here, and should be solved.
3. **Merge the branch**. By this point, not event the GitHub one-click merge is helpfull, since I would still have to push my local changes again (possibly using `-f` due to the rebase). Also, going back and forth between the browser is just tedious.
4. **Delete the branch, both locally and remotely**, since it is no longer needed.

Fortunately git is easily extensible. You can add subcommands to git by having executables following the appropriate naming convention `git-subcommand`, and placing them in your `$PATH`. So, for instance, whenever you call `git hello`, git will look for an executable called `git-hello`.
Zamith already covered this in his last post, [Supercharge your git](https://blog.groupbuddies.com/posts/43-supercharge-your-git)

## The goal

Ultimately, I wanted to be able to just run `git close-pull-request` while on a feature branch, and have the command do all the work for me. I eventually aliased that to `git cpr`, since the name was obviously too long.

Another goal I had was portability. For these kind of work, I tend to stick with languages that are supported natively on any Linux distribution (like shell scripting or Perl). Since I do a fair amount of work on virtual machines, or even Raspberry Pi's, it's useful for me not to rely on Ruby for my workflow. This time, I went with shell scripting.

## The script

Here's the full script I wrote to close (the entire flow I described above):

```sh
##!/bin/sh

current=$(git branchname)
destiny=${1:-master}

## 1. Update destiny
git fetch
git checkout $destiny
[[ $? == 0 ]] || exit "failed to switch to $destiny"
git rebase

## 2. rebase PR branch
git checkout $current
git rebase -i $destiny

## 3. merge
git checkout $destiny
git merge --ff-only $current
git push

## 4. remove branch
git nuke $current $destiny
```

Don't bother about the `git nuke` for now, it's another custom command, and is explained below.
Let's go through this one step at a time. First, I declare a couple of variables:

```sh
current=$(git branchname)
destiny=${1:-master}
```

### Variables

The `current` variable gets the name of the current branch. which will be the one corresponding to the Pull Request I'm merging. For that I use another custom command `branchname`, which is simply the following:

```sh
##!/bin/sh
git rev-parse --abbrev-ref HEAD
```

And the `destiny` variable states the branch to which I want to merge, which comes from the first argument. That weird syntax (if you're not familiar with shell scripting), indicates that if no argument is given, it will default to `master`, which is the value I want most of the time.

So by calling `git cpr` with no arguments, I'm merging with `master`, but I can override that by calling `git cpr other-branch`

## 1. Update master

The first step is updating the master branch. This should be a simple fetch/rebase. But in practice, I needed one extra check in between:

```sh
[[ $? == 0 ]] || exit "failed to switch to $current"
```

This is because, switching between branches with `checkout` might fail. For instance, if there are unstaged changes waiting to be committed. In this scenario, I want to play it safe and just abort the script with `exit`. No harm done.

## 2. Rebase branch

After that, I want to rebase the target branch against master. I do this with an interactive rebase, since I usually want to squash or reword some commits.
If there are conflicts, the rebase itself will abort and prevent the rest of the script from going on. When that happens, I have to solve the conflicts like I normally would, and then try the command again.

## 3. Merge

The third step involves going back to master and merging the branch. There is no rocket science here. I used the `--ff-only` option just to make sure I'm not creating a merge commit. That shouldn't happen anyway since I'm rebasing both branches prior to the merge, but you can never be too safe.

## 4. Delete the feature branch

For this I'm using yet another custom command. I extracted this since I ended up using it a lot to clean up old branches. Here it is:

```sh
branch=$1
destiny=${2:-master}
git checkout $destiny
git push --delete origin $branch > /dev/null & 
git branch -D $branch
```

I start by moving to another branch (to prevent problems when I trying to delete the branch I'm currently in). Then I just call the commands to delete both the remote branch on GitHub, and the local one.

I'm sending that to the background because it might take a second or two to finish, and I also don't care for it's output, which would show up randomly later since the terminal didn't wait for it.

## Further reading

There are a lot of suggestions out there on how to extend git, but a few I would recommend are [git-wtf](https://gitorious.org/willgit/mainline/source/a84bba3726a19bc78086852d54bb0219ea1bb6f9:bin/git-wtf) and [git-publish-branch](https://gitorious.org/willgit/mainline/source/a84bba3726a19bc78086852d54bb0219ea1bb6f9:bin/git-publish-branch#L6) (although the latter is not that much useful since the latest git updates).

Additionally, I suggest you check out [hub](https://hub.github.com/), or the newer and faster alternative, [gh](https://owenou.com/gh/). Both of these add extra functionality that might prevent you from having to write your own custom scripts.
