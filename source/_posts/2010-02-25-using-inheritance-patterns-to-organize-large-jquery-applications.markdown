---
layout: post
title: "Using Inheritance Patterns to Organize Large jQuery Applications"
date: 2010-02-25 01:27
comments: true
categories: [ "javascript", "inheritance", "jquery" ]
---

<img style="float: left; margin: 0 10px 10px 0;width:200px;height:150px;" src="https://alexsexton.com/wp-content/uploads/will.jpg" alt="Last will and testament - lolz" />
I want to introduce/reinforce a pattern for developing large applications with jQuery. I did not invent any of this, but I find that the resources that describe this technique are few and far-between.- so I'm taking a shot at it.

By and large, when using jQuery, developers seem to forget the paradigms they learned for well structured code in other languages. This is likely due to the fact that jQuery is effectively neutral when it comes to your structural methodology or inheritance patterns, and therefore doesn't push someone in any one direction. Many times in other libraries (See Dojo Declare/Provide/Require, or MooTools Class, etc.), a paradigm is used and exclusively offered, and then code generally ends up more uniform than the oh-so-common-massive-jquery-indented-chains that I'm sure you've seen .

I'm not going to necessarily suggest that you use any single inheritance pattern, as there are many options, and each makes sense for different people and different situations. I do however suggest that you know your options. There are a few good reads on the topic of Inheritance in javascript, and I would strongly suggest people read at least a bit of the following:

* [Javascript: The Good Parts (Chapter 5)](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742) -Douglas Crockford
* [Prototypal Inheritance in Javascript](Javascript: The Good Parts (Chapter 5)) -Douglas Crockford
* [Object-Oriented Javascript](http://www.amazon.com/Object-Oriented-JavaScript-high-quality-applications-libraries/dp/1847194141) -Stoyan Stefanov
* [Javascript Override Patterns](http://webreflection.blogspot.com/2010/02/javascript-override-patterns.html) -Andrea Giammarchi
* [Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) -John Resig

Choosing your form of modularity is an important step. If you come from a background of highly-classical inheritance (I learned Java in school, so...I know that world) then perhaps starting with a classical implementation is going to be your best choice. If you are trying to stay slim and do the things a little more in the "JavaScript way" (a term that means essentially nothing), then you might try to use prototypal inheritance. For my examples, any form of inheritance will at least work on most accounts.

I'll jump straight to a code example of this technique in use, and then describe it's setup and structure:

```html
<!-- Just an empty div to begin with -->
<div id="mySpeaker"></div>
```

Then we'll run our javascript:

```javascript
$(function(){
  // Call a custom plugin for your object on a dom element
  $('#mySpeaker').speaker({'name': 'Alex'});

  // Have quick access to the actual speaker object
  var mySpeaker = $('#mySpeaker').data('speaker');

  // The interface of the object that you build can
  // wrap more complex dom manipulations that are
  // separated from actual program logic.
  mySpeaker.speak('I am a speaker.'); // Results in a dom update

  // This shows automatic access to correct element in the dom
});
```

And the html now looks more like this:

```html
<div id="mySpeaker">
  <h1>Alex</h1>
  <p>I am a speaker.</p>
</div>
```

The key here is that we didn't have to call something like <strong>$elem.append('Alex')</strong> nor did we even have to consider what would happen when a <strong>speaker</strong> object was called with the <strong>speak()</strong> function. I consider this to be the key to modular development. This level of abstraction helps keep the <strong>how</strong> and the <strong>what</strong> separated (or "loosely coupled" - if you like buzzwords). The other thing that was important to note is that after we instantiate the plugin, we have a clear two-way path between our Object and our Dom Element - both have an easy way to immediately access the other. This is important, because we often have different points of entry to jump-start a routine, so being able to access the part that you need quickly and easily is important.

Implementing this technique is pretty simple, and should actually take less brain power to set up than traversing through the dom in your head to figure out a crazy chain.

Let's start with the <strong>Speaker</strong> object.

```javascript
/**
 * Object Speaker
 * An object representing a person who speaks.
 */
var Speaker = {
  init: function(options, elem) {
    // Mix in the passed in options with the default options
    this.options = $.extend({},this.options,options);

    // Save the element reference, both as a jQuery
    // reference and a normal reference
    this.elem  = elem;
    this.$elem = $(elem);

    // Build the dom initial structure
    this._build();

    // return this so we can chain/use the bridge with less code.
    return this;
  },
  options: {
    name: "No name"
  },
  _build: function(){
    this.$elem.html('<h1>'+this.options.name+'</h1>');
  },
  speak: function(msg){
    // You have direct access to the associated and cached jQuery element
    this.$elem.append('<p>'+msg+'</p>');
  }
};
```

I use an object literal here which puts me in the Prototypal Inheritance camp, I believe, but this is just an easily digestible pattern.

As you can see, there are easy-to-read, small functions, that have a clear purpose. In our use of this pattern, we call api type methods like <strong>speak()</strong> but not necessarily an internal method (like <strong>_build</strong>). You can hide your internal functions either by naming convention (not really hiding them), or by using something like the module pattern. In our simple example, I have just added an underscore to the beginning of the function to indicate that it's private.

Code that is organized like this is much easier to test and to change/read. This also allows you to change the way things function without changing the way that the Object api is used. For instance, we could change the <strong>speak</strong> method to alert the string instead of append it to the related element. We would have to change the internals of the <strong>speak</strong> function, but we could keep our call to it the same.

The bridge that we build is probably the most interesting part of this pattern. It's a different approach than many of the popular plugins take (slightly different than jquery ui), but it has a few really great benefits.

The most simple way to do this is by hand:

```javascript
// Make sure Object.create is available in the browser (for our prototypal inheritance)
// Courtesy of Papa Crockford
// Note this is not entirely equal to native Object.create, but compatible with our use-case
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {} // optionally move this outside the declaration and into a closure if you need more speed.
        F.prototype = o;
        return new F();
    };
}
(function($){
  // Start a plugin
  $.fn.speaker = function(options) {
    // Don't act on absent elements -via Paul Irish's advice
    if ( this.length ) {
      return this.each(function(){
        // Create a new speaker object via the Prototypal Object.create
        var mySpeaker = Object.create(Speaker);

        // Run the initialization function of the speaker
        mySpeaker.init(options, this); // `this` refers to the element

        // Save the instance of the speaker object in the element's data store
        $.data(this, 'speaker', mySpeaker);
      };
    }
  };
})(jQuery);
```

And that's it!

Now you have separated the creation of the plugin from the actual code itself. You are using the plugin to attach objects (with any inheritance patten) to dom elements and visa versa, but the plugin itself is just the connection and initialization code. This means that we could generalize this process further. I first saw this from Scott Gonzalez (of the jQuery UI team) and his code later became the 'widget factory' in jQuery UI. I prefer to not pass strings into my plugins in order to call functions, but it's a valid approach as some people would take issue with having to pull out the object each time they started with a dom element.

Here is some code that might get you started writing/using a 'bridge' function (bridge is what's found now in jQuery UI 1.8) that can help you attach your general code with a given plugin (since writing that same initialization plugin code multiple times would get old and defeat the whole DRY principle that our inheritance model has hopefully provided). This code is mostly courtesy of Scott Gonzalez because I couldn't think of a more stripped down elegant approach to this. I changed it to accept Objects instead of Constructor Functions because that works a little better with my example (prototypal inheritance). I also force it to call my <strong>init</strong> function in order to save myself an extra call. (<a href="http://pastie.org/517177">This example</a> shows Scott's use of this method along with John Resig's Simple-Inheritance implementation - also very cool.)

```javascript
$.plugin = function(name, object) {
	$.fn[name] = function(options) {
                // optionally, you could test if options was a string
                // and use it to call a method name on the plugin instance.
		return this.each(function() {
			if ( ! $.data(this, name) ) {
				$.data(this, name, Object.create(object).init(options, this));
			}
		});
	};
};

// With the Speaker object, we could essentially do this:
$.plugin('speaker', Speaker);

// At this point we could do the following
$('#myDiv').speaker({name: "Alex"});
```

That's about all there is to it. I'd encourage you to pick some pattern for your development that isn't just inline chaining of jQuery function calls. This way of breaking up and organizing functionality in your code serves as a quick and easy jumping-off point for testing and modularity. It's much easier to test the individual functions of a modular object than it is to write tests for a single-line chain of jQuery calls.

Also, I do get some feedback along the lines of "well, my code is not a plugin" - "this isn't applicable to my code" - but I usually tend to disagree. The stigma that a jQuery plugin has to be for general consumption is flawed. I encourage you to use the plugin architecture if you are creating functionality based on a dom element selection. For instance, if you are adding an error notification system, it would be very easy to create a notification object that attaches to a div and has the methods required for notification directly attached to it, rather than having a function that merely hides and shows random dom elements.

I am doing a round up of performance on a lot of this inheritance usage and I should get to writing another entry on that soon, but from my early tests, using reasonable inheritance is generally **not that expensive**. If you are pushing the limits of CPUs and browser rendering, you might have to make some sacrifices, but for the general case, the instantiation hit of inherited objects is probably well worth your while.

I'd love to hear about the way you approach this problem.
