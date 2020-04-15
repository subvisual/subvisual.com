---
id: 42
path: /posts/42-overview-of-meteor-cordova-phonegap-integration/
title: "Overview of Meteor Cordova - PhoneGap integration"
author: joao-justo
date: 2014-09-25
tags:
  - development
intro: "I recently started working on the second version of [Tripl.it](https://www.tripl.it/), a [mobile app](https://blog.groupbuddies.com/posts/35-dipping-the-toes-in-phonegap) we built with [PhoneGap](https://phonegap.com/)."
---

I recently started working on the second version of [Tripl.it](https://www.tripl.it/), a [mobile app](https://blog.groupbuddies.com/posts/35-dipping-the-toes-in-phonegap) we built with [PhoneGap](https://phonegap.com/). 

I've been experimenting many frameworks in order to find the one that better fits our needs and just a few days ago the official integration for [*Meteor Cordova*, came out](https://www.meteor.com/blog/2014/09/15/meteor-092-iOS-Android-mobile-apps-phonegap-cordova) and I immediately thought it would be a good fit for us.

Just like the smartphone allows us to perform multiple tasks with only one device when we used to require several (like a camera, an MP3 player, a computer and a phone), *Meteor Cordova* brings together a wider support of web technologies and native resources such as the camera or the accelerometer, all under the same code. Plus, you can do this and write the server side with the same language and API. 

This is particularly good if there's already someone on your team that's familiar with JavaScript, if you're short on time or you're just building a quick prototype.

##What is Meteor? 

Meteor is an Open-Source web framework based on Node.js that uses JavaScript for both client and server code.

###Pros of Meteor

- Uses the same language and API for both frontend and backend
- [Live page update](https://docs.meteor.com/#livehtmltemplates) allows your templates to refresh automatically whenever the data changes
- [Hot code pushes](https://www.meteor.com/blog/2012/02/09/hot-code-pushes) updates the app without disturbing the connected users (no downtime)
- [Latency compensation](https://docs.meteor.com/#sevenprinciples) immediately updates a page on user actions, no need to wait for the server

###Cons of Meteor

- [The order in which files are loaded] (https://docs.meteor.com/#structuringyourapp) is a bit confusing. Files on the lib folder are loaded before than anything else; then the files on the sub-directories by alphabetical order; lastly any file that matches "main.*"  
- [DDP] (https://www.meteor.com/blog/2012/03/21/introducing-ddp) (distributed data protocol) was created by Meteor and therefore is not a standard protocol
- All data is loaded to the client at the start which can make the first page load slower
  
###What is Meteor good for? 

Meteor is an entirely new concept, it can't be compared with any other frameworks. It's good for things that need real time synchronisation between clients like chat apps or collaborative documents.
Check out [telescope](https://github.com/TelescopeJS/Telescope), it's open-source and a good place to see what a big Meteor app looks like and what can be done.

##What is Cordova?

Apache Cordova is a set of APIs that allow access to a smartphone's native functions from JavaScript. 

It enables the creation of native smartphone apps using HTML, CSS and JavaScript. These apps are packaged with native SDKs and can be deployed to the respective stores (Google Play, Apple Store, etc...).

###Pros of Cordova

- Ability to write apps for multiple platforms with one set of skills, without the need to learn different languages/SDKs
- [Plugin architecture](https://cordova.apache.org/docs/en/3.5.0/guide_hybrid_plugins_index.md.html) allows extending native functionalities to JavaScript

###Cons of Cordova

- The [supported features](https://cordova.apache.org/docs/en/3.6.0/guide_support_index.md.html#Platform%20Support) vary from platform to platform
- JavaScript is not always the best tool for the job

###What is Cordova good for?

Cordova is great for apps that are not CPU-bound and for prototyping, because with the same code base you can deploy to multiple platforms.

##Why should I use Meteor Cordova?

Cordova integration with Meteor brings a very easy and focused way of writing applications.

You can write a Meteor app and then simply package it with Cordova and deploy it to any device. 

Moreover you'll have native apps that are reactive, which means that all data will be synchronized between clients in real-time, so the amount of data transfered between client and server is also reduced to the minimum because Meteor only sends the information that changed.

If you are considering developing a mobile app, you should definitely give it a shot. 

The advantages are numerous, documentation is really good and the Meteor team is continuously adding new features to it.

I used to develop native Android apps and so I didn't believe that web technologies could create quality apps. *Meteor Cordova* was probably the first framework that got me excited about, and if you haven't tried it yet it's about time to give it a go.

[Meteor](https://www.meteor.com/)  
[PhoneGap](https://phonegap.com/)  
[Apache Cordova](https://cordova.apache.org/)  
[Meteor Cordova - Phonegap integration](https://github.com/meteor/meteor/wiki/Meteor-Cordova-Phonegap-integration)
