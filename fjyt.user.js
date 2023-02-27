// ==UserScript==
// @name         Firejail :: YT Handler
// @description  Relay Youtube URL's to external firejailed media player.
// @include      *
// @grant        none
// ==/UserScript==

const keywords = [
  '.youtube.com',
  '.youtu.be']

for (let i = 0; i < keywords.length; i++) {
  // TODO regex
  for (const elem of document.querySelectorAll('a[href*="' + keywords[i] + '"]')) {
    url = new URL(elem.href);
    if (url.origin.endsWith('.com')) {
      //elem.href = 'fjyt://' + elem.href
      elem.href = fjURL(url);
    } else {
      // TODO regex
      if (url.pathname.includes('embed') ||
          url.pathname.includes('watch')) {
        //elem.href = 'fjyt://' + elem.href
        elem.href = fjURL(url);
      }
    }
  }
}

// Turn YT links into custom fjyt protocol URL's
function fjURL(url) {
  url.protocol = 'fjyt:';
  url.toString();
  return url
}
