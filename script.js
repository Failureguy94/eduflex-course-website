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

// Initialize rating and wishlist system
document.addEventListener('DOMContentLoaded', function() {
    window.ratingWishlistSystem = new RatingWishlistSystem();
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