---
id: 37
path: /posts/37-random-and-probably-useless-rubyisms/
title: "Random (and probably useless) Rubyisms"
author: miguel-palhas
date: 2014-05-29
tags:
  - development
intro: "Having written and read a lot of Ruby code, I occasionally come across some not-so-well-known features. Or even just a tiny detail that, as useless as it may be, I still find interesting."
---

Having written and read a lot of Ruby code, I occasionally come across some not-so-well-known features. Or even just a tiny detail that, as useless as it may be, I still find interesting.

In the past few days I finally got the chance (and the inspiration) to compile a list of those I found more useful.

## 1. attr_accessors are faster

We all know about `attr_reader|attr_writer|attr_accessor`, which lets us write getter/setter methods easily for our instance variables. And we tend to think of them as just syntactic sugar. They certainly look better:

```ruby
class WithDefaultAccessor
  attr_accessor :my_variable
end

class WithCustomAccessor
  def my_variable
    @my_variable
  end

  def my_variable=(value)
    @my_variable = value
  end
end
```

But it turns out this also makes accessor methods more efficient. Here's my benchmark of both the reader and writer methods, with each benchmark calling the method 1 million times:

```
      user     system      total        real
default reader:  0.060000   0.000000   0.060000 (  0.059281)
custom reader:   0.120000   0.000000   0.120000 (  0.121165)

default writer:  0.060000   0.000000   0.060000 (  0.063709)
custom writer:   0.110000   0.000000   0.110000 (  0.108939)
```

The speedup is around 50% when using `attr_accessor`, which is a pretty big deal, especially for something such as instance variables, which are used virtually everywhere.

The explanation for this has to do with how Ruby handles method definitions internally. By using `attr_accessor`, Ruby can flag the method to speed it up by directly calling a C function.

PS: This is not really useful advice, since you're probably already using this whenever possible. Still, it's nice to know Ruby is smart enough to optimize this for us.


## 2. Inline rescue

I've seen this pattern too many times:

```ruby
Post.first.try(:title) || 'Default title'
```

and it gets even worse when we need to chain method calls to possibly-`nil` values:

```ruby
Post.first.try(:author).try(:role).try(:name) || 'Default role name'
```

One way we could make this *less ugly* would be by using an inline `rescue`, like so:

```ruby
Post.first.author.role.name rescue 'Default role name'
```

If the code fails at any point, we just capture the exception and return a default value instead.
This raises a whole set of questions, especially about whether the `nil` should be allowed to get there in the first place. That´s a [different subject](https://robots.thoughtbot.com/rails-refactoring-example-introduce-null-object), worth its own share of [discussion](https://robots.thoughtbot.com/if-you-gaze-into-nil-nil-gazes-also-into-you).
Still, I couldn't think of an actual example where this might make sense (perhaps there isn't one)


## 3. retry

*Because real programmers don't care about exceptions*

In short, this allows you to re-run code after an exception was caught.

```ruby
begin
  some_dangerous_stuff
rescue SomeException => e
  retry
end
```

Just like the previous one, the first time I saw this I immediately thought *"Why would I ever use this?"*.

Turns out, a couple of days later, I was using cucumber to test an iOS app, which involved a [not-so-reliable framework](https://github.com/calabash/calabash-ios), and a few random timeout errors. Tests would sometimes fail due to reasons beyond our control, and would pass when run a second time. We ended up wrapping the test suite in this:

```ruby
def insist(max_attempts: 3, &block)
  attempts = 0
  begin
    yield
  rescue SomeException => e
    attempts += 1
    retry if attempts < max_attempts
  end
end  
```

As strange as it may seem, this actually made our test suite green, so I officially like this feature now.


## 4. Lambdas quack like hashes

It's a common pattern to replace a function with a list of pre calculated values, when you decide to optimize it for speed. Take for instance the Fibonnaci sequence:

```ruby
fibs = ->(x) do
  (x <= 1) ? 1 : fibs.call(x-1) + fibs.call(x-2)
end
```

You might just need the first 10 fibonnaci numbers, so you just throw this in instead:

````ruby
fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

So it's nice to know that you can abstract this by using both of them the same way. Calling `fibs[0]` will work for both implementations. Lambdas respond to `[]`, so these are exactly the same:

```ruby
fibs.call(5)

fibs[5]
```


## 5. Easier RegEx extraction

When you just want to capture part of a string using regular expressions, you might do this:

```ruby
str = "GB is not Great Britain"

matches = str.match /(Great.*)/
matches[1]
=> "Great Britain"
```

You can one-line this by simply doing:

```ruby
str[/(Great.*)/, 1]
 => "Great Britain"
``` 

This is not rocket science, just something I rarely see people taking advantage of, so I guess it's not all that known.


## 6. Abstracting Array vs Element

If you use ActiveRecord, you might have stumbled onto this one already:

```ruby
class Post < ActiveRecord::Base; end

Post.find(1)
 => #<Post:...>

Post.find([1, 2])
 => #<Post:...>
```

What if we don't care wether we have a single id, or an array? Do we need a conditional to check the type returned by `find`?
An easier way to abstract this is:

```ruby
results = Post.find(one_or_many_ids)
[*results].each do |post|
  handle_a_single_post
end
```

`[*results]` will wrap the argument in an array only if it is not already an array itself, so it will work for both cases.
The caveat here is that it doesn't work properly when the elements we're dealing with are arrays themselves.

PS: This can also be done via `Kernel.Array(results)`, or if you're using Ruby on Rails, `Array.wrap(results)` instead.


## 7. Unary operators

When you do `!true`, that `!` is a unary operator, which you can actually override for your own classes. And the same goes for `+`, `-` and `~`

We can use this to implement a small counter class as an example:

```ruby
class Counter
  def initialize
    @value = 0
  end

  def +@
    @value += 1
  end

  def -@
    @value -= 1
  end

  def ~@
    @value
  end

  def !@
    @value = 0
  end
end
```

And use it like this:

```ruby
counter = Counter.new # 0
+counter              # 1
+counter              # 2
puts ~counter        # outputs "2"
!counter             # resets to 0
```

This is certainly not how I would actually implement a counter, but there are probably better use cases for these operators.


## 8. Method class

For any Ruby object, you can get a reference to a particular method, for example:

```ruby
[].method(:push)
````

That reference is actually a [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)), that is bound to the object that called it. You can then call it, without having to explicitly provide the instance.

```ruby
method = [].method(:push)

method.call(1)
 => [1]

method.call(2)
 => [1, 2]
```

## 9. Method#source_location

Following up on the previous tip, you can also use `source_location` on a method object to identify the file and line where it was defined.

```ruby
## my_file.rb
class CustomClass
  def a_method; end
end

## irb
require 'my_file'

method = CustomClass.new.method(:a_method)
method.source_location
 => ["/Users/miguelpalhas/my_file.rb", 2]
```

This is particularly useful when, for example, you want to make sure your custom method is correctly overriding the one on the superclass/module.


I'm sure there are many more tricks such as these, probably enough for a whole new post some time in the future. Feel free to post your own in the comments below.
