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

// Rating and Wishlist System
class RatingWishlistSystem {
    constructor() {
        this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        this.init();
    }

    init() {
        this.setupWishlistButtons();
        this.updateWishlistCount();
        this.loadWishlistState();
    }

    setupWishlistButtons() {
        // Course card wishlist buttons
        const wishlistButtons = document.querySelectorAll('.wishlist-btn');
        wishlistButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = button.getAttribute('data-course-id');
                this.toggleWishlist(courseId, button);
            });
        });

        // Course details wishlist button
        const wishlistButton = document.querySelector('.wishlist-button');
        if (wishlistButton) {
            wishlistButton.addEventListener('click', () => {
                const courseId = wishlistButton.getAttribute('data-course-id');
                this.toggleWishlist(courseId, wishlistButton);
            });
        }

        // Load more reviews button
        const loadMoreBtn = document.getElementById('load-more-reviews');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreReviews();
            });
        }
    }

    toggleWishlist(courseId, button) {
        const courseData = this.getCourseData(courseId);
        
        if (this.isInWishlist(courseId)) {
            this.removeFromWishlist(courseId);
            this.updateButtonState(button, false);
            this.showNotification('Removed from wishlist', 'info');
        } else {
            this.addToWishlist(courseData);
            this.updateButtonState(button, true);
            this.showNotification('Added to wishlist', 'success');
        }
        
        this.updateWishlistCount();
        this.saveWishlist();
    }

    getCourseData(courseId) {
        const courseCard = document.querySelector(`[data-course-id="${courseId}"]`);
        if (!courseCard) return null;

        const title = courseCard.querySelector('h3').textContent;
        const price = courseCard.querySelector('.course-price').textContent;
        const rating = courseCard.querySelector('.stars').getAttribute('data-rating');
        const ratingText = courseCard.querySelector('.rating-text').textContent;
        const image = courseCard.querySelector('img').src;

        return {
            id: courseId,
            title,
            price,
            rating,
            ratingText,
            image
        };
    }

    addToWishlist(courseData) {
        if (!this.isInWishlist(courseData.id)) {
            this.wishlist.push(courseData);
        }
    }

    removeFromWishlist(courseId) {
        this.wishlist = this.wishlist.filter(course => course.id !== courseId);
    }

    isInWishlist(courseId) {
        return this.wishlist.some(course => course.id === courseId);
    }

    updateButtonState(button, isInWishlist) {
        const heartIcon = button.querySelector('.heart-icon');
        const wishlistText = button.querySelector('.wishlist-text');
        
        if (isInWishlist) {
            button.classList.add('active');
            heartIcon.textContent = '♥';
            if (wishlistText) {
                wishlistText.textContent = 'In Wishlist';
            }
        } else {
            button.classList.remove('active');
            heartIcon.textContent = '♡';
            if (wishlistText) {
                wishlistText.textContent = 'Add to Wishlist';
            }
        }
    }

    loadWishlistState() {
        // Update all wishlist buttons based on current wishlist
        const wishlistButtons = document.querySelectorAll('.wishlist-btn, .wishlist-button');
        wishlistButtons.forEach(button => {
            const courseId = button.getAttribute('data-course-id');
            if (courseId) {
                this.updateButtonState(button, this.isInWishlist(courseId));
            }
        });
    }

    updateWishlistCount() {
        const countElements = document.querySelectorAll('.wishlist-count');
        countElements.forEach(element => {
            element.textContent = this.wishlist.length;
        });
        
        // Update localStorage for cross-page synchronization
        localStorage.setItem('wishlistCount', this.wishlist.length.toString());
    }

    saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    }

    loadMoreReviews() {
        const reviewsList = document.getElementById('reviews-list');
        const loadMoreBtn = document.getElementById('load-more-reviews');
        
        // Simulate loading more reviews
        const newReviews = [
            {
                name: 'Sarah Wilson',
                initials: 'SW',
                rating: 5,
                date: '3 weeks ago',
                text: 'Amazing course! The instructor is very knowledgeable and the content is well-structured. I would definitely recommend this to anyone starting their web development journey.'
            },
            {
                name: 'Michael Chen',
                initials: 'MC',
                rating: 4,
                date: '1 month ago',
                text: 'Good course with practical examples. The pace is suitable for beginners and the projects help reinforce the concepts learned.'
            }
        ];

        newReviews.forEach(review => {
            const reviewElement = this.createReviewElement(review);
            reviewsList.appendChild(reviewElement);
        });

        // Hide load more button after loading
        loadMoreBtn.style.display = 'none';
    }

    createReviewElement(review) {
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-item';
        
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        
        reviewDiv.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.initials}</div>
                    <div class="reviewer-details">
                        <h4>${review.name}</h4>
                        <div class="review-rating">
                            ${stars.split('').map(star => `<span class="star">${star}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <span class="review-date">${review.date}</span>
            </div>
            <p class="review-text">${review.text}</p>
        `;
        
        return reviewDiv;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 3000;
            font-weight: 600;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize authentication system
document.addEventListener('DOMContentLoaded', function() {
    window.authSystem = new AuthSystem();
});

// Initialize rating and wishlist system
document.addEventListener('DOMContentLoaded', function() {
    window.ratingWishlistSystem = new RatingWishlistSystem();
});

// Course Enrollment System
class CourseEnrollmentSystem {
    constructor() {
        this.enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
        this.userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        this.init();
    }

    init() {
        this.setupEnrollmentButtons();
        this.updateEnrollmentButtons();
    }

    setupEnrollmentButtons() {
        const enrollButtons = document.querySelectorAll('.enroll-button');
        enrollButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const courseId = button.getAttribute('data-course-id') || '1'; // Default to course 1
                this.enrollInCourse(courseId);
            });
        });
    }

    enrollInCourse(courseId) {
        // Check if user is logged in
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) {
            // Show login modal
            if (window.authSystem) {
                window.authSystem.showModal('login');
            }
            return;
        }

        // Check if already enrolled
        if (this.isEnrolled(courseId)) {
            this.showNotification('You are already enrolled in this course!', 'info');
            return;
        }

        // Get course data
        const courseData = this.getCourseData(courseId);
        if (!courseData) {
            this.showNotification('Course not found!', 'error');
            return;
        }

        // Add to enrolled courses
        const enrollmentData = {
            ...courseData,
            enrolledAt: Date.now(),
            progress: 0
        };

        this.enrolledCourses.push(enrollmentData);
        localStorage.setItem('enrolledCourses', JSON.stringify(this.enrolledCourses));

        // Initialize progress tracking
        this.userProgress[courseId] = {
            percentage: 0,
            hoursWatched: 0,
            lastWatched: null,
            completed: false
        };
        localStorage.setItem('userProgress', JSON.stringify(this.userProgress));

        // Update UI
        this.updateEnrollmentButtons();
        this.showNotification('Successfully enrolled in course!', 'success');

        // Simulate progress update after a delay
        setTimeout(() => {
            this.simulateProgress(courseId);
        }, 2000);
    }

    isEnrolled(courseId) {
        return this.enrolledCourses.some(course => course.id === courseId);
    }

    getCourseData(courseId) {
        // This would normally fetch from a database
        // For now, we'll use static data
        const courses = {
            '1': {
                id: '1',
                title: 'Web Development Fundamentals',
                price: '$19.99',
                rating: '4.5',
                ratingText: '4.5 (128 reviews)',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop'
            },
            '2': {
                id: '2',
                title: 'Data Science & Analytics',
                price: '$29.99',
                rating: '4.8',
                ratingText: '4.8 (95 reviews)',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop'
            },
            '3': {
                id: '3',
                title: 'UI/UX Design Mastery',
                price: '$24.99',
                rating: '4.3',
                ratingText: '4.3 (76 reviews)',
                image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop'
            },
            '4': {
                id: '4',
                title: 'Digital Marketing Strategy',
                price: '$34.99',
                rating: '4.6',
                ratingText: '4.6 (142 reviews)',
                image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop'
            }
        };

        return courses[courseId];
    }

    updateEnrollmentButtons() {
        const enrollButtons = document.querySelectorAll('.enroll-button');
        enrollButtons.forEach(button => {
            const courseId = button.getAttribute('data-course-id') || '1';
            
            if (this.isEnrolled(courseId)) {
                button.textContent = 'Continue Learning';
                button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                button.onclick = () => {
                    this.showNotification('Redirecting to course content...', 'info');
                    // In a real app, this would redirect to the course player
                };
            } else {
                button.textContent = 'Enroll Now';
                button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            }
        });
    }

    simulateProgress(courseId) {
        if (!this.userProgress[courseId]) return;

        // Simulate watching progress
        const progress = this.userProgress[courseId];
        progress.percentage = Math.min(progress.percentage + Math.random() * 20, 100);
        progress.hoursWatched += Math.random() * 2;
        progress.lastWatched = Date.now();

        if (progress.percentage >= 100) {
            progress.completed = true;
            this.showNotification('Congratulations! You completed the course!', 'success');
        }

        localStorage.setItem('userProgress', JSON.stringify(this.userProgress));
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 3000;
            font-weight: 600;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize course enrollment system
document.addEventListener('DOMContentLoaded', function() {
    window.courseEnrollmentSystem = new CourseEnrollmentSystem();
});

// Global wishlist count update function
function updateGlobalWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const countElements = document.querySelectorAll('.wishlist-count');
    countElements.forEach(element => {
        element.textContent = wishlist.length;
    });
}

// Update wishlist count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateGlobalWishlistCount();
});

// Listen for storage changes to update wishlist count across tabs
window.addEventListener('storage', function(e) {
    if (e.key === 'wishlist' || e.key === 'wishlistCount') {
        updateGlobalWishlistCount();
    }
});

// Enhanced Search Functionality
class SearchSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupSearchFunctionality();
    }

    setupSearchFunctionality() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const courseCards = document.querySelectorAll('.course-card');

        if (searchInput && searchBtn && courseCards.length > 0) {
            // Real-time search as user types
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value, courseCards);
            });

            // Search on button click
            searchBtn.addEventListener('click', () => {
                this.performSearch(searchInput.value, courseCards);
            });

            // Search on Enter key
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(searchInput.value, courseCards);
                }
            });
        }
    }

    performSearch(searchTerm, courseCards) {
        const term = searchTerm.toLowerCase().trim();
        
        courseCards.forEach(card => {
            const courseTitle = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const courseDescription = card.querySelector('.course-content p')?.textContent.toLowerCase() || '';
            
            if (courseTitle.includes(term) || courseDescription.includes(term) || term === '') {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });

        // Show no results message if needed
        this.showNoResultsMessage(term, courseCards);
    }

    showNoResultsMessage(searchTerm, courseCards) {
        const coursesSection = document.querySelector('.courses-section');
        let noResultsMsg = document.getElementById('no-results-message');
        
        const visibleCards = Array.from(courseCards).filter(card => 
            card.style.display !== 'none'
        );

        if (searchTerm && visibleCards.length === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-results-message';
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = `
                    <div class="no-results-content">
                        <div class="no-results-icon">🔍</div>
                        <h3>No courses found</h3>
                        <p>Try adjusting your search terms or browse all courses</p>
                        <button class="clear-search-btn" onclick="document.getElementById('search-input').value=''; window.searchSystem.performSearch('', document.querySelectorAll('.course-card'));">Clear Search</button>
                    </div>
                `;
                coursesSection.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}

// Initialize search system
document.addEventListener('DOMContentLoaded', function() {
    window.searchSystem = new SearchSystem();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
