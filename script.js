/* =============================================
   CUSTOM CURSOR
   ============================================= */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

(function animateCursor() {
  curX += (mouseX - curX) * 0.14;
  curY += (mouseY - curY) * 0.14;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .gallery-item, .skill-card, .who-tags span').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

/* =============================================
   NAVBAR — scroll & active
   ============================================= */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const scrollPr = document.getElementById('scrollProgress');

function onScroll() {
  // Navbar frosted
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Scroll progress
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollPr.style.transform = `scaleX(${window.scrollY / max})`;

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* =============================================
   MOBILE MENU
   ============================================= */
const navToggle  = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

/* =============================================
   SMOOTH SCROLL
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 76, behavior: 'smooth' });
  });
});

/* =============================================
   HERO LAYERS — subtle mouse parallax
   ============================================= */
const layers = document.querySelectorAll('.layer');
document.addEventListener('mousemove', e => {
  const cx = (e.clientX / window.innerWidth  - 0.5);
  const cy = (e.clientY / window.innerHeight - 0.5);
  layers.forEach((l, i) => {
    const depth = (i + 1) * 6;
    l.style.transform = `translate(calc(-50% + ${cx * depth}px), calc(-50% + ${cy * depth}px))`;
  });
});

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    // Stagger children in same parent
    const siblings = Array.from(
      entry.target.parentElement.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
    );
    const idx = siblings.indexOf(entry.target);

    setTimeout(() => {
      entry.target.classList.add('visible');
    }, idx * 100);

    revealObs.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => revealObs.observe(el));

/* =============================================
   SKILL BAR ANIMATION
   ============================================= */
const skillBars = document.querySelectorAll('.skill-fill');

const barObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('animated'), 200);
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(b => barObs.observe(b));

/* =============================================
   HERO PHOTO PARALLAX ON SCROLL
   ============================================= */
const heroPhoto = document.getElementById('heroPhoto');
if (heroPhoto) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroPhoto.style.transform = `translateY(${y * 0.15}px)`;
  }, { passive: true });
}

/* =============================================
   HERO LAYERS SCROLL FADE
   ============================================= */
const heroLayersEl = document.querySelector('.hero-layers');
window.addEventListener('scroll', () => {
  if (!heroLayersEl) return;
  const progress = Math.min(window.scrollY / window.innerHeight, 1);
  heroLayersEl.style.opacity = 1 - progress * 1.4;
  heroLayersEl.style.transform = `translateY(${window.scrollY * 0.1}px)`;
}, { passive: true });