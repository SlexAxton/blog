---
layout: post
title: "On \"Rolling Your Own\" Large jQuery Apps"
date: 2010-08-16
comments: true
categories: [ "javascript", "mvc", "jquery" ]
---

As a preface, make sure you've read my super-smart and talented yayQuery co-host Rebecca Murphey's blog post on this topic

here: <a href="http://rmurphey.com/blog/2010/08/09/on-jquery-large-applications/">On jQuery Large Applications</a> and here: <a href="http://rmurphey.com/blog/2010/08/11/on-rolling-your-own/">On Rolling Your Own</a>.

Rebecca points out some huge holes in the jQuery-verse when it comes to large-application development, and gives her opinion on why she doesn't think jQuery is ever a good fit for a large application. I disagree, and she's successfully convinced me to write a post on why I think what I do, so here we are.

Also, please, no one point out that I prefer Django over Pylons, which is essentially the same argument :D . The difference, though, is that I think Pylons is awesome, and that people should totally be using it for large applications on the backend, as long as they prefer it!

First, I will start by mentioning that I have written several large applications using jQuery, and that I think that from a 'framework' perspective, something like Dojo (which Rebecca supports) or YUI3 serves as a much better core to a large application than jQuery. However, arguing that 'you shouldn't use jQuery in your large application' is an entirely different topic. jQuery does not describe or prevent any framework of application development, so you are free to choose your own to suit your needs. I do not advocate the incorrect use of jQuery as the core of your application. I do advocate JavaScript at the core of your application, though.

<strong>jQuery is a tool </strong>(lolz)

I build large applications that <em>use </em>jQuery. I don't build large applications <em>on top</em> of jQuery. This incredibly important distinction hasn't been very well clarified thus far in the conversation. I think it's a fair ambiguity, however, because while it's possible to use jQuery in well-structured ways, it's certainly the road less travelled. The 'common jquery user' tends to throw everything onto the jQuery namespace, and pull in everything as plugins, and generally very tightly couple their applications to jQuery. I think the distinction is still important for the argument, because it doesn't rule out the fact that you can write some really nice applications using jQuery.

<strong>It's not jQuery, it's you.</strong>

I think the thought that people are incapable of using jQuery in this manner stems from quite a few bad consulting experiences with companies using jQuery for no reason other than the fact that it's `the cool thing to do,` but using it entirely in an entirely backwards manner. This is also not a good way of making library decisions (at least in the long term). It doesn't reflect poorly on the code in jQuery so much as it reflects poorly on either the messaging from the jQuery team, or just the general population's inability to write good code and tendency to do what's popular. However, if Dojo were the hip-cool-designer library, they would suffer from <em>the exact same problem</em>.

Any library, in the hands of people who don't know what they're doing (even FuseJS), will not serve the needs of the application. This is a reality for anything that becomes popular. It's easy to like Dojo for the quality of code that comes out of it, but that's because the significantly less amount of people who use it are <strong>really good JavaScript Developers</strong>. That's important.

Being a good JavaScript developer before you start writing your application is the key to building good large applications. <em>It's not what library you use. </em>This is why I write about inheritance in JavaScript for the majority of my large jQuery apps articles. It's the JS people need to learn. In fact, I'd imagine there'd be some insanely backwards code from people using Dojo who didn't know what they were doing. You have to remain level-headed, though, and try to evaluate the tools without bringing in your past experiences with other developers. You can certainly choose Dojo to get away from jQuery noobs, but recommending Dojo to jQuery noobs is just bringing your problem along with you.

<strong>Roll it.</strong>

Aiight, with all that out of the way (yikes), let me give my most objective reasoning possible for why I think it's ok to use jQuery in a large app. Please keep in mind that I'm not advocating against Dojo or YUI3, I'm advocating against the absolute notion that 'jQuery should never be used for large applications.' Use what you prefer, of course.

Rebecca's core argument against rolling your own jQuery large app is that 1) no one else knows your code-base, so supporting is harder, and 2) the solutions in a library like Dojo are built to work together by smart people who have thought long and hard about the problems, and rolling your own are more fragile and can cause issues with upgrade paths and compatibility, etc. These are valid points, but I think they are painted with a narrow frame of reference for the type of app structure you might use in a large jQuery app.

It's common knowledge that a separation of concerns is key to any large application. Loose-coupling is something that I've blogged extensively about in the past. If you have a problem updating a portion of your application, it's because you wrote it too coupled. This is not unique to jQuery. Dojo's API stays about as backwards-compatible as they come (seriously), but that doesn't mean your old code will just work. In fact one of the few experiences I've had with DojoX code is that some of the less popular DojoX modules often need changes to return the correct values, or not throw errors. The core of the library, has been significantly more impressive in regards to this, but we're talking about code that <em>you </em>write, not the library core.  I am a fan of Dojo's backwards compatibility efforts over jQuery's. Changing an API in a point release isn't always the most friendly change for devs.

Her list of requirements for a large app is well considered. It is a comprehensive list of things that often come in handy when building a large application. All of these things have been answered by smart people, in the JavaScript community. Much like her example with templating, you can decide which pieces to use (except, directly, not with library specific code...). Instead of overriding Dojo.templated you just change out the contents of your template rendering function with the new one. If you correctly loosely-coupled your application, then 'yay', you switched out a part of your app in less lines of code!

Here's the list of things that she'd expect from a framework, along with the appropriate solutions I'd consider:
<ul>
	<li><strong>DOM manipulation tools</strong> - jQuery core</li>
	<li><strong>Ajax tools</strong> - jQuery core</li>
	<li><strong>A dependency management and build system</strong> - RequireJS</li>
	<li><strong>Clear patterns for code organization, such as namespaced modules</strong> - The module pattern and a few object literals</li>
	<li><strong>An inheritance system, preferably one that offers multiple inheritance, for sharing code across modules and staying DRY</strong> - modules +$.extend</li>
	<li><strong>A non-DOM-centric, loosely coupled API for communication between modules</strong> - pub/sub || custom events</li>
	<li><strong>A widget system that makes use of the inheritance system, with lifecycle management (setup/teardown) and templating</strong> - $.fn + mustache/microtemplates</li>
	<li><strong>A system for maintaining templates separate from JavaScript while interning them into the build to eliminate HTTP requests</strong> - &lt;script "text/html"&gt; + text!requirejsdependency</li>
	<li><strong>A system for abstracting RESTful server communication</strong> - assumes you <em>want</em> REST - but $.ajax usually works anyways...</li>
	<li><strong>For a UI-intensive project, a rich widget system pluggable to arbitrary data sources and designed with an easily-extended API</strong> - jQuery UI or ExtJS on jQuery</li>
	<li><strong>For an enterprise project, a11y and i18n provisions, as well as clear patterns for file organization </strong>- jQuery UI has many of these, you can also build them in. Require dictates some directory structure.</li>
</ul>
These requests are pretty obviously skewed to someone who likes working in Dojo. They are all pretty awesome ways to do things, but to say that you needed the module pattern is to entirely overlook other very valid ways of structuring complex code. Of course Dojo offers ways to do things like event-oriented programming over object-oriented. The point here is that, if Dojo has answered every question, and jQuery and friends has also answered every question (perhaps not in the same place), it's going to be <em>just as hard</em> to pick up the code base and figure out what's going on. I could structure my Dojo app in a way that Rebecca doesn't like, and use template overrides for template-languages that she despises, and I could tightly couple my dom elements and their attributes to my data, and it'd all be in beautiful Dojo. That Dojo has answered all the questions does not facilitate that you understood those answers or that you agree with them.

<strong>The positives</strong>

I somewhat reject the notion that using jQuery, Underscore, Require, Mustache, and the module pattern (as facilitated by Require) is "rolling your own." Sure you piece them together, by choosing how you use them, but you do the exact same thing when you choose how you use the various parts of Dojo. I think that all of these tools are as strong as the Dojo alternatives. You can argue that you could use any of these tools with Dojo because it's so flexible that you can put anything in, but then you can't argue that 'rolling your own' is bad, because that's what you just did. Either use Dojo, or agree that sometimes, it's not that bad to pull in a different way of thinking, you can't have it both ways.

jQuery normalizes things across browsers when you need it to, and serves as a mostly-fantastic way of doing dom-manip and ajax. If you use it according to it's strengths, you still can choose some really strong software alongside it that was specifically designed to be awesome at what it does.

Underscore gives you a very solid utility library, much like you'd find in Dojo, and it's extensible to boot. You can use it in two of the major paradigms natively, and it falls back to native implementations when it can. It's hardly fragile, and it's insanely easy to integrate into your project. It's no worse or better than Dojo's offering.

RequireJS is likely going to be <em>used </em>in Dojo 2.0 and James Burke, who wrote Require, also wrote most of the Dojo dependency management system. Require incorporates all the sweet stuff from Dojo, plus some really awesome future stuff coming from the CommonJS peeps. Some apps, though, don't require a ton of dependency management. Single page apps are likely not going to be terribly dependency heavy, and if you want... you can leave out the dependency management system all-together, and still use your modules, just like you always wanted. You can switch it out for LabJS if you want speed too.

Templating was the example that Rebecca used to show that she could roll her own templating style in Dojo. She used mustache instead of the default Dojo offering. I can't argue against that. I'm in favor of pulling together the correct tools for the job.

A lot of what is nice about Dojo, is it's prescribed format for creating modules. There's quite a bit of flexibility, but anyone who could understand the way that Dojo does this could easily understand some of the basic underlying patterns that it's enhancing. I can use object.create and the module pattern to my hearts content to structure my app, and that's not some 'wild tangent' that no one will ever be able to unravel. It's a simple, and common pattern that you'd be required to understand to use the Dojo method. Sure there's no prescribed way to exactly structure this, but that's the case with the 'extremely flexible' Dojo offering as well.

I'm not advocating creating super complex alternatives to Dojo's module structure. I think JavaScript offers a simple and flexible interface to creating and manipulating objects. I can choose which ever way I'd like. The module pattern is 2 pages of of text and code examples in The Good Parts. Just go read that.

<strong>TL;DR</strong>

Dojo is a fantastic library that I would encourage you to pick up and add to your skillset. jQuery can be a fantastic tool to use as well. "Rolling Your Own" application with good tools alongside jQuery is no harder to understand than a Dojo app, nor is it harder to support, and it's likely more specific to your needs. The fragile part of your code isn't in the tools you use, it's in the code that you write around them.

I wish we'd focus less on whether jQuery or LibX was a good or bad choice for large applications, and focus on the fact that people who don't know <strong>JavaScript</strong> are never going to write well-structured apps. Anyone who does understand the fundamental concepts behind JavaScript would be able to do it well with or without Dojo. Your language should provide your structure, and your toolkits should dictate your tools on top of that structure.

Learn JavaScript first. Then care about large apps. Then make a smart decision, according to your preferences, on which, if any, library you want to use.

-Slex
