// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const profileModal = document.getElementById('profileModal');
    const workModal = document.getElementById('workModal');
    
    // Get button elements
    const profileBtn = document.querySelector('.btn-outline');
    const workBtn = document.querySelector('.btn-primary');
    
    // Get close buttons
    const closeButtons = document.querySelectorAll('.close');
    
    // Open Profile Modal
    profileBtn.addEventListener('click', function() {
        profileModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Open Work Modal
    workBtn.addEventListener('click', function() {
        workModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modals when clicking the close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            profileModal.style.display = 'none';
            workModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modals when clicking outside of them
    window.addEventListener('click', function(event) {
        if (event.target === profileModal) {
            profileModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === workModal) {
            workModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    scrollIndicator.addEventListener('click', function() {
        const servicesSection = document.querySelector('.services');
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Add active state to buttons
    const buttons = document.querySelectorAll('.btn-outline, .btn-primary');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
