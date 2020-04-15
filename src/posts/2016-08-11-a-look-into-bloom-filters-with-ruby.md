---
id: 96
path: /posts/96-a-look-into-bloom-filters-with-ruby/
title: "A Look Into Bloom Filters with Ruby"
author: fernando-mendes
date: 2016-08-11
cover: https://subvisual.s3.amazonaws.com/blog/hero/164/image.jpg
retina_cover: https://subvisual.s3.amazonaws.com/blog/hero/164/image@2x.jpg
tags:
  - development
intro: "I remember one particular class I had. It was late May and, as pretty much every Spring day in Portugal, the sun decided to greet us with a little too much enthusiasm."
---

I remember one particular class I had. It was late May and, as pretty much every Spring day in Portugal, the sun decided to greet us with a little too much enthusiasm.

The class was about Reliable Distributed Systems, as part of my Distributed Systems & Cryptography master's program. Distributed Systems students at [University of Minho](https://www.uminho.pt/EN) have their classes every Monday in the mythical 0.05 room. A room conveniently located just a couple of meters away from the coffee machine. A room in front of a beautiful, grassy, green patch right in the middle of the campus. A room where the blazing heat caused by 6 straight hours of direct sunlight meets the noisy embrace of *dozens* of servers in the back. Of course, eager PhD students have millions of tests, queries and transactions to analyse, which doesn't help our case *at all*. And of course they all come back from the weekend anxious to run them all at once while those poor, young and ambitious master's students are having classes.

During that particular class, the professor was introducing P2P networks and [Gnutella](https://en.wikipedia.org/wiki/Gnutella). At this point, everyone was in awe. I remember hearing in the distance *"So this is how we piracy™..."* I still find the lack of terrible corporation related puns a bit disturbing but maybe that noisy server embrace sucked all our humor away.

When the professor mentioned *"bloom filters"* my senses started to tickle. Maybe it was the late May heat or the fact that it sounded *really* fancy. But I was very bored, and I decided to check it out.

## Bloom Filters

I began my research by opening up the promised land of essays for university students: Wikipedia.

According to the Wikipedia entry, a bloom filter is a *space-efficient probabilistic data-structure*, which at the time I thought was mostly technical jargon for *a funky array that uses hash functions to index boolean values and is supposed be really really small*.

It's used for testing the inclusion of elements in a set (*is 6 in the bloom filter?*), and some notorious adopters include Akamai, Bitcoin, Medium and loads of databases. Apparently, Gnutella uses it to check if a super-peer's connections are sharing requested content. I probably could've learned that earlier if I was actually listening to the professor...

Before we delve into its internal behaviour, let's make sure we get the basic definition and overall behaviour right.

*Think of a Bloom Filter as a small blackbox where you can save values but not remove them. Another trait is that you can query it whether it contains a certain value. If the response is negative, it's __guaranteed__ that the value is not in the bloom filter. However, if the response is positive, it __probably__ is in the bloom filter but it can sparingly happen that this isn't true.*

At this point, like me in that hot late Spring afternoon, you're probably thinking:

> Why would anyone even like this?

You put values in but you can't remove them. You query values but you can't trust the answer. As far as usefulness goes, you've probably labeled them already as the *Magikarp of Computer Science*.

Well, the thing about bloom filters is that they are very efficient, both in space and time. You can see if a value is inside the bloom filter in near-constant lookup and you don't even need to save the element you are querying. In fact, most bloom filters use only few bits per element. As we will see further ahead, if your application requires fast inclusion tests and can handle a few occasional false positives, bloom filters are for you. Let's dissect our Magikarp.

### Dissecting a Bloom Filter

So how does such a peculiar data type work?

Bloom filters implement two operations: `add` and `test`. Both operations start by hashing the given value multiple times, either by using a different seed or running different hash functions. The output is a set of indexes or keys that will either be checked for inclusion (if we are testing) or marked as `present` (if we are adding).

Imagine I give you an empty bloom filter and you want to add `subvisual`. The string will be hashed 3 times and the 3 corresponding indexes will be filled up. The result should be something similar to this:

![Bloom Filter containing "subvisual"](https://subvisual.s3.amazonaws.com/blog/post_image/142/image-1469810899727.png)

Ok, seems good. However, you are now curious and you begin to wonder if `rubyconfpt` is contained in the structure. You decide to `test` it.

The string will be hashed the same amount of times and the resulting indexes will be verified.

![Bloom Filter testing `rubyconfpt`](https://subvisual.s3.amazonaws.com/blog/post_image/143/image-1469810920599.png)

Even though one of the indexes was indeed filled up, the other two weren't, so you can conclusively state that `rubyconfpt` isn't in the filter. In fact, if as much as a single index reveals an empty entrance, you can safely make this conclusion.

Eager for more values, you try adding `rubyconfpt` next. The resulting indexes will also be marked as present. Any repeated index will have no changes since the universe of possible values inside a bloom filter is only `filled` or `empty`.

![Bloom Filter after adding `rubyconfpt`](https://subvisual.s3.amazonaws.com/blog/post_image/144/image-1469810942917.png)

Now, suppose you want to test if `mirrorconf` is in the bloom filter. I can assure you it isn't, but you're clever and curious. Instead of taking my word for it and decide to test it anyway.

![Bloom Filter testing `mirrorconf`](https://subvisual.s3.amazonaws.com/blog/post_image/145/image-1469810973884.png)

Even though `mirrorconf` was never added, the bloom filter is saying it indeed contains it. Well, *probably contains*. This happens because a bloom filter is a **probabilistic data structure**. The fact that we have a reduced number of indexes available to fill, along with the natural properties of hash functions, means that eventually collisions will occur. The use of multiple hashed values attempts to reduce the amount of collisions, making them sparse but not inexistent.

### Diving into Ruby

We can implement a *very* simple bloom filter as an array or hash table. This will be a very *dumbed-down*, inefficient implementation. Let's call it our *Dumbfilter*.

Everything I said so far mentioned hash functions, but are they really required? We'll start by implementing it with a simple array. Every element we may want to `add` is going to be pushed into it. As a consequence, testing will be done using `Array#include?`. The resulting code looks something like this:

```ruby
module DumbFilter
  class Array
    def initialize
      @data = []
    end

    def test(str)
      @data.include? str
    end

    def add(str)
      @data << str
    end
  end
end
```

If we take some time to think about the issues with this implementation, we can find some very obvious ones. Well, for starters you don't get to play with hash functions which, at least for me during the symphony of servers orchestrated by my professor, was a big *put-off*. Besides that, the sequential access that comes with using an array means we end up with `O(n)` time complexity for both adding and testing, not to mention `O(n)` space complexity.

Let's try to improve our *dumbfilter* by reducing the time complexity. If hash functions are required for efficiency, we can achieve constant lookup by using a hash table. In fact, let's make use of Ruby's internal hash functions and just use the `Hash#[]` operator to set the accessed value to `true`.

```ruby
module DumbFilter
  class Hash
    def initialize
      @data = {}
    end

    def test(str)
      @data[str]
    end

    def add(str)
      @data[str] = true
    end
  end
end
```

This solution appears to be better since we now have constant access. However we are saving explicit `(key, value)` tuples and Bloom Filters are *space-efficient data structures*, so the current solution isn't exactly what we are looking for. Our milestone will be the *few bits per element* I mentioned earlier. We can start by saving the values in an array and generating the correct indexes for each string. To do this, let's start by adding [@peterc's bitarray](https://github.com/peterc/bitarray) to our project. We'll also be using the [fnv hash](https://github.com/jakedouglas/fnv-ruby).

In this version we are going to hash a given string, obtaining an integer as a result. That integer has to be limited to the size of our array and we can guarantee that by using [the modulo operation](https://en.wikipedia.org/wiki/Modulo_operation): `index % size` would result in a value between 0 and `size`. After that, adding and testing both become a simple access the correct index, setting a bit to 1 if requested.

```ruby
require "fnv"
require "bitarray"

module BloomFilter
  class V1
    def initialize(size: 1024)
      @bits = BitArray.new(size)
      @fnv = FNV.new
      @size = size
    end

    def add(str)
      @bits[i(str)] = 1
    end

    def test(str)
      @bits[i(str)] == 1
    end

    private

    def i(str)
      @fnv.fnv1a_64(str) % @size
    end
  end
end
```

The main issue with this version is that, over time, the bloom filter will become clogged with multiple false positives due to recurrent collisions. Since our universe of possible values is limited to the array size, bloom filters in particular tend to suffer from this effect. To handle it, we can either use multiple hash functions or the same hash function with different seeds. Let's implement the latter.

To guarantee that for multiple invocations of the same input produce the exact same output, we'll need to generate the seeds and save them beforehand.

```ruby
def seed(nr)
  (1..nr).each_with_object([]) do |n, s|
    s << SecureRandom.hex(3).to_i(16)
  end
end
```

After generating and saving the seeds, we need to define how hashing will occur for multiple seeds. In our case, we will simply generate an array containing the hash value for every available seed.

This particular implementation uses the [MurmurHash function](https://en.wikipedia.org/wiki/MurmurHash) which is internally used by Ruby. By using it, we can later compare results with the actual Hash implementation.

```ruby
def i(str)
  @seeds.map { |seed| hash(str, seed) % @size }
end

def hash(str, seed)
  MurmurHash3::V32.str_hash(str, seed)
end
```

Having these three methods, we are now able to generate the same indexes in recurrent calls. Adding should be nothing more than marking every index with 1 and testing should be limited to retrieving the index values and checking if they are all 1. The final versions of the code are available [here](https://gist.github.com/frmendes/67eae3f7792ed812330a344e91e35dfa). Feel free to comment if you have any questions or want to add something.

### In Summary

By now I hope to have shown you what bloom filters are and how they work.

In the wild, companies like Quora and Medium use them to [help tailor your suggestions](https://medium.com/the-story/what-are-bloom-filters-1ec2a50c68ff). Facebook also uses bloom filters on [type-ahead queries](https://www.facebook.com/video/video.php?v=432864835468) and bitly for [malicious url checks](http://word.bitly.com/post/28558800777/dablooms-an-open-source-scalable-counting), among several others.

As for Ruby there seem to be two alternatives that stand out. [igrigorik's bloomfilter-rb](https://github.com/igrigorik/bloomfilter-rb), which can work with Redis and act as counting/non-counting filter, and [deepfryed's bloom-filter](https://github.com/deepfryed/bloom-filter). Both rely on C extensions.

Most of the research and code were indeed written in a class *- I am truly sorry, professor...-* and refined as I had the opportunity to both write a blog post about it and give a [Friday Talk](https://subvisual.co/blog/posts/77-culture-design) on the topic. If you're into that sort of thing, slides are available [here](https://speakerdeck.com/frmendes/bloom-filters-a-look-into-ruby) and they have a lot of Stanley Kubrick references (please hit me up if you have some more!).

*By the way, we're also hosting [RubyConf Portugal](http://rubyconf.pt/)!*

*If you love Ruby and want to be around wonderful speakers, don't forget to grab your ticket and come meet us in good old sunny [Braga](http://rubyconf.pt/braga/).*
