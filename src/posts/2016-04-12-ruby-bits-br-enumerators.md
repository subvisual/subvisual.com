---
id: 76
path: /posts/76-ruby-bits-br-enumerators/
title: "Ruby Bits:  Enumerators"
author: luis-zamith
date: 2016-04-12
cover: https://subvisual.s3.amazonaws.com/blog/hero/142/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/142/image@2x.jpg
tags:
  - development
intro: "Welcome back to the world of `Enumerable` my friend. As Rubyists we are used to"
---

Welcome back to the world of `Enumerable` my friend. As Rubyists we are used to
spend a lot of time looking at and working with this module (even if you're not
entirely aware). This time we will be looking at a somewhat hidden feature of
most of its methods, they can be used without a block and have a return value
that is itself an enumerator.

Here's how you're probably used to iterating over an `Array` in Ruby:

```ruby
[1, 2, 3].each do |num|
  puts num * 2
end

## => 2
## => 4
## => 6
```

This is great and definitely should be your first solution for this problem, but
in some situation you might find it useful to break this process apart. You
might want to do part of iteration and continue it later, or have the array in
one place and the method that operates on it somewhere else.

Regardless of your reasons, you can also iterate over an `Array` like so:

```ruby
iter = [1, 2, 3].each

def double(num)
  num * 2
end

puts double(iter.next) # => 2
puts double(iter.next) # => 4
puts double(iter.next) # => 6
puts double(iter.next) 
  # => StopIteration: iteration reached an end
```

`StopIteration` is an exception that gets raised when there is nothing else in
the enumerator. This is something that gets hidden away by the block syntax, so
that you don't have to deal with it every time.

### Other enumerators

What we did with `each` is applicable to many other methods on `Enumerable`,
such as `map`, `find`, `max_by` and `sort_by`. I feel that this is a feature in
the language that you may never use, but it is good to be aware of.

### Real World™ example

In Ruby `map` is a method that can be used to go over each element of an
`Enumerable`, perform some operation on it and return a new `Array` with the
results of performing that operation. It sounds more complicated that it really
is. Here's an example:

```ruby
result = [1, 2, 3].map do |num|
  num * 2
end

p result # => [2, 4, 6]
```

The difference between `map` and `each` is that `each` always returns the object
in its initial state, but `map` returns a new `Array` with the modifications we
wanted done to it.

Now, what if we wanted to do something similar to what we've just done but
instead of always multiplying the number by `2`, we wanted to multiply it by its
index in the `Array`?

We know there's a method called `each_with_index`, we could try to use that with
an auxiliary `Array` to store the result of each of the steps. On the other
hand, that sound a lot like `map`, I bet there's a `map_with_index` we can use!
Well, unfortunately there isn't... What if we create our own "`map_with_index`"
by composing `map` and `with_index` (another `Enumerable` method)?

```ruby
result = [1, 2, 3].map.with_index do |num, index|
  num * index
end

p result # => [0, 2, 6]
```

Wow, it worked! And it reads pretty well, but how come we can do this? If we
open `irb` and run this:

```ruby
> [1, 2, 3].map.class.ancestors

## => [Enumerator, Enumerable, Object, Kernel, BasicObject]
```
We can see that `Enumerator` is itself `Enumerable`, which means it has the `with_index` method, but
more importantly than that, it means we can compose this methods at will. And
that my friends is why there's no way not to love the `Enumerable` module.

### More Ruby Bits

If you've enjoyed this Ruby Bit you should really subscribe to [our
newsletter](https://subvisual.co/newsletter/), where other Ruby Bits and more
great articles are shared every week.

