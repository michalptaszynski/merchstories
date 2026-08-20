(function () {
  var input = document.getElementById('cfFile');
  if (!input) return;
  var uploadZone = document.querySelector('.contact-form__upload');
  var list = document.getElementById('cfFilesList');
  var selected = [];

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function sync() {
    var dt = new DataTransfer();
    selected.forEach(function (file) { dt.items.add(file); });
    input.files = dt.files;
  }

  function render() {
    list.innerHTML = '';
    list.hidden = selected.length === 0;
    selected.forEach(function (file, index) {
      var li = document.createElement('li');
      li.className = 'contact-form__file';

      var name = document.createElement('span');
      name.className = 'contact-form__file-name';
      name.textContent = file.name;

      var size = document.createElement('span');
      size.className = 'contact-form__file-size';
      size.textContent = formatSize(file.size);

      var removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'contact-form__file-remove';
      removeBtn.setAttribute('aria-label', 'Remove ' + file.name);
      removeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>';
      removeBtn.addEventListener('click', function () {
        selected.splice(index, 1);
        sync();
        render();
      });

      li.appendChild(name);
      li.appendChild(size);
      li.appendChild(removeBtn);
      list.appendChild(li);
    });
  }

  function addFiles(fileList) {
    Array.prototype.forEach.call(fileList, function (file) {
      var exists = selected.some(function (f) {
        return f.name === file.name && f.size === file.size && f.lastModified === file.lastModified;
      });
      if (!exists) selected.push(file);
    });
    sync();
    render();
  }

  input.addEventListener('change', function () {
    addFiles(input.files);
  });

  if (uploadZone) {
    ['dragenter', 'dragover'].forEach(function (evt) {
      uploadZone.addEventListener(evt, function (e) {
        e.preventDefault();
        uploadZone.classList.add('is-dragover');
      });
    });
    ['dragleave', 'drop'].forEach(function (evt) {
      uploadZone.addEventListener(evt, function (e) {
        e.preventDefault();
        uploadZone.classList.remove('is-dragover');
      });
    });
    uploadZone.addEventListener('drop', function (e) {
      if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
    });
  }
})();
