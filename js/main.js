// ============================================
// PORTFOLIO CRISTOPHER FRANÇA - MAIN.JS
// Sistema de interações e animações v1.3
// ============================================

// ==================== CONFIGURAÇÃO ====================
// 🟢 Mude para false quando não estiver disponível para trabalho
const DISPONIVEL_PARA_TRABALHO = true;

// Controla visibilidade do badge automaticamente
document.addEventListener('DOMContentLoaded', () => {
    const badge = document.querySelector('.badge-disponivel');
    if (badge) {
        badge.style.display = DISPONIVEL_PARA_TRABALHO ? 'inline-flex' : 'none';
    }
});

// ==================== MENU MOBILE ====================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

function toggleMobileMenu() {
    mobileNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    mobileMenuBtn.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    mobileNav.classList.remove('active');
    mobileOverlay.classList.remove('active');
    mobileMenuBtn.textContent = '☰';
    document.body.style.overflow = '';
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
}

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Fechar menu ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ==================== SCROLL SUAVE ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ANIMAÇÕES DE SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Fade-in nas seções
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Animação das barras de habilidade
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.querySelector('.skill-progress');
            if (progress) {
                const width = progress.style.getPropertyValue('--progress');
                progress.style.width = width;
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// ==================== HEADER SCROLL ====================
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==================== DIGITAÇÃO + APAGAR ANIMADA ====================
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.texto-gradiente');
    if (!nameElement) return;

    const nome = 'Cristopher França';
    let charIndex = 0;
    let isDeleting = false;

    nameElement.innerHTML = '<span class="typewriter-inner"></span><span class="cursor-digitacao">|</span>';
    const inner = nameElement.querySelector('.typewriter-inner');

    function tick() {
        if (!isDeleting) {
            inner.textContent = nome.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === nome.length) {
                isDeleting = true;
                setTimeout(tick, 7500);
                return;
            }
            setTimeout(tick, 90);
        } else {
            inner.textContent = nome.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                setTimeout(tick, 600);
                return;
            }
            setTimeout(tick, 45);
        }
    }

    tick();
});

// ==================== CARROSSEL DE HABILIDADES ====================
(function() {
    const track = document.querySelector('.carrossel-track');
    const wrapper = document.querySelector('.carrossel-track-wrapper');
    const dotsContainer = document.querySelector('.carrossel-dots');
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');

    if (!track || !wrapper) return;

    const cards = Array.from(track.querySelectorAll('.card-habilidade'));
    let currentIndex = 0;
    let cardsVisible = 3;

    function getCardsVisible() {
        const w = window.innerWidth;
        if (w <= 560) return 1;
        if (w <= 900) return 2;
        return 3;
    }

    function buildDots() {
        dotsContainer.innerHTML = '';
        const total = Math.ceil(cards.length / cardsVisible);
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            if (i === 0) dot.classList.add('ativo');
            dot.addEventListener('click', () => goTo(i * cardsVisible));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dotPage = Math.floor(currentIndex / cardsVisible);
        dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('ativo', i === dotPage);
        });
    }

    function updateVisibility() {
        cards.forEach((card, i) => {
            const visible = i >= currentIndex && i < currentIndex + cardsVisible;
            card.classList.toggle('visivel', visible);
        });
    }

    function goTo(index) {
        const maxIndex = cards.length - cardsVisible;
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        const cardWidth = cards[0].offsetWidth + 24;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        updateDots();
        updateVisibility();
        btnPrev.disabled = currentIndex === 0;
        btnNext.disabled = currentIndex >= maxIndex;

        cards.forEach((card, i) => {
            if (i >= currentIndex && i < currentIndex + cardsVisible) {
                const bar = card.querySelector('.progresso-habilidade');
                if (bar) {
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = bar.style.getPropertyValue('--progresso') || getComputedStyle(bar).getPropertyValue('--progresso');
                    }, 100);
                }
            }
        });
    }

    function init() {
        cardsVisible = getCardsVisible();
        buildDots();
        goTo(0);
    }

    btnPrev.addEventListener('click', () => goTo(currentIndex - cardsVisible));
    btnNext.addEventListener('click', () => goTo(currentIndex + cardsVisible));

    // Suporte a swipe mobile
    let touchStartX = 0;
    wrapper.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    wrapper.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? goTo(currentIndex + cardsVisible) : goTo(currentIndex - cardsVisible);
    });

    window.addEventListener('resize', () => {
        cardsVisible = getCardsVisible();
        buildDots();
        goTo(0);
    });

    init();
})();

// ==================== UTILITÁRIOS ====================
console.log('%c🚀 Portfólio Cristopher França', 'color: #f59e0b; font-size: 20px; font-weight: bold;');
console.log('%c✨ Desenvolvido com HTML, CSS e JavaScript', 'color: #64748b; font-size: 14px;');
console.log('%c💼 Disponível para oportunidades!', 'color: #10b981; font-size: 14px;');
