/* ═══════════════════════════════════════════════════════════════
   Chapter2Video — Main JavaScript
═══════════════════════════════════════════════════════════════ */

// ── Scroll-based fade-in ──
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});

// ── Sticky header shadow ──
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }
});

// ── Lightbox ──
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ── Mobile menu toggle ──
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-links');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
        });
    }
});

// ── Video Carousel ──
function scrollCarousel(direction) {
    const track = document.getElementById('videoCarousel');
    if (!track) return;
    const card = track.querySelector('.video-card');
    if (!card) return;
    const scrollAmount = card.offsetWidth + 24; // Width + gap
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}
