const trabajos = [
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-1.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-2.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-3.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-4.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-5.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-6.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-7.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-8.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-9.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-10.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-11.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-12.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-13.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-14.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-15.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-16.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-17.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-18.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-19.png" },
  { titulo: "Proyecto render 3D", imagen: "assets/trabajos/trabajo-20.png" }
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

 card.innerHTML = `
  <img src="${trabajo.imagen}" alt="${trabajo.titulo}">
  <div class="portfolio-overlay">
    <span>Render 3D</span>
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
