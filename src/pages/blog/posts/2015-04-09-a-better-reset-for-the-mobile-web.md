---
id: 53
path: /posts/53-a-better-reset-for-the-mobile-web/
title: "A better reset for the mobile web"
author: gabriel-poca
date: 2015-04-09
tags:
  - development
intro: "Mobile web applications are expected to work differently from desktop applications. They need to feel responsive to the user's touch. Having worked on a couple of mobile web applications in the last year, I found that I always start by changing the browser's default appearance and behaviour. This article contains my setup to make a mobile web application feel more like a native one."
---

Mobile web applications are expected to work differently from desktop applications. They need to feel responsive to the user's touch. Having worked on a couple of mobile web applications in the last year, I found that I always start by changing the browser's default appearance and behaviour. This article contains my setup to make a mobile web application feel more like a native one.

## CSS Reset

The following is a set of rules I use in every mobile web application. Keep in mind that some of these are my personal preference.

```css
*, *:before, *:after {
  /* suppressing the tap highlight */
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  /* this is a personal preference */
  box-sizing: border-box;
  vertical-align: top;
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

*:focus {
  /* the default outline doesn't play well with a mobile application, 
     I usually start without it,
     but don't forget to research further to make your mobile app accessible. */
  outline: 0;
}

input {
  border-radius: 0;
}

html, body {
  /* we don't want to allow users to select text everywhere,
     you can enable it on the places you think appropriate */
  user-select: none;
}
```

When using a mobile framework, like [ionic](http://ionicframework.com/), you usually don't need to worry about this, it's already there. Also, remember to run these styles through [autoprefixer](https://github.com/postcss/autoprefixer), since you'll need the vendor prefixes.


## Prevent user scaling

To adjust the browser's viewport for a mobile application you can use the following meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
```

The `width=device-width` part sets the width of the viewport as the width of the device.

The `initial-scale` property controls the zoom level when the page is first loaded, and the `user-scalable` property prevents the user from zooming in and out on your mobile application.

## Overscroll

Most mobile browsers have an "elastic" overscroll for the entire page. This is the reason why, in some web sites, you can pull down the header (that's fixed on the top), revealing a empty layer behind the application. You usually don't want this.

On [Apache Cordova](https://cordova.apache.org/), pasting the following rules in the `config.xml` file should do the trick of disabling the overscroll.

```xml
<preference name="webviewbounce" value="false"/>
<preference name="DisallowOverscroll" value="true"/>
```

On a regular browser you can disable the `touchmove` on the document, which obtains the same result.

```javascript
$('body').on('touchmove', function (e) {
  if (! $('.scrollable').has($(e.target)).length)
    e.preventDefault();
});
```

Even though you don't want a full page overscroll, some places of the application may require scroll. For those places you can enable it with the following rules.

```css
.scrollable {
  -webkit-overflow-scrolling: touch;
  overflow: scroll;
}
```

Notice that on the JavaScript we are excluding the class `scrollable`. You need to add this class to the places you want scrollable content.
The `-webkit-overflow-scrolling: touch;` enables the "momentum" style scrolling.

## Conclusion

The tips I've shared should be helpful for every application. But it doesn't stop here. There is much more you can do to improve the look and feel of a mobile web application, but I'll leave that for another blog post.

For those who don't see the web as a viable platform for mobile, give it another chance. You might end up feeling utterly surprised.
