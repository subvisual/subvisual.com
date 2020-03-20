---
id: 88
path: /posts/88-rubybits-br-triple-equals/
title: "RubyBits:  Triple Equals"
author: luis-zamith
date: 2016-06-14
cover: https://subvisual.s3.amazonaws.com/blog/hero/154/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/154/image@2x.jpg
tags:
  - ruby-bits
  - development
  - ruby
intro: "If you thought that the `===` operator was something only JavaScript developers"
---

If you thought that the `===` operator was something only JavaScript developers
had to deal with, you were mistaken. We also have one in Ruby, even though it
differs immensely in terms of functionality, from its JS counterpart.

In Ruby, the `===` is referred to as Case Equality, undoubtedly because it's
most common use is hidden away behind the `case` statement. That means that if
you've ever used a `case` statement in Ruby you have been using our friend
triple equals all along.

## Using Case Equality

As mentioned the most common use of this operator is in the `case` statement,
for example:

```ruby
case num
when 1 then "one"
when 2 then "two"
else "nothing"
end
```

Behind the scenes, Ruby is actually calling `1 === num` and `2 === num`. You can try
it yourself, go to `irb` and type `1 === 1`, it should be `true`.

## Case Equality on other types

Now to make it a little harder, do this `(1..10) === 5`. After you've pressed
enter you should have `irb` saying it is `true`, which is both great and makes
sense, since `5` is clearly in the range between `1` and `10`.

Make no mistake, there is not magic here, `===` is an operator defined by
`Object` to do the same as `==`, but other classes can overwrite it to do whatever
they please, that's exactly what `Range` does.

Many other basic ruby types (or classes) do it, such as `Regexp` for regular
expressions, `/sub/ === "subvisual"` should be `true`. Bare in mind thought that
it is dependent on the order of the arguments, if you tried `"subvisual" ===
/sub/` it would be `false`, since the `===` for `String` will do
`"subvisual".eql?(/sub/)` because the regex is not a `String` and does not
respond to `to_str` (see the [docs here](http://ruby-doc.org/core-2.3.0/String.html#method-i-3D-3D-3D)).

Another way you can use the case equality is with the `Module` class (of which
`Class` inherits from), since it will behave similarly to `is_a?`, allowing to
do `Integer === 1` and have it be `true`.

## Lambdas and Procs

Lambdas and `Proc`s behave in an even more interesting way when combined with
the case equality, by taking advantage of the fact that any `Proc` can be run
with `call` method and calling it implicitly with the object being compared. For
instance, `Proc.new { |num| num + 2 } === 3` is equal to `Proc.new { |num| num +
2 }.call(3)` and both will evaluate to `5`.

This can be used in a `case` statement to make it read a little bit better.
Assuming we want to do things based on a number being even or odd, we could do
this:

```ruby
def even?
  -> (num) { num.even? }
end

def odd?
  Proc.new { |num| num.odd? }
end

case a
when even? then "even"
when odd? then "odd"
else "impossible"
end
```

Notice that I use both a lambda (using the [stabby lambda syntax](http://stackoverflow.com/questions/9340117/what-is-the-stab-operator-in-ruby))
and a `Proc` since they behave in very similar ways.

## More Ruby Bits

If you've enjoyed this Ruby Bit you should really subscribe to [our
newsletter](https://subvisual.co/newsletter/), where other Ruby Bits and more
great articles are shared every week.

If you want to meet us and/or see some talks on Ruby topics, come join us at
[RubyConf Portugal 2016](http://rubyconf.pt/). For making all the way to the end
of this article you get [25% off the price of the
ticket](https://ti.to/subvisual/rubyconfpt-2016/discount/good-reader-triple).

