const { useState, useEffect, useRef, useCallback } = React;
const D = window.DATA;

/* ---------------- Iconos ---------------- */
const Ico = {
  wa: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M.06 24l1.68-6.13A11.86 11.86 0 010 11.93C0 5.35 5.35 0 11.93 0a11.86 11.86 0 018.43 3.49 11.86 11.86 0 013.49 8.44c0 6.58-5.35 11.93-11.93 11.93a11.9 11.9 0 01-5.7-1.45L.06 24zM6.6 20.16c1.68.99 3.28 1.59 5.32 1.59 5.46 0 9.9-4.44 9.9-9.9 0-5.47-4.43-9.9-9.9-9.9-5.47 0-9.9 4.43-9.9 9.9 0 2.14.67 3.76 1.79 5.46l-.99 3.6 3.78-.75zm11.3-5.62c-.07-.12-.27-.2-.56-.34-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42z"/></svg>),
  phone: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>),
  cal: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>),
  pin: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>),
  music: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>),
  wave: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12s2-3 5-3 5 3 5 3 2 3 5 3 5-3 5-3"/><path d="M2 18s2-3 5-3 5 3 5 3 2 3 5 3 5-3 5-3"/></svg>),
  share: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>),
};

/* ---------------- Horario ---------------- */
function fmt(min) { if (min >= 1440) return "24:00"; const h = Math.floor(min/60), m = min%60; return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`; }
function computeStatus(now = new Date()) {
  const day = now.getDay(); const mins = now.getHours()*60 + now.getMinutes(); const today = D.horarioSala[day];
  for (const [a,b] of today.rangos) if (mins >= a && mins < b) return { open: true, text: `Abierto ahora · cierra a las ${fmt(b)}` };
  for (const [a] of today.rangos) if (mins < a) return { open: false, text: `Cerrado · abre hoy a las ${fmt(a)}` };
  for (let i=1;i<=7;i++){ const d=(day+i)%7; const info=D.horarioSala[d]; if(info.rangos.length){ const when=i===1?"mañana":`el ${info.label.toLowerCase()}`; return { open:false, text:`Cerrado · abre ${when} a las ${fmt(info.rangos[0][0])}` }; } }
  return { open:false, text:"Cerrado" };
}
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el)); return () => io.disconnect();
  });
}
const waLink = (t) => `https://wa.me/${D.negocio.whatsapp}?text=${encodeURIComponent(t)}`;
const starStr = (n) => "★".repeat(n) + "☆".repeat(5 - n);

/* ================= NAV ================= */
function Nav({ onReserve }) {
  const [s, setS] = useState(false);
  useEffect(() => { const fn = () => setS(window.scrollY > 60); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <nav className={"nav" + (s ? " scrolled" : "")}>
      <a className="nav-logo" href="#top">El Fantástico<span className="dot">.</span></a>
      <div className="nav-links">
        <a href="#experiencia">Experiencia</a><a href="#carta">Carta</a><a href="#musica">Directos</a><a href="#galeria">Galería</a><a href="#ubicacion">Dónde</a>
      </div>
      <button className="btn btn-coral nav-cta" onClick={onReserve}>Reservar</button>
    </nav>
  );
}

/* ================= MARQUEE ================= */
function Marquee({ items, amber }) {
  const row = items.concat(items);
  return (
    <div className={"marquee" + (amber ? " amber" : "")}>
      <div className="marquee-track">{row.map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  );
}

/* ================= HERO ================= */
function Hero({ status, onReserve }) {
  return (
    <header className="hero" id="top">
      <div className="hero-bg"><img src="assets/terraza-atardecer.png" alt="Terraza de El Fantástico al atardecer sobre el puerto de Laredo" /></div>
      <div className="hero-grain"></div>
      <div className="hero-inner">
        <div className="wrap">
          <span className="hero-kicker"><span className="sep"></span> Puerto de Laredo · Cantábrico <span className="star">★</span></span>
          <h1>El<span className="l2">Fantástico</span></h1>
          <p className="hero-tag">{D.negocio.tagline}</p>
          <p className="hero-loc">{Ico.pin({ style: { width: 16, height: 16 } })} {D.negocio.direccion}</p>
          <div className="hero-ctas">
            <button className="btn btn-coral" onClick={onReserve}>{Ico.cal()} Reservar mesa</button>
            <a className="btn btn-wa" href={waLink("¡Hola! Me gustaría reservar mesa en El Fantástico.")} target="_blank" rel="noopener">{Ico.wa()} WhatsApp</a>
          </div>
          <div className="hero-status">
            <span className={"status-pill " + (status.open ? "open" : "closed")}><span className="led"></span>{status.text}</span>
            <span className="hero-rating"><span>★ {D.negocio.rating}</span><span className="muted">· {D.negocio.reseñas} reseñas</span></span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ================= EXPERIENCIA ================= */
function Experiencia() {
  const icons = [Ico.wave, Ico.music, Ico.share];
  return (
    <section className="sec-cream sec-pad grain" id="experiencia">
      <div className="grain-l"></div>
      <span className="watermark exp-watermark">ALMA</span>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">El alma del sitio</span>
          <h2>Pescado serio,<br/>ambiente que no.</h2>
          <p>{D.negocio.claim}</p>
        </div>
        <div className="exp-feature reveal">
          <div className="exp-photo">
            <img src="assets/puerto-vino-zamburinas.png" alt="Mesa con vino y zamburiñas frente a los barcos del puerto" />
            <span className="sticker">Mesa con vistas</span>
          </div>
          <div className="exp-txt">
            <span className="eyebrow on-dark">Atardecer en la dársena</span>
            <h3>La mejor mesa para ver caer el sol sobre los mástiles.</h3>
            <p>Terraza al borde del agua y comedor interior con plantas y luz cálida. Vengas a picar o a comer completo, aquí se come con vistas y se brinda con lo mejor del Cantábrico.</p>
          </div>
        </div>
        <div className="exp-cards">
          {D.experiencia.map((e, i) => (
            <div className="exp-card reveal" key={i} style={{ transitionDelay: `${i*80}ms` }}>
              <div className="idx">0{i+1}</div>
              <div className="ico">{icons[i]({})}</div>
              <h3>{e.titulo}</h3>
              <p>{e.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CARTA ================= */
function Carta() {
  const [tab, setTab] = useState(D.cartaTabs[0].id);
  const active = D.cartaTabs.find((t) => t.id === tab);
  return (
    <section className="sec-navy sec-pad grain" id="carta">
      <div className="carta-glow"></div>
      <div className="grain-l"></div>
      <span className="watermark carta-watermark">CARTA</span>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Para compartir</span>
          <h2>Producto, pescado<br/>y manos al aire.</h2>
          <p>Raciones para el centro de la mesa. La carta cambia con la lonja y la temporada — esto es una selección de la casa.</p>
        </div>
        <div className="carta-tabs reveal">
          {D.cartaTabs.map((t) => <button key={t.id} className={"carta-tab" + (t.id === tab ? " active" : "")} onClick={() => setTab(t.id)}>{t.label}</button>)}
        </div>
        <div className="carta-list reveal" key={tab}>
          {active.platos.map((p, i) => (
            <div className="dish" key={i}>
              {p.foto && <img className="dish-thumb" src={p.foto} alt={p.nombre} />}
              <div className="dish-body">
                <div className="dish-top"><span className="dish-name">{p.nombre}</span><span className="dish-dots"></span><span className="dish-price">{p.precio}</span></div>
                <p className="dish-desc">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="carta-note">* Carta orientativa basada en la real. Precios y platos pueden variar según mercado y temporada. Menú del día: 29 € · entre semana.</p>
      </div>
    </section>
  );
}

/* ================= MÚSICA ================= */
function Musica() {
  return (
    <section className="sec-pad grain musica" id="musica">
      <div className="grain-l"></div>
      <span className="watermark musica-watermark">EN VIVO</span>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Lo que nos hace diferentes</span>
          <h2>Música en directo<br/>en el puerto <span className="eq"><i></i><i></i><i></i><i></i><i></i></span></h2>
          <p>Noches con banda, voz y guitarra mientras la cocina no para. Aquí no se viene solo a cenar — se viene a pasarlo bien.</p>
        </div>
        <div className="gig-list">
          {D.directos.map((g, i) => (
            <div className="gig reveal" key={i} style={{ transitionDelay: `${i*70}ms` }}>
              <div className="gig-date"><span className="d">{g.fecha.split(" ")[0]}</span><span className="m">{g.fecha.split(" ")[1]} · {g.dia}</span></div>
              <div className="gig-bar"></div>
              <div className="gig-info"><h3>{g.artista}</h3><p>{g.estilo}</p></div>
              <div className="gig-hora">{g.hora}</div>
            </div>
          ))}
        </div>
        <span className="musica-soon">Agenda de ejemplo · próximamente reservas para mesas con directo.</span>
      </div>
    </section>
  );
}

/* ================= GALERÍA ================= */
function Galeria({ onOpen }) {
  const cls = ["big", "tall", "", "", "tall"];
  return (
    <section className="sec-navy sec-pad grain" id="galeria">
      <div className="grain-l"></div>
      <span className="watermark gal-watermark">PUERTO</span>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Galería</span>
          <h2>El puerto, la terraza<br/>y los platos.</h2>
        </div>
        <div className="gal-grid reveal">
          {D.galeria.map((g, i) => (
            <div className={"gal-item " + (cls[i] || "")} key={i} onClick={() => onOpen(i)}>
              <img src={g.src} alt={g.alt} loading="lazy" />
              <div className="gal-cap">{g.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Lightbox({ index, setIndex }) {
  const open = index !== null;
  const go = useCallback((d) => setIndex((p) => (p + d + D.galeria.length) % D.galeria.length), [setIndex]);
  useEffect(() => { if (!open) return; const fn = (e) => { if (e.key === "Escape") setIndex(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }; window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, [open, go, setIndex]);
  const item = open ? D.galeria[index] : null;
  return (
    <div className={"lb" + (open ? " open" : "")} onClick={() => setIndex(null)}>
      {open && <>
        <button className="lb-close" onClick={(e) => { e.stopPropagation(); setIndex(null); }}>✕</button>
        <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); go(-1); }}>‹</button>
        <img src={item.src} alt={item.alt} onClick={(e) => e.stopPropagation()} />
        <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); go(1); }}>›</button>
        <div className="lb-cap">{item.cap}</div>
      </>}
    </div>
  );
}

/* ================= RESEÑAS ================= */
function Reseñas() {
  return (
    <section className="sec-cream sec-pad grain" id="resenas">
      <div className="grain-l"></div>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Lo que dicen</span>
          <h2>1.486 motivos<br/>para venir.</h2>
        </div>
        <div className="rev-hero">
          <div className="reveal">
            <div className="rev-bignum">{D.negocio.rating}</div>
            <div className="rev-bigstars">★★★★☆</div>
            <div className="rev-bigcnt">{D.negocio.reseñas} opiniones · Google</div>
          </div>
          <div className="rev-grid">
            {D.reseñas.map((r, i) => (
              <div className="rev-card reveal" key={i} style={{ transitionDelay: `${i*70}ms` }}>
                <div className="stars">{starStr(r.estrellas)}</div>
                <p>“{r.texto}”</p>
                <div className="who">— {r.autor}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= UBICACIÓN ================= */
function Ubicacion({ status }) {
  const todayIdx = new Date().getDay();
  return (
    <section className="sec-navy sec-pad grain" id="ubicacion">
      <div className="grain-l"></div>
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">Dónde estamos</span>
          <h2>En pleno puerto<br/>de Laredo.</h2>
          <p>A pie de dársena, con la lonja al lado. Llega andando desde el centro o aparca cerca del paseo.</p>
        </div>
        <div className="loc-grid">
          <div className="map-card reveal">
            <iframe title="Mapa El Fantástico Laredo" src={`https://www.google.com/maps?q=${encodeURIComponent(D.negocio.mapsQuery)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="info-card reveal">
            <div className="info-row">
              <div className="ico">{Ico.pin({})}</div>
              <div><div className="lbl">Dirección</div><a className="val" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(D.negocio.mapsQuery)}`} target="_blank" rel="noopener">{D.negocio.direccion}</a></div>
            </div>
            <div className="info-row">
              <div className="ico">{Ico.clock({})}</div>
              <div style={{ flex: 1 }}>
                <div className="lbl">Horario de sala</div>
                <span className={"status-pill " + (status.open ? "open" : "closed")} style={{ marginTop: 6, marginBottom: 4 }}><span className="led"></span>{status.text}</span>
                <table className="hours-table"><tbody>
                  {[1,2,3,4,5,6,0].map((d) => { const info = D.horarioSala[d]; const cerrado = info.rangos.length === 0; return (
                    <tr key={d} className={d === todayIdx ? "today" : ""}>
                      <td>{info.label}</td>
                      {cerrado ? <td className="cerrado">Cerrado</td> : <td>{info.rangos.map(([a,b]) => `${fmt(a)}–${fmt(b)}`).join(" · ")}</td>}
                    </tr>
                  ); })}
                </tbody></table>
                <p className="cocina-note">{D.horarioCocina}</p>
              </div>
            </div>
            <a className="btn btn-coral" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(D.negocio.mapsQuery)}`} target="_blank" rel="noopener" style={{ width: "100%" }}>{Ico.pin({})} Cómo llegar</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CTA FINAL + FOOTER ================= */
function CtaFinal({ onReserve }) {
  return (
    <section className="sec-pad cta-final grain" id="reservar">
      <div className="grain-l"></div>
      <div className="wrap">
        <span className="eyebrow reveal" style={{ color: "var(--ink)", position: "relative", zIndex: 2 }}>Te esperamos</span>
        <h2 className="reveal" style={{ marginTop: 12 }}>Reserva tu mesa<br/>en El Fantástico</h2>
        <p className="reveal">Mejor con tiempo en verano y los días de música en directo.</p>
        <div className="hero-ctas reveal">
          <button className="btn btn-ink" onClick={onReserve}>{Ico.cal()} Reservar mesa</button>
          <a className="btn btn-wa" href={waLink("¡Hola! Me gustaría reservar mesa en El Fantástico.")} target="_blank" rel="noopener">{Ico.wa()} WhatsApp</a>
          <a className="btn btn-ghost" style={{ color: "var(--ink)", borderColor: "rgba(20,16,12,0.5)" }} href={`tel:${D.negocio.telefono.replace(/\s/g, "")}`}>{Ico.phone()} {D.negocio.telefono}</a>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fnt">El Fantástico<span className="dot">.</span></div>
        <p style={{ marginTop: 10 }}>{D.negocio.direccion} · {D.negocio.telefono}</p>
        <p style={{ marginTop: 4 }}>{D.negocio.precio}</p>
        <p className="disclaimer">Propuesta web de demostración. Las fotografías son reales del local; la agenda de directos y las reseñas individuales son ejemplos provisionales para ilustrar el diseño.</p>
      </div>
    </footer>
  );
}

/* ================= STICKY + MODAL ================= */
function StickyCta({ onReserve }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const fn = () => setShow(window.scrollY > window.innerHeight * 0.6); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <div className={"sticky-cta" + (show ? " show" : "")}>
      <button className="btn btn-coral" onClick={onReserve}>{Ico.cal()} Reservar</button>
      <a className="btn btn-wa" href={waLink("¡Hola! Me gustaría reservar mesa en El Fantástico.")} target="_blank" rel="noopener">{Ico.wa()} WhatsApp</a>
    </div>
  );
}
function ReservaModal({ open, onClose }) {
  const [f, setF] = useState({ nombre: "", personas: "2", fecha: "", hora: "21:00", tel: "" });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const msg = `¡Hola! Quiero reservar en El Fantástico.\n\n👤 ${f.nombre || "(nombre)"}\n👥 ${f.personas} personas\n📅 ${f.fecha || "(fecha)"} a las ${f.hora}\n📞 ${f.tel || "(teléfono)"}\n\n¿Tenéis hueco? ¡Gracias!`;
  useEffect(() => { const fn = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, [onClose]);
  return (
    <div className={"modal-bg" + (open ? " open" : "")} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span className="eyebrow">Reserva online <span className="badge-demo">demo</span></span>
            <h3 style={{ marginTop: 6 }}>Pide tu mesa</h3>
            <p className="sub">Rellena y te llevamos directo a WhatsApp con la reserva escrita.</p>
          </div>
          <button onClick={onClose} style={{ fontSize: "1.5rem", color: "var(--ink-soft)", lineHeight: 1 }}>✕</button>
        </div>
        <div className="field"><label>Nombre</label><input value={f.nombre} onChange={set("nombre")} placeholder="Tu nombre" /></div>
        <div className="field-row">
          <div className="field"><label>Personas</label><select value={f.personas} onChange={set("personas")}>{[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n}{n===8?"+":""}</option>)}</select></div>
          <div className="field"><label>Hora</label><select value={f.hora} onChange={set("hora")}>{["13:00","13:30","14:00","14:30","20:00","20:30","21:00","21:30","22:00","22:30"].map((h) => <option key={h} value={h}>{h}</option>)}</select></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Fecha</label><input type="date" value={f.fecha} onChange={set("fecha")} /></div>
          <div className="field"><label>Teléfono</label><input type="tel" value={f.tel} onChange={set("tel")} placeholder="600 000 000" /></div>
        </div>
        <a className="btn btn-wa" href={waLink(msg)} target="_blank" rel="noopener" onClick={onClose}>{Ico.wa()} Enviar por WhatsApp</a>
        <p className="modal-hint">Sin compromiso · te confirmamos la disponibilidad al momento.</p>
      </div>
    </div>
  );
}

/* ================= APP ================= */
function App() {
  useReveal();
  const [lb, setLb] = useState(null);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(() => computeStatus());
  useEffect(() => { const id = setInterval(() => setStatus(computeStatus()), 60000); return () => clearInterval(id); }, []);
  const openReserve = () => setModal(true);
  return (
    <>
      <Nav onReserve={openReserve} />
      <Hero status={status} onReserve={openReserve} />
      <Marquee items={["Pescado del día", "Producto de mercado", "Música en directo", "Terraza con vistas", "Raciones para compartir", "Buen rollo"]} />
      <Experiencia />
      <Carta />
      <Musica />
      <Marquee amber items={["Rabas", "Anchoas de Santoña", "Zamburiñas", "Arroz de carabineros", "Txakoli frío", "Atardeceres", "Música en vivo"]} />
      <Galeria onOpen={setLb} />
      <Reseñas />
      <Ubicacion status={status} />
      <CtaFinal onReserve={openReserve} />
      <Footer />
      <StickyCta onReserve={openReserve} />
      <Lightbox index={lb} setIndex={setLb} />
      <ReservaModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
