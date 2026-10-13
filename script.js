// Menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

// Scroll: progress + to-top
const bar = document.getElementById('progressBar');
const toTop = document.getElementById('toTop');
function onScroll() {
  const y = window.scrollY;
  const h = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  toTop.classList.toggle('show', y > 700);
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('section, .hero').forEach(el => { el.classList.add('reveal'); io.observe(el); });

// Active nav
const sections = [...document.querySelectorAll('main section[id]')];
const anchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) anchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => navObs.observe(s));

// Copy email
document.querySelectorAll('[data-copy]').forEach(el => {
  el.addEventListener('click', async () => {
    const text = el.getAttribute('data-copy');
    try {
      await navigator.clipboard.writeText(text);
      const old = el.textContent;
      el.textContent = 'copied ✓';
      setTimeout(() => { el.textContent = old; }, 1600);
    } catch { window.location.href = 'mailto:' + text; }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
console.log('%csaikumar@void — electric-cyan by ration, not decoration.', 'background:#00ffff;color:#000;padding:4px 8px');
