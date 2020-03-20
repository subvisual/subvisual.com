---
id: 81
path: /posts/81-rubybits-br-type-coercion/
title: "RubyBits:  Type coercion"
author: luis-zamith
date: 2016-05-10
cover: https://subvisual.s3.amazonaws.com/blog/hero/147/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/147/image@2x.jpg
tags:
  - development
intro: "Have you ever had to implement arithmetic operations for an object? If so, there"
---

Have you ever had to implement arithmetic operations for an object? If so, there
is one little method you probably should be aware of, and it's called `coerce`.

As an example let's imagine we are building a system that manages money
transactions, and for that we want to have a `Money` class to handle all the
intricacies of dealing with different currencies, cents, etc...

## The `Money` class

To simplify let's build a class that can only handle one currency (euros) so
that we don't have to care about conversions. In order to create an instance of
such a class, we need only to pass in the amount in cents.

```ruby
class Money
  attr_reader :amount_in_cents
  def initialize(amount_in_cents)
    @amount_in_cents = amount_in_cents.to_i
  end

  def amount
    amount_in_cents / 100.0
  end

  def inspect
    "%.2f €" % [amount]
  end
end
```

That's enough for us to create an print `Money` instances, but we cannot do
anything else with them, like sum or multiply, which was kind of the point.

## Arithmetic operations

Ruby makes it extremely easy to reimplement seemingly core methods, such as `+`
or `*`. That's just what we'll do.

```ruby
class Money
  ...

  def +(other)
    Money.new(amount_in_cents + other.amount_in_cents)
  end

  def -(other)
    Money.new(amount_in_cents - other.amount_in_cents)
  end

  def *(factor)
    Money.new(amount_in_cents * factor)
  end

  def /(dividend)
    Money.new(amount_in_cents / dividend)
  end
end
```

*Note*: that the `+` and `-` methods take an instance of `Money`, but the `*` and
`/` don't. This will be important for a minute.

This is now a fully (kind of) working implementation of `Money`, and here's how
you'd use it:

```ruby
Money.new(100) + Money.new(3000) # => 31.00 €
Money.new(100) * 3               # =>  3.00 €
```

That's great! At this point, you might be wondering what does `coerce` have to do
with this, we've implemented all of this without even thinking about it. That's
true, but what happens if we reverse the order of the operands in our example
above? The commutative property of both the sum and the multiplication
should apply, right?

```ruby
Money.new(3000) + Money.new(100) # => 31.00 €
3 * Money.new(100)               # =>  Money can't be coerced into Fixnum (TypeError)
```

Well, it turns out it doesn't, and the error we get is that `Fixnum` is trying
to coerce the instance of `Money` but can't. How can we solve this?

## Coercion

Enter coercion, more specifically type coercion. As per the Wikipedia
definition, type coercion is:

> In computer science, type conversion, typecasting, and coercion are different
ways of, implicitly or explicitly, changing an entity of one data type into
another.

Plainly put it's a way of taking a data type and converting it to another,
usually when this is done implicitly by the compiler or interpreter of a
language. If it is done explicitly by the programmer it's usually referred to as
conversion or casting.

Getting back to our example, what this means is that we need to let `Fixnum`
know how to interact with `Money` to perform these operations. That is done by
implementing the `coerce` method.

```ruby
class Money
  ...

  def coerce(num)
    [self, num]
  end
end
```

In this situation, `num` represents the `Fixnum` and we're telling it that in
order to call `*`, it need to reverse the order of the operands, so in reality
when you call `3 * Money`, it's being interpreted as `Money * 3`, which we know
works. So, if we re-run the examples everything should work.

```ruby
Money.new(3000) + Money.new(100) # => 31.00 €
3 * Money.new(100)               # =>  3.00 €
```

### The `coerce` method

Now that you know what it does, a little more on how it does it. In Ruby, the
`coerce` method should always return an array, in which the first element is an
object that knows how to do the operation on the argument, and the second is the
argument itself. For both the object and the argument, you can substitute them
with equivalents that do know how to perform the operations. For instance, you
can cast a `String` into a `Fixnum` in order to perform the operation.

For `Numeric` objects Ruby [calls for this coercion](https://github.com/ruby/ruby/blob/trunk/numeric.c#L3322)
if it cannot do anything else to try and accomplish the operation. However, you
can call for other classes to have `coerce` implemented in order to interact
with your class.

```ruby
def *(arg)
  if (arg is not recognized)
    self_equiv, arg_equiv = arg.coerce(self)
    self_equiv * arg_equiv
  end
end
```

There are a lot of examples of places where `coerce` is used, in the Real
World™:

* [Ruby's `Matrix` class](https://github.com/ruby/ruby/blob/trunk/lib/matrix.rb#L1458)
* [RubyMoney gem (which you should use instead of this example)](https://github.com/RubyMoney/money/blob/d090daa09620125b11218405e45ef2356601d579/lib/money/money/arithmetic.rb#L308)
* [Gitlab](https://github.com/gitlabhq/gitlabhq/blob/91fa250038e9182988319f088fb84741b6e2efc9/lib/gt_one_coercion.rb)

This is probably not a problem you will face very often, but when you do, it's a
nice tool to have at hand and understand.

## More Ruby Bits

If you've enjoyed this Ruby Bit you should really subscribe to [our
newsletter](https://subvisual.co/newsletter/), where other Ruby Bits and more
great articles are shared every week.

If you want to meet us and/or see some talks on Ruby topics, come join us at
[RubyConf Portugal 2016](http://rubyconf.pt/). For making all the way to the end
of this article you get [25% off the price of the
ticket](https://ti.to/subvisual/rubyconfpt-2016/discount/good-reader-coercion).
