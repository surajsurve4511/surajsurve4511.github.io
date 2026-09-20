// ═══ PORTFOLIO ENGINE v2.0 — main.js ═══

document.addEventListener('DOMContentLoaded', () => {

  // ─── BOOT SEQUENCE ───
  const bootOverlay = document.getElementById('bootOverlay');
  const bootLines = document.getElementById('bootLines');
  const bootSequence = [
    { text: '[SYS] Initializing neural interface...', delay: 0 },
    { text: '[SYS] Loading cognitive modules...', delay: 200 },
    { text: '[NET] Establishing secure connection...', delay: 350 },
    { text: '[GPU] CUDA cores allocated — PyTorch ready', delay: 500 },
    { text: '[ROS] ROS2 Humble node graph online', delay: 650 },
    { text: '[AI]  Ollama LLM instance loaded (Qwen 4B)', delay: 800, cls: 'success' },
    { text: '[VIS] YOLO World detection pipeline — ACTIVE', delay: 950, cls: 'success' },
    { text: '[IOT] AWS IoT Core telemetry — CONNECTED', delay: 1100, cls: 'success' },
    { text: '[SIM] Digital Twin synchronized', delay: 1250, cls: 'success' },
    { text: '', delay: 1400 },
    { text: '> SURAJ SURVE // AI & ROBOTICS ARCHITECT', delay: 1500, cls: 'highlight' },
    { text: '> SYSTEM ONLINE', delay: 1700, cls: 'success' },
  ];

  bootSequence.forEach(({ text, delay, cls }) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'boot-line' + (cls ? ' ' + cls : '');
      line.textContent = text;
      bootLines.appendChild(line);
      bootLines.scrollTop = bootLines.scrollHeight;
    }, delay);
  });

  setTimeout(() => {
    bootOverlay.classList.add('done');
    document.body.style.overflow = '';
    initParticles();
  }, 2400);

  // Prevent scroll during boot
  document.body.style.overflow = 'hidden';

  // ─── PARTICLE NETWORK ───
  function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [], mouse = { x: null, y: null, radius: 150 };
    const PARTICLE_COUNT = window.innerWidth < 768 ? 40 : 80;
    const MAX_DIST = 120;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = document.getElementById('hero').offsetHeight || window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const heroSec = document.getElementById('hero');
    heroSec.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    heroSec.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.r = Math.random() * 2 + 1;
        this.baseAlpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        // Mouse repulsion
        if (mouse.x !== null) {
          const dx = this.x - mouse.x, dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius * 0.02;
            this.vx += dx * force;
            this.vy += dy * force;
          }
        }
        this.x += this.vx;
        this.y += this.vy;
        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;
        // Wrap
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${this.baseAlpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Mouse connection lines
    function connectMouse() {
      if (mouse.x === null) return;
      particles.forEach(p => {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.3;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(123, 97, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      connectMouse();
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ─── TYPEWRITER ───
  const roles = [
    'AI & Robotics Engineer.',
    'Building MANAS Humanoid.',
    'Machine Learning Engineer.',
    'Full-Stack Developer.',
    'ROS2 & Digital Twin Developer.',
    'Generative AI Builder.',
    'Shipping to 1K+ users.',
    'Deep RL Researcher.',
  ];
  const tw = document.getElementById('typewriter');
  let roleIdx = 0, charIdx = 0, deleting = false;

  function typewrite() {
    if (!tw) return;
    const current = roles[roleIdx];
    if (!deleting) {
      tw.innerHTML = current.substring(0, charIdx + 1) + '<span class="cursor"></span>';
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typewrite, 2200);
        return;
      }
      setTimeout(typewrite, 55);
    } else {
      tw.innerHTML = current.substring(0, charIdx - 1) + '<span class="cursor"></span>';
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typewrite, 300);
        return;
      }
      setTimeout(typewrite, 25);
    }
  }
  typewrite();

  // ─── SCROLL REVEAL ───
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Stagger children
        const children = e.target.querySelectorAll('.reveal');
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.1}s`;
        });
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ─── COUNTER ANIMATION ───
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = '1';
        const target = parseInt(e.target.dataset.count);
        const duration = 1800;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          e.target.textContent = Math.floor(eased * target) + (target > 10 ? '+' : '');
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  // ─── NAV HIDE/SHOW ───
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
  }, { threshold: 0.2, rootMargin: '-80px 0px -40% 0px' });
  sections.forEach(s => activeObserver.observe(s));

  // ─── MOBILE NAV ───
  const toggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  if (toggle && navLinksEl) {
    toggle.addEventListener('click', () => navLinksEl.classList.toggle('open'));
    navLinksEl.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinksEl.classList.remove('open'));
    });
  }

  // ─── PROJECT FILTERS ───
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('[data-tags]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projects.forEach(p => {
        const show = filter === 'all' || p.dataset.tags.includes(filter);
        if (show) {
          p.style.display = '';
          p.style.opacity = '0';
          p.style.transform = 'translateY(15px)';
          requestAnimationFrame(() => {
            p.style.transition = 'opacity .4s var(--ease), transform .4s var(--ease)';
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          });
        } else {
          p.style.display = 'none';
        }
      });
    });
  });

  // ─── DARK / LIGHT MODE ───
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ─── CUSTOM CURSOR ───
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (cursor && cursorDot && window.innerWidth > 768) {
    let cx = 0, cy = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });

    function updateCursor() {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      cursorDot.style.left = tx + 'px';
      cursorDot.style.top = ty + 'px';
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover effect on interactive elements
    const hoverables = document.querySelectorAll('a, button, .filter-btn, .project-card, .project-card-md, .case-study, .skill-card, .cert-card, .skill-tag, input, textarea');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ─── SCROLL PROGRESS BAR ───
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent + '%';
    }, { passive: true });
  }

  // ─── BACK TO TOP ───
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── CONTACT FORM ───
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      formStatus.textContent = 'Sending...';
      formStatus.className = 'form-status';

      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          formStatus.textContent = '✓ Transmission received. I\'ll respond within 24 hours.';
          formStatus.className = 'form-status success';
          contactForm.reset();
        } else {
          throw new Error('Failed');
        }
      } catch {
        formStatus.textContent = '✗ Transmission failed. Please email directly.';
        formStatus.className = 'form-status error';
      }
    });
  }

  // ─── SMOOTH SCROLL ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const href = a.getAttribute('href');
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ─── LANGUAGE BAR ANIMATION ───
  const langFills = document.querySelectorAll('.lang-fill');
  const langObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = getComputedStyle(e.target).getPropertyValue('--w');
      }
    });
  }, { threshold: 0.5 });
  langFills.forEach(el => {
    el.style.width = '0%';
    langObserver.observe(el);
  });

});
