(function () {
  var ROWS_VISIBLE = 4;
  var pills = document.querySelectorAll('.pill-filter');
  var tiles = document.querySelectorAll('.product-tile');
  var grid = document.querySelector('.product-grid');
  var showAllBtn = document.querySelector('.btn-show-all');
  if (!pills.length || !tiles.length) return;

  var expanded = false;

  function getColumnCount() {
    if (!grid) return 1;
    var columns = getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean);
    return columns.length || 1;
  }

  function animateGridTo(callback) {
    if (!grid) { callback(); return; }
    grid.style.height = grid.getBoundingClientRect().height + 'px';
    callback();
    var previousHeight = grid.style.height;
    grid.style.height = 'auto';
    var targetHeight = grid.getBoundingClientRect().height + 'px';
    grid.style.height = previousHeight;
    grid.getBoundingClientRect();
    requestAnimationFrame(function () {
      grid.style.height = targetHeight;
    });
  }

  function applyVisibility() {
    var activePill = document.querySelector('.pill-filter.is-active');
    var filter = activePill ? activePill.dataset.filter : 'all';
    var limit = expanded ? Infinity : getColumnCount() * ROWS_VISIBLE;
    var visibleCount = 0;
    var matchCount = 0;

    tiles.forEach(function (tile) {
      var match = filter === 'all' || tile.dataset.category === filter;
      if (!match) {
        tile.style.display = 'none';
        return;
      }
      matchCount++;
      var withinLimit = visibleCount < limit;
      tile.style.display = withinLimit ? '' : 'none';
      if (withinLimit) visibleCount++;
    });

    if (showAllBtn) {
      var hasMore = matchCount > visibleCount;
      showAllBtn.style.display = hasMore ? '' : 'none';
    }
  }

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('is-active'); });
      pill.classList.add('is-active');
      expanded = false;
      animateGridTo(applyVisibility);
    });
  });

  if (showAllBtn) {
    showAllBtn.addEventListener('click', function () {
      expanded = true;
      animateGridTo(applyVisibility);
    });
  }

  if (grid) {
    grid.addEventListener('transitionend', function (e) {
      if (e.propertyName === 'height') grid.style.height = 'auto';
    });
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (!expanded) applyVisibility();
    }, 150);
  });

  applyVisibility();
})();
