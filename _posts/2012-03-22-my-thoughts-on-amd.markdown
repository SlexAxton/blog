---
layout: post
title: "My Thoughts on AMD"
date: 2012-03-22 23:08
comments: true
categories: ["javascript", "amd", "large apps"]
---

So I know it was cool to write blog posts about AMD [(A CommonJS JavaScript Module Specification)](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition) like a month ago, but I've recently had the desire to put my two cents into the discussion. I am likely not entirely objective - as I frequently use [RequireJS](http://requirejs.org/) and have even committed [tiny little parts](https://github.com/jrburke/requirejs/commits/master?author=SlexAxton) to the project that [James](http://tagneto.blogspot.com/) likely had to rewrite. I would like to point out up front, though, that AMD `!==` RequireJS. RequireJS is an implementation of AMD plus a whole ecosystem of usefulness.

I recently had some in-depth discussions with [Tom Dale](http://twitter.com/tomdale) who wrote a pretty popular article [against AMD](http://tomdale.net/2012/01/amd-is-not-the-answer/). Tom is a good friend and I respect all of his opinions. I wouldn't say that he's since 'come around' on the AMD issue, though I may have worn his desire to fight against it. I'll take what I can get. His business partner and all-around web-tech badboy [Yehuda Katz](http://twitter.com/wycats) remains less convinced and sent me a few questions that he wanted answered. I won't add them here verbatim, but I'll try and touch on a lot of that stuff as well. I think we more or less agree these days (but he by no means necessarily endorses what I'm writing here). I'll explain.

I'm going to opt to try and not rehash the great responses to Tom's concerns by [James](http://tagneto.blogspot.com/2012/01/reply-to-tom-on-amd.html), [Dave](http://geddesign.com/post/15994566577/amd-is-the-answer), and [Miller](http://blog.millermedeiros.com/amd-is-better-for-the-web-than-commonjs-modules/).

## AMD is not a script loader

This misconception is likely propagated by the fact that RequireJS shows up on all of the script loader shootouts. I have written most of my thoughts on this already in my most popular (read: only) Quora answer: [What are the use cases for RequireJS vs Yepnope vs LABjs](http://www.quora.com/What-are-the-use-cases-for-RequireJS-vs-Yepnope-vs-LABjs). I'll mostly just leave it at this: *Script loading is a means in which AMD/RequireJS meets their requirements. It's neither a focus of the project or an integral part to using AMD in production*.
## AMD makes async loading possible, not required

I often hear that people don't have an interest in asynchronous modules. This is perfectly fine. There are tons of integrated systems in full stack web frameworks that do a lot of great things for preprocessing that just don't require asynchronous script loading to be great.

**AMD is also so _other_ people can include your module asynchronously.**

So if you have your app split up into modules via some preprocessor system, that's fine, but if you'd like your code to be accessible to people who don't run the exact same stack as you: AMD works everywhere.

So write all your code how you like it, and right before you release it on github, consider adding this:

``` javascript
if (typeof define === 'function' && define.amd) {
  define(function () {
    return TheModule;
  });
}
// Feel free to also leak the global and/or test for a CJS enironment.
```

And to take this a step further, I'd encourage the preprocessing systems to just process _to_ AMD.

``` javascript
// Node style modules
var x = require('x');
var y = require('y');

var res = doSomething(x, y);

exports.module = res;
```

Instead of preprocessing this code to work on the web by just concatenating the globals in the correct order, why not just use AMD? It could easily be translated at preprocess time to:

``` javascript
define(['x','y'], function(x,y) {
  var res = doSomething(x, y);
  return res;
});
```

Now you have a module that anyone can pick up (and translate it into their own module format if they'd like).

The problem with using anyone else's format is that AMD is the only format that is suited well for asynchronous loading. This is not important to one group of people, but it is important to a different group of people, and is a valid concern in web development. In this case, AMD is the inclusive module format.

As for 'synchronous' module loading with AMD, the api must use the asynchronous pattern, but if a module is already registered, the result is atomic. Not to mention that it's perfectly valid to use the `require('x');` syntax when you can be sure a module already exists. The syntax _allows_ for asynchronous loading, but it doesn't require you to load things that way.

If you don't like parts about AMD, and prefer to preprocess, that's fine. I would encourage you to process to AMD though. Much like JavaScript is a common compilation target, I'd like to see AMD become that as well, for modules. It won't help when in 5 years every project handles modules with their own preprocessor format.

## AMD requires preprocessing anyways, right?

Yep, but not until build time. Any sane user of RequireJS uses the amazing [r.js](https://github.com/jrburke/r.js/) build tool before pushing to production. So why not just preprocess on request and output "modules" in the correct order and wrap them in a big IIFE?

It would likely work, but in my opinion there is value in being able to develop directly out of a folder, with only static resources. It's the reason that so many new developers are using LESS.js - just load the file and go. It doesn't require you to install a watcher, or set up rails, or even learn how to install an additional whole programming language to your highly varied OS landscape. AMD works without all the stuff. It is a developer experience with immediate gratification.

Many people disagree with the sentiment that our tools should all be able to run on the client side in order to facilitate the idea that our web pages can run out of static directories. I definitely agree that there are tons of uses for preprocessors that run outside of the browser, but I don't fundamentally agree that modules are part of the 'just nice to have if you can figure out the watchers' group of tools. _Real_ modules are going into browsers soon, and I think they should be part of the first class citizen group of tools that we run in our browsers. Not to mention, if you do opt-in to using a pre-processor and you want someone else's preprocessor to be able to understand your modules, you'll have to agree on a standard compilation target anyways. What better than AMD?

Much of what James writes about in his posts are about how there are a few 'meh' things about AMD, but that it meets nearly every requirement of a module system better than any alternative. He doesn't often mention AMD as a compilation target, but I think it solves everyone's problems.

## It's not nearly as 'complex' as you think it is.

AMD is implemented by attaching a scriptloader to an object. Load something, store it in the object, if someone else asks for it, pull it back out. Much of the size in RequireJS is for other amazing features and developer tooling. You can switch out RequireJS in production with [Almond](https://github.com/jrburke/almond) - it is 857 bytes.

The other notion is that it's a chore to write. If we ignore the fact that most modern code editors could easily store the boilerplate for you, I would argue that it's actually less characters than _not_ doing it. Also, (nearly) everyone who says this also complains that it forces them to nest their code an extra level, and then they turn around and immediately wrap all of their code in an IIFE.

``` javascript
// An IIFE for leakage. One level of nesting.
(function(){
  // require statement per dependency
  var x = require('path/x'),
        y = require('path/y'),
        z = require('path/z'),
        a = require('path/a');

  doStuff();
  exports.module = { ... }; // if you're doing more commonjs type stuff, not always
})(this);
```

Here's the same AMD module:

``` javascript
require([
    'path/x',
    'path/y',
    'path/z',
    'path/a'
], function ( x, y, z, a ) {
  doStuff();
  return { ... };
});
```

~36% less to type, by my quick and dirty measure (stripping whitespace and counting chars). It can be even less if you don't have any dependencies and just include a define at the end of your file like we did in a previous example.

Sure there's a level of nesting, but it's one that you'll need to put there regardless of whether you're using AMD or not. Sure that can be generated at request time, but so can the AMD callback function boilerplate.

## Why not just polyfill ES6 Modules?

Well, first off, they're not entirely baked. David Herman - the author of the original Module proposal - just posted a pretty delicious update for some ideas for a [simpler and sweeter module syntax](https://mail.mozilla.org/pipermail/es-discuss/2012-March/021543.html).

Secondly, I think it's a great idea. As soon as the syntax settles back down I think we could all consider setting up preprocessors to allow for the syntax in the browser. This would require a request-time preprocessor because of the invalid nature of the syntax. So if you were able to run a preprocessor, then I think you should use the ES Harmony Module syntax. I think it should then compile to AMD, obviously, but you shouldn't ever have to worry about it.

## Quick RequireJS plug

I obviously like AMD a decent amount, but I also think RequireJS is a fantastic tool in my stack. The 'plugin' architecture is not incredibly well-documented, but it essentially acts as module middleware. My favorite application of this feature involves templates.

I use the pattern in my [require-handlebars-plugin](https://github.com/SlexAxton/require-handlebars-plugin) to great effect. Rather than require a precompiled template during dev mode, I simply prefix my module name, and the template compilation occurs before the callback is invoked.

``` javascript
// In a no template middleware world
require(['handlebars', 'text!someTemplate.hbs'], function ( Handlebars, strTemplate ) {
  var fnTemplate = Handlebars.compile( strTemplate );
  fnTemplate({"some": data});
});
```

This is also similar to the technique where templates are stored in `type="script/tmpl"` script tags and pulled in by their id. This means that if you want to compile your templates at build time, you need to fundamentally alter every location that retrieves a template.

With the hbs template plugin, this is handled for you.

``` javascript
// With require-handlebars-plugin
require(['hbs!someTemplate'], function ( fnTemplate ) {
  fnTemplate({"some":data});
});
```

During development, this loads the template in as text and precompiles it for you. At build time it automatically outputs a precompiled module that is concatenated into the build. This ability alone is like magic to me and I just wanted to tell everyone how much I like it.

## Conclusion

You don't have to like AMD more than whatever you use. It would be nice if we had a standard, compatible web module syntax though. I think AMD is the best-suited candidate for that role, and that the preprocessors should use AMD as a compilation target, rather than a direct competitor. Obviously it's still cool if you just use it straight up, but that doesn't need to happen for it to succeed.
