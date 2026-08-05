(function () {
  var swatches = Array.prototype.slice.call(document.querySelectorAll('.pdp__swatches .swatch'));
  var colorLabel = document.querySelector('.pdp__swatch-label');
  var stageMedia = document.querySelector('.pdp__stage-media');

  swatches.forEach(function (swatch) {
    swatch.addEventListener('click', function () {
      swatches.forEach(function (s) { s.classList.remove('is-active'); });
      swatch.classList.add('is-active');
      if (colorLabel) colorLabel.textContent = swatch.dataset.color;
      if (stageMedia && swatch.dataset.img) stageMedia.style.backgroundImage = "url('" + swatch.dataset.img + "')";
    });
  });

  var accordions = Array.prototype.slice.call(document.querySelectorAll('.pdp__accordion'));
  accordions.forEach(function (accordion) {
    var toggle = accordion.querySelector('.pdp__accordion-toggle');
    toggle.addEventListener('click', function () {
      accordion.classList.toggle('is-open');
    });
  });
})();
