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

    applyLayout(localStorage.getItem(STORAGE_KEY) !== 'services');

    checkbox.addEventListener('change', function () {
      applyLayout(checkbox.checked);
      localStorage.setItem(STORAGE_KEY, checkbox.checked ? 'steps' : 'services');
    });
  })();

  // -- Inline captions (For who layout: captions under each name vs. shared panel below) --
  (function () {
    var STORAGE_KEY = 'ph-inline-captions';
    var checkbox = document.getElementById('inlineCaptionsSwitch');
    var stepsLayout = document.getElementById('industriesStepsLayout');
    if (!checkbox || !stepsLayout) return;

    function applyMode(isInline) {
      stepsLayout.classList.toggle('industries__steps-layout--inline-desc', isInline);
      checkbox.checked = isInline;
    }

    applyMode(localStorage.getItem(STORAGE_KEY) === 'inline');

    checkbox.addEventListener('change', function () {
      applyMode(checkbox.checked);
      localStorage.setItem(STORAGE_KEY, checkbox.checked ? 'inline' : 'panel');
    });
  })();

  // -- Why us layout (carousel vs. numbered grid) --
  (function () {
    var STORAGE_KEY = 'ph-why-us-layout';
    var checkbox = document.getElementById('whyUsLayoutSwitch');
    var section = document.querySelector('.section--sales-touch');
    var carousel = document.querySelector('.sales-touch__carousel');
    var dots = document.getElementById('salesCarouselDots');
    var grid = document.getElementById('whyUsGrid');
    if (!checkbox || !section || !carousel || !dots || !grid) return;

    function applyLayout(isGrid) {
      section.classList.toggle('is-grid-mode', isGrid);
      carousel.style.display = isGrid ? 'none' : '';
      dots.style.display = isGrid ? 'none' : '';
      grid.style.display = isGrid ? '' : 'none';
      checkbox.checked = isGrid;
    }

    applyLayout(localStorage.getItem(STORAGE_KEY) !== 'carousel');

    checkbox.addEventListener('change', function () {
      applyLayout(checkbox.checked);
      localStorage.setItem(STORAGE_KEY, checkbox.checked ? 'grid' : 'carousel');
    });
  })();
})();
