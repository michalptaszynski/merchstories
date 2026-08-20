(function () {
  var items = document.querySelectorAll('#whyUsAccordion .why-us-accordion__item');
  if (!items.length) return;

  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function directionFor(e, row) {
    var rect = row.getBoundingClientRect();
    var y = e.clientY - rect.top;
    return y < rect.height / 2 ? 'top' : 'bottom';
  }

  items.forEach(function (item) {
    var fill = item.querySelector('.why-us-accordion__fill');

    if (canHover && fill) {
      item.addEventListener('mouseenter', function (e) {
        if (!reduceMotion) {
          var dir = directionFor(e, item);
          fill.style.transition = 'none';
          fill.style.transform = dir === 'top' ? 'translateY(-100%)' : 'translateY(100%)';
          void fill.offsetHeight;
          fill.style.transition = '';
          fill.style.transform = 'translateY(0)';
        }
        item.classList.add('is-hovered');
      });
      item.addEventListener('mouseleave', function (e) {
        if (!reduceMotion) {
          var dir = directionFor(e, item);
          fill.style.transform = dir === 'top' ? 'translateY(-100%)' : 'translateY(100%)';
        }
        item.classList.remove('is-hovered');
      });
    }

    item.addEventListener('click', function () {
      var isActive = item.classList.contains('is-active');
      items.forEach(function (i) {
        i.classList.remove('is-active');
        i.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('is-active');
        item.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();
