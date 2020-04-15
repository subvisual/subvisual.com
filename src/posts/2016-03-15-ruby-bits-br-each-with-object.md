---
id: 74
path: /posts/74-ruby-bits-br-each-with-object/
title: "Ruby Bits:  Each with object"
author: luis-zamith
date: 2016-03-15
cover: https://subvisual.s3.amazonaws.com/blog/hero/140/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/140/image@2x.jpg
tags:
  - development
intro: "The`Enumerable` module is the core of everything in Ruby. It is often said that"
---

The`Enumerable` module is the core of everything in Ruby. It is often said that
if you know this module, then you know Ruby and that's not far from the truth, in my opinion.

From all the awesome methods in enumerable there is one that I love above all,
to the point that I have publicly admitted to be my favourite method in the
entire language, and that is `each_with_object`.

Here's how you could use it:

```ruby
numbers = [1, 2, 3, 4]

numbers.each_with_object([]) do |number, acc|
  acc << number * 3
end

## => [3, 6, 9, 12]
```

It works be iterating over each of the elements of the `Array`, and performing
some action on them, just like `each`, but with the difference that it also
gives you an accumulator or memo object which I have called `acc` in the example
above.

This object allows you to keep data from one step of the iteration to the other.
If you've ever used `inject` or `reduce` it's pretty much the same thing, but
you don't have to return the memo object at the end of the block, it is
automatically passed on with whichever changes you've made to it.

The caveat with this method is that the memo object really does need to be an
object, as it relies on the fact that it is passed by reference, not by value as
`Fixnum`s or `String`s.

In The Real World™ this could be used to build up an `Array` of objects, for
example:

```ruby
  (1..10).each_with_object([]) do |num, questions|
    questions << Question(name: num.to_s)
  end
```

### More Ruby Bits

If you've enjoyed this Ruby Bit you should really subscribe to [our
newsletter](https://subvisual.co/newsletter/), where other Ruby Bits and
more great articles are shared every week.

