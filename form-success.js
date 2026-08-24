(function () {
  var CHECK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';

  function wire(formId) {
    var form = document.getElementById(formId);
    var btn = form ? form.querySelector('.contact-form__submit') : null;
    if (!form || !btn) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (btn.classList.contains('is-success')) return;
      btn.classList.add('is-success');
      btn.innerHTML = CHECK_ICON + '<span>Request sent</span>';
    });
  }

  wire('contactForm');
  wire('quoteReviewForm');
})();
