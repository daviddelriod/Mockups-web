/* ============================================================
   YUKI SUSHI — Dirección A · comportamiento
   loader · nav sticky · scroll reveal · escena cinematográfica
   de convergencia (contenida en "Nosotros", pull de foco)
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Loader ---------- */
  document.body.classList.add('loading');
  function dismissLoader() {
    var l = document.getElementById('loader');
    if (!l) return;
    l.classList.add('done');
    document.body.classList.remove('loading');
    setTimeout(function () { if (l && l.parentNode) l.parentNode.removeChild(l); }, 900);
  }
  window.addEventListener('load', function () { setTimeout(dismissLoader, 1700); });
  setTimeout(dismissLoader, 4000);

  /* ---------- Sticky nav ---------- */
  var nav = document.querySelector('header.nav');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    function revealNow(el) {
      el.classList.add('in');
      var d = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
      setTimeout(function () {
        el.style.animation = 'none'; el.style.opacity = '1'; el.style.transform = 'none';
      }, 1200 + d);
    }
    function check() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = revealEls.length - 1; i >= 0; i--) {
        var r = revealEls[i].getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) { revealNow(revealEls[i]); revealEls.splice(i, 1); }
      }
    }
    var ticking = false;
    function onAny() { if (ticking) return; ticking = true; requestAnimationFrame(function () { check(); ticking = false; }); }
    window.addEventListener('scroll', onAny, { passive: true });
    window.addEventListener('resize', onAny, { passive: true });
    check();
    [120, 400, 800, 1400, 2100].forEach(function (ms) { setTimeout(check, ms); });
  }
  initReveal();

  /* ---------- Parallax depth (hero floats + featured piece) ---------- */
  (function () {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-par]'));
    if (!els.length) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    var hero = document.querySelector('.hero');
    var mx = 0, my = 0, sy = 0, ticking = false;
    function apply() {
      ticking = false;
      for (var i = 0; i < els.length; i++) {
        var k = parseFloat(els[i].getAttribute('data-par')) || 0;
        var base = els[i].getAttribute('data-base') || '';
        var tx = mx * k * 26;
        var ty = my * k * 26 + sy * k * 0.5;
        els[i].style.transform = base + ' translate3d(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px,0)';
      }
    }
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }
    // capture each element's authored transform (e.g. the float rotation) as a base
    els.forEach(function (el) { el.setAttribute('data-base', getComputedStyle(el).transform === 'none' ? '' : el.style.transform || ''); });
    // re-read inline transforms set by CSS class (rotation lives in stylesheet, so read once via a temp)
    els.forEach(function (el) {
      var t = '';
      if (el.classList.contains('f1')) t = 'rotate(-12deg)';
      else if (el.classList.contains('f2')) t = 'rotate(14deg)';
      else if (el.classList.contains('pc')) t = 'translate(-50%,-50%)';
      el.setAttribute('data-base', t);
    });
    window.addEventListener('mousemove', function (e) {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      req();
    }, { passive: true });
    window.addEventListener('scroll', function () {
      if (!hero) return;
      sy = Math.max(-window.innerHeight, hero.getBoundingClientRect().top);
      req();
    }, { passive: true });
    apply();
  })();

  /* ---------- Cinematic convergence scene (contained in #nosotros) ----------
     The pieces are anchored INSIDE the tray, so the landed state scrolls 1:1
     with the page — no chasing. Scatter positions are stage-local (fractions
     of tray width) so nothing depends on viewport geometry except progress.
     As the section scrolls to centre, pieces drift in from a soft, blurred,
     out-of-focus float and pull into crisp focus as they land. */
  (function () {
    var stage = document.getElementById('tray-stage');
    var tray = document.getElementById('hero-tray');
    var piecesWrap = document.getElementById('pieces');
    var cap = document.getElementById('hero-cap');
    if (!stage || !tray || !piecesWrap) return;
    var pieces = Array.prototype.slice.call(piecesWrap.querySelectorAll('.piece'));
    if (!pieces.length) return;
    var imgEls = pieces.map(function (p) { return p.querySelector('img'); });

    // scatter: loose cinematic float ABOVE / around the tray (× tray width)
    var SCATTER = [
      { x: -0.62, y: -0.92, s: 1.30, r: -13 },
      { x:  0.66, y: -1.02, s: 1.12, r:  12 },
      { x: -0.94, y: -0.34, s: 1.20, r:   8 },
      { x:  0.92, y: -0.46, s: 1.28, r: -10 },
      { x: -0.40, y: -1.18, s: 1.04, r:  14 },
      { x:  0.36, y: -1.24, s: 1.10, r: -12 },
      { x:  0.10, y: -0.74, s: 0.98, r:   7 },
      { x: -0.14, y: -1.36, s: 1.18, r:  -7 }
    ];
    // landing spots (× tray width from centre). w = drawn width / tray width,
    // a = image aspect (w/h). Calibrated to tray.png.
    var TARGETS = [
      { x: -0.323, y:  0.068, w: 0.223, a: 1.74, back: false },
      { x:  0.323, y:  0.068, w: 0.229, a: 1.93, back: false },
      { x: -0.277, y: -0.123, w: 0.171, a: 0.93, back: true  },
      { x:  0.277, y: -0.118, w: 0.181, a: 0.88, back: true  },
      { x: -0.094, y: -0.129, w: 0.171, a: 0.92, back: true  },
      { x:  0.094, y: -0.129, w: 0.171, a: 0.92, back: true  },
      { x:  0.108, y:  0.084, w: 0.197, a: 1.37, back: false },
      { x: -0.108, y:  0.084, w: 0.219, a: 1.71, back: false }
    ];
    var END_ROT = [-5, 4, -3, 6, -4, 3, 5, -6];

    var lerp = function (a, b, t) { return a + (b - a) * t; };
    var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
    var easeInOut = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
    var smooth = function (v, a, b) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

    function pieceBox() { return clamp(window.innerWidth * 0.10, 78, 132); }

    function render(p) {
      var pd = pieceBox();
      piecesWrap.style.setProperty('--pd', pd + 'px');
      pieces.forEach(function (pc) { pc.style.width = pd + 'px'; pc.style.height = pd + 'px';
        pc.style.marginLeft = (-pd / 2) + 'px'; pc.style.marginTop = (-pd / 2) + 'px'; });

      var tr = tray.getBoundingClientRect();
      var trayW = tr.width || stage.getBoundingClientRect().width || window.innerWidth * 0.5;
      var n = pieces.length;
      var e = easeInOut(clamp((p - 0.06) / 0.94, 0, 1));
      piecesWrap.style.setProperty('--bob', (1 - smooth(p, 0.4, 0.95)).toFixed(3));

      for (var i = 0; i < n; i++) {
        var sc = SCATTER[i], tg = TARGETS[i];
        var aStart = 0.02 + (i / n) * 0.26;
        var pa = smooth(p, aStart, aStart + 0.30);            // fade-in
        var t = clamp((e - i * 0.04) / (1 - 0.30), 0, 1);    // travel (más escalonado)
        var ease = easeInOut(t);
        var endS = (trayW * tg.w) / (pd * Math.min(1, tg.a));
        var sx = sc.x * trayW, sy = sc.y * trayW;
        var x = lerp(sx, tg.x * trayW, ease);
        var y = lerp(sy, tg.y * trayW, ease);
        var s = lerp(sc.s, endS, ease);
        var r = lerp(sc.r, END_ROT[i], ease);
        var entry = 1 - pa;
        var blur = lerp(7, 0, smooth(ease, 0.15, 0.92));      // focus pull
        pieces[i].style.opacity = (pa * (0.55 + 0.45 * ease)).toFixed(3);
        pieces[i].style.zIndex = tg.back ? 2 : 3;
        pieces[i].style.filter = 'blur(' + blur.toFixed(2) + 'px)';
        pieces[i].style.transform =
          'translate(' + x.toFixed(1) + 'px,' + (y + entry * 30).toFixed(1) + 'px) rotate(' +
          r.toFixed(2) + 'deg) scale(' + (s * (0.86 + 0.14 * pa)).toFixed(3) + ')';
        if (imgEls[i]) {
          imgEls[i].style.filter = 'saturate(.92) contrast(1.05) drop-shadow(0 ' +
            lerp(14, 5, ease).toFixed(1) + 'px ' + lerp(16, 7, ease).toFixed(1) + 'px rgba(0,0,0,' +
            lerp(0.5, 0.62, ease).toFixed(3) + '))';
        }
      }

      // tray rises into the spotlight
      var f = smooth(p, 0.02, 0.5);
      tray.style.opacity = f.toFixed(3);
      tray.style.transform = 'translateY(' + ((1 - f) * 46).toFixed(1) + 'px) scale(' + (0.94 + f * 0.06).toFixed(3) + ')';
      if (cap) cap.style.opacity = smooth(p, 0.82, 0.98).toFixed(3);
    }

    function compute() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var r = stage.getBoundingClientRect();
      var center = r.top + r.height / 2;
      return clamp((vh * 1.12 - center) / (vh * 1.12 - vh * 0.42), 0, 1);
    }

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var forceOn = document.documentElement.getAttribute('data-anim') === 'none';
    render((reduce || forceOn) ? 1 : compute());
    var lastKey = '';
    (function loop() {
      var p = (reduce || document.documentElement.getAttribute('data-anim') === 'none') ? 1 : compute();
      var key = p.toFixed(4) + '|' + Math.round(stage.getBoundingClientRect().top) + '|' + window.innerWidth;
      if (key !== lastKey) { render(p); lastKey = key; }
      requestAnimationFrame(loop);
    })();
  })();

  /* ---------- Carta · filtros + carrusel ---------- */
  (function () {
    var rail = document.getElementById('carta-rail');
    var bar = document.getElementById('rail-bar');
    var filters = document.getElementById('filters');
    if (!rail) return;
    var dishes = Array.prototype.slice.call(rail.querySelectorAll('.dish'));

    function updateBar() {
      var max = rail.scrollWidth - rail.clientWidth;
      var ratio = rail.clientWidth / rail.scrollWidth;
      var w = Math.min(100, Math.max(12, ratio * 100));
      var left = max > 0 ? (rail.scrollLeft / max) * (100 - w) : 0;
      if (bar) { bar.style.width = w + '%'; bar.style.left = left + '%'; }
    }
    rail.addEventListener('scroll', function () {
      if (!updateBar._t) { updateBar._t = true; requestAnimationFrame(function () { updateBar(); updateBar._t = false; }); }
    }, { passive: true });
    window.addEventListener('resize', updateBar, { passive: true });

    function step() {
      var card = rail.querySelector('.dish:not(.hide)');
      return card ? card.getBoundingClientRect().width + 14 : 320;
    }
    var prev = document.getElementById('rail-prev'), next = document.getElementById('rail-next');
    if (prev) prev.addEventListener('click', function () { rail.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { rail.scrollBy({ left: step(), behavior: 'smooth' }); });

    if (filters) {
      filters.addEventListener('click', function (e) {
        var b = e.target.closest('.filter');
        if (!b) return;
        filters.querySelectorAll('.filter').forEach(function (f) { f.classList.remove('active'); });
        b.classList.add('active');
        var cat = b.getAttribute('data-cat');
        dishes.forEach(function (d) {
          d.classList.toggle('hide', cat !== 'all' && d.getAttribute('data-cat') !== cat);
        });
        rail.scrollTo({ left: 0, behavior: 'smooth' });
        setTimeout(updateBar, 60);
      });
    }
    updateBar();
    setTimeout(updateBar, 400);
  })();

  /* ---------- Horario · estado abierto/cerrado en vivo ---------- */
  (function () {
    var statusEl = document.getElementById('open-status');
    var textEl = document.getElementById('status-text');
    var list = document.getElementById('hours-list');
    if (!statusEl || !textEl) return;
    // minutos desde medianoche; franjas por día (0=Dom … 6=Sáb)
    var SCHED = {
      0: [[780, 960]],                 // Domingo 13:00–16:00
      1: [],                           // Lunes cerrado
      2: [[780, 930], [1200, 1380]],   // Mar 13:00–15:30 · 20:00–23:00
      3: [[780, 930], [1200, 1380]],
      4: [[780, 930], [1200, 1380]],
      5: [[780, 960], [1200, 1410]],   // Vie 13:00–16:00 · 20:00–23:30
      6: [[780, 960], [1200, 1410]]
    };
    function hhmm(m) { var h = Math.floor(m / 60), n = m % 60; return h + ':' + (n < 10 ? '0' + n : n); }
    function refresh() {
      var now = new Date();
      var day = now.getDay();
      var mins = now.getHours() * 60 + now.getMinutes();
      var slots = SCHED[day] || [];
      var open = false, nextOpen = null;
      for (var i = 0; i < slots.length; i++) {
        if (mins >= slots[i][0] && mins < slots[i][1]) { open = true; var closeAt = slots[i][1]; break; }
        if (mins < slots[i][0] && nextOpen === null) nextOpen = slots[i][0];
      }
      statusEl.classList.remove('open', 'closed');
      if (open) {
        statusEl.classList.add('open');
        textEl.textContent = 'Abierto · cierra ' + hhmm(closeAt);
      } else {
        statusEl.classList.add('closed');
        textEl.textContent = nextOpen !== null ? 'Cerrado · abre ' + hhmm(nextOpen) : 'Cerrado ahora';
      }
      if (list) {
        list.querySelectorAll('.row').forEach(function (r) {
          var days = (r.getAttribute('data-days') || '').split(',');
          var isToday = days.indexOf(String(day)) !== -1;
          r.classList.toggle('today', isToday);
          var dayEl = r.querySelector('.day');
          var old = dayEl.querySelector('.tag');
          if (isToday && !old) { var t = document.createElement('span'); t.className = 'tag'; t.textContent = 'Hoy'; dayEl.appendChild(t); }
          else if (!isToday && old) { old.remove(); }
        });
      }
    }
    refresh();
    setInterval(refresh, 60000);
  })();
})();
