---
layout: post
title: "Invalid JSON in jQuery 1.4 and beyond"
date: 2010-01-25
comments: true
categories: [ "javascript", "jquery" ]
---

I'm pretty happy about jQuery's move to only supporting valid JSON, as well as it's standardization across browsers to enforce that rule, even if native JSON parsing isn't being used. I think it's silly for people to expect things to work when they are passing invalid data back and forth. Much like no one would dare write invalid xml documents for data transfer, the same should be applied to the JSON data format. Simply put, if you aren't conforming to the JSON Standards as defined on <a href="http://json.org/">http://json.org/</a> - then you aren't using JSON. You are just passing Javascript source-code back and forth. I wouldn't suggest it.

Now, I understand there are a variety of libraries and services that currently break the standard. I would strongly suggest you write to them and demand that they follow the spec. Nothing should break for their users, so it's not much too ask. Until then I wrote this little lovely plugin so you could consume criminal data sources until they get their acts together:

``` javascript
jQuery.getInvalidJSON = function(url, data, callback) {
  return jQuery.get(url, data, function(d){
    callback.call(this, (new Function('return ' + d))());
  }, "text");
};
```

This is just an unsafe eval of Javascript source that is unwisely used as a data exchange format. I don't think it belongs in jQuery, but if you are of the unlucky few that are forced to receive invalid JSON don't let it stop you from upgrading to 1.4.

<3z
