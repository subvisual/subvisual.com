---
highlight: true
path: continuous-animated-gradients
title: Continuous animated gradients
categories:
  - engineering
author: david-lange
date: 2023-10-10
intro: Exploring how to get a bunch of HTML and SVG elements to all share a
  single animated CSS gradient.
---
Recently I came upon a pretty interesting request: a landing page with a bunch of elements - which could be text, backgrounds, SVGs - that share a gradient background. The gradient should also be animated across all the elements in sync. 

<iframe src="https://codesandbox.io/embed/gradience-8rkzqr?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="gradience"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

Basically, I needed a single pagewide continuous animated gradient shared by a bunch of elements.

There are several layers to this:
- Text with gradient backgrounds
- CSS gradients animations
- SVG gradients
- Animated SVG gradients

So let's break things down and go step by step.

## Gradients on HTML
This part is pretty simple:
```css
.gradient-bg {
    background: linear-gradient(to right, darkturquoise, lime);
}
```

We can add that class to any `div`, and we see the gradient. What about text? The usual `color` attribute doesn't support gradients, but we can still actually use `background`:

```html
<h1 class="gradient-text">Hello there</h1>
```

```css
/* Despite the vendor prefixes, this is cross browser compatible */
.gradient-text {
  background: linear-gradient(to right, darkturquoise, lime);
  -webkit-background-clip: text;
  color: transparent;
  background-clip: text;
  width: fit-content;
}
```


The key here is the `-webkit-background-clip: text` line. This clips the background to the actual text shapes, without which it would fill the entire bounding box. We also set the text color to transparent, to reveal the background. 

Note that we set `width: fit-content` in order to constrain the width of the element to the actual width of the text, so we can see the entire gradient at once. 

## Making the gradient continuous
So far so good, but now we have another problem! As you can see in the demo below, each element now has their own gradient, always starting at the gradient's first color and going through to the last.

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/davelange_/embed/LYXxWXd?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/davelange_/pen/LYXxWXd">
  Untitled</a> by David Lange (<a href="https://codepen.io/davelange_">@davelange_</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


Fortunately, there's a pretty simple fix for this:

```css
background-attachment: fixed;
```

This fixes all the backgrounds to the viewport instead of the elements themselves, creating the impression of everything sharing the same big gradient. 

There's a catch though (of course there is, it's CSS): using `background-attachment` in combination with `transform` might not work. This is due to the way CSS transforms create new stacking contexts. This means the transformed elements get treated as a separate layer in the rendering process, effectively messing up our nice `background-attachment` solution.


## Animating gradients
Here things get a little tricky. CSS doesn't really allow us to animate the colors in a gradient, leaving us  two options:

### CSS vars
You can actually use CSS vars in the gradient, and animate those vars, using the [CSS Properties and Values API](https://drafts.css-houdini.org/css-properties-values-api-1/#at-property-rule). You can find some great examples in [this blog post](https://dev.to/afif/we-can-finally-animate-css-gradient-kdk). Problem: it still doesn't work in Firefox.
 
### Background position 
The other option is the older and hackier "background position" technique. Essentially, this involves adding all eventual colours to the initial background gradient and increasing the background size to more than 100% so that only one section of the background is visible at any given time. Then, by animating the background position you can alter the section of the gradient that is visible.

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/davelange_/embed/yLGgXwa?default-tab=" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/davelange_/pen/yLGgXwa">
  Untitled</a> by David Lange (<a href="https://codepen.io/davelange_">@davelange_</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

Unlike the first technique, this one is a positional change, creating the impression that the colours are sliding in and out of view. The implementation looks something like this:

```css
@keyframes shimmer {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 0;
  }
}

.gradient {
  background: linear-gradient(to right, darkturquoise, lime);  
  background-size: 200%;
  background-position: 0% 0;
  background-attachment: fixed;
    
  animation: shimmer 4s linear infinite alternate;
}
```

So far we've got text and other HTML elements sharing an animated gradient 
across the entire viewport. This is pretty good already, but what about SVGs?

## SVG is strange
SVGs are a different thing altogether. They have their own coordinate system, transforms and animations, and gradient definitions, so making them behave in sync with HTML elements can be tricky. So before you go further, you should ask yourself exactly what you need here, as there are 2 options available:

### Static images
If the SVGs will be fully static (no transforms, animations, or interactivity on any element within the SVG), there's a pretty simple solution: just use `mask-image`.

```html
<div class="overlay gradient shimmer"></div>
```

```css
.overlay {
    width: 100px;
    height: 100px;
    -webkit-mask-image: url(/some-graphic.svg);
    -webkit-mask-size: cover;
}
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/davelange_/embed/MWZJoxb?default-tab=" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/davelange_/pen/MWZJoxb">
  Untitled</a> by David Lange (<a href="https://codepen.io/davelange_">@davelange_</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

This will mask the overlay div with the SVG, and the `gradient` and `shimmer` classes apply the background and animation we created previously. 

As we're importing the mask via CSS, it's basically a static image - this means, for instance, we can't apply animations to specific parts of the SVG via classes. Once again, if we try to apply transforms to the masked element, it will mess up the gradient positions.

However if these constraints are not a problem in your use case, this is the simplest solution.

### The not so simple solution
If you need the SVG elements in the markup, or need to animate them, read on. 

First, you should know that it is possible to apply [gradients](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient) and [animations](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate) in an SVG native way, but I was looking for a solution that felt more unified and wouldn't require duplicating code across CSS and SVG.

The problem, of course, is that the CSS we have won't work here (SVG uses `fill` instead of `background`, and `fill` can't be animated via CSS). Then I came across the [`foreignObject`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject) element: 
>The <foreignObject> SVG element includes elements from a different XML namespace. In the context of a browser, it is most likely (X)HTML.

This means we can actually place a div with all those useful CSS classes _inside_ the SVG, and then mask it with the SVG. It looks something like this:
    
```html
<svg>
  <defs>
    <mask id="mask" fill="white">
      <!-- some SVG shapes -->
    </mask>
  </defs>
  <foreignObject width="100%" height="100%" x="0" y="0">
    <div class="overlay"></div>
  </foreignObject>
</svg>    
```
    
```css
.overlay {
    mask: url("#mask");
    background: red;
}
```
    
_Note that `mask: url("#mask")` only works because it's inside the `<svg>` element. If it were anywhere else, it wouldn't work._

My first thought was to just place a div inside the `foreignObject` with the `gradient` and `shimmer` classes, that should work right? _It did not_. Inside an SVG, the `background-attachment` trick doesn't work, and the background positions are off. 
    
The solution I found was to make `<foreignObject>` cover the entire viewport by specifying the `x` and `width` properties dynamically. The mask then reveals the part we actually want.
    
Implementing all this together in a React component can be done in the following way:

```tsx
export default function GradientedSVG({
  children,
  ...props
}: {
  children: ReactNode;
} & React.SVGAttributes<SVGSVGElement>) {
  const id = useId();
  const [localUnit, setLocalUnit] = useState(1);
  const [offsetLeft, setOffsetLeft] = useState(0);

  const accessedNode = useCallback((node: SVGSVGElement | null) => {
    if (!node) return;

    const { width, x } = node.getBoundingClientRect();

    setLocalUnit(width / node.viewBox.baseVal.width);
    setOffsetLeft(x);
  }, []);

  const toLocalUnit = (val: number) => Math.round(val / localUnit);

  return (
    <div className="gradiented-wrapper">
      <svg {...props} ref={accessedNode}>
        <defs>
          <mask id={`mask-${id}`}>{children}</mask>
        </defs>

        <foreignObject
          width={`${toLocalUnit(window.innerWidth)}px`}
          height="100%"
          x={`-${toLocalUnit(offsetLeft)}px`}
          y="0"
          style={{
              mask: `url("#mask-${id}")`
          }}
        >
          <div className="gradient shimmer gradiented-overlay"></div>
        </foreignObject>
      </svg>
    </div>
  );
}
```
    
```css
.overlay {
    width: 100%;
    height: 100%;
}
```

We access the SVG ref and determine the `x` offset. We then use this values to position and scale the `foreignObject`, inside of which we add the `div` with the background and animation classes. 
    
This is basically [the demo](https://codesandbox.io/embed/gradience-8rkzqr?fontsize=14&hidenavigation=1&theme=dark&view=preview) uses. It also allows us to move the shapes with transforms, or apply animations to parts of the shapes on hover.
    
## Wrapping up
This solution is still far from perfect. There are still some cross browser compatibility issues, and I haven't even considered radial gradients yet! Hopefully though, it's a good starting point if ever you need to conjure up a bunch of animated gradients.