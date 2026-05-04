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
const animationDelay = 160;
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
let currentIndex = 0;

function crearTrabajo(trabajo, index) {
  const item = document.createElement("button");
  item.className = "portfolio-item";
  item.type = "button";
  item.dataset.index = String(index);
  item.style.setProperty("--item-delay", `${Math.min(index * 55, 440)}ms`);
  item.setAttribute("aria-label", `Ver ${trabajo.titulo} ${index + 1}`);

  item.innerHTML = `
    <img src="${trabajo.imagen}" alt="${trabajo.titulo}" loading="lazy">
    <div class="portfolio-overlay">
      <span>Render 3D</span>
      <h3>${trabajo.titulo}</h3>
    </div>
  `;

  item.addEventListener("click", () => abrirLightbox(index));

  if (hasFinePointer) {
    item.addEventListener("mousemove", (event) => {
      const bounds = item.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateY = ((x / bounds.width) - 0.5) * 8;
      const rotateX = (0.5 - (y / bounds.height)) * 8;

      item.style.setProperty("--rotate-x", `${rotateX.toFixed(2)}deg`);
      item.style.setProperty("--rotate-y", `${rotateY.toFixed(2)}deg`);
      item.style.setProperty("--glow-x", `${((x / bounds.width) * 100).toFixed(2)}%`);
      item.style.setProperty("--glow-y", `${((y / bounds.height) * 100).toFixed(2)}%`);
    });

    item.addEventListener("mouseleave", () => {
      item.style.removeProperty("--rotate-x");
      item.style.removeProperty("--rotate-y");
      item.style.removeProperty("--glow-x");
      item.style.removeProperty("--glow-y");
    });
  }

  return item;
}

function obtenerTrabajos() {
  return trabajos;
}

function pintarTrabajos(trabajosFiltrados) {
  const fragment = document.createDocumentFragment();

  trabajosFiltrados.forEach((trabajo, index) => {
    fragment.appendChild(crearTrabajo(trabajo, index));
  });

  portfolioGrid.innerHTML = "";
  portfolioGrid.appendChild(fragment);
}

function renderPortfolio() {
  if (!portfolioGrid) return;

  const trabajosFiltrados = obtenerTrabajos();
  portfolioGrid.classList.add("is-filtering");

  window.setTimeout(() => {
    pintarTrabajos(trabajosFiltrados);
    portfolioGrid.classList.remove("is-filtering");
  }, animationDelay);
}

function abrirLightbox(index) {
  if (!lightbox || !lightboxImage || !lightboxCaption) return;

  currentIndex = index;
  const trabajo = trabajos[currentIndex];

  lightboxImage.src = trabajo.imagen;
  lightboxImage.alt = trabajo.titulo;
  lightboxCaption.textContent = `${trabajo.categoria} · ${trabajo.titulo}`;
  lightboxCaption.textContent = `${trabajo.titulo} ${currentIndex + 1}`;
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

function navegarLightbox(direction) {
  if (!lightbox?.classList.contains("active")) return;

  currentIndex = (currentIndex + direction + trabajos.length) % trabajos.length;
  abrirLightbox(currentIndex);
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

  if (event.key === "ArrowRight") {
    navegarLightbox(1);
  }

  if (event.key === "ArrowLeft") {
    navegarLightbox(-1);
  }
});

filterButtons.forEach((button) => {
  button.setAttribute("aria-pressed", button.classList.contains("active") ? "true" : "false");
});

if (portfolioGrid) {
  renderPortfolio();
}
