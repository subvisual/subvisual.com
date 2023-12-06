---
highlight: false
path: 143-its-not-continuous-delivery-yet
title: It's not Continuous Delivery (yet)
categories:
  - engineering
author: pedro-costa
date: 2019-02-02
cover: cover.jpg
intro: >
  At Subvisual we have always advocated for Continuous Delivery in our projects.
  Recently we decided to teach this approach.  But it so happened that, in our
  effort to learn more about Continuous Delivery, we learned that we ourselves
  are not actually doing it.
tags:
  - development
---

Any project started at Subvisual has always been demanded the best development
processes we know, to assure the highest quality. Among other things, this
means we advocate that all our projects follow a Continuous Delivery process.

Recently we decided to start sharing this approach with the community outside
our own ventures. And like any good teacher, we sought to learn more about the
subject and ended up studying the _Continuous Delivery_ book, by [Jez
Humble][jez-humble] and [David Farley][david-farley].  It so happened that, in
that effort, we learned that we ourselves are not actually doing it, we only
practice some of its ideas.

## The Continuous Spectrum

Anyone who looks for it is bound to find several software development buzzwords
with the “continuous” word on them, the most common being Continuous
Integration, Continuous Delivery, and Continuous Deployment. These three are
all different things but they are all linked.

### Continuous Integration

Consider a regular software project using [Git][git], where developers work on
their changes in the isolation of their own branches, all originating from a
main one (usually `master`).

Continuous Integration (CI) is a practice where developers are encouraged to
integrate their changes in the main branch as often and as early as possible.
Integration here does not simply refer to the act of merging the code, but
performing whatever checks the team needs to feel confident the new changes did
not break anything and are working as they're expected.

Practicing Continuous Integration requires both a Version Control System (VCS)
like Git or [Mercurial][mercurial], and a way to trigger an automated build
pipeline when a new change is committed. This is usually done through a service
like [GitHub][github], [Bitbucket][bitbucket], or [GitLab][gitlab], which
provide a central repository for changes to be merged into, automatically
triggering a CI service to build the project.

The build run by the CI service will depend on what the team considers required
to feel confident nothing was broken by a change. This usually includes unit
and integration tests, may also include code quality checking, and possibly a
test deployment (to a staging environment).

For a team practicing CI, there is no task more important than keeping the
build pipeline working. If the build fails, it is everyone's top priority to
fix it. And if the problem is not solved quickly (under 20 minutes, for
instance), then the breaking change must be reverted and fixed in isolation.

### Continuous Delivery

Continuous Delivery (CD) builds upon Continuous Integration. It boils down to
being able to deliver any change whatsoever to production quickly and safely.

This means the project's code must be ready to ship at all times. For instance,
in a regular web project using Git, this implies that the `master` branch is
always deployable, and keeping it that way is everyone's main priority. It also
means that the deployment process must be as easy and automated as possible,
and that deployments should happen as early and often as possible.

Practicing CD implies the build pipeline includes a suite of acceptance tests
(automated and/or manual) to assert the product does what it is expected, and
possibly non-functional tests required to assert it is ready to be delivered
(load testing, security checks, etc.). Once the build is finished and considered
successful the team is confident it can be delivered to production.

One crucial distinction between Continuous Integration and Continuous Delivery
is the approach to new functionality. CI requires only new changes not to break
existing functionality, so unfinished features are accepted as long as the rest
of the product works. But since CD requires the project to be deliverable, any
unfinished features have to be hidden or disabled until they're considered
ready to be released.

### Continuous Deployment

Continuous Deployment is just an extension on Continuous Delivery where the
product is actually delivered on every change. It is a specially good fit for
web products since the delivery process is completely under the team's control,
whereas a mobile application, for instance, would require users to download the
updated version.

Typically a Continuous Deployment process will be fully automated, which
increases the importance of having reliable acceptance tests. However, it is
not required to be fully automated, and the build pipeline can also include a
manual exploratory testing step. The difference being that once those tests are
deemed successful, the tested version is deployed automatically.

At Subvisual we do not aim for Continuous Deployment because delivery is a
business decision, not a technical decision. While Continuous Delivery fits all
projects, the specific requirements for Continuous Deployment are not met by
most projects, especially until a certain maturity is reached.

## How to not practice Continuous Delivery

As I wrote above, we have been stating that we practice Continuous Delivery for
a while, but the truth is that we actually don't even fully practice Continuous
Integration to start with.

Services like [Travis CI][travis-ci], [Semaphore CI][semaphore-ci], and [Circle
CI][circle-ci] all use the CI acronym because the existence of a system able to
test the main branch and make sure the latest changes do not break anything is
essential for a project practicing Continuous Integration. However, just using
a service like this to run an automated build pipeline is not enough.

For a team to practice Continuous Integration, there must be a culture of
integrating changes to the main branch often (at least a couple of times a day
according to some authors). This prevents pull-requests with hundreds of
changed lines, or changing multiple different things, both of which make code
reviews a lot harder and error prone. And while we do discourage long
pull-requests, we never actually refuse them and force people to go back and
break it into smaller changes.

The way we see it, there might be good reasons on why a developer is not
integrating with the main branch frequently, like experimenting with a new
approach or a refactor. But aside from very rare exceptions, large changes can
always be broken into small and easy to comprehend chunks.

Even if we disregard that we are not actually practicing Continuous
Integration, we still can't consider we're doing Continuous Delivery. One of
the reasons is that, historically, the build pipelines in our projects do not
run acceptance tests against live production-like environments. This is a side
effect of the tools we normally use, which assume a clean and controlled
testing environment for functional tests.

Normally, we also do not include any non-functional tests in our projects.
These are tests designed to verify the application meets its non-functional
requirements, like being able to handle a minimum number of users at the same
time, or implementing some specific security rules, or responding to any
request within a given time frame. Since ventures go on their own before that,
there is rarely the need for tests like these when we're working on the
projects.

Take the case of [Crediflux][crediflux], for instance, which had a
comprehensible suite of feature tests since its earliest stages. These were
never run against a live environment. Therefore its releases required
stakeholders to go through the most common flows by hand in a staging
environment, and this would often uncover issues associated with the data
already in the system. And as it also lacked any non-functional tests, it was
only when the first big clients started using the system and the amount of data
started building up that we noticed performance issues in some tasks.

In some cases there is another reason we can't say we're doing CD. Normally we
use [Heroku][heroku] and automate the deployment process from the CI, but there
have been cases where the project required another environment and the effort
of automating deployments was considered to exceed the return-on-investment
(ROI). Of course this flexibility of doing what is best for the project is
required for any successful software team, but the truth is we should review
this decision periodically and we don't normally do so. And in every single
case the project reached a point where the cost of doing it manually exceeded
the tolerable, and the deed had to be done anyway.

---

In summary, if a project is often in a broken state (_the build is failing_),
not ready to ship (_feature X is not complete yet_), or requiring human
intervention to deploy successfully (_we're just waiting for Miguel to get here
and deploy to production_), then the team is not practicing Continuous
Delivery.  Without it, we're losing valuable feedback both from tools we should
be using, and from real users (because we're not deploying as often as we
could). And in order to fix this, we need to own it.



[bitbucket]: https://bitbucket.org/
[circle-ci]: https://circleci.com/
[crediflux]: https://www.crediflux.pt/
[david-farley]: http://www.davefarley.net/
[git]: https://git-scm.com/
[github]: https://github.com/
[gitlab]: https://gitlab.com/
[heroku]: https://www.heroku.com/
[jez-humble]: https://www.continuousdelivery.com
[mercurial]: https://www.mercurial-scm.org/
[semaphore-ci]: https://semaphoreci.com/
[travis-ci]: https://travis-ci.org/
