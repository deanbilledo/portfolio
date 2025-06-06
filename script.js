// DOM Elements
const progressBar = document.getElementById('progressBar');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme + '-mode';
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.className = newTheme + '-mode';
    localStorage.setItem('theme', newTheme);
}

// Progress Bar
function updateProgressBar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrolled + '%';
}

// Active Navigation
function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skills Animation
function animateSkills() {
    const skillsSection = document.getElementById('skills');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillProgressBars.forEach(bar => {
                    const level = bar.dataset.level;
                    setTimeout(() => {
                        bar.style.width = level + '%';
                    }, 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}
// Project Image Cycling
function initProjectImageCycling() {
    // Thesis project images
    const thesisImages = [
        'images/thesis1.png',
        'images/thesis2.png',
        'images/thesis3.png',   
        'images/thesis4.png',
        'images/thesis5.png',
        'images/thesis6.png',
        'images/thesis7.png'
    ];
    
    // Pet Care Connect images
    const petcareImages = [
        'images/pcc1.jpg',
        'images/pcc2.jpg',
        'images/pcc3.jpg',   
        'images/pcc4.jpg',
        'images/pcc5.jpg'
    ];
    
    // DreamPC images
    const dreampcImages = [
        'images/dream1.png',
        'images/dream2.png',
        'images/dream3.png',
        'images/dream4.png',
        'images/dream5.png',
        'images/dream6.png'
    ];

    // Cyberpunk images
    const cyberpunkImages = [
        'images/punk1.png',
        'images/punk2.png',
        'images/punk3.png',
        'images/punk4.png',
        'images/punk5.png',
        'images/punk6.png',
        'images/punk7.png'
    ];
    
    function cycleImages(imageElement, imageArray) {
        if (!imageElement || !imageArray || imageArray.length === 0) {
            return;
        }
        
        let currentIndex = 0;
        let interval;
        
        const startCycling = () => {
            if (!interval) {
                interval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % imageArray.length;
                    imageElement.src = imageArray[currentIndex];
                }, 3000);
            }
        };
        
        const stopCycling = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCycling();
                } else {
                    stopCycling();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(imageElement);
        
        // Manual image cycling on click
        imageElement.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % imageArray.length;
            imageElement.src = imageArray[currentIndex];
        });
        
        // Handle image load errors
        imageElement.addEventListener('error', () => {
            console.warn(`Failed to load image: ${imageElement.src}`);
            // Try next image in array
            currentIndex = (currentIndex + 1) % imageArray.length;
            if (currentIndex !== 0) { // Prevent infinite loop
                imageElement.src = imageArray[currentIndex];
            }
        });
    }
    
    // Get image elements and apply cycling
    const thesisImg = document.getElementById('thesisImage');
    const petcareImg = document.getElementById('petcareImage');
    const dreampcImg = document.getElementById('dreampcImage');
    const cyberpunkImg = document.getElementById('cyberpunkImage');
    
    if (thesisImg) cycleImages(thesisImg, thesisImages);
    if (petcareImg) cycleImages(petcareImg, petcareImages);
    if (dreampcImg) cycleImages(dreampcImg, dreampcImages);
    if (cyberpunkImg) cycleImages(cyberpunkImg, cyberpunkImages);
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            formStatus.textContent = 'Sending message...';
            formStatus.style.background = 'rgba(255, 149, 0, 0.1)';
            formStatus.style.color = 'var(--warning-color)';
            formStatus.style.display = 'block';
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.style.background = 'rgba(52, 199, 89, 0.1)';
                    formStatus.style.color = 'var(--success-color)';
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                formStatus.textContent = 'Failed to send message. Please try again.';
                formStatus.style.background = 'rgba(255, 59, 48, 0.1)';
                formStatus.style.color = 'var(--error-color)';
            }
            
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.style.display = 'none';
            }, 5000);
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.bento-card, .project-card, .skill-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSmoothScrolling();
    animateSkills();
    initProjectImageCycling();
    initContactForm();
    initScrollAnimations();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Scroll events
window.addEventListener('scroll', throttle(() => {
    updateProgressBar();
    updateActiveNav();
}, 16));

// Resize handler
window.addEventListener('resize', throttle(() => {
    updateProgressBar();
}, 250));