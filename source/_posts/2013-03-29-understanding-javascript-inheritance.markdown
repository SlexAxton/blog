---
layout: post
title: "Understanding JavaScript Inheritance"
permalink: /blog/2013/04/understanding-javascript-inheritance/
date: 2013-04-12 03:33
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

So let's say we want to make an `Animal` class in our code. As is often necessary in production JavaScript applications.

First we make a "constructor function," which acts kind of like a constructor method on the inside of a class in a classical
language when it's invoked with the `new` operator. Except this one is on the outside.

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

And you eventually simply converge on the...

## The Father/Son Analogy Play

Here we go. Finally a **real world** example of 'instances begetting instances.' It'll be a perfect analogy.
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
// Instantiate him
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

Let's try to smooth things out to make the analogy work better. So we'll instantiate objects without
a name and have a parent name them after they're created.

```javascript
// Wrap it all together
function makeBaby(parent, name) {
  // Instantiate a new object based on the parent
  var baby = Object.create(parent);

  // Set the name of the baby
  baby.name = name;

  // Give the baby away
  return baby;
}
```

Perfect. Now the baby can `sayHi` on its own.

```javascript
var alex = makeBaby(myDad, 'Alex Sexton');

alex.sayHi();
// "Hello, I'm Alex Sexton"
```

Err. **yipes**. Babies can't talk. And what's this deal with a baby being made by **one** parent. Not to worry,
we can fix all of this.

First we'll probably want to try to take two parents into the `makeBaby` function (no giggles).

```javascript
function makeBaby(father, mother, name) {
  var baby = Object.create(...// fuuu
}
```

Multiple Inheritance! How did *you* get here? Ugh. Fine. We'll just simply mock the human chromosome pattern into
our little inheritance example.

```javascript
// Let's take a set of 4 genes for ease of
// example here. We'll put them in charge
// a few things.
function Human (name, genes_mom, genes_dad) {
  this.name = name;
  
  // Set the genes
  this.genes = {
    darkHair: this._selectGenes(genes_mom.darkHair, genes_dad.darkHair),
    smart:    this._selectGenes(genes_mom.smart,    genes_dad.smart),
    athletic: this._selectGenes(genes_mom.athletic, genes_dad.athletic),
    tall:     this._selectGenes(genes_mom.tall,     genes_dad.tall)
  };

  // Since genes affect you since birth we can set these as actual attributes
  this.attributes = {
    darkHair: !!(~this.genes.darkHair.indexOf('D')),
    smart: !!(~this.genes.smart.indexOf('D')),
    athletic: !!(~this.genes.athletic.indexOf('D')),
    tall: !!(~this.genes.tall.indexOf('D'))
  };
}

// You don't have access to your own gene selection
// so we'll make this private (but in the javascript way)
Human.prototype._selectGenes = function (gene1, gene2) {
  // Assume that a gene is a 2 length array of the following possibilities
  // DD, Dr, rD, rr -- the latter being the only non "dominant" result

  // Simple random gene selection
  return [ gene1[Math.random() > 0.5 ? 1 : 0], gene2[Math.random() > 0.5 ? 1 : 0] ]
};

Human.prototype.sayHi = function () {
  console.log("Hello, I'm " + this.name);
};

function makeBaby(name, mother, father) {
  // Send in the genes of each parent
  var baby = new Human(name, mother.genes, father.genes);
  return baby;
}
```

**Elementary**. My only beef is that we no longer are using real prototypal inheritance.
There is no live link between the parents and the child. If there was only one parent,
we could use the `__proto__` property to set the parent as the prototype after the
baby was instantiated. However we have two parents...

So we'll need to implement runtime getters that do a lookup for each parent via
[ES Proxies](http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies).

```javascript
function makeBaby(name, mother, father) {
  // Send in the genes of each parent
  var baby = new Human(name, mother.genes, father.genes);

  // Proxy the baby
  return new Proxy(baby, {
    get: function (proxy, prop) {
      // shortcut the lookup
      if (baby[prop]) {
        return baby[prop];
      }

      // Default parent
      var parent = father;

      // Spice it up
      if (Math.random() > 0.5) {
        parent = mother;
      }

      // See if they have it
      return parent[prop];
    }
  });
}
```

So now we support live lookups of parents, and, you know, some simplified genetics.

Isn't that just a simple, well-defined, example of how straightforward inheritance can be in
JavaScript?

## Conclusion

Sometimes these analogies get pretty crazy in my head, and I start to think that maybe
instead of trying to apply known examples in the outside world in order to help people
understand, it's often better to just let someone know why they might wanna use
inheritance in their programs!

I personally find the best Prototypal Inheritance analogy to be:

```javascript
var defaults = {
  zero: 0,
  one: 1
};

var myOptions = Object.create(defaults);
var yourOptions = Object.create(defaults);

// When I want to change *just* my options
myOptions.zero = 1000;

// When you wanna change yours
yourOptions.one = 42;

// When we wanna change the **defaults** even after we've got our options
// even **AFTER** we've already created our instances
defaults.two = 2;

myOptions.two; // 2
yourOptions.two; // 2
```

So stop making everything so confusing and go program cool stuff, and ignore
my old presentations when I used these analogies.

<3z
