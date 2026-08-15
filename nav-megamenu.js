(function () {
  var navLinks = document.querySelector('.site-header__links');
  var items = document.querySelectorAll('.site-header__item');
  if (!navLinks || !items.length) return;

  var activeMenu = null;

  items.forEach(function (item) {
    var menu = item.querySelector('.nav-megamenu');
    if (!menu) return;

    item.addEventListener('mouseenter', function () {
      if (activeMenu && activeMenu !== menu) activeMenu.classList.remove('is-open');
      menu.classList.add('is-open');
      activeMenu = menu;
    });
  });

  navLinks.addEventListener('mouseleave', function () {
    if (activeMenu) {
      activeMenu.classList.remove('is-open');
      activeMenu = null;
    }
  });
})();
