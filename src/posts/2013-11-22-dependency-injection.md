---
id: 16
path: /posts/16-dependency-injection/
title: "Dependency Injection"
author: luis-zamith
date: 2013-11-22
tags:
  - development
intro: "Imagine you have a class which gets XML data, parses it and then stores the"
---

Imagine you have a class which gets XML data, parses it and then stores the
parsed data on a database. You could very well write it like this:

```ruby
class Consumer
  def consume(data)
    parsed_data = XMLParser.parse(data)
    DB.store(parsed_data)
  end
end
```

There is (at least) one big problem with this approach, and it will manifest
itself when you want to support another data format, such as JSON. The Consumer
class is tightly coupled with the XMLParser, and therefore it's hard to add
other parsers, so we need to decouple them. We're
going to do that using a technique called [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection), like so:

```ruby
class Consumer
  attr_accessor :parser

  def initialize(parser: XMLParser)
    @parser = parser
  end

  def consume(data)
    parsed_data = parser.parse(data)
    DB.store(parsed_data)
  end
end
```

This way we can inject the parser on initialization, or even after that. Note
that we have a default which is the XMLParser, but it is not mandatory to have a
default value.

So, after the refactoring, adding a JSONParser is easy.

```ruby
consumer = Consumer.new(parser: JSONParser)
consumer.consume(data)
```

This technique can be used in many scenarios, in this example we used it as part
of a pattern that's called [strategy pattern](https://en.wikipedia.org/wiki/Strategy_pattern).

*Note: The same technique could be applied to inject the DB class instead of hard coding it.*

