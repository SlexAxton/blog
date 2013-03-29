---
layout: post
title: "Understanding JavaScript Inheritance"
permalink: /blog/2013/03/understanding-javascript-inheritance/
date: 2013-03-29 01:33
comments: true
categories: ["javascript", "inheritance"]
---

So someone shoulder-taps you and asks you to explain the concepts behind JavaScript Inheritance to them. In my eyes you've 
got a few options.

## The Terminology Play

You mention that it's [**prototypal**](https://www.google.com/search?q=define%3A+prototypal) inheritance, not **prototypical**
and pretty much gloss over the rest, comfortable in your superiority in terminology. You may go as far as saying "Objects just
come from other Objects because there aren't any classes." Then you just link to
[Crock's Post](http://javascript.crockford.com/prototypal.html) on it, and try to seem busy for the next few days.

Many years later you find out that **Prototypal** and **Prototypical** are synonyms, but you choose to ignore this.

## The Like-Classical-Inheritance-But-Different Play aka the Run-On Sentence Play

"So in Java, like, you have classes or whatever, right? Well so imagine that you don't have those, but you still want to do
that same type of thing or whatever, so then you just take another object instead of a class and you just kind of use it
like it's a class, but it's not because it can change and it's just a normal object, and if it changes and you don't override
the object, oh yea, so you can decide to override the parent object class thing, so if you dont do that and the parent changes
the link is live..." 

And so forth.

## The Animal Play

This is a pretty popular one.

So let's say we want to make an `Animal` class in our code.

First we make a "constructor function," which acts kind of like a constructor method on the inside of a class in a classical
language when it's invoked with the `new` operator.

```javascript
function Animal (name) {
  this.name = name;
}

var myAnimal = new Animal('Annie');
```

Then we want to have actions that all animals can do.

```javascript
Animal.prototype.walk = function () {
  console.log(this.name + ' is walking.');
};
```

But then you want to define a more specific *type* of animal. Things start to get weird.

```javascript
// I think we need to define a new Animal type and extend from it somehow

function Dog (name) {
  this.name = name;
}

// BUT HOW DO WE EXTEND
// WITHOUT AN INSTANCE TO USE?
Dog.prototype = Animal.prototype; // ?? I HAVE NO IDEA
// Maybe that'll work for some stuff?
// ProHint™: probably not much, once you start modifying one of them :D
```

Then you remember that Prototypal Inheritance doesn't really do 'classes' so much. So you do something like this:

```javascript
var Dog = new Animal('Annie'); // ??? NO THATS NOT IT >:(

// Maybe we can try Object.create? I hear it's prototypal-y
var Dog = Object.create(Animal);

// Maybe that worked? Let's see...
var myDog = new Dog('Sparky');
// TypeError: object is not a function

// Shucks
```

So you move on to my main reason for bringing up this topic to begin with...

## The Father/Son Analogy Play

Here we go. Finally a real world example of 'instances begetting instances.' It'll be a perfect analogy.
It's even an interview question some places. Let's see how we might implement the relationship of a father
and son (or a parent to its child) in JavaScript.

We'll start out like we did before, with a Human constructor

```javascript
function Human( name ) {
  this.name = name;
}
```

Then we'll add in a common human shared action.

```javascript
Human.prototype.sayHi = function () {
  console.log("Hello, I'm " + this.name);
};
```

So we'll create my dad first.

```javascript
// Insantiate him
var myDad = new Human('Bill Sexton');

// Greet him
myDad.sayHi();
// "Hello, I'm Bill Sexton"
```

**Score.** Now let's create me.

```javascript
// Let's use ES5 `object.create` in order to be as 'prototypal' as possible.
var me = Object.create(myDad);
me.saiHi();
// "Hello, I'm Bill Sexton"
```

It's a start! Seems like I inherited a little too much from my dad, but I inherited, none the less.







