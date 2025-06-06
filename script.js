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
// Project Image Cycling with Smooth Fade Transitions
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
        let isTransitioning = false;
        
        // Preload images for smooth transitions
        const preloadedImages = imageArray.map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });
        
        const fadeToNextImage = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            
            const nextIndex = (currentIndex + 1) % imageArray.length;
            const nextSrc = imageArray[nextIndex];
            
            // Fade out current image
            imageElement.style.opacity = '0';
            
            // Wait for fade out, then change source and fade in
            setTimeout(() => {
                imageElement.src = nextSrc;
                currentIndex = nextIndex;
                
                // Fade in new image
                setTimeout(() => {
                    imageElement.style.opacity = '1';
                    isTransitioning = false;
                }, 50); // Small delay to ensure image has loaded
            }, 300); // Match CSS transition duration
        };
        
        const startCycling = () => {
            if (!interval) {
                interval = setInterval(fadeToNextImage, 3500); // Slightly longer to account for transition
            }
        };
        
        const stopCycling = () => {
            if (interval) {
                clearInterval(interval);
                interval = null;
            }
        };
        
        // Add CSS transition if not already present
        if (!imageElement.style.transition) {
            imageElement.style.transition = 'opacity 0.3s ease-in-out';
        }
        
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
        
        // Manual image cycling on click with fade effect
        imageElement.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isTransitioning) {
                fadeToNextImage();
            }
        });
        
        // Handle image load errors
        imageElement.addEventListener('error', () => {
            console.warn(`Failed to load image: ${imageElement.src}`);
            // Try next image in array
            if (!isTransitioning) {
                currentIndex = (currentIndex + 1) % imageArray.length;
                if (currentIndex !== 0) { // Prevent infinite loop
                    fadeToNextImage();
                }
            }
        });
        
        // Ensure smooth loading on page load
        imageElement.addEventListener('load', () => {
            if (imageElement.style.opacity === '') {
                imageElement.style.opacity = '1';
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


// Update your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSmoothScrolling();
    animateSkills();
    initProjectImageCycling();
    initContactForm();
    initScrollAnimations();
    initBackgroundAnimation(); // Add this line
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Simple Interactive Background Animation
function initBackgroundAnimation() {
    console.log("Initializing background animation...");
    
    const bgAnimation = document.createElement('div');
    bgAnimation.className = 'bg-animation';
    document.body.prepend(bgAnimation);
    
    // Configuration
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 40;
    const particles = [];
    
    // Device orientation tracking for mobile
    let deviceX = 0;
    let deviceY = 0;
    
    // Create particles
    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'idle-particle';
            
            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 8 + 's';
            
            bgAnimation.appendChild(particle);
            
            particles.push({
                element: particle,
                baseX: x,
                baseY: y,
                currentX: x,
                currentY: y
            });
        }
    }
    
    // Mouse interaction for desktop
    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            particles.forEach(particle => {
                const { element, baseX, baseY } = particle;
                
                // Calculate distance from mouse
                const dx = mouseX - baseX;
                const dy = mouseY - baseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) { // Interaction radius
                    // Calculate push effect
                    const force = (150 - distance) / 150;
                    const pushX = (baseX - mouseX) * force * 0.5;
                    const pushY = (baseY - mouseY) * force * 0.5;
                    
                    particle.currentX = baseX + pushX;
                    particle.currentY = baseY + pushY;
                    
                    element.style.transform = `translate(${pushX}px, ${pushY}px)`;
                    element.classList.add('particle-hover');
                } else {
                    // Return to base position
                    element.style.transform = 'translate(0px, 0px)';
                    element.classList.remove('particle-hover');
                    particle.currentX = baseX;
                    particle.currentY = baseY;
                }
            });
        });
    }
    
    // Device orientation for mobile
    if (isMobile && window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            if (e.beta !== null && e.gamma !== null) {
                // Normalize values
                deviceX = Math.max(-30, Math.min(30, e.gamma)) / 30; // -1 to 1
                deviceY = Math.max(-30, Math.min(30, e.beta)) / 30;  // -1 to 1
                
                particles.forEach(particle => {
                    const { element, baseX, baseY } = particle;
                    
                    // Apply tilt-based movement
                    const moveX = deviceX * 30; // Adjust sensitivity
                    const moveY = deviceY * 30;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            }
        });
        
        // Request permission for iOS devices
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response == 'granted') {
                        console.log("Device orientation permission granted");
                    }
                })
                .catch(console.error);
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Clear existing particles
        particles.forEach(particle => {
            if (particle.element.parentNode) {
                particle.element.remove();
            }
        });
        particles.length = 0;
        
        // Recreate particles for new screen size
        setTimeout(createParticles, 100);
    });
    
    // Initialize particles
    createParticles();
    
    console.log(`Background animation initialized with ${particleCount} particles`);
}