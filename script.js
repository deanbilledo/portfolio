// DOM Elements
const progressBar = document.getElementById('progressBar');
// const themeToggle = document.getElementById('themeToggle'); // Removed for NGE theme
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const skillProgressBars = document.querySelectorAll('.skill-progress');

// Theme Management - Forced to NGE (Dark)
function initTheme() {
    // Force dark mode for NGE theme
    document.body.className = 'dark-mode';
    localStorage.setItem('theme', 'dark');
}

/* Theme toggling disabled for NGE theme
function toggleTheme() {
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.className = newTheme + '-mode';
    localStorage.setItem('theme', newTheme);
}
*/

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
    
    // Background remover images - Fixed typo
    const backgroundremoverImages = [
        'images/bgrem1.png',
        'images/bgrem2.png',
        'images/bgrem3.png'
    ];

    

    // Store image arrays for modal use
    window.projectImageArrays = {
        thesis: thesisImages,
        petcare: petcareImages,
        dreampc: dreampcImages,
        cyberpunk: cyberpunkImages,
        backgroundremover: backgroundremoverImages
    };

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
                }, 50);
            }, 300);
        };
        
        const startCycling = () => {
            if (!interval) {
                interval = setInterval(fadeToNextImage, 3500);
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
            if (!isTransitioning) {
                currentIndex = (currentIndex + 1) % imageArray.length;
                if (currentIndex !== 0) {
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
    const backgroundremoverImg = document.getElementById('backgroundremoverImage');
    
    if (thesisImg) cycleImages(thesisImg, thesisImages);
    if (petcareImg) cycleImages(petcareImg, petcareImages);
    if (dreampcImg) cycleImages(dreampcImg, dreampcImages);
    if (cyberpunkImg) cycleImages(cyberpunkImg, cyberpunkImages);
    if (backgroundremoverImg) cycleImages(backgroundremoverImg, backgroundremoverImages);

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

// Simple Interactive Background Animation
function initBackgroundAnimation() {
    console.log("Initializing background animation...");
    
    const bgAnimation = document.createElement('div');
    bgAnimation.className = 'bg-animation';
    document.body.prepend(bgAnimation);
    
    // Configuration
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 60 : 120;
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

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) {
        console.warn('Scroll to top button not found');
        return;
    }
    
    // Show/hide button based on scroll position
    function toggleScrollButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) { // Show after scrolling 300px
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    // Smooth scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', throttle(toggleScrollButton, 100));
    scrollToTopBtn.addEventListener('click', scrollToTop);
    
    // Initial check
    toggleScrollButton();
}

// Project Modal functionality (desktop only)

// Project Modal functionality (desktop only)
function initProjectModal() {
    // Only initialize on desktop
    if (window.innerWidth <= 768) return;
    
    const projectCards = document.querySelectorAll('.project-card');
    let currentModal = null;
    let currentImageIndex = 0;
    let currentImageArray = [];
    
    // Create modal structure with navigation arrows
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="project-modal-content">
                <button class="project-modal-close">&times;</button>
                <div class="project-modal-image-container">
                    <img class="project-modal-image" src="" alt="">
                    <button class="project-modal-nav project-modal-prev">‹</button>
                    <button class="project-modal-nav project-modal-next">›</button>
                    <div class="project-modal-image-counter">
                        <span class="current-image">1</span> / <span class="total-images">1</span>
                    </div>
                </div>
                <div class="project-modal-body">
                    <h3 class="project-modal-title"></h3>
                    <div class="project-modal-status"></div>
                    <p class="project-modal-description"></p>
                    <div class="project-modal-tech">
                        <h4>Technologies Used</h4>
                        <div class="project-modal-tech-tags"></div>
                    </div>
                    <div class="project-modal-links"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }
    
    // Get project type from card ID or data attribute
    function getProjectType(projectCard) {
        const img = projectCard.querySelector('.project-screenshot');
        if (!img) return null;
        
        const imgId = img.id;
        if (imgId.includes('thesis')) return 'thesis';
        if (imgId.includes('petcare')) return 'petcare';
        if (imgId.includes('dreampc')) return 'dreampc';
        if (imgId.includes('cyberpunk')) return 'cyberpunk';
        if (imgId.includes('backgroundremover')) return 'backgroundremover';
        
        return null;
    }
    
    // Update modal image
    function updateModalImage(modal, imageArray, index) {
        const modalImage = modal.querySelector('.project-modal-image');
        const currentCounter = modal.querySelector('.current-image');
        const totalCounter = modal.querySelector('.total-images');
        const prevBtn = modal.querySelector('.project-modal-prev');
        const nextBtn = modal.querySelector('.project-modal-next');
        
        if (imageArray && imageArray.length > 0) {
            modalImage.style.opacity = '0';
            
            setTimeout(() => {
                modalImage.src = imageArray[index];
                currentCounter.textContent = index + 1;
                totalCounter.textContent = imageArray.length;
                
                // Show/hide navigation buttons
                if (imageArray.length > 1) {
                    prevBtn.style.display = 'flex';
                    nextBtn.style.display = 'flex';
                } else {
                    prevBtn.style.display = 'none';
                    nextBtn.style.display = 'none';
                }
                
                setTimeout(() => {
                    modalImage.style.opacity = '1';
                }, 50);
            }, 150);
        }
    }
    
    // Navigate images
    function navigateImage(direction) {
        if (currentImageArray.length <= 1) return;
        
        if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % currentImageArray.length;
        } else {
            currentImageIndex = currentImageIndex === 0 ? currentImageArray.length - 1 : currentImageIndex - 1;
        }
        
        updateModalImage(currentModal, currentImageArray, currentImageIndex);
    }
    
    // Populate modal with project data
    function populateModal(modal, projectCard) {
        const image = projectCard.querySelector('.project-screenshot');
        const title = projectCard.querySelector('.project-title');
        const status = projectCard.querySelector('.project-status');
        const description = projectCard.querySelector('.project-description');
        const techTags = projectCard.querySelectorAll('.tech-tag');
        const links = projectCard.querySelectorAll('.project-link');
        
        // Set modal content
        modal.querySelector('.project-modal-title').textContent = title.textContent;
        
        // Set status
        const modalStatus = modal.querySelector('.project-modal-status');
        if (status) {
            modalStatus.textContent = status.textContent;
            modalStatus.className = `project-modal-status ${status.classList.contains('completed') ? 'completed' : 'in-progress'}`;
        }
        
        // Set description - create default if not found
        const modalDescription = modal.querySelector('.project-modal-description');
        if (description && description.textContent.trim()) {
            modalDescription.textContent = description.textContent;
        } else {
            // Default descriptions based on project type
            const projectType = getProjectType(projectCard);
            const defaultDescriptions = {
                thesis: "A comprehensive thesis project showcasing advanced research and development skills.",
                petcare: "A web application for pet care management, connecting pet owners with care services.",
                dreampc: "A PC building and configuration tool with modern web technologies.",
                cyberpunk: "A cyberpunk-themed web application with immersive design and functionality.",
                backgroundremover: "An AI-powered background removal tool for image processing."
            };
            modalDescription.textContent = defaultDescriptions[projectType] || "An innovative project showcasing modern web development techniques.";
        }
        
        // Set tech tags - create default if not found
        const modalTechContainer = modal.querySelector('.project-modal-tech-tags');
        modalTechContainer.innerHTML = '';
        
        if (techTags.length > 0) {
            techTags.forEach(tag => {
                const modalTag = document.createElement('span');
                modalTag.className = 'tech-tag';
                modalTag.textContent = tag.textContent;
                modalTechContainer.appendChild(modalTag);
            });
        } else {
            // Default tech stacks based on project type
            const defaultTech = {
                thesis: ['Research', 'Analysis', 'Documentation', 'Presentation'],
                petcare: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
                dreampc: ['JavaScript', 'HTML5', 'CSS3', 'API Integration'],
                cyberpunk: ['JavaScript', 'CSS3', 'HTML5', 'Animation'],
                backgroundremover: ['Python', 'AI/ML', 'Image Processing', 'API']
            };
            
            const projectType = getProjectType(projectCard);
            const techStack = defaultTech[projectType] || ['HTML', 'CSS', 'JavaScript'];
            
            techStack.forEach(tech => {
                const modalTag = document.createElement('span');
                modalTag.className = 'tech-tag';
                modalTag.textContent = tech;
                modalTechContainer.appendChild(modalTag);
            });
        }
        
        // Set links
        const modalLinksContainer = modal.querySelector('.project-modal-links');
        modalLinksContainer.innerHTML = '';
        links.forEach(link => {
            const modalLink = document.createElement('a');
            modalLink.href = link.href;
            modalLink.className = link.className;
            modalLink.textContent = link.textContent;
            modalLink.target = '_blank';
            modalLinksContainer.appendChild(modalLink);
        });
        
        // Set up image navigation
        const projectType = getProjectType(projectCard);
        currentImageArray = window.projectImageArrays[projectType] || [image.src];
        currentImageIndex = 0;
        
        // Add image transition style
        const modalImage = modal.querySelector('.project-modal-image');
        modalImage.style.transition = 'opacity 0.3s ease-in-out';
        
        updateModalImage(modal, currentImageArray, currentImageIndex);
    }
    
    // Open modal
    function openModal(projectCard) {
        if (currentModal) {
            currentModal.remove();
        }
        
        currentModal = createModal();
        populateModal(currentModal, projectCard);
        
        // Add event listeners
        const closeBtn = currentModal.querySelector('.project-modal-close');
        const prevBtn = currentModal.querySelector('.project-modal-prev');
        const nextBtn = currentModal.querySelector('.project-modal-next');
        
        closeBtn.addEventListener('click', closeModal);
        prevBtn.addEventListener('click', () => navigateImage('prev'));
        nextBtn.addEventListener('click', () => navigateImage('next'));
        
        currentModal.addEventListener('click', (e) => {
            if (e.target === currentModal) {
                closeModal();
            }
        });
        
        // Show modal
        setTimeout(() => {
            currentModal.classList.add('active');
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeModal() {
        if (currentModal) {
            currentModal.classList.remove('active');
            setTimeout(() => {
                if (currentModal) {
                    currentModal.remove();
                    currentModal = null;
                }
            }, 300);
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    // Add click event to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking on links
            if (e.target.classList.contains('project-link') || 
                e.target.closest('.project-link')) {
                return;
            }
            
            openModal(card);
        });
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentModal) {
            closeModal();
        }
        // Navigate images with arrow keys
        if (currentModal) {
            if (e.key === 'ArrowLeft') {
                navigateImage('prev');
            } else if (e.key === 'ArrowRight') {
                navigateImage('next');
            }
        }
    });
}


// Handle window resize to reinitialize or cleanup modal functionality
function handleProjectModalResize() {
    if (window.innerWidth <= 768) {
        // Mobile: Remove any existing modals
        const existingModal = document.querySelector('.project-modal');
        if (existingModal) {
            existingModal.remove();
        }
        document.body.style.overflow = '';
    } else {
        // Desktop: Initialize modal functionality if needed
        initProjectModal();
    }
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

// Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSmoothScrolling();
    animateSkills();
    initProjectImageCycling();
    initContactForm();
    initScrollAnimations();
    initBackgroundAnimation();
    initScrollToTop();
    initProjectModal();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Event Listeners
// themeToggle.addEventListener('click', toggleTheme); // Disabled

window.addEventListener('scroll', throttle(() => {
    updateProgressBar();
    updateActiveNav();
}, 16));

window.addEventListener('resize', throttle(() => {
    updateProgressBar();
    handleProjectModalResize();
}, 250));

// Theme Management with synchronized transitions
/* Disabled for NGE theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme + '-mode';
    
    // Ensure theme is applied before any animations start
    document.documentElement.style.setProperty('--theme-transition-duration', '0s');
    
    // Re-enable transitions after initial load
    setTimeout(() => {
        document.documentElement.style.setProperty('--theme-transition-duration', '0.3s');
    }, 100);
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Temporarily disable other transitions to prevent conflicts
    document.body.style.pointerEvents = 'none';
    
    // Force synchronization by triggering reflow
    document.body.offsetHeight;
    
    // Apply new theme
    document.body.className = newTheme + '-mode';
    localStorage.setItem('theme', newTheme);
    
    // Re-enable interactions after theme transition completes
    setTimeout(() => {
        document.body.style.pointerEvents = '';
    }, 300); // Match CSS transition duration
}
*/

// ...rest of your existing code remains the same...