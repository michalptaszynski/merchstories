(function () {
  document.querySelectorAll('.category-card[href^="bundle-"]').forEach(function (card) {
    var packshot = card.querySelector('.category-card__packshot');
    var thumbs = card.querySelectorAll('.bundle-card__item-thumb');
    if (!packshot || !thumbs.length) return;

    thumbs.forEach(function (thumb) {
      thumb.addEventListener('mouseenter', function () {
        packshot.style.backgroundImage = thumb.style.backgroundImage;
        packshot.classList.add('is-active');
      });
      thumb.addEventListener('mouseleave', function () {
        packshot.classList.remove('is-active');
      });
    });
  });
})();
