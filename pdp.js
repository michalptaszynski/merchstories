(function () {
  var stageMedia = document.getElementById('pdpStageMedia');
  var swatches = Array.prototype.slice.call(document.querySelectorAll('.pdp__swatches .swatch'));
  var colorLabel = document.getElementById('pdpSwatchLabel');
  var prevBtn = document.getElementById('pdpPrev');
  var nextBtn = document.getElementById('pdpNext');

  var currentIndex = swatches.findIndex(function (s) { return s.classList.contains('is-active'); });
  if (currentIndex < 0) currentIndex = 0;

  function setActive(index) {
    currentIndex = (index + swatches.length) % swatches.length;
    var swatch = swatches[currentIndex];
    swatches.forEach(function (s) { s.classList.remove('is-active'); });
    swatch.classList.add('is-active');
    if (stageMedia && swatch.dataset.img) stageMedia.style.backgroundImage = "url('" + swatch.dataset.img + "')";
    if (colorLabel) colorLabel.textContent = swatch.dataset.color;
  }

  swatches.forEach(function (swatch, i) {
    swatch.addEventListener('click', function () { setActive(i); });
  });
  if (prevBtn) prevBtn.addEventListener('click', function () { setActive(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { setActive(currentIndex + 1); });

  var sizes = Array.prototype.slice.call(document.querySelectorAll('.pdp__size'));
  sizes.forEach(function (size) {
    size.addEventListener('click', function () {
      sizes.forEach(function (s) { s.classList.remove('is-active'); });
      size.classList.add('is-active');
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
