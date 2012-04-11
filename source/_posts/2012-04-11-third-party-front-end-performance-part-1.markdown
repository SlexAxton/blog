---
layout: post
title: "Third Party Front-end Performance"
date: 2012-04-11 14:36
comments: true
categories: ["bazaarvoice", "performance", "javascript", "third-party"]
---

I work for a company called [Bazaarvoice](http://developer.bazaarvoice.com/). Our core products (Ratings and Reviews is our biggest) are all implemented as third party javascript applications. We are white-label, so you don't see a ton of our brand around, but we power the User Generated Content (UGC) behind Walmart, Samsung, Best Buy, Proctor & Gamble, etc, etc. Needless to say, we have one of the highest volume third party applications on the internet. Fun stuff. There are other massively successful and smart companies doing similar things (take a look at Disqus or even peek into the Google or Facebook button code).

## Performance Matters

Our core applications were built nearly 7 years ago, and gained features everyday over that period of time. As you can imagine, performance started to suffer. Since we're on the product page of major retailers, we knew that this wouldn't stand. I was tasked with re-thinking our solution with performance at the forefront of our architectural and deployment strategies. I attacked three different types of performance at varying levels of depth.

* Network
* Injection/Rendering
* Application

Bazaarvoice has a developer blog that I sometimes write for, so I wrote an article on [Third Party Front-end Performance](http://developer.bazaarvoice.com/third-party-front-end-performance-part-1). Normally I don't just link across, but I think this information is actually fairly applicable to a large chunk of developers. So check it out. Feel free to comment either place. Part 2 and 3 to come.
