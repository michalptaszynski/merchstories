(function () {
  var items = document.querySelectorAll('.platform-stats__value[data-count-to]');
  if (!items.length) return;

  function formatNumber(n, comma) {
    n = Math.round(n);
    return comma ? n.toLocaleString('en-US') : String(n);
  }

  function animateCount(el) {
    var from = parseInt(el.dataset.countFrom, 10) || 0;
    var to = parseInt(el.dataset.countTo, 10) || 0;
    var suffix = el.dataset.countSuffix || '';
    var comma = el.dataset.countComma === 'true';
    var duration = 1400;
    var start = null;

    if (el._countRAF) cancelAnimationFrame(el._countRAF);

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatNumber(from + (to - from) * eased, comma) + suffix;
      if (progress < 1) {
        el._countRAF = requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(to, comma) + suffix;
      }
    }
    el._countRAF = requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) animateCount(entry.target);
    });
  }, { threshold: 0.4 });

  items.forEach(function (el) { observer.observe(el); });
})();
