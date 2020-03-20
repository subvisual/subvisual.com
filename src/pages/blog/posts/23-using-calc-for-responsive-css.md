---
id: 23
path: /posts/23-using-calc-for-responsive-css/
title: "Using calc() for responsive CSS"
author: gabriel-poca
date: 2014-01-07
tags:
  - development
intro: "If you implement responsive design then CSS's calc() is a must know feature. If you've never heard of it, here's a description from MDN:"
---

If you implement responsive design then CSS's calc() is a must know feature. If you've never heard of it, here's a description from MDN:

> The calc() CSS function can be used anywhere a length, frequency, angle, time, number, or integer is required. With calc(), you can perform calculations to determine CSS property values.

**[Mozilla Developer Network][1]**

Those who already use a pre-processor (such as [Sass](https://sass-lang.com/) or [LESS](https://lesscss.org/)) and make calculations may be asking what's the difference. The answer is that with calc() you can do arithmetic with different units, including percentage values, for instance _100% - 3em_.

So let’s try it. (This examples are written in SASS)

## Example 1: Fixed width sidebar

You want a fixed width sidebar to the left and a fluid content to the right.

```sass
$sidebar-width: 400px

.sidebar, .content
  display: inline-block
.sidebar
  width: calc(#{$sidebar-width})
.content
  width: calc(100% - #{$sidebar-width})
```

The sidebar gets a fixed width and the content gets what's left from the window through `calc(100% - #{$sidebar-width})`.

## Example 2: Equally spaced buttons 

For some reason you want five buttons equally spaced.
We will use two variables:

```sass
  $button-width: 4rem
  $buttons-count: 5
```

Then each button will be inline and have a fixed width:

```sass
button
  display: inline-block
  width: $button-width
```

Then all except the last button should have a right margin equal to a quarter of the remaining space:

```sass
button:not(:last-child)
  margin-right: calc((100%  - #{$button-width * $buttons-count}) / #{$buttons-count - 1})
```

With [Flexbox](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes) you can do this even better if you don’t care for compatibility below IE 10.

## Conclusion

Much can be done with this and even though there are other ways of accomplishing the same thing, I believe it is always better to make your CSS responsive and to keep your HTML clean.

[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/calc
