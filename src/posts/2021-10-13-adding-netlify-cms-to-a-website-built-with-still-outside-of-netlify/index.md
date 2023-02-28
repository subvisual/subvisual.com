---
path: /netlify-cms-in-a-website-built-with-still-outside-of-netlify
title: Adding Netlify CMS to a website built with Still outside of Netlify
author: gabriel-poca
date: 2021-10-12
seoImage: blog-tw-2x.png
intro: A couple of days ago I added Netlify CMS to Subvisual's blog. I found the
  experience of using Netlify CMS so good that I had to get it on my
  blog. But, while Subvisual's blog is built with
  Gatsby and deployed to Netlify, mine is built with
  Still and deployed to Github Pages, so getting it up
  and running is not as straightforward.
---
# Adding Netlify CMS to a website built with Still outside of Netlify

A couple of days ago I added [Netlify CMS](https://www.netlifycms.org/) to [Subvisual's blog](https://subvisual.com/blog/). Our blog posts are written in markdown and published through git, so non-developers were always limited by the availability of developers to publish and make updates. With Netlify CMS, we can still use git and markdown, but at the same time have a web interface with a rich editor to get posts online.

I found the experience of using Netlify CMS so good that I had to get it on [my blog](https://gabrielpoca.com). But, while Subvisual's blog is built with Gatsby and deployed to Netlify, mine is built with [Still](https://stillstatic.io) and deployed to Github Pages, so getting it up and running is not as straightforward.

## Setup

*If you don't have a website built with Still, check out the [getting started](https://hexdocs.pm/still/getting_started.html) page.*

From the [docs](https://www.netlifycms.org/docs/add-to-your-site/), we know that the first step is to put an HTML file somewhere to serve as the entrypoint for Netlify CMS. I've added mine to `priv/site/admin/index.html` and pasted the contents from the docs:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

By default, Still doesn't know what to do with this file, so we'll update `config/config.exs` and add the `admin` folder to the `pass_through_copy`, which will copy the folder over to the generated website.

```elixir
config :still,
  pass_through_copy:  ["admin"]
```

Netlify CMS will be available in `http://localhost:3000/admin`, but we still have to configure it.

## Configuration

Create a `config.yml` next to the `index.html`. This file will already be copied over to the generated website because of the config we wrote previously. I'm only going to address some parts of the config, but you can see the whole [config on Github](https://github.com/gabrielpoca/gabrielpoca.com/blob/master/priv/site/admin/config.yml).

The first part is to configure the backend:

```yml
backend:
  name: github
  repo: gabrielpoca/gabrielpoca.com
  base_url: https://auth.gabrielpoca.com
```

The interesting part is the `base_url`, which points to a service I deployed. If I was using Netlify this would not be necessary. But I'll address that later.

Next, I defined two collections: blog posts and book reviews. They are pretty similar, but the blog posts collection creates a folder per blog post. The trick is accomplished with the `path` option. The relevant sections:

```yml
media_folder: ''
public_folder: ''

collections:
  - name: 'post'
    label: 'Post'
    folder: 'priv/site/blog'
    create: true
    slug: 'index'
    media_folder: ''
    public_folder: ''
    path: '{{year}}-{{month}}-{{day}}-{{title}}/{{slug}}'
    fields:
      - name: 'layout'
        widget: 'hidden'
        default: "_includes/post_layout.slime"
      - name: 'tag'
        widget: 'hidden'
        default: ["post"]
      - label: 'Cover'
        name: 'cover'
        widget: 'image'
        allow_multiple: false
        required: false
      - label: 'Title'
        name: 'title'
        widget: 'string'
      - label: 'Publish Date'
        name: 'date'
        widget: 'date'
        format: 'YYYY-MM-DD'
      - label: 'Body'
        name: 'body'
        widget: 'markdown'
```

Notice the `hidden` fields. Those will be included in generated frontmatter and I've set the mandatory options for each collection. Any image I upload will be placed next to the `index.md` file, inside each post's folder This allows me to easily reference them from markdown with a relative path.

## Authentication

For Subvisual's website, I've used Netlify's Identity service, which allows people without a Github account to contribute to our blog. This removes developers from the process and makes publishing available to everyone on the team.

For my website, I only want to authenticate using Github, but it's not that simple because Github requires a [server for authentication](https://github.com/netlify/netlify-cms/issues/663#issuecomment-335023723). I can't use the one provided by Netlify so I found [netlify-cms-github-oauth-provider](https://github.com/vencax/netlify-cms-github-oauth-provider) which reverse-engineered the implementation of Netlify's server, which means we don't have to write a custom backend for Netlify CMS.

I won't go into details on how I deploy and manage my services, but I think these environment variables are relevant:

```
REDIRECT_URL=https://auth.gabrielpoca.com/callback
SCOPES=public_repo
```

The `REDIRECT_URL` has to point to the auth server and the `SCOPES` is limited to `public_repo` because I didn't feel comfortable having an Oauth App with full access to every repo. The `public_repo` scope makes it safer.

I guess anyone can use my server but I honestly don't recommend it.
