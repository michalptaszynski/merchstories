(function () {
  var COUNTRIES = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina', 'Armenia',
    'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
    'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina',
    'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia',
    'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile',
    'China', 'Colombia', 'Comoros', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus',
    'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
    'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini',
    'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany',
    'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran',
    'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan',
    'Kenya', 'Kiribati', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
    'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania',
    'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
    'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
    'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman',
    'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
    'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
    'Saint Lucia', 'Samoa', 'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia',
    'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
    'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka',
    'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
    'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago',
    'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine',
    'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
    'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ];

  function buildOption(name) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'region-input__option';
    btn.textContent = name;
    return btn;
  }

  document.querySelectorAll('.region-input').forEach(function (root) {
    var trigger = root.querySelector('.region-input__trigger');
    var valueEl = trigger.querySelector('.region-input__value');
    var hiddenInput = root.querySelector('input[type="hidden"]');
    var panel = root.querySelector('.region-input__panel');
    var search = root.querySelector('.region-input__search');
    var list = root.querySelector('.region-input__list');

    function select(name) {
      valueEl.textContent = name;
      if (hiddenInput) hiddenInput.value = name;
    }

    function renderList(query) {
      list.innerHTML = '';
      var q = (query || '').trim().toLowerCase();
      var matches = COUNTRIES.filter(function (name) {
        return name.toLowerCase().indexOf(q) !== -1;
      });
      if (!matches.length) {
        var empty = document.createElement('p');
        empty.className = 'region-input__empty';
        empty.textContent = 'No countries found.';
        list.appendChild(empty);
        return;
      }
      matches.forEach(function (name) {
        var row = buildOption(name);
        if (hiddenInput && hiddenInput.value === name) row.classList.add('is-active');
        row.addEventListener('click', function () {
          select(name);
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
  });
})();
