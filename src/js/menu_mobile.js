document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        // Check if the clicked element is the span or its child (icon)
        if (e.target.tagName.toLowerCase() === 'span' || e.target.closest('span')) {
            e.preventDefault(); // Prevent navigation

            const submenu = this.nextElementSibling;
            // Toggle active state
            submenu.classList.toggle('active');
            this.classList.toggle('active');
        }
        // If the click is on the link text (and not the span), it will navigate naturally
    });
});