(function () {
  var layout = document.getElementById('industriesStepsLayout');
  var items = document.querySelectorAll('#industriesStepsLayout .platform-steps__item');
  var image = document.getElementById('industriesStepsImage');
  var panelDesc = document.getElementById('industriesStepsDesc');
  var panel = document.getElementById('industriesStepsPanel');
  if (!layout || !items.length || !image) return;

  var itemsArr = Array.prototype.slice.call(items);
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isHovering = false;

  function activate(item) {
    if (item.classList.contains('is-active')) return;

    itemsArr.forEach(function (i) {
      var active = i === item;
      i.classList.toggle('is-active', active);
      i.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    if (panel) panel.setAttribute('aria-labelledby', item.id);

    if (panelDesc) {
      var itemDesc = item.querySelector('.platform-steps__item-desc');
      var text = itemDesc ? itemDesc.textContent : '';
      panelDesc.classList.add('is-leaving');
      window.setTimeout(function () {
        panelDesc.textContent = text;
        panelDesc.classList.remove('is-leaving');
        panelDesc.classList.add('is-entering');
        void panelDesc.offsetHeight;
        panelDesc.classList.remove('is-entering');
      }, 200);
    }

    if (item.dataset.img) {
      image.classList.add('is-fading');
      window.setTimeout(function () {
        image.src = item.dataset.img;
        image.alt = item.dataset.alt || '';
        image.classList.toggle('platform-steps__image--cover', item.dataset.cover === 'true');
        image.classList.remove('is-fading');
      }, 200);
    }
  }

  itemsArr.forEach(function (item) {
    item.addEventListener('click', function () { activate(item); });
    item.addEventListener('mouseenter', function () { isHovering = true; });
    item.addEventListener('mouseleave', function () { isHovering = false; });
  });

  if (reduceMotion) return;

  window.setInterval(function () {
    if (isHovering) return;
    if (getComputedStyle(layout).display === 'none') return;

    var currentIndex = itemsArr.findIndex(function (i) { return i.classList.contains('is-active'); });
    var nextIndex = (currentIndex + 1) % itemsArr.length;
    activate(itemsArr[nextIndex]);
  }, 3000);
})();
