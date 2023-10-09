---
highlight: true
path: poor-mans-orchestration-for-devs
title: Poor man's multi-process development
categories:
  - engineering
author: miguel-palhas
date: 2023-10-09
intro: >-
  Sharing a quick tip that has saved me hours of fiddling with Docker and other complex tools, while retaining an easy-to-use development environment
---

Local development often involves running many processes simultaneously. e.g.: a web server along with a database or blockchain node.

This is often done with `docker-compose`, or other equivalent orchestration tools. However, these tools completely change the workflow, and hinder other abilities, such as debugging, live-reloading and interoperability with your host system (your mileage may vary depending on your actual tech stack).
The naive solution, opening multiple terminal splits and manually run each command, works, but makes it less than ideal to onboard new developers, and can be error-prone.

In fact, there's a simple Bash setup that can be used when setting up small projects:

```bash
#!/bin/bash -ue

trap 'kill %1; kill %2' SIGINT

yarn dev | sed -e 's/^/\x1b[0;31m[web]\x1b[0m /' &
anvil | sed -e 's/^/\x1b[0;32m[anvil]\x1b[0m /' &

wait
```

This does most of what I usually need out of Docker in my development environment:

- Spins up multiple processes in the same command
- Retains the output of each of them
- Prefixes each processes' output with a custom tag & color
- Ctrl+C still works, killing all running processes (that's where `trap` comes in)
