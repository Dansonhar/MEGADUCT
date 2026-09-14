/* MEGADUCT — site behaviour
   Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var doc = document;

  /* ---- Mobile navigation ------------------------------------------------ */
  var burger = doc.querySelector('.burger');
  var mnav = doc.querySelector('.mobile-nav');
  var scrim = doc.querySelector('.scrim');
  var mclose = doc.querySelector('.m-close');

  function setNav(open) {
    if (!mnav) return;
    mnav.classList.toggle('is-open', open);
    scrim.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    doc.body.style.overflow = open ? 'hidden' : '';
  }

  if (burger) burger.addEventListener('click', function () {
    setNav(!mnav.classList.contains('is-open'));
  });
  if (scrim) scrim.addEventListener('click', function () { setNav(false); });
  if (mclose) mclose.addEventListener('click', function () { setNav(false); });

  /* ---- Sticky header shadow --------------------------------------------- */
  var header = doc.querySelector('.site-header');
  var toTop = doc.querySelector('.to-top');

  function onScroll() {
    var y = window.pageYOffset;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop) toTop.classList.toggle('is-on', y > 520);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Scroll reveal ----------------------------------------------------- */
  var revealables = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  }

  /* ---- Animated stat counters ------------------------------------------- */
  var counters = doc.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var start = null;
        var dur = 1500;
        function step(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(counters, function (el) { cio.observe(el); });
  }

  /* ---- Product filtering -------------------------------------------------- */
  var pills = doc.querySelectorAll('.pill[data-filter]');
  var items = doc.querySelectorAll('[data-cat]');

  if (pills.length && items.length) {
    Array.prototype.forEach.call(pills, function (pill) {
      pill.addEventListener('click', function () {
        var filter = pill.getAttribute('data-filter');
        Array.prototype.forEach.call(pills, function (p) {
          p.classList.toggle('is-active', p === pill);
          p.setAttribute('aria-pressed', String(p === pill));
        });
        Array.prototype.forEach.call(items, function (item) {
          var show = filter === 'all' || item.getAttribute('data-cat') === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---- Product lightbox --------------------------------------------------- */
  var lb = doc.querySelector('.lb');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbTitle = lb.querySelector('.lb-cap h3');
    var lbCat = lb.querySelector('.lb-cap .p-cat');

    function closeLb() {
      lb.classList.remove('is-open');
      doc.body.style.overflow = '';
    }

    Array.prototype.forEach.call(doc.querySelectorAll('[data-lightbox]'), function (trigger) {
      trigger.addEventListener('click', function (ev) {
        ev.preventDefault();
        /* Take the URL from the card's own <img> rather than a path attribute:
           bundlers rewrite src, but leave data-* attributes untouched. */
        var source = trigger.querySelector('img');
        lbImg.src = source ? source.currentSrc || source.src : '';
        lbImg.alt = trigger.getAttribute('data-title') || '';
        lbTitle.textContent = trigger.getAttribute('data-title') || '';
        lbCat.textContent = trigger.getAttribute('data-group') || '';
        lb.classList.add('is-open');
        doc.body.style.overflow = 'hidden';
      });
    });

    lb.addEventListener('click', function (ev) {
      if (ev.target === lb || ev.target.closest('.lb-close')) closeLb();
    });
    doc.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') { closeLb(); setNav(false); }
    });
  }

  /* ---- Enquiry form validation ------------------------------------------- */
  var form = doc.querySelector('#enquiry-form');
  if (form) {
    var alertBox = doc.querySelector('.form-alert');

    function fail(field, message) {
      var wrap = field.closest('.field');
      wrap.classList.add('has-error');
      wrap.querySelector('.err').textContent = message;
      return wrap;
    }

    form.addEventListener('submit', function (ev) {
      var firstBad = null;
      Array.prototype.forEach.call(form.querySelectorAll('.field'), function (f) {
        f.classList.remove('has-error');
      });

      var name = form.elements['name'];
      var email = form.elements['email'];
      var tel = form.elements['tel'];

      if (!name.value.trim()) {
        firstBad = firstBad || fail(name, 'Please tell us your name.');
        fail(name, 'Please tell us your name.');
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        firstBad = firstBad || fail(email, 'Please enter a valid email address.');
        fail(email, 'Please enter a valid email address.');
      }
      if (!tel.value.trim()) {
        firstBad = firstBad || fail(tel, 'Please include a contact number.');
        fail(tel, 'Please include a contact number.');
      }

      if (firstBad) {
        ev.preventDefault();
        firstBad.querySelector('input, textarea').focus();
        firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      /* No mail backend wired up yet — see README. Remove this block once
         the server-side handler at the form's action URL is live. */
      if (form.getAttribute('data-demo') === 'true') {
        ev.preventDefault();
        alertBox.classList.add('is-on');
        alertBox.textContent = 'Thank you — your enquiry has been prepared. Connect the form handler to start receiving submissions by email.';
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        form.reset();
      }
    });

    Array.prototype.forEach.call(form.querySelectorAll('input, textarea'), function (input) {
      input.addEventListener('input', function () {
        input.closest('.field').classList.remove('has-error');
      });
    });
  }

  /* ---- Footer year -------------------------------------------------------- */
  var yr = doc.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
