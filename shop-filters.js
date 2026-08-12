(function () {
  var filters = document.querySelectorAll('.shop-filter');
  if (!filters.length) return;

  function closeAll(except) {
    filters.forEach(function (f) {
      if (f === except) return;
      f.classList.remove('is-open');
      f.querySelector('.shop-filter__toggle').setAttribute('aria-expanded', 'false');
    });
  }

  filters.forEach(function (filter) {
    var toggle = filter.querySelector('.shop-filter__toggle');
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = filter.classList.contains('is-open');
      closeAll(filter);
      filter.classList.toggle('is-open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  document.addEventListener('click', function (e) {
    var withinAny = Array.prototype.some.call(filters, function (f) { return f.contains(e.target); });
    if (!withinAny) closeAll();
  });

  var activeFilters = document.getElementById('activeFilters');
  var checkboxes = document.querySelectorAll('.shop-filter__option input[type="checkbox"]');

  function renderActiveFilters() {
    if (!activeFilters) return;
    activeFilters.innerHTML = '';
    var checked = Array.prototype.filter.call(checkboxes, function (cb) { return cb.checked; });

    checked.forEach(function (cb) {
      var label = cb.nextElementSibling.textContent;
      var chip = document.createElement('span');
      chip.className = 'active-filter-chip';
      chip.textContent = label;

      var remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'active-filter-chip__remove';
      remove.setAttribute('aria-label', 'Remove ' + label + ' filter');
      remove.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
      remove.addEventListener('click', function () {
        cb.checked = false;
        renderActiveFilters();
      });

      chip.appendChild(remove);
      activeFilters.appendChild(chip);
    });

    activeFilters.hidden = checked.length === 0;
  }

  checkboxes.forEach(function (cb) {
    cb.addEventListener('change', renderActiveFilters);
  });
})();
