(function () {
  var STORAGE_KEY = 'ph-font-mode';
  var root = document.documentElement;
  var wrap = document.getElementById('fontSettings');
  var gearBtn = document.getElementById('fontSettingsToggle');
  var checkbox = document.getElementById('fontSwitch');
  if (!wrap || !gearBtn || !checkbox) return;

  function applyFont(isSans) {
    root.classList.toggle('font-sans-mode', isSans);
    checkbox.checked = isSans;
  }

  function setOpen(isOpen) {
    wrap.classList.toggle('is-open', isOpen);
    gearBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  var stored = localStorage.getItem(STORAGE_KEY);
  applyFont(stored === null ? true : stored === 'sans');

  gearBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!wrap.classList.contains('is-open'));
  });

  checkbox.addEventListener('change', function () {
    applyFont(checkbox.checked);
    localStorage.setItem(STORAGE_KEY, checkbox.checked ? 'sans' : 'mono');
  });

  document.addEventListener('click', function (e) {
    if (!wrap.contains(e.target)) setOpen(false);
  });
})();
