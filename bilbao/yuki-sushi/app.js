/* ============================================================
   YUKI SUSHI — page behaviour
   loader · sticky nav · scroll reveal · mobile menu
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
    setTimeout(function () { if (l && l.parentNode) l.parentNode.removeChild(l); }, 800);
  }
  window.addEventListener('load', function () {
    setTimeout(dismissLoader, 1900);
  });
  // safety net
  setTimeout(dismissLoader, 4200);

  /* ---------- Sticky nav background ---------- */
  var nav = document.querySelector('header.nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll reveal (rect-based; robust across iframes) ---------- */
  var revealEls = [];
  function revealNow(el) {
    el.classList.add('in');
    // Fallback: some embedded iframes throttle rAF so CSS animations never
    // advance. Hard-commit the end state via inline styles after the motion
    // window so content is guaranteed visible everywhere.
    var d = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
    setTimeout(function () {
      el.style.animation = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, 1100 + d);
  }
  function checkReveal() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = revealEls.length - 1; i >= 0; i--) {
      var el = revealEls[i];
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0) {
        revealNow(el);
        revealEls.splice(i, 1);
      }
    }
  }
  function initReveal() {
    revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    var ticking = false;
    function onAny() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { checkReveal(); ticking = false; });
    }
    window.addEventListener('scroll', onAny, { passive: true });
    window.addEventListener('resize', onAny, { passive: true });
    // initial passes (covers above-the-fold + late layout/font shifts)
    checkReveal();
    [120, 400, 800, 1400, 2100].forEach(function (ms) { setTimeout(checkReveal, ms); });
  }
  initReveal();

  /* ---------- Mobile menu (dropdown panel) ---------- */
  var toggle = document.querySelector('.menu-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('menu-open');
    });
    Array.prototype.forEach.call(nav.querySelectorAll('.navlinks a'), function (a) {
      a.addEventListener('click', function () { nav.classList.remove('menu-open'); });
    });
  }

  /* ---------- Hero convergence scene (fixed background; no pinning) ---------- */
  (function () {
    var hero = document.querySelector('.hero');
    var pieces = Array.prototype.slice.call(document.querySelectorAll('#pieces .piece'));
    if (!hero || !pieces.length) return;
    var piecesWrap = document.getElementById('pieces');
    var tray = document.getElementById('hero-tray');
    var cap = document.getElementById('hero-cap');
    var cue = hero.querySelector('.scrollcue');
    var stage = document.getElementById('tray-stage');
    if (!stage || !tray) return;

    // scatter state per piece: x (vw% from center), y (vh% from center), scale, rotation°
    var SCATTER = [
      { x: -30, y: -23, s: 1.16, r: -12 },
      { x:  31, y: -28, s: 0.92, r:  11 },
      { x: -40, y:   6, s: 1.04, r:   7 },
      { x:  39, y:   2, s: 1.12, r:  -9 },
      { x: -19, y:  26, s: 0.86, r:  13 },
      { x:  20, y:  28, s: 1.06, r: -11 },
      { x:   5, y: -30, s: 0.82, r:   6 },
      { x:  -7, y:  27, s: 1.00, r:  -6 }
    ];
    // landing spots on the tray, assigned per piece (fractions of tray WIDTH
    // from its centre). Rolls + gunkan stand on the back row; the wide nigiri
    // lie on the front row at their real relative size.
    // w = final drawn width as a fraction of tray width; a = image aspect (w/h)
    var TARGETS = [
      { x: -0.323, y:  0.068, w: 0.223, a: 1.74, back: false }, // p1 nigiri salmón
      { x:  0.323, y:  0.068, w: 0.229, a: 1.93, back: false }, // p2 nigiri langostino
      { x: -0.277, y: -0.123, w: 0.171, a: 0.93, back: true  }, // p3 maki sésamo
      { x:  0.277, y: -0.118, w: 0.181, a: 0.88, back: true  }, // p4 gunkan ikura
      { x: -0.094, y: -0.129, w: 0.171, a: 0.92, back: true  }, // p5 maki atún
      { x:  0.094, y: -0.129, w: 0.171, a: 0.92, back: true  }, // p6 maki pepino
      { x:  0.108, y:  0.084, w: 0.197, a: 1.37, back: false }, // p7 nigiri atún
      { x: -0.108, y:  0.084, w: 0.219, a: 1.71, back: false }  // p8 nigiri mantequilla
    ];
    var END_ROT = [-5, 4, -3, 6, -4, 3, 5, -6];
    var imgEls = pieces.map(function (p) { return p.querySelector('img'); });

    var lerp = function (a, b, t) { return a + (b - a) * t; };
    var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
    var easeInOut = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
    var smooth = function (v, a, b) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

    function render(p) {
      var vw = window.innerWidth, vh = window.innerHeight;
      var pd = clamp(vw * 0.09, 74, 128);        // matches --pd
      var n = pieces.length;

      // pieces are anchored to the tray's centre (they live inside it),
      // so the landed state needs NO per-frame tracking — it scrolls 1:1
      // with the page. Scatter positions (viewport-based) are converted
      // into tray-local coordinates each frame; only mid-flight positions
      // depend on the viewport.
      var tr = tray.getBoundingClientRect();
      var trayW = tr.width || stage.getBoundingClientRect().width || vw * 0.4;
      var tCx = tr.left + tr.width / 2;
      var tCy = tr.top + tr.height / 2;

      /* choreography (page scrolls freely, scene is background):
         p 0       — hero alone, no pieces
         p 0–.34   — pieces fade in one by one, scattered
         p .12–1   — they converge onto the tray in “Nosotros” */
      var e = easeInOut(clamp((p - 0.12) / 0.88, 0, 1));

      if (piecesWrap) {
        piecesWrap.style.opacity = '1';
        // damp the idle bobbing as pieces settle
        piecesWrap.style.setProperty('--bob', (1 - e).toFixed(3));
      }

      for (var i = 0; i < n; i++) {
        var sc = SCATTER[i];
        var tg = TARGETS[i];
        // staggered, eased fade-in so pieces appear gently, not all at once
        var aStart = 0.03 + (i / n) * 0.20;
        var pa = smooth(p, aStart, aStart + 0.16);
        var t = clamp((e - i * 0.012) / (1 - 0.084), 0, 1); // gentle stagger
        // final scale: drawn width = tg.w × trayW. The image sits in a square
        // box (--pd) with object-fit:contain, so tall images only fill
        // box×aspect of its width — compensate by the aspect ratio.
        var endS = (trayW * tg.w) / (pd * Math.min(1, tg.a));
        // scatter spot (relative to viewport centre) → tray-local coords
        var sx = vw / 2 + sc.x / 100 * vw - tCx;
        var sy = vh / 2 + sc.y / 100 * vh - tCy;
        var x = lerp(sx, tg.x * trayW, t);
        var y = lerp(sy, tg.y * trayW, t);
        var s = lerp(sc.s, endS, t);
        var r = lerp(sc.r, END_ROT[i], t);
        pieces[i].style.opacity = pa.toFixed(3);
        // ease the entrance: start a touch smaller & drifted, settle as it appears
        var entry = 1 - pa;
        pieces[i].style.zIndex = tg.back ? 2 : 3;
        pieces[i].style.transform =
          'translate(' + (x).toFixed(1) + 'px,' + (y + entry * 26).toFixed(1) + 'px) rotate(' +
          r.toFixed(2) + 'deg) scale(' + (s * (0.82 + 0.18 * pa)).toFixed(3) + ')';
        // floating → landed: the shadow tightens into a contact shadow
        if (imgEls[i]) {
          imgEls[i].style.filter = 'saturate(.82) contrast(1.04) brightness(.99) drop-shadow(0 ' +
            lerp(16, 5, t).toFixed(1) + 'px ' + lerp(18, 6, t).toFixed(1) + 'px rgba(30,20,12,' +
            lerp(0.22, 0.34, t).toFixed(3) + '))';
        }
      }

      // tray rises & fades in beneath the landing pieces
      var f = smooth(p, 0.2, 0.55);
      tray.style.opacity = f.toFixed(3);
      tray.style.transform = 'translateY(' + ((1 - f) * 42).toFixed(1) + 'px) scale(' +
        (0.94 + f * 0.06).toFixed(3) + ')';

      var fc = smooth(p, 0.8, 0.97);
      if (cap) cap.style.opacity = fc.toFixed(3);
      if (cue) cue.style.opacity = clamp(1 - p * 3.5, 0, 1).toFixed(3);
    }

    var lastKey = '';
    function compute() {
      // progress = scroll distance over the distance needed to bring the
      // tray (in #nosotros) up to the middle of the viewport — robust to
      // whichever element actually scrolls
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var scrolled = -hero.getBoundingClientRect().top;
      var sr = stage.getBoundingClientRect();
      var stageDocCy = sr.top + sr.height / 2 + scrolled;
      // Stretch the convergence over ~40% more scroll distance so the pieces
      // drift toward the tray gently instead of snapping as you scroll.
      var end = Math.max(stageDocCy - vh * 0.55, vh * 0.4) * 1.4;
      return clamp(scrolled / end, 0, 1);
    }

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // With reduced motion the pieces sit on the tray from the start; the
    // loop still tracks the tray's position so they scroll with the page.
    render(reduce ? 1 : compute());
    (function loop() {
      var p = reduce ? 1 : compute();
      var key = p.toFixed(4) + '|' + Math.round(stage.getBoundingClientRect().top) +
        '|' + window.innerWidth;
      if (key !== lastKey) { render(p); lastKey = key; }
      requestAnimationFrame(loop);
    })();
  })();
})();
