(function () {
  var grids = document.querySelectorAll('.category-grid');

  grids.forEach(function (grid) {
    var progress = grid.nextElementSibling;
    if (!progress || !progress.classList.contains('carousel-progress')) return;

    var bar = progress.querySelector('.carousel-progress__bar');
    var arrows = progress.querySelectorAll('.carousel-arrow');
    if (!bar) return;

    function updateBar() {
      var max = grid.scrollWidth - grid.clientWidth;
      var progressRatio = max > 0 ? grid.scrollLeft / max : 0;
      var visibleRatio = grid.clientWidth / grid.scrollWidth;
      var barWidth = Math.max(visibleRatio * 100, 8);
      var maxLeft = 100 - barWidth;
      bar.style.width = barWidth + '%';
      bar.style.left = (progressRatio * maxLeft) + '%';
    }

    grid.addEventListener('scroll', updateBar, { passive: true });
    window.addEventListener('resize', updateBar);
    updateBar();

    arrows.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = parseInt(btn.dataset.dir, 10);
        var card = grid.querySelector('.category-card');
        var amount = card ? card.getBoundingClientRect().width + 1 : grid.clientWidth * 0.8;
        grid.scrollBy({ left: dir * amount, behavior: 'smooth' });
      });
    });
  });
})();
