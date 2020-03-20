---
id: 102
path: /posts/102-the-pain-of-testing-with-3rd-party-integrations/
title: "The pain of testing with 3rd party integrations"
author: miguel-palhas
date: 2017-03-07
tags:
  - development
  - rspec
  - ruby
intro: "Whenever a web app has integrations with external APIs (which, let's face, happens most of the time nowadays), there's usually an increased complexity about it when it comes to testing."
---

Whenever a web app has integrations with external APIs (which, let's face, happens most of the time nowadays), there's usually an increased complexity about it when it comes to testing.

You don't want your tests to actually communicate with those APIs. That should be common knowledge by now.
There are also quite a few suggestions on how to deal with this (for example, [from thoughtbot]). This post is meant to suggest a couple more of those.

## VCR

The [VCR] gem, or any other similar tool should be your number one preference when it comes to stubbing out API requests from your tests, because it works behind the scenes, logging all requests done by your tests, and reproducing their responses on later runs. No changes to your app's code are needed.

The same cannot be said for these next suggestions, which add some complexity to your code. That's why I tend to use them only when I have a good reason to do so.

## Adapter pattern

Imagine you're adding a payment system in your app, relying on a 3rd party service such as [Stripe]. You probably don't want your tests to use these APIs. But if you have a staging server that you use to manually test your app, you probably don't want your payments to run in there either. So it would be useful to easily swap between an implementation with real payments, and a fake one. That's where the [Adapter Pattern] can come in handy:

```ruby
class Bank
  mattr_accessor :adapter
  self.adapter = Bank::SomeRealBankAdapter

  def initialize(**args)
    @adapter_instance = adapter.new(**args)
  end

  attr_accessor :adapter_instance
  delegate :make_transfer, to: :adapter_instance
end

class Bank::TestAdapter
  # …
end

class Bank::SomeRealBankAdapter
  # …
end
```

In this example, we define a `Bank` to handle our payments.
The class itself doesn't have any business logic, but instead just delegates its entire API to an adapter (which in this case, is just a `make_transfer` method)

By default, that is `Bank::SomeRealBankAdapter`, but we can easily change that only for the environments we want:

```ruby
## config/initializers/bank.rb
if Rails.env.test? || Rails.env.staging?
  Bank.adapter = Bank::TestAdapter
end
```

On the bright side, we now have a single solution that eliminates payment requests from both our test suite and our staging server.
However, you now have two different classes that you need to maintain, and ensure that they work with the API provided by the top `Bank` class.

*PS:* Faking your payments in your staging server is actually not such a great idea, so tread lightly! You'll be taking a risk, and ending up not running the actual payment logic until you hit production.
This is the reason payment services like [Stripe] and [Uphold] provide a Test mode that you can use without the fear of wasting real money.


## Stubbing class instantiation

Sometimes you might not have full control over the code that's being used, or you might need to register the sent requests (but not actually send them) to perform assertions based on them.

My latest use case for this was for a Slack bot. I was using `[slack-ruby-client]` to send messages to Slack teams.

I didn't want the gem to perform actual requests. That would end up failing, since the required authentication didn't exist in the test environment.

Additionally, I wanted to later assert that those messages were actually sent, with the correct content. So I would need to store them somehow. Here's what I ended up with:

```ruby
RSpec.configure do |config|
  config.before(:each, :fake_slack_client) do
    allow(Slack::Web::Client).to receive(:new) do |*args|
      FakeSlackClient.new
    end
  end
end

class FakeSlackClient < Slack::Web::Client
  # override whatever you want here
end
```

This is switching out the instantiation of a class with an entirely different class, defined by me. To ensure this only happens on tests that require it, I'm using the tag `:fake_slack_client`.
I wouldn't classify this as a good practice, but I'm willing to accept that it's necessary from time to time.

For example, in this particular case, I needed to record what messages were being sent to Slack. Sending messages relies on the `chat_postMessage` method, so I re-defined it:

```ruby
class FakeSlackClient < Slack::Web::Client
  class << self
    attr_accessor :messages

    def clear
      self.messages = []
    end
  end

  def chat_postMessage(**args)
    self.class.messages.push(args)
  end
end
```

This is similar to what Rails does for [testing deliveries with ActionMailer](http://guides.rubyonrails.org/testing.html#functional-testing). Here's a sample usage:

```ruby
RSpec.describe "Slack integration" do
  it "sends a message to Slack", :fake_slack_client do
    client = # initialize Slack client

    # ...
    # (application logic that sends a slack message)

    expect(FakeSlackClient.messages).to match_array [
      hash_including(channel: "CHANNEL_ID", text: "Hello, World")
    ]
  end
end
```

This way, I'm able to easily create integration tests for my app, where I assert that a particular message was sent to the correct slack channel.

In the context of an integration test, it's more intuitive, and less error-prone, to just assert that a message is being sent with the correct content, and the above method allows me to have tests that clearly express that.

Keep in mind, though, that this is completely stubbing out the gem's logic where the HTTP request is made to the Slack API. So it's a good idea to also have some lower level specs that, through [VCR] or some other method, make sure that it happens.

## What's next

If you found this tip useful, you might also find value in:

1. [Super-powered factories for API tests](https://subvisual.co/blog/posts/73-factorygirl-beyond-the-database)
2. [Dependency Injection](https://subvisual.co/blog/posts/16-dependency-injection)

[slack-ruby-client]: https://github.com/slack-ruby/slack-ruby-client
[from thoughtbot]: https://robots.thoughtbot.com/how-to-stub-external-services-in-tests
[VCR]: https://github.com/vcr/vcr
[Adapter Pattern]: http://blog.arkency.com/2014/08/ruby-rails-adapters/
[Stripe]: https://stripe.com
[Uphold]: https://uphold.com
