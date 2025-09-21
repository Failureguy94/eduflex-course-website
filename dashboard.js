// Dashboard Functionality
class DashboardSystem {
    constructor() {
        this.currentUser = null;
        this.enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
        this.userProgress = JSON.parse(localStorage.getItem('userProgress') || '{}');
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.updateDashboard();
        this.updateProgressRing();
    }

    loadUserData() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        } else {
            // Redirect to home if not logged in
            window.location.href = 'index.html';
            return;
        }
    }

    setupEventListeners() {
        // Edit profile button
        const editProfileBtn = document.getElementById('edit-profile-btn');
        const editProfileClose = document.getElementById('edit-profile-close');
        const editProfileForm = document.getElementById('edit-profile-form');
        const updateProfileBtn = document.getElementById('update-profile-btn');

        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => this.showEditProfileModal());
        }

        if (editProfileClose) {
            editProfileClose.addEventListener('click', () => this.hideEditProfileModal());
        }

        if (editProfileForm) {
            editProfileForm.addEventListener('submit', (e) => this.handleProfileUpdate(e));
        }

        if (updateProfileBtn) {
            updateProfileBtn.addEventListener('click', () => this.showEditProfileModal());
        }

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('edit-profile-modal');
            if (e.target === modal) {
                this.hideEditProfileModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideEditProfileModal();
            }
        });
    }

    updateDashboard() {
        if (!this.currentUser) return;

        // Update user name in header and profile
        const userNameElements = document.querySelectorAll('#user-name, #profile-name');
        userNameElements.forEach(element => {
            element.textContent = this.currentUser.name;
        });

        // Update email
        const emailElement = document.getElementById('profile-email');
        if (emailElement) {
            emailElement.textContent = this.currentUser.email;
        }

        // Update avatar initial
        const avatarInitial = document.getElementById('avatar-initial');
        if (avatarInitial) {
            avatarInitial.textContent = this.currentUser.name.charAt(0).toUpperCase();
        }

        // Update member since date
        const memberSince = document.getElementById('member-since');
        if (memberSince) {
            const joinDate = new Date(this.currentUser.createdAt || Date.now());
            memberSince.textContent = joinDate.getFullYear();
        }

        // Update course statistics
        this.updateCourseStats();
        this.updateEnrolledCourses();
        this.updateRecentActivity();
        this.updateAchievements();
    }

    updateCourseStats() {
        const coursesEnrolled = document.getElementById('courses-enrolled');
        const coursesCompleted = document.getElementById('courses-completed');
        const learningHours = document.getElementById('learning-hours');

        if (coursesEnrolled) {
            coursesEnrolled.textContent = this.enrolledCourses.length;
        }

        if (coursesCompleted) {
            const completedCount = this.enrolledCourses.filter(course => 
                this.userProgress[course.id] && this.userProgress[course.id].completed
            ).length;
            coursesCompleted.textContent = completedCount;
        }

        if (learningHours) {
            const totalHours = this.enrolledCourses.reduce((total, course) => {
                const progress = this.userProgress[course.id] || { hoursWatched: 0 };
                return total + progress.hoursWatched;
            }, 0);
            learningHours.textContent = Math.round(totalHours);
        }
    }

    updateEnrolledCourses() {
        const enrolledCoursesContainer = document.getElementById('enrolled-courses');
        if (!enrolledCoursesContainer) return;

        if (this.enrolledCourses.length === 0) {
            enrolledCoursesContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📚</div>
                    <h3>No courses enrolled yet</h3>
                    <p>Start your learning journey by enrolling in a course</p>
                    <a href="courses.html" class="cta-button">Browse Courses</a>
                </div>
            `;
            return;
        }

        enrolledCoursesContainer.innerHTML = this.enrolledCourses.map(course => {
            const progress = this.userProgress[course.id] || { percentage: 0, hoursWatched: 0 };
            return `
                <div class="enrolled-course-item">
                    <div class="course-thumbnail">
                        <img src="${course.image}" alt="${course.title}">
                    </div>
                    <div class="course-info">
                        <h4>${course.title}</h4>
                        <div class="course-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progress.percentage}%"></div>
                            </div>
                            <span class="progress-text">${progress.percentage}% Complete</span>
                        </div>
                        <div class="course-stats">
                            <span>${progress.hoursWatched} hours watched</span>
                        </div>
                    </div>
                    <div class="course-actions">
                        <a href="course-details.html" class="continue-btn">Continue</a>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateRecentActivity() {
        const activityContainer = document.getElementById('recent-activity');
        if (!activityContainer) return;

        const activities = this.getRecentActivities();
        
        if (activities.length === 0) {
            activityContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📈</div>
                    <h3>No recent activity</h3>
                    <p>Your learning activity will appear here</p>
                </div>
            `;
            return;
        }

        activityContainer.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <p class="activity-text">${activity.text}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }

    updateAchievements() {
        const achievementsContainer = document.getElementById('achievements');
        if (!achievementsContainer) return;

        const achievements = this.getUserAchievements();
        
        if (achievements.length === 0) {
            achievementsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🏆</div>
                    <h3>No achievements yet</h3>
                    <p>Complete courses to earn achievements</p>
                </div>
            `;
            return;
        }

        achievementsContainer.innerHTML = achievements.map(achievement => `
            <div class="achievement-item">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                    <span class="achievement-date">${achievement.date}</span>
                </div>
            </div>
        `).join('');
    }

    getRecentActivities() {
        const activities = [];
        
        // Add course enrollment activities
        this.enrolledCourses.forEach(course => {
            activities.push({
                icon: '📚',
                text: `Enrolled in "${course.title}"`,
                time: this.formatTimeAgo(course.enrolledAt || Date.now())
            });
        });

        // Add progress activities
        Object.keys(this.userProgress).forEach(courseId => {
            const progress = this.userProgress[courseId];
            if (progress.lastWatched) {
                const course = this.enrolledCourses.find(c => c.id === courseId);
                if (course) {
                    activities.push({
                        icon: '▶️',
                        text: `Watched "${course.title}"`,
                        time: this.formatTimeAgo(progress.lastWatched)
                    });
                }
            }
        });

        // Sort by time and return recent 5
        return activities
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .slice(0, 5);
    }

    getUserAchievements() {
        const achievements = [];
        const completedCourses = this.enrolledCourses.filter(course => 
            this.userProgress[course.id] && this.userProgress[course.id].completed
        );

        if (completedCourses.length >= 1) {
            achievements.push({
                icon: '🎓',
                title: 'First Course Complete',
                description: 'Completed your first course',
                date: 'Recently'
            });
        }

        if (completedCourses.length >= 5) {
            achievements.push({
                icon: '🏆',
                title: 'Learning Champion',
                description: 'Completed 5 courses',
                date: 'Recently'
            });
        }

        return achievements;
    }

    updateProgressRing() {
        const progressRing = document.getElementById('progress-ring');
        const progressPercentage = document.getElementById('progress-percentage');
        
        if (!progressRing || !progressPercentage) return;

        const totalCourses = this.enrolledCourses.length;
        const completedCourses = this.enrolledCourses.filter(course => 
            this.userProgress[course.id] && this.userProgress[course.id].completed
        ).length;

        const percentage = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0;
        const circumference = 2 * Math.PI * 52; // radius = 52
        const offset = circumference - (percentage / 100) * circumference;

        progressRing.style.strokeDashoffset = offset;
        progressPercentage.textContent = Math.round(percentage) + '%';
    }

    showEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Populate form with current user data
            document.getElementById('edit-name').value = this.currentUser.name;
            document.getElementById('edit-email').value = this.currentUser.email;
        }
    }

    hideEditProfileModal() {
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }

    handleProfileUpdate(e) {
        e.preventDefault();
        
        const name = document.getElementById('edit-name').value;
        const email = document.getElementById('edit-email').value;
        const bio = document.getElementById('edit-bio').value;
        const interests = document.getElementById('edit-interests').value;

        // Update user data
        this.currentUser.name = name;
        this.currentUser.email = email;
        this.currentUser.bio = bio;
        this.currentUser.interests = interests;

        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        // Update dashboard
        this.updateDashboard();

        // Hide modal
        this.hideEditProfileModal();

        // Show success message
        this.showNotification('Profile updated successfully!', 'success');
    }

    formatTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInSeconds = Math.floor((now - time) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        return `${Math.floor(diffInSeconds / 2592000)} months ago`;
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

// Initialize dashboard system
document.addEventListener('DOMContentLoaded', function() {
    window.dashboardSystem = new DashboardSystem();
});
