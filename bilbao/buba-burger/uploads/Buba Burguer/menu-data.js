// Datos de la carta de Buba Burger — compartidos por ambas direcciones de diseño
window.BUBA_MENU = {
  categorias: [
    {
      id: "hamburguesas",
      nombre: "Hamburguesas",
      claim: "De otro planeta",
      nota: "Carne: medallón a la brasa 180 g · doble smash 90 g — Pan: brioche de patata · pan rústico",
      items: [
        { id: "easy", nombre: "Easy", precio: "9,90", desc: "Bacon crujiente, pepinillo picado, queso cheddar y salsa clásica." },
        { id: "classic", nombre: "Classic", precio: "11,90", desc: "Queso Monterrey, lechuga, tomate, bacon, huevo, cebolla pochada y salsa clásica." },
        { id: "apollo-xiii", nombre: "Apollo XIII", precio: "11,90", desc: "Pollo crujiente, queso Monterrey, lechuga y mayonesa de guanciale casera." },
        { id: "emmy-yummy", nombre: "Emmy Yummy", precio: "12,90", desc: "Queso Monterrey, cheddar, bacon, pepinillo picado, cebolla frita y salsa Emmy casera.", tags: ["picante"] },
        { id: "espacial", nombre: "Espacial", precio: "11,90", desc: "Pollo crujiente, Monterrey, tomate, lechuga, mayo de hinojo y salsa de mango." },
        { id: "trufada", nombre: "Trufada", precio: "12,90", desc: "Gouda ahumado, huevo y salsa casera de boletus–trufa." },
        { id: "cabrona", nombre: "Cabrona", precio: "11,90", desc: "Queso de cabra, cebolla caramelizada, rúcula y salsa de piquillo casera." },
        { id: "luz-verde", nombre: "Luz Verde", precio: "12,90", desc: "Cebolla caramelizada, mozzarella vegana, lechuga y salsa de mango.", tags: ["vegan"] }
      ]
    },
    {
      id: "estrellas",
      nombre: "Estrellas",
      claim: "Las que más brillan",
      items: [
        { id: "big-bang-buba", nombre: "Big Bang Buba", precio: "13,90", desc: "Pan brioche, triple smash 90 g, cheddar, bacon crujiente, pulled pork, patata paja y salsa Bubakoa." },
        { id: "la-conquistadora", nombre: "La Conquistadora", precio: "13,90", desc: "Pan brioche, medallón a la brasa 180 g, cebolla caramelizada, queso Idiazabal y papada ibérica de Carranza." },
        { id: "la-gilda", nombre: "La Gilda", precio: "13,90", desc: "Pan brioche, doble smash 90 g, crema de queso Idiazabal ahumado, crujiente de jamón, emulsión de gilda y una gilda.", tags: ["picante"] },
        { id: "magic-burger", nombre: "Magic Burger", precio: "13,90", desc: "Pan rústico, medallón a la brasa 180 g, mermelada de cecina, mayonesa de ajo negro, queso de cabra y cebolla frita." },
        { id: "ovni", nombre: "O.V.N.I", precio: "8,90", desc: "Pan brioche, 90 g de carne madurada, cheddar, salsa O.V.N.I y mozzarella." },
        { id: "ufffo", nombre: "U.F.F.F.O", precio: "8,90", desc: "Pan brioche, 90 g de carne madurada, cheddar, pulled pork y salsa UFFFO.", tags: ["picante"] }
      ]
    },
    {
      id: "bokatas",
      nombre: "Bokatas",
      claim: "Pan del bueno",
      items: [
        { id: "bacon-queso", nombre: "Bacon Queso", precio: "5,90", desc: "Bacon y queso danés." },
        { id: "lomo-bacon-queso", nombre: "Lomo, Bacon y Queso", precio: "7,90", desc: "Lomo fresco, bacon y queso danés." },
        { id: "pollo-bacon-queso", nombre: "Pollo, Bacon y Queso", precio: "7,90", desc: "Pechuga de pollo, bacon y queso danés." },
        { id: "pepito-el-alien", nombre: "Pepito el Alien", precio: "8,90", desc: "Tierna ternera, jamón ibérico y queso danés." }
      ]
    },
    {
      id: "sandwitches",
      nombre: "Sandwitches",
      claim: "Sí, con T",
      items: [
        { id: "mixto", nombre: "Mixto", precio: "4,90", desc: "Jamón york y queso danés." },
        { id: "vegetal", nombre: "Vegetal", precio: "6,90", desc: "Jamón york, huevo cocido, bonito, lechuga, tomate y mayonesa." },
        { id: "club-buba", nombre: "Club Buba", precio: "8,90", desc: "Pechuga, jamón ibérico, bacon, queso danés, lechuga, tomate y mayonesa." }
      ]
    },
    {
      id: "perritos",
      nombre: "Perritos",
      claim: "Old school",
      items: [
        { id: "old-school", nombre: "Old School", precio: "8,90", desc: "Pan brioche de patata, salchicha, bacon crujiente, cebolla frita, pepinillo picado y salsas a tu gusto." }
      ]
    },
    {
      id: "dulce-final",
      nombre: "Dulce Final",
      claim: "Aterrizaje suave",
      items: [
        { id: "tarta-queso", nombre: "Tarta de Queso", precio: "5,00", desc: "Normal o de pistacho." },
        { id: "coulant", nombre: "Coulant de Chocolate", precio: "4,50", desc: "Con el corazón fundido, como debe ser." }
      ]
    }
  ],
  menus: [
    { id: "espacial", nombre: "Menú Espacial", precio: "+3 €", desc: "Tu burger o bokata con patatas y bebida." },
    { id: "galactico", nombre: "Menú Galáctico", precio: "+5 €", desc: "Patatas, bebida y entrante (2 ud)." },
    { id: "cohete", nombre: "Combo Burger Cohete", precio: "16 € /ud", desc: "×2 menús: 2 patatas + entrante (4 ud) + 2 bebidas.", desc2: "×4 menús a 15,50 €/ud: 4 patatas + 2 entrantes (4 ud) + 4 bebidas." }
  ],
  extras: [
    ["Lechuga", "0,50"], ["Tomate", "0,50"], ["Pepinillo", "0,50"],
    ["Cebolla caramelizada", "0,50"], ["Salsa a elegir", "1,00"], ["Bacon", "1,50"],
    ["Huevo", "1,50"], ["Queso a elegir", "1,50"], ["Pulled pork", "2,50"], ["Carne", "3,50"]
  ],
  horario: [
    ["Lunes", "19:30 – 22:30"],
    ["Martes", "Cerrado"],
    ["Miércoles", "Cerrado"],
    ["Jueves", "19:30 – 22:30"],
    ["Viernes", "19:30 – 23:30"],
    ["Sábado", "19:30 – 23:30"],
    ["Domingo", "19:30 – 22:30"]
  ]
};
