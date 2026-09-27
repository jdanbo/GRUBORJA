# GRUBORJA: sitio web (Fase 1)

Sitio estático en HTML, CSS y JavaScript sin librerías ni herramientas de compilación.
Páginas: **Inicio**, **Servicios** y **Portafolio**.

## Estructura

```
gruborja/
├── index.html            Inicio
├── servicios.html        Servicios
├── portafolio.html       Portafolio
├── css/
│   ├── variables.css     Colores, tipografía y espacios de marca (editar aquí)
│   ├── base.css          Reset, tipografía y utilidades
│   ├── componentes.css   Botones, header, hero, tarjetas, CTA, footer y modal
│   └── paginas.css       Estilos específicos de cada página
├── js/
│   ├── main.js           Header, menú móvil, animaciones, contadores y carrusel
│   ├── proyectos.js      Tarjetas de proyecto y modal con galería
│   ├── inicio.js         Proyectos destacados del Inicio
│   ├── portafolio.js     Filtros, "Cargar más" y URL por sector
│   └── servicios.js      Acordeón "Ver detalles técnicos"
├── data/
│   └── proyectos.js      Datos de los 17 proyectos (fuente: portafolio PDF)
└── assets/
    ├── logos/            Logo horizontal a color y en blanco, símbolo y favicon
    └── img/
        ├── sitio/        Fotos de los hero y de las secciones
        ├── proyectos/    Una carpeta por proyecto: <id>/<id>-1.webp, <id>-2.webp, …
        ├── equipo/       Retratos del equipo (Nosotros y página del fundador)
        └── marca/        Logos oficiales (banner horizontal y versiones verticales)
```

## Tareas frecuentes

**Agregar un proyecto:** crea la carpeta `assets/img/proyectos/<id>/` y copia ahí sus fotos con el nombre `<id>-1.webp`, `<id>-2.webp`, etc.
Para reemplazar una foto por otra de mayor calidad, guárdala con el mismo nombre en su carpeta.
Luego duplica un bloque en `data/proyectos.js` y cambia los datos.
Con `destacado: true` el proyecto aparece también en el Inicio (máximo 3).

**Poner logos de clientes:** en `index.html`, dentro del carrusel, reemplaza
`<span class="client__name">Casa Botrán</span>` por
`<img class="client__logo" src="assets/logos/clientes/casa-botran.svg" alt="Casa Botrán">`.
Los logos salen en gris y toman color al pasar el cursor.

**Cambiar colores o tipografía:** edita `css/variables.css`.

**Enlaces directos útiles:**
- `portafolio.html?sector=hoteleria` abre el portafolio ya filtrado por un sector.
- `portafolio.html#casa-botran` abre directamente el modal de un proyecto.
- `servicios.html#gestion` lleva a un servicio y abre sus detalles técnicos.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `gruborja`).
2. Sube el **contenido** de esta carpeta a la raíz del repositorio. `index.html` debe quedar en la raíz.
3. Ve a **Settings → Pages**. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
4. En uno o dos minutos el sitio estará en `https://<tu-usuario>.github.io/gruborja/`.

El archivo `.nojekyll` ya está incluido para que GitHub publique los archivos tal cual.

## Probar en tu computadora

Puedes abrir `index.html` con doble clic y todo funciona.
Si prefieres usar un servidor local: `python3 -m http.server` y luego abre `http://localhost:8000`.
