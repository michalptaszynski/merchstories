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

  // -- Longer copy --
  (function () {
    var STORAGE_KEY = 'ph-copy-length';
    var checkbox = document.getElementById('copySwitch');
    var targets = document.querySelectorAll('.section-subheading[data-long]');
    if (!checkbox || !targets.length) return;

    function applyLength(isLong) {
      targets.forEach(function (el) {
        el.textContent = isLong ? el.dataset.long : el.dataset.short;
      });
      checkbox.checked = isLong;
    }

    applyLength(localStorage.getItem(STORAGE_KEY) === 'long');

    checkbox.addEventListener('change', function () {
      applyLength(checkbox.checked);
      localStorage.setItem(STORAGE_KEY, checkbox.checked ? 'long' : 'short');
    });
  })();

  // -- For who layout --
  (function () {
    var STORAGE_KEY = 'ph-for-who-layout';
    var checkbox = document.getElementById('forWhoLayoutSwitch');
    var servicesLayout = document.getElementById('industriesServicesLayout');
    var stepsLayout = document.getElementById('industriesStepsLayout');
    if (!checkbox || !servicesLayout || !stepsLayout) return;

    function applyLayout(isSteps) {
      servicesLayout.style.display = isSteps ? 'none' : '';
      stepsLayout.style.display = isSteps ? '' : 'none';
      checkbox.checked = isSteps;
    }

    applyLayout(localStorage.getItem(STORAGE_KEY) === 'steps');

    checkbox.addEventListener('change', function () {
      applyLayout(checkbox.checked);
      localStorage.setItem(STORAGE_KEY, checkbox.checked ? 'steps' : 'services');
    });
  })();
})();
