(function () {
  if (!window.IntersectionObserver) return;

  var targets = [
    document.querySelector('.site-header .logo'),
    document.querySelector('.section--cta .section-head__logo')
  ];

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-written');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  targets.forEach(function (target) {
    if (target) observer.observe(target);
  });
})();
