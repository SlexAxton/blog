---
layout: post
title: "What I Learned about the Google Chrome Store"
date: 2010-09-18
comments: true
categories: [ "chrome", "web development" ]
---

While traveling in Europe this week, I had the pleasure of going to a Google Chrome developer event put on by Mike Mahemoff (The Moff™) and Paul Kinlan (whom Paul Irish says is a genius, so that's a good start). I took some notes during the meeting. I didn't know tooo much about the chrome app store, so I figured I'd post what I learned in a very digestible manner for anyone who's googling for the right keywords next week.

A bulleted list of things I learned at the meetup (other than how strong The Moff™ is in real life):

- Here were some slides for the night: <a href="http://3.ly/y2dd">http://3.ly/y2dd</a>

- No date on the official release of the store but apparently "Coming soon"

- There will be a free and a pay model, but the pay model is only launching in the US (then other markets to follow)

- There will be a way to do billing monthly/yearly/onetime (paypal ("harder", not sure of the specifics)/googlecheckout)

- There will be an API to see if the user really bought something

- 5% of your revenue is theirs, rest is yours (yay) (way better than 30% - wowy)

- Apps aren't chrome specific. They say they'd love to make stuff work cross browser, but they are going a little bit different direction from W3C widget spec...

- Pay to install

- You install apps directly into the browser

- There will be a user-permission popup for (location, notifications, storage, etc)

- Open now... I guess this means you can build stuff that works as a chrome app already (but there's no store)

-----------------Second Half-------------------

- Apps different than websites (even though theyre both web)

- You CAN use flash/silverlight/java if you want, but they don't auto install, so if the user doesn't have them, you're SOL

- Google hosted (if you want)

- If you go Google hosted, they are packaged (let's get a spec for this going!), if not, just a URL and a manifest

I stopped taking notes at this point to actually build a chrome app. It was insanely easy, so I'm happy about that. Yay chrome apps. I'd love to see how these pan out. I don't think it can work until they are cross-browser, etc, but half the fun of them is that if it's a chrome app, it doesn't have to work in FF, so you can use specific APIs... so it's a tradeoff.

Aiight. Tried to keep that as informal as possible. Hope someone wanted this info!

Alex
