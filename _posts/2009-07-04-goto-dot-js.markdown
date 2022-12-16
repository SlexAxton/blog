---
layout: post
title: "Goto.js"
date: 2009-07-04
comments: true
categories: [ "javascript", "sarcasm" ]
---

Today I launched my new site [www.summerofgoto.com](http://www.summerofgoto.com). It is the official new homepage for my new script Goto.js. Goto.js adds the functionality of the goto command into native javascript. It uses James Padolsey's parseScripts as a preparser and rewrites the input code to be valid javascript. Leave it to me to write programs solely for the comedic value, but I actually did find some interest in the fact that it is challenging to implement functionality that is so basic to low level programming.

The script (which can be downloaded at the site) hinges on a single heuristic for implementing Goto. In javascript, while loops can have labels, and they can also have 'continue' statements that accept a label as the parameter.

e.g.

``` javascript
label1: while (i < 10) {
  if (!valid(i)) {
    continue label1;
  }
i++;
}
```

In effect, this is just a crappy goto statement that is confined to a special case. So my goal in goto.js was to extend this case to all cases. I did this by surrounding everything after a label with a while loop that only runs once by default. The only tricky part being that while loops cannot stretch across multiple functions or blocks. So each while loop ends at the end of its block scope, not the file or script. This is an interesting problem, because typically, when goto was around and actually heavily used, there weren't a whole lot of functions being written. Even if I was somehow able to allow you to start running code from the middle of a function from the middle of a different function, I don't think it would work, because the context of all the variables that have been passed into the new function cannot be guaranteed to exist.

The only feature that I am actively toying with currently is a way to allow goto satements to jump to labels that haven't been declared yet. After reading a bit on the subject, different languages had different rules about this feature in the past, and some languages therefore also did/do not support forward looking goto statements.

Enjoy the Summer of Goto!

P.S. For anyone who is wondering (so far a total of zero people), Summer of Goto is a term that was popularized by Paul Irish, while discussing this script and PHP's decision to add goto into their language.

And for those who do not immediately recognize that this entire thing is a joke, please forgive me. <--(insurance).
