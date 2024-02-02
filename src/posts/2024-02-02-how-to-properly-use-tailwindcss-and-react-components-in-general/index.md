---
highlight: true
path: tailwindcss-react
title: How to properly use TailwindCss, and react components in general
categories:
  - engineering
author: pedro-oliveira
date: 2024-02-02
intro: >-
  When you are building a brand new product time is key, and so bootstrapping
  the development. The good old trick of leveraging from available tools as much
  as you can still reduces the development time and prevents you from
  reinventing the wheel. 

  Hopefully not everything on the internet is bad, and there are a bunch of awesome libs out there that help builders move fast, one of them is TailwindCSS.
---
When you are building a brand new product time is key, and so bootstrapping the development. The good old trick of leveraging from available tools as much as you can still reduces the development time and prevents you from reinventing the wheel. 
Be intentional about the functionality you are delegating and avoid over-usage of libs.

One of the critical aspects of new web products is the first impression and the user experience, even on early versions of the product. Users must feel the product is adding value and the experience must be perfect, no matter how simple the product is.
This usually means more pressure both on designers and frontend developers.

Hopefully not everything on the internet is bad, and there are a bunch of awesome libs out there that help builders move faster, one of them is TailwindCSS. 

*TailwindCSS is a utility-first CSS framework that simplifies application development. It provides users with a range of utility classes to manage layout, color, spacing, typography, shadows, and more, enabling the creation of custom components directly within HTML, without the need for additional custom CSS.* 

I usually am very resistant when it comes to deciding about using TailwindCSS because it can easily become a mess with the amount of verbose it requires. Generally, I don't like TailwindCSS. But here's a caveat: I don't like tailwind in a very specific context, which most of the time is the context we at Subvisual work on - when there's a design team working along with developers.

Every now and then I feel that combining all the design details (margins, paddings, font size, font weight, etc) with tailwind defaults is a challenging task, mainly if the design system doesn't follow the framework system. Of course, there's the `tailwind.config` file which I love, but if the design requires you to configure everything, what's the point of bootstrap? Ok, still can leverage other features such as positioning system, transitions, and media queries maybe. 
But if you have the design already, wouldn't it be easier to just play along with `CSS modules` and have a cleaner markup instead of tons of classes? That's arguable, we can discuss that on X. But that's also the main pitfall I see in using TailwindCSS. 

Fortunately, the whole point of this text is to present to you, and eventually convince myself, that TailwindCSS is a lifesaver, and how to workaround all the verbose that it requires.

The right question: **Why use TailwindCSS?** 

Unlike other CSS frameworks, TailwindCSS is a low-level framework, meaning it doesn't offer styled components like input, selectors, lists, or nav bars, but utility classes that allow quick and precise control over design elements like layout, color, spacing, and typography, and you won't need to write a single line of custom CSS.
Tailwind also gets your back when it comes to consistency unless you mess up - leveraging the defaults it offers a pre-set of font sizes, margins, and paddings that allows one to keep consistency if properly used! Plus, cool color shades, relative font weights, etc.

On top of that, it has a vibrant community and extensive documentation. There are numerous resources, plugins, and extensions available, making problem-solving and feature implementation easier. That's why you should use it. 

Now that we agree on the CSS not-framework, let's take a look at this simple button. 
It's common with TailwindCSS to have a lot of classes and that is one of the key features, after all, they allow control of the component style.

```html

```

!\[[Screenshot 2023-10-27 at 17.12.30.png]]

If this is the only button on your app, you're good and you don't need anything else. But that's not what happens in most of the cases. 

Most likely you'll have variations of this component, either color or size, with an icon instead of a text, with an icon and text, etc. 

And when that time comes, so does the spaghetti monster. 

My first ground rule is to create isolated base components. This not only allows us to isolate the style but also the responsibility! And since every app has buttons, let's create a component for that!

```tsx

```

This would be the basic button of the application and it should grow with the project's design system. 

```tsx

```

From here, growing is straightforward!  The idea is to add variants as props and render classes accordingly. [Classnames](https://github.com/JedWatson/classnames) is a good ally for this. Alternatively, you can use [dynamic class names](https://tailwindcss.com/docs/content-configuration#dynamic-class-names), but keep in mind not to use string concatenation directly on `className` to create class names as it won't work.

```tsx

```

The trick is pretty basic: setting up a `base` style for the component, then defining the specifics of each variant on a separate string, and combining everything. 

```tsx

```

There is an interesting detail that I'm 99% sure you missed. The final snippet lost the positioning classes `mr-2 mb-2`. That's the second piece of advice. 
Everything positioning-related should be handled by the parent, not the base component. This seems pretty basic, I know, but that's how to can keep consistency on your components. One may say this may increase the verbose on the parent element, but that's a golden rule to avoid multiple variations inside the component. If there's a very specific need you can always add an extra prop like `classes` and pass a string of extra classes to be added, it's also a valid trick.

This simple yet useful abstraction allows one to keep consistency on the app buttons, centralize component style, and iterate faster!

Here's another example, this time for typography!

```tsx

```

In this example, I extended the `HTMLHeadingElement` excluding the size, which makes it useful for preserving some properties. However, the most interesting part here is how simple it becomes to create a typography component that will ensure that all your text components will follow the same spacing properties, and how easy it becomes for you to control available weights and font sizes! 

As you can see, the more you isolate complexity and avoid ad-hoc styling, the more consistency you get, and the faster you build!

Oh! And a tip for free: following the component approach will allow you to create [Storybooks](https://storybook.js.org/) for each component and document it with near zero effort!!! 

At this time of the post, you might be wondering how this solves the issue of 
having tons of classes, after all, we're just sweeping  *the dirt* under the rug. 
That's right. And that's almost the maximum you can hide classes. There's yet a powerful feature on tailwind that allows you to hide it a little bit more, however, it might become harder to follow the styles and, if the project already uses components, this might not be as productive as intender. 

TailwindCSS offers some workarounds in the documentation but the one I see more utility is abstracting the classes with the `@apply` key. After all, is the one closer to writing CSS as this allows you to apply a bunch of classes to a new CSS class and use that instead of a chunk of classes. Here is how the component button would look like:

```css

```

```tsx

```

I don't see a great advantage of combining both class extraction and react components, instead, I see the greater advantage of this extraction precisely when there's no component abstraction so the CSS classes are applied directly to the element.

And finally, the way I use to solve my problems when the designer decides not to play by TailwindCss defaults: `tailwind.config.js`
This configuration file allows you to extend the tailwind defaults or create your own theme while keeping the class name style, from color to keyframe animation. 

```js

```

```html

```

And that's it, folks!

This is a simple yet powerful design pattern that saves tons of time when implementing a UI, especially from a design, allowing one to set up all the variations at once and then start building your frontend with blocks without any need to worry about each component style on a high level.