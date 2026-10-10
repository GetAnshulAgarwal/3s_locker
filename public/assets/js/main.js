(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll to top
  var toTop = document.getElementById('to-top');
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Contact form submission
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  var submitBtn = document.getElementById('contact-submit');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        setStatus('Please fill in your name, email and message.', 'error');
        return;
      }

      // Quote-page extras are folded into the message
      var extras = '';
      if (form.elements.lockers && form.elements.lockers.value) extras += 'Lockers needed: ' + form.elements.lockers.value + '\n';
      if (form.elements.industry) extras += 'Industry: ' + form.elements.industry.value + '\n';
      if (extras) message = extras + '\n' + message;

      var payload = {
        name: name,
        email: email,
        phone: form.phone.value.trim(),
        message: message,
        company: form.company.value // honeypot
      };

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      setStatus('', '');

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
        .then(function (result) {
          if (result.ok && result.data.ok) {
            form.reset();
            setStatus('Thanks! Your message has been sent — we\'ll get back to you shortly.', 'success');
          } else {
            setStatus((result.data && result.data.error) || 'Something went wrong. Please try again or call us directly.', 'error');
          }
        })
        .catch(function () {
          setStatus('Network error. Please check your connection or call us directly.', 'error');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        });
    });
  }

  function setStatus(msg, type) {
    if (!status) return;
    status.textContent = msg;
    status.className = 'form-status' + (type ? ' ' + type : '');
  }
})();

// Dropdown toggles (touch / keyboard) and site search
(function () {
  document.querySelectorAll('.has-drop > .navtop').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-drop')) {
      document.querySelectorAll('.has-drop.open').forEach(function (li) { li.classList.remove('open'); });
    }
  });

  // Site-wide search over /assets/search-index.json (built by tools/build-pages.js)
  var search = document.getElementById('site-search');
  if (!search) return;
  var box = document.createElement('div');
  box.className = 'search-results';
  box.setAttribute('role', 'listbox');
  box.hidden = true;
  search.parentElement.appendChild(box);

  var index = null;
  var loading = false;
  var current = [];
  var active = -1;

  function load(cb) {
    if (index) return cb();
    if (loading) return;
    loading = true;
    fetch('/assets/search-index.json')
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; cb(); })
      .catch(function () { index = []; cb(); });
  }

  function esc(t) {
    return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function snippet(text, q) {
    var i = text.toLowerCase().indexOf(q);
    if (i < 0) return text.slice(0, 90);
    var start = Math.max(0, i - 40);
    return (start > 0 ? '…' : '') + text.slice(start, i + q.length + 60) + '…';
  }

  function run() {
    var q = search.value.trim().toLowerCase();
    active = -1;
    if (q.length < 2) { box.hidden = true; current = []; return; }
    var words = q.split(/\s+/);
    current = index
      .map(function (p) {
        var title = p.t.toLowerCase();
        var text = p.x.toLowerCase();
        var score = 0;
        if (title.indexOf(q) !== -1) score += 20;
        if (text.indexOf(q) !== -1) score += 12;
        for (var i = 0; i < words.length; i++) {
          var w = words[i];
          if (title.indexOf(w) !== -1) score += 10;
          if (p.u.indexOf(w) !== -1) score += 4;
          if (text.indexOf(w) !== -1) score += 1;
          else if (title.indexOf(w) === -1 && p.u.indexOf(w) === -1) return { p: p, score: 0 };
        }
        return { p: p, score: score };
      })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 7);

    if (!current.length) {
      box.innerHTML = '<div class="sr-empty">No results for “' + esc(search.value.trim()) + '”</div>';
    } else {
      box.innerHTML = current.map(function (r, i) {
        return '<a href="' + r.p.u + '" role="option" data-i="' + i + '"><strong>' + esc(r.p.t) + '</strong><span>' + esc(snippet(r.p.x, words[0])) + '</span></a>';
      }).join('');
    }
    box.hidden = false;
  }

  function highlight() {
    var items = box.querySelectorAll('a');
    items.forEach(function (el, i) { el.classList.toggle('on', i === active); });
  }

  search.addEventListener('input', function () { load(run); });
  search.addEventListener('focus', function () { load(function () {}); });
  search.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' && current.length) { e.preventDefault(); active = (active + 1) % current.length; highlight(); }
    else if (e.key === 'ArrowUp' && current.length) { e.preventDefault(); active = (active - 1 + current.length) % current.length; highlight(); }
    else if (e.key === 'Escape') { box.hidden = true; }
    else if (e.key === 'Enter') {
      e.preventDefault();
      load(function () {
        run();
        var target = current[active >= 0 ? active : 0];
        if (target) window.location.href = target.p.u;
      });
    }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-search')) box.hidden = true;
  });
})();
