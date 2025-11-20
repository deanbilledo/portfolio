// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile nav when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 64; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(251, 251, 253, 0.9)';
        navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(251, 251, 253, 0.8)';
        navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
    }
});

// // Gallery Modal Functionality
// function enlargeImage(img) {
//     const modal = document.getElementById('imageModal');
//     const modalImg = document.getElementById('modalImage');
//     const caption = document.getElementById('modalCaption');
    
//     if (modal && modalImg && caption) {
//         modal.classList.add('show');
//         modalImg.src = img.src;
//         modalImg.alt = img.alt;
//         caption.textContent = img.alt;
        
//         // Prevent body scroll when modal is open
//         document.body.style.overflow = 'hidden';
        
//         // Add keyboard support
//         document.addEventListener('keydown', handleModalKeyPress);
//     }
// }

function closeModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('show');
        
        // Restore body scroll
        document.body.style.overflow = 'auto';
        
        // Remove keyboard event listener
        document.removeEventListener('keydown', handleModalKeyPress);
    }
}

function handleModalKeyPress(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
}

// Gallery Modal Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close-modal');
    
    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }
    
    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Prevent modal from closing when clicking on the image itself
    const modalContent = document.getElementById('modalImage');
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    // Gallery category animation on scroll
    const galleryCategories = document.querySelectorAll('.gallery-category');
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    galleryCategories.forEach(category => {
        galleryObserver.observe(category);
    });
});

// Intersection Observer for Timeline Items
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe timeline items with staggered animation
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});

// Observe other animated elements
document.querySelectorAll('.company-card, .adventure-card, .insight-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    cardObserver.observe(card);
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced hover effects for cards
document.querySelectorAll('.company-card, .adventure-card, .insight-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth reveal animation for section titles
const sectionTitles = document.querySelectorAll('.section-title, .section-intro');
sectionTitles.forEach((title, index) => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    title.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    titleObserver.observe(title);
});

// Console message for developers
console.log('🚀 CS Industry Immersion Blog loaded successfully!');
console.log('💡 This journey represents the future of Computer Science education');
console.log('🤖 Remember: AI and Machine Learning are the future!');

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Industry Immersion Blog initialized');
    
    // Make CTA buttons functional
    const ctaPrimary = document.querySelector('.cta-primary');
    const ctaSecondary = document.querySelector('.cta-secondary');
    
    if (ctaPrimary) {
        ctaPrimary.addEventListener('click', () => {
            document.querySelector('#journey').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    if (ctaSecondary) {
        ctaSecondary.addEventListener('click', () => {
            document.querySelector('#gallery').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#journey').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements that need animation
    const animateElements = document.querySelectorAll('.timeline-item, .section, .company-card, .adventure-card, .insight-card');
    
    animateElements.forEach((el, index) => {
        // Add staggered delay for timeline items
        if (el.classList.contains('timeline-item')) {
            el.style.transitionDelay = `${index * 0.1}s`;
        }
        observer.observe(el);
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Enhanced scroll animations with better performance
    let ticking = false;

    function updateOnScroll() {
        // Navbar parallax effect
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        // Only update if needed
        if (!ticking) {
            requestAnimationFrame(() => {
                // Add any additional scroll effects here
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', updateOnScroll);

    // Preload animations - show visible elements immediately
    setTimeout(() => {
        const viewportHeight = window.innerHeight;
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < viewportHeight && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }, 100);
});