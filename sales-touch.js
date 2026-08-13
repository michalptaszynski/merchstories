(function () {
  var numbers = Array.prototype.slice.call(document.querySelectorAll('.sales-touch__number[data-count-to]'));
  var section = document.querySelector('.section--sales-touch');
  if (!numbers.length || !section) return;

  var duration = 1200;
  var animated = false;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateNumber(el) {
    var from = parseInt(el.dataset.countFrom, 10) || 0;
    var to = parseInt(el.dataset.countTo, 10) || 0;
    var suffix = el.dataset.countSuffix || '';
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var value = Math.round(from + (to - from) * easeOutCubic(progress));
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function runAnimation() {
    if (animated) return;
    animated = true;
    numbers.forEach(animateNumber);
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runAnimation();
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(section);
  } else {
    runAnimation();
  }
})();
