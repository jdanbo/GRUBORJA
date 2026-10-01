/* =========================================================
   GRUBORJA — PÁGINA DE CONTACTO
   1. Configuración (a dónde llega el formulario, coordenadas)
   2. Validación en tiempo real con la API nativa de HTML5
   3. Envío sin recargar la página + modal de confirmación
   4. Mapa con Leaflet (se descarga solo al acercarse a él)
   ========================================================= */


/* ---------------------------------------------------------
   1. CONFIGURACIÓN — lo único que normalmente hay que editar
   --------------------------------------------------------- */
const CONFIG = {
  // FormSubmit (gratis, sin cuenta) reenvía cada solicitud a este correo.
  // IMPORTANTE: la primera vez que se envíe el formulario desde el sitio
  // publicado, FormSubmit manda un correo de activación a esta dirección.
  // Hay que abrirlo y presionar "Activate Form" una sola vez.
  endpoint: "https://formsubmit.co/ajax/infogrupoborja@gmail.com",
  correo: "infogrupoborja@gmail.com",
  asunto: "Nueva solicitud técnica desde el sitio web",

  // Zona aproximada (alrededores del Centro Histórico, Zona 1).
  // A propósito NO es la dirección exacta de la oficina: el mapa solo
  // muestra un círculo morado sobre el área general.
  zona: [14.6420, -90.5135],
  radio: 1200,  // metros
  zoom: 14,
};

// Si abres el archivo con doble clic (file://) el envío real no puede
// funcionar, así que se simula un envío exitoso para probar el diseño.
const MODO_PRUEBA = location.protocol === "file:";


/* ---------------------------------------------------------
   2. VALIDACIÓN EN TIEMPO REAL
   Las reglas viven en el HTML (required, type="email",
   minlength, pattern). Aquí solo traducimos los mensajes
   y decidimos CUÁNDO mostrarlos:
   - Al salir del campo (blur) por primera vez.
   - Mientras escribes, solo si ese campo ya fue revisado,
     para que el error desaparezca en cuanto lo corriges.
   --------------------------------------------------------- */
const form = document.getElementById("form-contacto");

const MENSAJES = {
  nombre: {
    valueMissing: "Escribe tu nombre.",
    tooShort: "Escribe tu nombre completo.",
  },
  email: {
    valueMissing: "Necesitamos tu correo para responderte.",
    typeMismatch: "Revisa el formato: nombre@empresa.com",
    patternMismatch: "Revisa el formato: nombre@empresa.com",
  },
  mensaje: {
    valueMissing: "Cuéntanos brevemente sobre tu proyecto.",
    tooShort: "Agrega un poco más de detalle (mínimo 20 caracteres).",
  },
};

// Devuelve el mensaje de error del campo, o "" si es válido
function mensajeDeError(campo) {
  const estado = campo.validity;
  if (estado.valid) return "";

  if (estado.customError) return campo.validationMessage; // texto corto (ver validar)

  const textos = MENSAJES[campo.name] || {};
  for (const tipo in textos) {
    if (estado[tipo]) return textos[tipo];
  }
  return campo.validationMessage; // respaldo: mensaje del navegador
}

// Muestra u oculta el error de un campo. Devuelve true si es válido.
function validar(campo) {
  // minlength nativo solo se activa al teclear; lo reforzamos para que
  // también cuente con texto pegado o autocompletado.
  campo.setCustomValidity("");
  const largo = campo.value.trim().length;
  if (campo.minLength > 0 && largo > 0 && largo < campo.minLength) {
    campo.setCustomValidity((MENSAJES[campo.name] || {}).tooShort || "Texto muy corto.");
  }

  const texto = mensajeDeError(campo);
  const cajaError = document.getElementById(campo.getAttribute("aria-describedby"));

  campo.setAttribute("aria-invalid", texto ? "true" : "false");
  if (cajaError) cajaError.textContent = texto;
  return !texto;
}

function marcarRevisado(campo) {
  campo.closest(".campo").classList.add("is-touched");
}

if (form) {
  const camposObligatorios = form.querySelectorAll("[required]");

  camposObligatorios.forEach((campo) => {
    campo.addEventListener("blur", () => {
      // Quita espacios sobrantes (un nombre de solo espacios no es válido)
      if (campo.type !== "textarea") campo.value = campo.value.trim();

      // No regañar a quien solo pasó por el campo sin escribir nada
      if (campo.value === "" && !campo.closest(".campo").classList.contains("is-touched")) return;

      marcarRevisado(campo);
      validar(campo);
    });

    campo.addEventListener("input", () => {
      if (campo.closest(".campo").classList.contains("is-touched")) validar(campo);
    });
  });


  /* -------------------------------------------------------
     3. ENVÍO
     ------------------------------------------------------- */
  const boton = form.querySelector(".form__enviar");
  const textoBoton = boton.querySelector(".form__enviar-texto");
  const alerta = document.getElementById("form-alerta");

  function ponerEnviando(activo) {
    boton.classList.toggle("is-enviando", activo);
    boton.setAttribute("aria-busy", activo ? "true" : "false");
    textoBoton.textContent = activo ? "Enviando…" : "Iniciar conversación";
  }

  // Si el envío falla, ofrecemos el correo con el mensaje ya escrito
  function mostrarAlerta(datos) {
    const cuerpo = `${datos.mensaje}\n\n${datos.nombre}${datos.empresa ? " — " + datos.empresa : ""}`;
    const enlace = document.createElement("a");
    enlace.href = `mailto:${CONFIG.correo}?subject=${encodeURIComponent(CONFIG.asunto)}&body=${encodeURIComponent(cuerpo)}`;
    enlace.textContent = "envíalo por correo con un clic";

    alerta.replaceChildren(
      "No pudimos enviar tu mensaje. Inténtalo de nuevo en un momento o ",
      enlace,
      " (ya va con lo que escribiste)."
    );
    alerta.hidden = false;
  }

  function sacudir(campo) {
    const contenedor = campo.closest(".campo");
    contenedor.classList.remove("is-sacudido");
    void contenedor.offsetWidth; // reinicia la animación
    contenedor.classList.add("is-sacudido");
  }

  const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

  form.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (boton.classList.contains("is-enviando")) return; // evita doble envío
    alerta.hidden = true;

    // Revisar todo antes de enviar
    let primerInvalido = null;
    camposObligatorios.forEach((campo) => {
      marcarRevisado(campo);
      if (!validar(campo)) {
        sacudir(campo);
        primerInvalido = primerInvalido || campo;
      }
    });

    if (primerInvalido) {
      primerInvalido.focus();
      return;
    }

    const datos = Object.fromEntries(new FormData(form));

    // Si un robot llenó la trampa, fingimos éxito y no enviamos nada
    if (datos._honey) {
      abrirModal(datos);
      form.reset();
      return;
    }

    // Datos extra que entiende FormSubmit
    datos._subject = CONFIG.asunto;
    datos._template = "table";
    datos._captcha = "false";

    ponerEnviando(true);

    try {
      if (MODO_PRUEBA) {
        console.info("[Contacto] Modo prueba (file://): envío simulado", datos);
        await esperar(900);
      } else {
        const respuesta = await fetch(CONFIG.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(datos),
        });
        const json = await respuesta.json().catch(() => ({}));
        // FormSubmit responde success: "true" / "false" (como texto)
        if (!respuesta.ok || String(json.success) === "false") {
          throw new Error(json.message || "Error " + respuesta.status);
        }
      }

      abrirModal(datos);
      reiniciarFormulario();
    } catch (error) {
      console.error("[Contacto]", error);
      mostrarAlerta(datos);
    } finally {
      ponerEnviando(false);
    }
  });

  function reiniciarFormulario() {
    form.reset();
    form.querySelectorAll(".campo").forEach((c) => c.classList.remove("is-touched", "is-sacudido"));
    form.querySelectorAll("[aria-invalid]").forEach((c) => c.removeAttribute("aria-invalid"));
  }
}


/* ---------------------------------------------------------
   MODAL DE CONFIRMACIÓN (<dialog> nativo)
   --------------------------------------------------------- */
const modal = document.getElementById("envio-modal");

function abrirModal(datos) {
  // Personaliza el texto: "Gracias, Juan. … en juan@empresa.com."
  const primerNombre = (datos.nombre || "").split(" ")[0];
  modal.querySelector("[data-modal-nombre]").textContent = primerNombre ? ", " + primerNombre : "";

  const correo = modal.querySelector("[data-modal-correo]");
  if (datos.email) {
    const fuerte = document.createElement("strong");
    fuerte.textContent = datos.email;
    correo.replaceChildren(" en ", fuerte);
  } else {
    correo.replaceChildren();
  }

  modal.showModal();
}

if (modal) {
  modal.querySelector("[data-cerrar]").addEventListener("click", () => modal.close());

  // Cerrar al hacer clic en el fondo oscuro (fuera de la caja)
  modal.addEventListener("click", (evento) => {
    const caja = modal.getBoundingClientRect();
    const afuera =
      evento.clientX < caja.left || evento.clientX > caja.right ||
      evento.clientY < caja.top || evento.clientY > caja.bottom;
    if (afuera) modal.close();
  });
}


/* ---------------------------------------------------------
   4. MAPA (Leaflet, ~40 KB)
   Se descarga SOLO cuando el visitante se acerca a la
   sección, así la página abre igual de rápido.
   --------------------------------------------------------- */
const LEAFLET = {
  css: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  cssHash: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",
  js: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  jsHash: "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=",
};

const lienzoMapa = document.getElementById("mapa");

function cargarLeaflet() {
  if (window.L) return Promise.resolve();

  return new Promise((resolver, rechazar) => {
    // El CSS de Leaflet va ANTES de contacto.css para que nuestros estilos ganen
    const estilos = document.createElement("link");
    estilos.rel = "stylesheet";
    estilos.href = LEAFLET.css;
    estilos.integrity = LEAFLET.cssHash;
    estilos.crossOrigin = "";
    document.head.insertBefore(estilos, document.querySelector('link[href$="contacto.css"]'));

    const script = document.createElement("script");
    script.src = LEAFLET.js;
    script.integrity = LEAFLET.jsHash;
    script.crossOrigin = "";
    script.onload = resolver;
    script.onerror = rechazar;
    document.head.appendChild(script);
  });
}

function crearMapa() {
  const contenedor = lienzoMapa.closest(".mapa");
  const aviso = document.getElementById("mapa-aviso");

  const mapa = L.map(lienzoMapa, {
    center: CONFIG.zona,
    zoom: CONFIG.zoom,
    minZoom: 11,
    maxZoom: 15,                     // no se acerca a nivel de calle
    scrollWheelZoom: false,          // no "secuestra" el scroll de la página
    dragging: !L.Browser.mobile,     // en celular, se activa al tocar el mapa
    tap: false,
  });

  // Calles de OpenStreetMap; el CSS las pasa a escala de grises
  const capa = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 15,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapa);

  capa.once("load", () => contenedor.classList.add("is-listo"));

  // Círculo morado sobre el área general (sin marcar la dirección exacta)
  L.circle(CONFIG.zona, {
    radius: CONFIG.radio,
    color: "#5F107A",       // borde morado GRUBORJA
    weight: 2,
    fillColor: "#5F107A",
    fillOpacity: 0.18,
    interactive: false,
  }).addTo(mapa);

  // Etiqueta en el centro del círculo
  L.tooltip({ permanent: true, direction: "center", className: "pin-etiqueta" })
    .setLatLng(CONFIG.zona)
    .setContent('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 21V4h10v17M14 9h6v12M2 21h20M7.5 8h3M7.5 12h3M7.5 16h3"/></svg>Centro Histórico')
    .addTo(mapa);

  // Zoom con rueda y arrastre solo después de hacer clic/tocar el mapa
  function activar() {
    mapa.scrollWheelZoom.enable();
    mapa.dragging.enable();
    aviso.hidden = true;
  }

  mapa.on("click focus", activar);
  mapa.on("mouseout", () => mapa.scrollWheelZoom.disable());

  let temporizador;
  lienzoMapa.addEventListener("wheel", () => {
    if (mapa.scrollWheelZoom.enabled()) return;
    aviso.hidden = false;
    clearTimeout(temporizador);
    temporizador = setTimeout(() => (aviso.hidden = true), 1600);
  }, { passive: true });
}

if (lienzoMapa && "IntersectionObserver" in window) {
  const observadorMapa = new IntersectionObserver((entradas) => {
    if (!entradas.some((e) => e.isIntersecting)) return;
    observadorMapa.disconnect();
    cargarLeaflet()
      .then(crearMapa)
      .catch(() => console.warn("[Contacto] No se pudo cargar el mapa; se muestra la dirección."));
  }, { rootMargin: "300px 0px" });

  observadorMapa.observe(lienzoMapa);
}
