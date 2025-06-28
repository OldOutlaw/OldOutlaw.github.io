// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initHero();
    initPortfolio();
    initTestimonials();
    initScrollEffects();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Hero section functionality
function initHero() {
    const heroVideo = document.querySelector('.hero-video video');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Ensure video plays on load
    if (heroVideo) {
        heroVideo.play().catch(e => {
            console.log('Video autoplay failed:', e);
        });
    }

    // Scroll indicator click
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#portfolio').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Parallax effect for hero content
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// Portfolio filtering functionality
function initPortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Portfolio item hover effects
    portfolioItems.forEach(item => {
        const playButton = item.querySelector('.play-button');
        
        item.addEventListener('mouseenter', function() {
            playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
        });

        item.addEventListener('mouseleave', function() {
            playButton.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        // Portfolio item click (placeholder for video modal)
        item.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            alert(`Video player would open here for: ${title}`);
            // In a real implementation, you would open a video modal here
        });
    });
}

// Testimonials slider functionality
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });

        // Remove active class from all dots
        navDots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current testimonial
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }

        // Activate current dot
        if (navDots[index]) {
            navDots[index].classList.add('active');
        }
    }

    // Navigation dots click handlers
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    const testimonialsContainer = document.querySelector('.testimonials-slider');
    
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        testimonialsContainer.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next testimonial
                    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                } else {
                    // Swipe right - previous testimonial
                    currentTestimonial = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
                }
                showTestimonial(currentTestimonial);
            }
        }
    }
}

// Scroll effects and animations
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.portfolio-item, .service-card, .about-stats, .contact-form');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat h3');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
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

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .portfolio-item,
    .service-card,
    .about-stats,
    .contact-form {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .portfolio-item.animate-in,
    .service-card.animate-in,
    .about-stats.animate-in,
    .contact-form.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .portfolio-item {
        transition-delay: 0.1s;
    }

    .portfolio-item:nth-child(2) {
        transition-delay: 0.2s;
    }

    .portfolio-item:nth-child(3) {
        transition-delay: 0.3s;
    }

    .service-card:nth-child(2) {
        transition-delay: 0.2s;
    }

    .service-card:nth-child(3) {
        transition-delay: 0.4s;
    }
`;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.log('JavaScript error:', e.error);
});

// Performance optimization
window.addEventListener('scroll', debounce(function() {
    // Debounced scroll events are handled in individual functions
}, 10));
