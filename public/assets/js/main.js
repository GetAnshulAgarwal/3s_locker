// Splash screen: shown once per visit, click to skip
(function () {
  var root = document.documentElement;
  var splash = document.getElementById('splash');
  if (!splash || !root.classList.contains('splash-on')) return;
  var done = false;
  function finish() {
    if (done) return;
    done = true;
    try { sessionStorage.setItem('3s_splash', '1'); } catch (e) {}
    splash.classList.add('splash-hide');
    setTimeout(function () { root.classList.remove('splash-on'); }, 650);
  }
  splash.addEventListener('click', finish);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' || e.key === 'Enter') finish(); });
  var started = Date.now();
  function whenReady() {
    var wait = Math.max(0, 3200 - (Date.now() - started));
    setTimeout(finish, wait);
  }
  if (document.readyState === 'complete') whenReady(); else window.addEventListener('load', whenReady);
})();

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

// Email chooser: clicking any mailto link offers Gmail / Outlook / mail app / copy.
// Phones skip the chooser and open their own mail app directly.
(function () {
  var isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  var modal = null;

  function build() {
    modal = document.createElement('div');
    modal.className = 'mail-modal';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'mail-title');
    modal.innerHTML =
      '<div class="mail-card">' +
        '<button type="button" class="mail-close" aria-label="Close">×</button>' +
        '<h3 id="mail-title">✉️ Email 3S Safe Storage</h3>' +
        '<p class="mail-addr"></p>' +
        '<a class="mail-opt" data-k="gmail" target="_blank" rel="noopener"><span>📧</span> Open in Gmail</a>' +
        '<a class="mail-opt" data-k="outlook" target="_blank" rel="noopener"><span>📨</span> Open in Outlook</a>' +
        '<a class="mail-opt" data-k="app"><span>💻</span> Open my email app</a>' +
        '<button type="button" class="mail-opt" data-k="copy"><span>📋</span> <em>Copy email address</em></button>' +
      '</div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('.mail-close')) close();
      if (e.target.closest('[data-k="app"]') || e.target.closest('[data-k="gmail"]') || e.target.closest('[data-k="outlook"]')) setTimeout(close, 150);
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });
  }

  function close() { if (modal) modal.hidden = true; }

  function open(href) {
    if (!modal) build();
    var u = new URL(href);
    var to = decodeURIComponent(u.pathname);
    var subject = u.searchParams.get('subject') || 'Enquiry from 3S website';
    var enc = encodeURIComponent;
    modal.querySelector('.mail-addr').textContent = to;
    modal.querySelector('[data-k="gmail"]').href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + enc(to) + '&su=' + enc(subject);
    modal.querySelector('[data-k="outlook"]').href = 'https://outlook.live.com/mail/0/deeplink/compose?to=' + enc(to) + '&subject=' + enc(subject);
    modal.querySelector('[data-k="app"]').href = 'mailto:' + to + '?subject=' + enc(subject);
    var copy = modal.querySelector('[data-k="copy"]');
    var label = copy.querySelector('em');
    label.textContent = 'Copy email address';
    copy.onclick = function () {
      function done() { label.textContent = 'Copied ✓'; }
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(to).then(done, done);
      else {
        var t = document.createElement('textarea');
        t.value = to; document.body.appendChild(t); t.select();
        try { document.execCommand('copy'); } catch (err) {}
        document.body.removeChild(t); done();
      }
    };
    modal.hidden = false;
    modal.querySelector('.mail-opt').focus();
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="mailto:"]');
    if (!a || isMobile || a.closest('.mail-modal')) return;
    e.preventDefault();
    open(a.href);
  });
})();
