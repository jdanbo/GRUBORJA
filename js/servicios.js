/* =========================================================
   GRUBORJA — PÁGINA DE SERVICIOS
   Acordeón "Ver detalles técnicos" en cada tarjeta.
   ========================================================= */

document.querySelectorAll(".accordion__btn").forEach((boton) => {
  const panel = document.getElementById(boton.getAttribute("aria-controls"));
  const texto = boton.querySelector(".accordion__label");

  boton.addEventListener("click", () => {
    const abierto = boton.getAttribute("aria-expanded") === "true";

    boton.setAttribute("aria-expanded", String(!abierto));
    panel.classList.toggle("is-open", !abierto);
    // "inert" evita que el teclado entre al panel cuando está cerrado
    panel.inert = abierto;
    texto.textContent = abierto ? "Ver detalles técnicos" : "Ocultar detalles";
  });
});

/* Si se llega con un ancla (servicios.html#gestion), abre ese detalle */
window.addEventListener("load", () => {
  const destino = location.hash && document.querySelector(location.hash);
  const boton = destino && destino.querySelector(".accordion__btn");
  if (boton) boton.click();
});
