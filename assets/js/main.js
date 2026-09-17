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

  /* ---- MEGADUCT component breakdown --------------------------------------- *
     A tablist over a media stage. Each tab names the plate it wants via
     data-plate; the stage shows whichever direct child carries the matching
     key, whatever that element is (see the MEDIA STAGE note in
     linkk-2026.css). Items for parts that sit inside the enclosure have no
     photograph of their own and point back at the full-run plate — nothing
     is fabricated.

     A tab may also declare data-media="video", which surfaces the play
     button over the stage and dispatches a `mg:play` event when pressed, so
     a future hardware-breakdown video or exploded-view viewer can hook in
     without this block changing.                                            */
  var mgList = doc.querySelector('[data-mg-list]');
  if (mgList) {
    var stage = doc.querySelector('[data-mg-stage]');
    var plates = stage ? stage.querySelectorAll('[data-plate]') : [];
    var capT = doc.querySelector('[data-mg-cap-title]');
    var capN = doc.querySelector('[data-mg-cap-note]');
    var play = doc.querySelector('[data-mg-play]');
    var plate = doc.querySelector('.mg-plate');
    var items = mgList.querySelectorAll('.mg-item');

    var select = function (btn, focus) {
      var want = btn.getAttribute('data-plate');

      Array.prototype.forEach.call(items, function (i) {
        var on = i === btn;
        i.classList.toggle('is-on', on);
        i.setAttribute('aria-selected', String(on));
        /* Roving tabindex: only the selected tab is in the tab order, and
           the arrow keys move between them. */
        i.setAttribute('tabindex', on ? '0' : '-1');
      });
      Array.prototype.forEach.call(plates, function (el) {
        el.classList.toggle('is-on', el.getAttribute('data-plate') === want);
      });
      if (capT) capT.textContent = btn.getAttribute('data-cap') || '';
      if (capN) capN.textContent = btn.getAttribute('data-note') || '';

      var hasMedia = btn.getAttribute('data-media') === 'video';
      if (plate) plate.classList.toggle('has-media', hasMedia);
      if (play) play.hidden = !hasMedia;

      if (focus) btn.focus();
    };

    Array.prototype.forEach.call(items, function (btn) {
      btn.addEventListener('click', function () { select(btn); });
    });

    mgList.addEventListener('keydown', function (ev) {
      var keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      var step = keys[ev.key];
      var list = Array.prototype.slice.call(items);
      var at = list.indexOf(doc.activeElement);
      if (at === -1) return;

      if (step) {
        ev.preventDefault();
        select(list[(at + step + list.length) % list.length], true);
      } else if (ev.key === 'Home') {
        ev.preventDefault();
        select(list[0], true);
      } else if (ev.key === 'End') {
        ev.preventDefault();
        select(list[list.length - 1], true);
      }
    });

    if (play) {
      play.addEventListener('click', function () {
        var on = mgList.querySelector('.mg-item.is-on');
        var el = stage && stage.querySelector('[data-plate].is-on');
        /* If the active plate is a real <video>, just play it. Anything else
           (an embed, a 3D viewer) listens for the event instead. */
        if (el && typeof el.play === 'function') { el.play(); return; }
        stage.dispatchEvent(new CustomEvent('mg:play', {
          bubbles: true,
          detail: { plate: on && on.getAttribute('data-plate') }
        }));
      });
    }

    select(items[0]);
  }

  /* ---- Engineering journey progress --------------------------------------- *
     Drives the connecting rule's --p (0 to 1) from the section's position in
     the viewport, and lights each step as it is reached.                     */
  var jrn = doc.querySelector('[data-journey]');
  if (jrn && !reduced) {
    var line = jrn.querySelector('.jrn-line');
    var steps = jrn.querySelectorAll('.jrn-step');
    var track = jrn.querySelector('.jrn-track');

    var tick = function () {
      var r = jrn.getBoundingClientRect();
      var vh = window.innerHeight;
      /* 0 when the section's top reaches 80% of the viewport, 1 once its
         bottom passes 40% — the rule fills across the readable window. */
      var p = (vh * 0.8 - r.top) / (r.height + vh * 0.4);
      p = Math.max(0, Math.min(1, p));
      if (line) line.style.setProperty('--p', p.toFixed(3));
      Array.prototype.forEach.call(steps, function (s, i) {
        s.classList.toggle('is-in', p >= (i + 0.5) / steps.length);
      });
    };

    /* The mobile rail scrolls horizontally instead; light every step so the
       swipe view is never half-dimmed. */
    var syncMode = function () {
      if (track && track.scrollWidth > track.clientWidth + 4) {
        Array.prototype.forEach.call(steps, function (s) { s.classList.add('is-in'); });
        if (line) line.style.setProperty('--p', '1');
      } else {
        tick();
      }
    };

    window.addEventListener('scroll', syncMode, { passive: true });
    window.addEventListener('resize', syncMode);
    syncMode();
  } else if (jrn) {
    Array.prototype.forEach.call(jrn.querySelectorAll('.jrn-step'), function (s) {
      s.classList.add('is-in');
    });
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

  /* ---- System flow (Products) --------------------------------------------- *
     Same scroll-linked mechanic as the Home page timeline, on the same markup
     shape, so the two read as one motion language. Guarded on [data-flow],
     so every page without one skips it.                                     */
  var flow = doc.querySelector('[data-flow]');
  if (flow && !reduced) {
    var fLine = flow.querySelector('.flow-line');
    var fSteps = flow.querySelectorAll('.flow-step');
    var fTrack = flow.querySelector('.flow-track');

    var fTick = function () {
      var r = flow.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = (vh * 0.8 - r.top) / (r.height + vh * 0.4);
      p = Math.max(0, Math.min(1, p));
      if (fLine) fLine.style.setProperty('--p', p.toFixed(3));
      Array.prototype.forEach.call(fSteps, function (s, i) {
        s.classList.toggle('is-in', p >= (i + 0.5) / fSteps.length);
      });
    };
    /* The mobile rail scrolls sideways instead, so light every stage rather
       than leaving half the swipe view dimmed. */
    var fSync = function () {
      if (fTrack && fTrack.scrollWidth > fTrack.clientWidth + 4) {
        Array.prototype.forEach.call(fSteps, function (s) { s.classList.add('is-in'); });
        if (fLine) fLine.style.setProperty('--p', '1');
      } else {
        fTick();
      }
    };
    window.addEventListener('scroll', fSync, { passive: true });
    window.addEventListener('resize', fSync);
    fSync();
  } else if (flow) {
    Array.prototype.forEach.call(flow.querySelectorAll('.flow-step'), function (s) {
      s.classList.add('is-in');
    });
  }

  /* ---- Component gallery (Products) --------------------------------------- *
     Each component is already a <button> carrying data-component. Until a
     detail page or panel exists there is nothing to open, so pressing one
     dispatches `comp:open` and does nothing else — wiring a modal or a route
     later means listening for that event, not re-authoring the markup.      */
  var compGrid = doc.querySelector('[data-comp-grid]');
  if (compGrid) {
    compGrid.addEventListener('click', function (ev) {
      var btn = ev.target.closest ? ev.target.closest('.comp') : null;
      if (!btn) return;
      compGrid.dispatchEvent(new CustomEvent('comp:open', {
        bubbles: true,
        detail: {
          component: btn.getAttribute('data-component'),
          name: (btn.querySelector('.nm') || {}).textContent
        }
      }));
    });
  }

  /* ---- Instrument trace --------------------------------------------------- *
     Sets each path's own length as --len so the dash animation in CSS draws
     it exactly, whatever the path.                                           */
  Array.prototype.forEach.call(doc.querySelectorAll('.trace-path'), function (p) {
    if (typeof p.getTotalLength === 'function') {
      p.style.setProperty('--len', Math.ceil(p.getTotalLength()));
    }
  });

  /* ---- Footer year -------------------------------------------------------- */
  var yr = doc.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
