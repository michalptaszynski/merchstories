(function () {
  var nav = document.getElementById('sideNav');
  if (!nav) return;

  var links = Array.prototype.slice.call(nav.querySelectorAll('.side-nav__link'));
  var sections = links
    .map(function (link) {
      return document.getElementById(link.getAttribute('href').slice(1));
    })
    .filter(Boolean);

  if (!sections.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var link = nav.querySelector('.side-nav__link[href="#' + entry.target.id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-100px 0px -70% 0px', threshold: 0 }
  );

  sections.forEach(function (section) { observer.observe(section); });
})();
