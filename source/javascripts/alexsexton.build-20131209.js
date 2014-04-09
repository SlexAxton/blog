/* disqus shortname */
var disqus_shortname='slexblog';
var as_d1 = document.getElementById('disqus_identifier');
var as_d2 = document.getElementById('disqus_url');
if (as_d1 && as_d2) {
  var disqus_identifier=as_d1.getAttribute('data-url').replace(/^https/,'http');
  var disqus_url=as_d2.getAttribute('data-url').replace(/^https/,'http');
  var disqus_script='embed.js';
  (function(){var dsq=document.createElement('script');dsq.type='text/javascript';dsq.async=true;dsq.src='https://'+disqus_shortname+'.disqus.com/'+disqus_script;(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(dsq);}());
}
/* twitter */
(function(){var twitterWidgets=document.createElement('script');twitterWidgets.type='text/javascript';twitterWidgets.async=true;twitterWidgets.src='https://platform.twitter.com/widgets.js';document.getElementsByTagName('head')[0].appendChild(twitterWidgets);})();
// Rewritten version
// By @mathias, @cheeaun and @jdalton
// Source url: https://gist.github.com/901295
(function(doc){var addEvent="addEventListener",type="gesturestart",qsa="querySelectorAll",scales=[1,1],meta=qsa in doc?doc[qsa]("meta[name=viewport]"):[];function fix(){meta.content="width=device-width,minimum-scale="+scales[0]+",maximum-scale="+scales[1];doc.removeEventListener(type,fix,true)}if((meta=meta[meta.length-1])&&addEvent in doc){fix();scales=[.25,1.6];doc[addEvent](type,fix,true)}})(document);
/* ganalytics */
var _gaq=_gaq||[];_gaq.push(['_setAccount','UA-406505-7']);_gaq.push(['_trackPageview']);(function(){var ga=document.createElement('script');ga.type='text/javascript';ga.async=true;ga.src=('https:'==document.location.protocol?'https://ssl':'http://www')+'.google-analytics.com/ga.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);})();

