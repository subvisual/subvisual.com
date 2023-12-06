---
highlight: false
path: 2020-06-06-fixing-too-many-open-files
title: Fixing Too Many Open Files
categories:
  - engineering
author: pedro-costa
date: 2020-06-19
intro: >
  Your production environment is yelling out messages with "Too many open files"
  and nothing worked so far. Let me show you how to bump those limits up.
tags:
  - devops
---


# Fixing Too Many Open Files

So, your production environment is yelling at you, just crying out messages
with some variation  of _Too many open files_. You have restarted the program,
rebooted the entire server &mdash; or you can't even try this &mdash; but
nothing worked.

Linux sets limits on resources for security purposes. One of these limits is
the number of files a process can have open at the same time. Below you'll find
several ways of bumping these limits either temporarily or permanently,
depending on your needs.

> Every man is a damn fool for at least five minutes every day; wisdom consists
> in not exceeding the limit.
>
> Elbert Hubbard, in "The Roycroft Dictionary Concocted By Ali Baba And The
> Bunch On Rainy Days"


## Per Process Limit

On creation, each process is assigned its own limits. These might be inherited
from the parent process, or assigned by the operating system directly, but
while the process is running it will be guided by these limits.

The [`prlimit`][prlimit] command can be used to run a command with a specific
set of limits.

```shell
# run `ruby` with a limit of 2048 maximum open files
$ prlimit --nofile=2048 ruby
```

It can also be used to query the limits of a specific running process, given
its PID.

```shell
# get the maximum open files limit for process 1234
$ prlimit -n --pid=1234
```

Or to set a specific limit in a running process.

```shell
# set the maximum open files limit for process 1234
$ prlimit --nofile=2048 --pid=1234
```

### Finding My Process

To get the PID of a running process by its name, use [`pgrep`][pgrep]:

```shell
# lists all running processes with 'ruby' in the name
$ pgrel -fl ruby # => 1234 ruby
```

If you don't know the name of the process, use [`ps`][ps]:

```shell
# lists all running processes
$ ps -aux
# ...
# 1234 ruby
# ...
```


## Per User Limit

Users in the system may be assigned specific limits, even based on the groups
they belong to.

User limits are defined in [`/etc/security/limits.conf`][limits.conf]. Rules
target a specific resource, setting the limit for a specific user, a specific
group, by ranges of user and groups IDs, or for all users with a wildcard.

```shell
# /etc/security/limits.conf
*               soft    core            0
*               hard    nofile          512
@student        hard    nproc           20
@faculty        soft    nproc           20
@faculty        hard    nproc           50
ftp             hard    nproc           0
@student        -       maxlogins       4
:123            hard    cpu             5000
@500:           soft    cpu             10000
600:700         hard    locks           10
```

New rules may be added on this file, but preferably add them on your own
`*.conf` files under `/etc/security/limits.d/`.

Some shells like Bash and ZSH also include a command for getting and setting
these limits for the current user -- [`ulimit`][ulimit].

```shell
# get all the limits for the current user
$ ulimit -a

# set the limit of maximum open files for the current user
$ ulimit -n 2048
```

Note that running processes are not affected by this change, since they already
have their own limits set.


### Daemon processes

These user limits are enforced by a Linux module called [pam_limits] which
**might** not be properly loaded when the user starts the session. This ignores
the limits configuration files and uses only default values.

To fix this, locate the relevant configuration file under `/etc/pam.d/` (for
instance, `/etc/pam.d/sshd` for SSH sessions) &mdash; or add your own &mdash;
and require `pam_limits.so` at the end of the file.

```shell
# /etc/pam.d/common

session required pam_limits.so
```

This might be required for [daemon] processes, but it is **not** required for
systemd services.


## Per systemd Service

[systemd] processes are actually a different type of process. Despite the user
set as the one running the process, the limits of the service are set in its
definition file.

```ini
# /etc/systemd/system/something.service
[Unit]
# ...

[Service]
# ...
LimitNOFILE=2048

[Install]
# ...
```

Remember to reload the systemd daemon and to restart the process for the new
limits to apply.

```shell
# Reload the systemd daemon
$ sudo systemctl daemon-reload

# Restart changed service
$ sudo systemctl restart something
```


## System limits

**Changing system limits is a dangerous operation.**

Operating systems have sensible defaults for these limits that were put in
place to protect your computer and ensure everything works properly. **Do not
change these values unless you're absolutely sure you know what you're doing.
Use at your own risk.**

System resource limits are checked and changed through [`sysctl`][sysctl].

```shell
# show all currently available values (some require `sudo`)
$ sysctl -a

# set a specific variable's value (some require `sudo`)
$ sysctl -w fs.file-max=2097152
```

You can also change these limits by changing `/etc/sysctl.conf`, or adding your
own `*.conf` file to `/etc/sysctl.d/`. To affect the current runtime these
files have to be reloaded though.

```shell
# load settings from /etc/sysctl.conf
$ sysctl -p

# load settings from /etc/sysctl.d/something.conf
$ sysctl -p/etc/sysctl.d/something.conf

# load settings from all the system configuration files
$ sysctl --system
```


### Caveats

The [documentation for sysctl][sysctl] is not clear on the influence of the
`-w` flag. Examples setting values through the command use this flag, but the
command does not complain if it is omitted when the `variable=value` syntax is
used. In doubt, **I recommend mimicking the documentation and using `-w`**.

When changing the configuration files for `sysctl`, bear in mind you might be
changing things set in other modules, or other modules might change the same
variables as you. Usually the namespace of the variable shows the name of the
configuration file setting that variable. **Make sure to read the documentation
on `sysctl`** to understand how to pull this off.

Values for `sysctl` often have to respect constraints specific to the variable.
I did not find any documentation describing these constraints. You will
probably have to look for the specific constraints of the variable you're
trying to change. `sysctl` will enforce these constraints to the best of its
ability to prevent any destructive change, but the error messages will not help
you understand why a value is invalid. Bear in mind **trial-and-error may have
unintended consequences on your entire system**.


## Hard and Soft Limits

System-wide limits are hard limits. The kernel simply won't allow resources
beyond those limits.

Per process or per user limits on the other hand are divided into soft and hard
limits. The soft limit can be changed at will, as long as it is equal or less
than the hard limit. The hard limit is supposed to be a secure limit and
changing it often requires higher privileges. Processes are denied resources as
soon as the soft limit is reached.

When setting the limits through `ulimit` or `prlimit`, if only one value is
passed and no flag stating the kind of limit is used, both the hard and soft
limits are set to the same value. The same applies when changing a limit in a
systemd service definition file.


## Appendix &ndash; What is a Process?

I understand this has been just technical gibberish, but there's a good reason
&mdash; this is something only power-users should have to deal with. However,
if you need some help understanding why this is happening to you, allow me to
explain.

Operating systems (OS) are very powerful, but not all-mighty. Just as the
hardware they run on has its limits, so do they. The amount of memory in the
system is limited, so there's only so much it can carry. The number of threads
a CPU supports is limited, so there's only so much it can do at the same time.
And the same with countless other resources.

However, operating systems, being a fundamental part of using computers, have
very sophisticated ways of hiding these limitations from the programs running
on them. Each program thinks it has access to all the memory because the OS
manages it intelligently. Each program thinks it has the entire CPU for itself
because the OS is really good at scheduling CPU time. And the same with
countless other resources. Up to a point.

![Kids smiling and trying to get in the picture](./larm-rmah-AEaTUnvneik-unsplash.jpg)

Imagine your computer is a kindergarten full of children running around,
playing, and yelling &mdash; these would be the programs. Here the operating
system is the teacher, whose job is to keep everyone from hurting themselves,
others, or just thrashing the entire place. And since programs are not living
beings, we made operating systems infinitely simpler by allowing them to place
each "child" in its own sandbox, where it can play without influencing others
or the kindergarten &mdash; that's a process.

Now imagine these "children" were capable of performing [mitosis]. That's
called [_forking_][fork] the process. When a process _forks_, it creates
another process just like it, with very few differences. A copy of the original
program in a distinct sandbox, with a copy of the information the initial
process had, except the original process now knows of its _child_.

![Cancer cells replicating indefinitely](./national-cancer-institute-L7en7Lb-Ovc-unsplash.jpg)

What happens if a process just starts multiplying _ad infinitum_? Each sandbox
takes a bit of extra memory to setup, and each "child" has at least a partial
copy of the original process data, and they all have the same resources
requested by the parent process. So it's easy to imagine the system eventually
runs out of some resource and crashes (this is known as a [fork bomb]).  So
how can the operating system handle these rascals?

Linux, the most common operating system for production servers, imposes limits
on every process. Like limiting the number of toys each "child" can hold at the
same time, so they can't hog everything and leave the others crying. These
limits cover a wide range of resources, from CPU resources to the main subject
here &mdash; the number of files open by a process. Most of the times you will
be well within these limits. But once in a blue moon, you'll find your programs
are exceeding them and you'll need to increase these limits safely.


---

_Have questions? Saw something wrong? Reach me on [Twitter], I'd be happy to
hear from you._


[prlimit]: https://man7.org/linux/man-pages/man1/prlimit.1.html
[pgrep]: https://man7.org/linux/man-pages/man1/pgrep.1.html
[ps]: https://www.man7.org/linux/man-pages/man1/ps.1.html
[limits.conf]: https://man7.org/linux/man-pages/man5/limits.conf.5.html
[ulimit]: https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html
[pam_limits]: https://www.man7.org/linux/man-pages/man8/pam_limits.8.html
[daemon]: https://en.wikipedia.org/wiki/Daemon_(computing)
[systemd]: https://freedesktop.org/wiki/Software/systemd/
[sysctl]: https://www.man7.org/linux/man-pages/man8/sysctl.8.html
[mitosis]: https://www.yourgenome.org/facts/what-is-mitosis
[fork]: https://man7.org/linux/man-pages/man2/fork.2.html
[fork bomb]: https://en.wikipedia.org/wiki/Fork_bomb
[Twitter]: https://twitter.com/iampfac
