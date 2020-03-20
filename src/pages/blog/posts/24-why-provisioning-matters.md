---
id: 24
path: /posts/24-why-provisioning-matters/
title: "Why Provisioning Matters"
author: miguel-palhas
date: 2014-01-14
tags:
  - development
intro: "If you were ever in charge of configuring a web server, you must know how painful it can be sometimes. During your first learning days, you probably spent an awful lot of time SSH'ing into the server, trying out something you just found online. It probably ended up being a slow trial-and-error process before you got your first server up and running."
---

If you were ever in charge of configuring a web server, you must know how painful it can be sometimes. During your first learning days, you probably spent an awful lot of time SSH'ing into the server, trying out something you just found online. It probably ended up being a slow trial-and-error process before you got your first server up and running.

When I was at that point myself, I often thought "there's probably a better way to do this". And obviously, there is.

## What's the problem?

The SysAdmin's best friend is the one and only, SSH. Almost anything you do depends on it.
And when searching the web for tutorials on how to configure a web server, a lot of the results present a similar process: SSH to the server, and do everything manually.
This is an indication that this is still one of the most disregarded topics when it comes to best practices.

Actually, if you think about it, using SSH is the SysAdmin's equivalent of a [code smell](https://en.wikipedia.org/wiki/Code_smell). You're probably repeating yourself over and over (especially if you're doing the same thing across multiple servers).

This is exactly where provisioning tools can come into play.

## Provisioning Tools

A provisioning tool helps you set up a server, by letting you write a script or manifest file with all the specifications you want.
One of these tools in particular, [Puppet](https://puppetlabs.com/), follows an approach which I find really interesting: it makes you describe how the final state of the server should be, rather than the steps required to get there.

A small example of how a Puppet manifest file looks like:

```puppet
package { "httpsd":
  ensure => installed,
}
```

This small manifest ensures that a package called "httpsd" should be installed on the system. Internally, Puppet must know what a package is, and how to find and install one.

Files are just as easy to manage:

```puppet
file { "/home/deploy/some_file":
  ensure => present,
  owner  => "deploy",
  group  => "deploy",
  mode   => 0644,
}
```

The language is pretty much self-explanatory. A file called "some_file" must be present at that path, and belong to the user "deploy", with the given permissions.

If all those conditions are already true (i.e., the file already exists when you try to apply the Puppet manifest), nothing is actually done.

This state-driven language, in addition to the amount of community-contributed Puppet modules (usually found at [PuppetForge](https://forge.puppetlabs.com/) or [Github](https://github.com/puppetlabs)) provide a powerful tool to handle provisioning.

It also becomes easier to start noticing patterns, and dealing with them by writing generic manifests for all your servers. It's much easier to do that through Puppet than having your own custom scripts, which are more likely to break due to some edge case you didn't think of. And that's exactly what I did.


## Provisioning, the GB Way

At Group Buddies, the current toolset for our Rails deployment consists of:

* A Web server with **RVM** and **PostgreSQL** (and whatever else each app needs, such as Redis)
* Puma as the web server
* Capistrano
* A multi-stage setup (usually two instances of each app).

In an attempt to standardize our deployment process, I started putting together all the common parts in a [Puppet module](https://github.com/naps62/gb-puppet) and a [test app](https://github.com/groupbuddies/gb-provisioning).

I tried to follow a rule of thumb for this. Whenever I have to use SSH for anything, I first think about how to eliminate that need, either by writing a new Puppet rule, or by doing the same thing through Capistrano, to ensure consistency.

There's still work to be done, but the first solid results are here. Right now, a simple Puppet manifest such as this...

``` puppet
$data = hiera('gb-provisioning')

class { gb:
  ruby_version    => 'ruby-2.0.0-p353',
  deploy_password => "$data[deploy][password]",
}

gb::app::rails { 'blog':
  db_pass => $data[production][db_password],
  url     => 'blog.groupbuddies.com',
}
```

... will do all of the heavy lifting of provisioning the web server, by installing and configuring everything we commonly use.

The `gb` class in the beginning installs most required dependencies, creates a system user, sets up our public SSH keys, amongst other things.

The `gb::app::rails` sets up a Rails application, here called "blog", with all the default settings defined by the plugin and a given url and password for the PostgreSQL database. This ends up creating a database user, an Nginx entry, and sets up [Monit](https://mmonit.com/monit/) to listen to everything related to the app.

Also note that I'm using [Hiera](https://docs.puppetlabs.com/hiera/1/) to keep secret data such as passwords in a separate file.

If the same machine is to be used for a new application, all it takes is a few more lines to this manifest, and applying it to the machine again.

When deploying, besides the usual Capistrano workflow, all it takes is sending a restart signal to all processess registered in Monit for this application. For that, I also released [capistrano3-monit](https://github.com/naps62/capistrano3-monit).

And all of this can be tested by using a simple Vagrant box, since the process is exactly the same.


## Beyond Provisioning

A rising trend in Web Applications is the concept of Platform as a Service, where an intermediate service is used to handle all the hassle of configuring and deploying an application. It can also be called automated provisioning. Applications are usually packed in self-suficient containers, along with all of its dependencies, making them much more portable and independent, as well as eliminating most of the previously required labour.

We all know of [Heroku](https://www.heroku.com/), which was one of the first to provide such a service.

A much more recent project is [Dokku](https://github.com/progrium/dokku), an open-source project that allows you to create your own mini-Heroku.
I found it to be a really interesting project, and ended up setting it up in the [deployment test application](https://github.com/groupbuddies/gb-provisioning) I previously mentioned.

It's a great tool for getting something online quickly.
However, it is heavily dependent on [Docker] (https://www.docker.io/) which is still a very recent product, and not yet considered production-ready by their own development team.

Besides, Dokku plugins are nothing more than simple bash scripts, and most of them don't seem to care all that much for tests or quality assurance. That makes them susceptible to errors such as [this one](https://github.com/Kloadut/dokku-pg-plugin/issues/6), where the PostgreSQL plugin temporarily broke after a new Docker release.

The main point here is: PaaS is a great concept. I just feel that current open-source solutions are not yet viable when you need a more customised solution. Thus, you either pay or get a crappy experience.
