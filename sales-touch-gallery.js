(function () {
  var track = document.getElementById('salesCarouselTrack');
  if (!track) return;

  var viewport = track.parentElement;
  var cards = Array.prototype.slice.call(track.children);
  var count = cards.length;
  if (!count) return;

  var SLOT_WIDTH = 180;
  var ACTIVE_WIDTH = 342; // must match .carousel-card.is-active .carousel-card__media scale target
  var GAP = 48;
  var STEP = SLOT_WIDTH + GAP;
  var TICK_MS = 2500;

  var activeIndex = 0; // card 1 (Merch Consultant) starts active
  var direction = 1; // bounces 1-2-3-4-5-4-3-2-1-... instead of wrapping
  var timerId = null;

  var dotsWrap = document.getElementById('salesCarouselDots');
  var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];
  var currentValue = null;

  function startDotProgress(value) {
    var targetFill = null;
    dots.forEach(function (dot) {
      var isTarget = dot.dataset.value === value;
      dot.classList.toggle('is-active', isTarget);
      var fill = dot.querySelector('.sales-touch__dot-fill');
      if (!fill) return;
      if (fill._anim) fill._anim.cancel();
      fill.style.transform = 'scaleX(0)';
      if (isTarget) targetFill = fill;
    });
    if (!targetFill || !targetFill.animate) return;
    targetFill._anim = targetFill.animate(
      [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }],
      { duration: TICK_MS, easing: 'linear', fill: 'forwards' }
    );
  }

  // Left edge of slot i, given that slot `active` is reserving ACTIVE_WIDTH
  // instead of SLOT_WIDTH. Every other pair keeps an untouched 48px gap;
  // only the gap straddling the active card grows to fit its real width.
  function slotLeft(i, active) {
    var left = i * STEP;
    if (i > active) left += (ACTIVE_WIDTH - SLOT_WIDTH);
    return left;
  }

  // Just 5 real cards, no duplicated sets — reaching the last one always
  // slides straight back to the first, visibly, instead of faking an
  // endless scroll with cloned content.
  function render(active) {
    var activeLeft = slotLeft(active, active);
    var viewportOffset = (viewport.clientWidth / 2) - (activeLeft + ACTIVE_WIDTH / 2);

    cards.forEach(function (card, i) {
      card.classList.toggle('is-active', i === active);
      var x = slotLeft(i, active) + viewportOffset;
      card.style.transform = 'translateX(' + x + 'px)';
    });

    var value = cards[active].dataset.value;
    if (value !== currentValue) {
      currentValue = value;
      startDotProgress(value);
    }
  }

  function tick() {
    if (activeIndex + direction >= count || activeIndex + direction < 0) {
      direction *= -1;
    }
    activeIndex += direction;
    render(activeIndex);
  }

  function restartTimer() {
    clearInterval(timerId);
    timerId = setInterval(tick, TICK_MS);
  }

  function goTo(index) {
    activeIndex = index;
    render(activeIndex);
    restartTimer();
  }

  cards.forEach(function (card, i) {
    card.addEventListener('click', function (e) {
      if (i === activeIndex) return;
      e.preventDefault();
      goTo(i);
    });
  });

  function start() {
    render(activeIndex);
    timerId = setInterval(tick, TICK_MS);
  }

  window.addEventListener('resize', function () {
    render(activeIndex);
  });

  var imgs = track.querySelectorAll('img');
  if (!imgs.length) {
    start();
    return;
  }

  var pending = imgs.length;
  function onOneLoaded() {
    pending -= 1;
    if (pending <= 0) start();
  }
  imgs.forEach(function (img) {
    var preloader = new Image();
    preloader.onload = onOneLoaded;
    preloader.onerror = onOneLoaded;
    preloader.src = img.currentSrc || img.src;
  });
})();
