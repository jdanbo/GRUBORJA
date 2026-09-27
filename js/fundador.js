/* ==========================================================
   GRUBORJA · Página del fundador
   JavaScript vanilla, sin dependencias.
   Índice de láminas: marca el capítulo visible.
   (El menú, el header y el año del footer los maneja js/main.js)
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- Índice de láminas ---------- */
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


});
