(function () {
  var ROWS_VISIBLE = 4;
  var pills = document.querySelectorAll('.pill-filter');
  var navCategoryLinks = document.querySelectorAll('.nav-links a[data-filter]');
  var tiles = document.querySelectorAll('.product-tile');
  var grid = document.querySelector('.product-grid');
  var showAllBtn = document.querySelector('.btn-show-all');
  var newinGroups = document.querySelectorAll('.newin-grid');
  var hasGridUi = pills.length && tiles.length;

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
      var labelEl = showAllBtn.querySelector('span');
      if (labelEl) {
        var categoryLabel = activePill && filter !== 'all' ? activePill.textContent.trim().toLowerCase() : '';
        labelEl.textContent = categoryLabel ? 'Show all ' + categoryLabel : 'Show all';
      }
    }

    newinGroups.forEach(function (group) {
      group.classList.toggle('is-active', filter === 'all' || group.dataset.category === filter);
    });
  }

  function activateFilter(filterValue, scrollToGrid) {
    var pill = document.querySelector('.pill-filter[data-filter="' + filterValue + '"]');
    if (!pill) return;
    pills.forEach(function (p) { p.classList.remove('is-active'); });
    pill.classList.add('is-active');
    expanded = false;
    animateGridTo(applyVisibility);
    if (scrollToGrid) {
      var section = document.getElementById('freshly-uploaded');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (hasGridUi) {
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        activateFilter(pill.dataset.filter, false);
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

    var initialCategory = new URLSearchParams(location.search).get('category');
    if (initialCategory) {
      activateFilter(initialCategory, false);
    } else {
      applyVisibility();
    }
  }

  navCategoryLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (hasGridUi) {
        e.preventDefault();
        activateFilter(link.dataset.filter, true);
      }
    });
  });
})();
