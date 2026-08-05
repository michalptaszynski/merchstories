(function () {
  var pills = document.querySelectorAll('.pill-filter');
  var tiles = document.querySelectorAll('.product-tile');
  var grid = document.querySelector('.product-grid');
  if (!pills.length || !tiles.length) return;

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('is-active'); });
      pill.classList.add('is-active');

      var filter = pill.dataset.filter;

      if (grid) {
        // Lock current height as the animation start point.
        grid.style.height = grid.getBoundingClientRect().height + 'px';
      }

      tiles.forEach(function (tile) {
        var match = filter === 'all' || tile.dataset.category === filter;
        tile.style.display = match ? '' : 'none';
      });

      if (grid) {
        // Measure the natural height for the new set of visible tiles.
        var previousHeight = grid.style.height;
        grid.style.height = 'auto';
        var targetHeight = grid.getBoundingClientRect().height + 'px';
        grid.style.height = previousHeight;
        // Force reflow so the browser registers the start height before animating.
        grid.getBoundingClientRect();
        requestAnimationFrame(function () {
          grid.style.height = targetHeight;
        });
      }
    });
  });

  if (grid) {
    grid.addEventListener('transitionend', function (e) {
      if (e.propertyName === 'height') grid.style.height = 'auto';
    });
  }
})();
