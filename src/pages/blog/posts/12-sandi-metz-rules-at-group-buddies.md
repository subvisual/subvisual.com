---
id: 12
path: /posts/12-sandi-metz-rules-at-group-buddies/
title: "Sandi Metz rules at Group Buddies"
author: luis-zamith
date: 2013-10-25
tags:
  - development
intro: "A lot has been said in the past months, especially in the Ruby community, about the [Sandi Metz rules for developers](https://robots.thoughtbot.com/post/50655960596/sandi-metz-rules-for-developers), so the purpose of this article is not as much to explain them as it is to show how we apply them here, at Group Buddies."
---

A lot has been said in the past months, especially in the Ruby community, about the [Sandi Metz rules for developers](https://robots.thoughtbot.com/post/50655960596/sandi-metz-rules-for-developers), so the purpose of this article is not as much to explain them as it is to show how we apply them here, at Group Buddies.

## The rules

1. Classes can be no longer than 100 lines of code
2. Methods can be no longer than 5 lines of code
3. Pass no more than 4 parameters to a method (hash arguments are paramenters)
4. Controllers can instantiate only one object

**Rule 0**: *"You should break these rules only if you have a good reason or your pair lets you"*

It has been about four months since I posted the rules on the wall, and it has definitely improved our code's quality.

The first thing to understand is that these are more guidelines than rules, you should try to follow them, but there is always rule 0.

## Rule 1 - Classes can be no longer than 100 lines of code

At first 100 lines of code may seem as too few, but what we came to realise is that when you break this rule, it usually means that there is a class waiting to be [extracted](https://sourcemaking.com/refactoring/extract-class) and/or the class is breaking [SRP](https://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod).

## Rule 2 - Methods can be no longer than 5 lines of code

Just to make it clear, in Ruby this is a method with five lines:

```ruby
def do_something(stuff)
  if stuff == 2
    stuff * 2
  else
    stuff * 6
  end
end
```

For us, this was one of the hardest adjustments to make, but it also led to better and cleaner code. It made us rely more on [abstractions instead of concretions](https://c2.com/cgi/wiki?DependencyInversionPrinciple), the methods started to adhere easily to SRP, and the most obvious, yet awesome improvement, is the fact that less code per method is less code that you need to understand, in order to know what the method is doing.

## Rule 3 - Pass no more than 4 parameters to a method

We were almost there already on this one, so it was pretty easy to follow. 

Sometimes this happens because you have a hidden class and you should extract it, and almost always it means you're breaking SRP. Still, if you find yourself breaking it and cannot refactor your way out, maybe it is time to give [value objects](https://www.sitepoint.com/value-objects-explained-with-ruby/) a look. 

## Rule 4 - Controllers can instantiate only one object

For this one you might want to take a deep breath and relax, as it is the most change inducing rule in the lot. The first thing we did in order to comply to it was cheat. We changed it to "Controllers can send only one object to the view", which for us works just fine and brings most of the benefits.

Those of you who have done some experiments with Rails may be wondering how is this even possible. There are some design techniques you can use, we use mostly three.

If you've read the article I linked to in the very beginning, we've already seen one, **[Facades](https://en.wikipedia.org/wiki/Facade_pattern)**.

A similar but not entirely equal technique is the usage of **[Form Objects](https://pivotallabs.com/form-backing-objects-for-fun-and-profit/)**. This one is particularly awesome because it allows you to get rid of `accepts_nested_attributes_for` for good, as a side-effect.

The last technique also operates on the grounds of encapsulating data to be consumed by the view, it's **[Presenters](https://railscasts.com/episodes/287-presenters-from-scratch)**. Presenters are pretty much a layer you put between your models and your views, which allows you to take logic out of the views and make testing easier.

## Conclusion

Sometimes having rules is a good thing, especially when you're starting out, or adding members to the team. It makes a good set of common principles everyone can adhere to and understand.

You should definitely give it a try. 
