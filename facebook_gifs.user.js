// ==UserScript==
// @name           Facebook gif shower
// @description	   Render gif below gif links
// @author         Jack Lindamood
// @include        https://www.facebook.com/groups/animatedgifs*
// @include        http://www.facebook.com/groups/animatedgifs*
// ==/UserScript==

var linked_before = [];
[].forEach.call(document.images, function(image) {
  var src = image.src;
  if (src.indexOf('safe_image.php') !== -1) {
    var index = src.indexOf('url=') + 4;
    image.src = decodeURIComponent(src.substr(index)).replace(/\+/g, '%20');
  }
  linked_before[image.src] = true;
});

[].forEach.call(document.links, function(link) {
  if (!linked_before[link.href] && link.href.substr(-4) === 'gif') {
	  console.log(link.href);
    var image = document.createElement('img');
    image.src = link.href;
    link.parentNode.insertBefore(image, link.nextSibling);
    linked_before[link.href] = true;
  }
});
