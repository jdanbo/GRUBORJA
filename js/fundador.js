/* ==========================================================
   GRUBORJA · Página del fundador
   JavaScript vanilla, sin dependencias.
   1. Menú móvil
   2. Índice de láminas: marca el capítulo visible
   3. Año actual en el pie de página
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Menú móvil ---------- */
  const nav = document.querySelector(".nav");
  const botonMenu = document.querySelector(".nav__boton");

  if (nav && botonMenu) {
    botonMenu.addEventListener("click", function () {
      const abierto = nav.classList.toggle("abierto");
      botonMenu.setAttribute("aria-expanded", abierto ? "true" : "false");
    });

    // Cierra el menú al elegir un enlace
    nav.querySelectorAll(".nav__menu a").forEach(function (enlace) {
      enlace.addEventListener("click", function () {
        nav.classList.remove("abierto");
        botonMenu.setAttribute("aria-expanded", "false");
      });
    });
  }


  /* ---------- 2. Índice de láminas ---------- */
  const enlacesIndice = document.querySelectorAll(".indice a");
  const laminas = document.querySelectorAll(".lamina[id]");

  function marcarLamina(id) {
    enlacesIndice.forEach(function (enlace) {
      const activo = enlace.getAttribute("href") === "#" + id;
      if (activo) {
        enlace.setAttribute("aria-current", "true");
      } else {
        enlace.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && enlacesIndice.length) {
    // Se considera "visible" la lámina que cruza la franja central de la pantalla
    const observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          marcarLamina(entrada.target.id);
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    laminas.forEach(function (lamina) {
      observador.observe(lamina);
    });
  }


  /* ---------- 3. Año actual ---------- */
  const anio = document.getElementById("anio-actual");
  if (anio) anio.textContent = new Date().getFullYear();

});
