document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Here you would typically send the email to your server or newsletter service
                // For this example, we'll just show a success message
                showNotification('Success! You have been subscribed to our newsletter.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // Comment Form Submission
    const commentForm = document.getElementById('comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const commentInput = this.querySelector('#comment');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const comment = commentInput.value.trim();
            
            if (name && validateEmail(email) && comment) {
                // Here you would typically send the comment to your server
                // For this example, we'll just show a success message
                showNotification('Your comment has been submitted and is awaiting moderation.', 'success');
                nameInput.value = '';
                emailInput.value = '';
                commentInput.value = '';
            } else {
                showNotification('Please fill in all required fields correctly.', 'error');
            }
        });
    }
    
    // Reply Links
    const replyLinks = document.querySelectorAll('.reply-link');
    
    replyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const commentForm = document.getElementById('comment-form');
            const commenterName = this.closest('.comment-content').querySelector('.commenter-name').textContent;
            
            // Scroll to comment form
            commentForm.scrollIntoView({ behavior: 'smooth' });
            
            // Add @username to comment textarea
            const commentTextarea = commentForm.querySelector('#comment');
            commentTextarea.value = `@${commenterName} `;
            commentTextarea.focus();
        });
    });
    
    // Sticky Header on Scroll
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Lazy Load Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // Helper Functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide and remove notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // Add notification styles if they don't exist
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                transform: translateY(100px);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                max-width: 300px;
            }
            
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
            
            .notification.success {
                background-color: var(--success-color, #28a745);
            }
            
            .notification.error {
                background-color: var(--danger-color, #dc3545);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add ad tracking (placeholder for actual ad tracking code)
    function trackAdImpressions() {
        const adPlaceholders = document.querySelectorAll('.ad-placeholder');
        
        if (adPlaceholders.length > 0) {
            console.log(`Tracked ${adPlaceholders.length} ad impressions`);
            // In a real implementation, you would send this data to your analytics service
        }
    }
    
    // Track ad impressions when page loads
    trackAdImpressions();
});