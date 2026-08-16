(function () {
  var sources = document.querySelectorAll('[data-reveal]');
  if (!sources.length) return;

  var entries = [];

  sources.forEach(function (el) {
    var clone = el.cloneNode(true);
    clone.removeAttribute('data-reveal');
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.add('platform-reveal__text--fill');
    el.parentNode.appendChild(clone);
    entries.push({ el: el, clone: clone, lines: [] });
  });

  function measureLines(entry) {
    var range = document.createRange();
    range.selectNodeContents(entry.el);
    var rects = Array.from(range.getClientRects());
    var box = entry.el.getBoundingClientRect();
    entry.lines = rects.map(function (r) {
      return {
        left: r.left - box.left,
        width: r.width,
        top: r.top - box.top,
        bottom: r.bottom - box.top
      };
    });
  }

  function measureAll() {
    entries.forEach(measureLines);
  }

  function progressFor(el) {
    var rect = el.getBoundingClientRect();
    var vh = window.innerHeight;
    var start = vh * 0.85;
    var end = vh * 0.4;
    var raw = (start - rect.top) / (start - end);
    return Math.max(0, Math.min(1, raw));
  }

  function applyFill(entry, progress) {
    var lines = entry.lines;
    if (!lines.length) {
      entry.clone.style.clipPath = 'polygon(0 0, 0 0, 0 0)';
      return;
    }
    var filledUnits = progress * lines.length;
    var fullLines = Math.floor(filledUnits + 1e-6);
    var partialFrac = filledUnits - fullLines;

    if (fullLines <= 0 && partialFrac <= 0) {
      entry.clone.style.clipPath = 'polygon(0 0, 0 0, 0 0)';
      return;
    }

    var included = lines.slice(0, Math.min(fullLines, lines.length));
    var points = [];

    included.forEach(function (line) {
      var right = line.left + line.width;
      points.push(right + 'px ' + line.top + 'px');
      points.push(right + 'px ' + line.bottom + 'px');
    });

    if (fullLines < lines.length && partialFrac > 0) {
      var line = lines[fullLines];
      var right = line.left + line.width * partialFrac;
      points.push(right + 'px ' + line.top + 'px');
      points.push(right + 'px ' + line.bottom + 'px');
      included = included.concat([line]);
    }

    if (!included.length) {
      entry.clone.style.clipPath = 'polygon(0 0, 0 0, 0 0)';
      return;
    }

    var left = included[0].left;
    var back = [];
    for (var i = included.length - 1; i >= 0; i--) {
      back.push(left + 'px ' + included[i].bottom + 'px');
      back.push(left + 'px ' + included[i].top + 'px');
    }

    entry.clone.style.clipPath = 'polygon(' + points.concat(back).join(', ') + ')';
  }

  var ticking = false;
  function update() {
    ticking = false;
    entries.forEach(function (entry) {
      applyFill(entry, progressFor(entry.el));
    });
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  measureAll();
  update();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    measureAll();
    update();
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      measureAll();
      update();
    });
  }
})();
