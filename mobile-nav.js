(function () {
  var openBtn = document.getElementById('navHamburgerBtn');
  var drawer = document.getElementById('mobileNavDrawer');
  var overlay = document.getElementById('mobileNavOverlay');
  var headerRow = document.querySelector('.site-header__row');
  if (!openBtn || !drawer || !overlay) return;

  function isOpen() {
    return drawer.classList.contains('is-open');
  }

  function open() {
    if (headerRow) {
      drawer.style.setProperty('--mobile-nav-top', headerRow.getBoundingClientRect().bottom + 'px');
    }
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    openBtn.classList.add('is-open');
    document.body.classList.add('mobile-nav-open');
    drawer.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    openBtn.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    openBtn.classList.remove('is-open');
    document.body.classList.remove('mobile-nav-open');
    drawer.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', function () {
    if (isOpen()) {
      close();
    } else {
      open();
    }
  });
  overlay.addEventListener('click', close);
  drawer.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', close);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) close();
  });
})();
