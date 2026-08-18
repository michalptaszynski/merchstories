(function () {
  var items = document.querySelectorAll('.platform-steps__item');
  var desc = document.getElementById('platformStepsDesc');
  var image = document.getElementById('platformStepsImage');
  var quoteInput = document.getElementById('platformQuoteInput');
  var quoteText = document.getElementById('platformQuoteInputText');
  var quoteBtn = quoteInput ? quoteInput.querySelector('.platform-quote-input__btn') : null;
  if (!items.length || !desc) return;

  function pulseQuoteBtn() {
    if (!quoteBtn) return;
    quoteBtn.classList.remove('is-pulsing');
    void quoteBtn.offsetWidth;
    quoteBtn.classList.add('is-pulsing');
  }

  var QUOTES = [
    '250 custom hoodies for our Berlin office',
    '500 tote bags for a conference giveaway',
    '1,000 branded notebooks for new hires',
    '300 water bottles for the sales team',
    '150 eco totes for our holiday gift box'
  ];
  var TYPE_SPEED = 45;
  var DELETE_SPEED = 25;
  var PULSE_DURATION = 420; // matches the .is-pulsing keyframe duration in components.css
  var quoteTimer = null;

  function typeChars(text, i, onDone) {
    if (!quoteText) return;
    quoteText.textContent = text.slice(0, i);
    if (i >= text.length) {
      onDone();
      return;
    }
    quoteTimer = window.setTimeout(function () { typeChars(text, i + 1, onDone); }, TYPE_SPEED);
  }

  function deleteChars(text, i, onDone) {
    if (!quoteText) return;
    quoteText.textContent = text.slice(0, i);
    if (i <= 0) {
      onDone();
      return;
    }
    quoteTimer = window.setTimeout(function () { deleteChars(text, i - 1, onDone); }, DELETE_SPEED);
  }

  function runCycle(quoteIndex) {
    var text = QUOTES[quoteIndex];
    typeChars(text, 0, function () {
      pulseQuoteBtn();
      quoteTimer = window.setTimeout(function () {
        deleteChars(text, text.length, function () {
          runCycle((quoteIndex + 1) % QUOTES.length);
        });
      }, PULSE_DURATION);
    });
  }

  function startQuoteAnimation() {
    if (quoteTimer) window.clearTimeout(quoteTimer);
    runCycle(0);
  }

  if (quoteInput) startQuoteAnimation();

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      if (item.classList.contains('is-active')) return;

      items.forEach(function (i) {
        var active = i === item;
        i.classList.toggle('is-active', active);
        i.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      desc.classList.add('is-leaving');
      window.setTimeout(function () {
        desc.textContent = item.dataset.desc;
        desc.classList.remove('is-leaving');
        desc.classList.add('is-entering');
        void desc.offsetHeight;
        desc.classList.remove('is-entering');
      }, 200);

      var isStepOne = item.dataset.step === '1';

      if (image && item.dataset.img) {
        image.classList.add('is-fading');
        window.setTimeout(function () {
          image.src = item.dataset.img;
          image.classList.toggle('platform-steps__image--cover', isStepOne);
          image.classList.remove('is-fading');
        }, 200);
      }

      if (quoteInput) {
        quoteInput.classList.toggle('is-hidden', !isStepOne);
        if (isStepOne) startQuoteAnimation();
      }
    });
  });
})();
