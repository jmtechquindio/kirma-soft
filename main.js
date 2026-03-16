/**
 * KIRMA - Enhanced SPA JavaScript
 * Modules: Particles, Navigation, Scroll Animations, Counters, Form Validation
 */

'use strict';

// ============================================================
// MODULE: Particle System
// ============================================================
const ParticleSystem = (() => {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return { init: () => {} };

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrameId;
  let W, H;

  const CONFIG = {
    count: 60,
    color: 'rgba(255, 184, 0, ',
    colorAlt: 'rgba(120, 0, 255, ',
    minSize: 1,
    maxSize: 2.5,
    minSpeed: 0.1,
    maxSpeed: 0.4,
    connectionDistance: 120,
    connectionOpacity: 0.08,
  };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    const useAlt = Math.random() > 0.8;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * CONFIG.maxSpeed * 2,
      vy: (Math.random() - 0.5) * CONFIG.maxSpeed * 2,
      size: CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize),
      opacity: 0.15 + Math.random() * 0.4,
      colorBase: useAlt ? CONFIG.colorAlt : CONFIG.color,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    };
  }

  function initParticles() {
    particles = Array.from({ length: CONFIG.count }, createParticle);
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONFIG.connectionDistance) {
          const alpha = (1 - dist / CONFIG.connectionDistance) * CONFIG.connectionOpacity;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 184, 0, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function update() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.opacity += p.opacityDir * 0.003;

      if (p.opacity >= 0.6 || p.opacity <= 0.1) p.opacityDir *= -1;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.colorBase}${p.opacity})`;
      ctx.fill();
    });

    animFrameId = requestAnimationFrame(update);
  }

  function init() {
    resize();
    initParticles();
    update();
    window.addEventListener('resize', () => {
      resize();
      initParticles();
    }, { passive: true });
  }

  return { init };
})();

// ============================================================
// MODULE: Navigation
// ============================================================
const Navigation = (() => {
  const navbar = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id]');

  let mobileOpen = false;
  let ticking = false;

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Toggle scrolled state
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Back to top button
        const backBtn = document.getElementById('backToTop');
        if (backBtn) {
          backBtn.classList.toggle('visible', scrollY > 400);
        }

        // Active nav link highlighting
        sections.forEach(section => {
          const top = section.offsetTop - 120;
          const bottom = top + section.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            const id = section.getAttribute('id');
            allNavLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('data-section') === id);
            });
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  }

  function toggleMobile() {
    mobileOpen = !mobileOpen;
    mobileBtn.classList.toggle('active', mobileOpen);
    navLinks.classList.toggle('open', mobileOpen);
    mobileBtn.setAttribute('aria-expanded', mobileOpen.toString());
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
  }

  function closeMobile() {
    if (mobileOpen) toggleMobile();
  }

  function handleNavClick(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    closeMobile();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function init() {
    if (!navbar) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (mobileBtn) mobileBtn.addEventListener('click', toggleMobile);

    document.addEventListener('click', handleNavClick);

    // Close mobile menu on outside click
    document.addEventListener('click', e => {
      if (mobileOpen && !navbar.contains(e.target)) closeMobile();
    });

    // Back to top
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileOpen) closeMobile();
    });
  }

  return { init };
})();

// ============================================================
// MODULE: Scroll Reveal Animations
// ============================================================
const ScrollReveal = (() => {
  let observer;

  function addRevealClasses() {
    const targets = [
      { selector: '.service-card', baseDelay: 0 },
      { selector: '.why-card', baseDelay: 0 },
      { selector: '.case-item', baseDelay: 0 },
      { selector: '.process-step', baseDelay: 0 },
      { selector: '.value-item', baseDelay: 0 },
      { selector: '.about-card', baseDelay: 0 },
      { selector: '.perk', baseDelay: 0 },
      { selector: '.tech-card', baseDelay: 0 },
      { selector: '.section-tag', baseDelay: 0 },
      { selector: '.hero-stats', baseDelay: 0 },
    ];

    targets.forEach(({ selector }) => {
      document.querySelectorAll(selector).forEach((el, idx) => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
          const delay = Math.min(idx, 5);
          if (delay > 0) el.classList.add(`reveal-delay-${delay}`);
        }
      });
    });

    // Also add reveal to section headings
    document.querySelectorAll('.section-title:not(.hero-title), .section-subtitle').forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });
  }

  function init() {
    addRevealClasses();

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  return { init };
})();

// ============================================================
// MODULE: Counter Animation for Hero Stats
// ============================================================
const CounterAnimation = (() => {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  let hasRun = false;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const startTime = performance.now();

    function frame(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function init() {
    if (!counters.length) return;

    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          counters.forEach((counter, i) => {
            setTimeout(() => animateCounter(counter), i * 250);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(heroSection);
  }

  return { init };
})();

// ============================================================
// MODULE: Contact Form with Validation
// ============================================================
const ContactForm = (() => {
  const form = document.getElementById('contactForm');
  if (!form) return { init: () => {} };

  const fields = {
    name: { el: document.getElementById('contactName'), errEl: document.getElementById('nameError') },
    email: { el: document.getElementById('contactEmail'), errEl: document.getElementById('emailError') },
    message: { el: document.getElementById('contactMessage'), errEl: document.getElementById('messageError') },
  };

  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnLoader = document.getElementById('btnLoader');
  const btnArrow = document.getElementById('btnArrow');
  const formSuccess = document.getElementById('formSuccess');
  const charCount = document.getElementById('charCount');

  const RULES = {
    name: {
      required: true,
      minLength: 2,
      messages: { required: 'El nombre es requerido.', minLength: 'Mínimo 2 caracteres.' }
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      messages: { required: 'El email es requerido.', pattern: 'Ingresa un email válido.' }
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 500,
      messages: {
        required: 'El mensaje es requerido.',
        minLength: 'Mínimo 10 caracteres.',
        maxLength: 'Máximo 500 caracteres.'
      }
    }
  };

  function validateField(name, value) {
    const rule = RULES[name];
    if (!rule) return '';

    if (rule.required && !value.trim()) return rule.messages.required;
    if (rule.pattern && !rule.pattern.test(value)) return rule.messages.pattern;
    if (rule.minLength && value.trim().length < rule.minLength) return rule.messages.minLength;
    if (rule.maxLength && value.trim().length > rule.maxLength) return rule.messages.maxLength;
    return '';
  }

  function showError(name, message) {
    const { el, errEl } = fields[name];
    errEl.textContent = message;
    el.classList.toggle('is-error', !!message);
  }

  function clearError(name) {
    showError(name, '');
  }

  function setLoading(loading) {
    submitBtn.disabled = loading;
    btnText.textContent = loading ? 'Enviando...' : 'Enviar mensaje';
    btnLoader.hidden = !loading;
    btnArrow.hidden = loading;
  }

  function showSuccess() {
    form.style.animation = 'fadeInUp 0.5s ease';
    form.hidden = true;
    formSuccess.hidden = false;
    formSuccess.style.animation = 'fadeInUp 0.5s ease';
  }


  async function handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    Object.entries(fields).forEach(([name, { el }]) => {
      const error = validateField(name, el.value);
      showError(name, error);
      if (error) isValid = false;
    });

    if (!isValid) {
      // Focus first error field
      const firstError = Object.values(fields).find(f => f.el.classList.contains('is-error'));
      if (firstError) firstError.el.focus();
      return;
    }

    setLoading(true);
    try {
      // Prepare form data
      const formData = new FormData(form);
      
      // Enviar a Formspree usando fetch
      const response = await fetch('https://formspree.io/f/mpwzejvj', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      if (response.ok) {
        showSuccess();
        form.reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          const errorMsg = data.errors.map(error => error.message).join(', ');
          alert('Hubo un error al enviar el formulario: ' + errorMsg);
        } else {
          alert('Ups! Ocurrió un error al enviar el mensaje. Por favor intenta más tarde.');
        }
        setLoading(false);
      }
    } catch (err) {
      console.error('Error enviando formulario:', err);
      alert('Ups! Ocurrió un error de red al enviar el mensaje.');
      setLoading(false);
    }
  }

  function init() {
    // Real-time validation on blur
    Object.entries(fields).forEach(([name, { el }]) => {
      el.addEventListener('blur', () => {
        const error = validateField(name, el.value);
        showError(name, error);
      });

      el.addEventListener('input', () => {
        if (el.classList.contains('is-error')) {
          const error = validateField(name, el.value);
          showError(name, error);
        }
      });
    });

    // Character count for message
    if (fields.message.el && charCount) {
      fields.message.el.addEventListener('input', () => {
        const len = fields.message.el.value.length;
        charCount.textContent = `${len} / 500`;
        charCount.style.color = len > 450 ? '#ef4444' : '';
      });
    }

    form.addEventListener('submit', handleSubmit);
  }

  return { init };
})();

// ============================================================
// MODULE: Interactive Cards Enhancement
// ============================================================
const CardInteractions = (() => {
  function initTilt(cards) {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
        const rotateY = ((x - centerX) / centerX) * 10; // Max 10deg
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        card.style.transition = 'transform 0.1s ease-out';
        
        // Update glow if present
        const glow = card.querySelector('.service-card__glow');
        if (glow) {
          const gx = e.clientX - rect.left - glow.offsetWidth / 2;
          const gy = e.clientY - rect.top - glow.offsetHeight / 2;
          glow.style.transform = `translate(${gx}px, ${gy}px)`;
          glow.style.opacity = '1';
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
        card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        
        const glow = card.querySelector('.service-card__glow');
        if (glow) {
          glow.style.opacity = '0';
        }
      });
    });
  }

  function init() {
    initTilt(document.querySelectorAll('.service-card, .why-card, .case-item'));

    // Keyboard navigation for cards
    document.querySelectorAll('[tabindex="0"]').forEach(el => {
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
    });
  }

  return { init };
})();

// ============================================================
// MODULE: Typing Effect for Hero Badge
// ============================================================
const TypingEffect = (() => {
  function init() {
    const badge = document.querySelector('.hero-badge .mono');
    if (!badge) return;

    const phrases = [
      'Automate. Build. Innovate.',
      'IA · Automatización · Digital',
      'Tu partner tecnológico →',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    function type() {
      const phrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        badge.textContent = phrase.slice(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timeout = setTimeout(type, 500);
          return;
        }
        timeout = setTimeout(type, 60);
      } else {
        charIndex++;
        badge.textContent = phrase.slice(0, charIndex);
        if (charIndex === phrase.length) {
          isDeleting = true;
          timeout = setTimeout(type, 2800);
          return;
        }
        timeout = setTimeout(type, 80);
      }
    }

    // Start after initial animation completes
    setTimeout(type, 2000);
  }

  return { init };
})();

// ============================================================
// MODULE: Smooth Section Highlighting
// ============================================================
const SectionHighlight = (() => {
  function init() {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-link[data-section]').forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === id);
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -30% 0px',
    });

    sections.forEach(section => observer.observe(section));
  }

  return { init };
})();

// ============================================================
// INIT ALL MODULES
// ============================================================
function initApp() {
  ParticleSystem.init();
  Navigation.init();
  ScrollReveal.init();
  CounterAnimation.init();
  ContactForm.init();
  CardInteractions.init();
  TypingEffect.init();
  SectionHighlight.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
