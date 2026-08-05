(function () {
  var dots = Array.prototype.slice.call(document.querySelectorAll('.lifestyle__dot'));
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.lifestyle__tile'));
  if (!dots.length || !tiles.length) return;

  function tileFor(dot) {
    return tiles.filter(function (tile) {
      return tile.dataset.product === dot.dataset.product;
    })[0];
  }

  function dotFor(tile) {
    return dots.filter(function (dot) {
      return dot.dataset.product === tile.dataset.product;
    })[0];
  }

  dots.forEach(function (dot) {
    var tile = tileFor(dot);
    if (!tile) return;

    dot.addEventListener('mouseenter', function () {
      tile.classList.add('is-active');
    });
    dot.addEventListener('mouseleave', function () {
      if (!dot.classList.contains('is-pinned')) tile.classList.remove('is-active');
    });

    dot.addEventListener('click', function (e) {
      e.preventDefault();
      var wasPinned = dot.classList.contains('is-pinned');

      dots.forEach(function (d) {
        d.classList.remove('is-pinned');
        var t = tileFor(d);
        if (t) t.classList.remove('is-active');
      });

      if (!wasPinned) {
        dot.classList.add('is-pinned');
        tile.classList.add('is-active');
      }

      dot.classList.remove('is-pinging');
      // Force reflow so the animation restarts on repeated clicks.
      void dot.offsetWidth;
      dot.classList.add('is-pinging');
    });

    dot.addEventListener('animationend', function () {
      dot.classList.remove('is-pinging');
    });
  });

  tiles.forEach(function (tile) {
    var dot = dotFor(tile);
    if (!dot) return;

    tile.addEventListener('mouseenter', function () {
      dot.classList.add('is-tile-hover');
    });
    tile.addEventListener('mouseleave', function () {
      dot.classList.remove('is-tile-hover');
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.lifestyle__marker')) return;
    dots.forEach(function (d) {
      d.classList.remove('is-pinned');
      var t = tileFor(d);
      if (t) t.classList.remove('is-active');
    });
  });
})();
