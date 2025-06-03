particlesJS('particles-js', {
    "particles": {
        "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#00FFFF" },
        "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
        "opacity": { "value": 0.8, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 4, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
        "line_linked": { "enable": true, "distance": 160, "color": "#FFD700", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 4, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        },
        "modes": {
            "grab": { "distance": 180, "line_linked": { "opacity": 1 } },
            "bubble": { "distance": 800, "size": 80, "duration": 2, "opacity": 0.8, "speed": 3 },
            "repulse": { "distance": 200, "duration": 0.4 },
            "push": { "particles_nb": 4 },
            "remove": { "particles_nb": 2 }
        }
    },
    "retina_detect": true
});

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
}

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) { 
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hrefAttribute = this.getAttribute('href');
        const targetId = hrefAttribute; 

        if (hrefAttribute === '#') { e.preventDefault(); return; }
        if (hrefAttribute.startsWith('#') && hrefAttribute.length > 1) {
            e.preventDefault();
            const targetElement = document.querySelector(hrefAttribute);
            if (targetElement) {
                let offset = 0; 
                const navbarElement = document.querySelector('.navbar');
                
                if (navbarElement && getComputedStyle(navbarElement).position === 'fixed') { 
                    let currentNavbarPaddingTop = parseFloat(getComputedStyle(navbarElement).paddingTop) || 0;
                    let currentNavbarPaddingBottom = parseFloat(getComputedStyle(navbarElement).paddingBottom) || 0;
                    let logoHeight = 0;
                    const logoImgElement = navbarElement.querySelector('.logo img');
                    
                    if (logoImgElement) {
                        logoHeight = logoImgElement.offsetHeight;
                    } else {
                        const logoTextElement = navbarElement.querySelector('.logo');
                        if(logoTextElement) logoHeight = parseFloat(getComputedStyle(logoTextElement).fontSize) * 1.1; 
                    }
                    const navbarContentHeight = Math.max(logoHeight, 26) + currentNavbarPaddingTop + currentNavbarPaddingBottom;
                    offset = navbarContentHeight + 15; 
                }

                if (targetId === "#home") {
                     offset = 0;
                } else if (!navbarElement || getComputedStyle(navbarElement).position !== 'fixed') {
                    offset = 10; 
                }
                
                const minOffsetRequired = 50; 
                if (targetId !== "#home" && offset < minOffsetRequired) {
                   offset = minOffsetRequired; 
                }

                window.scrollTo({ top: targetElement.offsetTop - offset, behavior: 'smooth' });
                
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuBtn) { mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>'; }
                }
            }
        }
    });
});

const heroTitleElement = document.querySelector('.hero-title');
if (heroTitleElement) {
    const heroTitleText = "Seu Futuro Brilha com Aulas Particulares Personalizadas";
    let heroTitleIndex = 0;

    function getCssVariableValue(variableName) {
        return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    }

    function typeHeroTitle() {
        if (heroTitleElement && heroTitleIndex < heroTitleText.length) {
            const char = heroTitleText.charAt(heroTitleIndex);
            const colorVar = (heroTitleIndex % 2 === 0) ? '--primario' : '--acento';
            let colorValue = getCssVariableValue(colorVar);

            if (!colorValue) {
                colorValue = (colorVar === '--primario') ? '#FFD700' : '#00FFFF';
            }

            const span = document.createElement('span');
            span.style.color = colorValue;
            span.textContent = char;
            heroTitleElement.appendChild(span);
            heroTitleIndex++;
            setTimeout(typeHeroTitle, 50);
        } else if (heroTitleElement) {
            heroTitleElement.classList.add('blinking-cursor');
        }
    }

    function initTyping() {
        if (heroTitleElement) {
            heroTitleElement.textContent = '';
            heroTitleIndex = 0;
            typeHeroTitle();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTyping);
    } else {
        initTyping();
    }
}

function revealElementsOnScroll() {
    const elements = document.querySelectorAll('.about-container, .history-container, .lesson-packages, .works-container, .testimonials-container, .cta-content, .footer-grid');
    elements.forEach(element => {
        if (element) { // Verifica se o elemento não é nulo
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            if (elementPosition < screenPosition) { 
                element.classList.add('revealed'); 
            }
        }
    });
}
const elementsToReveal = document.querySelectorAll('.about-container, .history-container, .lesson-packages, .works-container, .testimonials-container, .cta-content, .footer-grid');
elementsToReveal.forEach(el => {
    if (el) { // Verifica se o elemento não é nulo
        el.classList.add('hidden');
    }
});

window.addEventListener('scroll', revealElementsOnScroll);
window.addEventListener('load', revealElementsOnScroll);