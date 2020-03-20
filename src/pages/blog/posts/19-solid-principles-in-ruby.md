---
id: 19
path: /posts/19-solid-principles-in-ruby/
title: "SOLID Principles in Ruby"
author: luis-zamith
date: 2013-11-29
tags:
  - development
intro: "If you've been in the development business for a while, especially if working with OO languages, you've probably heard of design principles. It's kind of hard to keep track of them all, and sometimes it is even [impossible to follow them all](https://www.destroyallsoftware.com/screencasts/catalog/conflicting-principles). That's why, as with many things in the software area, you should use these principles as guidelines, not rules."
---

If you've been in the development business for a while, especially if working with OO languages, you've probably heard of design principles. It's kind of hard to keep track of them all, and sometimes it is even [impossible to follow them all](https://www.destroyallsoftware.com/screencasts/catalog/conflicting-principles). That's why, as with many things in the software area, you should use these principles as guidelines, not rules.

One the most well known sets of OO design principles is known by an acronym, SOLID. It stands for:

* [Single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) (SRP)
* [Open/closed principle](https://en.wikipedia.org/wiki/Open/closed_principle) (OCP)
* [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle) (LSP)
* [Interface segregation principle](https://en.wikipedia.org/wiki/Interface_segregation_principle) (ISP)
* [Dependency inversion principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle) (DIP)


Let's take a look at each of them individually, and how you can use them to increase your Ruby code's quality.

## Single responsibility principle

Probably the most well known principle, and one that you should try to adhere to most of the time.

Let's say you have this code:

``` ruby
class AuthenticatesUser
  def authenticate(email, password)
    if matches?(email, password)
     do_some_authentication
    else
      raise NotAllowedError
    end
  end

  private
  def matches?(email, password)
    user = find_from_db(:user, email)
    user.encrypted_password == encrypt(password)
  end
end
```

The `AuthenticatesUser` class is responsible for authenticating the user as well as knowing if the email and password match the ones in the database. It has two responsibilities, and according to the principle it should only have one. Let's extract one:

```ruby
class AuthenticatesUser
  def authenticate(email, password)
    if MatchesPasswords.new(email, password).matches?
     do_some_authentication
    else
      raise NotAllowedError
    end
  end
end

class MatchesPasswords
  def initialize(email, password)
     @email = email
     @password = password
  end

  def matches?
     user = find_from_db(:user, @email)
    user.encrypted_password == encrypt(@password)
  end
end
```

I've used a refactoring technique called [Extract Class](https://sourcemaking.com/refactoring/extract-class) and then used it on the original class I already had. This is called sharing behaviour through [composition](https://en.wikipedia.org/wiki/Composition_over_inheritance).

## Open/closed principle

Let's see another example:

```ruby
class Report
  def body
     generate_reporty_stuff
  end

  def print
     body.to_json
  end
end
```

This code violates OCP, because if we want to change the format the report gets printed, you need to change the code of the class. Let's change it then.

```ruby
class Report
  def body
     generate_reporty_stuff
  end

  def print(formatter: JSONFormatter.new)
     formatter.format body
  end
end
```

This way changing the formatter is as easy as:

```ruby
report = Report.new
report.print(formatter: XMLFormatter.new)
```

Thus I have extended the functionality without modifying the code. In this example, I have used a technique called [Dependency Injection](https://blog.groupbuddies.com/posts/16-dependency-injection), but many others could apply.

## Liskov substitution principle

This principle applies only to inheritance, so let's look at an example of inheritance that breaks it:

``` ruby
class Animal
  def walk
     do_some_walkin
  end
end

class Cat < Animal
  def run
    run_like_a_cat
  end
end
```

In order to comply with the LSP, as Bob Martin puts it:

> Subtypes must be substitutable for their base types

So, they must have the same interface. Since Ruby does not have abstract methods, we can do it like so:

``` ruby
class Animal
  def walk
     do_some_walkin
  end

  def run
    raise NotImplementedError
  end
end

class Cat < Animal
  def run
    run_like_a_cat
  end
end
```

## Interface segregation principle

Simply put, this principle states that:

> when a client depends upon a class that contains interfaces that the client does not use, but that other clients do use, then that client will be affected by the changes that those other clients force upon the class

This one is simpler to demonstrate, if you have a class that has two clients (objects using it):

``` ruby
class Car
  def open
  end

  def start_engine
  end

   def change_engine
   end
end

class Driver
  def drive
    @car.open
    @car.start_engine
  end
end

class Mechanic
  def do_stuff
    @car.change_engine
  end
end
```

As you can see, our `Car` class has an interface that's used partially by both the `Driver` and the `Mechanic`. We can improve our interface like so:

```ruby
class Car
  def open
  end

  def start_engine
  end
end

class CarInternals
   def change_engine
   end
end

class Driver
  def drive
    @car.open
    @car.start_engine
  end
end

class Mechanic
  def do_stuff
    @car_internals.change_engine
  end
end
```

By splitting the interface into two, we can comply to the ISP.

## Dependency inversion principle

Directly from the Wikipedia page:
> Abstractions should not depend upon details. Details should depend upon abstractions.

Let's go back to the first example on the OCP and change it a bit:

```ruby
class Report
  def body
     generate_reporty_stuff
  end

  def print
     JSONFormatter.new.format(body)
  end
end

class JSONFormatter
  def format(body)
     ...
  end
end
```

Now there is a formatter class, but I've hardcoded it on the `Report` class, thus creating a dependency from the `Report` to the `JSONFormatter`. Since the `Report` is a more abstract (high-level) concept than the `JSONFormatter`, we're effectively breaking the DIP.

We can solve it the exact same way we solved it on the OCP problem, with dependency injection:

```ruby
class Report
  def body
     generate_reporty_stuff
  end

  def print(formatter: JSONFormatter.new)
     formatter.format body
  end
end
```

This way the `Report` does not depend on the `JSONFormatter` and can use any type of formatter that has a method called `format` (this is known as [duck typing](https://en.wikipedia.org/wiki/Duck_typing)).

Another thing of note is that we've used, once again, dependency injection to solve a problem. This technique is a very powerful one when our goal is decoupling objects, and even though it has the same initials as the dependency inversion principle (vs dependency injection pattern), they are completely different concepts.

## Conclusion

I've covered (slightly touched) five principles that when followed will almost surely improve the quality of your code. There are many others though, and sometimes it makes more sense to break a principle than to follow it. The most important thing is to know as much as you can about them, so you can make informed decisions.




