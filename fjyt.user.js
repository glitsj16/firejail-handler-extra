// ==UserScript==
// @name        Firejail :: YT Handler
// @description Relay YouTube links to an external firejailed media player
// @author      glitsj16
// @copyright   2023, glitsj16
// @namespace   com.github.glitsj16.firejail-handler-extra
// @homepageURL https://github.com/glitsj16/firejail-handler-extra
// @supportURL  https://github.com/glitsj16/firejail-handler-extra/issues
// @updateURL   https://github.com/glitsj16/firejail-handler-extra/raw/master/fjyt.meta.js
// @include     *
// @grant       none
// @license     GPL-2.0-only; https://opensource.org/license/gpl-2-0/
// @icon        data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48dGV4dCB5PSIuOWVtIiBmb250LXNpemU9IjkwIj7wn5SlPC90ZXh0Pjwvc3ZnPgo=
// ==/UserScript==

/*

This userscript converts
video links as follows:

Before
https://youtu.be/zrJ2D-dAv5s

After
fjyt://youtu.be/zrJ2D-dAv5s

*/

const keywords = [
  'www.youtube.com',
  'www.youtu.be',
  'youtube.com',
  'youtu.be']

for (let i = 0; i < keywords.length; i++) {
  for (const elem of document.querySelectorAll('a[href*="' + keywords[i] + '"]')) {
    url = new URL(elem.href);
    if (url.host.match(keywords[i])) {
      // TODO use regex merge startsWith of watch and embed
      if (url.pathname.startsWith('/watch') ||
          url.pathname.startsWith('/embed') ||
          url.origin.endsWith('.be'))
      {
        elem.href = fjURL(url);
      }
    }
  }
}

// Turn link into fjyt URL
function fjURL(url) {
  url.protocol = 'fjyt:';
  url.toString();
  return url
}
