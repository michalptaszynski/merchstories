(function () {
  var ROWS_VISIBLE = 4;
  var pills = document.querySelectorAll('.js-category-filter');
  var tiles = document.querySelectorAll('.product-grid .product-tile, .product-grid > .category-card');
  var grid = document.querySelector('.product-grid');
  var showAllBtn = document.querySelector('.btn-show-all');
  var newinGroups = document.querySelectorAll('.newin-grid');
  var shopOverview = document.getElementById('shopOverview');
  var shopDetail = document.getElementById('shopCategoryDetail');
  var hasGridUi = pills.length && (tiles.length || newinGroups.length);

  function setShopMode(showDetail) {
    if (!shopOverview || !shopDetail) return;
    shopOverview.hidden = showDetail;
    shopDetail.hidden = !showDetail;
  }

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
    var activePill = document.querySelector('.js-category-filter.is-active');
    var filter = activePill ? activePill.dataset.filter : 'all';
    var limit = showAllBtn ? getColumnCount() * ROWS_VISIBLE : Infinity;
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
      if (tiles.length) {
        var hasMore = matchCount > visibleCount;
        showAllBtn.style.display = hasMore ? '' : 'none';
      }
      var labelEl = showAllBtn.querySelector('span');
      if (labelEl) {
        var categoryLabel = activePill && filter !== 'all' ? activePill.textContent.trim().toLowerCase() : '';
        labelEl.textContent = categoryLabel ? 'Show all ' + categoryLabel : 'Show all';
      }
      if (filter !== 'all') {
        showAllBtn.setAttribute('href', 'shop.html?category=' + filter);
      }
    }

    newinGroups.forEach(function (group) {
      group.classList.toggle('is-active', filter === 'all' || group.dataset.category === filter);
    });
  }

  function activateFilter(filterValue, animate) {
    var pill = document.querySelector('.js-category-filter[data-filter="' + filterValue + '"]');
    if (!pill) return;
    pills.forEach(function (p) { p.classList.remove('is-active'); });
    pill.classList.add('is-active');
    setShopMode(true);
    if (animate) {
      animateGridTo(applyVisibility);
    } else {
      applyVisibility();
    }
  }

  if (hasGridUi) {
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        activateFilter(pill.dataset.filter, true);
      });
    });

    if (grid) {
      grid.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'height') grid.style.height = 'auto';
      });
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyVisibility, 150);
    });

    var initialCategory = new URLSearchParams(location.search).get('category');
    if (initialCategory) {
      activateFilter(initialCategory, false);
    } else {
      setShopMode(false);
      applyVisibility();
    }
  }
})();
