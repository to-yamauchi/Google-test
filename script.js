document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior

            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate position of target element
                // Consider header height if it's fixed/sticky and opaque
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('#main-nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Toggle the .active class on the hamburger icon itself
            hamburger.classList.toggle('active');
            // Toggle the .active class on the navigation menu
            navMenu.classList.toggle('active');

            // Update aria-expanded attribute for accessibility
            const isExpanded = navMenu.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
            if (isExpanded) {
                hamburger.setAttribute('aria-label', 'メニューを閉じる');
            } else {
                hamburger.setAttribute('aria-label', 'メニューを開く');
            }
        });

        // Optional: Close menu when a nav link is clicked (for single-page applications)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.setAttribute('aria-label', 'メニューを開く');
                }
            });
        });
    }
});
