(function () {
  var form = document.getElementById('contactForm');
  var brief = document.getElementById('brief');
  var briefText = document.getElementById('briefText');
  var copyBtn = document.getElementById('copyBtn');
  var editBtn = document.getElementById('editBtn');
  var copyStatus = document.getElementById('copyStatus');
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  function setError(id, errId, msg) {
    var field = document.getElementById(id);
    document.getElementById(errId).textContent = msg;
    if (msg) { field.setAttribute('aria-invalid', 'true'); } else { field.removeAttribute('aria-invalid'); }
    return !msg;
  }

  function validate() {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var okName = setError('name', 'nameErr', name ? '' : 'Enter your name so we know who to reply to.');
    var okEmail = setError('email', 'emailErr', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter a valid email address, like name@company.com.');
    var okMsg = setError('message', 'messageErr', message.length >= 10 ? '' : 'Add a sentence or two about the project.');
    return okName && okEmail && okMsg;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      var firstBad = form.querySelector('[aria-invalid="true"]');
      if (firstBad) firstBad.focus();
      return;
    }
    var v = function (id) { return document.getElementById(id).value.trim(); };
    briefText.value = [
      'Subject: Project enquiry - ' + v('service'),
      '',
      'Hi Tessera Labs,',
      '',
      v('message'),
      '',
      'Service: ' + v('service'),
      'Timeline: ' + v('timeline'),
      '',
      'Thanks,',
      v('name'),
      v('email')
    ].join('\n');
    form.hidden = true;
    brief.hidden = false;
    copyStatus.textContent = '';
    briefText.focus();
  });

  copyBtn.addEventListener('click', function () {
    function fallback() {
      briefText.focus();
      briefText.select();
      copyStatus.textContent = 'Text selected. Press Ctrl+C (or Cmd+C) to copy.';
    }
    try {
      navigator.clipboard.writeText(briefText.value).then(function () {
        copyStatus.textContent = 'Copied to your clipboard.';
      }, fallback);
    } catch (err) { fallback(); }
  });

  editBtn.addEventListener('click', function () {
    brief.hidden = true;
    form.hidden = false;
    document.getElementById('name').focus();
  });
})();
