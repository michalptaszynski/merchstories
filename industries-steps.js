(function () {
  var items = document.querySelectorAll('#industriesStepsLayout .platform-steps__item');
  var desc = document.getElementById('industriesStepsDesc');
  var image = document.getElementById('industriesStepsImage');
  var panel = document.getElementById('industriesStepsPanel');
  if (!items.length || !desc) return;

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      if (item.classList.contains('is-active')) return;

      items.forEach(function (i) {
        var active = i === item;
        i.classList.toggle('is-active', active);
        i.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      if (panel) panel.setAttribute('aria-labelledby', item.id);

      desc.classList.add('is-leaving');
      window.setTimeout(function () {
        desc.textContent = item.dataset.desc;
        desc.classList.remove('is-leaving');
        desc.classList.add('is-entering');
        void desc.offsetHeight;
        desc.classList.remove('is-entering');
      }, 200);

      if (image && item.dataset.img) {
        image.classList.add('is-fading');
        window.setTimeout(function () {
          image.src = item.dataset.img;
          image.alt = item.dataset.alt || item.textContent;
          image.classList.toggle('platform-steps__image--cover', item.dataset.cover === 'true');
          image.classList.remove('is-fading');
        }, 200);
      }
    });
  });
})();
