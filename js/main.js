/* =========================================================
   GRUBORJA — SCRIPT GENERAL (se carga en todas las páginas)
   1. Header fijo que se compacta al hacer scroll
   2. Menú hamburguesa en móvil
   3. Animaciones de aparición al hacer scroll
   4. Contadores animados de estadísticas
   5. Carrusel infinito de clientes
   6. Año automático en el footer
   ========================================================= */

// Indica que JavaScript está activo (el CSS usa .no-js como respaldo)
document.documentElement.classList.remove("no-js");

// ¿El usuario pidió reducir animaciones en su sistema?
const prefiereMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* ---------------------------------------------------------
   1. HEADER FIJO
   --------------------------------------------------------- */
const header = document.querySelector(".site-header");

function actualizarHeader() {
  // Tras 24px de scroll el header se vuelve compacto
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

if (header) {
  actualizarHeader();
  window.addEventListener("scroll", actualizarHeader, { passive: true });
}


/* ---------------------------------------------------------
   2. MENÚ HAMBURGUESA
   --------------------------------------------------------- */
const botonMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-nav");

function abrirMenu() {
  botonMenu.setAttribute("aria-expanded", "true");
  botonMenu.setAttribute("aria-label", "Cerrar menú");
  menu.classList.add("is-open");
  document.body.classList.add("no-scroll");
}

function cerrarMenu() {
  botonMenu.setAttribute("aria-expanded", "false");
  botonMenu.setAttribute("aria-label", "Abrir menú");
  menu.classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

if (botonMenu && menu) {
  botonMenu.addEventListener("click", () => {
    const estaAbierto = botonMenu.getAttribute("aria-expanded") === "true";
    estaAbierto ? cerrarMenu() : abrirMenu();
  });

  // Cerrar al elegir un enlace
  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", cerrarMenu);
  });

  // Cerrar con la tecla Esc
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && menu.classList.contains("is-open")) {
      cerrarMenu();
      botonMenu.focus();
    }
  });

  // Si la pantalla se agranda a escritorio, cerrar el menú móvil
  window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => {
    if (e.matches) cerrarMenu();
  });
}


/* ---------------------------------------------------------
   3. APARICIÓN AL HACER SCROLL
   Todo elemento con la clase .reveal aparece suavemente
   cuando entra en pantalla.
   --------------------------------------------------------- */
const observadorReveal = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("is-visible");
      observadorReveal.unobserve(entrada.target); // solo una vez
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach((el) => observadorReveal.observe(el));


/* ---------------------------------------------------------
   4. CONTADORES ANIMADOS
   Uso en HTML:  <span data-count="700000" data-prefix="+">
   --------------------------------------------------------- */
const formatoNumero = new Intl.NumberFormat("en-US"); // 700,000 (formato usado en Guatemala)

function animarContador(elemento) {
  const final = Number(elemento.dataset.count);
  const prefijo = elemento.dataset.prefix || "";
  const sufijo = elemento.dataset.suffix || "";
  const duracion = 1800; // milisegundos
  const inicio = performance.now();

  function paso(ahora) {
    const progreso = Math.min((ahora - inicio) / duracion, 1);
    const suavizado = 1 - Math.pow(1 - progreso, 3); // desacelera al final
    const valor = Math.round(final * suavizado);
    elemento.textContent = prefijo + formatoNumero.format(valor) + sufijo;
    if (progreso < 1) requestAnimationFrame(paso);
  }

  requestAnimationFrame(paso);
}

const contadores = document.querySelectorAll("[data-count]");

if (contadores.length && !prefiereMenosMovimiento) {
  const observadorContadores = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        animarContador(entrada.target);
        observadorContadores.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.6 });

  contadores.forEach((c) => observadorContadores.observe(c));
}


/* ---------------------------------------------------------
   5. CARRUSEL DE CLIENTES
   Duplica la lista para que el movimiento sea infinito.
   La copia se oculta a lectores de pantalla.
   --------------------------------------------------------- */
const pistaClientes = document.querySelector(".clients__track");

if (pistaClientes) {
  const listaOriginal = pistaClientes.querySelector(".clients__list");

  function prepararCarrusel() {
    // Quitar copias anteriores (por si cambió el tamaño de pantalla)
    pistaClientes.querySelectorAll('.clients__list[aria-hidden="true"]').forEach((c) => c.remove());

    const anchoLista = listaOriginal.offsetWidth;
    const anchoVisible = pistaClientes.parentElement.offsetWidth;

    // Agregar copias hasta cubrir la pantalla + una lista extra
    const copiasNecesarias = Math.max(1, Math.ceil(anchoVisible / anchoLista));
    for (let i = 0; i < copiasNecesarias; i++) {
      const copia = listaOriginal.cloneNode(true);
      copia.setAttribute("aria-hidden", "true");
      pistaClientes.appendChild(copia);
    }

    // La animación se desplaza exactamente el ancho de UNA lista
    pistaClientes.style.setProperty("--list-w", anchoLista + "px");
    // Velocidad constante sin importar cuántos clientes haya (~40px por segundo)
    pistaClientes.style.animationDuration = (anchoLista / 40) + "s";
  }

  // Esperar a que cargue la fuente para medir bien los anchos
  document.fonts.ready.then(prepararCarrusel);

  let temporizador;
  window.addEventListener("resize", () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(prepararCarrusel, 250);
  });
}


/* ---------------------------------------------------------
   6. AÑO EN EL FOOTER
   --------------------------------------------------------- */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
