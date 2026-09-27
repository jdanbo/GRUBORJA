/* =========================================================
   GRUBORJA — PÁGINA NOSOTROS
   1. Parallax suave en la foto histórica
   2. Isotipo que se dibuja con el scroll
   3. Modales de perfil del equipo (<dialog> nativo)
   Todo respeta "reducir movimiento" del sistema.
   ========================================================= */

(() => {
  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const limitar = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  // Convierte el progreso general (0→1) en el progreso de un tramo [desde, hasta]
  const tramo = (p, desde, hasta) => limitar((p - desde) / (hasta - desde));


  /* -------------------------------------------------------
     1 y 2. EFECTOS LIGADOS AL SCROLL
     ------------------------------------------------------- */
  const parallax = document.querySelector("[data-parallax] img");
  const logo = document.querySelector("[data-logo-draw]");

  function actualizarScroll() {
    const alto = window.innerHeight;

    // Parallax: la foto se mueve ~8% más lento que el texto
    if (parallax) {
      const r = parallax.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < alto) {
        const centro = r.top + r.height / 2 - alto / 2;
        parallax.style.transform = `translate3d(0, ${centro * -0.08}px, 0)`;
      }
    }

    // Logo: 0 cuando entra por abajo, 1 cuando llega a ~40% de la pantalla
    if (logo) {
      const r = logo.getBoundingClientRect();
      const p = limitar((alto - r.top) / (alto * 0.6 + r.height * 0.4));
      logo.style.setProperty("--draw", 1 - tramo(p, 0, 0.6));
      logo.style.setProperty("--draw2", 1 - tramo(p, 0.2, 0.8));
      logo.style.setProperty("--punto", tramo(p, 0.7, 0.9));
      logo.style.setProperty("--marca", tramo(p, 0.8, 1));
    }
  }

  if (!menosMovimiento && (parallax || logo)) {
    let pendiente = false;
    const alHacerScroll = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        actualizarScroll();
        pendiente = false;
      });
    };
    actualizarScroll();
    window.addEventListener("scroll", alHacerScroll, { passive: true });
    window.addEventListener("resize", alHacerScroll);
  }


  /* -------------------------------------------------------
     3. MODALES DE PERFIL
     ------------------------------------------------------- */
  document.querySelectorAll("[data-perfil]").forEach((boton) => {
    const modal = document.getElementById(boton.dataset.perfil);
    if (!modal || typeof modal.showModal !== "function") return;

    boton.addEventListener("click", () => {
      modal.showModal();
      document.body.classList.add("perfil-abierto");
    });

    // Botón cerrar
    modal.querySelector("[data-cerrar]")?.addEventListener("click", () => modal.close());

    // Clic en el fondo oscuro (fuera de la ventana) cierra el modal
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });

    // Al cerrar (también con Esc): restaurar scroll y foco
    modal.addEventListener("close", () => {
      document.body.classList.remove("perfil-abierto");
      boton.focus();
    });
  });
})();
