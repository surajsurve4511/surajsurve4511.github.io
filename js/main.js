// ═══ PORTFOLIO ENGINE — main.js ═══

document.addEventListener('DOMContentLoaded', () => {

  // ─── TYPEWRITER ───
  const roles = [
    'Architecting Intelligent Systems.',
    'Translating complex data into physical realities.',
    'AI & Robotics Engineer.',
    'Machine Learning Engineer.',
    'Full-Stack Developer.',
    'ROS2 & Digital Twin Developer.',
    'Generative AI Builder.',
  ];
  const tw = document.getElementById('typewriter');
  let roleIdx = 0, charIdx = 0, deleting = false;

  function typewrite() {
    const current = roles[roleIdx];
    if (!deleting) {
      tw.innerHTML = current.substring(0, charIdx + 1) + '<span class="cursor"></span>';
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typewrite, 2000);
        return;
      }
      setTimeout(typewrite, 60);
    } else {
      tw.innerHTML = current.substring(0, charIdx - 1) + '<span class="cursor"></span>';
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typewrite, 400);
        return;
      }
      setTimeout(typewrite, 30);
    }
  }
  typewrite();

  // ─── SCROLL REVEAL ───
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ─── COUNTER ANIMATION ───
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = '1';
        const target = parseInt(e.target.dataset.count);
        const duration = 1500;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          e.target.textContent = Math.floor(eased * target) + (target > 20 ? '+' : '');
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ─── NAV HIDE/SHOW ON SCROLL ───
  const nav = document.getElementById('nav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 100 && current > lastScroll) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = current;
  }, { passive: true });

  // ─── NAV ACTIVE STATE ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });
  sections.forEach(s => activeObserver.observe(s));

  // ─── MOBILE NAV ───
  const toggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  toggle.addEventListener('click', () => navLinksEl.classList.toggle('open'));
  navLinksEl.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinksEl.classList.remove('open'));
  });

  // ─── PROJECT FILTERS ───
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('[data-tags]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projects.forEach(p => {
        if (filter === 'all' || p.dataset.tags.includes(filter)) {
          p.style.display = '';
          p.style.opacity = '0';
          p.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            p.style.transition = 'opacity .4s, transform .4s';
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          });
        } else {
          p.style.display = 'none';
        }
      });
    });
  });

  // ─── SMOOTH SCROLL FOR ANCHORS ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
