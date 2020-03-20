---
id: 62
path: /posts/62-perfecting-a-css-3d-animation/
title: "Perfecting a CSS 3D animation "
author: miguel-palhas
date: 2015-07-17
tags:
  - development
intro: "With recent advances in front end technologies, front end developers have been going crazy, pushing CSS to its limits and doing all sorts of [beautiful animations](http://codepen.io/azevedo-252/pen/rVvMXX). Seriously, there are some [crazy things](http://codepen.io/fbrz/pen/whxbF) out there."
---

With recent advances in front end technologies, front end developers have been going crazy, pushing CSS to its limits and doing all sorts of [beautiful animations](http://codepen.io/azevedo-252/pen/rVvMXX). Seriously, there are some [crazy things](http://codepen.io/fbrz/pen/whxbF) out there.

I recently did this [3D animated atom](http://codepen.io/naps62/pen/MwVRXZ) in which I had to employ a couple of weird techniques which I'll try to explain here.

<p data-height="372" data-theme-id="16919" data-slug-hash="MwVRXZ" data-default-tab="result" data-user="naps62" class='codepen'>See the Pen <a href='http://codepen.io/naps62/pen/MwVRXZ/'>Subvisual - Animated Atom</a> by Miguel Palhas (<a href='http://codepen.io/naps62'>@naps62</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


I'll be using [indented Sass](http://sass-lang.com/documentation/file.INDENTED_SYNTAX.html) syntax in the examples.

## Transforms basics

Let's start from the very bottom. There are 4 basic geometric transformations you can apply to a DOM element using the `transform` property: Translation, Rotation, Skew and Scaling

``` sass
.Square--translate
  transform: translate(30px, 20px) // x and y axis
  
.Square--rotated
  transform: rotate(45deg)

.Square--skewed
  transform: skew(20deg)
  
.Square--scale
  transform: scale(0.5, 0.5)
```

<p data-height="266" data-theme-id="16919" data-slug-hash="ZGRVvx" data-default-tab="result" data-user="naps62" class='codepen'>See the Pen <a href='http://codepen.io/naps62/pen/ZGRVvx/'>Subvisual - Atom Post - Step 1</a> by Miguel Palhas (<a href='http://codepen.io/naps62'>@naps62</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


You can also combine multiple transformations in a single rule, like so:

``` sass
.element
  transform: translate(50px) rotate(90deg)
```

However, keep in mind that order is important here. So these two transforms are different:

```sass
.Square--translateThenRotate
  transform: translateX(30px) rotateZ(45deg)

.Square--rotateThenTranslate
  transform: rotateZ(45deg) translateX(30px)
```

<p data-height="268" data-theme-id="16919" data-slug-hash="zGaexX" data-default-tab="result" data-user="naps62" class='codepen'>See the Pen <a href='http://codepen.io/naps62/pen/zGaexX/'>Subvisual - Atom Post - Step 2</a> by Miguel Palhas (<a href='http://codepen.io/naps62'>@naps62</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


Each transform operation gets stacked on top of the previous ones.
So translating an element after it has been rotated (as in the `Square--rotateThenTranslate` class) will actually change the direction it moves in. Both squares above are moving to the right. But it's their right, not your's.
 
Notice as well that I'm using another variant of the transforms, `translateX` and `rotateZ`, to specify the axis to which I want to apply it.

## Animations

Another cool thing about CSS is that you can animate almost anything:

```sass
.Square--rotateThenTranslate
  animation: rotate 2s infinite linear
  
@keyframes rotate
  0%
    transform: rotateZ(0deg) translateX(30px)
  100%
    transform: rotateZ(360deg) translateX(30px)
```

<p data-height="268" data-theme-id="16919" data-slug-hash="bdKzBL" data-default-tab="result" data-user="naps62" class='codepen'>See the Pen <a href='http://codepen.io/naps62/pen/bdKzBL/'>Subvisual - Atom Post - Step 3</a> by Miguel Palhas (<a href='http://codepen.io/naps62'>@naps62</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


## Building an atom, one orbit at a time

So now we've gone through the basics of what is needed to build an animation like that atom at the beginning. Let's take that last example and style it a bit to look like an electron in orbit. Here's the gist of the changes:

```sass
$Orbit-radius: 100px
$Electron-radius: 10px

@mixin circle($radius)
  border-radius: 50%
  width: $radius
  height: $radius

.Orbit
  @include circle($Atom-radius)
  position: absolute

.Electron
  @include circle($Electron-radius)
  position: relative
  top: $Atom-radius - $Electron-radius
  left: $Atom-radius - $Electron-radius
  animation: rotate 2s infinite linear

@keyframes rotate
  0%
    transform: rotateZ(0deg) translateX($Atom-radius)
  100%
    transform: rotateZ(360deg) translateX($Atom-radius)
```

<p data-height="268" data-theme-id="16919" data-slug-hash="EjRrvx" data-default-tab="result" data-user="naps62" class='codepen'>See the Pen <a href='http://codepen.io/naps62/pen/EjRrvx/'>Subvisual - Atom Post - Step 4</a> by Miguel Palhas (<a href='http://codepen.io/naps62'>@naps62</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


## Positioning the Orbit

Our orbit is currently flat. But we want to give it a three-dimensional look. It should look like a sphere, not a circle. From the user's perspective, each orbit should actually look like an ellipse.

A naive way to simulate this would be to use an actual ellipse instead of a circle. But what would happen to the animation if we animated through an ellipse instead of a circle? Well, 2 main problems come to mind:

1. Rotating an element around an ellipsis is not possible in CSS (or at least, it's impractically hard). You'd have to use an SVG path, or another more complex solution
2. Even if you manage that, the animation speed would look unnatural.



But don't take my word for it, have a look:

<p data-height="206" data-theme-id="16919" data-slug-hash="oXymEz" data-default-tab="result" data-user="naps62" class='codepen'>See the Pen <a href='http://codepen.io/naps62/pen/oXymEz/'>Subvisual - Atom post - Step 5</a> by Miguel Palhas (<a href='http://codepen.io/naps62'>@naps62</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


See how the movement affects your perception? You don't really perceive that as a rotated circle. It's just a flat ellipse, with no three-dimensional feel.

A more correct way to do this would be to use an actual circle, and rotate it:

```sass
.Orbit
  transform: rotateY(60deg)
```

<p data-height="268" data-theme-id="16919" data-slug-hash="aOKrKv" data-default-tab="result" data-user="naps62" class='codepen'>See the Pen <a href='http://codepen.io/naps62/pen/aOKrKv/'>Subvisual - Atom Post - Step 6</a> by Miguel Palhas (<a href='http://codepen.io/naps62'>@naps62</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


See the problem there? The electron inherited the rotation, which makes it looked twisted as well. That's the one thing we need to fix now.

*UPDATE:* I later noticed that Firefox has even bigger problems rendering this last example. The specific problem I'm mentioning can be seen on Google Chrome

## Transform inheritance

What happened to the electron is usually the desired behaviour. Transforms are inherited by an element's children. But that's not really what we want here, since we need the electron to look round all the time, which means it has to be facing forward again.

A useful trick to do here is to apply a transformation to the child which is the exact reverse of all previous transformations.
This works because the transforms will negate each other, and the child element will look just like it did before.

Here's a simple example of how to do this:

```sass
.parent
  transform: rotateX(45deg) translateX(50px)
  transform-style: preserve-3d
  .child
    transform: translateX(-50px) rotateX(-45deg)
```

Notice that we need to apply the operations in reverse order as well. Think of it as a stack of operations. The `translateX` was the last one to be applied, so it needs to be the first one to revert.
 
That `transform-style` property is required on the parent, to ensure 3d transformations are propagated correctly to children elements. You can learn a bit more about it (here)]https://css-tricks.com/almanac/properties/t/transform-style/]

## Fixing the child element

For our atom however, things get messier, because we're already applying a transform to the element itself (and we're also animating that transform!). That needs to be undone as well.

The current state of our transforms (at the first animation frame) is:

```sass
.Orbit
  transform: rotateY(60deg)
  .Electron
    transform: rotateZ(0deg) translateX(50px)
```

So the full transformation applied to the electron is:

```
1. rotateY(60deg)
2. rotateZ(0deg)
3. translateX(50px)
```

This is essentially bringing the electron from the center to its starting position in the orbit. We want to keep it in that position, but rotate it back to the initial angle.
So we're only interested in reverting the rotations, which leaves us with:

```sass
1. rotateY(60deg)
2. rotateZ(0deg)
3. translateX(50px)
4. rotateZ(-0deg)   // revert (2)
5. rotateY(-60deg)  // revert (1)
```

The end result is much closer to our goal:

<p data-height="268" data-theme-id="16919" data-slug-hash="WvyBOy" data-default-tab="result" data-user="naps62" class='codepen'>See the Pen <a href='http://codepen.io/naps62/pen/WvyBOy/'>Subvisual - Atom Post - Step 7</a> by Miguel Palhas (<a href='http://codepen.io/naps62'>@naps62</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>


You can play around with the editor of the sample above to get a better feeling of what's happening.

## Layering Issues

One other issue you may have noticed is that our electrons are now clipping through the orbit line. The solution for that is to move the orbits to a background layer somehow.

I first tried to use `z-index` for this, but that doesn't really play well with 3D transforms, and absolutely positioned elements.
In the end, I created a duplicate of each orbit, and moved them to the background using yet another `translateZ`. You can check the final animation for the solution, but here's the general idea:

``` sass
/* this orbit is visible, but has no electron inside*/
.Orbit.Orbit--background.Orbit--visible

/* this one is on the foreground, and with an atom
   but the orbit line itself is hidden */ 
.Orbit.Orbit--foreground.Orbit--invisible
  .Electron
```


## Wrapping up

The core part is done. After getting a single orbit to work as we did, there's only a few things left:

1. Add new orbits, each one rotated to a different angle, forming a sphere
2. Style everything as needed. After all this transformation non-sense, that shouldn't be too hard

In the end, the final code ended up a bit more complex than what's shown here, but the principles still hold true. You can check the [final version here](http://codepen.io/naps62/pen/MwVRXZ).
