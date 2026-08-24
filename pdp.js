(function () {
  var stageMedia = document.getElementById('pdpStageMedia');
  var stageCollage = document.getElementById('pdpStageCollage');
  var swatches = Array.prototype.slice.call(document.querySelectorAll('.pdp__swatches .swatch'));
  var colorLabel = document.getElementById('pdpSwatchLabel');
  var prevBtn = document.getElementById('pdpPrev');
  var nextBtn = document.getElementById('pdpNext');
  var galleryThumbs = Array.prototype.slice.call(document.querySelectorAll('.pdp__gallery-thumb'));

  var currentIndex = swatches.findIndex(function (s) { return s.classList.contains('is-active'); });
  if (currentIndex < 0) currentIndex = 0;

  function setActive(index) {
    currentIndex = (index + swatches.length) % swatches.length;
    var swatch = swatches[currentIndex];
    swatches.forEach(function (s) { s.classList.remove('is-active'); });
    swatch.classList.add('is-active');
    if (stageMedia && swatch.dataset.img) stageMedia.style.backgroundImage = "url('" + swatch.dataset.img + "')";
    if (colorLabel) colorLabel.textContent = swatch.dataset.color;
    galleryThumbs.forEach(function (t) { t.classList.remove('is-active'); });
    if (galleryThumbs[currentIndex]) galleryThumbs[currentIndex].classList.add('is-active');
  }

  swatches.forEach(function (swatch, i) {
    swatch.addEventListener('click', function () { setActive(i); });
  });
  if (prevBtn) prevBtn.addEventListener('click', function () { setActive(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { setActive(currentIndex + 1); });

  galleryThumbs.forEach(function (thumb, i) {
    thumb.addEventListener('click', function () {
      if (swatches.length) {
        setActive(i);
        return;
      }
      galleryThumbs.forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
      if (thumb.dataset.img) {
        if (stageCollage) stageCollage.style.display = 'none';
        if (stageMedia) {
          stageMedia.style.display = '';
          stageMedia.style.backgroundImage = "url('" + thumb.dataset.img + "')";
        }
      } else {
        if (stageCollage) stageCollage.style.display = '';
        if (stageMedia) stageMedia.style.display = 'none';
      }
    });
  });

  var sizes = Array.prototype.slice.call(document.querySelectorAll('.pdp__size'));
  sizes.forEach(function (size) {
    size.addEventListener('click', function () {
      sizes.forEach(function (s) { s.classList.remove('is-active'); });
      size.classList.add('is-active');
    });
  });

  var qty = document.getElementById('pdpQty');
  var qtyToggle = document.getElementById('pdpQtyToggle');
  var qtyToggleQty = qty ? qty.querySelector('.pdp__qty-toggle-qty') : null;
  var qtyToggleTotal = qty ? qty.querySelector('.pdp__qty-toggle-total') : null;
  var qtyTiers = Array.prototype.slice.call(document.querySelectorAll('.pdp__qty-tier'));
  var qtyUnitSingular = qty ? (qty.dataset.unitSingular || 'piece') : 'piece';
  var qtyUnitPlural = qty ? (qty.dataset.unitPlural || 'pieces') : 'pieces';

  function closeQty() {
    if (qty) qty.classList.remove('is-open');
    if (qtyToggle) qtyToggle.setAttribute('aria-expanded', 'false');
  }

  if (qty && qtyToggle) {
    qtyToggle.addEventListener('click', function () {
      var isOpen = qty.classList.toggle('is-open');
      qtyToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!qty.contains(e.target)) closeQty();
    });
  }

  qtyTiers.forEach(function (tier) {
    tier.addEventListener('click', function () {
      qtyTiers.forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tier.classList.add('is-active');
      tier.setAttribute('aria-selected', 'true');
      var qtyVal = tier.querySelector('.pdp__qty-tier-qty').textContent;
      var totalVal = tier.querySelector('.pdp__qty-tier-total').textContent;
      var unitWord = qtyVal === '1' ? qtyUnitSingular : qtyUnitPlural;
      if (qtyToggleQty) qtyToggleQty.textContent = qtyVal + ' ' + unitWord;
      if (qtyToggleTotal) qtyToggleTotal.textContent = totalVal;
      closeQty();
    });
  });

  var promoText = document.getElementById('pdpPromoText');
  var promoToggle = document.getElementById('pdpPromoToggle');
  if (promoText && promoToggle) {
    var shortText = promoText.textContent;
    var fullText = shortText + ' Ideal as a promotional item for business, advertising campaigns, or corporate events, it combines comfort with lasting impact.';
    var expanded = false;
    promoToggle.addEventListener('click', function () {
      expanded = !expanded;
      promoText.textContent = expanded ? fullText : shortText;
      promoToggle.textContent = expanded ? 'Read less' : 'Read more';
      promoToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  var infoBlocks = Array.prototype.slice.call(document.querySelectorAll('.pdp__info'));
  infoBlocks.forEach(function (block) {
    var tabs = Array.prototype.slice.call(block.querySelectorAll('.pdp__info-tab'));
    var panels = Array.prototype.slice.call(block.querySelectorAll('.pdp__info-panel'));
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        panels.forEach(function (p) { p.classList.remove('is-active'); });
        tab.classList.add('is-active');
        var panel = block.querySelector('.pdp__info-panel[data-panel="' + tab.dataset.tab + '"]');
        if (panel) panel.classList.add('is-active');
      });
    });
  });
})();
