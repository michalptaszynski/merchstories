document.querySelectorAll('[data-accordion]').forEach((list) => {
  const items = list.querySelectorAll('[data-accordion-item]');
  items.forEach((item) => {
    item.querySelector('.platform-feature__item-toggle').addEventListener('click', () => {
      items.forEach((i) => i.classList.toggle('is-active', i === item));
    });
  });
});
