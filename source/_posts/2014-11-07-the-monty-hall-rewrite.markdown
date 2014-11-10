---
layout: post
title: "The Monty Hall Rewrite"
permalink: /blog/2014/11/the-monty-hall-rewrite/
date: 2014-11-07 14:08:01 -0600
comments: true
categories: ["programming"]
---

> Here at Acme, Inc. we switched to Soy Milk when we rewrote our app, and now it's 8.3x better than
> our old Almond Milk app!

I call this a **Monty Hall Rewrite**.

## What's a Monty Hall?

For those loyal readers who haven't heard of [The Monty Hall Problem](http://en.wikipedia.org/wiki/Monty_Hall_problem),
to which I'm alluding, it comes from an old game show, called *Let's Make A Deal*. It later became
an interesting probability question, and even later a less interesting common interview question.

On *Let's Make A Deal* (on which Monty Hall was the original host), contestants were shown three
doors and told that behind one of the doors was a brand new car. If they could correctly guess which
door hid the car, they could keep it. The guessing happened in two phases.

<img src="/images/montyhall/montyhall.jpg" alt="monty hall problem" style="float:left; margin: 0 20px 20px 0" />

First the contestant would choose a door that they believed had the car behind it. Then one of
Monty Hall's assistants would walk over to the other two doors (the ones that had not
been chosen) and proceed to open one of them, always revealing a bad prize (often a donkey!). Then
the contestant, who now had this *new* information, was allowed to stick with their original answer
*or* they could switch to the remaining closed door. That would be the final allowed guess.

They'd open the final chosen door and their winnings (hopefully a car!) would be displayed.

In 1990, well into the show, advice columnist *Ask Marilyn* from Parade Magazine was asked
whether there was a particular advantage to staying or switching. Much to many folks' surprise at the
time, she answered that the probability of winning was greater if you switched. Thousands of people
wrote in to tell her that she was wrong, but most (not all!) were eventually convinced.

My best summarization would be that, initially, each door has 1/3 probability of being correct.
Therefore, the door that the contestant first chooses has a 1/3 chance of being correct, and the
sum of other 2 choices must be 2/3. When the assistant reveals the donkey behind one of the
remaining doors, it does not change these facts. The original choice still has a 1/3 chance of being
correct, and the sum of the other doors still has a 2/3 chance of being correct. However, now that
the contestant knows that one of the non-chosen doors is a bad door, the 2/3 chance must lie solely
in the unchosen, unopened door.

The conclusion is that you have a 2/3 chance of guessing correctly if you switch, and you have a 1/3
chance of being correct if you stay. This has since been mostly proven as well as observed in repeated
computer simulated trials. It's a bad interview question, but remains a popular Probability 101
problem and a decent anecdote.

## How is this related to rewrites?

It's not really, obviously. I don't think this metaphor goes very deep, but what it hopefully
gets across is that in the case of a rewrite, the new framework that you choose doesn't
*necessarily* have more merit than your original choice. *The switch itself* is what's important.

To immediately break down my own metaphor, the switch doesn't matter as much as the *rewrite* itself,
but people don't tend to rewrite things on their old stacks.

If you had started with B, and rewrote in A, you'd also likely have better results than in your
first pass.

The only fair comparison is a rewrite of your app with your original tools *as well as*  a rewrite of
your app with the new tools. This isn't very practical, and I'm not advocating it. I'm simply advocating
awareness of the fallacy.

I'd like us all to be keenly aware of what it really takes to make great
software, and to me that involves avoiding false traps. The sexiness of switching to a new, hip library
often comes along with a strong confirmation bias, and an even stronger sunk-cost bias. Let us measure
only what we are able to measure and leave the rest to the marketing teams and social media experts.

### Real Quick For Car People

<img src="/images/montyhall/1989mercedes.jpg" alt="1989 Mercedes C Class" style="float:left;margin-right:20px;margin-bottom:20px;" />

> "This 2015 Hyundai Sonata is way better than our old 1989 Mercedes C Class."

Please ignore the 2015 Mercedes C Class.

<br style="clear:both;margin:10px 0;">

## Switching, Rewriting, & Refactoring

Throw away any assumptions or knowledge of tools that you have and *purely* consider that if you are switching,
rewriting, or refactoring, you are now `n years` better at programming than you were when you
initially wrote the software.

Now factor in that you've had `x years` more time to consider the *exact* problem that you're trying to
solve as well as rid yourself of uninformed assumptions. When going in for the rewrite, you have a much
clearer picture of what a successful product looks like, purely *because* of the initial app. You
know to abstract certain parts of the code that need to grow, and to externalize other parts that you
know you won't be able to support indefinitely. For all its negative qualities, [second system
syndrome](http://en.wikipedia.org/wiki/Second-system_effect) is actually somewhat helpful in understanding
exactly what needs to be built (even though there isn't time to build it all).

In your original app, things almost certainly went directions that you weren't expecting. You had
to tack on widgets and endpoints that you never intended, and you ended up with some frankenversion
of your original vision. The rewrite allows you to consider all of this stuff from the begining (at
least for a bit), which results in things being 'faster' or 'more secure' or 'more user friendly' or
whatever metric your new app is better than the old one.

If you'd like another bad metaphor, imagine your original app as [The Homer](http://simpsons.wikia.com/wiki/The_Homer).

## Are you talking about any specific rewrite? (aka are you sub-blogging me?)

No. This seems to come up a lot, though. I'm happy to tell you that I think you're measuring things
incorrectly directly to your face. If you must have an example, I'd say that Facebook's switch from
an HTML5 app to a native app would be an ideal candidate for a well-defined Monty Hall Rewrite.

If you weren't familiar, their old, not-so-great app was written as an HTML5 web app in a native wrapper. It
had all sorts of warts (HTML as the data transfer layer, etc) and was indeed not that nice. Mark
Zuckerberg famously said that [betting on HTML5 was one of their worst mistakes](http://techcrunch.com/2012/09/11/mark-zuckerberg-our-biggest-mistake-with-mobile-was-betting-too-much-on-html5/) and that
the new native app was better, faster, stronger.

So after they had a laundry list of things they didn't like about their old app, they set out to
completely rewrite a new app with new tools. It was better! And faster! But I think it is wrong to attribute a vast
majority of these improvements to the fact they were now "native," but instead to the fact that they were *rewritten*.

Luckily, at the time, Sencha put out something called [Fastbook](http://vimeo.com/55486684). A Facebook
"rewrite" of sorts to match the new native Facebook app. They made a nice video about how they were
able to make a faster/snappier/cooler
app than the new native one, all in HTML5 (with Sencha's tooling, obviously). I don't necessarily
think Facebook should have switched to the Sencha platform or anything along those lines, but it is
a good example of people blaming their tools for causing their old problems, and thanking their new
tools for solving them.

To Facebook's credit, [@tobie](https://twitter.com/tobie) eventually put out
[a list of things he'd wish the web would fix](http://lists.w3.org/Archives/Public/public-coremob/2012Sep/0021.html)
with things that had actively been a problem for them when building those old web-based apps. I haven't seen the
equivalent list on the problems building cross platform native apps, but the list was quite valid.
It's much more in line with the type of discourse we *should* be having when we make claims about
why our new choices are better than our old ones.

## What now?

I don't mean to discourage rewrites, trying new tools, or any other variant on that theme. I *love*
a good rewrite, and I'm constantly trying new tools. More than anything I wanted to point a thing
out that I think muddies a lot of the waters when developers are evaluating new tools.

So when you pick new tools, don't trash your old ones. And once you decide on one tool instead of another
that does something very similar, don't speak as if you made the *obvious* or *correct* choice.
Instead, focus on the fact that you made a *good* choice.

Software is not a zero-sum game. Two tools can be good at the same time, and we all win because of it.
