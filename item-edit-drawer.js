(function () {
  var overlay = document.getElementById('itemEditOverlay');
  var drawer = document.getElementById('itemEditDrawer');
  var closeBtn = document.getElementById('itemEditClose');
  if (!overlay || !drawer || !closeBtn) return;

  var titleEl = document.getElementById('itemEditTitle');
  var descEl = document.getElementById('itemEditDesc');
  var photoEl = document.getElementById('itemEditPhoto');

  var qtyWrap = document.getElementById('itemEditQty');
  var qtyToggleBtn = document.getElementById('itemEditQtyToggle');
  var qtyToggleQty = qtyToggleBtn.querySelector('.pdp__qty-toggle-qty');
  var qtyToggleTotal = qtyToggleBtn.querySelector('.pdp__qty-toggle-total');
  var qtyPanel = document.getElementById('itemEditQtyPanel');

  var sizeRow = document.getElementById('itemEditSizeRow');
  var sizeText = document.getElementById('itemEditSizeText');

  var sizesRow = document.getElementById('itemEditSizesRow');
  var sizesWrap = document.getElementById('itemEditSizes');
  var APPAREL_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

  var colorRow = document.getElementById('itemEditColorRow');
  var swatchesWrap = document.getElementById('itemEditSwatches');
  var swatchLabel = document.getElementById('itemEditSwatchLabel');

  var saveBtn = document.getElementById('itemEditSave');

  var lastFocused = null;
  var currentItem = null;
  var currentColors = [];

  function formatPrice(n) {
    return '$' + n.toFixed(2);
  }

  function closeQtyPanel() {
    qtyWrap.classList.remove('is-open');
    qtyToggleBtn.setAttribute('aria-expanded', 'false');
  }

  function renderTiers(tiers) {
    qtyPanel.innerHTML = '';
    tiers.forEach(function (tier, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pdp__qty-tier' + (i === 0 ? ' is-active' : '');
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.innerHTML =
        '<span class="pdp__qty-tier-qty">' + tier.qty + '</span>' +
        '<span class="pdp__qty-tier-unit">' + formatPrice(tier.unit) + '/piece</span>' +
        '<span class="pdp__qty-tier-total">' + formatPrice(tier.total) + '</span>';
      btn.addEventListener('click', function () {
        qtyPanel.querySelectorAll('.pdp__qty-tier').forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        qtyToggleQty.textContent = tier.qty + ' pieces';
        qtyToggleTotal.textContent = formatPrice(tier.total);
        closeQtyPanel();
      });
      qtyPanel.appendChild(btn);
    });
    if (tiers.length) {
      qtyToggleQty.textContent = tiers[0].qty + ' pieces';
      qtyToggleTotal.textContent = formatPrice(tiers[0].total);
    }
  }

  function renderSizes() {
    sizesWrap.innerHTML = '';
    var activeIndex = 2;
    APPAREL_SIZES.forEach(function (size, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pdp__size' + (i === activeIndex ? ' is-active' : '');
      btn.dataset.size = size;
      btn.innerHTML = '<span>' + size + '</span>';
      btn.addEventListener('click', function () {
        sizesWrap.querySelectorAll('.pdp__size').forEach(function (s) { s.classList.remove('is-active'); });
        btn.classList.add('is-active');
      });
      sizesWrap.appendChild(btn);
    });
  }

  function renderColors(colors) {
    currentColors = colors;
    swatchesWrap.innerHTML = '';
    colors.forEach(function (color, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'swatch' + (i === 0 ? ' is-active' : '');
      btn.style.backgroundImage = "url('" + color.img + "')";
      btn.setAttribute('aria-label', color.name);
      btn.addEventListener('click', function () {
        swatchesWrap.querySelectorAll('.swatch').forEach(function (s) { s.classList.remove('is-active'); });
        btn.classList.add('is-active');
        swatchLabel.textContent = color.name;
        photoEl.style.backgroundImage = "url('" + color.img + "')";
      });
      swatchesWrap.appendChild(btn);
    });
    swatchLabel.textContent = colors.length ? colors[0].name : '';
    if (colors.length) photoEl.style.backgroundImage = "url('" + colors[0].img + "')";
  }

  function open(item) {
    lastFocused = document.activeElement;
    currentItem = item;
    currentColors = [];

    var name = item.querySelector('.pdp-bundle-item__name');
    titleEl.textContent = name ? name.textContent : '';
    descEl.textContent = item.dataset.desc || '';

    var thumb = item.querySelector('.pdp-bundle-item__thumb');
    photoEl.style.backgroundImage = thumb ? thumb.style.backgroundImage : '';

    var tiers = [];
    try { tiers = JSON.parse(item.dataset.tiers || '[]'); } catch (e) { tiers = []; }
    renderTiers(tiers);

    var metas = item.querySelectorAll('.pdp-bundle-item__meta');
    var firstMeta = metas.length ? metas[0].textContent : '';
    var isApparel = /^Unisex/.test(firstMeta);

    if (isApparel) {
      sizeRow.hidden = true;
      sizesRow.hidden = false;
      renderSizes();
    } else {
      sizesRow.hidden = true;
      sizeRow.hidden = false;
      sizeText.textContent = firstMeta;
    }

    if (item.dataset.colors) {
      var colors = [];
      try { colors = JSON.parse(item.dataset.colors); } catch (e) { colors = []; }
      if (colors.length) {
        colorRow.hidden = false;
        renderColors(colors);
      } else {
        colorRow.hidden = true;
      }
    } else {
      colorRow.hidden = true;
    }

    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    closeQtyPanel();
    currentItem = null;
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function save() {
    if (!currentItem) return;

    var metas = currentItem.querySelectorAll('.pdp-bundle-item__meta');
    var qtyMeta = metas[metas.length - 1];
    var activeTier = qtyPanel.querySelector('.pdp__qty-tier.is-active');
    if (qtyMeta && activeTier) {
      var qty = activeTier.querySelector('.pdp__qty-tier-qty').textContent;
      qtyMeta.textContent = qty + ' pieces';
    }

    if (!sizesRow.hidden) {
      var activeSize = sizesWrap.querySelector('.pdp__size.is-active');
      if (activeSize && metas[0]) {
        metas[0].textContent = 'Unisex, ' + activeSize.dataset.size;
      }
    }

    if (!colorRow.hidden && currentColors.length) {
      var activeSwatch = swatchesWrap.querySelector('.swatch.is-active');
      var index = activeSwatch ? Array.prototype.indexOf.call(swatchesWrap.children, activeSwatch) : -1;
      var color = index > -1 ? currentColors[index] : null;
      if (color) {
        var thumb = currentItem.querySelector('.pdp-bundle-item__thumb');
        if (thumb) thumb.style.backgroundImage = "url('" + color.img + "')";
      }
    }

    close();
  }

  qtyToggleBtn.addEventListener('click', function () {
    var isOpen = qtyWrap.classList.toggle('is-open');
    qtyToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  document.addEventListener('click', function (e) {
    if (qtyWrap && !qtyWrap.contains(e.target)) closeQtyPanel();
  });

  document.querySelectorAll('.pdp-bundle-item__edit').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.pdp-bundle-item');
      if (item) open(item);
    });
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  if (saveBtn) saveBtn.addEventListener('click', save);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
  });
})();
