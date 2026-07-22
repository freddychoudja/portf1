document.addEventListener('DOMContentLoaded', () => {
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
            if (window.pageYOffset >= sectionTop - 75) {
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

    function closeModals() {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

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
        button.addEventListener('click', closeModals);
    });

    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModals();
        }
    });

    // ===================================
    // Animations au défilement (Scroll Reveal)
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section, .skill-card, .certification-card, .project-item').forEach(el => {
        observer.observe(el);
    });

    // ===================================
    // Halo qui suit le curseur sur les cartes
    // ===================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        document.querySelectorAll('.skill-card, .certification-card, .project-item').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
                card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
            });
        });

        // ===================================
        // Effet "magnétique" sur les boutons du hero
        // ===================================
        document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
                btn.style.transform = `translate(${x}px, ${y}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }
});
