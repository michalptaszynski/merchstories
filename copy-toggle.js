(function () {
  var wrap = document.getElementById('copySettings');
  var gearBtn = document.getElementById('copySettingsToggle');
  if (!wrap || !gearBtn) return;

  function setOpen(isOpen) {
    wrap.classList.toggle('is-open', isOpen);
    gearBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  gearBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(!wrap.classList.contains('is-open'));
  });

  document.addEventListener('click', function (e) {
    if (!wrap.contains(e.target)) setOpen(false);
  });

  // -- Side nav (homepage sticky section menu) --
  (function () {
    var STORAGE_KEY = 'ph-side-nav';
    var checkbox = document.getElementById('sideNavSwitch');
    var nav = document.getElementById('sideNav');
    var pageBody = document.querySelector('.page-body');
    if (!checkbox || !nav) return;

    function applyVisibility(isOn) {
      nav.style.display = isOn ? '' : 'none';
      if (pageBody) pageBody.classList.toggle('side-nav-active', isOn);
      checkbox.checked = isOn;
    }

    applyVisibility(localStorage.getItem(STORAGE_KEY) === 'on');

    checkbox.addEventListener('change', function () {
      applyVisibility(checkbox.checked);
      localStorage.setItem(STORAGE_KEY, checkbox.checked ? 'on' : 'off');
    });
  })();
})();
