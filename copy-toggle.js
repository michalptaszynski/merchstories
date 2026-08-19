(function () {
  var STORAGE_KEY = 'ph-copy-length';
  var wrap = document.getElementById('copySettings');
  var gearBtn = document.getElementById('copySettingsToggle');
  var checkbox = document.getElementById('copySwitch');
  var targets = document.querySelectorAll('.section-subheading[data-long]');
  if (!wrap || !gearBtn || !checkbox || !targets.length) return;

  function applyLength(isLong) {
    targets.forEach(function (el) {
      el.textContent = isLong ? el.dataset.long : el.dataset.short;
    });
    checkbox.checked = isLong;
  }

  function setOpen(isOpen) {
    wrap.classList.toggle('is-open', isOpen);
    gearBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  applyLength(localStorage.getItem(STORAGE_KEY) === 'long');

  gearBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!wrap.classList.contains('is-open'));
  });

  checkbox.addEventListener('change', function () {
    applyLength(checkbox.checked);
    localStorage.setItem(STORAGE_KEY, checkbox.checked ? 'long' : 'short');
  });

  document.addEventListener('click', function (e) {
    if (!wrap.contains(e.target)) setOpen(false);
  });
})();
