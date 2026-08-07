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
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.classList.remove('is-open');
    overlay.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  var titleEl = modal.querySelector('.country-modal__title');
  var headerFlag = modal.querySelector('.country-modal__header .country-modal__flag span');

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
        var name = row.querySelector('.country-modal__name').textContent;
        var flag = row.querySelector('.country-modal__flag span').textContent;
        if (titleEl) titleEl.textContent = 'Shipping to ' + name;
        if (headerFlag) headerFlag.textContent = flag;
        close();
      });
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
