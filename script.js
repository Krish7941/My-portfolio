// =========================================================
// KRISH PATHAK — PORTFOLIO — interactions
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Cursor trail ---------- */
  const cursorTrail = document.querySelector('.cursor-trail');
  if (cursorTrail) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const updateTrail = (x, y) => {
      cursorTrail.style.left = `${x}px`;
      cursorTrail.style.top = `${y}px`;
    };

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      updateTrail(mouseX, mouseY);
    });

    window.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      if (touch) {
        mouseX = touch.clientX;
        mouseY = touch.clientY;
        updateTrail(mouseX, mouseY);
      }
    }, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Active link + reveal on scroll (single observer) ---------- */
  const sections = document.querySelectorAll('main section[id], section#home');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  const setActiveLink = () => {
    let currentId = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const topOffset = rect.top;
      const bottomOffset = rect.bottom;
      const viewportStart = window.innerHeight * 0.28;

      if (topOffset <= viewportStart && bottomOffset >= viewportStart) {
        currentId = section.getAttribute('id') || '';
      }
    });

    if (!currentId) {
      const homeSection = document.getElementById('home');
      if (homeSection && homeSection.getBoundingClientRect().top <= 120) {
        currentId = 'home';
      }
    }

    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  window.addEventListener('load', setActiveLink);
  setActiveLink();

  /* ---------- Typing effect in hero editor caption ---------- */
  const typeEl = document.getElementById('typeLine');
  if (typeEl) {
    const phrases = [
      'const role = "Designer & Developer";',
      'const status = "Open to work";',
      'console.log("Let\'s build something");'
    ];
    let phraseIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      const current = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        typeEl.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        typeEl.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 28 : 45);
    }
    setTimeout(tick, 900);
  }

  /* ---------- Certificate lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-cert');
      const title = card.getAttribute('data-title') || 'certificate.png';
      lightboxImg.src = src;
      lightboxImg.alt = title;
      lightboxTitle.textContent = title;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- Contact form (progressive enhancement, no page reload) ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'sending...';
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          status.textContent = '✓ message sent — thank you!';
          form.reset();
        } else {
          status.textContent = 'could not send — email me directly instead.';
        }
      } catch (err) {
        status.textContent = 'could not send — email me directly instead.';
      }
    });
  }

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 600);
  });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

});