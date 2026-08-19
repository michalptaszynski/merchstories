(function () {
  var items = document.querySelectorAll('.why-us-grid__item[data-preview]');
  if (!items.length) return;

  var preview = document.createElement('div');
  preview.className = 'why-us-hover-preview';
  document.body.appendChild(preview);

  function move(e) {
    preview.style.transform = 'translate(' + (e.clientX + 24) + 'px, ' + (e.clientY + 24) + 'px)';
  }

  items.forEach(function (item) {
    item.addEventListener('mouseenter', function (e) {
      preview.style.backgroundImage = 'url(' + item.dataset.preview + ')';
      preview.classList.add('is-visible');
      move(e);
    });
    item.addEventListener('mousemove', move);
    item.addEventListener('mouseleave', function () {
      preview.classList.remove('is-visible');
    });
  });
})();
