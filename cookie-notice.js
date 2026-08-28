(function () {
  var notice = document.getElementById('cookieNotice');
  if (!notice) return;

  var STORAGE_KEY = 'phCookieConsent';
  var overlay = document.getElementById('cookieModalOverlay');
  var settingsModal = document.getElementById('cookieSettingsModal');
  var cancelModal = document.getElementById('cookieCancelModal');
  var analyticsToggle = document.getElementById('cookieAnalyticsToggle');
  var footerSettingsLink = document.getElementById('footerCookieSettings');

  var stored = localStorage.getItem(STORAGE_KEY);
  var hasConsent = !!stored;

  if (!hasConsent) {
    notice.hidden = false;
  }

  function persist(consent, analytics) {
    stored = JSON.stringify({ consent: consent, analytics: analytics });
    localStorage.setItem(STORAGE_KEY, stored);
    hasConsent = true;
  }

  function closeAll() {
    overlay.classList.remove('is-open');
    settingsModal.classList.remove('is-open');
    settingsModal.setAttribute('aria-hidden', 'true');
    cancelModal.classList.remove('is-open');
    cancelModal.setAttribute('aria-hidden', 'true');
  }

  function openSettings() {
    notice.hidden = true;
    if (stored) {
      analyticsToggle.checked = JSON.parse(stored).analytics;
    }
    overlay.classList.add('is-open');
    cancelModal.classList.remove('is-open');
    cancelModal.setAttribute('aria-hidden', 'true');
    settingsModal.classList.add('is-open');
    settingsModal.setAttribute('aria-hidden', 'false');
  }

  function openCancelConfirm() {
    settingsModal.classList.remove('is-open');
    settingsModal.setAttribute('aria-hidden', 'true');
    cancelModal.classList.add('is-open');
    cancelModal.setAttribute('aria-hidden', 'false');
  }

  function dismissNotice() {
    notice.hidden = true;
  }

  function cancelSettings() {
    if (hasConsent) {
      closeAll();
    } else {
      openCancelConfirm();
    }
  }

  document.getElementById('cookieNoticeAccept').addEventListener('click', function () {
    persist('accepted', true);
    dismissNotice();
  });
  document.getElementById('cookieNoticeSettings').addEventListener('click', openSettings);
  document.getElementById('cookieNoticeMore').addEventListener('click', function (e) {
    e.preventDefault();
    openSettings();
  });
  if (footerSettingsLink) {
    footerSettingsLink.addEventListener('click', function (e) {
      e.preventDefault();
      openSettings();
    });
  }

  document.getElementById('cookieSettingsCancel').addEventListener('click', cancelSettings);
  document.getElementById('cookieSettingsSave').addEventListener('click', function () {
    persist('customised', analyticsToggle.checked);
    closeAll();
    dismissNotice();
  });

  document.getElementById('cookieCancelBack').addEventListener('click', openSettings);
  document.getElementById('cookieCancelConfirm').addEventListener('click', function () {
    persist('declined', false);
    closeAll();
    dismissNotice();
  });

  overlay.addEventListener('click', function () {
    if (cancelModal.classList.contains('is-open')) {
      openSettings();
    } else if (settingsModal.classList.contains('is-open')) {
      cancelSettings();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (cancelModal.classList.contains('is-open')) {
      openSettings();
    } else if (settingsModal.classList.contains('is-open')) {
      cancelSettings();
    }
  });
})();
