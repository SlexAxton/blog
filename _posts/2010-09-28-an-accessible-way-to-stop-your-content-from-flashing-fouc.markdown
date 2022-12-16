---
layout: post
title: "An Accessible Way To Stop Your Content From Flashing (FOUC)"
date: 2010-09-28
comments: true
categories: [ "javascript", "accessibility" ]
---

<p>There are a lot of different reasons why you might see content flash on your page before it's done loading. The flash that I'm talking about usually happens when you are trying to build a JavaScript widget that gracefully degrades when JavaScript is off. You probably feel pretty cool about yourself for writing your JS in an accessible way, but you are sad that it hurts the user experience.</p>

<p>One of the most common examples of this situation happens with tabbed interfaces, and more specifically the jQuery UI Tab widget. You give it your group of divs and links to turn them into the tabs, but that code doesn't run until domready. Before the dom is ready, you're original content all shows on the page, then when the tab code runs, it gets hidden.</p>

<p>Please don't set them to hidden in your CSS in order to stop this from happening. This hurts accessibility, SEO, and the laws of white-hat web development, because without JavaScrpt, this content can never be seen. Instead, try this little trick:</p>

``` html
<style type="text/css">
/*
Obviously this is not a real class name, but here you would just
set all the elements you want to hide as display:none.
You should probably make this style whatever the JavaScript ends
up setting them to. That way you don't accidentally add weird styles.
*/
.stuffIDontWantToFlash {
  display:none;
}
</style>

<noscript>
<style type="text/css">
/*
Inside of this noscript block, show the elements, this should behow
you want it to look for people without JS - it could even be styled
totally different for them if you'd like to lay it out differently without
tabs...
*/
.stuffIDontWantToFlash {
  display:block;
}
</style>
</noscript>
```

<p>So there. Now we're using the noscript tag to conditionally override our CSS hiding of the elements. You can technically do this with link tags as well, but since you need to put the noscript version in a separate place than the original style (which can be anywhere), it's probably not worth the extra http request. Just make sure the noscript override version runs after the initial setting. Cascading at it's finest.</p>

<p>I know what 2 of you are thinking: "OMG Gross. This does not validate, because a style tag can't be anywhere except in the head element" - well, you could put it in the head element, but that could be weird. In other words, I don't really care. It works everywhere.</p>

<p>
&lt;3z
</p>

<p>
Alex
</p>
