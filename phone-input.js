(function () {
  var COUNTRIES = [
    { name: 'Poland', code: 'pl', dial: '+48' },
    { name: 'Austria', code: 'at', dial: '+43' },
    { name: 'Belgium', code: 'be', dial: '+32' },
    { name: 'Canada', code: 'ca', dial: '+1' },
    { name: 'Denmark', code: 'dk', dial: '+45' },
    { name: 'Finland', code: 'fi', dial: '+358' },
    { name: 'France', code: 'fr', dial: '+33' },
    { name: 'Germany', code: 'de', dial: '+49' },
    { name: 'Ireland', code: 'ie', dial: '+353' },
    { name: 'Italy', code: 'it', dial: '+39' },
    { name: 'Japan', code: 'jp', dial: '+81' },
    { name: 'Netherlands', code: 'nl', dial: '+31' },
    { name: 'Norway', code: 'no', dial: '+47' },
    { name: 'Spain', code: 'es', dial: '+34' },
    { name: 'Sweden', code: 'se', dial: '+46' }
  ];

  function flagUrl(code) {
    return 'assets/flags/' + code + '.svg';
  }

  function buildOption(country, activeDial) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'phone-input__option' + (country.dial === activeDial ? ' is-active' : '');
    btn.innerHTML =
      '<span class="phone-input__flag"><img src="' + flagUrl(country.code) + '" alt=""></span>' +
      '<span class="phone-input__option-name">' + country.name + '</span>' +
      '<span class="phone-input__option-dial">' + country.dial + '</span>';
    return btn;
  }

  document.querySelectorAll('.phone-input').forEach(function (root) {
    var trigger = root.querySelector('.phone-input__trigger');
    var flagImg = trigger.querySelector('.phone-input__flag img');
    var dialEl = trigger.querySelector('.phone-input__dial');
    var hiddenInput = root.querySelector('.phone-input__dial-code');
    var panel = root.querySelector('.phone-input__panel');
    var search = root.querySelector('.phone-input__search');
    var list = root.querySelector('.phone-input__list');

    function select(country) {
      flagImg.src = flagUrl(country.code);
      dialEl.textContent = country.dial;
      if (hiddenInput) hiddenInput.value = country.dial;
    }

    function renderList(query) {
      list.innerHTML = '';
      var q = (query || '').trim().toLowerCase();
      var matches = COUNTRIES.filter(function (c) {
        return c.name.toLowerCase().indexOf(q) !== -1;
      });
      if (!matches.length) {
        var empty = document.createElement('p');
        empty.className = 'phone-input__empty';
        empty.textContent = 'No countries found.';
        list.appendChild(empty);
        return;
      }
      matches.forEach(function (c) {
        var row = buildOption(c, hiddenInput ? hiddenInput.value : null);
        row.addEventListener('click', function () {
          select(c);
          closePanel();
        });
        list.appendChild(row);
      });
    }

    function openPanel() {
      panel.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      search.value = '';
      renderList('');
      search.focus();
    }

    function closePanel() {
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      if (panel.hidden) openPanel();
      else closePanel();
    });
    search.addEventListener('input', function () {
      renderList(search.value);
    });
    document.addEventListener('click', function (e) {
      if (!panel.hidden && !root.contains(e.target)) closePanel();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) closePanel();
    });

    select(COUNTRIES[0]);
  });
})();
