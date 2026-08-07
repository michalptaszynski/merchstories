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
})();
