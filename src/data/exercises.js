const exercises = [
  // ═══════════════════════════════════════════════════════
  // ZONA 1 — Base de Lanzamiento (Repaso 2do grado)
  // ═══════════════════════════════════════════════════════
  {
    id: 'z1_e1', zona: 1, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto es 450 + 230?',
    opciones: ['580', '680', '670', '700'],
    respuesta: '680',
    xp: 10, monedas: 5,
    pista: 'Sumá las centenas: 400+200=600. Luego las decenas: 50+30=80. Total: 680 🚀',
  },
  {
    id: 'z1_e2', zona: 1, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto es 700 − 250?',
    opciones: ['350', '450', '550', '400'],
    respuesta: '450',
    xp: 10, monedas: 5,
    pista: '700 − 200 = 500. Luego 500 − 50 = 450 ✨',
  },
  {
    id: 'z1_e3', zona: 1, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuál es el número que sigue? 495 → 496 → 497 → ___',
    opciones: ['498', '500', '489', '507'],
    respuesta: '498',
    xp: 10, monedas: 5,
    pista: 'Cada número aumenta en 1. Después del 497 viene el 498 🔢',
  },
  {
    id: 'z1_e4', zona: 1, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuál es el mayor de estos números? 389 — 398 — 839 — 983',
    opciones: ['389', '398', '839', '983'],
    respuesta: '983',
    xp: 10, monedas: 5,
    pista: 'Mirá las centenas primero: 9 centenas es el mayor. ¡983 gana! 🏆',
  },
  {
    id: 'z1_e5', zona: 1, nivel: 1, tipo: 'verdadero_falso',
    pregunta: '¿Es verdad que 456 > 465?',
    respuesta: 'Falso',
    xp: 10, monedas: 5,
    pista: '456 tiene 5 decenas y 465 tiene 6 decenas. Entonces 456 < 465 📊',
  },
  {
    id: 'z1_e6', zona: 1, nivel: 2, tipo: 'numero',
    pregunta: '¿Cuánto es 350 + 275?',
    respuesta: '625',
    xp: 15, monedas: 8,
    pista: '350 + 275 = 350 + 200 + 75 = 550 + 75 = 625 🌟',
  },

  // ═══════════════════════════════════════════════════════
  // ZONA 2 — Planeta Números (hasta 10.000)
  // ═══════════════════════════════════════════════════════
  {
    id: 'z2_e1', zona: 2, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuál es el valor de la cifra 7 en el número 7.345?',
    opciones: ['7', '70', '700', '7.000'],
    respuesta: '7.000',
    xp: 10, monedas: 5,
    pista: 'La cifra 7 está en el lugar de los millares. 7 × 1.000 = 7.000 🔢',
  },
  {
    id: 'z2_e2', zona: 2, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Qué número va entre 4.999 y 5.001?',
    opciones: ['4.998', '5.002', '5.000', '5.100'],
    respuesta: '5.000',
    xp: 10, monedas: 5,
    pista: '4.999 → 5.000 → 5.001. El del medio es 5.000 🎯',
  },
  {
    id: 'z2_e3', zona: 2, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cómo se escribe "tres mil cuatrocientos dieciocho"?',
    opciones: ['3.480', '3.418', '3.148', '31.418'],
    respuesta: '3.418',
    xp: 10, monedas: 5,
    pista: '3.000 + 400 + 18 = 3.418 ✍️',
  },
  {
    id: 'z2_e4', zona: 2, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuál es el mayor de estos números? 4.532 — 5.234 — 4.523 — 5.324',
    opciones: ['4.532', '5.234', '4.523', '5.324'],
    respuesta: '5.324',
    xp: 10, monedas: 5,
    pista: 'Los que tienen 5 millares son los mayores. Entre 5.234 y 5.324: 3 centenas > 2 centenas → 5.324 gana 🥇',
  },
  {
    id: 'z2_e5', zona: 2, nivel: 1, tipo: 'verdadero_falso',
    pregunta: '¿Es verdad que 9.999 es el mayor número de 4 cifras?',
    respuesta: 'Verdadero',
    xp: 10, monedas: 5,
    pista: 'Con 4 cifras, el mayor posible es 9.999 (todos los dígitos en 9) 💯',
  },
  {
    id: 'z2_e6', zona: 2, nivel: 2, tipo: 'numero',
    pregunta: '¿Cuántas centenas completas hay en 3.600?',
    respuesta: '36',
    xp: 15, monedas: 8,
    pista: '3.600 ÷ 100 = 36 centenas. ¡Muy bien! 🌟',
  },

  // ═══════════════════════════════════════════════════════
  // ZONA 3 — Isla del Espacio (Orientación espacial)
  // ═══════════════════════════════════════════════════════
  {
    id: 'z3_e1', zona: 3, nivel: 1, tipo: 'verdadero_falso',
    pregunta: '¿Es verdad que el noroeste está entre el norte y el oeste?',
    respuesta: 'Verdadero',
    xp: 10, monedas: 5,
    pista: 'NO-roeste = entre el Norte y el Oeste. ¡Correcto! 🧭',
  },
  {
    id: 'z3_e2', zona: 3, nivel: 1, tipo: 'opcion_multiple',
    pregunta: 'Mirás al Norte y girás media vuelta (180°). ¿Hacia dónde quedás mirando?',
    opciones: ['Este', 'Oeste', 'Sur', 'Noreste'],
    respuesta: 'Sur',
    xp: 10, monedas: 5,
    pista: 'Media vuelta = el opuesto. El opuesto del Norte es el Sur 🔄',
  },
  {
    id: 'z3_e3', zona: 3, nivel: 1, tipo: 'verdadero_falso',
    pregunta: 'En un plano, si el punto B está a la derecha de A, entonces A está a la izquierda de B.',
    respuesta: 'Verdadero',
    xp: 10, monedas: 5,
    pista: 'Derecha e izquierda son relativas. Si B está a la derecha de A, A está a la izquierda de B ↔️',
  },
  {
    id: 'z3_e4', zona: 3, nivel: 1, tipo: 'opcion_multiple',
    pregunta: 'Desde (0,0) me muevo 3 casillas a la derecha y 2 hacia arriba. ¿Dónde quedo?',
    opciones: ['(2,3)', '(3,2)', '(3,−2)', '(−3,2)'],
    respuesta: '(3,2)',
    xp: 10, monedas: 5,
    pista: 'Derecha = eje X (+3). Arriba = eje Y (+2). Punto: (3,2) 📍',
  },
  {
    id: 'z3_e5', zona: 3, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Qué punto está más al norte? (2,5) — (2,3) — (2,7) — (2,1)',
    opciones: ['(2,5)', '(2,3)', '(2,7)', '(2,1)'],
    respuesta: '(2,7)',
    xp: 10, monedas: 5,
    pista: 'Norte = hacia arriba = número Y mayor. El 7 es el más grande 🧭',
  },
  {
    id: 'z3_e6', zona: 3, nivel: 2, tipo: 'verdadero_falso',
    pregunta: 'Si camino 4 pasos al Este y 3 pasos al Norte, estoy en el cuadrante superior derecho.',
    respuesta: 'Verdadero',
    xp: 15, monedas: 8,
    pista: 'Este = derecha (+x), Norte = arriba (+y). Ambos positivos = cuadrante superior derecho ✅',
  },

  // ═══════════════════════════════════════════════════════
  // ZONA 4 — Ciudad del Dinero (Valor posicional, billetes)
  // ═══════════════════════════════════════════════════════
  {
    id: 'z4_e1', zona: 4, nivel: 1, tipo: 'numero',
    pregunta: 'Vera tiene 7 billetes de $100 y 8 billetes de $1.000. ¿Cuánto dinero tiene? (en $)',
    respuesta: '8700',
    xp: 10, monedas: 5,
    pista: '7 × $100 = $700. 8 × $1.000 = $8.000. Total: $700 + $8.000 = $8.700 💵',
  },
  {
    id: 'z4_e2', zona: 4, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuántos billetes de $100 necesitás para tener $600?',
    opciones: ['4', '5', '6', '7'],
    respuesta: '6',
    xp: 10, monedas: 5,
    pista: '$600 ÷ $100 = 6 billetes 💴',
  },
  {
    id: 'z4_e3', zona: 4, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto vale la cifra 3 en el número 3.456?',
    opciones: ['3', '30', '300', '3.000'],
    respuesta: '3.000',
    xp: 10, monedas: 5,
    pista: 'La cifra 3 está en el lugar de los millares: 3 × 1.000 = 3.000 💰',
  },
  {
    id: 'z4_e4', zona: 4, nivel: 1, tipo: 'numero',
    pregunta: 'Tengo $5.000 y gasto $2.350. ¿Cuánto me queda? (en $)',
    respuesta: '2650',
    xp: 10, monedas: 5,
    pista: '$5.000 − $2.350: primero 5.000 − 2.000 = 3.000, luego 3.000 − 350 = 2.650 🏧',
  },
  {
    id: 'z4_e5', zona: 4, nivel: 1, tipo: 'opcion_multiple',
    pregunta: 'Tengo 5 grupos de 8 fichas. ¿Cuántas fichas tengo en total?',
    opciones: ['35', '40', '45', '48'],
    respuesta: '40',
    xp: 10, monedas: 5,
    pista: '5 grupos × 8 fichas = 5 × 8 = 40 fichas 🎯',
  },
  {
    id: 'z4_e6', zona: 4, nivel: 2, tipo: 'numero',
    pregunta: 'Pablo tiene $3.200. Gana $1.500 más y gasta $800. ¿Cuánto le queda? (en $)',
    respuesta: '3900',
    xp: 15, monedas: 8,
    pista: '$3.200 + $1.500 = $4.700. Luego $4.700 − $800 = $3.900 💸',
  },

  // ═══════════════════════════════════════════════════════
  // ZONA 5 — Templo Geométrico (Figuras planas)
  // ═══════════════════════════════════════════════════════
  {
    id: 'z5_e1', zona: 5, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuántos lados tiene un hexágono?',
    opciones: ['4', '5', '6', '8'],
    respuesta: '6',
    xp: 10, monedas: 5,
    pista: 'HEXA significa 6 en griego. Hexágono = 6 lados 🔷',
  },
  {
    id: 'z5_e2', zona: 5, nivel: 1, tipo: 'verdadero_falso',
    pregunta: '¿Es verdad que un rectángulo tiene los 4 lados iguales?',
    respuesta: 'Falso',
    xp: 10, monedas: 5,
    pista: 'Un rectángulo tiene 2 pares de lados iguales, pero no todos iguales. ¡El cuadrado sí! 📐',
  },
  {
    id: 'z5_e3', zona: 5, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Qué figura tiene 4 lados iguales y 4 ángulos rectos?',
    opciones: ['Rectángulo', 'Triángulo', 'Cuadrado', 'Rombo'],
    respuesta: 'Cuadrado',
    xp: 10, monedas: 5,
    pista: '4 lados iguales + 4 ángulos rectos de 90° = Cuadrado ✅',
  },
  {
    id: 'z5_e4', zona: 5, nivel: 1, tipo: 'opcion_multiple',
    pregunta: 'Un triángulo equilátero tiene...',
    opciones: ['2 lados iguales', '3 lados distintos', '3 lados iguales', '4 lados iguales'],
    respuesta: '3 lados iguales',
    xp: 10, monedas: 5,
    pista: 'EQUI-LÁTERO = lados iguales. Un triángulo equilátero tiene los 3 lados iguales 🔺',
  },
  {
    id: 'z5_e5', zona: 5, nivel: 1, tipo: 'numero',
    pregunta: 'Una figura tiene 5 lados. ¿Cuántos ángulos tiene?',
    respuesta: '5',
    xp: 10, monedas: 5,
    pista: 'Un polígono tiene tantos ángulos como lados. ¡5 lados = 5 ángulos! 📐',
  },
  {
    id: 'z5_e6', zona: 5, nivel: 2, tipo: 'verdadero_falso',
    pregunta: '¿Es verdad que todo cuadrado también es un rectángulo?',
    respuesta: 'Verdadero',
    xp: 15, monedas: 8,
    pista: 'El cuadrado cumple todo lo del rectángulo (4 ángulos rectos, 2 pares de lados paralelos) y además tiene lados iguales ✅',
  },

  // ═══════════════════════════════════════════════════════
  // ZONA 6 — Fábrica de Multiplicaciones (Tablas)
  // ═══════════════════════════════════════════════════════
  {
    id: 'z6_e1', zona: 6, nivel: 1, tipo: 'numero',
    pregunta: 'Hay 5 filas de 12 autos cada una. ¿Cuántos autos hay en total?',
    respuesta: '60',
    xp: 10, monedas: 5,
    pista: '5 filas × 12 autos = 5 × 12 = 60 autos 🚗',
  },
  {
    id: 'z6_e2', zona: 6, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto es 7 × 8?',
    opciones: ['54', '56', '48', '64'],
    respuesta: '56',
    xp: 10, monedas: 5,
    pista: 'Tabla del 7: 7,14,21,28,35,42,49,56 ✖️',
  },
  {
    id: 'z6_e3', zona: 6, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto es 9 × 6?',
    opciones: ['45', '54', '56', '63'],
    respuesta: '54',
    xp: 10, monedas: 5,
    pista: 'Tabla del 9: 9,18,27,36,45,54. ¡El 54 está en el 6! 🎯',
  },
  {
    id: 'z6_e4', zona: 6, nivel: 1, tipo: 'opcion_multiple',
    pregunta: 'Tengo 48 caramelos y los pongo en 6 bolsas iguales. ¿Cuántos van en cada bolsa?',
    opciones: ['6', '7', '8', '9'],
    respuesta: '8',
    xp: 10, monedas: 5,
    pista: '48 ÷ 6 = 8. Comprobá: 6 × 8 = 48 🍬',
  },
  {
    id: 'z6_e5', zona: 6, nivel: 1, tipo: 'numero',
    pregunta: '¿Cuánto es 4 × 25?',
    respuesta: '100',
    xp: 10, monedas: 5,
    pista: '4 × 25 = 4 × 20 + 4 × 5 = 80 + 20 = 100 💯',
  },
  {
    id: 'z6_e6', zona: 6, nivel: 2, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto es 72 ÷ 9?',
    opciones: ['7', '8', '9', '6'],
    respuesta: '8',
    xp: 15, monedas: 8,
    pista: '9 × 8 = 72, entonces 72 ÷ 9 = 8 ⚡',
  },

  // ═══════════════════════════════════════════════════════
  // ZONA 7 — Mercado de la Medida (cm/m, kg/g, horas)
  // ═══════════════════════════════════════════════════════
  {
    id: 'z7_e1', zona: 7, nivel: 1, tipo: 'numero',
    pregunta: '¿Cuántos centímetros tiene 1 metro?',
    respuesta: '100',
    xp: 10, monedas: 5,
    pista: '1 metro = 100 centímetros. ¡Exactamente 100! 📏',
  },
  {
    id: 'z7_e2', zona: 7, nivel: 1, tipo: 'numero',
    pregunta: 'Un libro mide 25 cm y otro 37 cm. ¿Cuánto miden juntos en cm?',
    respuesta: '62',
    xp: 10, monedas: 5,
    pista: '25 + 37 = 25 + 30 + 7 = 55 + 7 = 62 cm 📚',
  },
  {
    id: 'z7_e3', zona: 7, nivel: 1, tipo: 'verdadero_falso',
    pregunta: '¿Es verdad que 1 kilogramo = 1.000 gramos?',
    respuesta: 'Verdadero',
    xp: 10, monedas: 5,
    pista: 'KILO significa 1.000. 1 kg = 1.000 g ⚖️',
  },
  {
    id: 'z7_e4', zona: 7, nivel: 1, tipo: 'opcion_multiple',
    pregunta: 'Una mochila pesa 2 kg y un libro 500 g. ¿Cuánto pesan juntos en gramos?',
    opciones: ['2.050 g', '2.500 g', '1.500 g', '3.000 g'],
    respuesta: '2.500 g',
    xp: 10, monedas: 5,
    pista: '2 kg = 2.000 g. 2.000 + 500 = 2.500 g 🎒',
  },
  {
    id: 'z7_e5', zona: 7, nivel: 1, tipo: 'numero',
    pregunta: '¿Cuántos minutos tiene 1 hora?',
    respuesta: '60',
    xp: 10, monedas: 5,
    pista: '1 hora = 60 minutos ⏰',
  },
  {
    id: 'z7_e6', zona: 7, nivel: 2, tipo: 'opcion_multiple',
    pregunta: 'Son las 9:45. ¿Cuántos minutos faltan para las 10:00?',
    opciones: ['10 min', '15 min', '20 min', '25 min'],
    respuesta: '15 min',
    xp: 15, monedas: 8,
    pista: 'De 9:45 a 10:00 hay 15 minutos. (60 − 45 = 15) ⏱️',
  },

  // ═══════════════════════════════════════════════════════
  // ZONA 8 — Castillo de Operaciones (4 operaciones)
  // ═══════════════════════════════════════════════════════
  {
    id: 'z8_e1', zona: 8, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '35 ÷ 4 = ? (indicá cociente y resto)',
    opciones: ['8 resto 2', '8 resto 3', '9 resto 1', '7 resto 7'],
    respuesta: '8 resto 3',
    xp: 10, monedas: 5,
    pista: '4 × 8 = 32. 35 − 32 = 3. Cociente: 8, resto: 3 🏰',
  },
  {
    id: 'z8_e2', zona: 8, nivel: 1, tipo: 'numero',
    pregunta: 'Una caja tiene 36 bombones en 4 filas iguales. ¿Cuántos hay por fila?',
    respuesta: '9',
    xp: 10, monedas: 5,
    pista: '36 ÷ 4 = 9. Comprobá: 4 × 9 = 36 🍫',
  },
  {
    id: 'z8_e3', zona: 8, nivel: 1, tipo: 'numero',
    pregunta: '¿Cuánto es (15 + 25) × 2?',
    respuesta: '80',
    xp: 10, monedas: 5,
    pista: 'Primero el paréntesis: 15 + 25 = 40. Luego 40 × 2 = 80 🧮',
  },
  {
    id: 'z8_e4', zona: 8, nivel: 1, tipo: 'numero',
    pregunta: 'En un ómnibus hay 45 personas. Bajan 18 y suben 12. ¿Cuántas hay ahora?',
    respuesta: '39',
    xp: 10, monedas: 5,
    pista: '45 − 18 = 27. Luego 27 + 12 = 39 personas 🚌',
  },
  {
    id: 'z8_e5', zona: 8, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto es 150 ÷ 5?',
    opciones: ['25', '30', '35', '20'],
    respuesta: '30',
    xp: 10, monedas: 5,
    pista: '5 × 30 = 150. Entonces 150 ÷ 5 = 30 ⚔️',
  },
  {
    id: 'z8_e6', zona: 8, nivel: 2, tipo: 'numero',
    pregunta: 'María tiene 240 figuritas. Las pone en álbumes de 8 páginas con 6 por página. ¿Cuántos álbumes llena?',
    respuesta: '5',
    xp: 15, monedas: 8,
    pista: 'Cada álbum: 8 × 6 = 48 figuritas. 240 ÷ 48 = 5 álbumes ✨',
  },

  // ═══════════════════════════════════════════════════════
  // ZONA 9 — Museo de los Cuerpos (geometría 3D)
  // ═══════════════════════════════════════════════════════
  {
    id: 'z9_e1', zona: 9, nivel: 1, tipo: 'numero',
    pregunta: '¿Cuántas caras tiene un cubo?',
    respuesta: '6',
    xp: 10, monedas: 5,
    pista: 'El cubo tiene una cara en cada dirección: arriba, abajo, adelante, atrás, izquierda, derecha = 6 caras 🎲',
  },
  {
    id: 'z9_e2', zona: 9, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuántos vértices tiene una pirámide de base cuadrada?',
    opciones: ['4', '5', '6', '8'],
    respuesta: '5',
    xp: 10, monedas: 5,
    pista: 'Base cuadrada = 4 vértices abajo + 1 en la punta = 5 vértices total 🔺',
  },
  {
    id: 'z9_e3', zona: 9, nivel: 1, tipo: 'verdadero_falso',
    pregunta: '¿Es verdad que una esfera tiene aristas?',
    respuesta: 'Falso',
    xp: 10, monedas: 5,
    pista: 'La esfera es completamente redonda, sin caras planas ni aristas. Es lisa por todos lados ⚽',
  },
  {
    id: 'z9_e4', zona: 9, nivel: 1, tipo: 'numero',
    pregunta: '¿Cuántas aristas tiene un cubo?',
    respuesta: '12',
    xp: 10, monedas: 5,
    pista: 'Cubo: 4 aristas arriba + 4 abajo + 4 verticales = 12 aristas 🎲',
  },
  {
    id: 'z9_e5', zona: 9, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuántas caras tiene un prisma triangular?',
    opciones: ['3', '4', '5', '6'],
    respuesta: '5',
    xp: 10, monedas: 5,
    pista: '2 bases triangulares + 3 caras rectangulares laterales = 5 caras 🏛️',
  },
  {
    id: 'z9_e6', zona: 9, nivel: 2, tipo: 'opcion_multiple',
    pregunta: '¿Cuántos vértices tiene un cubo?',
    opciones: ['6', '8', '10', '12'],
    respuesta: '8',
    xp: 15, monedas: 8,
    pista: 'El cubo tiene 4 vértices en la cara superior y 4 en la inferior = 8 vértices 🌟',
  },
]

export default exercises

export function getZoneExercises(zoneId) {
  return exercises.filter(e => e.zona === zoneId)
}

export function getNextExercise(zoneId, completedMap) {
  const zoneExs = getZoneExercises(zoneId)
  return zoneExs.find(e => !completedMap[e.id]) || null
}

export function isZoneComplete(zoneId, completedMap) {
  const zoneExs = getZoneExercises(zoneId)
  return zoneExs.length > 0 && zoneExs.every(e => completedMap[e.id])
}

export function getZoneProgress(zoneId, completedMap) {
  const zoneExs = getZoneExercises(zoneId)
  const done = zoneExs.filter(e => completedMap[e.id]).length
  return { done, total: zoneExs.length, pct: zoneExs.length ? (done / zoneExs.length) * 100 : 0 }
}
