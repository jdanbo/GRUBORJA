/* =========================================================
   GRUBORJA — BASE DE DATOS DE PROYECTOS
   ---------------------------------------------------------
   Fuentes: "FULL_Portfolio_0822" y "Fichas de proyectos" (feb. 2015).

   ¿CÓMO AGREGAR UN PROYECTO NUEVO?
   1. Crea la carpeta  assets/img/proyectos/<id>/
      y copia ahí las fotos:  <id>-1.webp, <id>-2.webp, ...
   2. Copia un bloque { ... } de abajo, pégalo y cambia los datos.
   3. "imagenes" = cuántas fotos tiene (1, 2, 3...).
      · imagenes: 0  → se muestra la imagen genérica de GRUBORJA.
      · fotos: ["carpeta/archivo.webp", ...] → usa fotos de otra carpeta
        (rutas dentro de assets/img/proyectos/). Tiene prioridad sobre "imagenes".
   4. "destacado: true" lo muestra también en la página de Inicio.
   No hay que tocar HTML: el portafolio se arma solo.

   CAMPOS OPCIONALES DE LA FICHA TÉCNICA (si faltan, no se muestran):
   · fecha      → "" para omitirla
   · tipologia  → tipo de obra
   · grupo      → cliente corporativo que agrupa varios proyectos (etiqueta en la tarjeta)
   · accion     → ["Planificación", "Dirección", ...]  (acción profesional)
   · tecnica    → ["Estructura de marcos metálicos", ...]  (características técnicas)
   · equipo     → [["Diseño estructural", "Ing. ..."], ...]  (equipo de proyecto)

   Sectores válidos (los filtros del portafolio se crean solos a partir de estos):
   comercial | automotriz | hoteleria | hospitalario | academia | residencial
   · Un sector sin proyectos no aparece en los filtros.
   · Los proyectos se muestran en el orden de esta lista
     (los automotrices están en orden cronológico).
   ========================================================= */

const SECTORES = {
  comercial: "Comercial e Industria",
  automotriz: "Automotriz",
  hoteleria: "Hotelería",
  hospitalario: "Hospitalario",
  academia: "Academia",
  residencial: "Residencial"
};

/* Resumen que aparece sobre la cuadrícula al activar un filtro.
   "proyectos" se calcula solo. */
const RESUMENES_SECTOR = {
  automotriz: {
    titulo: "Grupo Los Tres",
    texto: "Una relación de más de dos décadas diseñando, remodelando y dirigiendo showrooms, talleres y agencias bajo los estándares de imagen de marcas automotrices internacionales.",
    datos: [
      ["Desde", "1998"],
      ["Marcas", "Volvo · Porsche · MINI · Mahindra · Kawasaki · ZX"],
      ["Países", "Guatemala · Panamá · El Salvador"]
    ]
  }
};

/* Acciones profesionales frecuentes (para no repetir texto) */
const ACCION_INTEGRAL = ["Planificación arquitectónica", "Coordinación de ingenierías", "Dirección de proyecto", "Supervisión"];

const PROYECTOS = [
  {
    id: "hilton-guatemala",
    nombre: "Hilton Guatemala City",
    subtitulo: "Hotel Quinta Real, actualmente Hilton Guatemala City",
    sector: "hoteleria",
    tipologia: "Hotel de gran clase",
    area: "36,000 m²",
    ubicacion: "Km 8.5 Carretera a El Salvador",
    cliente: "Profesionales en Turismo",
    fecha: "1995 – 1997",
    alcance: ["En colaboración con Elías + Elías (Guadalajara, México)", "Ampliaciones, remodelaciones y mantenimiento posteriores"],
    accion: ["Integración del proyecto a ingenierías locales", "Planificación y ejecución", "Supervisión arquitectónica y constructiva", "Enlace con profesionales mexicanos"],
    tecnica: [
      "Arquitectura que reinterpreta los detalles coloniales guatemaltecos y de las residencias del México colonial",
      "Proyecto binacional desarrollado bajo los estándares de la corporación hotelera Quinta Real",
      "Modelos tecnológicos y constructivos propios para ejecutar detalles arquitectónicos especiales"
    ],
    equipo: [
      ["Diseño arquitectónico", "Elías + Elías, Guadalajara"],
      ["Coordinación", "Ing. Jaime Cáceres Knox"],
      ["Diseño estructural", "Ings. Hermosilla y León"],
      ["Diseño hidrosanitario", "Ing. Julio Santolino · Ing. Francisco Navarrete (México)"],
      ["Diseño eléctrico", "Pretinsa"],
      ["Construcción", "Castañeda y Molina"]
    ],
    descripcion: "Coordinación e integración de un proyecto icónico para la ciudad, que combina escala monumental con acabados de alto nivel, áreas públicas y un diseño estructural pensado para el turismo de clase mundial.",
    imagenes: 2,
    destacado: false
  },
  {
    id: "casa-botran",
    nombre: "Casa Botrán",
    subtitulo: "Centro de Añejamiento y Distribución",
    sector: "comercial",
    tipologia: "Industrial — añejamiento y distribución",
    area: "90,000 m²",
    ubicacion: "La Esperanza, Quetzaltenango",
    cliente: "Licores de Guatemala",
    fecha: "2010 – 2011",
    alcance: ["Edificaciones: 40,000 m²", "Urbanización: 50,000 m²"],
    accion: ACCION_INTEGRAL,
    descripcion: "Gestión de un macroproyecto que integró 40,000 m² de naves industriales de añejamiento y 50,000 m² de urbanización. Una muestra de nuestra capacidad operativa en infraestructura industrial a gran escala.",
    imagenes: 4,
    destacado: true
  },
  {
    id: "suma",
    nombre: "Supermercados Mayoristas SUMA",
    subtitulo: "Red de sucursales a nivel nacional",
    sector: "comercial",
    tipologia: "Comercial — supermercado mayorista",
    area: "40,000 m²",
    ubicacion: "8 sucursales en Guatemala",
    cliente: "Grupo CADAR S.A. — GTA Grupo de Tiendas Asociadas",
    fecha: "2012 – Actualidad",
    alcance: ["Escuintla (23,000 m², 2011 – 2012)", "Chimaltenango (25,000 m², 2012 – 2013)", "Mazatenango", "Cobán", "Naranjo", "Quetzaltenango", "Huehuetenango", "Petén"],
    descripcion: "Desarrollo continuo de la red de supermercados mayoristas SUMA en el interior del país: ocho sucursales proyectadas y ejecutadas con un estándar constructivo replicable.",
    imagenes: 6,
    destacado: false
  },
  {
    id: "centro-medico",
    nombre: "Hospital Centro Médico",
    subtitulo: "Arquitectura, gestión de proyecto y diseño de mobiliario",
    sector: "hospitalario",
    tipologia: "Hospitalaria — remodelación y ampliación",
    area: "11,000 m²",
    ubicacion: "6a Avenida 3-47, Zona 10, Ciudad de Guatemala",
    cliente: "CEMESA",
    fecha: "F1: 2002 – 2004 · F2: 2005 – 2008",
    alcance: ["F1: Emergencia, consulta externa e intensivos", "F2: Sótanos de parqueo, accesos, centro de diagnóstico y torre de encamamiento", "Diseño de mobiliario"],
    accion: ["Planificación arquitectónica", "Coordinación de ingenierías", "Supervisión general"],
    tecnica: [
      "Remodelación y ampliación de instalaciones originales de la década de 1960",
      "Plan Maestro de crecimiento y desarrollo de espacios hospitalarios",
      "Torre, accesos, plaza y parqueos subterráneos",
      "Obra ejecutada con el hospital en pleno funcionamiento"
    ],
    equipo: [
      ["Consultor médico", "Dr. Enrique Pérez Riera"],
      ["Diseño estructural", "Ings. Hermosilla y León"],
      ["Hidrosanitario y mecánico", "Ing. Gustavo Ortiz"],
      ["Diseño eléctrico", "Pretinsa"],
      ["Obra gris", "SERMASA"],
      ["Acabados y detalles", "Ing. Ricardo Brolo, Brasca"]
    ],
    descripcion: "Gestión integral de arquitectura, desarrollo de proyecto y diseño de mobiliario para infraestructura hospitalaria privada de alto nivel, ejecutada en dos fases bajo estándares médicos rigurosos.",
    imagenes: 2,
    destacado: true
  },

  /* ---------- AUTOMOTRIZ · GRUPO LOS TRES (orden cronológico) ----------
     Mientras se confirma la información técnica, estos proyectos usan
     "fichaBasica: true": solo año, cliente y ubicación (sin áreas ni alcance). */
  {
    id: "glt-showroom-volvo",
    nombre: "Showroom Volvo",
    subtitulo: "Primer proyecto con Grupo Los Tres",
    sector: "automotriz",
    grupo: "Grupo Los Tres",
    fichaBasica: true,
    ubicacion: "Boulevard Liberación, Ciudad de Guatemala",
    cliente: "Grupo Los Tres",
    fecha: "1998",
    alcance: [],
    accion: ["Diseño arquitectónico", "Dirección de proyecto", "Supervisión"],
    tecnica: ["Fachada acristalada para exhibición de vehículos"],
    descripcion: "Adaptación de la sala de ventas Volvo sobre Boulevard Liberación, primer proyecto desarrollado para Grupo Los Tres y punto de partida de una relación profesional de largo plazo.",
    fotos: ["grupo-los-tres/grupo-los-tres-1.webp"],
    destacado: false
  },
  {
    id: "glt-servicios-volvo",
    nombre: "Complejo de servicios Volvo",
    subtitulo: "Complejo Boulevard Liberación",
    sector: "automotriz",
    grupo: "Grupo Los Tres",
    fichaBasica: true,
    ubicacion: "Boulevard Liberación, Ciudad de Guatemala",
    cliente: "Grupo Los Tres",
    fecha: "",
    alcance: [],
    accion: ACCION_INTEGRAL,
    descripcion: "Habilitación de las áreas de servicio del complejo: recepción de talleres, sala de clientes, talleres de mecánica y enderezado, y oficinas administrativas.",
    fotos: ["grupo-los-tres/grupo-los-tres-3.webp"],
    destacado: false
  },
  {
    id: "glt-oficinas-apoyo",
    nombre: "Oficinas gerenciales y áreas de apoyo",
    subtitulo: "Complejo Boulevard Liberación",
    sector: "automotriz",
    grupo: "Grupo Los Tres",
    fichaBasica: true,
    ubicacion: "Boulevard Liberación, Ciudad de Guatemala",
    cliente: "Grupo Los Tres",
    fecha: "",
    alcance: [],
    accion: ACCION_INTEGRAL,
    descripcion: "Desarrollo de las áreas corporativas y de apoyo del complejo: oficinas gerenciales, cafetería para colaboradores, estacionamientos y sala de ventas de vehículos usados.",
    imagenes: 0,
    destacado: false
  },
  {
    id: "glt-showrooms-multimarca",
    nombre: "Showrooms MINI, Mahindra, Kawasaki y ZX",
    subtitulo: "Remodelaciones sobre Boulevard Liberación",
    sector: "automotriz",
    grupo: "Grupo Los Tres",
    fichaBasica: true,
    ubicacion: "Boulevard Liberación, Ciudad de Guatemala",
    cliente: "Grupo Los Tres",
    fecha: "",
    alcance: [],
    accion: ["Diseño arquitectónico", "Dirección de proyecto", "Supervisión"],
    descripcion: "Serie de remodelaciones para las marcas representadas por el grupo, adaptando cada sala de exhibición a la identidad de su marca.",
    imagenes: 0,
    destacado: false
  },
  {
    id: "glt-agencia-porsche",
    nombre: "Agencia Porsche",
    subtitulo: "Ampliación de Grupo Los Tres — nueva agencia",
    sector: "automotriz",
    grupo: "Grupo Los Tres",
    fichaBasica: true,
    ubicacion: "20 Calle, Ciudad de Guatemala",
    cliente: "Grupo Los Tres",
    fecha: "2008 – 2009",
    alcance: [],
    accion: ["Diseño arquitectónico", "Dirección de proyecto", "Construcción"],
    tecnica: ["Volumen curvo con revestimiento metálico y fachada acristalada de exhibición"],
    descripcion: "Diseño, construcción y dirección de la nueva agencia Porsche como parte de la ampliación de Grupo Los Tres: un edificio de imagen contemporánea alineado con los lineamientos de la marca.",
    fotos: ["grupo-los-tres/grupo-los-tres-2.webp"],
    destacado: false
  },
  {
    id: "glt-remodelacion-mini",
    nombre: "Remodelación MINI",
    subtitulo: "Sala de exhibición MINI — 20 Calle",
    sector: "automotriz",
    grupo: "Grupo Los Tres",
    fichaBasica: true,
    ubicacion: "20 Calle, Ciudad de Guatemala",
    cliente: "Grupo Los Tres",
    fecha: "",
    alcance: [],
    accion: ["Diseño arquitectónico", "Dirección de proyecto", "Supervisión"],
    descripcion: "Remodelación de la sala de exhibición MINI sobre la 20 Calle, adecuando el espacio a la imagen de la marca.",
    imagenes: 0,
    destacado: false
  },
  {
    id: "glt-los-proceres",
    nombre: "Grupo Los Tres Los Próceres",
    subtitulo: "Sede sobre Boulevard Los Próceres",
    sector: "automotriz",
    grupo: "Grupo Los Tres",
    fichaBasica: true,
    ubicacion: "Boulevard Los Próceres, Zona 10",
    cliente: "Grupo Los Tres",
    fecha: "2013",
    alcance: [],
    accion: ["Diseño arquitectónico", "Dirección de proyecto", "Supervisión"],
    descripcion: "Proyecto para la sede de Grupo Los Tres sobre Boulevard Los Próceres, ampliando la presencia comercial del grupo.",
    imagenes: 0,
    destacado: false
  },
  {
    id: "glt-concesionarios-interior",
    nombre: "Concesionarios en el interior de la República",
    subtitulo: "Consultoría y anteproyecto",
    sector: "automotriz",
    grupo: "Grupo Los Tres",
    fichaBasica: true,
    ubicacion: "Interior de la República de Guatemala",
    cliente: "Grupo Los Tres",
    fecha: "",
    alcance: [],
    accion: ["Consultoría", "Anteproyecto"],
    descripcion: "Consultoría y desarrollo de anteproyectos para concesionarios de Grupo Los Tres en el interior del país, como base para su expansión regional.",
    imagenes: 0,
    destacado: false
  },
  {
    id: "glt-agencia-panama",
    nombre: "Agencia Grupo Los Tres Panamá",
    subtitulo: "Colaboración internacional",
    sector: "automotriz",
    grupo: "Grupo Los Tres",
    fichaBasica: true,
    ubicacion: "Panamá",
    cliente: "Grupo Los Tres",
    fecha: "",
    alcance: [],
    accion: ["Colaboración en diseño", "Asesoría técnica"],
    descripcion: "Colaboración en el desarrollo de la agencia de Grupo Los Tres en Panamá, trasladando la experiencia adquirida en Guatemala.",
    imagenes: 0,
    destacado: false
  },
  {
    id: "glt-mini-el-salvador",
    nombre: "Agencia MINI El Salvador",
    subtitulo: "Colaboración internacional",
    sector: "automotriz",
    grupo: "Grupo Los Tres",
    fichaBasica: true,
    ubicacion: "El Salvador",
    cliente: "Grupo Los Tres",
    fecha: "",
    alcance: [],
    accion: ["Colaboración en diseño", "Asesoría técnica"],
    descripcion: "Colaboración en el desarrollo de la agencia MINI en El Salvador, aplicando la experiencia acumulada con el grupo.",
    imagenes: 0,
    destacado: false
  },
  /* ---------- FIN AUTOMOTRIZ ---------- */

  {
    id: "liceo-javier",
    nombre: "Colegio Liceo Javier",
    subtitulo: "Remodelación y habilitación de instalaciones",
    sector: "academia",
    tipologia: "Educativa",
    area: "—",
    ubicacion: "Calzada Raúl Aguilar Batres, Villa Nueva",
    cliente: "Colegio Liceo Javier",
    fecha: "2013 – Actualidad",
    alcance: ["Piscina", "Kindergarten (1,200 m², 2013 – 2014)", "Polideportivo", "Consultoría de readecuación"],
    tecnica: ["El kindergarten forma parte de una ampliación del colegio de 15,000 m²"],
    descripcion: "Relación de largo plazo con el Liceo Javier: remodelación y habilitación de piscina, kinder y polideportivo, además de consultoría para la readecuación de sus instalaciones.",
    imagenes: 5,
    destacado: true
  },
  {
    id: "las-puertas",
    nombre: "Centro Comercial Las Puertas",
    subtitulo: "Centro comercial",
    sector: "comercial",
    tipologia: "Comercial — centro comercial",
    area: "38,000 m²",
    ubicacion: "Km 25.3 Ruta Panamericana, San Lucas Sacatepéquez",
    cliente: "Grupo Portalis",
    fecha: "2010 – 2012",
    alcance: [],
    descripcion: "Centro comercial de 38,000 m² sobre la Ruta Panamericana, con plazas abiertas, locales comerciales y áreas de estacionamiento integradas al entorno de San Lucas Sacatepéquez.",
    imagenes: 4,
    destacado: false
  },
  {
    id: "unop",
    nombre: "UNOP",
    subtitulo: "Unidad Nacional de Oncología Pediátrica",
    sector: "hospitalario",
    tipologia: "Hospitalaria — ampliación y remodelación",
    area: "16,000 m²",
    ubicacion: "Hospital Nacional Roosevelt, Zona 11, Ciudad de Guatemala",
    cliente: "Fundación Ayúdame a Vivir",
    fecha: "2008 – 2010",
    alcance: ["Ampliación y remodelación"],
    descripcion: "Infraestructura hospitalaria especializada para la atención oncológica pediátrica, con espacios diseñados para el bienestar de los pacientes y sus familias.",
    imagenes: 4,
    destacado: false
  },
  {
    id: "edificio-hame",
    nombre: "Edificio HAME",
    subtitulo: "Oficinas corporativas de Agroindustria HAME",
    sector: "comercial",
    tipologia: "Oficinas corporativas",
    area: "11,000 m²",
    ubicacion: "4a Avenida 8-93, Zona 9, Ciudad de Guatemala",
    cliente: "Grupo HAME",
    fecha: "1997 – 1999",
    alcance: ["Corporativo de las empresas Olmeca, Regia y Hame"],
    accion: ["Planificación arquitectónica", "Coordinación de ingenierías", "Supervisión de arquitectura"],
    tecnica: [
      "Estructura de concreto reforzado",
      "Fachadas con elementos precolados planos y curvos, acabado de granito martelinado",
      "Planta organizada alrededor de un eje central",
      "Fachada oeste con ventanería profunda en gradiente y vegetación frontal que genera microclima"
    ],
    equipo: [
      ["Diseño estructural", "Ings. Hermosilla y León"],
      ["Diseño hidrosanitario", "Ing. Julio Santolino"],
      ["Diseño eléctrico", "Pretinsa"],
      ["Construcción", "Castañeda y Molina"]
    ],
    descripcion: "Diseño y desarrollo integral de sede corporativa para el sector agroindustrial: 11,000 m² de espacios funcionales con sistemas estructurales eficientes que reflejan la solidez de la corporación.",
    imagenes: 2,
    destacado: false
  },
  {
    id: "principe-de-asturias",
    nombre: "Polideportivo Príncipe de Asturias",
    subtitulo: "Colegio Español Príncipe de Asturias",
    sector: "academia",
    tipologia: "Deportiva — polideportivo y áreas de apoyo",
    area: "5,000 m²",
    ubicacion: "Lotificación Los Pinabetes, San José Pinula",
    cliente: "Colegio Español Príncipe de Asturias",
    fecha: "2010 – 2011",
    alcance: ["Diseño y construcción de polideportivo"],
    tecnica: ["Sistemas estructurales de gran luz para espacios libres de columnas"],
    descripcion: "Diseño y construcción de instalaciones polideportivas y piscina cubierta, con sistemas estructurales de gran luz que crean espacios amplios y libres de columnas.",
    imagenes: 4,
    destacado: false
  },
  {
    id: "edificio-el-globo",
    nombre: "Edificio El Globo",
    subtitulo: "Oficinas corporativas y comercios",
    sector: "comercial",
    tipologia: "Oficinas y comercio",
    area: "31,000 m²",
    ubicacion: "7a Avenida y 10a Calle, Zona 1, Centro Histórico",
    cliente: "El Globo S.A.",
    fecha: "1992 – 1994",
    alcance: ["Construcción en dos etapas"],
    descripcion: "Edificio de oficinas y comercios de 31,000 m² en el Centro Histórico de la Ciudad de Guatemala.",
    imagenes: 3,
    destacado: false
  },
  {
    id: "plaza-el-globo",
    nombre: "Plaza El Globo",
    subtitulo: "Oficinas corporativas y comercios",
    sector: "comercial",
    tipologia: "Oficinas y comercio",
    area: "10,500 m²",
    ubicacion: "4a Avenida y 10a Calle, Zona 10 (Zona Viva)",
    cliente: "El Globo S.A.",
    fecha: "2009 – 2010",
    alcance: [],
    descripcion: "Complejo de oficinas y comercios en la Zona Viva, con torre de reloj como elemento icónico de la plaza.",
    imagenes: 2,
    destacado: false
  },
  {
    id: "mi-super-fresh",
    nombre: "Supermercados Mi Super Fresh",
    subtitulo: "Supermercados",
    sector: "comercial",
    tipologia: "Comercial — supermercado",
    area: "8,000 m²",
    ubicacion: "San José Pinula · San Cristóbal · Zona 6",
    cliente: "Grupo CADAR S.A. — GTA Grupo de Tiendas Asociadas",
    fecha: "2014 – 2017",
    alcance: ["Sucursal San José Pinula", "Sucursal San Cristóbal", "Sucursal Martinico Zona 6 (4,000 m², 2014)"],
    descripcion: "Tres sucursales de supermercado con imagen comercial unificada y operación eficiente para el formato de proximidad.",
    imagenes: 3,
    destacado: false
  },
  {
    id: "villa-maya",
    nombre: "Hotel Villa Maya",
    subtitulo: "Villas de Guatemala",
    sector: "hoteleria",
    tipologia: "Hotelería — complejo ecoturístico",
    area: "3,900 m²",
    ubicacion: "Petenchel, Santa Elena, Petén",
    cliente: "Villas de Guatemala",
    fecha: "F1: 1989 – 1990 · F2: 2003 – 2004 · F3: 2011",
    alcance: ["Área de desarrollo: 23 manzanas", "Planes de mantenimiento y crecimiento"],
    accion: ["Planificación arquitectónica y de entorno", "Dirección", "Coordinación", "Supervisión general"],
    tecnica: [
      "Espacios integrados a bosque, flora, fauna y lagunas con el menor impacto posible",
      "Sistemas constructivos de bajo impacto ambiental",
      "Estructuras metálicas y acabados con valor semiótico"
    ],
    equipo: [
      ["Diseño estructural", "Arq. Daniel Borja — APSA"],
      ["Hidrosanitario y eléctrico", "Arq. Daniel Borja y colaboradores"],
      ["Construcción", "Arq. Marco Antonio Palacios · Arq. Daniel Borja — APSA"],
      ["Construcciones metálicas", "APSA"]
    ],
    descripcion: "Hotel en Petén desarrollado en tres fases a lo largo de dos décadas, integrado con la selva y la laguna.",
    imagenes: 3,
    destacado: false
  },
  {
    id: "villas-de-guatemala",
    nombre: "Hoteles Villas de Guatemala",
    subtitulo: "Villa Colonial · Villa Santa Catarina · Villa Caribe",
    sector: "hoteleria",
    tipologia: "Hotelería",
    area: "—",
    ubicacion: "Antigua Guatemala · Atitlán · Livingston",
    cliente: "Villas de Guatemala",
    fecha: "1988 – 1996",
    alcance: ["Villa Santa Catarina, Atitlán (1988): remodelación y habilitación", "Villa Colonial, Antigua (1993): anteproyecto", "Villa Caribe, Livingston (1996): remodelación y habilitación"],
    descripcion: "Remodelación, habilitación y anteproyectos para la cadena hotelera Villas de Guatemala en tres de los destinos turísticos más importantes del país.",
    imagenes: 3,
    credito: "© Foto: Villas de Guatemala",
    destacado: false
  },
  {
    id: "mil-flores",
    nombre: "Luxury Design Hotel Mil Flores",
    subtitulo: "Remodelación y habilitación de instalaciones",
    sector: "hoteleria",
    tipologia: "Hotel boutique",
    area: "—",
    ubicacion: "Antigua Guatemala",
    cliente: "Hotel Las Mil Flores",
    fecha: "2020 – 2022",
    alcance: ["Remodelación y habilitación de instalaciones"],
    descripcion: "Remodelación y habilitación de un hotel boutique de diseño en Antigua Guatemala, respetando el carácter del entorno colonial.",
    imagenes: 3,
    destacado: false
  },
  {
    id: "edificio-viya",
    nombre: "Edificio VIYA",
    subtitulo: "Oficinas profesionales",
    sector: "comercial",
    tipologia: "Uso mixto — residencial y oficinas",
    area: "2,000 m²",
    ubicacion: "13 Avenida 14-34, Zona 10, Oakland",
    cliente: "Viteri y Arriola",
    fecha: "2005 – 2017",
    alcance: ["Edificio de cinco niveles"],
    tecnica: [
      "Marcos de perfiles metálicos y entrepisos de losacero",
      "Forro de mampostería de ladrillo rojo expuesto y láminas de aluminio",
      "Fachada principal con trazos curvos en la estructura portante",
      "Máximo aprovechamiento del terreno dentro de la normativa municipal"
    ],
    equipo: [
      ["Diseño estructural", "Ings. Hermosilla y León"],
      ["Diseño hidrosanitario", "Gustavo Ortiz Murga"],
      ["Diseño eléctrico", "Pretinsa"],
      ["Construcción", "APSA · Castañeda y Molina"]
    ],
    descripcion: "Edificio de oficinas profesionales con fachada de ladrillo y volúmenes curvos en la zona de Oakland.",
    imagenes: 4,
    destacado: false
  }
];
