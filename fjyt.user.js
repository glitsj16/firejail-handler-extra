// ==UserScript==
// @name           Firejail :: YT Handler
// @description  Relay Youtube URL's to external firejailed media player.
// @include        *
// @grant           none
// ==/UserScript==

(function() {

  // turn YT links into custom fjyt protocol URL's
  for(var i = 0; i < document.links.length; i++) {
    var elem = document.links[i];

    // https://gist.github.com/brunodles/927fd8feaaccdbb9d02b
    if (elem.href.match((?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?)) {
      var orig_url = elem.href;
      elem.href = "fjyt://" + orig_url;
    }
  }

})();
