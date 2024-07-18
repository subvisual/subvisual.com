---
highlight: true
path: Using_slow_motion_to_make_better_CSS_animations
title: Using slow motion to make better CSS animations
categories:
  - engineering
author: david-lange
date: 2024-07-18
intro: "CSS animations and transitions are a great way of adding some delight to
  your user experience. But once you start dealing with more than just a couple
  of simple animations, it can be hard to manage and coordinate everything
  easily. Sometimes, you know something is off, but you're not sure what.
  Especially when there are several things happening at the same time, it's hard
  to understand - basically, the animations are at the right speed for our brain
  to sense something is not right, but too fast for our brain to figure out
  exactly what is wrong.

  \ "
---
CSS animations and transitions are a great way of adding some delight to your user experience. But once you start dealing with more than just a couple of simple animations, it can be hard to manage and coordinate everything easily. Sometimes you know something is off, but you're not sure what. Especially when there are several things happening at the same time, it's hard to understand - basically the animations are at the right speed for our brain to sense something is not right, but too fast for our brain to figure out exactly what is wrong.

There's a quick and easy way to see all the animations and transitions in slow motion, figure out what needs tweaking, apply the changes in the code, then play it back in normal time. All this without needing to go through your code to find and change a bunch of CSS values.

### One CSS variable to rule them all

Create a CSS variable, then multiply any animation timing value by it: animation-duration: calc(0.7s * var(--factor)). Change the value of the variable and all the animations will follow.

Here's a playground where you can see this in action - try submitting the form with different slow-motion values:

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/davelange_/embed/MWZJoxb?default-tab=" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/davelange_/pen/MWZJoxb">
  Untitled</a> by David Lange (<a href="https://codepen.io/davelange_">@davelange_</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


There are about 7 separate animations or transitions that happen once the form is submitted, and like this we can easily "debug" the whole scene, making sure nothing happens too soon or too late. As an added bonus, this means we could also skip animations entirely by setting the variable to 0.

### In Javascript

Accessing and setting a CSS variable in Javascript is easy:

```
body {
 --factor: 1
}
```



```
// Get value
getComputedStyle(document.body).getPropertyValue("--factor");

// Set value
document.body.style.setProperty("--factor", 2);
```

And that's it! It's quite a simple technique that isn't specific to any framework or library, but hopefully it can help you create better animations.