document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position for fixed header
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Product Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-brand') === filterValue) {
                        card.style.display = 'block';
                        // Add slight animation
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // WhatsApp Direct Order Logic
    const whatsappNumber = "919962919929"; // Removed '+' for wa.me link
    const whatsappButtons = document.querySelectorAll('.whatsapp-order');

    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            
            // Format the message
            const message = `Hello CITYMOBILE! I am interested in purchasing the *${productName}* priced at *${productPrice}*. Is it currently available?`;
            
            // Encode the message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Create WhatsApp API link
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open in new tab
            window.open(whatsappUrl, '_blank');
        });
    });
});

// Add fade-in animation keyframes dynamically if not in CSS
if (!document.getElementById('dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}
