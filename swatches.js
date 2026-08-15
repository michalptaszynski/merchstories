(function () {
  function wireSwatches(swatchList, tileSelector, mediaSelector) {
    var tile = swatchList.closest(tileSelector);
    var media = tile.querySelector(mediaSelector);
    var swatches = Array.prototype.slice.call(swatchList.querySelectorAll('.swatch'));

    function activate(swatch) {
      media.style.backgroundImage = "url('" + swatch.dataset.img + "')";
      swatches.forEach(function (s) { s.classList.remove('is-active'); });
      swatch.classList.add('is-active');
    }

    swatches.forEach(function (swatch) {
      swatch.addEventListener('mouseenter', function () {
        activate(swatch);
      });
      swatch.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
      swatch.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
        e.preventDefault();
        e.stopPropagation();
        activate(swatch);
      });
    });

    tile.addEventListener('mouseleave', function () {
      media.style.backgroundImage = "url('" + tile.dataset.defaultImg + "')";
      swatches.forEach(function (s) { s.classList.remove('is-active'); });
      swatches[0].classList.add('is-active');
    });
  }

  document.querySelectorAll('.category-card__swatches').forEach(function (el) {
    wireSwatches(el, '.category-card', '.category-card__img');
  });

  var lastWidths = new WeakMap();

  function collapseSwatchOverflow(swatchList) {
    var containerWidth = swatchList.clientWidth;
    if (!containerWidth || lastWidths.get(swatchList) === containerWidth) return;
    lastWidths.set(swatchList, containerWidth);

    var swatches = Array.prototype.slice.call(swatchList.querySelectorAll('.swatch'));
    var more = swatchList.querySelector('.swatch-more');
    if (more) more.remove();
    swatches.forEach(function (s) { s.style.display = ''; });

    if (swatches.length < 2) return;

    var gap = parseFloat(getComputedStyle(swatchList).columnGap || getComputedStyle(swatchList).gap || 0);
    var swatchWidth = swatches[0].getBoundingClientRect().width;
    var step = swatchWidth + gap;

    var maxFit = Math.floor((containerWidth + gap) / step);
    if (maxFit >= swatches.length) return;

    var visibleCount = Math.max(1, maxFit - 1); // leave room for the "+N" badge
    var hiddenCount = swatches.length - visibleCount;

    swatches.slice(visibleCount).forEach(function (s) { s.style.display = 'none'; });

    var badge = document.createElement('span');
    badge.className = 'swatch-more';
    badge.textContent = '+' + hiddenCount;
    swatchList.appendChild(badge);
  }

  var categorySwatchLists = document.querySelectorAll('.category-card__swatches');

  // A container can start out hidden (password gate, category filter toggle)
  // and only get a real width once it's revealed later, so re-measure
  // whenever the box actually changes size rather than just once on load.
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) { collapseSwatchOverflow(entry.target); });
    });
    categorySwatchLists.forEach(function (list) { ro.observe(list); });
  } else {
    categorySwatchLists.forEach(collapseSwatchOverflow);
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        categorySwatchLists.forEach(collapseSwatchOverflow);
      }, 150);
    });
  }
})();
