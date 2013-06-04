---
layout: post
title: "Introducing The Jed Toolkit"
date: 2012-10-06 11:24
comments: true
categories: i18n, javascript, jed
---

## The Jed Internationalization Toolkit

The Jed Toolkit is a collection of interoperable tools to help facilitate
the full process of internationalizing applications in JavaScript.
These tools have a wide range of utility, from small modules to help
format messages, dates, and numbers to services that facilitate translation,
and code integration. The goal of the project is to bring the experience and 
quality of internationalizing JavaScript applications up to par with the rest
of the current state of JavaScript tooling.

I'm in the process of moving everything over, but you'll likely want to watch
this space: [github.com/jedtoolkit](https://github.com/jedtoolkit) and [jedtoolkit.org](http://jedtoolkit.org)

## The Dojo Foundation and Future

I'm excited that The Jed Toolkit has been accepted into the Dojo Foundation so
its users can be sure that it will be a safe, unencumbered resource for them
into the future. I'm extremely happy to be part of a family that includes
require.js, sizzle, and the dojo toolkit.

After being tasked with internationalizing a large application that I was building
I quickly realized that there was little available for JavaScript developers. I had
been using Gettext in a python application a few weeks prior, and decided it might be nice to
implement in JavaScript. So I did. I called it "[Jed](https://github.com/jedtoolkit/Jed)" (soon to be gettext2.js) after
[Jed Schmidt](https://twitter.com/jedschmidt), everybody's favorite "hobbyist" JavaScripter / Japanese translator.

I was drawn to this problem because there were so few people considering its intricacies, but
I was shown by some very smart folks that there was a lot more to internationalization than
the little library I wrote. So I wrote another library, and ported a few others.

I was quite happy with how these were turning out. They weren't especially hard to create,
because most of them follow well-documented specifications. I really liked how ICU
MessageFormat made a lot of decisions based on how translators think, instead of how
programmers think. But naturally, they locked away that goodness behind a syntax/grammar
that no non-programmer should ever have to deal with. MessageFormat is great for translations
but not for translators. Not in the real world at least. That's when I realized that the problem was not (only) the tools for _writing_
international apps, but even deeper: in the tools and integration with translators.

## It's all about tools

The translation space hasn't grown much since computers first existed.
We can barely encode files correctly in 2012. However, in other spaces, like content authoring,
we have a whole system of tools and integrations to map non-technical users' intent to structured
usable data for consumption. If your local tech writer wants to start a blog, they can! They
don't need to know how to set up a server or that HTML even exists.

The process of getting an app translated is cumbersome, and is a blocker to getting
good applications out there. FTP zips and crazy XML specs mixed with Word Documents rule
the landscape. There are no decent apis, or automatic integrations that anybody is using
at scale. I want to set out to change this.

Translators aren't all to blame. If you were a translator and got the message "fair", would
you translate it as a carnival, or as 'just'? We set our translators up for failure with
our context. We can do better. We can describe messages, and their variables. We can offer
examples and photos of the context. We can even translate the app in real time and they
can see their translation literally running in the place it will live.

The goal of the Jed I18n Toolkit is to help make the internationalization process much more
accurate and enjoyable for all parties. We should be able to write our messages directly in our templates
in whatever format we think is best. Our messages should be automatically culled, and deduped
and sent into a translation queue. The translator shouldn't be presented with anything other than
things that help them translate. The programmer's format should be irrelevant. Context is king, and
a bunch of crazy sprintf characters and html are just noise. When the translations are done, they should exist as
a service or api and be updated in real time. Gone should be the days of the 2 month translation code freeze.
You should be able to write a post commit hook that gets your translations through the system as fast
as you can find someone to translate them.

There's a lot to decide on how to bring all of these ideas into the project in a generic, but still
usable way, and it will take some time to get everything right. Right now I'm starting by putting
in the few open source projects that are already out there as well as showing early beta work on some
of the integration tools. Please be patient with me and send me your suggestions and frustrations
so we can finally bring internationalization out of the dark ages.

