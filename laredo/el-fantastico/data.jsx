/* ============================================================
   EL FANTÁSTICO — Capa de datos
   Todo el contenido editable vive aquí. Para sustituir por los
   datos reales, basta con editar estos objetos: textos, precios,
   fotos, agenda de directos y reseñas.
   ============================================================ */

window.DATA = {
  negocio: {
    nombre: "El Fantástico",
    lugar: "Laredo",
    tagline: "Producto, pescado y buen rollo frente al puerto.",
    claim: "El sitio de Laredo donde el Cantábrico se come con las manos, se brinda con txakoli y se baila con música en directo.",
    direccion: "C. el Puerto, 39770 Laredo · Cantabria",
    telefono: "+34 674 377 991",
    whatsapp: "34674377991",
    rating: "4,2",
    reseñas: "1.486",
    precio: "10–50 € por persona",
    mapsQuery: "El Fantastico, Calle el Puerto, 39770 Laredo, Cantabria",
  },

  // Indicador Abierto/Cerrado y bloque de horario.
  // getDay(): 0=Domingo ... 6=Sábado. Minutos desde medianoche.
  horarioSala: {
    0: { label: "Domingo",   rangos: [[12 * 60, 21 * 60]] },
    1: { label: "Lunes",     rangos: [] },
    2: { label: "Martes",    rangos: [] },
    3: { label: "Miércoles", rangos: [[17 * 60, 24 * 60]] },
    4: { label: "Jueves",    rangos: [[17 * 60, 24 * 60]] },
    5: { label: "Viernes",   rangos: [[12 * 60, 24 * 60]] },
    6: { label: "Sábado",    rangos: [[12 * 60, 24 * 60]] },
  },
  horarioCocina: "Cocina abierta de 13:00 a 16:00 y de 20:00 a 23:30 (miércoles a domingo).",

  experiencia: [
    {
      titulo: "Con el puerto en primera fila",
      texto: "Terraza al borde del agua y comedor interior con alma. Atardeceres sobre los mástiles, brisa del Cantábrico y la mejor mesa para ver caer el sol sobre la dársena.",
    },
    {
      titulo: "Música en directo",
      texto: "Lo que de verdad nos diferencia: noches con banda, voz y guitarra. La cocina no para y el ambiente sube. Aquí no se viene solo a cenar, se viene a pasarlo bien.",
    },
    {
      titulo: "Para compartir y picotear",
      texto: "Raciones para el centro de la mesa, manos al aire y platos que van y vienen. Ideal con amigos, en pareja o para celebrar lo que haga falta.",
    },
  ],

  // Carta destacada — selección orientativa basada en la carta real.
  // (Provisional: precios y platos pueden variar por temporada.)
  cartaTabs: [
    {
      id: "compartir",
      label: "Para compartir",
      platos: [
        { nombre: "Una de rabas", desc: "Calamares fritos, alioli de ajo negro y lima", precio: "14€" },
        { nombre: "Anchoas artesanas Gran Reserva", desc: "Pan de masa madre tostado y mantequilla", precio: "16€" },
        { nombre: "Steak tartar sobre tuétano", desc: "Lomo bajo madurado, tuétano a la parrilla y nuestro aliño secreto", precio: "19€", foto: "assets/steak-tartar-tuetano.png" },
        { nombre: "Croqueta o niguiri de atún rojo", desc: "Base de leche de coco, kimchi y sashimi de atún rojo · 4 und", precio: "12€", foto: "assets/croquetas-atun.png" },
        { nombre: "Ravioli de rabo de toro", desc: "Salsa suave de foie y maíz texturizado", precio: "15€" },
        { nombre: "Ensaladilla rusa de ventresca", desc: "Encurtidos, cebolla marinada y huevas de pez volador", precio: "15€" },
      ],
    },
    {
      id: "mar",
      label: "Del mar",
      platos: [
        { nombre: "Zamburiñas a la plancha", desc: "Refrito apiñonado, emulsión de coco-lima y gazpacho de piparra", precio: "19€" },
        { nombre: "Gambas de Huelva", desc: "0% tonterías añadidas", precio: "18€" },
        { nombre: "Arroz meloso de carabineros", desc: "Emulsión de yema, mantequilla y migas", precio: "23€" },
        { nombre: "Pulpo crujiente", desc: "Patata rota en AOVE y mojo picón", precio: "22,50€" },
        { nombre: "La lonja del día", desc: "Rey, lubina, rape, rodaballo, San Martín… con su guarnición", precio: "S/M" },
        { nombre: "Carpaccio de bacalao ahumado", desc: "Mermelada de higos, pipas de calabaza y tomate rallado", precio: "18€" },
      ],
    },
    {
      id: "brasa",
      label: "A la brasa",
      platos: [
        { nombre: "Lomo bajo madurado 30 días", desc: "Crema de piquillos dulce-picante y papa frita", precio: "21€" },
        { nombre: "Costilla glaseada", desc: "Lacada con su propio jugo y patata rota huesca-miel", precio: "18€" },
        { nombre: "Solomillo de vaca", desc: "Pimientos del país y mantequilla de ajo negro", precio: "24€" },
        { nombre: "Lagarto ibérico", desc: "Patata frita, salsa melosa y semillas de sésamo", precio: "18€" },
      ],
    },
    {
      id: "postres",
      label: "Postres",
      platos: [
        { nombre: "Tarta de queso al horno", desc: "Chantilly especiada", precio: "6,50€" },
        { nombre: "Torrija de pan brioche", desc: "Caramelizada a golpe de soplete", precio: "6,50€" },
        { nombre: "Natillas de jengibre", desc: "Vainilla, sirope de chocolate y galleta de la abuela", precio: "6,50€" },
        { nombre: "Brownie con coulant", desc: "Crumble de mantequilla", precio: "6,50€" },
      ],
    },
  ],

  // Agenda de directos — EJEMPLOS PROVISIONALES para mostrar el gancho.
  directos: [
    { dia: "VIE", fecha: "20 JUN", hora: "21:30", artista: "Los Salitres", estilo: "Versiones indie-pop · acústico" },
    { dia: "SÁB", fecha: "21 JUN", hora: "22:00", artista: "Marea Sunset", estilo: "DJ set · sesión de atardecer" },
    { dia: "JUE", fecha: "26 JUN", hora: "21:00", artista: "Trío Cantábrico", estilo: "Jazz & bossa en directo" },
    { dia: "SÁB", fecha: "28 JUN", hora: "22:00", artista: "La del Puerto", estilo: "Soul & funk · banda completa" },
  ],

  // Reseñas — EJEMPLOS PROVISIONALES (resumen del 4,2 ★ real).
  reseñas: [
    { texto: "El sitio con mejores vistas del puerto. Las rabas y las anchoas, de diez, y el ambiente con música en directo es otro nivel.", autor: "María G.", estrellas: 5 },
    { texto: "Fuimos a picar y acabamos cenando de todo. El steak tartar sobre tuétano vale el viaje. Volveremos seguro.", autor: "Iker R.", estrellas: 5 },
    { texto: "Terraza espectacular al atardecer, raciones generosas para compartir y muy buen rollo. Reservad en verano.", autor: "Lucía M.", estrellas: 4 },
  ],

  galeria: [
    { src: "assets/terraza-atardecer.png", alt: "Terraza al atardecer sobre el puerto de Laredo", cap: "Atardecer en la terraza" },
    { src: "assets/puerto-vino-zamburinas.png", alt: "Vino blanco y zamburiñas frente a los barcos", cap: "Mesa con vistas al agua" },
    { src: "assets/steak-tartar-tuetano.png", alt: "Steak tartar sobre tuétano a la brasa", cap: "Steak tartar sobre tuétano" },
    { src: "assets/croquetas-atun.png", alt: "Croquetas con atún rojo", cap: "Croqueta-niguiri de atún" },
    { src: "assets/interior-comedor.png", alt: "Comedor interior con plantas y luz cálida", cap: "El comedor por dentro" },
  ],
};
