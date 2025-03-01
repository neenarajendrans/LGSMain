// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Handle page loading
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.querySelector('.loader-container').classList.add('hidden');
            document.querySelector('.content') && document.querySelector('.content').classList.add('visible');
        }, 800);
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.textContent = '☰';
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides');
    const slideItems = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    const slideCount = slideItems.length;
    let isTransitioning = false;

    // Clone first and last slide for smooth looping
    const firstClone = slideItems[0].cloneNode(true);
    const lastClone = slideItems[slideCount - 1].cloneNode(true);

    slides.appendChild(firstClone); // Add first slide at the end
    slides.insertBefore(lastClone, slides.firstChild); // Add last slide at the beginning

    let newSlideItems = document.querySelectorAll('.slide'); // Update the slide collection
    let totalSlides = newSlideItems.length;

    // Set initial position
    slides.style.transform = `translateX(-100%)`;

    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;

        slides.style.transition = "transform 0.5s ease-in-out";
        slides.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;

        // Reset transition for seamless looping
        setTimeout(() => {
            if (currentIndex === slideCount) {
                slides.style.transition = "none";
                currentIndex = 0;
                slides.style.transform = `translateX(-100%)`;
            } else if (currentIndex === -1) {
                slides.style.transition = "none";
                currentIndex = slideCount - 1;
                slides.style.transform = `translateX(-${slideCount * 100}%)`;
            }
            isTransitioning = false;
        }, 500);

        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === (currentIndex + slideCount) % slideCount);
        });
    }

    // Navigation buttons
    prevBtn.addEventListener('click', function () {
        currentIndex--;
        updateSlider();
    });

    nextBtn.addEventListener('click', function () {
        currentIndex++;
        updateSlider();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            currentIndex = index;
            updateSlider();
        });
    });

    // Auto-slide functionality
    let slideInterval = setInterval(() => {
        currentIndex++;
        updateSlider();
    }, 3000);

    // Pause auto-slide on hover
    document.querySelector('.slider-container').addEventListener('mouseenter', function () {
        clearInterval(slideInterval);
    });

    document.querySelector('.slider-container').addEventListener('mouseleave', function () {
        slideInterval = setInterval(() => {
            currentIndex++;
            updateSlider();
        }, 3000);
    });
});

