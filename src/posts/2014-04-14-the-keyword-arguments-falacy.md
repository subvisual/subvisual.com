---
id: 34
path: /posts/34-the-keyword-arguments-falacy/
title: "The keyword arguments falacy"
author: luis-zamith
date: 2014-04-14
tags:
  - development
intro: "Ruby 2.0 came with a feature that I love, that's the keyword arguments. They allow you to make your objects interface clearer, so you can call methods like so:"
---

Ruby 2.0 came with a feature that I love, that's the keyword arguments. They allow you to make your objects interface clearer, so you can call methods like so:

```ruby
game.play(no_of_players: 4, buy_in: 1000)
```  

If you know your ruby 1.9.x you are probably saying "wait a minute, I can already do that!". That's true, but the way it was handled on the method was as a hash:

```ruby
def play(options = {})
  no_of_players = options[:no_of_players]
  buy_in = options[:buy_in]
end
```   

As you can see, this is not as nice and fluent as ruby tries to be. With keyword arguments you can make it much cleaner:

```ruby
def play(no_of_players: nil, buy_in: nil)
end
```  

If you're wondering about those `nil`, they are default values for when that key is not present, so if you called `game.play`, both `no_of_players` and `buy_in` would be `nil`. We can take advantage of that and add some better defaults:

```ruby
def play(no_of_players: 2, buy_in: 100)
end
```  

So now when you call `game.play`, the `no_of_players` is 2 and the `buy_in` is 100. This also means that we can just code ahead not worried about having `nil` values, right? We can do something like:

```ruby
def play(no_of_players: 2, buy_in: 100)
  @house_money = no_of_players * buy_in
end
```  

Well, no. We can't. And this is where it gets tricky. Even though the defaults will be used when the key is not present, they will not be used when an explicit `nil` is passed in. Therefore, this:

```ruby
game.play(no_of_players: nil)
```

will throw an error, because we're trying to multiply `nil` by 100.

This example is trivial, the `nil` is easy to spot, but what if it is a variable calculated somewhere else on your application?

You have two options here:

1. You ensure that variables passed in to the method can never be `nil`.
2. You handle the `nil` inside of the method with something like this:

```ruby
def play(no_of_players: nil, buy_in: nil)
  no_of_players ||= 2
  buy_in ||= 100
  @house_money = no_of_players * buy_in
end
```

This approach defeats the purpose of the keyword arguments almost entirely, but rest assured that you won't have to do this often. 

Most of the time you won't really care if the arguments are `nil`, because they either won't be or you'll be checking that someplace else. If you do need to make sure they are not `nil`, you are left with these options.

The moral of the story is to not assume that just because you have a default, you can't have a `nil`.
