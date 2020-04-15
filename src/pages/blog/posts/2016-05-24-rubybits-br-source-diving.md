---
id: 85
path: /posts/85-rubybits-br-source-diving/
title: "RubyBits:  Source Diving"
author: luis-zamith
date: 2016-05-24
cover: https://subvisual.s3.amazonaws.com/blog/hero/151/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/151/image@2x.jpg
tags:
  - development
intro: "Debugging is something that (un)fortunately we as developers are all used to"
---

Debugging is something that (un)fortunately we as developers are all used to
doing, but depending on the language, the techniques and tools might differ, if
ever so slightly.

Ruby being a language that relies heavily on methods without namespacing (i.e.
you call a method the same way regardless of it being defined in the same class,
in a parent class, in an included module, a global method), it is at times hard
to know where a method you're using is defined. There are other issues inherent
to this behaviour, but that's a whole other story.

### The `method` method

As a stepping stone to helping us with solving this issue, let's look at the
`method` method, which creates an instance of `Method` with the method you want.
I said method way to many times on that sentence, so here's an example to help
consolidate the idea:

```ruby
str = "I am a String"
str_size = str.method(:size)
str_size.class # => Method
str_size.call # => 13
```

Hopefully it is now clearer that `method` gets us a `Proc` like object that we
can call later. As an apart, this can be useful (albeit not the most performant
solution) when paired with symbol to proc.

```ruby
def double(num)
  num * 2
end

[1, 2].map(&method(:double)) # => [2, 4]
```

Without the call to `method` this would try to call `double` on the
instance of `Fixnum`. This is way we don't have to write the full block nor
resort to monkey patching.

In some situation we might be able to call methods that could only be called
from a block otherwise. Like `Math.sqrt`.

```ruby
[4, 9, 16].map(&Math.method(:sqrt)) 
## => [2.0, 3.0, 4.0]
```

### Diving into the source

Now that we know about the `Method` class, it's time to find out about a very
useful method on it, called `source_location`. As the name suggest it tells us
the file and line where a certain method is defined (except for native method,
for which we get `nil`).

Since Rails methods are not native, it is a good example of a gem where can use
this technique.

```ruby
p method(:has_many).source_location
## => ["/[RETRACTED]/activerecord-4.2.5/lib/active_record/associations.rb", 1258]
```

The `Method` class has some other useful method to introspect on methods, such
as `super_method`, `owner` or `original_name`, check it out.

### Other techniques

Hopefully this was useful, and can be helpful when you're really confused as to
where a method is really defined, but as a first pass you can use `ctags` to
solve the same issue (with the difference that `ctags` cannot know for sure
which method is actually being called, if it is a common name, or is overridden
a lot). There is a [RubyBit about `ctags`](https://subvisual.co/blog/posts/75-ruby-bits-bundle-open)
if you're interested.

### More Ruby Bits

If you've enjoyed this Ruby Bit you should really subscribe to [our
newsletter](https://subvisual.co/newsletter/), where other Ruby Bits and more
great articles are shared every week.

If you want to meet us and/or see some talks on Ruby topics, come join us at
[RubyConf Portugal 2016](http://rubyconf.pt/). For making all the way to the end
of this article you get [25% off the price of the
ticket](https://ti.to/subvisual/rubyconfpt-2016/discount/good-reader-method).
