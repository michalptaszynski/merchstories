(function () {
  var openBtn = document.getElementById('langSwitchBtn');
  var modal = document.getElementById('countryModal');
  var overlay = document.getElementById('countryModalOverlay');
  var closeBtn = document.getElementById('countryModalClose');
  if (!openBtn || !modal || !overlay) return;

  function open() {
    modal.classList.add('is-open');
    overlay.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    modal.classList.remove('is-open');
    overlay.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    openBtn.focus();
  }

  var headerFlag = modal.querySelector('.country-modal__header .country-modal__flag img');

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);

  modal.querySelectorAll('.country-modal__row').forEach(function (row) {
    row.querySelectorAll('.country-modal__lang').forEach(function (btn) {
      btn.addEventListener('click', function () {
        modal.querySelectorAll('.country-modal__lang.is-active').forEach(function (active) {
          active.classList.remove('is-active');
        });
        btn.classList.add('is-active');
        var flagSrc = row.querySelector('.country-modal__flag img').src;
        if (headerFlag) headerFlag.src = flagSrc;
        close();
      });
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
