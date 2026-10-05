# Mockups Web — Restaurant Kit

A design system for rapidly generating **warm, appetizing landing-page mockups for local hospitality clients** — bars, restaurants, poke bars, burger joints — primarily in the Cantabrian coast towns of **Bilbao, Laredo and Santander (Spain)**. Mockups are produced one client at a time, deployed to a shareable URL, and sent to the client over WhatsApp for sign-off.

This kit distills the shared visual + content language across those mockups into tokens, components, a full UI-kit recreation, and the guidelines below so new mockups stay on-brand and ship fast.

## Sources

Built from the real mockup repository (browse it for more reference designs and patterns):

- **GitHub:** [github.com/daviddelriod/Mockups-web](https://github.com/daviddelriod/Mockups-web) — restaurant mockups for Bilbao / Laredo / Santander clients. Notable reference designs: `laredo/el-fantastico` (React, the basis of this kit's UI kit), `bilbao/izar-santutxu` (warm burger bar), `laredo/poke-la-flaka` (tropical poke bar), `bilbao/buba-burguer`, `bilbao/yuki-sushi`.

The repo's own README documents its zip → GitHub Pages → WhatsApp deploy flow. Explore those client folders to see the full range of palettes and section patterns this system generalizes.

---

## CONTENT FUNDAMENTALS

**Language.** Castilian Spanish (España), Cantabria/Basque-coast register. Place-rooted: the sea (*el Cantábrico*, *la dársena*, *la lonja*, *el puerto*), local produce, *txakoli*. Mockups are for real neighbourhood businesses, not chains.

**Voice.** Warm, confident, *buen rollo* (good-vibes). Sells the **experience and atmosphere**, not just food. Headlines have attitude and a wink:
- *"No es un restaurante de pescado serio y aburrido."*
- *"Gambas de Huelva — 0% tonterías añadidas."*
- *"El Cantábrico se come con las manos."*
- *"Aquí no se viene solo a cenar, se viene a pasarlo bien."*

**Person.** Speaks as the house — **"nosotros"** ("lo que nos diferencia", "nuestra carta"). Addresses the diner as **"tú"** implicitly via imperatives: *Reserva*, *Ven*, *Comparte*, *Pídelo*. Friendly, never formal "usted".

**Casing.** Sentence case for headings and body. Eyebrows/kickers are **UPPERCASE** with wide letter-spacing (`El alma del sitio` → `EL ALMA DEL SITIO`). Brand names keep their own casing.

**Numbers (es-ES).** Comma decimals, dot thousands: rating **"4,2"**, **"1.486 reseñas"**, prices **"22,50€"** or **"14€"** (€ suffix, no space). Market price = **"S/M"** (según mercado). Price ranges: *"10–50 € por persona"*.

**Eyebrow vocabulary.** Short, evocative kickers: *El alma del sitio · Para compartir · Lo que nos hace diferentes · Dónde estamos · Lo que dicen · Atardecer en la dársena*.

**Honesty disclaimers.** Because these are demo mockups, sample content is labelled: a small **"demo"** badge on the reservation form, and a footer note clarifying which photos are real and which reviews/agenda are illustrative. Keep this honesty when generating new mockups.

**Calls to action.** Always action-led and reservation-focused: **"Reservar mesa", "Cómo llegar", "WhatsApp", "Ver la carta", "Enviar por WhatsApp"**. WhatsApp is the primary conversion channel — CTAs deep-link to `wa.me` with a pre-written message.

**Emoji.** Sparingly, and only inside WhatsApp message bodies (👤 👥 📅 📞) — never in the on-page UI. No emoji as decoration or icons in the layout itself.

---

## VISUAL FOUNDATIONS

**Overall vibe.** Warm, sunlit, hand-made, appetizing. "Cream paper" canvas with hot appetite-accents and real golden-hour photography. Never cold, corporate, or blue-tech.

**Color.** A warm system, *never pure black or white as the base*:
- **Backgrounds** are cream (`--cream #FBF4E6`) and a second warmer cream (`--cream-2`) to alternate sections; cards are white `--paper`.
- **Text** is a warm near-black brown (`--ink #2A2018`) softening to `--ink-soft` / `--ink-faint`.
- **Dark sections** ("night" bands, footers, review/music sections) use deep browns `--char` / `--char-2` / `--char-deep` with cream text.
- **Accents** are the appetite colors: `--tomato` (primary CTA / prices / eyebrows), `--gold` (stars, highlights on dark), `--coral` (playful seafood alt), `--green` ("abierto"). WhatsApp green is its own utility color.
- Each client gets its **own palette** but keeps this structure — re-point `--accent` / `--accent-2` and swap the cream/char neutrals to match the venue (tropical jungle-green for a poke bar, neon for a burger joint). See the repo for per-client variations.

**Type.** Three Google families, always:
- **Bricolage Grotesque** — display/headings. Chunky, weight 800, tight tracking (`-.02em`), line-height ~1.0. Big and confident.
- **Hanken Grotesk** — body/UI. 18px base, 1.55 line-height, friendly and legible.
- **Caveat** — handwritten script accent for taglines and photo captions. Used sparingly for warmth (e.g. *"frente al puerto"*).

**Backgrounds & imagery.** Real photography is central — golden-hour terraces, plated dishes shot tight, warm interiors. Full-bleed hero photo under a **vertical dark gradient** (top ~30% → bottom ~85% black-brown) so white text reads. Feature photos are framed in a **6px cream/white border** with a soft warm shadow. Imagery skews warm/golden, never cool or desaturated. Occasional conic/radial "starburst" glows behind hero art.

**Spacing & layout.** Centered `--maxw: 1180px` content column with `--gutter` side padding; generous `--pad-block` (62–88px) between sections. Fixed/sticky translucent nav (blurred cream once scrolled). A sticky bottom CTA bar appears on mobile after the hero. Two-column splits collapse to one under 980px.

**Corner radii.** Soft and rounded: cards `18px` (`--radius`), large photo panels `22px`, inputs `12px`, and **999px pills** for every button, chip and status indicator. The pill is the signature shape.

**Cards.** White surface, 1px `--line` border, `18px` radius, soft warm `--shadow-sm` at rest. A signature variant adds a **6px colored bar across the top** (accent or coral). On dark sections, cards flip to `--char-2` with a hairline white border.

**Shadows.** Always **warm-tinted** (brown-based `rgba(53,36,18,…)`), never neutral grey. Three levels: `--shadow-sm` (resting card), `--shadow` (lifted/feature), `--shadow-pop` (floating UI over photos, modals).

**Borders.** Hairline `--line` on cream; dashed `--line` as menu-row separators and table rules; translucent white `rgba(255,255,255,.08–.1)` on dark sections. Outline buttons use a 2px ink border.

**Transparency & blur.** Used for the scrolled nav (`backdrop-filter: blur(10px)` over translucent cream), ghost buttons over photos (translucent white + blur), chips over imagery, and modal backdrops (`blur(3px)` over `rgba(20,12,6,.55)`).

**Motion.** Restrained and tasteful:
- **Reveal on scroll** — sections fade up `translateY(24px) → 0` over `.7s` ease as they enter (IntersectionObserver adds `.in`). Staggered by ~70–80ms across grid items.
- **Hover** — buttons lift `translateY(-2px)` and deepen color / grow shadow; cards lift `translateY(-6px)`; links shift to the accent color; gallery images scale `1.06`.
- **Press** — buttons nudge `translateY(1px)` down.
- Easing is a standard `cubic-bezier(.4,0,.2,1)`. One slow decorative `spin` (60s) on hero starbursts. **All motion respects `prefers-reduced-motion`.**

**Status & rating motifs.** A Google-style star row (gold ★, comma-decimal score, dot-thousands count) and an **open/closed pill** with a ringed LED dot (green "abierto" / tomato "cerrado"), driven by the venue's real schedule.

---

## ICONOGRAPHY

- **System:** thin-line **Lucide / Feather-style** icons — 24×24 viewBox, `2px` stroke, round caps and joins, `currentColor`. They are authored as **inline SVG** in the mockups (no icon font, no PNG icons). The kit ships a small set in `ui_kits/restaurant-landing/icons.jsx`: calendar, map-pin, clock, phone, music, wave, share.
- **WhatsApp glyph** is the one **filled** brand icon (its real logo path), used on every WhatsApp CTA.
- **Stars** are the Unicode glyphs **★ / ☆** in `--gold` (not an icon font) — used for ratings everywhere.
- **No emoji in the UI.** Emoji appear only inside pre-written WhatsApp message strings.
- **To extend:** keep the same Lucide/Feather stroke style. If you need more icons, pull them from [lucide.dev](https://lucide.dev) (matching 2px stroke) and inline the SVG, or link Lucide from CDN — do not mix in filled/duotone icon sets.

---

## INDEX

**Root**
- `styles.css` — the single entry point consumers link. `@import`s the token + base files below.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter wrapper so this kit works in Claude Code.

**`tokens/`** — design tokens (all reachable from `styles.css`)
- `fonts.css` — Google Fonts import (Bricolage Grotesque, Hanken Grotesk, Caveat).
- `colors.css` — warm palette + semantic aliases (`--accent`, `--surface-card`, …).
- `typography.css` — families, weights, fluid type scale, eyebrow tracking.
- `spacing.css` — layout, spacing scale, radii, shadows, motion.
- `base.css` — element resets + `.wrap`, `.eyebrow`, `.script`, `.reveal` helpers.

**`components/core/`** — reusable React primitives (namespace `MockupsWebRestaurantKit_*`)
- `Button` · `Eyebrow` · `Chip` · `StarRating` · `StatusPill` · `SectionHeading` · `MenuItem` · `ReviewCard` · `Card`
- Each has a `.jsx`, `.d.ts`, `.prompt.md`; `core.card.html` is the Design-System tab specimen.

**`ui_kits/restaurant-landing/`** — full interactive recreation (El Fantástico, Laredo)
- `index.html` — the assembled, click-through landing page (hero, experiencia, carta tabs, música, reseñas, ubicación + live hours, reservation modal → WhatsApp, sticky CTA).
- `icons.jsx` · `data.jsx` · `sections.jsx` · `app.jsx` — well-factored source.
- `README.md` — kit notes.

**`guidelines/foundations/`** — Design-System tab specimen cards (Colors, Type, Spacing, Brand).

**`assets/img/`** — real client photography (terraza, platos, interior) for use in mockups and specimens.
