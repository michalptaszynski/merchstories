(function () {
  var STORAGE_KEY = 'ph-stock-layout';
  var row = document.getElementById('stockLayoutSettingsRow');
  var checkbox = document.getElementById('stockLayoutSwitch');
  var defaultContent = document.getElementById('stockDefaultContent');
  var defaultMedia = document.getElementById('stockDefaultMedia');
  var altContent = document.getElementById('stockAltContent');
  if (!row || !checkbox || !defaultContent || !altContent) return;

  row.hidden = false;

  function applyLayout(isAlt) {
    defaultContent.classList.toggle('is-hidden', isAlt);
    if (defaultMedia) defaultMedia.classList.toggle('is-hidden', isAlt);
    altContent.classList.toggle('is-hidden', !isAlt);
    checkbox.checked = isAlt;
  }

  var stored = localStorage.getItem(STORAGE_KEY);
  applyLayout(stored === null ? true : stored === 'alt');

  checkbox.addEventListener('change', function () {
    applyLayout(checkbox.checked);
    localStorage.setItem(STORAGE_KEY, checkbox.checked ? 'alt' : 'default');
  });
})();
