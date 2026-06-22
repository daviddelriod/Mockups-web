/* Bar Izar — interacciones de la web */
(function () {
  'use strict';

  /* ---- Estrellas (4,5 sobre 5) ---- */
  function starSVG(fill) {
    // fill: 'full' | 'half' | 'empty'
    var id = 'g' + Math.random().toString(36).slice(2, 8);
    var def = fill === 'half'
      ? '<defs><linearGradient id="' + id + '"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="currentColor" stop-opacity=".25"/></linearGradient></defs>'
      : '';
    var paint = fill === 'half' ? 'url(#' + id + ')' : (fill === 'empty' ? 'currentColor' : 'currentColor');
    var op = fill === 'empty' ? ' opacity=".25"' : '';
    return '<svg viewBox="0 0 24 24"' + op + ' aria-hidden="true">' + def +
      '<path fill="' + paint + '" d="M12 1.6l2.92 6.13 6.74.83-4.97 4.6 1.3 6.65L12 17.7l-6 3.12 1.3-6.65-4.96-4.6 6.74-.83z"/></svg>';
  }
  function renderStars(el, value) {
    var html = '';
    for (var i = 1; i <= 5; i++) {
      if (value >= i) html += starSVG('full');
      else if (value >= i - 0.5) html += starSVG('half');
      else html += starSVG('empty');
    }
    el.innerHTML = html;
  }
  document.querySelectorAll('[data-stars] .stars, .stars[data-stars]').forEach(function (el) {
    renderStars(el, 4.5);
  });
  // also fill bare .stars inside [data-stars] wrappers
  document.querySelectorAll('[data-stars]').forEach(function (w) {
    var s = w.matches('.stars') ? w : w.querySelector('.stars');
    if (s && !s.children.length) renderStars(s, 4.5);
  });
  document.querySelectorAll('.rev-card .stars').forEach(function (s) {
    if (!s.children.length) renderStars(s, 5);
  });

  /* ---- Switcher de portada (persistente) ---- */
  var KEY = 'izar.hero';
  var heros = { '1': document.getElementById('hero1'), '2': document.getElementById('hero2'), '3': document.getElementById('hero3') };
  var buttons = document.querySelectorAll('.hero-switch button');
  function setHero(n) {
    n = String(n);
    if (!heros[n]) n = '1';
    Object.keys(heros).forEach(function (k) {
      heros[k].classList.toggle('is-active', k === n);
    });
    buttons.forEach(function (b) { b.classList.toggle('active', b.dataset.hero === n); });
    try { localStorage.setItem(KEY, n); } catch (e) {}
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setHero(b.dataset.hero); });
  });
  var saved = '1';
  try { saved = localStorage.getItem(KEY) || '1'; } catch (e) {}
  setHero(saved);

  /* ---- Reveal on scroll ---- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Mapa: ocultar fallback al cargar ---- */
  var mapIframe = document.querySelector('.map-card iframe');
  var mapFb = document.querySelector('.map-fallback');
  if (mapIframe && mapFb) {
    mapIframe.addEventListener('load', function () { mapFb.style.display = 'none'; });
    setTimeout(function () { mapFb.style.display = 'none'; }, 4000);
  }
})();
