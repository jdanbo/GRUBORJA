/* =========================================================
   GRUBORJA — PÁGINA DE PORTAFOLIO
   1. Crea los botones de filtro por sector (con contador)
   2. Muestra los proyectos por bloques ("Cargar más")
   3. Recuerda el filtro en la URL:  portafolio.html?sector=hoteleria
   ========================================================= */

const POR_BLOQUE = 6; // proyectos que se agregan en cada carga

const grid = document.querySelector("#portafolio-grid");
const listaFiltros = document.querySelector("#filtros");
const botonCargarMas = document.querySelector("#cargar-mas");
const barraProgreso = document.querySelector(".load-more__bar");
const textoProgreso = document.querySelector(".load-more__text");
const infoResultados = document.querySelector("#resultados");

let sectorActivo = "todo";
let mostrados = 0;

/* Proyectos del sector activo */
function proyectosFiltrados() {
  if (sectorActivo === "todo") return PROYECTOS;
  return PROYECTOS.filter((p) => p.sector === sectorActivo);
}

/* ---------- 1. Filtros ---------- */
function crearFiltros() {
  const opciones = [["todo", "Todo"], ...Object.entries(SECTORES)];

  opciones.forEach(([clave, nombre]) => {
    const cantidad = clave === "todo"
      ? PROYECTOS.length
      : PROYECTOS.filter((p) => p.sector === clave).length;

    if (cantidad === 0) return; // no mostrar sectores vacíos

    const item = document.createElement("li");
    item.innerHTML = `
      <button type="button" class="filter-pill" data-sector="${clave}" aria-pressed="${clave === sectorActivo}">
        ${nombre} <span class="filter-pill__count">${cantidad}</span>
      </button>`;
    item.querySelector("button").addEventListener("click", () => cambiarSector(clave));
    listaFiltros.appendChild(item);
  });
}

function cambiarSector(clave) {
  sectorActivo = clave;

  listaFiltros.querySelectorAll(".filter-pill").forEach((boton) => {
    boton.setAttribute("aria-pressed", boton.dataset.sector === clave);
  });

  // Actualiza la URL sin recargar la página
  const url = clave === "todo" ? location.pathname : `${location.pathname}?sector=${clave}`;
  history.replaceState(null, "", url);

  // Reinicia la cuadrícula
  grid.innerHTML = "";
  mostrados = 0;
  cargarBloque();
}

/* ---------- 2. Cargar por bloques ---------- */
function cargarBloque() {
  const lista = proyectosFiltrados();
  const siguientes = lista.slice(mostrados, mostrados + POR_BLOQUE);

  siguientes.forEach((proyecto, i) => {
    const tarjeta = crearTarjetaProyecto(proyecto, { mono: true, conDescripcion: true });
    // Escalonar la animación de entrada de cada tarjeta
    tarjeta.style.animationDelay = `${i * 70}ms`;
    grid.appendChild(tarjeta);
  });

  // Tras "Cargar más", mover el foco a la primera tarjeta nueva (accesibilidad)
  if (mostrados > 0 && siguientes.length) {
    grid.children[mostrados].querySelector("button").focus({ preventScroll: true });
  }

  mostrados += siguientes.length;
  actualizarProgreso(lista.length);
}

function actualizarProgreso(total) {
  infoResultados.innerHTML = `Mostrando <strong>${mostrados}</strong> de <strong>${total}</strong> proyectos`;
  barraProgreso.style.width = `${(mostrados / total) * 100}%`;
  textoProgreso.textContent = `${mostrados} de ${total}`;
  // El botón desaparece cuando ya no hay más proyectos
  botonCargarMas.hidden = mostrados >= total;
}

/* ---------- Inicio ---------- */
if (grid) {
  // Lee el filtro de la URL si existe (?sector=academia)
  const sectorURL = new URLSearchParams(location.search).get("sector");
  if (sectorURL && SECTORES[sectorURL]) sectorActivo = sectorURL;

  crearFiltros();
  cargarBloque();
  botonCargarMas.addEventListener("click", cargarBloque);
}
