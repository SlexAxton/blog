---
layout: post
title: "The 15 Commandments of Front-End Performance"
date: 2015-02-09 05:52:42 -0600
comments: true
categories: ['javascript', 'front-end', 'performance']
---

This list is the product of many years of experience in the front-end web development field. I
maintain this list as a reminder to myself to always follow best practices, and to not compromise
on performance, even if I'm in a time crunch. I read it before I start any project, and share it
with my team at work (sometimes we joke and call them "codemandments") so we can all be on the same
page and do our part to keep the web fast.

Feel free to fork this for your own use.

<img src="/images/codemandments.jpg" alt="15 Codemandments" />

## The Commandments

- I will gzip all server responses.

- I will not include any blocking scripts.

- I will use SVGs instead of JPGs, wherever possible.

- I will not include ads, even ones that request users to join groups or lists on Facebook or
  Twitter.

- I will debounce scroll events.

- I will not include third party JavaScript libraries just to detect if users are part of my "Just
  Cool Friends" Facebook group, even if it wouldn't take up that much extra load time.

- I will ignore "the fold" - no matter what the client says.

- I will resist the urge to use `window.alert` to inform visitors that there's a Facebook group for
  cool friends and if they wanna join it, that's fine, it only takes a few clicks.

- I will not use `translate3d` as a hack.

- I will not use synchronous XHR to request the list of friends in my Facebook group, and then use
  the list in order to check to see if the current visitor is on the list, and then show a
  warning to people who aren't in the group that says that they have their priorities "messed up"
  and that "jeeze," it's just a stupid group, why can't you just join it.

- I will use a CDN to serve static content (with no cookies!).

- I will not "waste bytes" in HTML comments to explain that I'd really appreciate it if you joined
  the Just Cool Friends™ Facebook group. Things haven't really been the same for me since Linda left, and
  it's just so easy to join that it's actually a little bit rude that you wouldn't. I don't post
  much in there, and I won't even know if you 'mute' the posts from showing up on your feed. But
  honestly it's only like one or two posts every day, so it's not like seeing them in your feed
  would kill you.

- I mean it's one crummy group that you join and it makes a guy feel better about himself. The
  number of people that join goes up and so does my happiness, how does that not make sense? If you have
  a problem with me or with something I've done in the past, you could just bring it up on the group, that's
  literally what it's for. Sometimes I just sit around refreshing the group page, waiting as those numbers
  tick up. Each number...

- ... is another dollar in the bank of my emotional stability. I scratch the pixels into my screen: "10,000,000".
  I count in my sleep: "two-hundred-and-six, two-hundred-and-seven" - each time a friend is added
  my joy grows, my sadness pales, my existence means that much more. I weep as the numbers hit
  double and then triple digits. So many friends. So many lives touched. How can I be this lucky?
  How can I be this influential and popular? See Linda?! I'm not a "loner." I have way more friends
  in my group than you ever had! Maybe you're the loner, Linda, or should I call you "Lone-da?!"
  I hope you can find your own group one day. I hope you can be as meaningful and influential to so many people as
  I am. And another friend joins. And another friend joins.

- I will minify all of my CSS.



