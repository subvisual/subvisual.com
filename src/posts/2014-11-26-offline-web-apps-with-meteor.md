---
id: 45
path: /posts/45-offline-web-apps-with-meteor/
title: "Offline Web Apps with Meteor"
author: gabriel-poca
date: 2014-11-26
tags:
  - development
intro: "In this blog post I'm presenting a solution to make Meteor apps work completely offline. In fact, Meteor apps already work offline, as long as the user doesn't close the browser."
---

In this blog post I'm presenting a solution to make Meteor apps work completely offline. In fact, Meteor apps already work offline, as long as the user doesn't close the browser.

If you don't know what Meteor is or how it works, I recommend that you take a look at the [meteor docs](https://docs.meteor.com/#/basic/) before moving forward.

One of the principles of Meteor is "Data on the Wire", i.e., each client receives all assets upon connection, after which only data is sent between the client and the server.

Another principle is "Database Everywhere", i.e., each client has a subset of the server database that responds to the same operations with the same api.

When offline, a client has everything needed to keep the app running. This article focuses on how to allow a user to reopen the application, while being offline, after the browser has been closed.

## Persisting assets

HTML5 made some progress in allowing web applications to be accessible offline. The result of it is the ApplicationCache interface. Since many people don't know, or understand, [AppCache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache), here's how it is defined in MDN (Mozilla Developer Network).

> Developers can use the Application Cache (AppCache) interface to specify resources that the browser should cache and make available to offline users. Applications that are cached load and work correctly even if users click the refresh button when they are offline.

AppCache stores all the application assets and allows a user to open them when there is no internet connection. For more details on AppCache I recommend [this guide](https://www.html5rocks.com/en/tutorials/appcache/beginner/).

To start using AppCache on a Meteor application just add the package:

```bash
meteor add appcache
```

Don't worry if the console logs say the app has more that 5 MB ( which is the recommended maximum). When Meteor builds for production it concatenates and minifies the assets. If it's still more that 5 MB maybe you need to exclude some assets from AppCache. 

For instance, you can tell AppCache not to save an image:

```coffeescript
Meteor.AppCache.config
	onlineOnly: [
	  '/bg.png'
    ]
```

The [documentation](https://github.com/meteor/meteor/wiki/AppCache) is a good follow up on this topic.

## Persisting data

The client side database is in-memory. When offline, Meteor will store both the current working database and a list of messages to send to the server on reconnect. There is no (official) way to persist this data to disk, and for this reason the information is lost when the browser is closed.

To overcome this limitation, there is [GroundDB](https://github.com/GroundMeteor/db), a fast and thin layer providing Meteor with offline database and methods, saving them into the [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage#localStorage).

To start using GroundDB add the package.

```bash
meteor add ground:db
```

Now your subscriptions will be available when you're offline. If you're using IronRouter you should not use the `waitOn` feature, since this is going to make the application hold until the server responds. Instead, subscribe to the data you want offline on the application startup. For instance, in the file `lib/router.coffee` you can have something like the following:

```coffeescript
if Meteor.isClient
  subscribed = false
  Tracker.autorun () ->
    if Meteor.user() && !subscribed
      Meteor.subscribe 'users'
      Meteor.subscribe 'trips'
      Meteor.subscribe 'expenses'
      Meteor.subscribe 'notifications'
      subscribed = true
```

This way the data will always be on `localStorage` when the user goes offline. This also means that you need to care about the amount of information that you save locally.

If you are interested in this topic, this [google groups thread](https://groups.google.com/forum/#!searchin/meteor-talk/minimongo$20offline/meteor-talk/tGto0cCsvXA/dH3uZjEd9y4J) is a good follow up.

## Summary

Making an offline web application requires a different ways of thinking about a solution, and there are many plenty problems to solve. These packages help pushing forward on making offline web applications. Feel free to ask questions, I'm not an expert but I'll try my best to answer.

As an example, you can run [tripl.it](https://github.com/groupbuddies/tripl.it.git) and see it's source code. It's a mobile application that works offline.

