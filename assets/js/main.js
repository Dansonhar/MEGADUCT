/* MEGADUCT — site behaviour
   Vanilla JS, no dependencies. */
(function () {
  'use strict';

  var doc = document;

  /* ---- Mobile navigation ------------------------------------------------ */
  var burger = doc.querySelector('.burger');
  var mnav = doc.querySelector('.drawer');
  var scrim = doc.querySelector('.scrim');
  var mclose = doc.querySelector('.drawer-close');

  function setNav(open) {
    if (!mnav) return;
    mnav.classList.toggle('is-open', open);
    if (scrim) scrim.classList.toggle('is-open', open);
    if (burger) {
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    }
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
    if (header) header.classList.toggle('is-stuck', y > 4);
    if (toTop) toTop.classList.toggle('is-on', y > 520);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

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
    var lbCat = lb.querySelector('.lb-cap .cat');

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
        firstBad.querySelector('input, select, textarea').focus();
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

    Array.prototype.forEach.call(form.querySelectorAll('input, select, textarea'), function (input) {
      input.addEventListener('input', function () {
        input.closest('.field').classList.remove('has-error');
      });
    });
  }

  /* ---- Video facade ------------------------------------------------------- *
     Each video on the media page ships as a still image plus a play button.
     Nothing is requested from YouTube until the visitor clicks, so the page
     loads fast and sets no third-party cookies on arrival. On click the
     button is swapped for the player, already playing.
     youtube-nocookie.com is YouTube's own privacy-preserving embed host.     */
  Array.prototype.forEach.call(doc.querySelectorAll('.vframe[data-video]'), function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-video');
      if (!id) return;

      var frame = doc.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) +
                  '?autoplay=1&rel=0&modestbranding=1';
      frame.title = btn.getAttribute('data-title') || 'Video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; ' +
                    'gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true;
      frame.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');

      btn.replaceWith(frame);
      frame.focus();
    });
  });

  /* ======================================================================
     LINKK 2026 home-page behaviour.
     Every block below exits early when its markup is absent, so the other
     fifteen pages load this file and do nothing extra.
     ====================================================================== */

  var reduced = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Hero entrance ------------------------------------------------------ *
     The hero is above the fold, so an IntersectionObserver would either fire
     before the browser has painted or not fire at all. Instead the section
     opts in on the frame after load and the CSS delays stagger it. Without
     JS, or under reduced motion, .is-ready is set immediately and the
     transitions are already suppressed, so nothing is ever left invisible. */
  var hero = doc.querySelector('.hero');
  if (hero) {
    if (reduced) {
      hero.classList.add('is-ready');
    } else {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { hero.classList.add('is-ready'); });
      });
    }
  }

  /* ---- Scroll reveal ------------------------------------------------------ *
     Marks elements as in-view once. Without IntersectionObserver (or with
     reduced motion) everything is revealed immediately — the CSS keeps
     content hidden only on the assumption that this runs.                    */
  var reveals = doc.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
    } else {
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          revealObs.unobserve(e.target);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
      Array.prototype.forEach.call(reveals, function (el) { revealObs.observe(el); });
    }
  }

  /* ---- Number count-up ---------------------------------------------------- *
     Counts to data-count, preserving any prefix/suffix already in the markup
     so "5,000+" and "1992" both read correctly mid-animation.                */
  var counters = doc.querySelectorAll('[data-count]');
  if (counters.length) {
    /* Group thousands only where the authored value already did. Without
       this the year 1992 counts up to "1,992". */
    var fmt = function (n, group) {
      return group ? n.toLocaleString('en-US') : String(n);
    };

    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      if (isNaN(target)) return;
      var dur = 1500;
      var t0 = null;

      var frame = function (t) {
        if (t0 === null) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        /* ease-out cubic: fast start, settled finish — reads as instrumented
           rather than bouncy. */
        var eased = 1 - Math.pow(1 - p, 3);
        el.firstChild.nodeValue = fmt(Math.round(target * eased),
                                      el.getAttribute('data-group') === '1');
        if (p < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    if (reduced || !('IntersectionObserver' in window)) {
      /* leave the authored value in place */
    } else {
      var countObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          run(e.target);
          countObs.unobserve(e.target);
        });
      }, { threshold: 0.5 });
      Array.prototype.forEach.call(counters, function (el) {
        el.setAttribute('data-group',
          (el.textContent || '').indexOf(',') !== -1 ? '1' : '0');
        el.firstChild.nodeValue = '0';
        countObs.observe(el);
      });
    }
  }

  /* ---- Global projects filter --------------------------------------------- *
     The chip row is built from the data-industry values already on the rows,
     so a project is added by adding a row — there is no list to keep in
     sync, and rows rendered from a real project database would work the same
     way. Both the chip row and the count are hidden until this runs, so
     without JS the section is simply the full list.                         */
  var gpList = doc.querySelector('[data-gp-list]');
  var gpFilter = doc.querySelector('[data-gp-filter]');
  if (gpList && gpFilter && gpList.querySelectorAll('[data-industry]').length > 1) {
    var rows = Array.prototype.slice.call(gpList.querySelectorAll('[data-industry]'));
    var gpCount = doc.querySelector('[data-gp-count]');

    /* Label from the row's own visible sector text, so the chip always reads
       the way the row does. */
    var sectors = [];
    rows.forEach(function (r) {
      var key = r.getAttribute('data-industry');
      if (!key || sectors.some(function (s) { return s.key === key; })) return;
      var el = r.querySelector('.sector');
      sectors.push({ key: key, label: el ? el.textContent.trim() : key });
    });
    var chips = [{ key: '', label: 'All' }].concat(sectors);

    /* Search is optional: a page with no [data-gp-search] behaves exactly as
       it did before. The row's own text is the haystack, so a project is
       searchable by name, sector or country without a parallel index. */
    var gpSearch = doc.querySelector('[data-gp-search]');
    var gpEmpty = doc.querySelector('[data-gp-empty]');
    var activeKey = '';
    var query = '';

    rows.forEach(function (r) {
      r.setAttribute('data-hay', r.textContent.replace(/\s+/g, ' ').trim().toLowerCase());
    });

    var apply = function (key) {
      if (typeof key === 'string') activeKey = key;
      var shown = 0;
      rows.forEach(function (r) {
        var on = (!activeKey || r.getAttribute('data-industry') === activeKey) &&
                 (!query || r.getAttribute('data-hay').indexOf(query) > -1);
        r.hidden = !on;
        if (on) shown++;
      });
      Array.prototype.forEach.call(gpFilter.children, function (c) {
        c.setAttribute('aria-pressed', String(c.getAttribute('data-key') === activeKey));
      });
      if (gpEmpty) gpEmpty.hidden = shown > 0;
      if (gpCount) {
        gpCount.textContent = shown + (shown === 1 ? ' project' : ' projects') +
          (activeKey ? ' in ' + (chips.filter(function (c) { return c.key === activeKey; })[0] || {}).label : '') +
          (query ? ' matching \u201c' + query + '\u201d' : '');
      }
    };

    if (gpSearch) {
      gpSearch.addEventListener('input', function () {
        query = gpSearch.value.trim().toLowerCase();
        apply();
      });
      var tools = gpSearch.closest('.gp-tools');
      if (tools) tools.hidden = false;
    }

    chips.forEach(function (c) {
      var b = doc.createElement('button');
      b.type = 'button';
      b.className = 'gp-chip';
      b.textContent = c.label;
      b.setAttribute('data-key', c.key);
      b.setAttribute('aria-pressed', String(c.key === ''));
      b.addEventListener('click', function () { apply(c.key); });
      gpFilter.appendChild(b);
    });

    /* A sector row elsewhere on the page can pre-set the filter. The anchor's
       own href does the scrolling, so without JS these stay ordinary in-page
       links to the full list. */
    Array.prototype.forEach.call(doc.querySelectorAll('[data-gp-jump]'), function (a) {
      a.addEventListener('click', function () {
        if (gpSearch) { gpSearch.value = ''; query = ''; }
        apply(a.getAttribute('data-gp-jump'));
      });
    });

    /* One sector only: a filter with a single choice is noise. */
    if (sectors.length > 1) {
      gpFilter.hidden = false;
      if (gpCount) gpCount.hidden = false;
    }
    apply('');
  }

  /* ---- Home hero slider ---------------------------------------------------- *
     Three slides, cross-faded, matching the rotator on linkk.com.my. The
     markup carries slide 1 as .is-on, so with no JS the hero is simply the
     first slide and the dots never appear. Auto-advance stops on hover, on
     focus and under prefers-reduced-motion.                                  */
  var slider = doc.querySelector('[data-slider]');
  if (slider) {
    var figs = slider.querySelectorAll('[data-slide]');
    var copies = slider.querySelectorAll('[data-slide-copy]');
    var dots = slider.querySelector('[data-slide-dots]');
    if (figs.length > 1 && dots) {
      var at = 0, timer = null;
      var show = function (i) {
        at = (i + figs.length) % figs.length;
        Array.prototype.forEach.call(figs, function (f, n) { f.classList.toggle('is-on', n === at); });
        Array.prototype.forEach.call(copies, function (c, n) { c.classList.toggle('is-on', n === at); });
        Array.prototype.forEach.call(dots.children, function (b, n) {
          b.setAttribute('aria-current', String(n === at));
        });
      };
      Array.prototype.forEach.call(figs, function (f, n) {
        var b = doc.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Slide ' + (n + 1));
        b.setAttribute('aria-current', String(n === 0));
        b.addEventListener('click', function () { show(n); rest(); });
        dots.appendChild(b);
      });
      dots.hidden = false;
      var tick = function () { show(at + 1); };
      var rest = function () {
        if (timer) clearInterval(timer);
        if (!reduced) timer = setInterval(tick, 6500);
      };
      slider.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
      slider.addEventListener('mouseleave', rest);
      slider.addEventListener('focusin', function () { if (timer) clearInterval(timer); });
      slider.addEventListener('focusout', rest);
      rest();
    }
  }

  /* ---- Component page gallery ---------------------------------------------- *
     Swaps the main render for the pressed thumbnail. With no JS every
     thumbnail is still a link to its own full-size file.                      */
  var pdp = doc.querySelector('[data-pdp]');
  if (pdp) {
    var main = pdp.querySelector('[data-pdp-main]');
    var thumbs = pdp.querySelectorAll('[data-pdp-thumb]');
    if (main && thumbs.length > 1) {
      Array.prototype.forEach.call(thumbs, function (t, n) {
        t.addEventListener('click', function (ev) {
          ev.preventDefault();
          main.src = t.getAttribute('data-full');
          main.alt = t.getAttribute('data-alt') || main.alt;
          Array.prototype.forEach.call(thumbs, function (o, m) {
            o.setAttribute('aria-current', String(m === n));
          });
        });
      });
    }
  }

  /* ---- Footer year -------------------------------------------------------- */
  var yr = doc.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Image warming ------------------------------------------------------ *
     The product renders are photographed on white and drop that background
     with mix-blend-mode, which can only do its job once the file has decoded.
     Left as loading="lazy" they arrive at the exact moment they scroll into
     view, which is the one moment the seam can show.

     So once the page has loaded and the browser is idle, every remaining lazy
     image is upgraded to eager and decoded off the main thread, a few at a
     time so the warming never competes with what is already on screen. By the
     time the reader reaches an image it is already in the cache, decoded.

     Skipped entirely on Save-Data or a 2G-class connection: pre-fetching 15
     product shots is the wrong trade there, and lazy loading stays as it was. */
  var warmImages = function () {
    var c = navigator.connection;
    if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))) return;

    var lazy = [];
    Array.prototype.forEach.call(doc.querySelectorAll('img[loading="lazy"]'), function (im) {
      lazy.push(im);
    });

    var i = 0;
    var batch = function () {
      for (var n = 0; n < 4 && i < lazy.length; n++, i++) {
        var im = lazy[i];
        im.loading = 'eager';
        /* decode() moves the decode off the scroll path. It rejects if the
           image is detached or fails to load — neither is worth reporting. */
        if (typeof im.decode === 'function') im.decode().catch(function () {});
      }
      if (i < lazy.length) setTimeout(batch, 140);
    };
    batch();
  };

  var whenIdle = function (fn) {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(fn, { timeout: 2500 });
    } else {
      setTimeout(fn, 600);
    }
  };

  if (doc.readyState === 'complete') whenIdle(warmImages);
  else window.addEventListener('load', function () { whenIdle(warmImages); });

  /* ---- Image protection --------------------------------------------------- *
     Photography on this site is the client's own, so the images are not left
     draggable onto the desktop or into another tab.

     Two listeners rather than a `draggable="false"` attribute on 83 <img>
     tags: one place to change, and it also covers anything added later.
     The CSS carries -webkit-user-drag, which handles Chrome and Safari on its
     own; this is what covers Firefox, and what stops the drag of a figure or
     a link that happens to wrap an image.

     This is a deterrent, not protection. The files are still served over HTTP
     and remain reachable through view-source, devtools and the network tab.
     Anything that genuinely must not be copied should not be published.       */
  var isImage = function (el) {
    for (var n = el; n && n !== doc.documentElement; n = n.parentNode) {
      if (n.nodeType === 1 && (n.tagName === 'IMG' || n.tagName === 'PICTURE')) return true;
    }
    return false;
  };

  doc.addEventListener('dragstart', function (e) {
    if (isImage(e.target)) e.preventDefault();
  });

  /* Right-click is blocked over images only. Blocking it document-wide would
     take away Copy, Paste and the spell-checker on the enquiry form. */
  doc.addEventListener('contextmenu', function (e) {
    if (isImage(e.target)) e.preventDefault();
  });
})();
