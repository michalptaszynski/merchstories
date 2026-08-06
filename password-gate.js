(function () {
  var CORRECT_PASSWORD = 'shipbox42';
  var gate = document.getElementById('passwordGate');
  var content = document.getElementById('siteContent');
  var form = document.getElementById('passwordGateForm');
  var input = document.getElementById('passwordGateInput');
  var error = document.getElementById('passwordGateError');

  function unlock() {
    gate.style.display = 'none';
    content.style.display = '';
    window.dispatchEvent(new Event('resize'));
  }

  if (sessionStorage.getItem('phGateOk') === '1') {
    unlock();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value === CORRECT_PASSWORD) {
      sessionStorage.setItem('phGateOk', '1');
      unlock();
    } else {
      error.style.display = 'block';
      input.value = '';
      input.focus();
    }
  });
})();
