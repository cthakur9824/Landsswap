/* ========== Preloader ========== */
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
    }, 1500);
});

/* ========== Navbar Scroll ========== */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========== Mobile Navigation ========== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navActions = document.querySelector('.nav-actions');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    if (navActions) navActions.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        if (navActions) navActions.classList.remove('open');
        document.body.style.overflow = '';
    });
});

/* ========== Active Nav Link on Scroll ========== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

/* ========== Stat Counter Animation ========== */
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        statsAnimated = true;
        statNumbers.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                num.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
    }
}

window.addEventListener('scroll', animateStats);
animateStats();

/* ========== Property Filter ========== */
const filterBtns = document.querySelectorAll('.filter-btn');
const propertyCards = document.querySelectorAll('.property-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        propertyCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.classList.remove('hidden');
                card.style.display = '';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    });
});

/* ========== Property Favorite Toggle ========== */
document.querySelectorAll('.property-fav').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
    });
});

/* ========== FAQ Accordion ========== */
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

/* ========== Swap Calculator ========== */
const calcBtn = document.getElementById('calcBtn');
if (calcBtn) {
    calcBtn.addEventListener('click', () => {
        const yourValue = parseFloat(document.getElementById('yourValue').value) || 0;
        const yourAcreage = parseFloat(document.getElementById('yourAcreage').value) || 1;
        const targetValue = parseFloat(document.getElementById('targetValue').value) || 0;
        const targetAcreage = parseFloat(document.getElementById('targetAcreage').value) || 1;

        const valueDiff = yourValue - targetValue;
        const yourPerAcre = yourValue / yourAcreage;
        const targetPerAcre = targetValue / targetAcreage;
        const acreDiff = yourPerAcre - targetPerAcre;

        const valueDiffEl = document.getElementById('valueDiff');
        const acreDiffEl = document.getElementById('acreDiff');
        const eqPaymentEl = document.getElementById('eqPayment');

        valueDiffEl.textContent = (valueDiff >= 0 ? '+' : '') + '$' + Math.abs(valueDiff).toLocaleString();
        valueDiffEl.style.color = valueDiff >= 0 ? '#10B981' : '#EF4444';

        acreDiffEl.textContent = (acreDiff >= 0 ? '+' : '') + '$' + Math.abs(Math.round(acreDiff)).toLocaleString() + '/acre';
        acreDiffEl.style.color = acreDiff >= 0 ? '#10B981' : '#EF4444';

        if (valueDiff > 0) {
            eqPaymentEl.textContent = '$' + Math.abs(valueDiff).toLocaleString() + ' due to you';
            eqPaymentEl.style.color = '#10B981';
        } else if (valueDiff < 0) {
            eqPaymentEl.textContent = '$' + Math.abs(valueDiff).toLocaleString() + ' due from you';
            eqPaymentEl.style.color = '#EF4444';
        } else {
            eqPaymentEl.textContent = 'Even swap — no payment needed';
            eqPaymentEl.style.color = '#2563EB';
        }

        document.getElementById('calcResult').style.display = 'block';
    });
}

/* ========== Search Form ========== */
const searchForm = document.getElementById('searchForm');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = document.getElementById('searchLocation').value;
        const type = document.getElementById('searchType').value;
        const budget = document.getElementById('searchBudget').value;

        if (location || type || budget) {
            document.getElementById('properties').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/* ========== Contact Form ========== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = '#10B981';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

/* ========== Newsletter Form ========== */
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const btn = newsletterForm.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = 'Subscribed!';
        btn.style.background = '#10B981';
        input.value = '';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 3000);
    });
}

/* ========== Scroll Animations ========== */
function addFadeIn() {
    const elements = document.querySelectorAll(
        '.category-card, .property-card, .service-card, .testimonial-card, .insight-card, .step-card, .faq-item, .why-feature, .calc-panel'
    );
    elements.forEach((el, i) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${i * 0.05}s`;
    });
}

function checkFadeIn() {
    document.querySelectorAll('.fade-in').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            el.classList.add('visible');
        }
    });
}

addFadeIn();
window.addEventListener('scroll', checkFadeIn);
window.addEventListener('load', checkFadeIn);
