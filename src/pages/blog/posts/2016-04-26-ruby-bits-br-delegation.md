---
id: 80
path: /posts/80-ruby-bits-br-delegation/
title: "Ruby Bits:  Delegation"
author: luis-zamith
date: 2016-04-26
cover: https://subvisual.s3.amazonaws.com/blog/hero/146/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/146/image@2x.jpg
tags:
  - development
intro: "If you've been writing Object Oriented code for a while (or any code really),"
---

If you've been writing Object Oriented code for a while (or any code really),
you're probably familiar with expressions such as DRY, the Law of Demeter or
Composition over Inheritance. One thing they all have in common is that the can
be followed by using delegation (among other solutions).

So, what is delegation? Well, it's as simple as this, imagine you have three
classes, `A`, `B` and `C`, if `A` calls a method on `B` and the only thing `B`
does is call the same (or similar) method on `C`, then `B` is delegating to `C`.

We're going to cover the four most used ways of delegating in Ruby.

### 1. Plain old method

The simplest or at least more straight forward way of delegating a method in
Ruby, is for the intermediate class to create a regular method just for that.

Here's an example:

```ruby
class A
  def initialize
    @b = B.new
  end

  def start
    @b.some_method
  end
end

class B
  def initialize
    @c = C.new
  end

  def some_method
    @c.some_method
  end
end

class C
  def some_method
    # the method that gets called
  end
end

A.new.start
```

### 2. `SimpleDelegator`

Since doing this, especially when delegating multiple methods, is repetitive and
adds a lot of uninteresting code to your classes, there are alternatives built
into the language. One that is very simple to use, hence the name, is
`SimpleDelegator`, however it has some drawback, as we'll see.

`SimpleDelegator` is used via inheritance, in which the intermediate class
inherits from it. Let's see how that looks like in our example:

```ruby
class A
  def initialize
    @b = B.new(C.new)
  end

  def start
    @b.some_method
  end
end

class B < SimpleDelegator
end

class C
  def some_method
    # the method that gets called
  end
end

A.new.start
```

We've made two changes, the first one was removing all the code from the `B`
class and making it inherit from `SimpleDelegator`. Because of that we were able
to initialize `B` and pass in an instance of `C`. From there, any method we call
on `B` will be called on it if it is defined, or will be delegated to `C`.

There lies one of the problems with `SimpleDelegator`, by default it delegates
everything, which might not be what you want.

With our refactor we made `A` be aware of `C`, we don't want that. We can fix
that by moving that knowledge to the outer scope, or back into `B`'s
initializer.

Moving to the outer scope would look like this:

```ruby
class A
  def initialize(b)
    @b = b
  end
  ...
end

...

b = B.new(C.new)
A.new(b).start
```

Moving it back into the initializer takes advantage of a `SimpleDelegator`
method, called `__setobj__` that takes an argument and uses that object as the
object to whom the methods are delegated.

```ruby
class A
  def initialize
    @b = B.new
  end
  ...
end

class B < SimpleDelegator
  def initialize
    __setobj__(C.new)
    # or super(C.new)
  end
end

...
```

If for some reason you need access the instance of `C` from within `B`, you can
use `__setobj__`'s counterpart, `__getobj__`.

#### Decorators

A very good use case for `SimpleDelegator` in the Real World™ is to implement
the [Decorator Pattern](https://en.wikipedia.org/wiki/Decorator_pattern). For
example, if you have a base `User` class and want to add to it some subscription
functionality, without actually adding it to all instances of the `User`, you
could do something like this:

```ruby
class User
  # user stuff
end

class UserWithSubscription < SimpleDelegator
  # code that assumes a user has a subscription
end

## when you need to do some subscription
## related things to a user
user = UserWithSubscription.new(@user)
```

To all intents and purposes, `UserWithSubscription` behaves just like an `User`
but with some extra functionality. Because of how `SimpleDelegator` works, it is
a superset of `User`.

### 3. `DelegateClass`

`DelegateClass` is more focused version of `SimpleDelegator`. Everything is the
same except that you have to define upfront what is the class of the object to
whom you'll be delegating. The benefit you reap from this is that it is more
performant.

Our example would look very similar:

```ruby
class A
  def initialize
    @b = B.new
  end

  def start
    @b.some_method
  end
end

class C
  def some_method
    # the method that gets called
  end
end

class B < DelegateClass(C)
  def initialize
    __setobj__(C.new)
  end
end

A.new.start
```

The main difference here is that the `C` class needs to exist when `B` is
defined, so that we can use it in the signature.

### 4. `Forwardable`

Both `SimpleDelegator` and `DelegateClass` share the problem of delegating
everything. If you wish to only delegate one or two methods, you're probably
better off using `Forwardable`. It is a `Module` you can `extend`, in order to
get some delegation functionality.

Let's go back to our example but delegate only `some_method` using
`Forwardable`.

```ruby
require "forwardable"

class A
  def initialize
    @b = B.new
  end

  def start
    @b.some_method
  end
end

class B
  extend Forwardable
  def_delegator :@c, :some_method

  def initialize
    @c = C.new
  end
end

class C
  def some_method
    # the method that gets called
  end
end

A.new.start
```

Notice that in order to use `Forwardable` we need to require it, it does not
come auto loaded. Then, we use the `def_delegator` class level method that takes
a symbol with object to whom we want to delegate. It can either be a method, or
an instance variable (as we've done here).

In order to define multiple delegator methods at once there is also the
`def_delegators` method.

### Appendix: Rails' `delegate`

`Forwardable` works just fine, but it's API is kind of strange, in my opinion.
Especially because you possibly have to change the method you call when going
from one delegated method to two.

Rails, more precisely `ActiveSupport`, has it's own method for delegation for
pretty much the reasons I mention above. In the [original commit](https://github.com/rails/rails/commit/2ee6229bd8cf3a87ede0cd8b573e3faf5a15dbfa)
DHH claims that it is because `Forwardable` does not support multiple delegations
at once, which looking at the [source code from 2001](https://github.com/ruby/ruby/commit/32d17e265c84973516d1717868806b324ba3052a)
(way before Rails existed) does not look like it is true, but again, the API for
`Forwardable` is not great now, and was not great then.

That being say, here's the last example written in `ActiveSupport` style.

```ruby
require "active_support/core_ext/module/delegation"

class A
  def initialize
    @b = B.new
  end

  def start
    @b.some_method
  end
end

class B
  delegate :some_method, to: :@c

  def initialize
    @c = C.new
  end
end

class C
  def some_method
    # the method that gets called
  end
end

A.new.start
```

I think this looks nicer and easier to read, however, most of the times it's not
worth having `ActiveSupport` in you project just for this. If you're on a Rails
project or a project that has `ActiveSupport` already, then by all means use it.

### More Ruby Bits

If you've enjoyed this Ruby Bit you should really subscribe to [our
newsletter](https://subvisual.co/newsletter/), where other Ruby Bits and more
great articles are shared every week.

If you want to meet us and/or see some talks on Ruby topics, come join us at
[RubyConf Portugal 2016](http://rubyconf.pt/). For making all the way to the end
of this article you get [25% off the price on the ticket](https://ti.to/subvisual/rubyconfpt-2016/discount/good-reader-delegations).
