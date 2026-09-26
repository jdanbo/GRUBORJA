/* =========================================================
   GRUBORJA — BASE DE DATOS DE PROYECTOS
   ---------------------------------------------------------
   Fuente: "FULL_Portfolio_0822" (ficha técnica de cada obra).

   ¿CÓMO AGREGAR UN PROYECTO NUEVO?
   1. Copia las fotos en  assets/img/proyectos/
      con el nombre  <id>-1.webp, <id>-2.webp, ...
   2. Copia un bloque { ... } de abajo, pégalo y cambia los datos.
   3. "imagenes" = cuántas fotos tiene (1, 2, 3...).
   4. "destacado: true" lo muestra también en la página de Inicio.
   No hay que tocar HTML: el portafolio se arma solo.

   Sectores válidos (deben coincidir con los filtros):
   comercial | corporativo | automotriz | hoteleria | hospitalario | academia
   ========================================================= */

const SECTORES = {
  comercial: "Comercial e Industria",
  corporativo: "Corporativo",
  automotriz: "Automotriz",
  hoteleria: "Hotelería",
  hospitalario: "Hospitalario",
  academia: "Academia"
};

const PROYECTOS = [
  {
    id: "hilton-guatemala",
    nombre: "Hilton Guatemala City",
    subtitulo: "Hotel Quinta Real, actualmente Hilton Guatemala City",
    sector: "hoteleria",
    area: "36,000 m²",
    ubicacion: "Km 8.5 Carretera a El Salvador",
    cliente: "Profesionales en Turismo",
    fecha: "1995 – 1997",
    alcance: ["En colaboración con Elias & Elias"],
    descripcion: "Coordinación e integración de un proyecto icónico para la ciudad, que combina escala monumental con acabados de alto nivel, áreas públicas y un diseño estructural pensado para el turismo de clase mundial.",
    imagenes: 2,
    destacado: false
  },
  {
    id: "casa-botran",
    nombre: "Casa Botrán",
    subtitulo: "Centro de Añejamiento y Distribución",
    sector: "comercial",
    area: "90,000 m²",
    ubicacion: "La Esperanza, Quetzaltenango",
    cliente: "Licores de Guatemala",
    fecha: "2010 – 2011",
    alcance: ["Edificaciones: 40,000 m²", "Urbanización: 50,000 m²"],
    descripcion: "Gestión de un macroproyecto que integró 40,000 m² de naves industriales de añejamiento y 50,000 m² de urbanización. Una muestra de nuestra capacidad operativa en infraestructura industrial a gran escala.",
    imagenes: 4,
    destacado: true
  },
  {
    id: "suma",
    nombre: "Supermercados Mayoristas SUMA",
    subtitulo: "Red de sucursales a nivel nacional",
    sector: "comercial",
    area: "40,000 m²",
    ubicacion: "8 sucursales en Guatemala",
    cliente: "Grupo CADAR S.A. — GTA Grupo de Tiendas Asociadas",
    fecha: "2012 – Actualidad",
    alcance: ["Escuintla", "Chimaltenango", "Mazatenango", "Cobán", "Naranjo", "Quetzaltenango", "Huehuetenango", "Petén"],
    descripcion: "Desarrollo continuo de la red de supermercados mayoristas SUMA en el interior del país: ocho sucursales proyectadas y ejecutadas con un estándar constructivo replicable.",
    imagenes: 6,
    destacado: false
  },
  {
    id: "centro-medico",
    nombre: "Hospital Centro Médico",
    subtitulo: "Arquitectura, gestión de proyecto y diseño de mobiliario",
    sector: "hospitalario",
    area: "11,000 m²",
    ubicacion: "6a Avenida, Zona 10, Ciudad de Guatemala",
    cliente: "CEMESA",
    fecha: "F1: 2002 – 2004 · F2: 2005 – 2008",
    alcance: ["Arquitectura", "Gestión de proyecto", "Diseño de mobiliario"],
    descripcion: "Gestión integral de arquitectura, desarrollo de proyecto y diseño de mobiliario para infraestructura hospitalaria privada de alto nivel, ejecutada en dos fases bajo estándares médicos rigurosos.",
    imagenes: 2,
    destacado: true
  },
  {
    id: "grupo-los-tres",
    nombre: "Showrooms Porsche, Volvo y MINI",
    subtitulo: "Grupo Los Tres — Showroom, talleres y oficinas",
    sector: "automotriz",
    area: "8,500 m²",
    ubicacion: "Boulevard Liberación, Ciudad de Guatemala",
    cliente: "Grupo Los Tres S.A.",
    fecha: "2007 – 2015",
    alcance: ["F1. Showroom Volvo", "F2. Central + Talleres", "F3. Agencia Porsche", "F4. Showroom MINI", "F5. Showroom Mahindra", "F6. Agencia Panamá", "F7. Agencia El Salvador"],
    descripcion: "Ejecución integral de arquitectura comercial y diseño estructural en siete fases: showrooms, talleres y agencias que cumplen los estándares globales de marcas automotrices europeas.",
    imagenes: 3,
    destacado: false
  },
  {
    id: "liceo-javier",
    nombre: "Colegio Liceo Javier",
    subtitulo: "Remodelación y habilitación de instalaciones",
    sector: "academia",
    area: "—",
    ubicacion: "Calzada Raúl Aguilar Batres, Villa Nueva",
    cliente: "Colegio Liceo Javier",
    fecha: "2013 – Actualidad",
    alcance: ["Piscina", "Kinder", "Polideportivo", "Consultoría de readecuación"],
    descripcion: "Relación de largo plazo con el Liceo Javier: remodelación y habilitación de piscina, kinder y polideportivo, además de consultoría para la readecuación de sus instalaciones.",
    imagenes: 5,
    destacado: true
  },
  {
    id: "las-puertas",
    nombre: "Centro Comercial Las Puertas",
    subtitulo: "Centro comercial",
    sector: "comercial",
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
    area: "16,000 m²",
    ubicacion: "Hospital Nacional Roosevelt, Zona 11, Ciudad de Guatemala",
    cliente: "Fundación Ayúdame a Vivir",
    fecha: "2008 – 2010",
    alcance: [],
    descripcion: "Infraestructura hospitalaria especializada para la atención oncológica pediátrica, con espacios diseñados para el bienestar de los pacientes y sus familias.",
    imagenes: 4,
    destacado: false
  },
  {
    id: "edificio-hame",
    nombre: "Edificio HAME",
    subtitulo: "Oficinas corporativas de Agroindustria HAME",
    sector: "corporativo",
    area: "11,000 m²",
    ubicacion: "4a Avenida, Zona 9, Ciudad de Guatemala",
    cliente: "Grupo HAME",
    fecha: "1997 – 1999",
    alcance: [],
    descripcion: "Diseño y desarrollo integral de sede corporativa para el sector agroindustrial: 11,000 m² de espacios funcionales con sistemas estructurales eficientes que reflejan la solidez de la corporación.",
    imagenes: 2,
    destacado: false
  },
  {
    id: "principe-de-asturias",
    nombre: "Polideportivo Príncipe de Asturias",
    subtitulo: "Colegio Español Príncipe de Asturias",
    sector: "academia",
    area: "5,000 m²",
    ubicacion: "Carretera a San José Pinula",
    cliente: "Colegio Español Príncipe de Asturias",
    fecha: "2010 – 2011",
    alcance: ["Diseño y construcción de polideportivo"],
    descripcion: "Diseño y construcción de instalaciones polideportivas y piscina cubierta, con sistemas estructurales de gran luz que crean espacios amplios y libres de columnas.",
    imagenes: 4,
    destacado: false
  },
  {
    id: "edificio-el-globo",
    nombre: "Edificio El Globo",
    subtitulo: "Oficinas corporativas y comercios",
    sector: "corporativo",
    area: "31,000 m²",
    ubicacion: "7a Avenida y 10a Calle, Zona 1, Centro Histórico",
    cliente: "El Globo S.A.",
    fecha: "1992 – 1994",
    alcance: [],
    descripcion: "Edificio de oficinas y comercios de 31,000 m² en el Centro Histórico de la Ciudad de Guatemala.",
    imagenes: 3,
    destacado: false
  },
  {
    id: "plaza-el-globo",
    nombre: "Plaza El Globo",
    subtitulo: "Oficinas corporativas y comercios",
    sector: "corporativo",
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
    area: "8,000 m²",
    ubicacion: "San José Pinula · San Cristóbal · Zona 6",
    cliente: "Grupo CADAR S.A. — GTA Grupo de Tiendas Asociadas",
    fecha: "2014 – 2017",
    alcance: ["Sucursal San José Pinula", "Sucursal San Cristóbal", "Sucursal Martinico Zona 6"],
    descripcion: "Tres sucursales de supermercado con imagen comercial unificada y operación eficiente para el formato de proximidad.",
    imagenes: 3,
    destacado: false
  },
  {
    id: "villa-maya",
    nombre: "Hotel Villa Maya",
    subtitulo: "Villas de Guatemala",
    sector: "hoteleria",
    area: "3,900 m²",
    ubicacion: "Santa Elena, Petén",
    cliente: "Villas de Guatemala",
    fecha: "F1: 1989 – 1990 · F2: 2003 – 2004 · F3: 2011",
    alcance: [],
    descripcion: "Hotel en Petén desarrollado en tres fases a lo largo de dos décadas, integrado con la selva y la laguna.",
    imagenes: 3,
    destacado: false
  },
  {
    id: "villas-de-guatemala",
    nombre: "Hoteles Villas de Guatemala",
    subtitulo: "Villa Colonial · Villa Santa Catarina · Villa Caribe",
    sector: "hoteleria",
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
    sector: "corporativo",
    area: "2,000 m²",
    ubicacion: "Oakland, Zona 10, Ciudad de Guatemala",
    cliente: "Viteri y Arriola",
    fecha: "2005 – 2017",
    alcance: [],
    descripcion: "Edificio de oficinas profesionales con fachada de ladrillo y volúmenes curvos en la zona de Oakland.",
    imagenes: 4,
    destacado: false
  }
];
