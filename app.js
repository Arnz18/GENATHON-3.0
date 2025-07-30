// Genathon 3.0 - Interactive JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initBinaryBackground();
    // initSmoothScroll();
    initGSAPAnimations();
    initFormValidation();
    initMobileMenu();
    initNavigation();
    initIntersectionObserver();
    
    console.log('🚀 Genathon 3.0 initialized successfully!');
});

// Binary Background Animation
function initBinaryBackground() {
    const canvas = document.getElementById('binaryCanvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Create binary particles
    function createParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 1000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                originalX: 0,
                originalY: 0,
                vx: 0,
                vy: 0,
                char: Math.random() > 0.5 ? '1' : '0',
                opacity: 0.3 + Math.random() * 0.2,
                size: 12 + Math.random() * 4
            });
        }
        
        // Store original positions
        particles.forEach(particle => {
            particle.originalX = particle.x;
            particle.originalY = particle.y;
        });
    }
    
    // Animate particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Calculate distance from mouse
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;
            
            if (distance < maxDistance && isMouseMoving) {
                // Push particles away from mouse
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(dy, dx);
                particle.vx = -Math.cos(angle) * force * 3;
                particle.vy = -Math.sin(angle) * force * 3;
                particle.opacity = 0.8;
            } else {
                // Return to original position
                const returnForce = 0.05;
                particle.vx += (particle.originalX - particle.x) * returnForce;
                particle.vy += (particle.originalY - particle.y) * returnForce;
                particle.vx *= 0.9;
                particle.vy *= 0.9;
                particle.opacity = Math.max(0.3, particle.opacity - 0.01);
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Draw particle
            ctx.font = `${particle.size}px 'Courier New', monospace`;
            ctx.fillStyle = `rgba(170, 170, 170, ${particle.opacity})`;
            ctx.fillText(particle.char, particle.x, particle.y);
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    // Mouse tracking
    let mouseTimeout;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });
    
    // Initialize canvas
    resizeCanvas();
    createParticles();
    animateParticles();
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// Smooth Scrolling with Lenis
function initSmoothScroll() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Update GSAP ScrollTrigger
    lenis.on('scroll', () => {
        if (window.ScrollTrigger) {
            ScrollTrigger.update();
        }
    });
}

// GSAP Animations
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl
        .from('.logo-container h1', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.version-number', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.7')
        .from('.logo-container + div', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.bg-white\\/5', {
            duration: 1.2,
            x: 50,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.8');
    
    // Stats section animation
    gsap.fromTo('.stat-item', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.stats-bg',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Why Participate cards animation
    gsap.fromTo('.floating-card', {
        y: 100,
        opacity: 0,
        rotationX: 45
    }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.floating-card',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Guidelines section animation
    gsap.fromTo('.guideline-item', {
        y: 50,
        opacity: 0,
        scale: 0.9
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.guideline-item',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Navigation dot animations
    gsap.fromTo('.nav-icon', {
        x: -20,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 2
    });
}

// Form Validation and Submission
function initFormValidation() {
    const form = document.getElementById('registrationForm');
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    if (!form || !modal || !closeModalBtn) {
        console.error('Form elements not found');
        return;
    }
    
    // Form field validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'First name must contain only letters'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Last name must contain only letters'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: true,
            pattern: /^[\+]?[1-9][\d]{0,15}$/,
            message: 'Please enter a valid phone number'
        },
        age: {
            required: true,
            min: 16,
            max: 99,
            message: 'Age must be between 16 and 99'
        },
        college: {
            required: true,
            minLength: 3,
            message: 'Please enter your college/institute name'
        },
        linkedin: {
            required: true,
            pattern: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
            message: 'Please enter a valid LinkedIn URL'
        },
        level: {
            required: true,
            message: 'Please select your level of study'
        },
        country: {
            required: true,
            minLength: 2,
            message: 'Please enter your country of residence'
        }
    };
    
    // Validate individual field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return { isValid: true };
        
        // Required check
        if (rules.required && (!value || value.trim() === '')) {
            return { isValid: false, message: `${fieldName} is required` };
        }
        
        // Skip further validation if field is empty and not required
        if (!value || value.trim() === '') {
            return { isValid: true };
        }
        
        // Length validation
        if (rules.minLength && value.length < rules.minLength) {
            return { isValid: false, message: `${fieldName} must be at least ${rules.minLength} characters` };
        }
        
        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            return { isValid: false, message: rules.message };
        }
        
        // Number validation
        if (rules.min !== undefined || rules.max !== undefined) {
            const num = parseFloat(value);
            if (isNaN(num)) {
                return { isValid: false, message: `${fieldName} must be a number` };
            }
            if (rules.min !== undefined && num < rules.min) {
                return { isValid: false, message: rules.message };
            }
            if (rules.max !== undefined && num > rules.max) {
                return { isValid: false, message: rules.message };
            }
        }
        
        return { isValid: true };
    }
    
    // Show field error
    function showFieldError(fieldName, message) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;
        
        const formGroup = field.closest('.grid > div') || field.parentElement;
        
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        
        // Remove existing error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
    
    // Show field success
    function showFieldSuccess(fieldName) {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (!field) return;
        
        const formGroup = field.closest('.grid > div') || field.parentElement;
        
        formGroup.classList.add('success');
        formGroup.classList.remove('error');
        
        // Remove error message
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Real-time validation
    form.addEventListener('input', (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;
        
        if (validationRules[fieldName]) {
            const validation = validateField(fieldName, value);
            if (validation.isValid) {
                showFieldSuccess(fieldName);
            } else {
                showFieldError(fieldName, validation.message);
            }
        }
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Form submitted:', data);
        
        // Validate all fields
        let isFormValid = true;
        const errors = {};
        
        Object.keys(validationRules).forEach(fieldName => {
            const validation = validateField(fieldName, data[fieldName]);
            if (!validation.isValid) {
                errors[fieldName] = validation.message;
                showFieldError(fieldName, validation.message);
                isFormValid = false;
            } else {
                showFieldSuccess(fieldName);
            }
        });
        
        if (!isFormValid) {
            console.log('Form validation failed:', errors);
            // Scroll to first error
            const firstError = form.querySelector('.error .form-input');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Registering...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            console.log('Registration successful, showing modal');
            
            // Show success modal
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
            modal.classList.add('show');
            
            // Reset form
            form.reset();
            
            // Remove all validation states
            form.querySelectorAll('.error, .success').forEach(el => {
                el.classList.remove('error', 'success');
            });
            form.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Track event (if analytics is available)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'registration_submit', {
                    event_category: 'form',
                    event_label: 'genathon_registration'
                });
            }
            
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        } finally {
            // Reset button state
            submitBtn.classList.remove('btn-loading');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
    
    // Close modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modal.classList.add('hidden');
        modal.classList.remove('show');
    });
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
            modal.classList.remove('show');
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
            modal.classList.remove('show');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    
    if (!mobileMenuBtn || !mobileMenu) {
        console.error('Mobile menu elements not found');
        return;
    }
    
    let isMenuOpen = false;
    
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Animate menu items
            if (window.gsap) {
                gsap.fromTo('.mobile-menu-link', {
                    y: 30,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power3.out'
                });
            }
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.style.display = 'none';
            document.body.style.overflow = '';
        }
        
        // Update button icon
        const icon = mobileMenuBtn.querySelector('svg');
        if (icon) {
            if (isMenuOpen) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        }
    }
    
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking on links
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            toggleMenu();
        }
    });
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-icon, .mobile-menu-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offset = 80; // Account for any fixed headers
                    const targetPosition = targetElement.offsetTop - offset;
                    
                    // Use smooth scrolling
                    if (window.lenis) {
                        window.lenis.scrollTo(targetPosition);
                    } else {
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
    
    // Update active navigation based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Update navigation active state
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttle scroll event
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveNav, 10);
    });
    
    updateActiveNav(); // Initial call
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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

// Performance optimizations
function optimizePerformance() {
    // Preload critical resources
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
    
    // Lazy load non-critical resources
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Load non-critical scripts here
        });
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Track error if analytics is available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.message,
            fatal: false
        });
    }
});

// Initialize performance optimizations
optimizePerformance();

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Navigate with arrow keys when focused on nav items
    if (e.target.classList.contains('nav-icon')) {
        const navItems = Array.from(document.querySelectorAll('.nav-icon'));
        const currentIndex = navItems.indexOf(e.target);
        
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : navItems.length - 1;
                navItems[prevIndex].focus();
                break;
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = currentIndex < navItems.length - 1 ? currentIndex + 1 : 0;
                navItems[nextIndex].focus();
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                e.target.click();
                break;
        }
    }
});

// Accessibility improvements
function initAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
    }
    
    // Announce page changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.id = 'announcer';
    document.body.appendChild(announcer);
}

// Initialize accessibility features
initAccessibility();

// Store Lenis instance globally for navigation use
let lenisInstance = null;

// Override smooth scroll initialization to store instance
function initSmoothScroll() {
    lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });
    
    function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Update GSAP ScrollTrigger
    lenisInstance.on('scroll', () => {
        if (window.ScrollTrigger) {
            ScrollTrigger.update();
        }
    });
    
    // Store globally
    window.lenis = lenisInstance;
}

// Export functions for potential external use
window.GenathonApp = {
    initBinaryBackground,
    initSmoothScroll,
    initGSAPAnimations,
    initFormValidation,
    initMobileMenu,
    initNavigation
};