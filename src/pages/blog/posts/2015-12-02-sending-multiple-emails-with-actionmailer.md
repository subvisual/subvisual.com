---
id: 66
path: /posts/66-sending-multiple-emails-with-actionmailer/
title: "Sending multiple emails with ActionMailer"
author: luis-zamith
date: 2015-12-02
cover: https://subvisual.s3.amazonaws.com/blog/hero/132/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/132/image@2x.jpg
tags:
  - development
intro: "If you have ever built a Rails application, you probably have encountered"
---

If you have ever built a Rails application, you probably have encountered
`ActionMailer` along on your travels. If that is not the case, then it suffices to say that it is the Rails way of sending emails. Here's a basic example:

```ruby
class Mailer < ActionMailer::Base
  default from: "notifications@subvisual.co"

  def welcome_email(recipient)
    @recipient = recipient
    mail(
      to: recipient.email,
      subject: "Welcome to Subvisual"
    )
  end
end

class UsersController < ApplicationController
  def create
    ...
    Mailer.
      welcome_email(@user).
      deliver_later
    ...
  end
end
```

In this example we are sending one email to one user, when we are able to create that user's record. Notice also that we are using the `deliver_later` method, instead of `deliver_now`, which will use `ActiveJob` to send the email as a background job.

But what if we wanted to send a notification to multiple users all at once?

## Recipients list

In this next example, we have a list of recipients we want to notify that a new
comment has been created for a post. For that, we will take advantage of the
fact that the `mail` method can take a list of emails instead of only one.

```ruby
class Mailer < ActionMailer::Base
  default from: "notifications@subvisual.co"

  def new_comment_email(recipients, comment)
    @recipients = recipients
    mail(
      to: recipients.map(&:email).uniq, 
      subject: "New comment on the Subvisual blog"
    )
  end
end
```

I have omitted the controller for brevity, but you can probably figure it out.
As you can see, it is pretty simple, to send an email to a list of recipients.
A possible problem with this approach is that each recipient of the email is now aware of all the other recipients of the email, which might not be a good idea.

## Recipients list - 2nd try

Another simple thing we can do, is sending the emails to recipients in blind
carbon copy (bcc), like this:

```ruby
class Mailer < ActionMailer::Base
  default from: "notifications@subvisual.co"

  def new_comment_email(recipients, comment)
    @recipients = recipients
    mail(
      bcc: recipients.map(&:email).uniq, 
      subject: "New comment on the Subvisual blog"
    )
  end
end
```

This would be a pretty good place to stop, since we are now sending emails to a lot of users in one go. 

But, what if we need the content of the email to be different for each recipient? Maybe they have different roles in the system and are
allowed to see different things in the email.

Well, that leaves us with no option other than actually sending one email per
recipient, so that we can control what goes out in each of them (or we could try to group the recipients together by role, but ultimately we would end up sending more than one email).

## Sending multiple emails

A naive first approach could be to try and loop over the `mail` method, once for each recipient, like so:

```ruby
class Mailer < ActionMailer::Base
  default from: "notifications@subvisual.co"

  def new_comment_email(recipients, comment)
    @recipients = recipients
    @recipients.each do |recipient|
      mail(
        to: recipient.email, 
        subject: "New comment on the Subvisual blog"
      )
    end
  end
end
```

If you have ever tried this, you soon figured out that this does not work.
`ActionMailer` will actually only send an email to the very first recipient and
ignore the others.

## Sending multiple emails - loop in the controller

The "by the book" way of doing this would be to move the loop into the
controller:


```ruby
class Mailer < ActionMailer::Base
  default from: "notifications@subvisual.co"

  def new_comment_email(recipient, comment)
    @recipient = recipient
    mail(
      to: recipient.email, 
      subject: "New comment on the Subvisual blog"
    )
  end
end

class CommentsController < ApplicationController
  def create
    ...
    @recipients.each do |recipient|
      Mailer.
        new_comment_email(recipient, @comment).
        deliver_later
    end
    ...
  end
end
```

This is fine, and just works™, but if we are in the mood for a bit of over
engineering and monkey patching, there is a way to avoid having to write the
loop every time (because we all know how tiring that is).

## Sending multiple emails - monkey patching

I am going to lay this all on you at once, try to digest it.

```ruby
module ActionMailer
  class MessageDelivery
    def deliver_multiple_later(options = {})
      recipients = options.
        delete(:recipients).
        uniq.
        compact
      recipients.each do |recipient|
        @args.unshift recipient
        enqueue_delivery :deliver_now, options
        @args.shift
      end
    end
  end
end
```

This is reaching into the internals of `ActionMailer`, and adding a new way to
deliver emails, that does the loop and sends the recipient as the first argument to the `Mailer` method. Here is how we can use it:

```ruby
class Mailer < ActionMailer::Base
  default from: "notifications@subvisual.co"

  def new_comment_email(recipient, comment)
    @recipient = recipient
    mail(
      to: recipient.email, 
      subject: "New comment on the Subvisual blog"
    )
  end
end

class CommentsController < ApplicationController
  def create
    ...
    Mailer.
      new_comment_email(recipient, @comment).
      deliver_multiple_later(recipients: @recipients)
    ...
  end
end
```

There you have it, your very own way to deliver an email to multiple
recipients. Do not trust it too much, because it is using `Rails` internals,
which might change in the future and break your application, but hey, what is
life without a thrill?

