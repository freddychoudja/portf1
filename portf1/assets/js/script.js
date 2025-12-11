document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // Gestionnaire de thèmes
    // ===================================
    const themeSwitch = document.getElementById('checkbox');
    const currentTheme = localStorage.getItem('theme');

    function updateParticlesColor(color) {
        if (window.pJSDom && window.pJSDom[0]) {
            const pJS = window.pJSDom[0].pJS;
            pJS.particles.color.value = color;
            pJS.particles.line_linked.color = color;
            pJS.fn.particlesRefresh();
        }
    }

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            themeSwitch.checked = true;
            // Pas besoin d'appeler updateParticlesColor ici, la config de particlesJS s'en charge.
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateParticlesColor('#333333');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateParticlesColor('#ffffff');
        }
    }

    themeSwitch.addEventListener('change', switchTheme, false);

    // ===================================
    // Initialisation de Particles.js
    // ===================================
    // La couleur est maintenant définie dynamiquement au chargement
    const initialParticleColor = document.documentElement.getAttribute('data-theme') === 'light' ? '#333333' : '#ffffff';
    
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": initialParticleColor },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": initialParticleColor,
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "out_mode": "out",
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });

    // ===================================
    // Défilement fluide (Smooth scrolling)
    // ===================================
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // ===================================
    // Lien de navigation actif au défilement
    // ===================================
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 75) { // offset ajusté pour mieux correspondre
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // ===================================
    // Gestion des modales de projet
    // ===================================
    const modalTriggers = document.querySelectorAll('.project-detail-trigger');
    const modals = document.querySelectorAll('.project-detail-modal');
    const closeButtons = document.querySelectorAll('.close-modal-btn');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetModalId = trigger.getAttribute('href');
            const targetModal = document.querySelector(targetModalId);
            if (targetModal) {
                targetModal.style.display = 'flex';
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // ================================================
    // NOUVEAU : Animations au défilement (Scroll Reveal)
    // ================================================
    const observerOptions = {
        root: null, // observe par rapport au viewport
        rootMargin: '0px',
        threshold: 0.1 // déclenche quand 10% de l'élément est visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si l'élément est en train d'entrer dans le viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optionnel : arrêter d'observer l'élément une fois qu'il est visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attacher l'observateur à toutes les sections ayant la classe '.fade-in-section'
    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
});