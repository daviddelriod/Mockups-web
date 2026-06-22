/* =========================================================
   La Flaca Pokè Bar — interacciones
   ========================================================= */

/* ---- Nav: fondo al hacer scroll ---- */
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---- Menú móvil ---- */
const burger = document.querySelector('.nav__burger');
const links = document.querySelector('.nav__links');
burger.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

/* ---- Reveal on scroll ---- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* =========================================================
   CREA TU POKE
   ========================================================= */
const SIZES = {
  mediano: { name: 'Mediano', price: 9.90, limits: { base: 1, proteina: 1, ingredientes: 4, toppings: 2, salsa: 1 } },
  grande:  { name: 'Grande',  price: 12.90, limits: { base: 2, proteina: 2, ingredientes: 5, toppings: 3, salsa: 1 } },
};
const STEPS = {
  base:        { label: 'Base',        items: ['Arroz de sushi', 'Quinoa', 'Pasta', 'Hojas verdes'] },
  proteina:    { label: 'Proteína',    items: ['Salmón', 'Atún', 'Gambones', 'Pollo', 'Tofu'] },
  ingredientes:{ label: 'Ingredientes',items: ['Aguacate', 'Edamame', 'Wakame', 'Tomate cherry', 'Maíz', 'Rabanito', 'Mango', 'Cebolla encurtida', 'Pepino', 'Zanahoria', 'Queso crema', 'Piña'] },
  toppings:    { label: 'Crunchy',     items: ['Cebolla crujiente', 'Cacahuete', 'Nueces', 'Sésamo', 'Shichimi', 'Alga nori'] },
  salsa:       { label: 'Salsa',       items: ['La Flaca', 'Teriyaki', 'Soja', 'Spicy mayo', 'Miel y mostaza', 'Mango picante'] },
};
const EXTRA_PRICE = 0.50; // ingrediente extra por encima del límite

let currentSize = 'mediano';
const selected = { base: [], proteina: [], ingredientes: [], toppings: [], salsa: [] };

const stepsHost = document.getElementById('builder-steps');
const sizeRow = document.getElementById('size-row');

/* render selector de tamaño */
function renderSizes() {
  sizeRow.innerHTML = '';
  Object.entries(SIZES).forEach(([key, s]) => {
    const l = s.limits;
    const spec = `${l.base} base · ${l.proteina} proteína · ${l.ingredientes} ingr. · ${l.toppings} crunchy · ${l.salsa} salsa`;
    const el = document.createElement('button');
    el.className = 'size-opt' + (key === currentSize ? ' active' : '');
    el.innerHTML = `
      <div class="s-name">Tamaño ${s.name} <span class="s-price">${s.price.toFixed(2).replace('.', ',')} €</span></div>
      <div class="s-spec">${spec}</div>`;
    el.addEventListener('click', () => {
      currentSize = key;
      // recortar selecciones que excedan los nuevos límites
      Object.keys(selected).forEach(k => {
        const max = SIZES[currentSize].limits[k];
        if (selected[k].length > max) selected[k] = selected[k].slice(0, max);
      });
      renderSizes(); renderSteps(); renderSummary();
    });
    sizeRow.appendChild(el);
  });
}

/* render pasos con chips */
function renderSteps() {
  const limits = SIZES[currentSize].limits;
  stepsHost.innerHTML = '';
  Object.entries(STEPS).forEach(([key, step]) => {
    const max = limits[key];
    const sel = selected[key];
    const full = sel.length >= max;
    const wrap = document.createElement('div');
    wrap.className = 'step';
    wrap.innerHTML = `
      <div class="step__head">
        <h4>${step.label}</h4>
        <span class="count ${full ? 'full' : ''}">${sel.length}/${max}</span>
      </div>`;
    const chips = document.createElement('div');
    chips.className = 'chips';
    step.items.forEach(item => {
      const isSel = sel.includes(item);
      const chip = document.createElement('span');
      chip.className = 'chip' + (isSel ? ' sel' : '') + (!isSel && full ? ' disabled' : '');
      chip.textContent = item;
      chip.addEventListener('click', () => {
        const i = sel.indexOf(item);
        if (i > -1) sel.splice(i, 1);
        else if (sel.length < max) sel.push(item);
        renderSteps(); renderSummary();
      });
      chips.appendChild(chip);
    });
    wrap.appendChild(chips);
    stepsHost.appendChild(wrap);
  });
}

/* render resumen */
function renderSummary() {
  const s = SIZES[currentSize];
  const listHost = document.getElementById('summary-list');
  const order = ['base', 'proteina', 'ingredientes', 'toppings', 'salsa'];
  listHost.innerHTML = order.map(k => {
    const val = selected[k].length ? selected[k].join(', ') : '—';
    return `<div class="row"><span>${STEPS[k].label}</span><b>${val}</b></div>`;
  }).join('');

  // sin extras posibles (los límites lo impiden), el precio es el del tamaño
  document.getElementById('summary-amt').textContent = s.price.toFixed(2).replace('.', ',') + ' €';
  const total = order.reduce((n, k) => n + selected[k].length, 0);
  document.getElementById('summary-count').textContent = total;
}

renderSizes();
renderSteps();
renderSummary();
