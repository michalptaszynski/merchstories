(function () {
  var rotator = document.querySelector('.testimonial-rotator');
  if (!rotator) return;
  var slides = Array.from(rotator.querySelectorAll('.testimonial-rotator__slide'));
  if (slides.length < 2) return;

  var current = slides.findIndex(function (s) { return s.classList.contains('is-active'); });
  if (current === -1) {
    current = 0;
    slides[0].classList.add('is-active');
  }

  function measureHeight() {
    var maxH = 0;
    slides.forEach(function (s) {
      var h = s.scrollHeight;
      if (h > maxH) maxH = h;
    });
    rotator.style.height = maxH + 'px';
  }

  measureHeight();
  window.addEventListener('resize', measureHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measureHeight);
  }

  function next() {
    var prev = slides[current];
    current = (current + 1) % slides.length;
    var upcoming = slides[current];

    prev.classList.remove('is-active');
    prev.classList.add('is-exiting');
    upcoming.classList.add('is-active');

    setTimeout(function () {
      prev.classList.remove('is-exiting');
      prev.classList.add('is-resetting');
      void prev.offsetWidth;
      requestAnimationFrame(function () {
        prev.classList.remove('is-resetting');
      });
    }, 650);
  }

  setInterval(next, 4000);
})();
