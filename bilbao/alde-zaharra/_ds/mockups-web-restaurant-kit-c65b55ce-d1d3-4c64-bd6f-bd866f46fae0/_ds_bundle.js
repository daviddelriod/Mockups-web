/* @ds-bundle: {"format":3,"namespace":"MockupsWebRestaurantKit_c65b55","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"MenuItem","sourcePath":"components/core/MenuItem.jsx"},{"name":"ReviewCard","sourcePath":"components/core/ReviewCard.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"StarRating","sourcePath":"components/core/StarRating.jsx"},{"name":"StatusPill","sourcePath":"components/core/StatusPill.jsx"}],"sourceHashes":{"components/core/Button.jsx":"a3e8b265ee30","components/core/Card.jsx":"ca88956335ca","components/core/Chip.jsx":"6eab077f70e8","components/core/Eyebrow.jsx":"52a9f9b05da3","components/core/MenuItem.jsx":"4bdb8bfcd158","components/core/ReviewCard.jsx":"bd69a1474e39","components/core/SectionHeading.jsx":"5cbd571357f3","components/core/StarRating.jsx":"a2309d4a051f","components/core/StatusPill.jsx":"492c844fdd25","ui_kits/restaurant-landing/app.jsx":"990973190920","ui_kits/restaurant-landing/data.jsx":"51190a231369","ui_kits/restaurant-landing/icons.jsx":"32099f8b684c","ui_kits/restaurant-landing/sections.jsx":"be97a7301d63"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MockupsWebRestaurantKit_c65b55 = window.MockupsWebRestaurantKit_c65b55 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the pill-shaped call-to-action used across all mockups.
 * Variants map to the brand's button system; everything is a 999px pill
 * with a subtle lift on hover and a 1px press.
 */
function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  iconRight,
  children,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '.6em 1.1em',
      fontSize: '.92rem'
    },
    md: {
      padding: '.78em 1.4em',
      fontSize: '1.02rem'
    },
    lg: {
      padding: '.95em 1.7em',
      fontSize: '1.1rem'
    }
  };
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: '#fff',
      boxShadow: '0 10px 24px -12px var(--accent)'
    },
    dark: {
      background: 'var(--ink)',
      color: '#fff'
    },
    outline: {
      background: 'transparent',
      color: 'var(--ink)',
      border: 'var(--border-w-btn) solid var(--ink)'
    },
    ghost: {
      background: 'rgba(255,255,255,.14)',
      color: '#fff',
      border: '2px solid rgba(255,255,255,.5)',
      backdropFilter: 'blur(4px)'
    },
    whatsapp: {
      background: 'var(--whatsapp)',
      color: '#fff',
      boxShadow: '0 10px 24px -12px var(--whatsapp)'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '.55em',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    borderRadius: 'var(--radius-pill)',
    border: '2px solid transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'transform var(--dur-fast) var(--ease), background var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease)',
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: base
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: '1.1em',
      height: '1.1em'
    }
  }, icon) : null, children, iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: '1.1em',
      height: '1.1em'
    }
  }, iconRight) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the generic rounded surface. `accent` adds the signature 6px
 * colored top-bar; `tone="dark"` flips it for night sections.
 */
function Card({
  accent,
  tone = 'light',
  pad = 28,
  children,
  style,
  ...rest
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      background: dark ? 'var(--char-2)' : 'var(--paper)',
      border: dark ? '1px solid rgba(255,255,255,.08)' : '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      padding: pad,
      boxShadow: dark ? 'none' : 'var(--shadow-sm)',
      overflow: 'hidden',
      ...style
    }
  }, rest), accent ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      insetInline: 0,
      top: 0,
      height: 6,
      background: accent === true ? 'var(--accent)' : accent
    }
  }) : null, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Chip — a small rounded pill used for tags, features and ingredient lists.
 * `tone` switches the surface; `ingredient` tones echo the poke-builder chips.
 */
function Chip({
  tone = 'default',
  icon,
  children,
  style,
  ...rest
}) {
  const tones = {
    default: {
      background: 'var(--paper)',
      border: '1px solid var(--line)',
      color: 'var(--ink-soft)'
    },
    solid: {
      background: 'var(--ink)',
      border: '1px solid var(--ink)',
      color: '#fff'
    },
    accent: {
      background: 'var(--accent)',
      border: '1px solid var(--accent)',
      color: '#fff'
    },
    base: {
      background: 'var(--cream-2)',
      border: '1px solid var(--line)',
      color: 'var(--ink)'
    },
    onDark: {
      background: 'rgba(255,255,255,.12)',
      border: '1px solid rgba(255,255,255,.28)',
      color: '#fff'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '.45em',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: '.9rem',
      padding: '.42em .9em',
      borderRadius: 'var(--radius-pill)',
      ...tones[tone],
      ...style
    }
  }, rest), icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: '1em',
      height: '1em'
    }
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — the uppercase, letter-spaced kicker that sits above almost
 * every heading in the kit. Accent-colored by default.
 */
function Eyebrow({
  color,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 800,
      fontSize: 'var(--fs-eyebrow)',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: color || 'var(--accent)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '.5em',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/MenuItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MenuItem — one dish row: name, leader dots, price, and a description.
 * Optional thumbnail and a numbered tag (used in burger/menu lists).
 */
function MenuItem({
  name,
  desc,
  price,
  photo,
  num,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: '16px',
      padding: '14px 0',
      borderTop: '1px dashed var(--line)',
      ...style
    }
  }, rest), photo ? /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name,
    style: {
      width: 64,
      height: 64,
      borderRadius: 'var(--radius-sm)',
      objectFit: 'cover',
      flex: 'none'
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '10px'
    }
  }, num != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--ink)',
      color: 'var(--gold)',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '.8rem',
      borderRadius: '7px',
      padding: '1px 8px',
      flex: 'none'
    }
  }, num) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.06rem',
      letterSpacing: '-.01em',
      color: 'var(--ink)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      borderBottom: '1px dotted var(--line)',
      transform: 'translateY(-3px)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      color: 'var(--price)',
      fontSize: '1.06rem',
      whiteSpace: 'nowrap'
    }
  }, price)), desc ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--ink-soft)',
      fontSize: '.93rem',
      lineHeight: 1.4,
      margin: '4px 0 0'
    }
  }, desc) : null));
}
Object.assign(__ds_scope, { MenuItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MenuItem.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SectionHeading — the eyebrow + H2 + lead block that opens every section.
 * `align` centers it (used on menu/poster sections); `onDark` recolors text.
 */
function SectionHeading({
  eyebrow,
  eyebrowColor,
  title,
  lead,
  align = 'left',
  onDark = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      maxWidth: align === 'center' ? '720px' : '56ch',
      marginInline: align === 'center' ? 'auto' : 0,
      textAlign: align,
      ...style
    }
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '14px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    color: eyebrowColor
  }, eyebrow)) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--fs-h2)',
      color: onDark ? '#fff' : 'var(--ink)',
      margin: 0
    }
  }, title), lead ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: '18px',
      fontSize: 'var(--fs-lead)',
      lineHeight: 1.55,
      color: onDark ? 'var(--text-on-dark-soft)' : 'var(--ink-soft)',
      marginInline: align === 'center' ? 'auto' : 0,
      maxWidth: '56ch'
    }
  }, lead) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/StarRating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StarRating — the Google-rating row used in heroes, review sections and
 * footers. Renders ★/☆ glyphs in gold plus an optional score and count.
 */
function StarRating({
  value = 5,
  outOf = 5,
  score,
  count,
  size = 18,
  color,
  style,
  ...rest
}) {
  const full = Math.round(value);
  const stars = '★'.repeat(full) + '☆'.repeat(Math.max(0, outOf - full));
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      color: color || 'var(--star)',
      fontSize: size,
      letterSpacing: '2px',
      lineHeight: 1
    }
  }, stars), score != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '1.1rem',
      color: 'inherit'
    }
  }, score) : null, count != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-soft)',
      fontSize: '.95rem'
    }
  }, "\xB7 ", count, " rese\xF1as") : null);
}
Object.assign(__ds_scope, { StarRating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StarRating.jsx", error: String((e && e.message) || e) }); }

// components/core/ReviewCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ReviewCard — a customer quote with stars and author. Designed to sit in
 * a 3-up grid on dark "reviews" sections, but works on light too.
 */
function ReviewCard({
  stars = 5,
  quote,
  author,
  when,
  tone = 'dark',
  style,
  ...rest
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: dark ? 'var(--char-2)' : 'var(--paper)',
      border: dark ? '1px solid rgba(255,255,255,.08)' : '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      padding: 24,
      boxShadow: dark ? 'none' : 'var(--shadow-sm)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.StarRating, {
    value: stars
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px',
      color: dark ? 'var(--text-on-dark)' : 'var(--ink-soft)',
      fontSize: '1.02rem',
      lineHeight: 1.5
    }
  }, "\u201C", quote, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'var(--gold)',
      color: 'var(--char)',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      flex: 'none'
    }
  }, String(author || '?').trim().charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      color: dark ? '#fff' : 'var(--ink)'
    }
  }, author), when ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: dark ? '#9d8e78' : 'var(--ink-faint)',
      fontSize: '.85rem'
    }
  }, when) : null)));
}
Object.assign(__ds_scope, { ReviewCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ReviewCard.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatusPill — the "Abierto / Cerrado" indicator with a pulsing LED dot.
 * Pair with the schedule logic in the mockups (computeStatus()).
 */
function StatusPill({
  open = true,
  children,
  style,
  ...rest
}) {
  const color = open ? 'var(--status-open)' : 'var(--status-closed)';
  const tint = open ? 'rgba(78,140,74,.12)' : 'rgba(218,59,35,.10)';
  const ring = open ? 'rgba(78,140,74,.18)' : 'rgba(218,59,35,.16)';
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: '.86rem',
      padding: '7px 14px',
      borderRadius: 'var(--radius-pill)',
      color,
      background: tint,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 0 4px ${ring}`
    }
  }), children || (open ? 'Abierto ahora' : 'Cerrado'));
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusPill.jsx", error: String((e && e.message) || e) }); }

// ui_kits/restaurant-landing/app.jsx
try { (() => {
/* ============================================================
   App shell — reveal-on-scroll, live open/closed status,
   reservation modal (→ WhatsApp), sticky mobile CTA.
   ============================================================ */
const {
  useState: uS,
  useEffect: uE
} = React;
const DSa = window.MockupsWebRestaurantKit_c65b55;
const Ic = window.KitIcons;
const {
  computeStatus,
  waLink
} = window.KitHelpers;
const S = window.KitSections;
const DA = window.DATA;
function useReveal() {
  uE(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}
function ReservaModal({
  open,
  onClose
}) {
  const [f, setF] = uS({
    nombre: '',
    personas: '2',
    fecha: '',
    hora: '21:00',
    tel: ''
  });
  const set = k => e => setF(p => ({
    ...p,
    [k]: e.target.value
  }));
  const msg = `¡Hola! Quiero reservar en El Fantástico.\n\n👤 ${f.nombre || '(nombre)'}\n👥 ${f.personas} personas\n📅 ${f.fecha || '(fecha)'} a las ${f.hora}\n📞 ${f.tel || '(teléfono)'}\n\n¿Tenéis hueco? ¡Gracias!`;
  uE(() => {
    const fn = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "kmodal-bg",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "kmodal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DSa.Eyebrow, null, "Reserva online ", /*#__PURE__*/React.createElement("span", {
    className: "kbadge"
  }, "demo")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.7rem',
      margin: '8px 0 4px',
      color: 'var(--ink)'
    }
  }, "Pide tu mesa"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--ink-soft)',
      margin: 0,
      fontSize: '.95rem'
    }
  }, "Rellena y te llevamos a WhatsApp con la reserva escrita.")), /*#__PURE__*/React.createElement("button", {
    className: "kx",
    onClick: onClose
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "kfield"
  }, /*#__PURE__*/React.createElement("label", null, "Nombre"), /*#__PURE__*/React.createElement("input", {
    value: f.nombre,
    onChange: set('nombre'),
    placeholder: "Tu nombre"
  })), /*#__PURE__*/React.createElement("div", {
    className: "kfield-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kfield"
  }, /*#__PURE__*/React.createElement("label", null, "Personas"), /*#__PURE__*/React.createElement("select", {
    value: f.personas,
    onChange: set('personas')
  }, [1, 2, 3, 4, 5, 6, 7, 8].map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n
  }, n, n === 8 ? '+' : '')))), /*#__PURE__*/React.createElement("div", {
    className: "kfield"
  }, /*#__PURE__*/React.createElement("label", null, "Hora"), /*#__PURE__*/React.createElement("select", {
    value: f.hora,
    onChange: set('hora')
  }, ['13:00', '13:30', '14:00', '14:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'].map(h => /*#__PURE__*/React.createElement("option", {
    key: h,
    value: h
  }, h))))), /*#__PURE__*/React.createElement("div", {
    className: "kfield-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kfield"
  }, /*#__PURE__*/React.createElement("label", null, "Fecha"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: f.fecha,
    onChange: set('fecha')
  })), /*#__PURE__*/React.createElement("div", {
    className: "kfield"
  }, /*#__PURE__*/React.createElement("label", null, "Tel\xE9fono"), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    value: f.tel,
    onChange: set('tel'),
    placeholder: "600 000 000"
  }))), /*#__PURE__*/React.createElement(DSa.Button, {
    variant: "whatsapp",
    icon: /*#__PURE__*/React.createElement(Ic.wa, null),
    href: waLink(DA.negocio.whatsapp, msg),
    target: "_blank",
    rel: "noopener",
    onClick: onClose,
    style: {
      width: '100%',
      justifyContent: 'center'
    }
  }, "Enviar por WhatsApp"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      color: 'var(--ink-faint)',
      fontSize: '.82rem',
      margin: '12px 0 0'
    }
  }, "Sin compromiso \xB7 te confirmamos la disponibilidad al momento.")));
}
function StickyCta({
  onReserve
}) {
  const [show, setShow] = uS(false);
  uE(() => {
    const fn = () => setShow(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', fn, {
      passive: true
    });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: 'ksticky' + (show ? ' show' : '')
  }, /*#__PURE__*/React.createElement(DSa.Button, {
    variant: "primary",
    icon: /*#__PURE__*/React.createElement(Ic.cal, null),
    onClick: onReserve
  }, "Reservar"), /*#__PURE__*/React.createElement(DSa.Button, {
    variant: "whatsapp",
    icon: /*#__PURE__*/React.createElement(Ic.wa, null),
    href: waLink(DA.negocio.whatsapp, '¡Hola! Quiero reservar en El Fantástico.'),
    target: "_blank",
    rel: "noopener"
  }, "WhatsApp"));
}
function App() {
  useReveal();
  const [modal, setModal] = uS(false);
  const [status, setStatus] = uS(() => computeStatus(DA.horarioSala));
  uE(() => {
    const id = setInterval(() => setStatus(computeStatus(DA.horarioSala)), 60000);
    return () => clearInterval(id);
  }, []);
  const openReserve = () => setModal(true);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(S.Nav, {
    onReserve: openReserve
  }), /*#__PURE__*/React.createElement(S.Hero, {
    status: status,
    onReserve: openReserve
  }), /*#__PURE__*/React.createElement(S.Experiencia, null), /*#__PURE__*/React.createElement(S.Carta, null), /*#__PURE__*/React.createElement(S.Musica, null), /*#__PURE__*/React.createElement(S.Reseñas, null), /*#__PURE__*/React.createElement(S.Ubicacion, {
    status: status
  }), /*#__PURE__*/React.createElement(S.Footer, null), /*#__PURE__*/React.createElement(StickyCta, {
    onReserve: openReserve
  }), /*#__PURE__*/React.createElement(ReservaModal, {
    open: modal,
    onClose: () => setModal(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/restaurant-landing/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/restaurant-landing/data.jsx
try { (() => {
/* ============================================================
   EL FANTÁSTICO — demo data layer for the kit.
   Real photography from the client; menu/reviews are sample
   content to illustrate the design.
   ============================================================ */
window.DATA = {
  negocio: {
    nombre: 'El Fantástico',
    lugar: 'Laredo',
    tagline: 'Producto, pescado y buen rollo frente al puerto.',
    claim: 'El sitio de Laredo donde el Cantábrico se come con las manos, se brinda con txakoli y se baila con música en directo.',
    direccion: 'C. el Puerto, 39770 Laredo · Cantabria',
    telefono: '+34 674 377 991',
    whatsapp: '34674377991',
    rating: '4,2',
    reseñas: '1.486',
    precio: '10–50 € por persona',
    mapsQuery: 'El Fantastico, Calle el Puerto, 39770 Laredo, Cantabria'
  },
  horarioSala: {
    0: {
      label: 'Domingo',
      rangos: [[12 * 60, 21 * 60]]
    },
    1: {
      label: 'Lunes',
      rangos: []
    },
    2: {
      label: 'Martes',
      rangos: []
    },
    3: {
      label: 'Miércoles',
      rangos: [[17 * 60, 24 * 60]]
    },
    4: {
      label: 'Jueves',
      rangos: [[17 * 60, 24 * 60]]
    },
    5: {
      label: 'Viernes',
      rangos: [[12 * 60, 24 * 60]]
    },
    6: {
      label: 'Sábado',
      rangos: [[12 * 60, 24 * 60]]
    }
  },
  horarioCocina: 'Cocina abierta de 13:00 a 16:00 y de 20:00 a 23:30 (miércoles a domingo).',
  experiencia: [{
    titulo: 'Con el puerto en primera fila',
    texto: 'Terraza al borde del agua y comedor interior con alma. Atardeceres sobre los mástiles y la mejor mesa para ver caer el sol sobre la dársena.'
  }, {
    titulo: 'Música en directo',
    texto: 'Lo que de verdad nos diferencia: noches con banda, voz y guitarra. La cocina no para y el ambiente sube. Aquí no se viene solo a cenar.'
  }, {
    titulo: 'Para compartir y picotear',
    texto: 'Raciones para el centro de la mesa, manos al aire y platos que van y vienen. Ideal con amigos, en pareja o para celebrar.'
  }],
  cartaTabs: [{
    id: 'compartir',
    label: 'Para compartir',
    platos: [{
      nombre: 'Una de rabas',
      desc: 'Calamares fritos, alioli de ajo negro y lima',
      precio: '14€'
    }, {
      nombre: 'Anchoas artesanas Gran Reserva',
      desc: 'Pan de masa madre tostado y mantequilla',
      precio: '16€'
    }, {
      nombre: 'Steak tartar sobre tuétano',
      desc: 'Lomo bajo madurado, tuétano a la parrilla y nuestro aliño secreto',
      precio: '19€',
      foto: '../../assets/img/steak-tartar-tuetano.png'
    }, {
      nombre: 'Croqueta o niguiri de atún rojo',
      desc: 'Base de leche de coco, kimchi y sashimi de atún rojo · 4 und',
      precio: '12€',
      foto: '../../assets/img/croquetas-atun.png'
    }, {
      nombre: 'Ensaladilla rusa de ventresca',
      desc: 'Encurtidos, cebolla marinada y huevas de pez volador',
      precio: '15€'
    }]
  }, {
    id: 'mar',
    label: 'Del mar',
    platos: [{
      nombre: 'Zamburiñas a la plancha',
      desc: 'Refrito apiñonado, emulsión de coco-lima y gazpacho de piparra',
      precio: '19€'
    }, {
      nombre: 'Gambas de Huelva',
      desc: '0% tonterías añadidas',
      precio: '18€'
    }, {
      nombre: 'Arroz meloso de carabineros',
      desc: 'Emulsión de yema, mantequilla y migas',
      precio: '23€'
    }, {
      nombre: 'Pulpo crujiente',
      desc: 'Patata rota en AOVE y mojo picón',
      precio: '22,50€'
    }, {
      nombre: 'La lonja del día',
      desc: 'Rey, lubina, rape, rodaballo, San Martín… con su guarnición',
      precio: 'S/M'
    }]
  }, {
    id: 'brasa',
    label: 'A la brasa',
    platos: [{
      nombre: 'Lomo bajo madurado 30 días',
      desc: 'Crema de piquillos dulce-picante y papa frita',
      precio: '21€'
    }, {
      nombre: 'Costilla glaseada',
      desc: 'Lacada con su propio jugo y patata rota huesca-miel',
      precio: '18€'
    }, {
      nombre: 'Solomillo de vaca',
      desc: 'Pimientos del país y mantequilla de ajo negro',
      precio: '24€'
    }, {
      nombre: 'Lagarto ibérico',
      desc: 'Patata frita, salsa melosa y semillas de sésamo',
      precio: '18€'
    }]
  }, {
    id: 'postres',
    label: 'Postres',
    platos: [{
      nombre: 'Tarta de queso al horno',
      desc: 'Chantilly especiada',
      precio: '6,50€'
    }, {
      nombre: 'Torrija de pan brioche',
      desc: 'Caramelizada a golpe de soplete',
      precio: '6,50€'
    }, {
      nombre: 'Brownie con coulant',
      desc: 'Crumble de mantequilla',
      precio: '6,50€'
    }]
  }],
  directos: [{
    dia: 'VIE',
    fecha: '20 JUN',
    hora: '21:30',
    artista: 'Los Salitres',
    estilo: 'Versiones indie-pop · acústico'
  }, {
    dia: 'SÁB',
    fecha: '21 JUN',
    hora: '22:00',
    artista: 'Marea Sunset',
    estilo: 'DJ set · sesión de atardecer'
  }, {
    dia: 'JUE',
    fecha: '26 JUN',
    hora: '21:00',
    artista: 'Trío Cantábrico',
    estilo: 'Jazz & bossa en directo'
  }],
  reseñas: [{
    texto: 'El sitio con mejores vistas del puerto. Las rabas y las anchoas, de diez, y el ambiente con música en directo es otro nivel.',
    autor: 'María G.',
    estrellas: 5,
    cuando: 'hace 2 semanas'
  }, {
    texto: 'Fuimos a picar y acabamos cenando de todo. El steak tartar sobre tuétano vale el viaje. Volveremos seguro.',
    autor: 'Iker R.',
    estrellas: 5,
    cuando: 'hace 1 mes'
  }, {
    texto: 'Terraza espectacular al atardecer, raciones generosas para compartir y muy buen rollo. Reservad en verano.',
    autor: 'Lucía M.',
    estrellas: 4,
    cuando: 'hace 1 mes'
  }],
  galeria: [{
    src: '../../assets/img/terraza-atardecer.png',
    cap: 'Atardecer en la terraza'
  }, {
    src: '../../assets/img/puerto-vino-zamburinas.png',
    cap: 'Mesa con vistas al agua'
  }, {
    src: '../../assets/img/interior-comedor.png',
    cap: 'El comedor por dentro'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/restaurant-landing/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/restaurant-landing/icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ============================================================
   Icons + small helpers for the restaurant landing kit.
   Lucide/Feather-style 2px stroke icons (the kit's icon system)
   plus the WhatsApp brand glyph. Exported to window for the
   other babel scripts.
   ============================================================ */

const I = (paths, fill) => p => /*#__PURE__*/React.createElement("svg", _extends({
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  fill: fill ? 'currentColor' : 'none',
  stroke: fill ? 'none' : 'currentColor',
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, p), paths);
const Icon = {
  cal: I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 2v4M8 2v4M3 10h18"
  }))),
  pin: I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  }))),
  clock: I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 6v6l4 2"
  }))),
  phone: I(/*#__PURE__*/React.createElement("path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
  })),
  music: I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M9 18V5l12-2v13"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "16",
    r: "3"
  }))),
  wave: I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M2 12s2-3 5-3 5 3 5 3 2 3 5 3 5-3 5-3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 18s2-3 5-3 5 3 5 3 2 3 5 3 5-3 5-3"
  }))),
  share: I(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "5",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "19",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
  }))),
  wa: I(/*#__PURE__*/React.createElement("path", {
    d: "M.06 24l1.68-6.13A11.86 11.86 0 010 11.93C0 5.35 5.35 0 11.93 0a11.86 11.86 0 018.43 3.49 11.86 11.86 0 013.49 8.44c0 6.58-5.35 11.93-11.93 11.93a11.9 11.9 0 01-5.7-1.45L.06 24zm6.54-3.84c1.68.99 3.28 1.59 5.32 1.59 5.46 0 9.9-4.44 9.9-9.9 0-5.47-4.43-9.9-9.9-9.9-5.47 0-9.9 4.43-9.9 9.9 0 2.14.67 3.76 1.79 5.46l-.99 3.6 3.78-.75zm11.3-5.62c-.07-.12-.27-.2-.56-.34-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42z"
  }), true)
};

/* ---- schedule helpers ---- */
function fmt(min) {
  if (min >= 1440) return '24:00';
  const h = Math.floor(min / 60),
    m = min % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
function computeStatus(schedule, now = new Date()) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = schedule[day];
  for (const [a, b] of today.rangos) {
    if (mins >= a && mins < b) return {
      open: true,
      text: `Abierto ahora · cierra a las ${fmt(b)}`
    };
  }
  for (const [a] of today.rangos) {
    if (mins < a) return {
      open: false,
      text: `Cerrado · abre hoy a las ${fmt(a)}`
    };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const info = schedule[d];
    if (info.rangos.length) {
      const when = i === 1 ? 'mañana' : `el ${info.label.toLowerCase()}`;
      return {
        open: false,
        text: `Cerrado · abre ${when} a las ${fmt(info.rangos[0][0])}`
      };
    }
  }
  return {
    open: false,
    text: 'Cerrado'
  };
}
const waLink = (phone, text) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
window.KitIcons = Icon;
window.KitHelpers = {
  fmt,
  computeStatus,
  waLink
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/restaurant-landing/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/restaurant-landing/sections.jsx
try { (() => {
/* ============================================================
   Sections for El Fantástico — composes the design-system
   primitives (Button, Eyebrow, StarRating, etc.) from the bundle.
   ============================================================ */
const {
  useState,
  useEffect
} = React;
const DS = window.MockupsWebRestaurantKit_c65b55;
const {
  Button,
  Eyebrow,
  Chip,
  StarRating,
  StatusPill,
  SectionHeading,
  MenuItem,
  ReviewCard,
  Card
} = DS;
const Icon = window.KitIcons;
const {
  fmt,
  waLink
} = window.KitHelpers;
const D = window.DATA;

/* ---------------- NAV ---------------- */
function Nav({
  onReserve
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, {
      passive: true
    });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return /*#__PURE__*/React.createElement("nav", {
    className: 'kn' + (scrolled ? ' scrolled' : '')
  }, /*#__PURE__*/React.createElement("a", {
    className: "kn-logo",
    href: "#top"
  }, "El Fant\xE1stico", /*#__PURE__*/React.createElement("span", null, ".")), /*#__PURE__*/React.createElement("div", {
    className: "kn-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#experiencia"
  }, "Experiencia"), /*#__PURE__*/React.createElement("a", {
    href: "#carta"
  }, "Carta"), /*#__PURE__*/React.createElement("a", {
    href: "#musica"
  }, "M\xFAsica"), /*#__PURE__*/React.createElement("a", {
    href: "#ubicacion"
  }, "D\xF3nde estamos")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: onReserve
  }, "Reservar mesa"));
}

/* ---------------- HERO ---------------- */
function Hero({
  status,
  onReserve
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "khero",
    id: "top"
  }, /*#__PURE__*/React.createElement("img", {
    className: "khero-bg",
    src: "../../assets/img/terraza-atardecer.png",
    alt: "Terraza al atardecer sobre el puerto de Laredo"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap khero-inner"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "var(--gold)"
  }, D.negocio.lugar, " \xB7 frente al puerto"), /*#__PURE__*/React.createElement("h1", null, "El", /*#__PURE__*/React.createElement("br", null), "Fant\xE1stico", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--coral)'
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    className: "khero-tag"
  }, D.negocio.tagline), /*#__PURE__*/React.createElement("div", {
    className: "khero-ctas"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: /*#__PURE__*/React.createElement(Icon.cal, null),
    onClick: onReserve
  }, "Reservar mesa"), /*#__PURE__*/React.createElement(Button, {
    variant: "whatsapp",
    icon: /*#__PURE__*/React.createElement(Icon.wa, null),
    href: waLink(D.negocio.whatsapp, '¡Hola! Me gustaría reservar mesa en El Fantástico.'),
    target: "_blank",
    rel: "noopener"
  }, "WhatsApp")), /*#__PURE__*/React.createElement("div", {
    className: "khero-meta"
  }, /*#__PURE__*/React.createElement(StatusPill, {
    open: status.open
  }, status.text), /*#__PURE__*/React.createElement(StarRating, {
    value: 4,
    score: D.negocio.rating,
    count: D.negocio.reseñas,
    color: "var(--gold)",
    style: {
      color: '#fff'
    }
  }))));
}

/* ---------------- EXPERIENCIA ---------------- */
function Experiencia() {
  const icons = [Icon.wave, Icon.music, Icon.share];
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap",
    id: "experiencia"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "El alma del sitio",
    title: "No es un restaurante de pescado serio y aburrido.",
    lead: D.negocio.claim
  })), /*#__PURE__*/React.createElement("div", {
    className: "kgrid-3",
    style: {
      marginTop: 46
    }
  }, D.experiencia.map((e, i) => {
    const Ico = icons[i];
    return /*#__PURE__*/React.createElement(Card, {
      key: i,
      className: "reveal",
      style: {
        transitionDelay: `${i * 80}ms`
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "kexp-ico"
    }, /*#__PURE__*/React.createElement(Ico, null)), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 'var(--fs-h3)',
        margin: '14px 0 8px',
        color: 'var(--ink)'
      }
    }, e.titulo), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--ink-soft)',
        margin: 0,
        fontSize: '.98rem',
        lineHeight: 1.5
      }
    }, e.texto));
  })), /*#__PURE__*/React.createElement("div", {
    className: "kfeature reveal"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img/puerto-vino-zamburinas.png",
    alt: "Vino y zamburi\xF1as frente a los barcos del puerto"
  }), /*#__PURE__*/React.createElement("div", {
    className: "kfeature-txt"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    color: "var(--gold)"
  }, "Atardecer en la d\xE1rsena"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--fs-h2)',
      color: '#fff',
      margin: '14px 0 14px'
    }
  }, "La mejor mesa para ver caer el sol."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-on-dark-soft)',
      margin: 0,
      lineHeight: 1.55
    }
  }, "Terraza al borde del agua, comedor interior con plantas y luz c\xE1lida. Vengas a picar o a comer completo, aqu\xED se come con vistas y se brinda con lo mejor del Cant\xE1brico."))));
}

/* ---------------- CARTA ---------------- */
function Carta() {
  const [tab, setTab] = useState(D.cartaTabs[0].id);
  const active = D.cartaTabs.find(t => t.id === tab);
  return /*#__PURE__*/React.createElement("section", {
    className: "section ksand",
    id: "carta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "Para compartir",
    title: "Producto, pescado y manos al aire.",
    lead: "Raciones para el centro de la mesa. La carta cambia con la lonja y la temporada \u2014 esto es una selecci\xF3n de la casa."
  })), /*#__PURE__*/React.createElement("div", {
    className: "ktabs reveal"
  }, D.cartaTabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: 'ktab' + (t.id === tab ? ' active' : ''),
    onClick: () => setTab(t.id)
  }, t.label))), /*#__PURE__*/React.createElement(Card, {
    className: "reveal",
    key: tab,
    pad: 30,
    style: {
      maxWidth: 760,
      margin: '0 auto'
    }
  }, active.platos.map((p, i) => /*#__PURE__*/React.createElement(MenuItem, {
    key: i,
    name: p.nombre,
    desc: p.desc,
    price: p.precio,
    photo: p.foto
  }))), /*#__PURE__*/React.createElement("p", {
    className: "knote"
  }, "* Carta orientativa basada en la real. Precios y platos pueden variar seg\xFAn mercado y temporada. Men\xFA del d\xEDa: 29 \u20AC \xB7 entre semana.")));
}

/* ---------------- MÚSICA EN DIRECTO ---------------- */
function Musica() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section knight",
    id: "musica"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    onDark: true,
    eyebrow: "Lo que nos hace diferentes",
    eyebrowColor: "var(--gold)",
    title: "M\xFAsica en directo en el puerto.",
    lead: "Noches con banda, voz y guitarra mientras la cocina no para. Aqu\xED no se viene solo a cenar \u2014 se viene a pasarlo bien."
  })), /*#__PURE__*/React.createElement("div", {
    className: "kgigs",
    style: {
      marginTop: 40
    }
  }, D.directos.map((g, i) => /*#__PURE__*/React.createElement("div", {
    className: "kgig reveal",
    key: i,
    style: {
      transitionDelay: `${i * 70}ms`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kgig-date"
  }, /*#__PURE__*/React.createElement("b", null, g.fecha.split(' ')[0]), /*#__PURE__*/React.createElement("span", null, g.fecha.split(' ')[1], " \xB7 ", g.dia)), /*#__PURE__*/React.createElement("div", {
    className: "kgig-bar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "kgig-info"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      color: '#fff',
      fontSize: '1.3rem',
      margin: 0
    }
  }, g.artista), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-on-dark-soft)',
      margin: '4px 0 0'
    }
  }, g.estilo)), /*#__PURE__*/React.createElement("div", {
    className: "kgig-hora"
  }, g.hora)))), /*#__PURE__*/React.createElement("span", {
    className: "knight-soon"
  }, "Agenda de ejemplo \xB7 pr\xF3ximamente reservas para mesas con directo.")));
}

/* ---------------- RESEÑAS ---------------- */
function Reseñas() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section wrap",
    id: "resenas"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Lo que dicen",
    title: "1.486 motivos para venir."
  })), /*#__PURE__*/React.createElement("div", {
    className: "krev-top reveal"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '3.4rem',
      lineHeight: .9,
      color: 'var(--gold-dk)'
    }
  }, D.negocio.rating), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StarRating, {
    value: 4,
    size: 20
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ink-soft)',
      fontSize: '.9rem',
      marginTop: 2
    }
  }, D.negocio.reseñas, " opiniones"))), /*#__PURE__*/React.createElement(Chip, {
    tone: "base"
  }, "Valoraci\xF3n media en Google")), /*#__PURE__*/React.createElement("div", {
    className: "kgrid-3",
    style: {
      marginTop: 36
    }
  }, D.reseñas.map((r, i) => /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    key: i,
    style: {
      transitionDelay: `${i * 80}ms`
    }
  }, /*#__PURE__*/React.createElement(ReviewCard, {
    tone: "light",
    stars: r.estrellas,
    quote: r.texto,
    author: r.autor,
    when: r.cuando
  })))));
}

/* ---------------- UBICACIÓN ---------------- */
function Ubicacion({
  status
}) {
  const todayIdx = new Date().getDay();
  return /*#__PURE__*/React.createElement("section", {
    className: "section ksand",
    id: "ubicacion"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "D\xF3nde estamos",
    title: "En pleno puerto de Laredo.",
    lead: "A pie de d\xE1rsena, con la lonja al lado. Llega andando desde el centro o aparca cerca del paseo."
  })), /*#__PURE__*/React.createElement("div", {
    className: "kloc reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kmap"
  }, /*#__PURE__*/React.createElement("iframe", {
    title: "Mapa El Fant\xE1stico",
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade",
    src: `https://www.google.com/maps?q=${encodeURIComponent(D.negocio.mapsQuery)}&output=embed`
  })), /*#__PURE__*/React.createElement(Card, {
    pad: 28
  }, /*#__PURE__*/React.createElement("div", {
    className: "kloc-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kloc-ico"
  }, /*#__PURE__*/React.createElement(Icon.pin, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "kloc-lbl"
  }, "Direcci\xF3n"), /*#__PURE__*/React.createElement("div", {
    className: "kloc-val"
  }, D.negocio.direccion))), /*#__PURE__*/React.createElement("div", {
    className: "kloc-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kloc-ico"
  }, /*#__PURE__*/React.createElement(Icon.clock, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "kloc-lbl"
  }, "Horario de sala"), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '6px 0 10px'
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    open: status.open
  }, status.text)), /*#__PURE__*/React.createElement("table", {
    className: "khours"
  }, /*#__PURE__*/React.createElement("tbody", null, [1, 2, 3, 4, 5, 6, 0].map(d => {
    const info = D.horarioSala[d];
    const cerrado = info.rangos.length === 0;
    return /*#__PURE__*/React.createElement("tr", {
      key: d,
      className: d === todayIdx ? 'today' : ''
    }, /*#__PURE__*/React.createElement("td", null, info.label), /*#__PURE__*/React.createElement("td", null, cerrado ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--ink-faint)'
      }
    }, "Cerrado") : info.rangos.map(([a, b]) => `${fmt(a)}–${fmt(b)}`).join(' · ')));
  }))))), /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    icon: /*#__PURE__*/React.createElement(Icon.pin, null),
    href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(D.negocio.mapsQuery)}`,
    target: "_blank",
    rel: "noopener",
    style: {
      width: '100%',
      justifyContent: 'center',
      marginTop: 14
    }
  }, "C\xF3mo llegar")))));
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "kfoot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kfoot-name"
  }, "El Fant\xE1stico", /*#__PURE__*/React.createElement("span", null, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0'
    }
  }, D.negocio.direccion, " \xB7 ", D.negocio.telefono), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0'
    }
  }, D.negocio.precio), /*#__PURE__*/React.createElement("p", {
    className: "kfoot-dis"
  }, "Propuesta web de demostraci\xF3n. Las fotograf\xEDas son reales del local; la agenda de directos y las rese\xF1as individuales son ejemplos para ilustrar el dise\xF1o.")));
}
window.KitSections = {
  Nav,
  Hero,
  Experiencia,
  Carta,
  Musica,
  Reseñas,
  Ubicacion,
  Footer
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/restaurant-landing/sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.MenuItem = __ds_scope.MenuItem;

__ds_ns.ReviewCard = __ds_scope.ReviewCard;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StarRating = __ds_scope.StarRating;

__ds_ns.StatusPill = __ds_scope.StatusPill;

})();
