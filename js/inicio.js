/* =========================================================
   GRUBORJA — PÁGINA DE INICIO
   Muestra los proyectos marcados con  destacado: true
   en data/proyectos.js
   ========================================================= */

const contenedorDestacados = document.querySelector("#destacados-grid");

if (contenedorDestacados) {
  PROYECTOS
    .filter((proyecto) => proyecto.destacado)
    .slice(0, 3) // máximo 3 para mantener la fila completa
    .forEach((proyecto) => {
      contenedorDestacados.appendChild(crearTarjetaProyecto(proyecto));
    });
}
