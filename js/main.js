// ============================================
// PORTFOLIO CRISTOPHER FRANÇA - MAIN.JS
// Sistema de interações e animações v1.2
// ============================================

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
    
    // Adiciona sombra no header ao rolar
    if (currentScroll > 100) {
        header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==================== DIGITAÇÃO ANIMADA (OPCIONAL) ====================
// Função para efeito de digitação no título (descomente para ativar)
/*
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Ativar ao carregar a página
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.gradient-text');
    if (nameElement) {
        const originalText = nameElement.textContent;
        typeWriter(nameElement, originalText, 80);
    }
});
*/

// ==================== CURSOR PERSONALIZADO (OPCIONAL) ====================
// Efeito de partículas ao mover o mouse (descomente para ativar)
/*
document.addEventListener('mousemove', (e) => {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 8px;
        height: 8px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.6;
        animation: particleFade 1s forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
});

// Adicionar animação CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFade {
        0% {
            transform: scale(1);
            opacity: 0.6;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
*/

// ==================== LOADING SCREEN (OPCIONAL) ====================
// Tela de carregamento inicial (descomente para ativar)
/*
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--darker);
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">⚡</div>
            <div style="color: var(--primary); font-size: 1.5rem; font-weight: 700;">Carregando...</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1000);
});
*/

// ==================== UTILITÁRIOS ====================
console.log('%c🚀 Portfólio Cristopher França', 'color: #f59e0b; font-size: 20px; font-weight: bold;');
console.log('%c✨ Desenvolvido com HTML, CSS e JavaScript', 'color: #64748b; font-size: 14px;');
console.log('%c💼 Disponível para oportunidades!', 'color: #10b981; font-size: 14px;');
