---
id: 140
path: /posts/140-continuous-integration-at-subvisual/
title: "Continuous Integration at Subvisual"
author: miguel-palhas
date: 2017-12-18
cover: https://s3.eu-west-1.amazonaws.com/subvisual/blog/posts/140/cover.jpg
retina_cover: https://s3.eu-west-1.amazonaws.com/subvisual/blog/posts/140/cover@2x.jpg
tags:
  - development
intro: "Learn how we do Continuous Integration, and what tools we use at each step of the way"
---

We're often approached by other companies or developers who want to know more about how we handle our projects' testing and deployment. They want to know how we ship multiple times a day while having multiple developers working at the same time.

This post will give you the highlights of how we do it at Subvisual. We don't claim to have that one methodology to rule them all, but hopefully you can extract something from our process and apply it to your own.

So, off we go...

## Git Branches

I remember when, during my first days at Subvisual, we were experimenting with Git workflows, and were very keen on trying out [a successful Git branching model] and other such workflows. These methods ensure that everything on the `master` branch has gone through some sort of testing pipeline and is ready for production use.
With time and experience, we ended up noticing how this wasn't working for us. With our focus on rapid development & deploy, we often want to get new features and fixes up quickly. The more steps we have to go through to get something to `master`, the slower it will be.

Nowadays, we dropped the more complex approaches in favor of a simpler one. We have a `master` branch, from which all other branches are created, and to which they are all merged to. That's it.

Branches usually have an owner and are only touched by that owner. But we also have no problem sharing them if it suits the needs. For example, I may start the back-end logic required for a new feature, and then hand over the branch so that a front-end developer and a designer can work on the rest. Or we might pair program on it if we feel the need for more coordination.

Once we merge our changes, Semaphore will take care of checking the new build and, if automatic deploys are enabled, put it live.

Of course, "with great power, comes great responsibility". We don't just merge to `master` whenever we wish to. But instead of a more rigorous Git workflow, we rely on a strong automated-testing culture. GitHub and Semaphore also help a great deal with the process as well.

## Code Reviews

We've been doing code reviews and enforcing them as required for all of our projects for a long time now. Our rule is simple: every change that is merged must be approved by at least one person other than yourself. So you either need someone else to review it, or you can pair with someone during development.

And with our tendency for noticing every single detail, it's rare for a single extra newline to go unnoticed. 

![2017-10-29-181705_790x539_scrot.png](https://s3.eu-west-1.amazonaws.com/subvisual/blog/posts/140/github1.png)
We're extremely paranoid about the quality of our code.

Recent updates to GitHub helped this a lot, with Code Reviews now being a part of the Pull Requests interface.

![2017-10-29-181817_783x430_scrot.png](https://s3.eu-west-1.amazonaws.com/subvisual/blog/posts/140/github2.png)

## Automated builds

Our Continuous Integration process happens mostly through our CI Server, [Semaphore](https://semaphoreci.com/).

It's where we automate our builds and set up automatic deploys.

![2017-10-29-173955_1204x969_scrot.png](https://s3.eu-west-1.amazonaws.com/subvisual/blog/posts/140/semaphore1.png) 

One of the reasons we've chosen Semaphore when we first got started was their great ability to customize the setup and build process. We can create our own bash script to customize the build, and even install additional packages if we need to (especially useful if we're using edge versions of a library, and need to compile them from source). Here's an example for a heavily-customized Elixir/React application:

```bash
# setup
source $HOME/.kerl/installs/19/activate
nvm use $NODE_VERSION
mix local.hex --force
mix local.rebar --force
mix deps.get
yarn install
MIX_ENV=test mix ecto.setup

# build
mix credo
mix test --exclude feature
mix test --only feature # trust us. there's a reason for this
yarn lint
```

It also allows us to customize what directories get cached between builds.

These two features combined make Semaphore a great resource even if your framework or language isn't yet officially supported by them. You can input the commands to download and compile such dependencies, and then cache them so that it doesn't slow down your future builds.

This also ties in very well with another of [Subvisual's best practices]: for every single project, we strive to have a set of scripts (`bin/setup`, `bin/server`, and so on), that will do all the magic required to get a newcomer up and running, without even needing to know what dependencies are required, and how to install them.

Since we already have these scripts built, we can often use them as our build commands in Semaphore.

That's not what's happening in the above example though. You can blame that on my own laziness...

## Automatic deploys to staging

Most of our projects have two environments online. A staging server, often
password-protected, allows us to test things on a controlled environment before
getting them live to a real audience. And a production server, where all the magic happens. This is the live version of the application that will be used by real users.

They are both deployed from the `master` branch, so they rarely differ much from each other.

In Semaphore, we configure the staging environment to be deployed automatically on every successful `master` build. That means every new merge gets online quickly for anyone to test it. Production deploys vary on a project-by-project basis. They might be automatic as well, but more often than not we want more control over that environment, so we perform them manually.

On top of that, this also gives anyone in the team the ability to trigger a deploy, even if they don't have the technical knowledge that is often required for it.

[Heroku ChatOps] also came as a great tool in that regard, since we can deploy them easily through Slack, and make everyone aware of that at the same time.

![2017-10-29-184809_476x805_scrot.png](https://s3.eu-west-1.amazonaws.com/subvisual/blog/posts/140/slack1.png)

## To be continued...

As this is a subject that has plenty more to say, and where we're constantly iterating and improving, all of this might just be deprecated very soon.

You can definitely expect us to share once that occurs, but in the meantime, I hope you were able to take away something new to try out yourself. Let us know in the comments if you have any questions, or even suggestions that you might have for us. We're always eager to learn more.

You can also read some of our posts on workflows, such as how we [close Pull Requests] or our guide on [deploying Elixir applications with Docker]

[A successful Git branching model]: http://nvie.com/posts/a-successful-git-branching-model/
[Heroku Review Apps]: https://devcenter.heroku.com/articles/github-integration-review-apps
[Heroku ChatOps]: https://devcenter.heroku.com/articles/chatops
[Subvisual's best practices]: https://github.com/subvisual/guides
[close Pull Requests]: https://subvisual.co/blog/posts/44-easily-merging-pull-requests/
[deploying Elixir applications with Docker]: https://subvisual.co/blog/posts/137-tutorial-deploying-elixir-applications-with-docker-and-digital-ocean/
