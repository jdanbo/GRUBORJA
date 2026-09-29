/* =========================================================
   GRUBORJA — PÁGINA DE SERVICIOS
   Navegador de fases: marca la fase que está en pantalla.
   ========================================================= */

const enlacesFase = document.querySelectorAll(".fases-nav__link");

if ("IntersectionObserver" in window && enlacesFase.length) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      enlacesFase.forEach((enlace) => {
        enlace.classList.toggle("is-active", enlace.hash === "#" + entrada.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  document.querySelectorAll(".fase").forEach((fase) => observador.observe(fase));
}
