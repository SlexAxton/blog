---
layout: post
title: "Don't let document ready slow you down."
date: 2010-01-08
comments: true
categories: [ "javascript", "jquery", "performance" ]
---

I just wanted to quickly post about a common performance hit that I see in pages (including a bit of my old stuff), especially ones that load data on page load.

A common pattern for application development loads a page template with the application code included and then makes an asynchronous data request to load all the relevant data.

One example might be something like:

```html
<html>
  <head>
    <script type="text/javascript" src="jquery.js" />
    <script type="text/javascript">
      $(document).ready(function(){
        // make an ajax request once the dom is ready
        $.ajax({
          url: 'ajax.php',
            success: function(data) {
              for(var i in data) {
                $('.app-container').append('<div>'+data[i]+'</div>');
              }
            }
        });
      });
  </script>
</head>
<body class="app-container">
  // Perhaps a very large dom - which makes the page load slower
</body>
</html>
```

The problem with this is that the request for the page content isn't made until the dom is ready, but that request doesn't require the dom at all.

Instead of wrapping the $.ajax() call in a dom ready function, try just wrapping your `success` callback function in one instead. This will allow the request to fire off as soon as possible, but will ensure the handling of the data doesn't happen until your domready event has fired.

```html
<html>
  <head>
    <script type="text/javascript" src="jquery.js" />
    <script type="text/javascript">
      // make an ajax request right away
      $.ajax({
        url: 'ajax.php',
          success: function(data) {
            $(document).ready(function(){  //<-- Hey Guys check this out!
              for(var i in data) {
                $('.app-container').append('<div>'+data[i]+'</div>');
              };
            });
          }
        });
  </script>
</head>
<body class="app-container">
  // Perhaps a very large dom - which makes the page load slower
</body>
</html>
```

This should speed up the load time of your page. From my testing, there doesn't seem to be any issues with this, so I believe it's safe to use. The function will fire immediately if your domready event has already fired, and it will wait to fire if the dom isn't ready yet. You can have as many document ready calls as you want on your page without overwriting old ones, so don't worry about only defining it in one place. I would also imagine that you wouldn't need too many more than two or three if you structured your code in an intelligent way.

----

As a footnote, this is only one of many things you can do outside of dom ready to help speed up the execution of your code. If you are binding events with 'live' or if you are just defining functions, I'd suggest that you do it inside of a closure instead of inside of a dom ready function. Then put just the stuff you need to run with the dom into the dom ready function.

The reason for this is essentially the same as before. You can allocate all the function definitions and variables while the page is building, rather than afterwards. Anything that you can do asynchronously right away is going to generally be better than waiting until the document is ready. There are a few ways to make this a little better organized, but organization isn't the topic, so here is a simple example of code you might write with minimal code execution in the dom ready function. The closure that I have surrounding the entire block of code serves to make the variables have a similar scope affect as it would inside of a document ready function, though it's not absolutely necessary.

```javascript
  // This runs immediately
  $('a').live('click', function(e){
    alert('OKBYE!');
    return true;
  });

 // define functions outside of the dom ready
 function doSomething(input) {
    $('div.something').do(input);
    // you can even use functions that require the
    // dom inside of a defined function as long
    // as you don't call it until the dom is ready
    $('div.somethingelse').click(function(){
      console.log("I don't need no dom ready");
     });
  }

  // dom ready
  $(document).ready(function(){
    // Do stuff that requires the dom, and
    // use your functions from outside
    $('a.special').click(function(e){
      doSomething('special');
    });
    // yay!
  });
})(jQuery);
```

It's nothing revolutionary, but I figured I'd get it out there!
