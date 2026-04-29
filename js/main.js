// ============================================================
// CAROLINA SANTOS STUDIOS — Main JS
// ============================================================

// ─── Nav Scroll Behavior ──────────────────────────────────
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.nav__hamburger');
const drawer = document.querySelector('.nav__drawer');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// Hamburger toggle
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    drawer.classList.toggle('open');
  });
}

// Close drawer on link click
document.querySelectorAll('.nav__drawer a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
  });
});

// ─── Active Nav Link ──────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a, .nav__drawer a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── Fade-In on Scroll ────────────────────────────────────
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeElements.forEach(el => observer.observe(el));

// ─── Gallery Filters ──────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-masonry__item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
        item.style.opacity = '0';
        setTimeout(() => { item.style.opacity = '1'; item.style.transition = 'opacity 0.4s ease'; }, 10);
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ─── Lightbox ─────────────────────────────────────────────
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox__img');
const lightboxClose = document.querySelector('.lightbox__close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (lightboxImg) lightboxImg.src = img.src;
    if (lightbox) lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ─── Contact Form (Formspree) ─────────────────────────────
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const data = new FormData(contactForm);

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        formMessage.textContent = '✓ Thank you! We will be in touch within 24 hours.';
        formMessage.className = 'form-message success';
        contactForm.reset();
      } else {
        throw new Error('Server error');
      }
    } catch {
      formMessage.textContent = 'Something went wrong. Please email us directly.';
      formMessage.className = 'form-message error';
    }

    btn.textContent = 'Send Message';
    btn.disabled = false;
  });
}

// ─── Smooth Scroll for anchor links ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
