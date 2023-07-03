---
highlight: false
path: solidity-spotlight-arrays
title: "Solidity Spotlight: Populating Arrays"
categories:
  - engineering
author: luis-zamith
date: 2023-07-03
intro: The different ways of populating Arrays in Solidity
---

Coming from a background of Ruby and Elixir (but this applies to pretty much any
modern programming language) I was used a very fast and loose way of interacting
with Arrays or Lists. It could look something like this:

```ruby
numbers = [1, 2]
numbers.push(3)
print numbers
# [1, 2, 3]
```

Super simple and more importantly very ergonomic for the developer. In Solidity
we have to give a bit more thought when creating an Array, mostly if we want a
fixed size or dynamic array.

## Fixed Size

If you know the exact size of the Array you're going to need up front, you can
set it at compile time. That will ensure that the Array will never have more
elements than those specified, at the cost of allocating all the necessary
memory immediately.

```solidity
uint8[3] memory array = [1, 2];
```

If you can't hardcode all of the elements then it becomes a bit more verbose to
work with, as we need to tell it the index of each of the elements we are
adding. It'll be easier with dynamic Arrays, but more on that later.

```solidity
uint8[3] memory array;
array[0] = 1;
array[1] = 2;
array[2] = 3;
```

### Memory vs Storage

You might have noticed that we've been adding a `memory` keyword to the
declaration of all our Arrays so far, which means, you've guessed it, they will
only existing in memory and will not be persisted. This is nice and all, but at
some point we probably want to persist some of our lovely data. That's where
`storage` comes in, it means that the Array will be stored in the Blockchain and
can be accessed by any function at a later point in time.

To declare an Array to be in `storage` we have to do it from outside a function,
in the main body of the contract, but other than that it looks exactly the same.

```solidity
contract MagicData {
  uint8[3] public array;

  function populate() public {
    array[0] = 1;
    array[1] = 2;
    array[2] = 3;
  }
}
```

This all applies to dynamic Arrays as well, only the syntax of how we create and
populate them changes.

## Dynamic Size

This is the type of Array I was most used to working with in the dynamic
languages I had mostly worked with before Solidity, provided it is in `storage`.

```solidity
contract MagicData {
  uint8[] public array = [1, 2];

  function populate() public {
    array.push(3);
  }
}
```

See how it resembles the first example I gave that was written in Ruby? Quite
ergonomic as well, but if you try this with a memory Array you'll get an error,
a memory Array needs to be interacted with like if it was a fixed size Array.

```solidity
uint8[] memory array = new uint8[](3);
array[0] = 1;
array[1] = 2;
array[2] = 3;
```

Note that it has to be initialized using the `new` keyword and given a size. The
key takeaway here is, if you want dynamic Arrays, keep them in storage.

## Conclusion

We've seen how to populate Arrays in Solidity in many different ways, none of
which is the best or the only right way to do it. To my Rubyist eyes, the
storage dynamic version seems better, but it does usually consume more gas than
it's fixed sized counterpart and even though I'm a firm believer of Sir Tony
Hoare's *"premature optimization is the root of all evil."* statement, in
Solidity the correlation of optimization and money savings for your users is
much more obvious, therefore it's usually a worthwhile tradeoff.
