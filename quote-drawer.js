(function () {
  var openBtn = document.getElementById('navQuoteBtn');
  var drawer = document.getElementById('quoteDrawer');
  var overlay = document.getElementById('quoteDrawerOverlay');
  var closeBtn = document.getElementById('quoteDrawerClose');
  var itemsWrap = document.getElementById('quoteDrawerItems');
  var emptyState = document.getElementById('quoteDrawerEmpty');
  var summary = document.getElementById('quoteDrawerSummary');
  var footer = document.getElementById('quoteDrawerFooter');
  var totalEl = document.getElementById('quoteDrawerTotal');
  var viewQuoteBtn = document.getElementById('quoteDrawerViewQuote');
  if (!openBtn || !drawer || !overlay) return;

  function formatPrice(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function open() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    openBtn.focus();
  }

  function recalcTotal() {
    var total = 0;
    itemsWrap.querySelectorAll('.quote-drawer__item').forEach(function (item) {
      var unitPrice = parseFloat(item.dataset.unitPrice) || 0;
      var qty = parseFloat(item.querySelector('.quote-drawer__qty').value) || 0;
      var linePrice = unitPrice * qty;
      item.querySelector('.quote-drawer__item-price').textContent = formatPrice(linePrice);
      total += linePrice;
    });
    if (totalEl) totalEl.textContent = formatPrice(total);

    var hasItems = itemsWrap.querySelectorAll('.quote-drawer__item').length > 0;
    itemsWrap.hidden = !hasItems;
    emptyState.hidden = hasItems;
    summary.hidden = !hasItems;
    footer.hidden = !hasItems;
  }

  itemsWrap.addEventListener('change', function (e) {
    if (e.target.classList.contains('quote-drawer__qty')) recalcTotal();
  });

  itemsWrap.addEventListener('click', function (e) {
    var removeBtn = e.target.closest('.quote-drawer__item-remove');
    if (!removeBtn) return;
    var item = removeBtn.closest('.quote-drawer__item');
    if (item) item.remove();
    recalcTotal();
  });

  openBtn.addEventListener('click', function (e) {
    e.preventDefault();
    open();
  });
  document.querySelectorAll('.js-open-quote').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      open();
    });
  });
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);

  if (viewQuoteBtn) {
    viewQuoteBtn.addEventListener('click', function () {
      var items = [];
      itemsWrap.querySelectorAll('.quote-drawer__item').forEach(function (item) {
        items.push({
          name: item.querySelector('.quote-drawer__item-name').textContent,
          thumbStyle: item.querySelector('.quote-drawer__item-thumb').getAttribute('style') || '',
          qty: parseFloat(item.querySelector('.quote-drawer__qty').value) || 0,
          unitPrice: parseFloat(item.dataset.unitPrice) || 0
        });
      });
      try {
        localStorage.setItem('phMerchQuote', JSON.stringify(items));
      } catch (e) {}
      window.location.href = 'quote.html';
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    close();
  });

  recalcTotal();
})();
