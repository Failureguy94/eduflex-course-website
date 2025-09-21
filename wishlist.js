// Wishlist Page Functionality
class WishlistPage {
    constructor() {
        this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        this.init();
    }

    init() {
        this.displayWishlist();
        this.updateWishlistCount();
        this.setupEventListeners();
    }

    displayWishlist() {
        const wishlistGrid = document.getElementById('wishlist-grid');
        const emptyWishlist = document.getElementById('empty-wishlist');

        if (this.wishlist.length === 0) {
            emptyWishlist.style.display = 'block';
            return;
        }

        emptyWishlist.style.display = 'none';
        
        // Clear existing content
        wishlistGrid.innerHTML = '';

        this.wishlist.forEach(course => {
            const courseCard = this.createWishlistCourseCard(course);
            wishlistGrid.appendChild(courseCard);
        });
    }

    createWishlistCourseCard(course) {
        const card = document.createElement('div');
        card.className = 'wishlist-course-card';
        card.setAttribute('data-course-id', course.id);

        const stars = this.generateStars(course.rating);

        card.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
                <button class="remove-btn" data-course-id="${course.id}" title="Remove from Wishlist">
                    ×
                </button>
            </div>
            <div class="course-content">
                <h3>${course.title}</h3>
                <div class="course-rating">
                    <div class="stars" data-rating="${course.rating}">
                        ${stars}
                    </div>
                    <span class="rating-text">${course.ratingText}</span>
                </div>
                <div class="course-price">${course.price}</div>
                <a href="course-details.html" class="view-details">View Details</a>
            </div>
        `;

        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<span class="star">★</span>';
        }

        if (hasHalfStar) {
            stars += '<span class="star">☆</span>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<span class="star empty">☆</span>';
        }

        return stars;
    }

    setupEventListeners() {
        // Remove from wishlist buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-btn')) {
                e.stopPropagation();
                const courseId = e.target.getAttribute('data-course-id');
                this.removeFromWishlist(courseId);
            }
        });

        // Course card clicks
        document.addEventListener('click', (e) => {
            const courseCard = e.target.closest('.wishlist-course-card');
            if (courseCard && !e.target.classList.contains('remove-btn')) {
                // Navigate to course details
                window.location.href = 'course-details.html';
            }
        });
    }

    removeFromWishlist(courseId) {
        this.wishlist = this.wishlist.filter(course => course.id !== courseId);
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
        this.displayWishlist();
        this.updateWishlistCount();
        this.showNotification('Removed from wishlist', 'info');
    }

    updateWishlistCount() {
        const countElements = document.querySelectorAll('.wishlist-count');
        countElements.forEach(element => {
            element.textContent = this.wishlist.length;
        });
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

// Initialize wishlist page
document.addEventListener('DOMContentLoaded', function() {
    window.wishlistPage = new WishlistPage();
});
