
// --- Global Elements ---
const progressBar = document.getElementById('progressBar');
const navBreadcrumbs = document.querySelector('.nav-breadcrumbs');
const breadcrumbItems = document.querySelectorAll('.breadcrumb-item');
const sections = document.querySelectorAll('.section');
const bootSequence = document.getElementById('bootSequence');
const mainContainer = document.querySelector('.main-container');
const typingTextElement = document.getElementById('typingText');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const konamiTrigger = document.querySelector('.konami-trigger');

// --- Utility Functions ---
const throttle = (func, limit) => {
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
};

const updateProgressBar = () => {
    const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollPx / scrollTotal) * 100;
    progressBar.style.width = scrolled + '%';
};

const activateBreadcrumb = () => {
    let currentActive = null;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - window.innerHeight / 3 && 
            window.scrollY < sectionTop + sectionHeight - window.innerHeight / 3) {
            currentActive = section.id;
        }
    });

    breadcrumbItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.target === currentActive) {
            item.classList.add('active');
        }
    });
};

// --- Boot Sequence ---
const startBootSequence = () => {
    const bootTexts = document.querySelectorAll('.boot-text');
    bootTexts.forEach((text, index) => {
        text.style.animationDelay = `${0.5 + index * 0.5}s`;
    });
    setTimeout(() => {
        bootSequence.style.animation = 'fadeOut 1s ease-out forwards';
        mainContainer.style.animation = 'fadeInMain 1s ease-out forwards';
    }, 3500); // Allow all boot texts to display before fading out
};

// --- Typing Effect ---
const phrases = [
    "> whoami",
    "Dean Reight F. Billedo",
    "> status",
    "Online",
    "> mission",
    "Just keep learning"
];
let phraseIndex = 0;
let charIndex = 0;
const typingSpeed = 50; // milliseconds per character
const pauseTime = 1000; // milliseconds pause after line
const lineBreak = "<br>";
const cursor = `<span class="typing-cursor">_</span>`; // Custom cursor if needed

function typeWriter() {
    if (phraseIndex < phrases.length) {
        const currentPhrase = phrases[phraseIndex];
        if (charIndex < currentPhrase.length) {
            typingTextElement.innerHTML = typingTextElement.innerHTML.slice(0, typingTextElement.innerHTML.lastIndexOf('<br>') === -1 ? 0 : typingTextElement.innerHTML.lastIndexOf('<br>')) + currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            typingTextElement.innerHTML += lineBreak; // Add line break after each phrase
            charIndex = 0;
            phraseIndex++;
            setTimeout(typeWriter, pauseTime);
        }
    } else {
        // All phrases typed, reset or stop
        typingTextElement.style.borderRight = 'none'; // Remove blinking cursor
    }
}


// --- Matrix Background ---
const generateMatrixBackground = () => {
    const matrixBg = document.getElementById('matrixBg');
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+{}":?><;.,';
    const numColumns = Math.floor(window.innerWidth / 15); // Adjust character width

    for (let i = 0; i < numColumns; i++) {
        const column = document.createElement('div');
        column.classList.add('matrix-column');
        column.style.left = `${Math.random() * 100}%`;
        column.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5-10 seconds
        column.style.animationDelay = `-${Math.random() * 5}s`; // Stagger animation start

        let columnText = '';
        for (let j = 0; j < 50; j++) { // Number of characters in a column
            columnText += chars[Math.floor(Math.random() * chars.length)] + '<br>';
        }
        column.innerHTML = columnText;
        matrixBg.appendChild(column);
    }
};

// --- Skills Progress Animation ---
const animateSkillBars = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const level = bar.dataset.level;
                bar.style.width = `${level}%`;
            });
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkillBars, {
    root: null,
    threshold: 0.1 // Trigger when 10% of the section is visible
});


// --- Konami Code Easter Egg ---
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

const handleKonamiCode = (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            console.log('Konami Code Activated! 🚀');
            alert('Easter Egg Unlocked! Welcome to the secret level, Agent.');
            // Example effect: change primary glow color temporarily
            document.documentElement.style.setProperty('--primary-glow', '#ff69b4'); // Hot pink!
            setTimeout(() => {
                document.documentElement.style.setProperty('--primary-glow', '#00f2ff'); // Revert
            }, 5000);
            konamiIndex = 0; // Reset for next time
        }
    } else {
        konamiIndex = 0; // Reset if incorrect key is pressed
    }
};

// --- Event Listeners and Initializers ---
document.addEventListener('DOMContentLoaded', () => {
    startBootSequence();
    generateMatrixBackground();
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Delay main content animations to start after boot sequence fades
    setTimeout(() => {
        typingTextElement.innerHTML = ''; // Clear initial text
        typeWriter();
    }, 5500); // 4s for fadeOut + 1.5s additional delay

    // Observe the skills section for animation
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    // Konami code listener
    document.addEventListener('keydown', handleKonamiCode);
});

window.addEventListener('scroll', throttle(() => {
    updateProgressBar();
    activateBreadcrumb();
}, 50)); // Throttle scroll events for performance

// Breadcrumb click handlers
navBreadcrumbs.addEventListener('click', (e) => {
    if (e.target.classList.contains('breadcrumb-item')) {
        const targetId = e.target.dataset.target;
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Trigger on click for trigger element
konamiTrigger.addEventListener('click', () => {
    alert('Hint: A legendary sequence of keys. Try "Up, Up, Down, Down, Left, Right, Left, Right, B, A".');
});

// --- Contact Form Submission ---
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const form = event.target;
            const formData = new FormData(form);
            const formspreeEndpoint = form.action; // Get the action URL from the form

            // Set initial status and disable button
            formStatus.style.color = 'var(--tertiary-glow)';
            formStatus.textContent = 'TRANSMISSION INITIATED...';
            submitBtn.disabled = true;
            submitBtn.textContent = 'SENDING...';

            try {
                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Formspree expects this header
                    }
                });

                if (response.ok) {
                    formStatus.style.color = 'var(--success-green)';
                    formStatus.textContent = 'TRANSMISSION RECEIVED. Thank you for your message!';
                    form.reset(); // Clear the form fields
                } else {
                    const data = await response.json();
                    if (data && data.errors) {
                        formStatus.style.color = 'var(--error-red)';
                        formStatus.textContent = `ERROR: ${data.errors.map(err => err.message).join(', ')}`;
                    } else {
                        formStatus.style.color = 'var(--error-red)';
                        formStatus.textContent = 'ERROR: Unable to send transmission. Please try again.';
                    }
                }
            } catch (error) {
                formStatus.style.color = 'var(--error-red)';
                formStatus.textContent = 'SYSTEM ERROR: Network issue or invalid endpoint. Please check console.';
                console.error('Submission error:', error);
            } finally {
                // Re-enable button after a short delay for user to read message
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'SEND_TRANSMISSION';
                    // Optionally clear status message after a bit longer
                    // setTimeout(() => { formStatus.textContent = ''; }, 5000);
                }, 2000); // 2 seconds
            }
        });
    }
});