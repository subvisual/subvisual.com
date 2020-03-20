---
id: 32
path: /posts/32-our-css-sass-project-architecture-and-styleguide/
title: "Our CSS/Sass Project Architecture and Styleguide"
author: bruno-azevedo
date: 2014-03-31
tags:
  - development
intro: "It's an almost impossible task to find a way to write consistent, future-proof and robust CSS. Our process has, until recently, consisted of appending CSS rules in an *ad hoc* manner to some sort of file organization."
---

It's an almost impossible task to find a way to write consistent, future-proof and robust CSS. Our process has, until recently, consisted of appending CSS rules in an *ad hoc* manner to some sort of file organization.  
Tired of being lost among our own bloated code and knowing how big a headache it was to maintain it, we've decided to evolve into a more modular architecture. An architecture that grants considerable improvements on productivity and maintainability.

Our first attempts at implementing this new architecture in our projects started less than half a year ago, and we know that our process is still far from reaching a mature state, as it is constantly evolving. Nevertheless, we believe that we've accumulated enough experience to share our current architecture, alongside our style guide containing some patterns for writing CSS.

We use Sass' indented syntax for writing CSS. We find it easier to read and write code faster. So throughout this post, the CSS examples will be written using this syntax.

## Sass Architecture

Organizing our folders and files is an essential task to avoid forgetting where a particular section of code is and which saves us a lot of time. Of course, these problems become infinitely worse when we must navigate through someone else’s project, both from inside or outside the company.  
Fortunately, CSS preprocessors like Sass, give us the ability to split our code into several folders and files without affecting performance.

### Folder structure

So far we've tried two folder structures, in which we tried to employ object oriented concepts discussed in some reputable articles: [OOCSS](https://github.com/stubbornella/oocss) and [Atomic Design](https://bradfrostweb.com/blog/post/atomic-web-design/).  
The biggest difference between these two resides mostly in the relationship between each design component. In Atomic Design's case, this relationship is clearly emphasized by the categorization used for grouping each component. While for the other, a small component is no different than a bigger one. For instance, a button is treated and seen the same way as a search form.

So, instead of dropping every Sass file into the same folder, we've organized them into the following well defined  structures.

### Structure inspired by Atomic Design

```text
stylesheets/
|- application.sass
|- utilities/
|    |- _variables.sass
|    |- _reset.sass
|    |- _media_queries.sass
|    |- _grid.sass
|    |- ... 
|- atoms/
|    |- _headings.sass
|    |- _buttons.sass
|    |- _inputs.sass
|    |- ... 
|- molecules/
|    |- _media.sass
|    |- _search_form.sass
|    |- ... 
|- organisms/
|    |- _header.sass
|    |- _footer.sass
|    |- _sign_in_form.sass
|    |- _news_feed.sass
|    |- ... 
|- templates/
|    |- _default_layout.sass
|    |- _book_page.sass
|    |- ...
```    

There is only one Sass file at the root level: `application.sass`. All the other files are divided into specific folders and are Sass partials, i.e. they are prefixed with an underscore (_), so that they are not compiled into `.css` files, you can read more about it [here](https://sass-lang.com/guide). 

It is the root file’s purpose to import and merge all the others.
Usually, we tend to have one component per file with a name that describes purpose, like the name of the component it stands for. This way, we can easily find what we're looking for.

The order in which the folders are imported is as follows:

**Utilities**

We need a set of system-wide styles to begin our design. This folder will need to define the foundation, i.e., a set of global classes, mixins, variables and styles that can be used anywhere and anytime.

**Atoms**

Atoms are the basic building blocks of matter. Applied to web interfaces, atoms are our HTML tags, such as a form label, an input or a button.  
Atoms can also include more abstract elements like color palettes, fonts and even more invisible aspects of an interface like animations.

**Molecules**

Molecules are groups of atoms combined together and are the smallest fundamental units of a compound, built for reuse. These molecules take on their own properties and serve as the backbone of our design system. For example, a search form.

**Organisms**

Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface, such as a header or a footer.

**Templates**

Templates consist mostly of groups of organisms stitched together to form pages. Templates are very concrete and provide context to all these relatively abstract molecules and organisms by applying some layout rules.

### Structure inspired by OOCSS

```text
stylesheets/
|- application.sass
|- utilities/
|    |- _variables.sass
|    |- _reset.sass
|    |- _media_queries.sass
|    |- _grid.sass
|    |- ... 
|- objects/
|    |- _typography.sass
|    |- _buttons.sass
|    |- _header.sass
|    |- forms/
|    |    | _inputs.sass
|    |    | _forms.sass
|    |- layout/
|    |    |- _default_layout.sass
|    |    |- _book_page.sass
|    |- ...
|- pages/
|    |- home_page.sass
|    |- about.sass
```

As mentioned earlier, both structures are similar, except for a non differentiation between independent design components, here referred as *objects*.

**Utilities**

This holds some global definitions like the reset, global variables, as well as Sass tools and helpers that shall be reused across the project.

**Objects**

Contains all kinds of reusable components, from very small and specific like a button or a slider, to larger ones like the header.  
There's an additional folder, *layout*, which has the same goal has Atomic's `/templates` folder, i.e., it holds any rules that define the layout between *objects*.

**Pages**

If there are any page-specific styles, they should go into a file named after the page, for instance, the home page.  
These files can be called on their own to avoid merging them with the others in the resulting stylesheet, therefore they are usually non partial files.

#### Importing files

This structure without categories requires the Sass files to be imported in a specific order.  
So, we've decided to list vendor/global dependencies first, then author dependencies, then patterns and finally templates. It comes together like:

```sass
/* Vendor Dependencies */
@import "compass"

/* Authored Dependencies */
@import "utilities/colors"
@import "utilities/mixins"

/* Patterns */
@import "objects/buttons"
@import "objects/forms"

/* Templates */
@import "objects/layout/default_layout"
@import "pages/home_page"
```

Dependencies like Compass, colors, and mixins generate no compiled CSS at all, they are purely code dependencies. Listing the patterns next means that more specific "templates", which come after, have the power to override patterns without having a specificity war.

### Summary

For either structure, the separation made breaks up all scattered Sass files with little or no organization and makes code faster to read and easier to maintain in the long run.

The Atomic structure is somewhat more rigid, which may or may not be a good thing.  Although, it doesn't need to be restricted to the categorization used in this article. The important thing is to suggest a relationship between each independent design component.  
Furthermore, it gives us the ability to traverse from abstract to concrete in a consistent and scalable way.

Any of the suggested structures is based on our personal and recent experience working with the Object Oriented philosophy. Either one is a definite improvement on our previous process and we'll keep delving into this kind of processes in order to further improve our own. Of course, different circumstances and experiences might warrant a different approach to be applied and if that happens we'll  be ready to try out new ideas.

Personally, at the moment my preference goes to the Atomic approach since it gives us a clearer perception of the relation between each component. This in turn allows us to better understand our architecture and provides a more organized development environment.

We think that the most important thing when deciding on your project building process is making sure everyone in the development team feels comfortable with the chosen structure. If such a thing is not so easily attained, then releasing some documentation will probably be a good idea to keep everyone in the loop.

## Style Guide

Here we outline some patterns that compose our CSS/Sass style guide.

### Naming convention

Naming conventions are a team decision. Currently we are not following strict naming methodologies like [BEM](https://bem.info/method/) because the need hasn't quite appeared yet. Instead we follow a simpler rule:

> Use hyphens when naming mixins, extends, classes & variables. Not camelCase or underscores.

**Sass Variable Names**

For variables involving colors, we start by naming our variables after the colors they refer to. Afterwards, we create variables referring these colors and name them after their purpose in the project.

```sass
$green: #31bf76
$grey: #83929a

$primary-color: $green
$secondary-color: $grey
```

This way, we get a set of variables that makes more sense than plain hexadecimal colors and that are meaningful  across the project.

As for a generic variable's naming convention, we try to organize our variables in a modular way, which brings more structure and cohesiveness, making it easier to read, understand, recall and navigate through.  
So we try to group variables that share relationships and commonalities by arranging words that describe their function from generic to specific.

For example, take all variables that contain color values. If there's no pattern to how we form their names, it may be hard to find a specific group of colors, or even a single color. If we start with the most generic word they share in common and then get more specific from left to right, we get a better organization: 

```sass
/* No pattern */
$border-color
$dark-border-color
$light-color-border
$highlight
$link
$link-dark
$text
$color-text
$link-color-light
$lightest-text-color

/* Better */
$color-border
$color-border-dark
$color-border-light

$color-highlight

$color-link
$color-link-dark
$color-link-light

$color-text
$color-text-light
$color-text-lightest
```

### Media Query Breakpoints

Currently we're replacing the common media query syntax for Sass mixins. The idea is to provide a more natural way to define media queries.

So, we've created two mixins for the most common media queries: `min-width` and the pair `min-width/max-width`. They also apply the media query to `all` media types.

```sass
/* Setup */
$alpha: 320px
$beta: 500px
$gamma: 600px
$delta: 992px

@mixin at-least($width)
  @media all and (min-width: $width)
    @content 

@mixin between($min-width, $max-width)
  @media all and (min-width: $min-width)
             and (max-width: $max-width - 1)
    @content

/* Usage */
.book-gallery
  margin: 20px

  @include at-least($gamma)
    margin: 40px
```

We assign the breakpoints to variables using names with an abstract meaning, so the numbers can change but the names stay the same.  
This naming system is simple, easy to read and device agnostic.

Furthermore, we nest our media queries, pairing them with the styles that are being modified, instead of creating a dedicated section or file that includes all of our media queries.

### CSS rules 

We've built our own guidelines for writing CSS/Sass, which we've documented [here](https://github.com/groupbuddies/guides/tree/master/style#sass). These code conventions' main purpose is to have everyone’s code look the same, which allows any developer to easily work on another developer’s code.

### Code smells

Harry Roberts wrote an article, [Code smells in CSS](https://csswizardry.com/2012/11/code-smells-in-css/), in which he identifies some symptoms found in CSS that can indicate problems regarding its quality, maintainability and integrity.  
We've adopted some of them and here's a short explanation for each one.

#### Undoing styles

Any rule that unsets styles (excluding resets) should start ringing alarm bells. The very nature of CSS is that things will cascade and inherit from things defined previously, instead of undoing what was defined before.

So, we avoid defining rules like these:

```sass
padding: 0
margin-left: 0
border-bottom: none
```

When there are rules that undo previous styling, it's probably because something was poorly designed and the order in which things were written needs refactoring.

#### Magic Numbers

Magic numbers are unique values with unexplained meaning that can be completely circumstantial. They are very bad as they soon become out of date, may confuse other developers and cannot be explained nor trusted.

We avoid using magic numbers as much as we can.

#### (Over)Qualified selectors

We try not to qualify our selectors, i.e., we don't write `ul.nav` when we can just have `.nav`. Qualifying selectors inhibits the potential for reusing a class on a different element and increases the selector’s specificity. 

We avoid these kind of selectors, and when we encounter them we try to shorten them as much as we can.

#### Dangerous selectors

A *dangerous selector* is one with far too broad a reach. A really obvious and simple example of a dangerous selector is:

```sass
div
  padding: 1em
  background-color: #ffc
```

Selectors like these are too generic. They might affect areas they shouldn't and might even inherit styles. They will lead to having to undo styles or adding more code to fix some broken ones.

#### !important

We avoid using `!important` wherever possible. In most cases, it is mistakenly used just as a way of circumventing the problems caused by ill-formed CSS. It doesn't fix any problems, it only fixes the symptoms.  
Nonetheless, it is valid CSS. We might inherit a project wherein the previous developers used it, or we might have to patch something up quickly, so it could come in handy.

#### ID's

We avoid using id's in CSS because of their heightened specificity. We only use them for JS hooks, or for fragment identifiers in HTML.

#### Loose class names

A *loose* class name is one whose purpose can't be understood from its name alone and can be accidentally overridden by another developer because of its vagueness.

So we avoid generic classes like *.header*, *.box*, *.inner*. Instead, we use more strict/specific class names.

```sass
/* Bad */
.profile
    .card
       background: red

/* Good */
.profile-card
    background: red
```

### Summary

This style guide strongly encourages the use of sensible patterns, some more common than others. They are not to be followed blindly, and can, at any moment, suffer modifications.

## Pattern Library

> Every design is like a little language with its own correct grammar and syntax nearly as specific as a programming language. It contains primitives but instead of concepts like maps, arrays, integers, and functions the primitives include size, weight, color, proportion, and texture.  
Without first understanding that language it’s impossible to correctly express anything new.   
<cite>Trek Glowacki</cite>

Whenever we start a new project, there's a load of questions that we always stumble upon, like:

* Which color is being used in a particular component?
* Does that component already exist?
* Can that component be reused?
* What's the font size and line height for that content block?
* What button should I use here?
* What page layouts are there and how and when should I use them?

In order to provide a place where everyone can understand the *language* being used in a project, and therefore get rid of these recurrent problems, we've decided to start creating pattern libraries.  
Each project has its own pattern library as it has its unique design, with its own system of components.

So, a pattern library is a collection of all the visual patterns that are used in a project. They contain things that go from global definitions like colors and typography, to base and atomic components like buttons, or more complex ones like forms and even layouts.  
We also include usage notes for each component that requires an explanation of what it is and when to use it, as well as code snippets (HTML) of each component's markup.

Here's a screenshot taken from one of our Pattern Libraries:

![Screenshot taken from one of our Pattern Libraries](https://draftin.com:443/images/13210?token=WxCbm5XACS5vbLHlky0h2Dd3hFzTXf2aEr_7hEwHcDpGtfe57RADKx-ou5FGx_sOipPLwce3xldN-pfLgMb4Z6E) 

### Benefits

Using a pattern library encourages a much more modular and scalable approach to development, the idea being that any pattern can be used anywhere.

By breaking the site up into patterns, it’s easier to find those bits of markup. With a pattern library, all the elements that appear on the site are in one place so you don’t have to go searching around for them. It works as documentation as well.

It makes device testing easier because everything is in one page and it’s also quick to see if CSS changes to one pattern affect other patterns.

It makes code collaboration much easier by helping maintain code and design standards. It acknowledges that websites change over time and makes it easier to make those changes without breaking stuff.

### How we're actually doing it

There are many implementations for automatically generating a library containing all patterns.  
Some ([Pattern Primer](https://github.com/adactio/Pattern-Primer/), [Paul Lloyd's Barebones](https://github.com/paulrobertlloyd/barebones), [Pears](https://github.com/simplebits/Pears), ...) use an approach which vary slightly from one another, but the common feature between them is that there's a separate folder which contains all the patterns (snippets of markup). These snippets are then automatically added to the generated library.  
Other implementations ([Knyle Style Sheets](https://github.com/kneath/kss), [Sassdown](https://github.com/nopr/sassdown), ...) use comments on the stylesheet to automatically generate the library.

However, we've decided to adopt a different approach. One that doesn't rely on separate folders, nor using comments with a strict syntax on our stylesheets.  
Basically, we create our pattern library manually, by writing the markup directly into the view. The styles are dynamically read from the actual work Sass files.  
This way we have more freedom to control the final output.

We know this approach is not perfect and that it suffers from some common problems present in other approaches, like the duplication of markup. Nevertheless, we expect to further investigate and keep trying different approaches in order to better improve our development process.

## Final thoughts

With this post, we hope to have made you aware of some interesting processes for making design come to life in a project.

All the styles, rules and approaches described here result from our experience and are what fits our team at the moment. Ideally, we hope you take these suggestions and make them your own, adding your flavor to them to improve your own workflow as a team.
