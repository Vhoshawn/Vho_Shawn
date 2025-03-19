// Main JavaScript for animations and interactivity

// Navigation bar effects
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');

// Mobile menu toggle
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing effect
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing animation after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// Intersection Observer for animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observe all animated elements
document.querySelectorAll('.skill-card, .project-card').forEach(item => {
    item.classList.remove('animate__fadeInUp');
    observer.observe(item);
});

// GSAP Animations for enhanced interactivity
if (typeof gsap !== 'undefined') {
    // Animate hero section
    gsap.from('.hero-content h1', { duration: 1, y: 50, opacity: 0, delay: 0.2 });
    gsap.from('.hero-content p', { duration: 1, y: 50, opacity: 0, delay: 0.5 });
    gsap.from('.hero-buttons', { duration: 1, y: 50, opacity: 0, delay: 0.8 });
    
    // Animate section headings
    gsap.utils.toArray('section h2').forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: 'top 80%'
            },
            duration: 1,
            y: 30,
            opacity: 0
        });
    });
    
    // Animate skill progress bars
    gsap.utils.toArray('.skill-progress').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%'
            },
            width: width,
            duration: 1.5,
            ease: 'power2.out'
        });
    });
}

// Form validation for contact page
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let valid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Reset error states
        [nameInput, emailInput, messageInput].forEach(input => {
            input.classList.remove('error');
        });
        
        // Validate name
        if (!nameInput.value.trim()) {
            nameInput.classList.add('error');
            valid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('error');
            valid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            messageInput.classList.add('error');
            valid = false;
        }
        
        if (valid) {
            // In a real implementation, you would send this data to a server
            // For now, just show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thanks for your message! I\'ll get back to you soon.';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        }
    });
}

// Dynamic year for copyright
const copyrightYear = document.querySelector('.copyright p');
if (copyrightYear) {
    const year = new Date().getFullYear();
    copyrightYear.textContent = `© ${year} Shawn Olivier. All rights reserved.`;
}
