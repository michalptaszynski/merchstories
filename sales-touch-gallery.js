(function () {
  var track = document.getElementById('salesCarouselTrack');
  if (!track) return;

  var viewport = track.parentElement;
  var cards = Array.prototype.slice.call(track.children);
  var SET_SIZE = 5;
  if (!cards.length || cards.length % SET_SIZE !== 0) return;

  var SLOT_WIDTH = 180;
  var ACTIVE_WIDTH = 342; // must match .carousel-card.is-active .carousel-card__media scale target
  var GAP = 48;
  var STEP = SLOT_WIDTH + GAP;
  var TICK_MS = 2500;
  var TRANSITION_MS = 700;

  var setCount = cards.length / SET_SIZE;
  var activeSlot = SET_SIZE + 2; // start mid-pack, well clear of both ends
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
    // Web Animations API instead of a CSS transition: transitions can get
    // coalesced/skipped on their very first trigger right after page load
    // (jumping straight to 100% instead of animating) — .animate() doesn't
    // have that quirk since it starts precisely when called.
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

  function render(active, animate) {
    var activeLeft = slotLeft(active, active);
    var viewportOffset = (viewport.clientWidth / 2) - (activeLeft + ACTIVE_WIDTH / 2);

    if (!animate) {
      track.classList.add('is-jumping');
    }

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

    if (!animate) {
      // eslint-disable-next-line no-unused-expressions
      track.offsetWidth; // force reflow so the transition-less jump applies immediately
      track.classList.remove('is-jumping');
    }
  }

  function tick() {
    activeSlot += 1;
    render(activeSlot, true);

    if (activeSlot >= SET_SIZE * (setCount - 1)) {
      window.setTimeout(function () {
        activeSlot -= SET_SIZE;
        render(activeSlot, false);
      }, TRANSITION_MS + 60);
    }
  }

  function restartTimer() {
    clearInterval(timerId);
    timerId = setInterval(tick, TICK_MS);
  }

  function goTo(index) {
    // Keep clicks clear of the last set too, same margin tick() relies on,
    // so the very next auto-tick never walks off the end of `cards`.
    if (index >= SET_SIZE * (setCount - 1)) index -= SET_SIZE;
    activeSlot = index;
    render(activeSlot, true);
    restartTimer();
  }

  cards.forEach(function (card, i) {
    card.addEventListener('click', function (e) {
      if (i === activeSlot) return;
      e.preventDefault();
      goTo(i);
    });
  });

  function start() {
    render(activeSlot, false);
    timerId = setInterval(tick, TICK_MS);
  }

  window.addEventListener('resize', function () {
    render(activeSlot, false);
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
