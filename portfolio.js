const trabajos = [
  { titulo: "Render local comercial", categoria: "Render 3D", imagen: "assets/trabajos/trabajo-1.jpg" },
  { titulo: "Fachada tienda", categoria: "Fachadas", imagen: "assets/trabajos/trabajo-2.jpg" },
  { titulo: "Cartelería luminosa", categoria: "Cartelería", imagen: "assets/trabajos/trabajo-3.jpg" },
  { titulo: "Exhibidor promocional", categoria: "Exhibidores", imagen: "assets/trabajos/trabajo-4.jpg" },
  { titulo: "Campaña gráfica", categoria: "Diseño gráfico", imagen: "assets/trabajos/trabajo-5.jpg" },
  { titulo: "Render de góndola", categoria: "Render 3D", imagen: "assets/trabajos/trabajo-6.jpg" },
  { titulo: "Fachada corporativa", categoria: "Fachadas", imagen: "assets/trabajos/trabajo-7.jpg" },
  { titulo: "Letrero exterior", categoria: "Cartelería", imagen: "assets/trabajos/trabajo-8.jpg" },
  { titulo: "Display de producto", categoria: "Exhibidores", imagen: "assets/trabajos/trabajo-9.jpg" },
  { titulo: "Identidad visual", categoria: "Diseño gráfico", imagen: "assets/trabajos/trabajo-10.jpg" },
  { titulo: "Render punto de venta", categoria: "Render 3D", imagen: "assets/trabajos/trabajo-11.jpg" },
  { titulo: "Rediseño de fachada", categoria: "Fachadas", imagen: "assets/trabajos/trabajo-12.jpg" },
  { titulo: "Señalética interior", categoria: "Cartelería", imagen: "assets/trabajos/trabajo-13.jpg" },
  { titulo: "Isla comercial", categoria: "Exhibidores", imagen: "assets/trabajos/trabajo-14.jpg" },
  { titulo: "Material publicitario", categoria: "Diseño gráfico", imagen: "assets/trabajos/trabajo-15.jpg" },
  { titulo: "Render showroom", categoria: "Render 3D", imagen: "assets/trabajos/trabajo-16.jpg" },
  { titulo: "Fachada premium", categoria: "Fachadas", imagen: "assets/trabajos/trabajo-17.jpg" },
  { titulo: "Cartel para local", categoria: "Cartelería", imagen: "assets/trabajos/trabajo-18.jpg" },
  { titulo: "Exhibidor de temporada", categoria: "Exhibidores", imagen: "assets/trabajos/trabajo-19.jpg" },
  { titulo: "Piezas para redes", categoria: "Diseño gráfico", imagen: "assets/trabajos/trabajo-20.jpg" }
];

const portfolioGrid = document.querySelector("#portfolioGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const animationDelay = 180;

function crearTrabajo(trabajo, index) {
  const item = document.createElement("button");
  item.className = "portfolio-item";
  item.type = "button";
  item.style.setProperty("--item-delay", `${Math.min(index * 45, 360)}ms`);
  item.setAttribute("aria-label", `Ver ${trabajo.titulo}`);

  item.innerHTML = `
    <img src="${trabajo.imagen}" alt="${trabajo.titulo}" loading="lazy">
    <div>
      <span>${trabajo.categoria}</span>
      <h3>${trabajo.titulo}</h3>
    </div>
  `;

  item.addEventListener("click", () => abrirLightbox(trabajo));
  return item;
}

function obtenerTrabajos(categoria) {
  return categoria === "Todos"
    ? trabajos
    : trabajos.filter((trabajo) => trabajo.categoria === categoria);
}

function pintarTrabajos(trabajosFiltrados) {
  const fragment = document.createDocumentFragment();

  trabajosFiltrados.forEach((trabajo, index) => {
    fragment.appendChild(crearTrabajo(trabajo, index));
  });

  portfolioGrid.innerHTML = "";
  portfolioGrid.appendChild(fragment);
}

function renderPortfolio(categoria = "Todos") {
  if (!portfolioGrid) return;

  const trabajosFiltrados = obtenerTrabajos(categoria);
  portfolioGrid.classList.add("is-filtering");

  window.setTimeout(() => {
    pintarTrabajos(trabajosFiltrados);
    portfolioGrid.classList.remove("is-filtering");
  }, animationDelay);
}

function abrirLightbox(trabajo) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  lightboxImage.src = trabajo.imagen;
  lightboxImage.alt = trabajo.titulo;
  lightboxCaption.textContent = `${trabajo.categoria} · ${trabajo.titulo}`;
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose?.focus();
}

function cerrarLightbox() {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.src = "";
  lightboxCaption.textContent = "";
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("active")) return;

    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove("active");
      filterButton.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    renderPortfolio(button.dataset.filter);
  });
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    cerrarLightbox();
  }
});

lightboxClose?.addEventListener("click", cerrarLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cerrarLightbox();
  }
});

filterButtons.forEach((button) => {
  button.setAttribute("aria-pressed", button.classList.contains("active") ? "true" : "false");
});

if (portfolioGrid) {
  pintarTrabajos(trabajos);
}
