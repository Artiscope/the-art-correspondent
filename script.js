// The Art Correspondent. Small shared script for every page.

(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Year in the footer
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Soft fade-up as content comes into view
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (still || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var watcher = new IntersectionObserver(function (entries) {
      var shown = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        // Items arriving together follow one another, 80ms apart
        entry.target.style.setProperty('--wait', (shown * 80) + 'ms');
        entry.target.classList.add('in');
        watcher.unobserve(entry.target);
        shown += 1;
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    items.forEach(function (el) { watcher.observe(el); });
  }

  // Forms. Paste the Formspree address between the quotes below to switch them on,
  // for example 'https://formspree.io/f/abcdwxyz'. Both forms use the same address.
  var FORM_ADDRESS = '';

  var notes = {
    signup: {
      closed: 'Thank you. Sign-up opens shortly, please check back soon.',
      done: 'Thank you. You are on the list.'
    },
    contact: {
      closed: 'Messages are not open yet. Please check back soon.',
      done: 'Thank you. Your message has been sent.'
    }
  };

  Array.prototype.forEach.call(document.querySelectorAll('form[data-form]'), function (form) {
    var kind = form.getAttribute('data-form');
    var reply = form.querySelector('.signup-reply');
    var button = form.querySelector('button[type="submit"]');
    var label = button ? button.textContent : '';

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!FORM_ADDRESS) { reply.textContent = notes[kind].closed; return; }

      // A hidden field that people leave empty and junk senders fill in
      var trap = form.querySelector('input[name="_gotcha"]');
      if (trap && trap.value) { reply.textContent = notes[kind].done; return; }

      button.disabled = true;
      button.textContent = 'Sending';
      reply.textContent = '';

      fetch(FORM_ADDRESS, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (!response.ok) throw new Error('not sent');
        form.reset();
        reply.textContent = notes[kind].done;
      }).catch(function () {
        reply.textContent = 'Sorry, that did not send. Please try again in a moment.';
      }).then(function () {
        button.disabled = false;
        button.textContent = label;
      });
    });
  });
})();
