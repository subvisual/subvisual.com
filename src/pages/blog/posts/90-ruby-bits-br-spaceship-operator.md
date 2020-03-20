---
id: 90
path: /posts/90-ruby-bits-br-spaceship-operator/
title: "Ruby Bits:  Spaceship Operator"
author: luis-zamith
date: 2016-07-05
cover: https://subvisual.s3.amazonaws.com/blog/hero/157/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/157/image@2x.jpg
tags:
  - ruby-bits
  - development
  - ruby
intro: "This week on Ruby Bits we've decided to honour the [Juno mission entering"
---

This week on Ruby Bits we've decided to honour the [Juno mission entering
Jupiter's orbit](https://www.nasa.gov/mission_pages/juno/main/) by discuss
another special operator in Ruby, commonly known as the spaceship operator
(because it looks like one). You've probably come across it at some point, but
if not, here's what I'm talking about: `<=>`.

## RubyConf Portugal 2016 discount code

If you want to meet us and/or see some talks on Ruby topics, come join us at
[RubyConf Portugal 2016](http://rubyconf.pt/). For being a Ruby Bits reader you get [25% off the price of the
ticket](https://ti.to/subvisual/rubyconfpt-2016/discount/good-reader-spaceship).

## History

Perl was likely the first language to introduce this operator as it is seen in
Ruby, but the same concept exists in Java or C# as part of their Comparable
interfaces.

## How it works in Ruby

The spaceship operator in Ruby has four possible return values, `-1`, `0`, `1`
or `nil`. It will return `nil` only if the two objects are not comparable. If
they are comparable, it will return `-1` if the caller object is considered less
than the argument (whatever that means for these objects), it returns `0` if
they are equal and `1` otherwise.

Sounds confusing? Let's look at an example that will make it clearer:

```ruby
1 <=> 4 #=> -1
4 <=> 4 #=> 0
8 <=> 4 #=> 1
7 <=> "hello" #=> nil
```

## Where to use it?

If you've never used this operator directly, you might be wondering why would
you care about it, or where should you use it. It turns out that `<=>` is the
foundation to everything in the [`Comparable`](http://ruby-doc.org/core-2.3.1/Comparable.html)
module. When it is implemented for a class, it allows you to use the more common
comparison methods such as `<`, `>=`, `between?` or even `sort`.

As you can probably guess, Ruby already implements this for the core classes,
even for `Object` which means your custom classes will also have a very basic
(and usually not very useful) version of the spaceship operator.

## Making my class comparable

As I've stated above, all objects can be compared with objects of the same class
by default, that comparison might not be exactly what you want though. Let's
create a brand new `Dummy` class and see how it behaves:

```ruby
class Dummy
end

d1 = Dummy.new
d2 = Dummy.new

d1 <=> d2 #=> nil
d1 < d2 #=> undefined method `<'
```

Woah! What just happened? Well, when the spaceship operator returns `nil`, none
of the `Comparable` methods work, and the `Object`'s version of `<=>` returns
`nil` for every case, expect when the objects being compared are the exactly the same.
For instance, `d1 <=> d1` would return `0`.

In order to make `Dummy` actually comparable we need to really implement the
spaceship operator, like so:

```ruby
class Dummy
  include Comparable

  def <=>(other)
    0
  end
end

d1 = Dummy.new
d2 = Dummy.new

d1 <=> d2 #=> 0
d1 < d2 #=> false
```

Notice that we included the `Comparable` module and then implemented the `<=>`
method to always return `0`, which means all instances of this class are
considered equal. So that we can write a more interesting method, let's also add
a string attribute that we can compare:

```ruby
class Dummy
  include Comparable

  attr_reader :name

  def initialize(name)
    @name = name
  end

  def <=>(other)
    name <=> other.name
  end
end

d1 = Dummy.new("hello")
d2 = Dummy.new("world")

d1 <=> d2 #=> -1
d1 < d2 #=> true
```

In this example we are simply [delegating](https://subvisual.co/blog/posts/80-ruby-bits-delegation)
the `<=>` to `String`, which in turn will declare that `"hello"` is less than
`"world"` because the [unicode code point](https://en.wikipedia.org/wiki/Code_point) for `h` is 104 and the one for `w` is 119 and that's what's actually being compared.

## More Ruby Bits

If you've enjoyed this Ruby Bit you should really subscribe to [our
newsletter](https://subvisual.co/newsletter/), where other Ruby Bits and more
great articles are shared every week.
