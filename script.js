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

  // Sign-up form. Not connected to a mailing service yet.
  var signup = document.querySelector('[data-signup]');
  if (signup) {
    signup.addEventListener('submit', function (event) {
      event.preventDefault();
      var reply = signup.querySelector('.signup-reply');
      if (reply) reply.textContent = 'Thank you. Sign-up opens shortly, please check back soon.';
    });
  }

  // Contact form. Shows a note until a form service is connected.
  var pending = document.querySelector('form[data-pending]');
  if (pending) {
    pending.addEventListener('submit', function (event) {
      event.preventDefault();
      var reply = pending.querySelector('.signup-reply');
      if (reply) reply.textContent = 'Messages are not open yet. Please check back soon.';
    });
  }
})();
