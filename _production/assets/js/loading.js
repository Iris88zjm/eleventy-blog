const supportLoading = 'loading' in HTMLImageElement.prototype;
// console.log(supportLoading);
let targetSpan = document.getElementById('boolean');
targetSpan.innerHTML = supportLoading;

if (supportLoading) {
  const imgTag = document.querySelectorAll('img[loading="lazy"]');
  imgTag.forEach(function(img) {
    let pictureTag = img.parentNode.children;
    for (var i = 0; i < pictureTag.length; i++) {
      if (pictureTag[i].dataset.srcset) {
        pictureTag[i].srcset = pictureTag[i].dataset.srcset
      }
      if (pictureTag[i].dataset.src) {
        pictureTag[i].src = pictureTag[i].dataset.src
      }
    }
  })
} else {
  const script = document.createElement('script');
  script.src = '/assets/js/lazysizes.min.js';
  document.body.appendChild(script);
}