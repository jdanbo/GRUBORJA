/* =========================================================
   GRUBORJA — TARJETAS Y MODAL DE PROYECTOS
   (se usa en Inicio y Portafolio)
   Requiere que antes se cargue  data/proyectos.js
   ---------------------------------------------------------
   Funciones que expone:
   - crearTarjetaProyecto(proyecto, opciones) → <li> con la tarjeta
   - abrirModalProyecto(id, lista)            → abre galería + ficha técnica
     "lista" (opcional) = proyectos que se recorren con Anterior/Siguiente
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

/* Imagen que se usa cuando un proyecto aún no tiene fotos */
const IMAGEN_GENERICA = "assets/img/sitio/proyecto-generico.webp";

/* Lista de rutas de fotos de un proyecto
   · "fotos" (rutas dentro de assets/img/proyectos/) tiene prioridad
   · si no, se generan a partir de "imagenes"
   · si no hay ninguna, se usa la imagen genérica */
function fotosProyecto(proyecto) {
  if (proyecto.fotos && proyecto.fotos.length) {
    return proyecto.fotos.map((f) => `assets/img/proyectos/${f}`);
  }
  const lista = [];
  for (let n = 1; n <= (proyecto.imagenes || 0); n++) {
    lista.push(`assets/img/proyectos/${proyecto.id}/${proyecto.id}-${n}.webp`);
  }
  return lista.length ? lista : [IMAGEN_GENERICA];
}

/* Ruta de la foto n de un proyecto (se mantiene por compatibilidad) */
function rutaImagen(proyecto, n) {
  return fotosProyecto(proyecto)[n - 1];
}

function tieneDato(valor) {
  return valor && valor !== "—";
}

/* ---------------------------------------------------------
   TARJETA DE PROYECTO
   opciones.mono = true → foto en escala de grises (portafolio)
   opciones.lista       → proyectos para navegar dentro del modal
   --------------------------------------------------------- */
function crearTarjetaProyecto(proyecto, opciones = {}) {
  const item = document.createElement("li");
  const esGenerica = fotosProyecto(proyecto)[0] === IMAGEN_GENERICA;

  item.innerHTML = `
    <button type="button"
            class="project-card ${opciones.mono ? "project-card--mono" : ""}"
            data-project="${proyecto.id}"
            aria-haspopup="dialog"
            aria-label="Ver ficha técnica de ${proyecto.nombre}">
      <div class="project-card__media ${esGenerica ? "project-card__media--generic" : ""}">
        <img src="${rutaImagen(proyecto, 1)}" alt="" loading="lazy" decoding="async" width="1200" height="900">
        <span class="project-card__tag">${SECTORES[proyecto.sector]}</span>
        <span class="project-card__zoom">${ICONOS.mas}</span>
      </div>
      <div class="project-card__body">
        ${proyecto.grupo || tieneDato(proyecto.fecha) ? `
        <p class="project-card__kicker">
          ${proyecto.grupo ? `<span>${proyecto.grupo}</span>` : ""}
          ${tieneDato(proyecto.fecha) ? `<span>${proyecto.fecha}</span>` : ""}
        </p>` : ""}
        <h3 class="project-card__title">${proyecto.nombre}</h3>
        <p class="project-card__meta">
          <span>${ICONOS.pin}${proyecto.ubicacion}</span>
          ${tieneDato(proyecto.area) ? `<span>${ICONOS.area}${proyecto.area}</span>` : ""}
        </p>
        ${opciones.conDescripcion ? `<p class="project-card__desc">${proyecto.descripcion}</p>` : ""}
        <span class="project-card__cta">Ver ficha técnica ${ICONOS.flecha}</span>
      </div>
    </button>`;

  item.querySelector("button").addEventListener("click", () => {
    const lista = typeof opciones.lista === "function" ? opciones.lista() : opciones.lista;
    abrirModalProyecto(proyecto.id, lista);
  });

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
let fotosActuales = [];
let fotoActual = 1;
let listaModal = PROYECTOS; // proyectos que se recorren con Anterior / Siguiente

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

      <h3 class="spec__heading">Ficha técnica</h3>
      <dl class="spec__grid"></dl>

      <div class="spec__block spec__block--alcance">
        <h3 class="spec__heading">Alcance</h3>
        <ul class="spec__list spec__alcance"></ul>
      </div>

      <div class="spec__block spec__block--accion">
        <h3 class="spec__heading">Acción profesional</h3>
        <ul class="spec__chips" role="list"></ul>
      </div>

      <div class="spec__block spec__block--tecnica">
        <h3 class="spec__heading">Características técnicas</h3>
        <ul class="spec__list spec__tecnica"></ul>
      </div>

      <div class="spec__block spec__block--equipo">
        <h3 class="spec__heading">Equipo de proyecto</h3>
        <dl class="spec__team"></dl>
      </div>

      <div class="spec__block">
        <h3 class="spec__heading">Reseña</h3>
        <p class="spec__desc"></p>
      </div>

      <nav class="spec__pager" aria-label="Otros proyectos">
        <button type="button" class="spec__pager-btn spec__pager-btn--prev">
          ${ICONOS.anterior}<span><small>Anterior</small><strong></strong></span>
        </button>
        <span class="spec__pager-count"></span>
        <button type="button" class="spec__pager-btn spec__pager-btn--next">
          <span><small>Siguiente</small><strong></strong></span>${ICONOS.siguiente}
        </button>
      </nav>

      <div class="spec__actions">
        <a class="btn btn--primary" href="servicios.html">Conoce nuestros servicios ${ICONOS.flecha}</a>
      </div>
    </div>`;

  document.body.appendChild(modal);

  // --- Eventos ---
  modal.querySelector(".project-modal__close").addEventListener("click", cerrarModal);
  modal.querySelector(".gallery__nav--prev").addEventListener("click", () => mostrarFoto(fotoActual - 1));
  modal.querySelector(".gallery__nav--next").addEventListener("click", () => mostrarFoto(fotoActual + 1));
  modal.querySelector(".spec__pager-btn--prev").addEventListener("click", () => cambiarProyecto(-1));
  modal.querySelector(".spec__pager-btn--next").addEventListener("click", () => cambiarProyecto(1));

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
  const total = fotosActuales.length;
  // Da la vuelta: después de la última vuelve a la primera
  fotoActual = ((n - 1 + total) % total) + 1;

  const img = modal.querySelector(".gallery__img");
  img.src = fotosActuales[fotoActual - 1];
  img.parentElement.style.setProperty("--gallery-bg", `url("${img.src}")`);
  img.alt = `${proyectoActual.nombre} — fotografía ${fotoActual} de ${total}`;
  // Reinicia la animación de aparición
  img.style.animation = "none";
  img.offsetHeight;
  img.style.animation = "";

  modal.querySelector(".gallery__counter").textContent = total > 1 ? `${fotoActual} / ${total}` : "";
  modal.querySelectorAll(".gallery__thumb").forEach((miniatura, i) => {
    miniatura.setAttribute("aria-current", i + 1 === fotoActual ? "true" : "false");
  });
}

/* Rellena un bloque y lo oculta si no tiene datos */
function rellenarBloque(selector, items, plantilla) {
  const bloque = modal.querySelector(selector);
  const hay = items && items.length;
  bloque.hidden = !hay;
  return hay ? items.map(plantilla).join("") : "";
}

function abrirModalProyecto(id, lista) {
  const proyecto = PROYECTOS.find((p) => p.id === id);
  if (!proyecto) return;
  if (!modal) crearModal();

  proyectoActual = proyecto;
  fotosActuales = fotosProyecto(proyecto);
  if (lista && lista.length) listaModal = lista;
  if (!listaModal.includes(proyecto)) listaModal = PROYECTOS;

  // --- Encabezado ---
  modal.querySelector(".spec__sector").textContent =
    SECTORES[proyecto.sector] + (proyecto.grupo ? ` · ${proyecto.grupo}` : "");
  modal.querySelector(".spec__title").textContent = proyecto.nombre;
  modal.querySelector(".spec__subtitle").textContent = proyecto.subtitulo;
  modal.querySelector(".spec__desc").textContent = proyecto.descripcion;
  modal.querySelector(".gallery__credit").textContent = proyecto.credito || "";

  // --- Datos clave (solo los que existen) ---
  const datos = [
    ["Ubicación", proyecto.ubicacion],
    ["Área de construcción", proyecto.area],
    ["Período", proyecto.fecha],
    ["Cliente", proyecto.cliente],
    ["Tipología", proyecto.tipologia]
  ].filter(([, valor]) => tieneDato(valor));

  modal.querySelector(".spec__grid").innerHTML = datos
    .map(([etiqueta, valor]) => `<div class="spec__cell"><dt>${etiqueta}</dt><dd>${valor}</dd></div>`)
    .join("");

  // --- Bloques opcionales ---
  modal.querySelector(".spec__alcance").innerHTML =
    rellenarBloque(".spec__block--alcance", proyecto.alcance, (a) => `<li>${a}</li>`);
  modal.querySelector(".spec__chips").innerHTML =
    rellenarBloque(".spec__block--accion", proyecto.accion, (a) => `<li class="spec__chip">${a}</li>`);
  modal.querySelector(".spec__tecnica").innerHTML =
    rellenarBloque(".spec__block--tecnica", proyecto.tecnica, (t) => `<li>${t}</li>`);
  modal.querySelector(".spec__team").innerHTML =
    rellenarBloque(".spec__block--equipo", proyecto.equipo, ([rol, nombre]) => `<div class="spec__team-row"><dt>${rol}</dt><dd>${nombre}</dd></div>`);

  // --- Anterior / Siguiente ---
  const indice = listaModal.indexOf(proyecto);
  const total = listaModal.length;
  const pager = modal.querySelector(".spec__pager");
  pager.hidden = total < 2;
  if (total > 1) {
    const previo = listaModal[(indice - 1 + total) % total];
    const siguiente = listaModal[(indice + 1) % total];
    modal.querySelector(".spec__pager-btn--prev strong").textContent = previo.nombre;
    modal.querySelector(".spec__pager-btn--next strong").textContent = siguiente.nombre;
    modal.querySelector(".spec__pager-count").textContent = `${indice + 1} / ${total}`;
  }

  // --- Miniaturas ---
  const contenedorMiniaturas = modal.querySelector(".gallery__thumbs");
  contenedorMiniaturas.innerHTML = "";
  fotosActuales.forEach((ruta, i) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "gallery__thumb";
    boton.setAttribute("aria-label", `Ver fotografía ${i + 1}`);
    boton.innerHTML = `<img src="${ruta}" alt="" loading="lazy">`;
    boton.addEventListener("click", () => mostrarFoto(i + 1));
    contenedorMiniaturas.appendChild(boton);
  });

  // Oculta flechas y miniaturas si solo hay una foto
  const variasFotos = fotosActuales.length > 1;
  modal.querySelectorAll(".gallery__nav").forEach((b) => (b.hidden = !variasFotos));
  contenedorMiniaturas.hidden = !variasFotos;

  mostrarFoto(1);

  if (!modal.open) {
    modal.showModal();
    document.body.classList.add("no-scroll");
  }
  modal.querySelector(".spec").scrollTop = 0;
  modal.scrollTop = 0;

  // Guarda el proyecto en la URL (permite compartir el enlace directo)
  history.replaceState(null, "", location.pathname + location.search + "#" + proyecto.id);
}

function cambiarProyecto(paso) {
  const total = listaModal.length;
  const indice = listaModal.indexOf(proyectoActual);
  abrirModalProyecto(listaModal[(indice + paso + total) % total].id, listaModal);
}

function cerrarModal() {
  modal.close();
}

/* Si la URL trae #id-de-proyecto, abre ese proyecto
   (al cargar la página o si cambia el # sin recargar) */
function abrirDesdeURL() {
  let id = location.hash.slice(1);
  if (id === "grupo-los-tres") id = "glt-showroom-volvo"; // enlace antiguo
  if (id && PROYECTOS.some((p) => p.id === id) && !(modal && modal.open)) {
    const lista = typeof proyectosFiltrados === "function" ? proyectosFiltrados() : undefined;
    abrirModalProyecto(id, lista);
  }
}

window.addEventListener("load", abrirDesdeURL);
window.addEventListener("hashchange", abrirDesdeURL);
