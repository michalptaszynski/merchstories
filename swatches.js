(function () {
  function wireSwatches(swatchList, tileSelector, mediaSelector) {
    var tile = swatchList.closest(tileSelector);
    var media = tile.querySelector(mediaSelector);
    var swatches = Array.prototype.slice.call(swatchList.querySelectorAll('.swatch'));

    swatches.forEach(function (swatch) {
      swatch.addEventListener('mouseenter', function () {
        media.style.backgroundImage = "url('" + swatch.dataset.img + "')";
        swatches.forEach(function (s) { s.classList.remove('is-active'); });
        swatch.classList.add('is-active');
      });
      swatch.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    tile.addEventListener('mouseleave', function () {
      media.style.backgroundImage = "url('" + tile.dataset.defaultImg + "')";
      swatches.forEach(function (s) { s.classList.remove('is-active'); });
      swatches[0].classList.add('is-active');
    });
  }

  document.querySelectorAll('.product-tile__swatches').forEach(function (el) {
    wireSwatches(el, '.product-tile', '.product-tile__media');
  });

  document.querySelectorAll('.category-card__swatches').forEach(function (el) {
    wireSwatches(el, '.category-card', '.category-card__img');
  });

  document.querySelectorAll('.showcase-item__swatches').forEach(function (el) {
    wireSwatches(el, '.showcase-item', '.showcase-tile');
  });
})();
