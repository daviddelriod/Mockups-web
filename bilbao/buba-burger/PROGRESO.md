# Buba Burger — estado del rediseño

Archivo principal: `Buba Burger v2.dc.html` (basado en `uploads/Buba Burguer/Buba Burger - Dirección A.html`).
Estética fija: neón (#b98aff / #6ee7f9 / #f472d0 sobre #07041a), Zen Dots + Space Grotesk, logo alien. No cambiar.
Imágenes en `images/` (copiadas de uploads). Animación: GSAP 3.13 + ScrollTrigger + Lenis (jsdelivr). SplitText ya no se usa.

## Hecho
- Hero "La abducción": intro al cargar (alien baja, haz parpadea, titular letra a letra con glitch).
  - Escritorio: hero fijo (pin +=75%), la burger sube y flota en el haz. El usuario dice que está perfecto, no tocar.
  - Móvil (<900px): hero entero fijo (pin +=100%, scrub .6). Indicador "DESLIZA". La burger se encoge y desaparece en la nave, el haz se apaga, la nave sale volando hacia arriba y desaparece, y el texto y botones del hero (valoración, subtítulo, CTAs, plataformas) aparecen en el hueco del haz (scene y body comparten celda de grid: `mobOverlap`). Barra fija móvil solo aparece al llegar a la carta.
- Marquesina doble que acelera con la velocidad de scroll.
- Carta escritorio: categorías numeradas, fichas de plato, Estrellas en carrusel arrastrable, chips sticky con indicador deslizante.
- Carta móvil: pestañas (una categoría a la vez), filas compactas desplegables con "+", swipe lateral, botón "Siguiente: …".
- Menús: tickets con inclinación 3D (ratón) y precios que parpadean como neón.
- Sin gluten: titular de violeta a verde con parpadeo, foto con revelado clip y sello giratorio.
- Reseñas: contadores 0→4,7 y 0→304, estrellas pop, cinta de 4 reseñas DE EJEMPLO.
- Visítanos: horario con HOY, mapa de Google oscurecido, botones Cómo llegar / Llamar.
- Instagram: 4 fotos con parallax.
- Global: estrellas de fondo con parallax, halo de cursor, botones magnéticos, menú móvil, barra fija móvil (Llamar / Pedir a domicilio con hoja de plataformas), aviso de alérgenos.
- Tweaks: neonColor, motion, cursorHalo.

- Ronda móvil 2: hero con CTAs a dos columnas iguales y bloque "Te lo llevamos a casa" separado (etiqueta arriba, 3 plataformas en fila). Chips de la carta móvil: estado activo pintado en el propio chip (sin indicador medido, que se quedaba en Hamburguesas y dejaba el texto oscuro invisible), sin halo de foco/tap, el chip activo se centra en la fila. Espaciados verticales con clamp() (más compactos en móvil). Menús y combos en carrusel horizontal con snap (en escritorio siguen 3 en fila) y barra de progreso en móvil. Parallax de Instagram reducido en móvil.
- Pantalla de carga (1,1 s, burgers = `images/burger-loader.png` recortada sin fondo, CSS keyframes, estado `loaderDone`): "BUBA BURGER" en neón, barra pill rayada que se rellena con la cabeza del alien en el borde masticando 4 mini burgers por el camino, y mensajes rotatorios (Calentando la plancha / Fundiendo el queso / Montando tu burger). Sin efecto abducción (eso es del hero). La intro del hero arranca al terminar (`_loaderEnd`). Se omite con motion off / reduced-motion.
- Pie de página móvil compacto: marca a ancho completo, Contacto y A domicilio en dos columnas, textos y espaciados menores.

## Pendiente / abierto
- Cambios móviles (pin del hero + carta por pestañas) hechos; confirmarlos en un móvil real.
- 3 errores de consola `[error] {}` sin detalle (siguen tras quitar SplitText). Sospecha: iframe de Google Maps o el bundle del DS. No rompen nada visible.
- Datos a verificar con el cliente: enlaces reales de Glovo / Just Eat / Uber Eats (ahora genéricos); sustituir reseñas de ejemplo; confirmar qué carta es la actual (la foto subida no coincide con menu-data); confirmar "Amigable LGBTQ+".
