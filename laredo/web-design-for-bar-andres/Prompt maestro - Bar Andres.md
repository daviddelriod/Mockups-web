# Prompt maestro — Bar Andrés (Laredo)

> Generado con `pitch-web-hosteleria` (qué y para quién) y refinado con `oficio-diseno-web` (cómo). Listo para pegar en un proyecto de Claude Design con las fotos adjuntas.

```
Diseña una web-propuesta de alta fidelidad, mobile-first (375-390 px primero, comprobar también a 1180 px), para Bar Andrés, bar de pintxos y tapas en Laredo (Cantabria). Es un pitch especulativo: se le enseñará al dueño desde un móvil para que diga "la quiero". Usa las skills pitch-web-hosteleria y oficio-diseno-web. Usa el kit Mockups Web — Restaurant Kit como estructura (tipografías, crema, píldoras, sombras cálidas, componentes), pero re-apunta los acentos a la identidad del local. No apliques el sistema de diseño de ninguna otra organización.

## 1. Datos confirmados (literales, no tocar)
- Nombre en Google: "Tapas en Laredo | Bar Andrés". Rótulo de la fachada: "CAFÉ · BAR ANDRÉS".
- Categoría: Bar de tapas.
- Valoración: 4,8 (293 reseñas en Google).
- Precio: 1-10 € por persona.
- Estado en Google: Cerrado temporalmente.
- Dirección: C. Revellón, 20, 39770 Laredo, Cantabria. Plus code: CH6Q+PP Laredo.
- Teléfono: 676 78 42 55.
- Web y carta: tapaslaredo.com.
- Atributos: Se admiten perros. Amigable con la comunidad LGBTQ+.

## 2. Lo que NO tenemos (marcador visible, nunca inventar)
- Carta y precios → [PRECIO] en cada pintxo; nombres descriptivos provisionales sacados de las fotos.
- Horario → mostrar "Cerrado temporalmente" por defecto; un ajuste permite ver un horario de ejemplo etiquetado como tal.
- Reseñas individuales → huecos [RESEÑA REAL] para pegar opiniones de Google.
- WhatsApp → el 676 78 42 55 es móvil; asumir WhatsApp como [DEMO] y verificar.

## 3. Fotos adjuntas y reparto
- Bomba rebozada sobre jamón con pimiento y palillo de perla (vertical, la más potente) → hero.
- Fachada de azulejo azul con rótulo amarillo (horizontal) → sección "La casa".
- Bandeja de pintxos de Semana Santa (lleva texto sobreimpreso abajo: recortar desde arriba) → sección de encargos.
- Resto de pintxos (chipirón con champiñón, rulo de cabra con bacon, huevo de codorniz sobre piquillo, champiñón con jamón y alioli, codorniz con gulas y jamón, croquetas con alioli, pintxo de dos cremas con guindilla) → "La barra".
- Las fotos son pequeñas (≤ 640 px): no usar ninguna a sangre completa en escritorio; enmarcarlas (marco crema de 6 px, radio 22 px) y limitar su ancho.

## 4. Contrato de dirección
- Registro: cálido, bar de toda la vida de barrio. Nivel de movimiento 2 (moderado).
- Tesis: "Busca el azulejo azul". La fachada es la marca: pared de azulejo celeste y rótulo amarillo con letras azul marino. Se traslada y se eleva, no se sustituye.
- Mundo propio: textura de azulejo hecha con CSS (celeste #5B9FD2 con llagas claras), rótulo amarillo (#EBD84A) con texto azul marino (#1B2C4F) como logotipo y como H1, bandas oscuras en azul marino en vez de marrón. Detalle: las cabezas de palillo (perla, bola roja, madera) que aparecen en las fotos como ornamento de cada pintxo.
- Primer viewport (móvil): pared de azulejo + rótulo gigante "CAFÉ · BAR / ANDRÉS" como H1 + una línea con datos reales ("Pintxos y tapas de barra en la calle Revellón, 20. De 1 a 10 € por persona.") + CTA "Ver la barra" y "Cómo llegar" + estado y 4,8 ★. La foto del hero asoma por debajo invitando a bajar.
- Historia: fachada → la barra → la casa (atributos reales) → lo que dicen → encargos [DEMO] → dónde estamos + horario + alérgenos → pie.
- Momento firma (uno solo): "La barra", un carril horizontal de pintxos con scroll-snap, como recorrer la barra con la vista. Contador 01/08, barra de progreso y botones anterior/siguiente; el palillo del pintxo activo da un pequeño salto.
- Gramática de movimiento: entrada del rótulo al cargar (cae y se asienta, 700 ms, ease-out fuerte); revelado suave de secciones (opacity + translateY 24 px, 700 ms, stagger 70-80 ms); pulsación scale(0.97). Solo transform y opacity. Contenido visible sin JS. Con movimiento reducido, solo fundidos cortos.

## 5. Secciones
1. Nav fija: mini-rótulo amarillo + botón "Llamar".
2. Hero (ver primer viewport). Tweak para elegir foto del hero.
3. La barra (momento firma). Cada tarjeta: foto 3:4, cabeza de palillo, nombre provisional, descripción breve, [PRECIO].
4. La casa: foto de la fachada + "Busca el azulejo azul" + chips con atributos reales (perros, LGBTQ+, 1-10 €, bar de tapas).
5. Lo que dicen: 4,8 grande, 293 reseñas, botón a Google, huecos de reseña.
6. Encargos [DEMO]: "¿Celebras algo? Pide una bandeja" → formulario (12/24/36 pintxos, día, nombre) que abre WhatsApp con el mensaje escrito. Se apoya en la foto real de Semana Santa.
7. Dónde estamos: mapa, dirección, teléfono, estado/horario, "Cómo llegar". Aviso de alérgenos (obligatorio en la UE).
8. Pie azul marino con tira de azulejo, datos y nota de demostración.
9. CTA fijo en móvil tras el hero: "Llamar" + "Cómo llegar".

## 6. Copy y tono
Castellano de España, cálido y con guiño, "tú" en imperativo, la casa habla en "nosotros". Precios con coma y € pegado (2,50€). Sin emojis en la interfaz (solo dentro del mensaje de WhatsApp). Frases cortas y concretas; nada de "experiencia gastronómica única".

## 7. Oficio (oficio-diseno-web)
- Tipos del kit: Bricolage Grotesque 800 en titulares, Hanken Grotesk en texto, Caveat solo en un pie de foto.
- Contraste 4,5:1 (texto marino sobre azulejo, nunca blanco sobre celeste); objetivos táctiles ≥ 44 px; botones y enlaces reales; foco visible.
- Hover solo con puntero fino; nada de transition: all.
- Antes de entregar: recorrido de anti-patrones (sin degradados agresivos, sin iconos decorativos, sin tarjetas con borde izquierdo de color, sin datos de relleno).
- Ajustes (tweaks): estado (cerrado temporalmente / horario de ejemplo), ocultar etiquetas provisionales antes de la reunión, foto del hero, mostrar u ocultar encargos.

## 8. Entrega
Nota breve: hallazgos, momento firma y dónde se ve, fotos que faltan, supuestos a verificar, argumentos para la reunión y siguiente paso.
```

## Qué adjuntar en Claude Design
1. Fotos en mayor resolución de 2-3 pintxos (las actuales no pasan de 640 px).
2. Interior y barra con gente (no hay ninguna foto del interior).
3. La carta con precios, o una captura de tapaslaredo.com si la tiene.
