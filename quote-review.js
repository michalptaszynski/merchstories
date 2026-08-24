(function () {
  var itemsWrap = document.getElementById('quoteReviewItems');
  var totalEl = document.getElementById('quoteReviewTotal');
  if (!itemsWrap) return;

  function formatPrice(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  var items = [];
  try {
    items = JSON.parse(localStorage.getItem('phMerchQuote') || '[]');
  } catch (e) {
    items = [];
  }

  var total = 0;
  items.forEach(function (item) {
    var linePrice = item.unitPrice * item.qty;
    total += linePrice;

    var el = document.createElement('div');
    el.className = 'quote-drawer__item';
    el.innerHTML =
      '<div class="quote-drawer__item-thumb" style="' + item.thumbStyle + '"></div>' +
      '<div class="quote-drawer__item-body">' +
        '<p class="quote-drawer__item-name"></p>' +
        '<p class="quote-review__item-meta"></p>' +
      '</div>' +
      '<div class="quote-drawer__item-side">' +
        '<p class="quote-drawer__item-price"></p>' +
      '</div>';
    el.querySelector('.quote-drawer__item-name').textContent = item.name;
    el.querySelector('.quote-review__item-meta').textContent = item.qty + ' pcs · ' + formatPrice(item.unitPrice) + ' each';
    el.querySelector('.quote-drawer__item-price').textContent = formatPrice(linePrice);
    itemsWrap.appendChild(el);
  });

  if (totalEl) totalEl.textContent = formatPrice(total);
})();
