---
id: 20
path: /posts/20-clean-architecture/
title: "Clean Architecture"
author: luis-zamith
date: 2013-12-27
tags:
  - development
intro: "One of the hottest topics of the moment in the rails community is application design or architecture. There is an obsession (a good one, I think) with clean, decoupled code, that is easy to maintain and extend. This has led to things such as presenters, service objects, to some extent even rails concerns."
---

One of the hottest topics of the moment in the rails community is application design or architecture. There is an obsession (a good one, I think) with clean, decoupled code, that is easy to maintain and extend. This has led to things such as presenters, service objects, to some extent even rails concerns.

This is all fine and dandy, but I believe that in order to get closer to that utopic dream of the perfect system, more drastic and profound changes must happen. We need an architectural change, that shakes the foundations how we approach the writing and thought process of a rails application. To this, Uncle Bob has called the **Clean Architecture**.

The main igniters of this idea and therefore this article are a [talk](https://www.youtube.com/watch?v=WpkDN78P884) and an [article](https://blog.8thlight.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Uncle Bob Martin, but a lot has been written and spoken on the subject by a lot of different people and you can find the links I find more relevant on the bottom. They provide a good (mostly) theoretical overview of the problem and solutions, whereas this post aims at proving a very concrete solution with code samples in Ruby and Ruby on Rails, which is something I could not find anywhere.

## The Basics
For those of you who don't have the time to read the links, just want to brush off on some of the basic concepts or for the sake of us being able to communicate in the same vocabulary, let's go ahead and define those concepts.

First off here's a high level view of the clean architecture according to Uncle Bob:

![clean arch](https://blog.subvisual.co/uploads/post_image/image/32/CleanArchitecture.jpg)

As you can see there are different layers in the application, going inside out, the first two are the core of the app, where all the business rules and objects live. The other two are the "details", the delivery mechanisms (in our case it will be Ruby on Rails), the databases (in our case postgresql), etc...

#### Entities

Entities are business objects, functions or data structures, that are responsible for all the **non** application specific business rules.

This means that if you have multiple applications that share the same domain (business) objects, the entities should not need to change in order to be usable by all of them.

#### Interactors or Use Cases

Interactors represent the layer for application specific business rules.

This is where most of the magic happens, they control the entire flow of the application, using entities, but never changing them.

They should not, however, be affected by changes to the UI, whichever they may be.

#### Boundaries or Adapters

A boundary is the interface that translates information from the outside into the format the application uses, as well as translating it back when the information is going out.

These boundaries may not be explicit, so much as they are logical or conceptual. In any case, they are there and you should be aware of it.

#### The Dependency Rule

This is the single most important concept, and you must  always take it into consideration.

The dependency rule states that *source code dependencies can only point inward*.

There's a generalization of the rule that applies to any application, *source code dependencies can only point in one direction*.

## Applying it to the Real World™

By now you should at least know why such an architecture is important, and the main characters that come into play.

But, as I've said before, applying all of this into a real case scenario is what you probably don't know and/or are curious about.

#### Our approach

We have to start somewhere, and we want to start on the right path, the best way I know how to do that is through a use-case & test driven approach.

I like this approach for two reasons:

1. We need tests to guide us and to provide confidence in the code base
2. Use-cases don’t let us stray from what brings value to the business

I'm not going to digress a lot into why TDD is awesome and you should do it, since there are a lot of resources out there on the subject. I will say that we'll mostly be following [Ian Cooper's ideas on testing](https://vimeo.com/68375232), for which the gist is *the trigger for a new test should be a new use case, not a new class or method*.

As for use cases, you can read [Alistair Cockburn's lovely book](https://www.amazon.com/Writing-Effective-Cases-Alistair-Cockburn/dp/0201702258) on the subject. But they should look something like this:

![use case](https://blog.subvisual.co/uploads/post_image/image/15/use-case.png)

Notice that we have a main path and an alternative, which can also represent what to do in case of error. Also, there is no reference to anything related to the web, the use case level should be delivery mechanism agnostic. In other words, it must work the same way regardless of being used on the web, desktop or CLI.

#### The test

``` ruby
context "the company does not exist" do
  it "creates a member" do
    ...
    adder = Coworkers::CoworkerAdder.new 
      params: params, 
      space: default_space

    expect {
      adder.add
    }.to change{member_repo.all.size}.by(1)
  end
end
```

Now we have a test for the behaviour we expect, we just need to let it guide us.

*Side note: This test was not written all at once, I followed the [three rules of TDD](https://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd) to get here.*

#### The interactor

The code to make this test pass (minus the private methods) is as follows:

``` ruby
class CoworkerAdder
  def initialize(params: nil, space: nil)
    @member_repo = Repository.for(:member)
    @company_repo = Repository.for(:company)
    @params = params
    @space = space
    @member = Member.new member_params
  end

  def add
    if member.valid?
      member.company_id = company.id
      member.space_id = space.id
      member_repo.save(member).value
    end
  end
...
```

## The Interactor - step by step

There are a lot of interesting bits of code in our interactor, and a lot of decisions that were made. Let's take a closer look at each of them.

### Repositories (Gateways)

In order to abstract the persistence mechanism I decided to use the [Repository Pattern](https://msdn.microsoft.com/en-us/library/ff649690.aspx), in which we have repositories for each type of persistence mechanism we want to use and that can be used interchangeably.

Sounds a lot like an interface? Well, it is, kind of... In Ruby we don't have interfaces, we just go ahead an use what we call a duck type.

Here's an example of an in memory repository:

``` ruby
module Repositories
  module Members
    class Memory
      def initialize
        @members = {}
        @next_id = 1
      end

      def save(member)
        member.id = @next_id
        @members[@next_id] = member
        @next_id += 1
        member
      end

      def all
        members
      end

      def first
        first_key = members.keys.sort.first
        members[first_key]
      end

      def last
        last_key = members.keys.sort.last
        members[last_key]
      end

      private
      attr_reader :members
    end
  end
end
```

What's really relevant here is the object's public API, it's interface, the `save(member)`, `all`, `first` and `last` methods, since they're what defines a valid repository for a member.

#### The Repo Boss

Someone, somewhere needs to know which repository to use for each entity or use case (repositories do not need to exists in a 1-1 relation with entities, even though most of the time they do). That someone is a very simple class I call `Repository`, which tracks the registration of repositories:

``` ruby
class Repository
  def self.register(type, repo)
    repositories[type] = repo
  end

  def self.for(type)
    repositories[type]
  end

  def self.repositories
    @_repos ||= {}
  end
end
```

As you might have guessed, we then need to register the repositories we want. That is very simple and very easy to hide behind some sort of configuration, but here's how it's done:

``` ruby
require 'repository'
require 'repositories/members/memory'
require 'repositories/companies/memory'

Repository.register :company, Repositories::Companies::Memory.new

Repository.register :member, Repositories::Members::Memory.new
```

After all this setup is complete, you can access repositories the way it is shown in lines 3 and 4 of the interactor.

### Member Entity

Entities should have a bunch of attributes and some methods that operate on them, that enforce non app specific business rules.

A simple approach to it could be this:

``` ruby
class Member
  attr_accessor :id, :company_id, :name, :email, 
                :phone_no, :boss, :observations,
                :space_id, :created_at, :updated_at

  def initialize(attrs = {})
    attrs.each do |attr_name, attr_value|
      public_send("#{attr_name}=", attr_value)
    end
  end
...
```

There might be ways of doing this that are more elegant or clever, you could, for instance, extract common attributes such as `id`, `created_at` and `updated_at` (or you could not even store them here, if you feel they are to "railsy"). For now this approach will suffice, though.

### Validations

On line 10 of the interactor you can see the method `valid?` being called on the member entity. The easiest way I could think of to implement validations was this:

```ruby
def valid?
  name && email
end

def errors
  error_messages = []
  error_messages << "missing name" unless name
  error_messages << "missing email" unless email
  ValidationErrors.new(error_messages)
end
```

That needs a tiny wrapper to be rails compliant, to which I called `ValidationErrors`.

``` ruby
class ValidationErrors
  def initialize(error_messages = [])
    @error_messages = error_messages
  end

  def full_messages
    @error_messages
  end

  def size
    @error_messages.size
  end
end
```

If you have no problems with including `ActiveModel`, you can add it as a gem and do simply this:

``` ruby
class Member
  include ActiveModel::Validations
  
  validates_presence_of :name, :email
end
```

As with any good engineering problem, there is no correct answer. There are trade offs in both solutions, one may take longer to implement, but is small, the other has everything you need and probably a bunch of other stuff as well. Pick your poison.

#### Database dependent validations

What about validations that depend on the database, such as validating uniqueness, you might ask. The easier way would be to add that validation on the repository, but that would spread business rules for an entity across multiple files and we don't want that. 

The solution we came up with is to have a generic `unique?` method on the repository and calling in from the entity:

``` ruby
def valid?
  super &&
  repo.unique?(self, :name)
end
```

The implementation of the `unique?` method for the in memory repository is as follows:

```ruby
def unique?(object, attr_name)
  @members.values.none? do |member|
    object.id != member.id && 
      member.public_send(attr_name) == object.public_send(attr_name)
  end
end
```

### Crossing Boundaries

A very important part of this whole architecture is crossing layer boundaries, especially the boundary that separates the application from the delivery mechanism. You want to make sure not to pass entities around, since they come with a bunch of business rules attached, instead you should pass value objects, or plain data structures. 

I prefer to pass data structures, but have the serialization from entity to data abstracted on a method called `value`, which allows for the interactor to do what it is doing on line 14:

``` ruby
member_repo.save(member).value
```

What does that `value` do, you might ask. It simply calls a serializer.

### Serializers

The value of an entity can be defined as follows:

``` ruby
def value
  Serializers::Raw.new(self).serialize
end
```

It takes an object (in this case an entity), and serializes it's attributes, which, by default, it assumes come from an `attributes` method. The `serialize` method can handle both an hash with all the attributes, in which case it just returns it, or an array with just their names, from where it can create the hash with the names pointing to the values.

``` ruby
def serialize(attrs_method: :attributes)
  attributes = object.public_send(attrs_method)
  get_real_attributes_from attributes
end
```

### ActiveRecord Repository

We've already talked about repositories and that they are duck types for a gateway's logical interface, you even saw an implementation in memory. But since a very common pattern is to use Rails with ActiveRecord, I feel like I should show how an AR implementation looks like.

``` ruby
require 'active_record'

module Repositories
  module Members
    class ActiveRecord
      ...

      def last
        ::Member.new(Member.last.value)
      end

      class Member < ::ActiveRecord::Base
        def value
          Serializers::Raw.new(self).serialize
        end
      end
    end
  end
end
```
There are a few things of note here. One of the most obvious is that we define the "model", i.e. the class that inherits from AR::Base, as an inner class of the repository. We do this because we don't (and shouldn't) need to use it anywhere else, in fact, all references to AR should be encapsulated by the AR repository.

This leads us to the next thing of note, the fact that we do not return nor an AR object, nor an AR relation. The interactor (which will be calling this) only knows how to deal with entities, so we get the value from the AR object, using a serializer, and wrap it in an entity. All references to AR are gone.

## Connecting with Rails

Now we have a working application (hopefully), we just need a way to deliver it to our clients. We can do that using a CLI, web app, desktop app, REST API, or any other way we so choose. As an example I chose to deliver it as a Rails app.

There are basically two steps in making this work with a Rails app:

1. Deploy our core application as a gem
2. Require, configure and use it from the rails app

### The gem

I'll not get into details on how to create gem, as that goes way beyond the scope of this article which is already extensive, there are just a few "tips" to make it easier to use.

A good way to make your gem painless to use is to autoload most of the stuff when it is required. So your main file should look somewhat like this:

``` ruby
require "cohive/core/version"


autoload :Repository, "repository"

module Coworkers
  autoload :Company, "cohive/core/coworkers/entities/company"
  autoload :Member, "cohive/core/coworkers/entities/member"

  autoload :CoworkerAdder, 
    "cohive/core/coworkers/interactors/coworker_adder"
end

module Serializers
  autoload :Raw, "serializers/raw"
end
```

Another must have for a gem is to be configurable, I do it like this:

``` ruby
module Cohive
  module Core
    def self.configure
      @repository_config = RepositoryConfig.new
      yield self
      post_config
    end

    def self.repository=(repo_type)
      @repository_config.default_repo_type = repo_type
    end

    def self.repository
      @repository_config
    end

    def self.post_config
      @repository_config.load_repos
    end
  end
end
```

With this configuration options I allow the delivery mechanism to choose which repository to use for each of the repositories that are available.

### The Rails app

Using the gem in the Rails app is even simpler, you just include it on the Gemfile:

```ruby
gem 'cohive-core', path: "../cohive-core", require: false
```

Require and configure it:

```ruby
require 'cohive/core'
Cohive::Core.configure do |config|
  config.repository = :active_record
end
```

And finally, use it:

```ruby
def create
  adder = Coworkers::CoworkerAdder.new params: member_params, 
                                       space: current_space
  if adder.add
    flash[:notice] = t('coworkers.member.flash.added_success')
  ...
end
```

As simple as that.

## Conclusion

I truly believe this is a great way to build applications, and even though some of my solutions might have room for improvement, the overall architecture and underlying ideas are very mature and should definitely be taken into consideration.

Here's a recap of the main ideas covered in this article:

* The application should not depend on the delivery mechanism or database, those are details
* The application's functionality should be driven by use cases
* The application's design should be driven by tests

Everything that follows is a consequence of this.

A nice side effect of using this architecture is that there is no need to load entire frameworks such as rails, or using a real database to run your unit tests (you might want to do integration and system tests, but that's for another day) which means they are fast.

Here's the tests for the service that does the same as the interactor, but from the rails app:

![rails tests](https://blog.subvisual.co/uploads/post_image/image/13/rails-tests.png)

Notice that it takes 3.96s to run the tests. Now for the interactor with the clean architecture:

![clean tests](https://blog.subvisual.co/uploads/post_image/image/14/clean-tests.png)

Notice that I've added more tests and yet it takes only 0.54s to run them all. It's an 86.4% improvement in testing time! When doing TDD you should be running your test every 30s or so, that's a gain of approximately 54 minutes per work day.

### Relevant Links

* [Architecture, Use Cases and High Level Design](https://cleancoders.com/codecast/clean-code-episode-7/show) by Uncle Bob Martin
* [Boudaries](https://www.youtube.com/watch?v=yTkzNHF6rMs) by Gary Bernhardt
* [Clean Coders Discussion Board](https://groups.google.com/forum/#!forum/clean-code-discussion)
* [Ports and Adapters](https://alistair.cockburn.us/Hexagonal+architecture) by Alistair Cockburn
* [Hexagonal Architecture for Rails Developers](https://victorsavkin.com/post/42542190528/hexagonal-architecture-for-rails-developers) by Victor Savkin
* [Hexagonal Rails](https://www.youtube.com/watch?v=CGN4RFkhH2M) by Matt Wynne 

