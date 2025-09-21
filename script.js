// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
});

// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            
            // Reset previous error messages
            nameError.textContent = '';
            emailError.textContent = '';
            
            // Remove error styling
            nameInput.style.borderColor = '#ddd';
            emailInput.style.borderColor = '#ddd';
            
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                nameError.textContent = 'Name is required';
                nameInput.style.borderColor = '#e74c3c';
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required';
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email address';
                emailInput.style.borderColor = '#e74c3c';
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                showSuccessMessage();
                contactForm.reset();
            }
        });
    }
});

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success message
function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            background-color: #27ae60;
            color: white;
            padding: 15px;
            border-radius: 5px;
            margin-top: 1rem;
            text-align: center;
            font-weight: 600;
        ">
            ✓ Thank you! Your message has been sent successfully.
        </div>
    `;
    
    // Insert success message after the form
    const formContainer = document.querySelector('.contact-form-container');
    formContainer.appendChild(successMessage);
    
    // Remove success message after 5 seconds
    setTimeout(function() {
        successMessage.remove();
    }, 5000);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Simple search functionality for courses page
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (searchInput && searchBtn && courseCards.length > 0) {
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            courseCards.forEach(card => {
                const courseTitle = card.querySelector('h3').textContent.toLowerCase();
                
                if (courseTitle.includes(searchTerm) || searchTerm === '') {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// Add loading animation for buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button, .enroll-button, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.opacity = '0.7';
            this.style.cursor = 'not-allowed';
            
            // Reset after 2 seconds (simulate loading)
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
                this.style.cursor = 'pointer';
            }, 2000);
        });
    });
});

// Add scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe course cards for animation
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe sections for animation
    const sections = document.querySelectorAll('.course-info, .contact-info, .contact-form-container, .about-content');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing animation to hero title
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-content h1');
    
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Add smooth reveal animation for course cards on hover
document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        });
    });
});

// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadUserFromStorage();
        this.setupEventListeners();
        this.updateUI();
    }

    setupEventListeners() {
        // Modal triggers
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');
        const logoutBtn = document.getElementById('logout-btn');

        if (loginBtn) loginBtn.addEventListener('click', () => this.showModal('login'));
        if (registerBtn) registerBtn.addEventListener('click', () => this.showModal('register'));
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());

        // Modal close buttons
        const loginClose = document.getElementById('login-close');
        const registerClose = document.getElementById('register-close');

        if (loginClose) loginClose.addEventListener('click', () => this.hideModal('login'));
        if (registerClose) registerClose.addEventListener('click', () => this.hideModal('register'));

        // Modal switch links
        const switchToRegister = document.getElementById('switch-to-register');
        const switchToLogin = document.getElementById('switch-to-login');

        if (switchToRegister) switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('login');
            this.showModal('register');
        });

        if (switchToLogin) switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('register');
            this.showModal('login');
        });

        // Form submissions
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        if (loginForm) loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        if (registerForm) registerForm.addEventListener('submit', (e) => this.handleRegister(e));

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal('login');
                this.hideModal('register');
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal('login');
                this.hideModal('register');
            }
        });
    }

    showModal(type) {
        const modal = document.getElementById(`${type}-modal`);
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(type) {
        const modal = document.getElementById(`${type}-modal`);
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
            this.clearForm(type);
        }
    }

    clearForm(type) {
        const form = document.getElementById(`${type}-form`);
        if (form) {
            form.reset();
            this.clearErrors(type);
        }
    }

    clearErrors(type) {
        const errorElements = document.querySelectorAll(`#${type}-form .error-message`);
        const inputElements = document.querySelectorAll(`#${type}-form input`);
        
        errorElements.forEach(error => error.textContent = '');
        inputElements.forEach(input => input.classList.remove('error'));
    }

    showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) errorElement.textContent = message;
        if (inputElement) inputElement.classList.add('error');
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        this.clearErrors('login');
        
        let isValid = true;
        
        if (!email) {
            this.showError('login-email', 'Email is required');
            isValid = false;
        } else if (!this.validateEmail(email)) {
            this.showError('login-email', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!password) {
            this.showError('login-password', 'Password is required');
            isValid = false;
        } else if (!this.validatePassword(password)) {
            this.showError('login-password', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (isValid) {
            await this.performLogin(email, password);
        }
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const termsAgreed = document.getElementById('terms-agreement').checked;
        
        this.clearErrors('register');
        
        let isValid = true;
        
        if (!name.trim()) {
            this.showError('register-name', 'Full name is required');
            isValid = false;
        }
        
        if (!email) {
            this.showError('register-email', 'Email is required');
            isValid = false;
        } else if (!this.validateEmail(email)) {
            this.showError('register-email', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!password) {
            this.showError('register-password', 'Password is required');
            isValid = false;
        } else if (!this.validatePassword(password)) {
            this.showError('register-password', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (!confirmPassword) {
            this.showError('register-confirm-password', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            this.showError('register-confirm-password', 'Passwords do not match');
            isValid = false;
        }
        
        if (!termsAgreed) {
            alert('Please agree to the Terms of Service');
            isValid = false;
        }
        
        if (isValid) {
            await this.performRegister(name, email, password);
        }
    }

    async performLogin(email, password) {
        try {
            // Simulate API call
            await this.simulateDelay();
            
            // Check if user exists in localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                this.currentUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
                
                this.saveUserToStorage();
                this.updateUI();
                this.hideModal('login');
                this.showSuccessMessage('Login successful! Welcome back!');
            } else {
                this.showError('login-password', 'Invalid email or password');
            }
        } catch (error) {
            this.showError('login-password', 'Login failed. Please try again.');
        }
    }

    async performRegister(name, email, password) {
        try {
            // Simulate API call
            await this.simulateDelay();
            
            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const existingUser = users.find(u => u.email === email);
            
            if (existingUser) {
                this.showError('register-email', 'Email already registered');
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name: name,
                email: email,
                password: password,
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            this.currentUser = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            };
            
            this.saveUserToStorage();
            this.updateUI();
            this.hideModal('register');
            this.showSuccessMessage('Registration successful! Welcome to EduFlex!');
        } catch (error) {
            this.showError('register-email', 'Registration failed. Please try again.');
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUI();
        this.showSuccessMessage('Logged out successfully!');
    }

    updateUI() {
        const authButtons = document.getElementById('auth-buttons');
        const userMenu = document.getElementById('user-menu');
        
        if (this.currentUser) {
            if (authButtons) authButtons.style.display = 'none';
            if (userMenu) userMenu.style.display = 'flex';
        } else {
            if (authButtons) authButtons.style.display = 'flex';
            if (userMenu) userMenu.style.display = 'none';
        }
    }

    saveUserToStorage() {
        if (this.currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
    }

    loadUserFromStorage() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    showSuccessMessage(message) {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = message;
        successMessage.style.position = 'fixed';
        successMessage.style.top = '100px';
        successMessage.style.right = '20px';
        successMessage.style.zIndex = '3000';
        successMessage.style.maxWidth = '300px';
        
        document.body.appendChild(successMessage);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }

    simulateDelay() {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
}

// Initialize authentication system
document.addEventListener('DOMContentLoaded', function() {
    window.authSystem = new AuthSystem();
});