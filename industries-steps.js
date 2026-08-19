(function () {
  var items = document.querySelectorAll('#industriesStepsLayout .platform-steps__item');
  var image = document.getElementById('industriesStepsImage');
  var panelDesc = document.getElementById('industriesStepsDesc');
  var panel = document.getElementById('industriesStepsPanel');
  if (!items.length || !image) return;

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      if (item.classList.contains('is-active')) return;

      items.forEach(function (i) {
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
    });
  });
})();
