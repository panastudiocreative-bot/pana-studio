const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const contactForm = document.querySelector("#contactForm");
const whatsappNumber = "595976601527";

if (false && contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);

    const name = formData.get("name");
    const phone = formData.get("phone");
    const service = formData.get("service");
    const message = formData.get("message");

    const whatsappMessage = `Hola PANA STUDIO, quiero cotizar un proyecto.

Nombre: ${name}
Teléfono: ${phone}
Servicio: ${service}
Mensaje: ${message}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(url, "_blank");
  });
}
const formNote = document.querySelector("#formNote");

const whatsappNumberFallback = "595976601527";

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const phone = formData.get("phone").trim();
    const service = formData.get("service");
    const message = formData.get("message").trim();

    const whatsappMessage = [
      "Hola PANA STUDIO, quiero un render 3D para mi negocio.",
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      `Servicio: ${service}`,
      `Mensaje: ${message}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    if (formNote) {
      formNote.textContent = "Abriendo WhatsApp con tu consulta preparada...";
    }

    window.open(whatsappUrl, "_blank", "noopener");
    contactForm.reset();
  });
}
