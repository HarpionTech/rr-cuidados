/* ============================================================
   RR Cuidado Domiciliar — interações
   Lenis (smooth scroll) + GSAP ScrollTrigger (reveals)
   ============================================================ */

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Preloader ---------- */
window.addEventListener("load", () => {
  const pl = document.getElementById("preloader");
  setTimeout(() => pl && pl.classList.add("done"), 600);
});

/* ---------- Ano no footer ---------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- Lenis smooth scroll ---------- */
let lenis;
if (!prefersReduced && window.Lenis) {
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
}

/* ---------- GSAP ---------- */
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  // sincroniza Lenis com ScrollTrigger
  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* Hero — entrada das linhas do título */
  const heroTl = gsap.timeline({ delay: 0.9, defaults: { ease: "power3.out" } });
  heroTl
    .from(".hero__title .line", { yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.12 })
    .from(".hero .eyebrow", { y: 20, opacity: 0, duration: 0.8 }, "-=0.9")
    .from(".hero__sub", { y: 24, opacity: 0, duration: 0.8 }, "-=0.7")
    .from(".hero__actions", { y: 24, opacity: 0, duration: 0.8 }, "-=0.7")
    .from(".hero__scroll", { opacity: 0, duration: 0.8 }, "-=0.4");

  /* Parallax sutil no vídeo do hero */
  gsap.to(".hero__media", {
    yPercent: 18, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  /* Reveals genéricos */
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
    });
  });

  /* Contadores animados */
  gsap.utils.toArray(".stat__num").forEach((el) => {
    const end = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el, start: "top 88%", once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: end, duration: 1.6, ease: "power2.out",
          onUpdate: () => { el.textContent = prefix + Math.round(obj.val) + suffix; },
        });
      },
    });
  });
}

/* ---------- Navbar: estado scrolled ---------- */
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- Menu mobile ---------- */
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const toggleMenu = (open) => {
  burger.classList.toggle("open", open);
  mobileMenu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
};
burger.addEventListener("click", () => toggleMenu(!mobileMenu.classList.contains("open")));
mobileMenu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => toggleMenu(false))
);

/* ---------- Scroll suave nos links âncora (via Lenis) ---------- */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -70 });
    else target.scrollIntoView({ behavior: "smooth" });
  });
});
