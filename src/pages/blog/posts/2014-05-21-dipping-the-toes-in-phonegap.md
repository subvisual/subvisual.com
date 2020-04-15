---
id: 35
path: /posts/35-dipping-the-toes-in-phonegap/
title: "Dipping the toes in Phonegap"
author: gabriel-poca
date: 2014-05-21
tags:
  - development
intro: "Like most developers I know, there is a list of things I want to learn and experiment with. Mobile development was on the top of that list until last December, when we took a day off for an internal hackathon and some of us got to work on a mobile app."
---

Like most developers I know, there is a list of things I want to learn and experiment with. Mobile development was on the top of that list until last December, when we took a day off for an internal hackathon and some of us got to work on a mobile app.

![Team Tripl.it](https://dl.dropboxusercontent.com/u/4056020/phonegap/working.jpg)

## First big decision: Why PhoneGap?

There is plenty technology available for mobile development. You can go native or you can grab some framework. We chose PhoneGap for a few reasons:

1. It's open source.
2. It's multi-platform. Even though we ended up focusing on iOS, we didn't have a plan at first (more on this subject ahead).
3. It's HTML, CSS and JavaScript. We eat this for breakfast, how hard could it be?
4. I didn't want to look at Objective-C, it hurts my eyes.
5. PhoneGap is getting more and more popular.

For those who don't know, PhoneGap is an application framework that enables you to build native applications using HTML and JavaScript. It uses a web view to run your app, and you can then use Javascript to access underlying operating system features.

It allows you to develop without worrying about the platform. On the other hand you need to worry about the device's native browser since they are all different. It's just like your day to day web development.

## What did we do?

Tripl.it is a mashup between two words: Trip + Split. It tries to solve the pain of splitting expenses on a trip with friends. We made it simple: we needed to add trips, add friends to a trip, and add friends expenses on the trip. In the end, it would generate a report with who owes what to whom on the trip and to share it by email.

The following image shows the user interfaces, ordered in the intended user flow.

![Hackathon design](https://dl.dropboxusercontent.com/u/4056020/phonegap/first-flow.png)

We got stuck for a while trying to deploy to our devices, but by the end of the day we got some basic functionality and colours. It tasted like success. 

## What did we learn?

It didn't feel like work. Everyone got to learn from technology to user experience and design. But the most important things we learned was that we could do it, we could jump in to (simple) mobile apps.

## Technical Details

Although it is HTML and CSS the app must have a native 'feel', with animations, like a slide, between pages. We wanted to do a single page app, and for that job, we used Backbone. We could have also used AngularJS or EmberJS. For storage, there are the browser's databases: WebSQL and localstorage. We used a [backbone plugin](https://github.com/MarrLiss/backbone-websql) for websql.

We also used a [yeoman generator](https://github.com/hypermurea/generator-phonegap) to get an initial project structure. The package [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect) made it simple to develop on Chrome. It's an HTML app and it runs on every browser that supports websql (not Firefox).

## The following weeks

In the following weeks I kept working on Tripl.it. I struggled with backbone and websql, with device bugs and with the PhoneGap API. 

At some point I got a prototype ready and asked some friends to try it out. This was when we realised that the usability was just wrong. Take a look at the following images, it's the design of this first prototype.

![](https://dl.dropboxusercontent.com/u/4056020/phonegap/Flow.png)

Turns out mobile apps have nothing to do with web apps.

### Icons weren't self-explanatory

The buttons have no text, they're images. The problem with this is that the images need to clearly communicate what the button does. After you create a trip on Tripl.it you were presented with the following page.

![](https://dl.dropboxusercontent.com/u/4056020/phonegap/old-timeline.png)

What do you think the money button does? And the green button on the top right corner? Is it a confirmation of some kind?

What action would you take next?

The money button would take you to a page where you saw how much each person had. The green button on the top was to show who owes what to whom. And the action you should take next is to add an expense, by clicking the big green button with a 'plus' sign. You probably couldn't figure this out at first, most people couldn't, which made it our fault. Now take a look at what we did next.

![](https://dl.dropboxusercontent.com/u/4056020/phonegap/last-main.png)

We removed the button from top right corner, it is now the report on the bottom right. Seeing how much everyone spent was merged into a view to manage friends, with a link on the bottom left. There are also some other minor improvements.

There is one button less on the page and no button on the top, so you don't get confused about clicking there or on the big green, which represents the next action. We couldn't figure this out without the users feedback and seeing them actually use it.

### Hard-to-click buttons

You are precise with a mouse, but on a touch screen things are different. Small buttons are hard to hit with a finger. We would see people desperately hitting the back button saying it didn't work.

The buttons are images. To make the buttons work we increased the button size but keep the images the same size, so buttons still look small but are easier to hit since they take invisible space around the image (native apps need to do this too).

Also, since there is no visual feedback on the button being clicked (like changing the color), users would just keep hitting the buttons, even when the action was already in progress.

### Action feedback

If their device is old, users may tolerate a slow app, but if they have a "latest generation something" they won't. Loading all the phone's contacts was a pain, I couldn't use a native contact picker, so I was loading all the contacts on the fly through the contacts API. It was incredibly slow. At this point we had two options:

1. Load the contacts once and store them in localstorage for later use (it would be a problem to detect new contacts on the device).

2. Don't load all the contacts, just give people a search input and start loading with a filter of two or three characters (the contacts API accepts a filter).

The second option worked really well. People would be presented with an input and after they type the second character it would show the contacts immediately.

### Conventions

Android and iOS users expect different conventions. iOS users expect to swipe items on a list to get more options, while Android users may expect long presses to do the trick. Our Android testers where just hitting everything attempting to find some more options. Some of them found the swipe by accident, but most of them never did.

### Animations

There are just two animations on Tripl.it and both are slides. One for changing the page, which slides left and right, and one on the lists, where some options appear. This is accomplished with hardware accelerated translations.

You can use hardware accelerated effects (like slide, rotate and scale) as much as you want. But we wanted things changing opacity and color, and that is really slow since there is no hardware acceleration for it. That's very limiting in comparison with native apps, and even with desktop browsers. Of course there is the HTML canvas, but that's a different story.

If you install Tripl.it you'll notice the lists don't have rounded border-radius like on the images. The reason for that is a bug on webkit browsers. When something is sliding (the hidden menu you slide left to show) it ignores it's overflow (which is the list). We had to remove the border-radius so we could keep the animation. 

### Others

The list goes on and on. We changed both the views and the flow. We moved primary actions to the top right navigation and dismantled complex views with many buttons.

![](https://dl.dropboxusercontent.com/u/4056020/phonegap/flow-last.png)

The previous image contains the current design. There's still a long way to go but our understanding of mobile improved immensely.

## Conclusion

We designed the app to make it work for both Android and iOS. We underestimated the different conventions/patterns for each platform. Looking back, we probably should have focused on one platform or treat them as different apps. It is a clear mistake, and PhoneGap being multi platform was not a major benefit as we first thought.

PhoneGap has the obvious limitations of web vs native apps. Mobile browsers don't support effects like blur, some types of animation are slow and if you want to support older versions of android it gets even worse. João suggested some animations he saw on other apps and we couldn't use most of them because they'd look 'laggy'.

Since it wasn't supposed to be a fancy app, and it should have been fast to do, PhoneGap was indeed the right tool for the job. I'll definitely use it again for small apps or prototyping. Maybe combining it with AngularJS or EmberJS should be interesting. There are some interesting [apps built with PhoneGap](https://phonegap.com/app/). If you are a web developer looking to build a mobile app for your product, you should give it a try. You'll probably reutilize a lot of code.

If you're just looking to download the app, click [here](https://www.tripl.it/). Don't forget to leave feedback.
