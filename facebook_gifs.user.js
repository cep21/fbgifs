// ==UserScript==
// @name           Facebook gif shower
// @description	   Render gif below gif links
// @author         Jack Lindamood
// @include        https://www.facebook.com/groups/animatedgifs
// @include        http://www.facebook.com/groups/animatedgifs
// ==/UserScript==

alert("Hello from script");

(function() {
  linked_before = []
  var imgs = document.images;
  for (var i = 0; i < imgs.length; i++) {
    var src_link = imgs[i].src
    linked_before[imgs[i].src] = true;
    if (src_link.indexOf("safe_image.php") > -1) {
      src_link = unescape(src_link.substr(src_link.indexOf('url=') + 4))
      imgs[i].src = src_link.replace(/\+/g, '%20');
      linked_before[imgs[i].src] = true;
    }
  }

  var links = document.links;
  for (var i = 0; i < links.length; i++) {
    var src_link = links[i].href
    if (src_link.indexOf(".gif") == src_link.length - 4) {
      if (typeof(linked_before[src_link]) == 'undefined') {
        var imgEle = document.createElement('img');
        imgEle.src = src_link;
        links[i].parentNode.appendChild(imgEle);
        linked_before[links[i].href] = true;
      }
    }
  }
})();
