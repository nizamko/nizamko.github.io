document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const mainHeader = document.querySelector('.main-header');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        // If the menu toggle itself has a class for its animation (e.g., 'active' or 'fa-times')
        // Based on the CSS, the 'active' class is toggled on menuToggle for the bars animation.
        // If you were using font-awesome icons that change (like fa-bars to fa-times), you'd use:
        // this.classList.toggle('fa-times');
        // But since you're using spans, the 'active' class on menuToggle is enough for CSS animation.
        menuToggle.classList.toggle('active'); 
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) { // Only close if mobile menu is open
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active'); // Ensure menu toggle icon resets
            }
        });
    });

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.animated-element');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view'); // Using 'in-view' as per CSS
            } else {
                // Optional: Remove 'in-view' when not intersecting, if re-animation on scroll-back is desired
                // entry.target.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.1 // Adjust as needed: 0.1 means 10% of element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position considering FIXED header height
                const headerOffset = mainHeader.offsetHeight; // Get dynamic header height
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                // Subtract header height and a little extra padding for better visual alignment
                const offsetPosition = elementPosition - headerOffset - 20; 

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header on scroll (adds 'scrolled' class)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // Initial check for scroll position for header style on page load
    if (window.scrollY > 0) {
        mainHeader.classList.add('scrolled');
    }
});