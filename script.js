
// Matrix Rain Effect
function createMatrix() {
    const matrixBg = document.getElementById('matrixBg');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = Math.random() * 3 + 2 + 's';
        column.style.animationDelay = Math.random() * 2 + 's';
        
        let columnText = '';
        for (let j = 0; j < 20; j++) {
            columnText += chars.charAt(Math.floor(Math.random() * chars.length)) + '<br>';
        }
        column.innerHTML = columnText;
        matrixBg.appendChild(column);
    }
}

// Progress Bar Animation
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
}

// Stat Counter Animation
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 20);
    });
}

// Skill Progress Animation
function animateSkills() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target.querySelectorAll('.skill-progress');
                skillProgress.forEach(progress => {
                    const level = progress.getAttribute('data-level');
                    progress.style.width = level + '%';
                });
            }
        });
    });

    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });
}

// Navigation Breadcrumbs
function updateBreadcrumbs() {
    const sections = document.querySelectorAll('.section');
    const breadcrumbs = document.querySelectorAll('.breadcrumb-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                breadcrumbs.forEach(breadcrumb => {
                    breadcrumb.classList.remove('active');
                    if (breadcrumb.getAttribute('data-target') === id) {
                        breadcrumb.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
}

// Breadcrumb Navigation
function setupBreadcrumbNavigation() {
    const breadcrumbs = document.querySelectorAll('.breadcrumb-item');
    breadcrumbs.forEach(breadcrumb => {
        breadcrumb.addEventListener('click', () => {
            const target = breadcrumb.getAttribute('data-target');
            document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Contact Form Handler
function setupContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'MESSAGE_SENT!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Konami Code Easter Egg
function setupKonamiCode() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    document.getElementById('konamiTrigger').addEventListener('click', activateEasterEgg);
}

function activateEasterEgg() {
    document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
    document.body.style.animation = 'glitchPulse 0.5s infinite';
    
    setTimeout(() => {
        document.body.style.filter = '';
        document.body.style.animation = '';
    }, 5000);

    // Add some fun console messages
    console.log('%c🎉 EASTER EGG ACTIVATED! 🎉', 'color: #00f2ff; font-size: 20px; font-weight: bold;');
    console.log('%cYou found the secret! Dean Reight appreciates curious minds like yours.', 'color: #ff00ff; font-size: 14px;');
}

// Typing Effect for Hero Section
function typeWriter() {
    const text = document.getElementById('typingText');
    const originalHTML = text.innerHTML;
    text.innerHTML = '';
    
    let i = 0;
    function type() {
        if (i < originalHTML.length) {
            text.innerHTML += originalHTML.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    setTimeout(type, 6000); // Start after boot sequence
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createMatrix();
    updateBreadcrumbs();
    setupBreadcrumbNavigation();
    setupContactForm();
    setupKonamiCode();
    typeWriter();
    
    // Animate counters when hero section is visible
    setTimeout(() => {
        animateCounters();
        animateSkills();
    }, 6500);

    // Update progress bar on scroll
    window.addEventListener('scroll', updateProgressBar);
    
    // Add hover effects to project cards
    document.querySelectorAll('.project-card, .achievement-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = card.classList.contains('project-card') 
                ? 'translateY(-15px) rotateX(5deg)' 
                : 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0)';
        });
    });

    console.log('%cWelcome to Dean Reight\'s Portfolio', 'color: #00f2ff; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with ❤️ and lots of ☕', 'color: #ff00ff;');
});
