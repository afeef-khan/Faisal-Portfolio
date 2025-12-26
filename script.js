// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(11, 10, 9, 0.95)';
    } else {
        nav.style.background = 'transparent';
    }
});

// Mobile menu toggle
const navLinks = document.querySelector('.nav-links');
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
`;

// Insert hamburger before nav-links
const navContainer = document.querySelector('.nav-container');
navContainer.insertBefore(hamburger, navLinks);

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navContainer.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            subject: contactForm.querySelectorAll('input[type="text"]')[1].value,
            message: contactForm.querySelector('textarea').value
        };

        // Here you can add your form submission logic
        // For now, just show an alert
        alert('Thank you for your message! I will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active-link');
        }
    });
});

// Horizontal scroll with mouse wheel for projects
const horizontalScroll = document.querySelector('.horizontal-scroll-wrapper');
if (horizontalScroll) {
    horizontalScroll.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            horizontalScroll.scrollLeft += e.deltaY;
        }
    });
}

// Counter animation for stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
};

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

const floatingStats = document.querySelector('.floating-stats');
if (floatingStats) {
    statsObserver.observe(floatingStats);
}

// Button click handlers
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.includes('View My Work')) {
            e.preventDefault();
            document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.querySelectorAll('.btn-secondary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.includes('Get In Touch')) {
            e.preventDefault();
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        }
    });
});