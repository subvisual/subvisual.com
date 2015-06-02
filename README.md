# We are Subvisual

We are subvisual and this is our website.

## Development

Run the setup to get started:

```bash
bin/setup
```

This is built on top of [middleman](https://middlemanapp.com/) with the
[middleman-seo template](https://github.com/secretsaucehq/middleman-seo), you
might want to check out the docs for these projects.

Here's some of the other things we are using:

* [Slim](http://slim-lang.com/) - The template engine
* [Sass](http://sass-lang.com/) - For CSS preprocessing (using the Scss syntax)
* [Babel](https://babeljs.io/) - A transpiler for ES6
* [Autoprefixer](https://github.com/middleman/middleman-autoprefixer) -
Autoprefix CSS

### Working with SVGs

Because of how Sketch exports SVGs, they might come with repeated ids. If you
see that the SVG images are not being displayed correctly, change those ids into
something unique.

Also, try to optimize the SVGs using a tool like [svgomg](https://jakearchibald.github.io/svgomg/).
