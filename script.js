const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const pageLinks = document.querySelectorAll('a[href^="#"]');
const form = document.querySelector("[data-contact-form]");
const formMessage = document.querySelector("[data-form-message]");

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

const closeNav = () => {
  nav.classList.remove("is-open");
  navToggle.classList.remove("is-active");
  navToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
};

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.classList.toggle("is-active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
});

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId === "#home" ? document.body : document.querySelector(targetId);

    if (!target || !targetId) {
      return;
    }

    event.preventDefault();
    closeNav();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const headerOffset = targetId === "#home" ? 0 : header.offsetHeight + 18;
    const targetTop = targetId === "#home" ? 0 : target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: reduceMotion ? "auto" : "smooth",
    });

    window.history.pushState(null, "", targetId);
  });
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const revealItems = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const triggerLine = window.innerHeight - 54;

  revealItems.forEach((item) => {
    if (item.classList.contains("is-visible")) {
      return;
    }

    if (item.getBoundingClientRect().top < triggerLine) {
      item.classList.add("is-visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll, { passive: true });
window.addEventListener("resize", revealOnScroll);
revealOnScroll();
window.setTimeout(revealOnScroll, 80);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const enquiry = [
    "Hello TMAC Projects & Civil Works, I would like to request a quote.",
    "",
    `Name: ${formData.get("name") || "Not provided"}`,
    `Phone: ${formData.get("phone") || "Not provided"}`,
    `Email: ${formData.get("email") || "Not provided"}`,
    `Project location: ${formData.get("location") || "Not provided"}`,
    `Service needed: ${formData.get("service") || "Not provided"}`,
    `Message: ${formData.get("message") || "Not provided"}`,
    "",
    "Sent from the TMAC website enquiry form.",
  ].join("\n");

  formMessage.textContent = "Opening WhatsApp with your enquiry...";
  window.location.href = `https://wa.me/263777176681?text=${encodeURIComponent(enquiry)}`;
});
