document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Animation
    const loaderBar = document.getElementById('loader-bar');
    const loader = document.getElementById('loader');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    loader.style.display = 'none';
                    initAnimations(); // Start animations after loader hides
                }, 500);
            }, 300);
        }
        loaderBar.style.width = `${progress}%`;
    }, 150);

    // 2. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-times', 'fa-bars');
            }
            
            // Highlight active link
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // 3. Navbar Sticky Effect on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 4. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Product Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-brand') === filterValue) {
                        card.style.display = 'block';
                        // Simple re-trigger of animation
                        card.style.animation = 'none';
                        card.offsetHeight; // trigger reflow
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh(); // Refresh GSAP triggers
                }
            });
        });
    }

    // 6. WhatsApp Direct Order
    const whatsappNumber = "919962919929";
    document.querySelectorAll('.whatsapp-order').forEach(btn => {
        btn.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            
            const message = `Hello CITYMOBILE! I am interested in purchasing the *${productName}* priced at *${productPrice}*. Is it currently available?`;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        });
    });

    // 7. Swiper Initialization (Reviews)
    if (document.querySelector('.reviewsSlider')) {
        new Swiper('.reviewsSlider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                }
            }
        });
    }

    // 8. Countdown Timer
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        let time = 12 * 3600 + 45 * 60 + 30; // 12:45:30 in seconds
        setInterval(() => {
            time--;
            let h = Math.floor(time / 3600);
            let m = Math.floor((time % 3600) / 60);
            let s = time % 60;
            
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            
            countdownEl.innerText = `${h}:${m}:${s}`;
            if(time <= 0) time = 86400; // Reset
        }, 1000);
    }

    // 9. Particles.js Initialization
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#FF2D2D" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#FF2D2D",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // Add keyframes for filtering animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
                
                // Refresh ScrollTrigger after transition for layout adjustments
                setTimeout(() => {
                    if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                }, 350);
            });
        });
    }

    // 10. GSAP Animations Initialization Function
    function initAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
        
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animations
        gsap.from(".hero-text h2", { opacity: 0, y: 20, duration: 0.8, delay: 0.2 });
        gsap.from(".hero-text h1", { opacity: 0, y: 30, duration: 0.8, delay: 0.4 });
        gsap.from(".hero-text p", { opacity: 0, y: 20, duration: 0.8, delay: 0.6 });
        gsap.from(".hero-buttons", { opacity: 0, y: 20, duration: 0.8, delay: 0.8 });
        
        // Floating animation for Hero Image
        gsap.to(".hero-image img", {
            y: -20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Scroll Reveal Animations
        const revealElements = document.querySelectorAll('.gs-reveal');
        revealElements.forEach((el) => {
            gsap.fromTo(el, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1, 
                    y: 0, 
                    duration: 0.8, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%", // when top of element hits 85% of viewport
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Right side reveal
        const revealRightElements = document.querySelectorAll('.gs-reveal-right');
        revealRightElements.forEach((el) => {
            gsap.fromTo(el, 
                { opacity: 0, x: 50 },
                {
                    opacity: 1, 
                    x: 0, 
                    duration: 0.8, 
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    // 11. 3D Tilt & Shine Reflection Effect
    const tiltCards = document.querySelectorAll('.product-card, .brand-card, .acc-card, .offer-card, .service-item, .review-card');
    tiltCards.forEach(card => {
        // Create shine overlay element if it doesn't exist
        let shine = card.querySelector('.card-shine');
        if (!shine) {
            shine = document.createElement('div');
            shine.className = 'card-shine';
            card.appendChild(shine);
        }
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = (x - xc) / xc;
            const dy = (y - yc) / yc;
            
            // Limit tilt angle to max 8 degrees for micro-interaction feel
            const tiltX = -dy * 8;
            const tiltY = dx * 8;
            
            // Set 3D transform with slight scale and lift
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
            
            // Update shine gradient position
            const px = (x / rect.width) * 100;
            const py = (y / rect.height) * 100;
            shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`;
            shine.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            // Restore smooth transitions on exit
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease, border-color 0.3s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
            shine.style.opacity = '0';
        });
    });
});
