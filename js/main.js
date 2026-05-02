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


// ── Ratings & Chart.js Per Video ──

// Load Chart.js dynamically
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(script);

script.onload = () => {
    initRatings();
};

function initRatings() {
    // 1. Setup mock ratings in localStorage if not exists
    const widgetElements = document.querySelectorAll('.rating-widget');

    // We maintain a global mapping: videoId -> {1:count, 2:count, 3:count, 4:count, 5:count}
    let cumulativeRatings = JSON.parse(localStorage.getItem('c2v_ratings_v2')) || {};

    widgetElements.forEach(widget => {
        const videoId = widget.getAttribute('data-video-id');

        // Initialize if new
        if (!cumulativeRatings[videoId]) {
            cumulativeRatings[videoId] = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
        }
    });
    // Save back
    localStorage.setItem('c2v_ratings_v2', JSON.stringify(cumulativeRatings));

    // 2. Render charts and setup listeners
    widgetElements.forEach(widget => {
        const videoId = widget.getAttribute('data-video-id');
        const stars = widget.querySelectorAll('.star');
        const info = widget.querySelector('.rating-info');
        const canvas = widget.nextElementSibling.querySelector('.rating-chart');

        // Check if user already voted locally
        const userVoted = localStorage.getItem('voted_v2_' + videoId);

        if (userVoted) {
            info.textContent = `You rated ${userVoted} stars.`;
            highlightStars(stars, parseInt(userVoted));
            widget.classList.add('voted'); // could add css to dim or disable cursor
        }

        // Initialize Chart for this widget
        const ctx = canvas.getContext('2d');
        const chartInstance = new Chart(ctx, {
            type: 'bar',
            data: getChartData(cumulativeRatings[videoId]),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { precision: 0, display: false }, grid: { display: false } },
                    x: { grid: { display: false }, ticks: { color: 'var(--text-muted)' } }
                }
            }
        });

        // Setup star hover/click events
        stars.forEach(star => {
            const val = parseInt(star.getAttribute('data-value'));

            // Hover styling
            star.addEventListener('mouseenter', () => {
                highlightStars(stars, val);
            });
            star.addEventListener('mouseleave', () => {
                const currentVote = localStorage.getItem('voted_v2_' + videoId);
                if (!currentVote) {
                    highlightStars(stars, 0);
                } else {
                    highlightStars(stars, parseInt(currentVote));
                }
            });

            // Click handling
            star.addEventListener('click', () => {
                const oldVoteStr = localStorage.getItem('voted_v2_' + videoId);
                const oldVote = oldVoteStr ? parseInt(oldVoteStr) : null;

                if (oldVote === val) {
                    return; // clicked the exact same star
                }

                if (oldVote) {
                    // Remove old vote
                    cumulativeRatings[videoId][oldVote.toString()] -= 1;
                }

                // Add and save new vote
                localStorage.setItem('voted_v2_' + videoId, val);
                cumulativeRatings[videoId][val.toString()] += 1;
                localStorage.setItem('c2v_ratings_v2', JSON.stringify(cumulativeRatings));

                const message = oldVote ? `Changed rating to ${val} stars.` : `Thanks! You rated ${val} stars.`;
                info.textContent = message;
                highlightStars(stars, val);

                // Update Chart
                chartInstance.data = getChartData(cumulativeRatings[videoId]);
                chartInstance.update();
            });
        });
    });
}

function highlightStars(stars, value) {
    stars.forEach(s => {
        const starVal = parseInt(s.getAttribute('data-value'));
        if (starVal <= value) {
            s.style.color = '#F59E0B'; // Gold
        } else {
            s.style.color = '#ccc';
        }
    });
}

function getChartData(ratingCounts) {
    return {
        labels: ['1★', '2★', '3★', '4★', '5★'],
        datasets: [{
            data: [
                ratingCounts["1"],
                ratingCounts["2"],
                ratingCounts["3"],
                ratingCounts["4"],
                ratingCounts["5"]
            ],
            backgroundColor: [
                'rgba(239, 68, 68, 0.7)',
                'rgba(249, 115, 22, 0.7)',
                'rgba(234, 179, 8, 0.7)',
                'rgba(132, 204, 22, 0.7)',
                'rgba(34, 197, 94, 0.7)'
            ],
            borderRadius: 4
        }]
    };
}
