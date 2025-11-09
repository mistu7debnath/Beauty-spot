// Remove references to non-existent navbar elements

let searchForm = document.querySelector('.search-form');

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navContainer = document.querySelector('.nav-container');

if (mobileMenuBtn && navContainer) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navContainer.classList.toggle('active');
  });

  // Close mobile menu when clicking nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navContainer.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navContainer.contains(e.target)) {
      mobileMenuBtn.classList.remove('active');
      navContainer.classList.remove('active');
    }
  });
}

// Enhanced Dropdown Menu functionality
const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

dropdownItems.forEach(dropdown => {
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  let hoverTimeout;

  // Desktop hover functionality with delay
  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout);
    dropdown.classList.add('dropdown-active');
  });

  dropdown.addEventListener('mouseleave', () => {
    hoverTimeout = setTimeout(() => {
      dropdown.classList.remove('dropdown-active');
    }, 200); // Small delay to prevent flickering
  });

  // Touch device support - toggle on tap
  dropdown.addEventListener('click', (e) => {
    // Check if this is a touch device
    if (window.matchMedia('(hover: none)').matches) {
      e.preventDefault();
      
      // Close other dropdowns
      dropdownItems.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('dropdown-active');
        }
      });
      
      // Toggle current dropdown
      dropdown.classList.toggle('dropdown-active');
    }
  });

  // Add stagger animation to dropdown items
  const items = dropdown.querySelectorAll('.dropdown-item');
  items.forEach((item, index) => {
    item.style.setProperty('--stagger-delay', `${index * 50}ms`);
    item.style.transitionDelay = `var(--stagger-delay)`;
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-item.has-dropdown')) {
    dropdownItems.forEach(dropdown => {
      dropdown.classList.remove('dropdown-active');
    });
  }
});

// Close dropdowns on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    dropdownItems.forEach(dropdown => {
      dropdown.classList.remove('dropdown-active');
    });
  }
});

// Only add event listeners if elements exist
const searchBtn = document.querySelector('#search-btn');
if (searchBtn) {
  searchBtn.onclick = () => {
    searchForm.classList.toggle('active');
  };
}

// Enhanced Theme toggle with instant animation
function applyTheme(theme) {
  const root = document.documentElement;
  
  // Add transition class for smooth animation
  root.classList.add('theme-transitioning');
  
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
  
  // Update theme toggle button with better icons
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    // Use more attractive icons with animation
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    
    // Add bounce animation
    themeToggle.style.transform = 'scale(1.2) rotate(180deg)';
    setTimeout(() => {
      themeToggle.style.transform = 'scale(1)';
    }, 300);
  }
  
  // Remove transition class after animation completes
  setTimeout(() => {
    root.classList.remove('theme-transitioning');
  }, 400);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  
  // Add enhanced ripple effect to theme toggle button
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 100px;
      background: radial-gradient(circle, rgba(255,51,153,0.4) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: -1;
    `;
    
    themeToggle.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  applyTheme(next);
  try { localStorage.setItem('beautyspot:theme', next); } catch (e) { /* ignore */ }
}

// initialize theme from storage or prefers-color-scheme
(() => {
  try {
    const saved = localStorage.getItem('beautyspot:theme');
    if (saved) { applyTheme(saved); }
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    }
  } catch (e) { /* ignore */ }
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
})();

// ================== SCROLL ANIMATIONS ================== //

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide scroll to top button
function toggleScrollToTopButton() {
  if (window.scrollY > 500) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add event listeners for scroll to top
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', scrollToTop);
  window.addEventListener('scroll', toggleScrollToTopButton);
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Enhanced observer specifically for headings
const headingObserverOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -30px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
      animateOnScroll.unobserve(entry.target);
    }
  });
}, observerOptions);

// Dedicated observer for headings with enhanced timing
const headingAnimateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add a slight delay before starting the animation for a more elegant effect
      setTimeout(() => {
        entry.target.classList.add('animate-fade-in-up');
      }, 100);
      headingAnimateOnScroll.unobserve(entry.target);
    }
  });
}, headingObserverOptions);

// Elements to animate on scroll (non-heading elements)
const animateElements = document.querySelectorAll(`
  .section-header,
  .product-card,
  .gallery-card,
  .team-card,
  .arrival-card,
  .review-card,
  .footer-section,
  .hero-content,
  .luxury-badge
`);

// Heading elements for special animation
const headingElements = document.querySelectorAll(`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .section-title,
  .product-title,
  .gallery-title,
  .luxury-title,
  .fade-in-heading
`);

// Start observing elements
animateElements.forEach(element => {
  animateOnScroll.observe(element);
});

// Start observing headings with special observer
headingElements.forEach(element => {
  headingAnimateOnScroll.observe(element);
});

// Stagger animation for cards
const cardElements = document.querySelectorAll('.product-card, .gallery-card, .team-card, .arrival-card, .review-card');
cardElements.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Stagger animation for headings within the same section
const staggerHeadings = () => {
  const sections = document.querySelectorAll('section, .slide');
  
  sections.forEach(section => {
    const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6, .section-title, .product-title, .gallery-title, .luxury-title, .fade-in-heading');
    
    headings.forEach((heading, index) => {
      // Add a data attribute to track stagger delay
      heading.dataset.staggerDelay = `${index * 150}ms`;
      
      // Apply the delay when the animation class is added
      const originalClassList = heading.classList;
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (heading.classList.contains('animate-fade-in-up')) {
              heading.style.animationDelay = heading.dataset.staggerDelay;
              observer.disconnect();
            }
          }
        });
      });
      
      observer.observe(heading, { attributes: true });
    });
  });
};

// Initialize stagger headings
staggerHeadings();

// Parallax effect for hero section
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

function parallaxEffect() {
  const scrolled = window.pageYOffset;
  const parallax = scrolled * 0.5;
  
  if (hero) {
    hero.style.transform = `translateY(${parallax}px)`;
  }
}

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80; // Adjust for fixed header
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Glassmorphism cursor effect - DISABLED
// Custom cursor has been disabled to use normal system cursor
let cursor = null;

// Custom cursor functions are disabled - using normal system cursor instead

// Enhanced scroll effects
window.onscroll = () => {
  if (searchForm) {
    searchForm.classList.remove('active');
  }
  
  // Parallax effect
  parallaxEffect();
  
  // Header background opacity based on scroll - DISABLED to keep consistent navigation color
  // const header = document.querySelector('.header');
  // if (header) {
  //   const scrollPercent = Math.min(window.scrollY / 100, 1);
  //   header.style.background = `rgba(255, 255, 255, ${0.9 + (scrollPercent * 0.1)})`;
  // }
};

// ================== EXISTING SLIDER CODE ================== //

let slides = document.querySelectorAll('.home .slide');
let index = 0;

function next(){
  if (!slides || slides.length === 0) return;
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

function prev(){
  if (!slides || slides.length === 0) return;
  slides[index].classList.remove('active');
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add('active');
}

// Swiper configurations with enhanced shimmer effects
var swiper = new Swiper(".products-slider", {
  loop: true,
  grabCursor: true,
  spaceBetween: 20,
  effect: 'slide',
  speed: 800,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChangeTransitionStart: function () {
      // Add shimmer effect during transition
      this.slides.forEach(slide => {
        slide.classList.add('shimmer-transition');
      });
    },
    slideChangeTransitionEnd: function () {
      // Remove shimmer effect after transition
      setTimeout(() => {
        this.slides.forEach(slide => {
          slide.classList.remove('shimmer-transition');
        });
      }, 300);
    },
    slideChange: function () {
      // Add ethereal glow to active slide
      this.slides.forEach(slide => {
        slide.classList.remove('active-slide-glow');
      });
      this.slides[this.activeIndex].classList.add('active-slide-glow');
    }
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    550: {
      slidesPerView: 2,
    },
    850: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  loop: true,
  grabCursor: true,
  spaceBetween: 20,
  effect: 'slide',
  speed: 800,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChangeTransitionStart: function () {
      this.slides.forEach(slide => {
        slide.classList.add('shimmer-transition');
      });
    },
    slideChangeTransitionEnd: function () {
      setTimeout(() => {
        this.slides.forEach(slide => {
          slide.classList.remove('shimmer-transition');
        });
      }, 300);
    },
    slideChange: function () {
      this.slides.forEach(slide => {
        slide.classList.remove('active-slide-glow');
      });
      this.slides[this.activeIndex].classList.add('active-slide-glow');
    }
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    550: {
      slidesPerView: 2,
    },
    850: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".reviews-slider", {
  loop: true,
  grabCursor: true,
  spaceBetween: 20,
  effect: 'slide',
  speed: 800,
  on: {
    slideChangeTransitionStart: function () {
      this.slides.forEach(slide => {
        slide.classList.add('shimmer-transition');
      });
    },
    slideChangeTransitionEnd: function () {
      setTimeout(() => {
        this.slides.forEach(slide => {
          slide.classList.remove('shimmer-transition');
        });
      }, 300);
    }
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  loop: true,
  grabCursor: true,
  spaceBetween: 20,
  effect: 'slide',
  speed: 800,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChangeTransitionStart: function () {
      this.slides.forEach(slide => {
        slide.classList.add('shimmer-transition');
      });
    },
    slideChangeTransitionEnd: function () {
      setTimeout(() => {
        this.slides.forEach(slide => {
          slide.classList.remove('shimmer-transition');
        });
      }, 300);
    }
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    650: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});

// ================== FINAL TOUCHES ================== //

// Countdown timer for arrival cards
function updateCountdownTimers() {
  const timers = document.querySelectorAll('.countdown-timer');
  
  timers.forEach(timer => {
    const timeUnits = timer.querySelectorAll('.time-unit');
    if (timeUnits.length >= 3) {
      // Simple countdown animation
      let hours = parseInt(timeUnits[0].textContent);
      let minutes = parseInt(timeUnits[1].textContent);
      let seconds = parseInt(timeUnits[2].textContent);
      
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      }
      
      timeUnits[0].textContent = hours.toString().padStart(2, '0');
      timeUnits[1].textContent = minutes.toString().padStart(2, '0');
      timeUnits[2].textContent = seconds.toString().padStart(2, '0');
    }
  });
}

// Update countdown every second
setInterval(updateCountdownTimers, 1000);

// Gallery filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryCards = document.querySelectorAll('.gallery-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    galleryCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        card.classList.add('animate-fade-in-up');
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('.newsletter-input').value;
    
    if (email) {
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #e91e63, #ff6b9d);
        color: white;
        padding: 2rem 3rem;
        border-radius: 2rem;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 2rem 4rem rgba(233, 30, 99, 0.3);
        font-family: 'Poppins', sans-serif;
        font-size: 1.6rem;
        font-weight: 500;
      `;
      successMsg.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
        Thank you for subscribing!<br>
        <small style="opacity: 0.9;">Welcome to the BeautySpot family ✨</small>
      `;
      
      document.body.appendChild(successMsg);
      
      // Remove message after 3 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
      
      // Reset form
      newsletterForm.reset();
    }
  });
}

// ================== DYNAMIC SPARKLE EFFECTS ================== //

// Create dynamic sparkles that respond to user interaction
function createDynamicSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'dynamic-sparkle';
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  
  document.body.appendChild(sparkle);
  
  // Remove sparkle after animation
  setTimeout(() => {
    sparkle.remove();
  }, 2000);
}

// Add sparkle on mouse move over certain elements
document.addEventListener('mousemove', (e) => {
  const targetElements = document.querySelectorAll('.nav-item, .btn, .product-card, .gallery-card');
  const hoveredElement = e.target.closest('.nav-item, .btn, .product-card, .gallery-card');
  
  if (hoveredElement && Math.random() > 0.95) { // Only create sparkles occasionally
    createDynamicSparkle(e.clientX, e.clientY);
  }
});

// Enhanced sparkle generation for home section
function generateRandomSparkles() {
  const etherealContainer = document.querySelector('.ethereal-sparkles');
  if (!etherealContainer) return;
  
  // Create random sparkles periodically
  setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance every interval
      const sparkle = document.createElement('div');
      sparkle.className = `sparkle-orb ${['small', 'medium'][Math.floor(Math.random() * 2)]}`;
      
      // Random position
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      
      // Random animation duration
      sparkle.style.animationDuration = (4 + Math.random() * 4) + 's';
      sparkle.style.animationDelay = Math.random() * 2 + 's';
      
      etherealContainer.appendChild(sparkle);
      
      // Remove after animation cycle
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.remove();
        }
      }, 8000);
    }
  }, 3000); // Check every 3 seconds
}

// Initialize dynamic sparkles when page loads
document.addEventListener('DOMContentLoaded', () => {
  generateRandomSparkles();
});

// Add CSS for dynamic sparkles
const dynamicSparkleCSS = `
.dynamic-sparkle {
  position: fixed;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, var(--ethereal-pink) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  animation: dynamicSparkleAnim 2s ease-out forwards;
  box-shadow: 0 0 12px var(--ethereal-pink);
}

@keyframes dynamicSparkleAnim {
  0% {
    opacity: 1;
    transform: scale(0) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.5) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: scale(0.5) rotate(360deg) translateY(-20px);
  }
}
`;

// Inject the CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicSparkleCSS;
document.head.appendChild(styleSheet);

// ================== FAQ ACCORDION FUNCTIONALITY ==================
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
});