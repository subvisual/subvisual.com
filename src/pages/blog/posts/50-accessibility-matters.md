---
id: 50
path: /posts/50-accessibility-matters/
title: "Accessibility Matters"
author: luis-zamith
date: 2015-02-02
tags:
  - development
intro: "I am privileged. I am able to navigate the web in all it's glory, with all the"
---

I am privileged. I am able to navigate the web in all it's glory, with all the
amazing animations, crazy stuff happening on scrolls, great videos and the
latest style for input fields.

Unfortunately, not everyone can.

## Knowing your users

A person can have a hard time using your product for a multitude of reasons,
from being blind to having a motor disability or even being new to technology.

Research is key at this point. How many users do you have? How many of them are
not able to use your site? Is it an internal tool, or a product for the masses?

When in doubt don't make assumptions. Try to be as inclusive as possible and
feasible in your time frame.

The stage of the product is also a factor in this. Building a prototype, an MVP
or improving an area of a website used by millions of people daily, have very
different constraints and also very different amounts of information available
about the target audience. In my opinion, there is no excuse for at least having
this in mind in the conceptual stage of your product.

## Inclusive Design

In the [words of](https://www.inclusivedesigntoolkit.com/betterdesign2/whatis/whatis.html)
University of Cambridge's Engineering Design Centre:

> Every design decision has the potential to include or exclude customers.
> Inclusive design emphasizes the contribution that understanding user diversity
> makes to informing these decisions. User diversity covers variation in
> capabilities, needs, and aspirations.

### Inclusive versus Universal Design

Inclusive and Universal Design are often used interchangeably, and you'll see it
referred to as the same thing on your [internet searches](https://www.universaldesign.com/about-universal-design.html).
Some people, such as Brian Kelly [defend that](https://ukwebfocus.wordpress.com/2010/06/28/web-ccessibility-code-of-practice-bs-88782010/)
Inclusive is a better name than Universal, which:

> leads people to believe that a single universal solution is possible or,
indeed desirable.

## What can I do?

You can read [WCAG's guidelines](https://www.w3.org/WAI/intro/wcag) and implement
them all in all of your web products.

Coming back to reality, that is both infeasible and undesirable, since it is a
massive undertaking just to read it, and possibly a bigger one to implement it.

There are a lot of seemly small things that you can start doing to improve the
accessibility of your website. Here's a few, from Cameron Cundiff's [talk](https://www.youtube.com/watch?v=Iu_cUWrWOGM&feature=youtu.be&a)
at the NYC Accessibility & Inclusive Design Meet-up:

* Make the website "tab friendly" (aka [keyboard-only navigation](https://www.nngroup.com/articles/keyboard-accessibility/))
* Label form elements
* Provide alternative text for non-text content (alt text for images, [aria
labels](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) or [visually hidden text for icons](https://open.blogs.nytimes.com/2014/06/24/improving-article-accessibility/))
* Ensure color contrast meets minimum thresholds
* Make link text descriptive ([15 rules for accessible links](https://www.sitepoint.com/15-rules-making-accessible-links/))
* Do not use color as the only indication of meaning (a green flag to represent
OK and a red one for errors may not be differentiated by a color blind person)
* Add captions to audio content (both [youtube](https://support.google.com/youtube/answer/2734796?hl=en) and [itunes](https://accessibility.psu.edu/podcasts)
make it really easy for videos and podcasts)
* Add [ARIA landmarks](https://accessibility.oit.ncsu.edu/training/aria/landmarks-xhtml.html)

There are a lot more things you can do, but this is definitely a good start.

## Tools

There are already some good tools that you can use to help test, manually and
automatically, your websites for accessibility.

### Color Contrast

Lea Verou has a [great website](https://leaverou.github.io/contrast-ratio/) for
testing the contrast of colors according to WCAG 2.0.

![color contrast](https://blog.groupbuddies.com/uploads/post_image/image/31/Screen_Shot_2015-01-16_at_17.48.01.png)

Google Chrome as an [add-on](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb?hl=en)
for the developer tools that allows you to inspect an element and test the color
contrast, among other things.

### WCAG 2.0 compliance

With the add-on I have just mentioned, you can perform and audit on
accessibility.

A better tool for this, in my opinion, is [Tenon](https://tenon.io/) by Karl
Groves and his team. You get really detailed reports on how accessible your
website is, and recommendations on how to fix issues. I highly recommend it (it
will be a paid service, but free for OSS).

![tenon screenshot](https://blog.groupbuddies.com/uploads/post_image/image/30/Screen_Shot_2015-01-16_at_17.51.05.png)

### Screen Readers

Let's face it, if you don't use a screen reader everyday, you won't really know how
it feels to use your website with one. It doesn't hurt to try, though.

If you are in a Mac, you have [VoiceOver](https://www.apple.com/accessibility/osx/voiceover/)
out of the box, trigger it with cmd + F5. This should be good enough to give you
a rough idea of how you are doing.

It's probably a good idea to pay some users who do use them everyday and do
usability tests with them.

### Automated tests

If you are using Ruby, you can automate some of these accessibility tests, using
a custom webdriver for your integration tests. This is made easy with
[capybara-accessible](https://github.com/Casecommons/capybara-accessible), there
are literally no changes required to your tests, just the setup.

## Other techniques and problems

Here is some common issues and interesting techniques you might want to use.

### Breadcrumbs

Breadcrumbs at the top of the page are common, also most users will have no
problems understanding what they are. A user with a screen reader, however, will
have to go through some of the breadcrumb links to know where they are. You can
easily add context with a hidden text before the links, for instance, "You are
here:".

### Skip to main content link

A great technique for providing a link to skip to the main content of the site,
for both screen reader and keyboard only users, can be found in the
[WebAIM website](https://webaim.org/techniques/css/invisiblecontent/#skipnavlinks).

### Headings

A common mistake/misconception on the web, is to use headings (`h1`, `h2`, ...) for
style, instead of structure. Screen readers use headings as the page outline,
and it's the [primary way for finding information](https://webaim.org/projects/screenreadersurvey5/#finding)
by their users and therefore is very important not to mess up. An `h1` should be
a main title, and if there is a subtitle it should be an `h2` and a subtitle
inside of that an `h3` and so forth.

HTML5 introduces a new document outline algorithm, alongside with sectioning
content elements such as `section` or `article`. Sematically it is now valid to
have an `h1` inside such an element, and it should be nested under an outer
`h1`. Take into account, though, that screen readers will probably disregard this
new algorithm entirely and thus, it is [recommended](https://www.w3.org/html/wg/drafts/html/master/sections.html#outlines)
not [to use it](https://www.paciellogroup.com/blog/2013/10/html5-document-outline/).

## Conclusion

I am privileged, but I shouldn't be. Everyone should be able to enjoy all of the
web's content with minimum restrictions, obvious ones aside.

As web developers and designers it is our job to make it so. Go and make the web
more accessible, because accessibility matters!

