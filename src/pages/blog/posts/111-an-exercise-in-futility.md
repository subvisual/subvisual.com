---
id: 111
path: /posts/111-an-exercise-in-futility/
title: "An exercise in futility"
author: miguel-palhas
date: 2016-10-03
tags:
  - development
intro: "[Code golf](https://en.wikipedia.org/wiki/Code_golf) is an interesting concept to me: to solve a programming challenge, using not the most efficient or readable code, or the most state-of-the-art solution, but with the smallest code size possible."
---

[Code golf](https://en.wikipedia.org/wiki/Code_golf) is an interesting concept to me: to solve a programming challenge, using not the most efficient or readable code, or the most state-of-the-art solution, but with the smallest code size possible.

The interest comes from the fact, since it's such a counter-intuitive way of thinking, it taps into the creative part of our brain, to come up with new and inventive ways of reducing the code.

I recently participated and won one of these challenges, as part of a [pixels.camp](https://pixels.camp/) contest. This post is about how I came up with my solution.

## The challenge

The input for our code (originally published [here](http://quizchallenges.pixels.camp/challenge4.html) was a string representing a [Polish Notation](https://en.wikipedia.org/wiki/Polish_notation) addition of two non-negative integers. For example:

```
+ 11 5
```

Our code should consist of a list of regular expression substitutions (of the form `/match/replacement/`).
This list would be applied in a loop to the input string, constantly mutating it until the output consisted of a single number, which should equal the result of the addition. So for the above string, we would have to yield `16`.

For added complexity, all numbers were represented in octal notation.

Performing an addition using nothing more than regular expressions might seem puzzling at first. But let's see how we can go about this.

## The foundations

After seeing the challenge, I immediately remembered something I had seen before, which ended up being the entire core of my solution: incrementing a numbers using regular expressions.

30 seconds later, I had arrived at the same [Stack Overflow answer I had seen before](http://stackoverflow.com/a/31599758).

As it turns out, incrementing a number with regex’s is a known and solved problem. Let’s use the number 9 as our sample input (I won’t worry convert this to octal notation just yet, because we’re all more used to reasoning about decimal numbers).

The algorithm for incrementing 9 is:

### 1. Adding a lookup table
This table consists of `01234567890`. Each digit must be followed by it’s incremented counterpart, which is why we need 0 at both ends. In order to distinguish the actual number from the lookup table, we can separate them using any non-numeric character. Let’s go with `~` (tilde).

So `9` becomes `9~01234567890`.

### 2. Left-padding the input

We’re actually going to increment each digit individually, and we know `9` must become `10`, which has an extra digit. So we need to safeguard for that by left-padding our input with zeros, at least when the input starts with a `9`.

We now have `09~01234567890`.

### 3. Find out what to increment

Now it’s time to do the actual “math”. For a `09` to become a `10`, we need to increment both of it’s digits. But this is not the overall rule. For example, for `10` to become `11`, only the last digit is incremented.

The overall rule here is that we only increment the last digit, and as long as they are `9`’s, we also increment the ones before them. In regular expressions, this could loosely be translated to `/(\d)9*$/`.

### 4. Looking ahead

To actually make use of this, we need to capture each of the digits we want to increment, and using a [positive look-ahead](http://www.regular-expressions.info/lookaround.html), finding it’s occurrence in the lookup table that follows, so that we can also match against the digit right after it. This one looks a bit more complicated:

```
/(\d)(?=9*~\d*?\1(\d))/$2/g
```

In more detail:

1. Match a digit: `(\d+)`;
2. Within the lookahead, match all following `9`’s (due to the previously mentioned rule, match the lookup table separator, and an arbitrary number of digits until the original one is matched: `(?=9*~\d*?\1)`;
3. Match the digit right after that: `(\d)`;
4. the match (which is only the first digit, as the look-ahead doesn’t count) with `$2`, which matched the incremented digit from the lookup table;
5. Use the `/g` modifier, so that this matches more than once (i.e.: `1999` must become `2000`, so we need to match all four digits).

### 5. Taking out the trash

At this point, `09` has become `10`, so can just get rid of the lookup table with a simple regex, leaving us with the final result.

Hold on. This just incremented a single number. We didn’t sum anything yet!

## Adding numbers, one step at a time

With the logic in place for incrementing a single number, we can just as easily deduce the logic for decrementing a number. It’s pretty much the same, with the lookup table inverted. And we also don’t need to add leading zeros.

Now, remember that the regexes we use are called several times, in a loop?This means we can go back to our primary school days, and increment one number while decrementing the other. When the decrementing one reaches zero, we’re done.

So, knowing all of this, my first submitted solution was:

```
/\+ (\d+) (\d+)/z$1~012345670 $2#076543210/
/z(\d+)~\d* 0*#\d+/$1/
/z7/z07/
/(\d)(?=7*~\d*?\1(\d))/$2/g
/(\d)(?=0*#\d*?\1(\d))/$2/g
```

Let’s go through this one step at a time:

```
/\+ (\d+) (\d+)/z$1~012345670 $2#076543210/
```

First, I’m adding lookup tables to both digits (using `#` in the second one to distinguish them.
Also note that they only go up to `7`, since the actual problem uses octal numbers only.
I’m also removing the plus sign in favor of a `z`, which saved me the back-slach and the unnecessary white-space.

```
/z(\d+)~\d* 0*#\d+/$1/
```

This will match only when the second number is zero, and replace the whole string with the captured first number. Because if the second number is zero, the final result is the first number alone.

Once this matches, all other regexes will no longer match, and the algorithm is over.

```
/z7/z07/
```

Adding a leading zero, if the first number is a 7.

```
/(\d)(?=7*~\d*?\1(\d))/$2/g
/(\d)(?=0*#\d*?\1(\d))/$2/g
```

The first one was already explained in detail. It increments the first number.
The second one is mostly equivalent, but it decrements the second one.

And there we go. This will take long to run. `N+1` iterations, to be more accurate, where `N` is equal to the second number. So `+ 10 7` will take 7 iterations. But it will get there.

## Squeezing to the last byte

The above solution gets us to 132 characters. But we can go further.

Notice a few things about the whole solution:

```
/\+ (\d+) (\d+)/z$1~012345670 $2#076543210/
/z(\d+)~\d* 0*#\d+/$1/
/z7/z07/
/(\d)(?=7*~\d*?\1(\d))/$2/g
/(\d)(?=0*#\d*?\1(\d))/$2/g
```

1. `\d` matches a digit. But the contest creators were nice to us, and told us we could assume the input is valid. So we can just replace this with a `.` (dot), which matches any single character; Same thing for the `\+`;
2. The `z` placeholder was actually an oversight on my part. We can remove it altogether, and match with the beginning of the string `^` instead;
3. Without that `z` to worry about, we can now more cleverly handle the second regex, where we replace the whole string with the value of the first number we capture.
It can now be written as `/~.* 0*#.+//`
(i.e.: delete everything starting at the tilde, as long as the second number is zero)
4. The last two expressions look intriguingly alike. Let’s use the pipe operator to merge them into a single one:
`/(.)(?=(7*~|0*#).*?\1(.))/$3/g`

This leaves us with the final, 92 character long solution:

```
/. (.+) (.+)/$1~012345670 $2#076543210/
/~.* 0*#.+//
/⁷/07/
/(.)(?=(7*~|0*#).*?\1(.))/$3/g
```

## Conclusion

As useless as this may seem (and, well, it probably is), I'm fascinated by the thought process required by exercises such as this one. It's a cool feeling, to poke my brain with different sticks from time to time.

If you're also attending [pixels.camp](https://pixels.camp/) this week let me know, or reach me out during the event. I'd love to chat, and I'll have stickers!
