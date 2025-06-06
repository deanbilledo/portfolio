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


// Interactive Background Animation
function initBackgroundAnimation() {
    // Create container for animation
    const bgAnimation = document.createElement('div');
    bgAnimation.className = 'bg-animation';
    document.body.prepend(bgAnimation);
    
    // Configuration
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 10 : 18;
    const sizes = isMobile ? [40, 60, 80] : [60, 100, 140, 180];
    const depthLevels = [20, 40, 60, 80]; // Z-depth for parallax effect
    
    // Tracking variables for interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let deviceBeta = 0; // For mobile tilt (forward/backward)
    let deviceGamma = 0; // For mobile tilt (left/right)
    
    // Track all particles for animation
    const particles = [];
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(bgAnimation, sizes, depthLevels);
        particles.push(particle);
    }
    
    // Mouse movement listener for desktop
    document.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    });
    
    // Device orientation for mobile
    window.addEventListener('deviceorientation', (e) => {
        // Beta: front/back tilt from -180 to 180
        // Gamma: left/right tilt from -90 to 90
        if (e.beta !== null && e.gamma !== null) {
            deviceBeta = Math.min(Math.max(e.beta, -45), 45) / 45; // Normalize to -1 to 1
            deviceGamma = Math.min(Math.max(e.gamma, -45), 45) / 45; // Normalize to -1 to 1
        }
    });
    
    // Smooth animation for mouse/device movement
    function updateParticlePositions() {
        // Smooth mouse movement (easing)
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
        
        // Get interaction values (either mouse or device orientation)
        const interactX = isMobile ? deviceGamma : mouseX;
        const interactY = isMobile ? deviceBeta : mouseY;
        
        // Apply to each particle
        particles.forEach(particle => {
            const { element, depth } = particle;
            if (element && element.parentNode) {
                // Calculate movement based on depth (deeper = more movement)
                const moveX = interactX * (depth / 20); // Adjust divisor for sensitivity
                const moveY = interactY * (depth / 20);
                
                // Apply parallax effect
                element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            }
        });
        
        requestAnimationFrame(updateParticlePositions);
    }
    
    // Start the animation loop
    updateParticlePositions();
    
    // Periodically create new particles
    setInterval(() => {
        if (document.body.contains(bgAnimation) && particles.length < particleCount + 3) {
            const particle = createParticle(bgAnimation, sizes, depthLevels);
            particles.push(particle);
            
            // Clean up removed particles from array
            for (let i = particles.length - 1; i >= 0; i--) {
                if (!particles[i].element.parentNode) {
                    particles.splice(i, 1);
                }
            }
        }
    }, 3000);
    
    // Handle resize
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobile) {
            // Refresh if switching between mobile/desktop
            while (bgAnimation.firstChild) {
                bgAnimation.firstChild.remove();
            }
            particles.length = 0;
            
            // Create new particles with appropriate sizes
            const newSizes = newIsMobile ? [40, 60, 80] : [60, 100, 140, 180];
            const newCount = newIsMobile ? 10 : 18;
            
            for (let i = 0; i < newCount; i++) {
                const particle = createParticle(bgAnimation, newSizes, depthLevels);
                particles.push(particle);
            }
        }
    });
}

function createParticle(container, sizes, depthLevels) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    // Random size
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    
    // Random depth for parallax effect
    const depth = depthLevels[Math.floor(Math.random() * depthLevels.length)];
    
    // Animation properties
    const duration = 20 + Math.random() * 40; // 20-60s
    const xMove = (Math.random() - 0.5) * 150; // -75px to 75px
    const xEnd = (Math.random() - 0.5) * 150; // -75px to 75px
    const rotation = Math.random() * 360; // 0-360deg
    const opacity = 0.05 + Math.random() * 0.15; // 0.05-0.2 (more subtle)
    
    // Set custom properties for animation
    particle.style.setProperty('--x-move', `${xMove}px`);
    particle.style.setProperty('--x-end', `${xEnd}px`);
    particle.style.setProperty('--rotation', `${rotation}deg`);
    particle.style.setProperty('--opacity', opacity);
    
    // Set animation
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    // Add to container
    container.appendChild(particle);
    
    // Store the particle object with its element and depth
    const particleObj = {
        element: particle,
        depth: depth
    };
    
    // Remove after animation completes
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, (duration + 5) * 1000);
    
    return particleObj;
}

// Initialize the animation with your other initializations
document.addEventListener('DOMContentLoaded', () => {
    // Your existing initializations
    initTheme();
    // ... other initializations
    
    // Add our interactive background
    initBackgroundAnimation();
});