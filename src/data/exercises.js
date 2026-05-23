const exercises = [
  // ═══════════════════════════════════════════════════════
  // ZONA 1 — Base de Lanzamiento (Repaso 2do grado)
  // ═══════════════════════════════════════════════════════
  {
    id: 'z1_e1', zona: 1, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto es 320 + 450?',
    opciones: ['660', '770', '680', '750'],
    respuesta: '770',
    xp: 10, monedas: 5,
    pista: 'Sumá las centenas: 300+400=700. Luego las decenas: 20+50=70. Total: 770 🚀',
  },
  {
    id: 'z1_e2', zona: 1, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto es 900 − 350?',
    opciones: ['450', '550', '650', '500'],
    respuesta: '550',
    xp: 10, monedas: 5,
    pista: '900 − 300 = 600. Luego 600 − 50 = 550 ✨',
  },
  {
    id: 'z1_e3', zona: 1, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuál es el número que sigue? 672 → 673 → 674 → ___',
    opciones: ['675', '677', '664', '683'],
    respuesta: '675',
    xp: 10, monedas: 5,
    pista: 'Cada número aumenta en 1. Después del 674 viene el 675 🔢',
  },
  {
    id: 'z1_e4', zona: 1, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuál es el mayor de estos números? 567 — 675 — 756 — 765',
    opciones: ['567', '675', '756', '765'],
    respuesta: '765',
    xp: 10, monedas: 5,
    pista: 'Mirá las centenas: todos tienen 7 centenas o menos. Entre 756 y 765: las decenas 6 > 5. ¡765 gana! 🏆',
  },
  {
    id: 'z1_e5', zona: 1, nivel: 1, tipo: 'verdadero_falso',
    pregunta: '¿Es verdad que 327 > 372?',
    respuesta: 'Falso',
    xp: 10, monedas: 5,
    pista: '327 tiene 2 decenas y 372 tiene 7 decenas. Entonces 327 < 372 📊',
  },
  {
    id: 'z1_e6', zona: 1, nivel: 2, tipo: 'numero',
    pregunta: '¿Cuánto es 430 + 285?',
    respuesta: '715',
    xp: 15, monedas: 8,
    pista: '430 + 285 = 430 + 200 + 85 = 630 + 85 = 715 🌟',
  },

  // ═══════════════════════════════════════════════════════
  // ZONA 2 — Planeta Números (hasta 10.000)
  // ═══════════════════════════════════════════════════════
  {
    id: 'z2_e1', zona: 2, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuál es el valor de la cifra 6 en el número 6.482?',
    opciones: ['6', '60', '600', '6.000'],
    respuesta: '6.000',
    xp: 10, monedas: 5,
    pista: 'La cifra 6 está en el lugar de los millares. 6 × 1.000 = 6.000 🔢',
  },
  {
    id: 'z2_e2', zona: 2, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Qué número va entre 7.999 y 8.001?',
    opciones: ['7.998', '8.002', '8.000', '8.100'],
    respuesta: '8.000',
    xp: 10, monedas: 5,
    pista: '7.999 → 8.000 → 8.001. El del medio es 8.000 🎯',
  },
  {
    id: 'z2_e3', zona: 2, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cómo se escribe "cinco mil doscientos cuarenta y siete"?',
    opciones: ['5.274', '5.247', '5.724', '52.047'],
    respuesta: '5.247',
    xp: 10, monedas: 5,
    pista: '5.000 + 200 + 47 = 5.247 ✍️',
  },
  {
    id: 'z2_e4', zona: 2, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuál es el mayor de estos números? 6.219 — 9.162 — 6.291 — 9.216',
    opciones: ['6.219', '9.162', '6.291', '9.216'],
    respuesta: '9.216',
    xp: 10, monedas: 5,
    pista: 'Los que tienen 9 millares son los mayores. Entre 9.162 y 9.216: 2 centenas > 1 centena → 9.216 gana 🥇',
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
    pregunta: '¿Cuántas centenas completas hay en 5.400?',
    respuesta: '54',
    xp: 15, monedas: 8,
    pista: '5.400 ÷ 100 = 54 centenas. ¡Muy bien! 🌟',
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
    pregunta: 'Desde (0,0) me muevo 4 casillas a la derecha y 3 hacia arriba. ¿Dónde quedo?',
    opciones: ['(3,4)', '(4,3)', '(4,−3)', '(−4,3)'],
    respuesta: '(4,3)',
    xp: 10, monedas: 5,
    pista: 'Derecha = eje X (+4). Arriba = eje Y (+3). Punto: (4,3) 📍',
  },
  {
    id: 'z3_e5', zona: 3, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Qué punto está más al norte? (3,4) — (3,2) — (3,8) — (3,1)',
    opciones: ['(3,4)', '(3,2)', '(3,8)', '(3,1)'],
    respuesta: '(3,8)',
    xp: 10, monedas: 5,
    pista: 'Norte = hacia arriba = número Y mayor. El 8 es el más grande 🧭',
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
    pregunta: 'Vera tiene 5 billetes de $100 y 6 billetes de $1.000. ¿Cuánto dinero tiene? (en $)',
    respuesta: '6500',
    xp: 10, monedas: 5,
    pista: '5 × $100 = $500. 6 × $1.000 = $6.000. Total: $500 + $6.000 = $6.500 💵',
  },
  {
    id: 'z4_e2', zona: 4, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuántos billetes de $100 necesitás para tener $800?',
    opciones: ['6', '7', '8', '9'],
    respuesta: '8',
    xp: 10, monedas: 5,
    pista: '$800 ÷ $100 = 8 billetes 💴',
  },
  {
    id: 'z4_e3', zona: 4, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto vale la cifra 4 en el número 4.723?',
    opciones: ['4', '40', '400', '4.000'],
    respuesta: '4.000',
    xp: 10, monedas: 5,
    pista: 'La cifra 4 está en el lugar de los millares: 4 × 1.000 = 4.000 💰',
  },
  {
    id: 'z4_e4', zona: 4, nivel: 1, tipo: 'numero',
    pregunta: 'Tengo $8.000 y gasto $3.450. ¿Cuánto me queda? (en $)',
    respuesta: '4550',
    xp: 10, monedas: 5,
    pista: '$8.000 − $3.450: primero 8.000 − 3.000 = 5.000, luego 5.000 − 450 = 4.550 🏧',
  },
  {
    id: 'z4_e5', zona: 4, nivel: 1, tipo: 'opcion_multiple',
    pregunta: 'Tengo 6 grupos de 9 fichas. ¿Cuántas fichas tengo en total?',
    opciones: ['42', '48', '54', '60'],
    respuesta: '54',
    xp: 10, monedas: 5,
    pista: '6 grupos × 9 fichas = 6 × 9 = 54 fichas 🎯',
  },
  {
    id: 'z4_e6', zona: 4, nivel: 2, tipo: 'numero',
    pregunta: 'Pablo tiene $2.800. Gana $1.500 más y gasta $900. ¿Cuánto le queda? (en $)',
    respuesta: '3400',
    xp: 15, monedas: 8,
    pista: '$2.800 + $1.500 = $4.300. Luego $4.300 − $900 = $3.400 💸',
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
    pregunta: 'Hay 4 filas de 15 pelotas cada una. ¿Cuántas pelotas hay en total?',
    respuesta: '60',
    xp: 10, monedas: 5,
    pista: '4 filas × 15 pelotas = 4 × 15 = 60 pelotas ⚽',
  },
  {
    id: 'z6_e2', zona: 6, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto es 6 × 9?',
    opciones: ['45', '54', '48', '56'],
    respuesta: '54',
    xp: 10, monedas: 5,
    pista: 'Tabla del 6: 6,12,18,24,30,36,42,48,54 ✖️',
  },
  {
    id: 'z6_e3', zona: 6, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto es 8 × 7?',
    opciones: ['48', '54', '56', '63'],
    respuesta: '56',
    xp: 10, monedas: 5,
    pista: 'Tabla del 8: 8,16,24,32,40,48,56. ¡El 56 está en el 7! 🎯',
  },
  {
    id: 'z6_e4', zona: 6, nivel: 1, tipo: 'opcion_multiple',
    pregunta: 'Tengo 63 caramelos y los pongo en 7 bolsas iguales. ¿Cuántos van en cada bolsa?',
    opciones: ['7', '8', '9', '10'],
    respuesta: '9',
    xp: 10, monedas: 5,
    pista: '63 ÷ 7 = 9. Comprobá: 7 × 9 = 63 🍬',
  },
  {
    id: 'z6_e5', zona: 6, nivel: 1, tipo: 'numero',
    pregunta: '¿Cuánto es 6 × 15?',
    respuesta: '90',
    xp: 10, monedas: 5,
    pista: '6 × 15 = 6 × 10 + 6 × 5 = 60 + 30 = 90 💯',
  },
  {
    id: 'z6_e6', zona: 6, nivel: 2, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto es 56 ÷ 7?',
    opciones: ['6', '7', '8', '9'],
    respuesta: '8',
    xp: 15, monedas: 8,
    pista: '7 × 8 = 56, entonces 56 ÷ 7 = 8 ⚡',
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
    pregunta: 'Un libro mide 34 cm y otro 48 cm. ¿Cuánto miden juntos en cm?',
    respuesta: '82',
    xp: 10, monedas: 5,
    pista: '34 + 48 = 34 + 40 + 8 = 74 + 8 = 82 cm 📚',
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
    pregunta: 'Una mochila pesa 3 kg y una cartuchera 400 g. ¿Cuánto pesan juntas en gramos?',
    opciones: ['3.004 g', '3.040 g', '3.400 g', '4.300 g'],
    respuesta: '3.400 g',
    xp: 10, monedas: 5,
    pista: '3 kg = 3.000 g. 3.000 + 400 = 3.400 g 🎒',
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
    pregunta: 'Son las 11:35. ¿Cuántos minutos faltan para las 12:00?',
    opciones: ['15 min', '20 min', '25 min', '30 min'],
    respuesta: '25 min',
    xp: 15, monedas: 8,
    pista: 'De 11:35 a 12:00 hay 25 minutos. (60 − 35 = 25) ⏱️',
  },

  // ═══════════════════════════════════════════════════════
  // ZONA 8 — Castillo de Operaciones (4 operaciones)
  // ═══════════════════════════════════════════════════════
  {
    id: 'z8_e1', zona: 8, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '37 ÷ 5 = ? (indicá cociente y resto)',
    opciones: ['7 resto 2', '7 resto 3', '8 resto 1', '6 resto 7'],
    respuesta: '7 resto 2',
    xp: 10, monedas: 5,
    pista: '5 × 7 = 35. 37 − 35 = 2. Cociente: 7, resto: 2 🏰',
  },
  {
    id: 'z8_e2', zona: 8, nivel: 1, tipo: 'numero',
    pregunta: 'Una caja tiene 42 galletitas en 7 filas iguales. ¿Cuántas hay por fila?',
    respuesta: '6',
    xp: 10, monedas: 5,
    pista: '42 ÷ 7 = 6. Comprobá: 7 × 6 = 42 🍪',
  },
  {
    id: 'z8_e3', zona: 8, nivel: 1, tipo: 'numero',
    pregunta: '¿Cuánto es (12 + 18) × 3?',
    respuesta: '90',
    xp: 10, monedas: 5,
    pista: 'Primero el paréntesis: 12 + 18 = 30. Luego 30 × 3 = 90 🧮',
  },
  {
    id: 'z8_e4', zona: 8, nivel: 1, tipo: 'numero',
    pregunta: 'En un ómnibus hay 52 personas. Bajan 24 y suben 16. ¿Cuántas hay ahora?',
    respuesta: '44',
    xp: 10, monedas: 5,
    pista: '52 − 24 = 28. Luego 28 + 16 = 44 personas 🚌',
  },
  {
    id: 'z8_e5', zona: 8, nivel: 1, tipo: 'opcion_multiple',
    pregunta: '¿Cuánto es 120 ÷ 4?',
    opciones: ['20', '25', '30', '35'],
    respuesta: '30',
    xp: 10, monedas: 5,
    pista: '4 × 30 = 120. Entonces 120 ÷ 4 = 30 ⚔️',
  },
  {
    id: 'z8_e6', zona: 8, nivel: 2, tipo: 'numero',
    pregunta: 'Ana tiene 270 figuritas. Las pone en álbumes de 6 páginas con 9 por página. ¿Cuántos álbumes llena?',
    respuesta: '5',
    xp: 15, monedas: 8,
    pista: 'Cada álbum: 6 × 9 = 54 figuritas. 270 ÷ 54 = 5 álbumes ✨',
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
