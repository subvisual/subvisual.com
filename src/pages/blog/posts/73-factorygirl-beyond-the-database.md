---
id: 73
path: /posts/73-factorygirl-beyond-the-database/
title: "FactoryGirl Beyond the Database"
author: miguel-palhas
date: 2016-03-03
tags:
  - development
intro: "I've been experimenting with [`factory_girl`](https://github.com/thoughtbot/factory_girl) lately, particularly to deal with test data that's not necessarily tied to the database. Did you know you can use it to instantiate any Ruby object, and not only `ActiveRecord` models?"
---

I've been experimenting with [`factory_girl`](https://github.com/thoughtbot/factory_girl) lately, particularly to deal with test data that's not necessarily tied to the database. Did you know you can use it to instantiate any Ruby object, and not only `ActiveRecord` models?

This was already covered by the gem's creators [a few years ago](https://robots.thoughtbot.com/mind-bending-factories). But doing a quick search on [WhoUsesThisGem](http://whousesthisgem.com/gems/factory_girl), and skimming through the factories of some of the major projects tells that either this is not a well-known feature, or maybe it's just not that useful. My money goes on the former.

### Why?

Working with external services and APIs I often find the need to mock their responses on my tests. There is one particular case where I'm using the Slack API to authenticate teams and interact with them.

The authentication step uses Slack's OAuth flow. To test it, I need to be able to mock the OAuth response, which usually consists of a hash containing some information about the team that just signed in. Here is a sample of it:

```ruby
{
  "uid" => "AN ID",
  "info" => {
    "name" => "Miguel Palhas",
    "email" => "miguel@subvisual.co",
    ...
  },
  "extra" => {
    ...
  }
    "credentials" => {
    "token" => "A SECRET TOKEN",
    "expires" => false
  }
}
```

The common way to mock this response is described [here](https://github.com/intridea/omniauth/wiki/Integration-Testing), but in short, it consists of the following:

```ruby
OmniAuth.config.test_mode = true
OmniAuth.config.mock_auth[:twitter] = OmniAuth::AuthHash.new({
  "uid" => "AN ID",
  "info" => {
    "name" => "Miguel Palhas",
    "email" => "miguel@subvisual.co",
    ...
  },
  ...
})
```

This works for most applications, but I want to easily create multiple unique hashes (e.g.: I should be able to test that two teams can authenticate independently, and for that I need two different OAuth hashes).

### How?

It would be great to use a factory to generate the same kind of object. Let's see how that can be achieved:

```ruby
## spec/factories/omniauth.rb

FactoryGirl.define do
factory :slack_auth_hash, class: OmniAuth::AuthHash do
  skip_create
```

I'm using the `class` argument to configure this factory to instantiate OmniAuth hashes. Any Ruby class can be used here.
`skip_create` is a flag that instructs the factory not to call `save!` on the new instance, which is the default behaviour, and is what persists the records when we're dealing with `ActiveRecord` objects. In this case, I only want to create an object in memory, so I disable that behaviour.

```ruby
  transient do
    sequence(:uid)
    provider "slack"
    token "MyToken"
  end
```

I define a few attributes for my factory. I don't want to have these attributes directly assigned to my instance (that wouldn't even work), so I wrap them in an `transient` block, which makes them be defined and evaluated in my factory, but only for internal use, as we'll see below.

```ruby
  initialize_with do
    OmniAuth::AuthHash.new({
      provider: provider,
      uid: uid,
      credentials: {
        token: token
      }
    })
  end
end
```

The `initialize_with` block lets me change how the instance is created. The default is to call `OmniAuth::Hash.new` because that's the class I specified, but I want to assign some attributes myself, using the schema that I expect OAuth to give me.

With all of this in place, I can create as many hashes as I want with the usual calls to factory girl:

```
hash1 = FactoryGirl.create(:slack_auth_hash)
hash1.uid
##=> 1

hash2 = FactoryGirl.create(:slack_auth_hash)
hash2.uid
##=> 2
```

Because I used a sequence for the `uid` attribute, I easily get a different one for each hash that I create. This is necessary for my tests, as it allows me to create multiple teams in the same spec, and each of them will be unique.

I can also use traits to provide variations of this hash. For example, to test how my app deals with invalid OAuth hashes:

```ruby
trait :invalid do
  initialize_with do
    FactoryGirl.
      build(:slack_auth_token).
      except(:credentials)
  end
end
```

My app requires the token to exist in the OAuth response. So I can define an invalid hash as being the same as the original with, but without the credentials section, which contains the token.
I can then use this factory to check that my app detects the error, and does not authenticate the user.

Here's the full factory we built:

```ruby
## spec/factories/omniauth.rb

FactoryGirl.define do
factory :slack_auth_hash, class: OmniAuth::AuthHash do
  skip_create

  transient do
    sequence(:uid)
    provider "slack"
    token "MyToken"
  end

  initialize_with do
    OmniAuth::AuthHash.new({
      provider: provider,
      uid: uid,
      credentials: {
        token: token
      }
    })
  end

  trait :invalid do
    initialize_with do
      FactoryGirl.
        build(:slack_auth_token).
        except(:credentials)
    end
  end
end
```


There are many more use cases for this feature, and some great ones were already covered in [thoughbot's post](https://robots.thoughtbot.com/mind-bending-factories), so be sure to check that out if you're interested.
