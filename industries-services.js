(function () {
  var rows = document.querySelectorAll('.industries__service');
  if (!rows.length) return;

  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!canHover) return;

  function directionFor(e, row) {
    var rect = row.getBoundingClientRect();
    var y = e.clientY - rect.top;
    return y < rect.height / 2 ? 'top' : 'bottom';
  }

  rows.forEach(function (row) {
    var fill = row.querySelector('.industries__service-fill');
    if (!fill) return;

    row.addEventListener('mouseenter', function (e) {
      if (!reduceMotion) {
        var dir = directionFor(e, row);
        fill.style.transition = 'none';
        fill.style.transform = dir === 'top' ? 'translateY(-100%)' : 'translateY(100%)';
        void fill.offsetHeight;
        fill.style.transition = '';
        fill.style.transform = 'translateY(0)';
      }
      row.classList.add('is-hovered');
    });

    row.addEventListener('mouseleave', function (e) {
      if (!reduceMotion) {
        var dir = directionFor(e, row);
        fill.style.transform = dir === 'top' ? 'translateY(-100%)' : 'translateY(100%)';
      }
      row.classList.remove('is-hovered');
    });
  });
})();
