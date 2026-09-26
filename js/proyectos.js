/* =========================================================
   GRUBORJA — TARJETAS Y MODAL DE PROYECTOS
   (se usa en Inicio y Portafolio)
   Requiere que antes se cargue  data/proyectos.js
   ---------------------------------------------------------
   Funciones que expone:
   - crearTarjetaProyecto(proyecto, opciones) → <li> con la tarjeta
   - abrirModalProyecto(id)                   → abre galería + ficha
   ========================================================= */

/* ---------- Iconos SVG reutilizables (trazo de 1.5px) ---------- */
const ICONOS = {
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  area: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 20V4l16 16H4Z"/><path d="M8 16v-3.5L11.5 16H8Z"/></svg>',
  flecha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  mas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  cerrar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  anterior: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  siguiente: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
};

/* Ruta de la foto n de un proyecto */
function rutaImagen(proyecto, n) {
  return `assets/img/proyectos/${proyecto.id}-${n}.webp`;
}

/* ---------------------------------------------------------
   TARJETA DE PROYECTO
   opciones.mono = true → foto en escala de grises (portafolio)
   --------------------------------------------------------- */
function crearTarjetaProyecto(proyecto, opciones = {}) {
  const item = document.createElement("li");

  // El área solo se muestra si existe el dato
  const tieneArea = proyecto.area && proyecto.area !== "—";

  item.innerHTML = `
    <button type="button"
            class="project-card ${opciones.mono ? "project-card--mono" : ""}"
            data-project="${proyecto.id}"
            aria-haspopup="dialog"
            aria-label="Ver detalles de ${proyecto.nombre}">
      <div class="project-card__media">
        <img src="${rutaImagen(proyecto, 1)}" alt="" loading="lazy" decoding="async" width="1200" height="900">
        <span class="project-card__tag">${SECTORES[proyecto.sector]}</span>
        <span class="project-card__zoom">${ICONOS.mas}</span>
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${proyecto.nombre}</h3>
        <p class="project-card__meta">
          <span>${ICONOS.pin}${proyecto.ubicacion}</span>
          ${tieneArea ? `<span>${ICONOS.area}${proyecto.area}</span>` : ""}
        </p>
        ${opciones.conDescripcion ? `<p class="project-card__desc">${proyecto.descripcion}</p>` : ""}
        <span class="project-card__cta">Ver detalles ${ICONOS.flecha}</span>
      </div>
    </button>`;

  item.querySelector("button").addEventListener("click", () => abrirModalProyecto(proyecto.id));

  // En pantallas táctiles la foto se colorea al entrar en pantalla
  if (opciones.mono) observadorColor.observe(item.querySelector(".project-card"));

  return item;
}

/* Observador para colorear fotos en táctiles (no hay hover) */
const observadorColor = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    entrada.target.classList.toggle("is-colored", entrada.intersectionRatio > 0.6);
  });
}, { threshold: [0, 0.6, 1] });


/* ---------------------------------------------------------
   MODAL: GALERÍA + FICHA TÉCNICA
   Se crea una sola vez y se reutiliza para cada proyecto.
   --------------------------------------------------------- */
let modal = null;
let proyectoActual = null;
let fotoActual = 1;

function crearModal() {
  modal = document.createElement("dialog");
  modal.className = "project-modal";
  modal.setAttribute("aria-labelledby", "modal-titulo");

  modal.innerHTML = `
    <button type="button" class="project-modal__close" aria-label="Cerrar">${ICONOS.cerrar}</button>

    <div class="gallery">
      <div class="gallery__stage">
        <img class="gallery__img" src="" alt="">
        <button type="button" class="gallery__nav gallery__nav--prev" aria-label="Foto anterior">${ICONOS.anterior}</button>
        <button type="button" class="gallery__nav gallery__nav--next" aria-label="Foto siguiente">${ICONOS.siguiente}</button>
        <span class="gallery__counter" aria-live="polite"></span>
        <span class="gallery__credit"></span>
      </div>
      <div class="gallery__thumbs" role="group" aria-label="Miniaturas"></div>
    </div>

    <div class="spec">
      <p class="spec__sector"></p>
      <h2 class="spec__title" id="modal-titulo"></h2>
      <p class="spec__subtitle"></p>
      <p class="spec__desc"></p>
      <dl class="spec__table"></dl>
      <div class="spec__actions">
        <a class="btn btn--primary" href="servicios.html">Conoce nuestros servicios ${ICONOS.flecha}</a>
      </div>
    </div>`;

  document.body.appendChild(modal);

  // --- Eventos ---
  modal.querySelector(".project-modal__close").addEventListener("click", cerrarModal);
  modal.querySelector(".gallery__nav--prev").addEventListener("click", () => mostrarFoto(fotoActual - 1));
  modal.querySelector(".gallery__nav--next").addEventListener("click", () => mostrarFoto(fotoActual + 1));

  // Clic en el fondo oscuro cierra el modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
  });

  // Flechas del teclado cambian de foto
  modal.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mostrarFoto(fotoActual - 1);
    if (e.key === "ArrowRight") mostrarFoto(fotoActual + 1);
  });

  // Deslizar con el dedo en móvil
  let inicioX = 0;
  const escenario = modal.querySelector(".gallery__stage");
  escenario.addEventListener("touchstart", (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
  escenario.addEventListener("touchend", (e) => {
    const diferencia = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(diferencia) > 50) mostrarFoto(fotoActual + (diferencia < 0 ? 1 : -1));
  });

  // Al cerrar (incluye tecla Esc) se libera el scroll
  modal.addEventListener("close", () => {
    document.body.classList.remove("no-scroll");
    // Quita el #proyecto de la URL sin recargar
    history.replaceState(null, "", location.pathname + location.search);
  });
}

function mostrarFoto(n) {
  const total = proyectoActual.imagenes;
  // Da la vuelta: después de la última vuelve a la primera
  fotoActual = ((n - 1 + total) % total) + 1;

  const img = modal.querySelector(".gallery__img");
  img.src = rutaImagen(proyectoActual, fotoActual);
  img.alt = `${proyectoActual.nombre} — fotografía ${fotoActual} de ${total}`;
  // Reinicia la animación de aparición
  img.style.animation = "none";
  img.offsetHeight;
  img.style.animation = "";

  modal.querySelector(".gallery__counter").textContent = `${fotoActual} / ${total}`;
  modal.querySelectorAll(".gallery__thumb").forEach((miniatura, i) => {
    miniatura.setAttribute("aria-current", i + 1 === fotoActual ? "true" : "false");
  });
}

function abrirModalProyecto(id) {
  const proyecto = PROYECTOS.find((p) => p.id === id);
  if (!proyecto) return;
  if (!modal) crearModal();

  proyectoActual = proyecto;

  // --- Textos ---
  modal.querySelector(".spec__sector").textContent = SECTORES[proyecto.sector];
  modal.querySelector(".spec__title").textContent = proyecto.nombre;
  modal.querySelector(".spec__subtitle").textContent = proyecto.subtitulo;
  modal.querySelector(".spec__desc").textContent = proyecto.descripcion;
  modal.querySelector(".gallery__credit").textContent = proyecto.credito || "";

  // --- Ficha técnica (solo filas con datos) ---
  const filas = [
    ["Área", proyecto.area !== "—" ? proyecto.area : ""],
    ["Ubicación", proyecto.ubicacion],
    ["Cliente", proyecto.cliente],
    ["Fecha", proyecto.fecha],
    ["Alcance", proyecto.alcance.length ? `<ul>${proyecto.alcance.map((a) => `<li>${a}</li>`).join("")}</ul>` : ""]
  ];

  modal.querySelector(".spec__table").innerHTML = filas
    .filter(([, valor]) => valor)
    .map(([etiqueta, valor]) => `<div class="spec__row"><dt>${etiqueta}</dt><dd>${valor}</dd></div>`)
    .join("");

  // --- Miniaturas ---
  const contenedorMiniaturas = modal.querySelector(".gallery__thumbs");
  contenedorMiniaturas.innerHTML = "";
  for (let n = 1; n <= proyecto.imagenes; n++) {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "gallery__thumb";
    boton.setAttribute("aria-label", `Ver fotografía ${n}`);
    boton.innerHTML = `<img src="${rutaImagen(proyecto, n)}" alt="" loading="lazy">`;
    boton.addEventListener("click", () => mostrarFoto(n));
    contenedorMiniaturas.appendChild(boton);
  }

  // Oculta flechas y miniaturas si solo hay una foto
  const variasFotos = proyecto.imagenes > 1;
  modal.querySelectorAll(".gallery__nav").forEach((b) => (b.hidden = !variasFotos));
  contenedorMiniaturas.hidden = !variasFotos;

  mostrarFoto(1);

  modal.showModal();
  modal.querySelector(".spec").scrollTop = 0;
  modal.scrollTop = 0;
  document.body.classList.add("no-scroll");

  // Guarda el proyecto en la URL (permite compartir el enlace directo)
  history.replaceState(null, "", "#" + proyecto.id);
}

function cerrarModal() {
  modal.close();
}

/* Si la URL trae #id-de-proyecto, abre ese proyecto
   (al cargar la página o si cambia el # sin recargar) */
function abrirDesdeURL() {
  const id = location.hash.slice(1);
  if (id && PROYECTOS.some((p) => p.id === id) && !(modal && modal.open)) {
    abrirModalProyecto(id);
  }
}

window.addEventListener("load", abrirDesdeURL);
window.addEventListener("hashchange", abrirDesdeURL);
