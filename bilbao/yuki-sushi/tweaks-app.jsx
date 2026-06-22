/* ============================================================
   YUKI SUSHI — Tweaks app (mounts the floating panel)
   Applies palette / accent / slogan / animation live via CSS vars.
   ============================================================ */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "marron",
  "accent": "#C0152F",
  "slogan": "Donde el mar se encuentra con la nieve.",
  "anim": "normal"
}/*EDITMODE-END*/;

const PALETTES = {
  marron: {
    label: "Marrón cálido",
    vars: {
      "--paper":"#FBF7EF","--paper-2":"#F3EADB","--ink":"#2A211B","--brown":"#6B4E37",
      "--clay":"#9C7A5B","--tan":"#E7D9C4","--rule":"#DCCEB8","--espresso":"#2B2119",
      "--espresso-card":"#372A20","--cream":"#F1E6D4","--muted":"#9A8E7B"
    }
  },
  rojo: {
    label: "Rojo clásico",
    vars: {
      "--paper":"#FAF8F4","--paper-2":"#F1EEE8","--ink":"#16130F","--brown":"#4A443C",
      "--clay":"#8C857A","--tan":"#E6E1D7","--rule":"#DED9CE","--espresso":"#171310",
      "--espresso-card":"#23201B","--cream":"#F2EEE6","--muted":"#9C958A"
    }
  },
  matcha: {
    label: "Matcha",
    vars: {
      "--paper":"#F7F6EE","--paper-2":"#ECEDDF","--ink":"#23271C","--brown":"#566041",
      "--clay":"#8A9468","--tan":"#DDE2CA","--rule":"#D4D8C2","--espresso":"#1F2419",
      "--espresso-card":"#2A3022","--cream":"#EEF1E2","--muted":"#909A7E"
    }
  }
};

const ACCENTS = {
  marron: "#C0152F", rojo: "#C0152F", matcha: "#6E8B3D"
};

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement;
    const pal = PALETTES[t.palette] || PALETTES.marron;
    Object.entries(pal.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    root.style.setProperty("--accent", t.accent);
    root.setAttribute("data-anim", t.anim);
  }, [t.palette, t.accent, t.anim]);

  useEffect(() => {
    const el = document.querySelector(".hero .slogan");
    if (el) el.textContent = t.slogan;
  }, [t.slogan]);

  // when palette changes, snap accent to that palette's default
  function changePalette(key) {
    setTweak({ palette: key, accent: ACCENTS[key] || t.accent });
  }

  return (
    <TweaksPanel>
      <TweakSection label="Paleta" />
      <TweakRadio label="Tema" value={t.palette}
        options={[
          { value: "marron", label: "Marrón" },
          { value: "rojo", label: "Rojo" },
          { value: "matcha", label: "Matcha" }
        ]}
        onChange={changePalette} />
      <TweakColor label="Acento" value={t.accent}
        options={["#C0152F", "#B5402E", "#8A5A2B", "#6E8B3D"]}
        onChange={(v) => setTweak("accent", v)} />

      <TweakSection label="Contenido" />
      <TweakText label="Eslogan" value={t.slogan}
        onChange={(v) => setTweak("slogan", v)} />

      <TweakSection label="Movimiento" />
      <TweakRadio label="Animación" value={t.anim}
        options={[
          { value: "none", label: "Ninguna" },
          { value: "subtle", label: "Sutil" },
          { value: "normal", label: "Normal" }
        ]}
        onChange={(v) => setTweak("anim", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<TweaksApp />);
