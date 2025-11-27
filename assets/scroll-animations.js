/**
 * ==========================================
 * SCROLL ANIMATIONS HANDLER
 * Lightweight scroll-triggered animations
 * Optimized for performance
 * ==========================================
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    threshold: 0.15, // Percentage of element visible before triggering (15% visibility)
    rootMargin: '0px 0px -50px 0px', // Trigger slightly before element enters viewport
    once: true // Animate only once (improves performance)
  };

  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    console.warn('Intersection Observer not supported. Animations will show immediately.');
    // Fallback: Show all elements immediately
    document.querySelectorAll('[class*="fade-in"], [class*="slide"], [class*="zoom"], .scroll-reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  /**
   * Intersection Observer callback
   * Adds 'revealed' class when element enters viewport
   */
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      // Check if element is visible in viewport
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // Add revealed class for scroll-reveal elements (triggers CSS animation)
        if (element.classList.contains('scroll-reveal') ||
            element.classList.contains('scroll-fade') ||
            element.classList.contains('scroll-slide-left') ||
            element.classList.contains('scroll-slide-right') ||
            element.classList.contains('scroll-zoom')) {
          element.classList.add('revealed');
        }
        
        // Add animation-complete class after animation ends
        element.addEventListener('animationend', () => {
          element.classList.add('animation-complete');
        }, { once: true });
        
        // Stop observing if set to animate once
        if (config.once) {
          observer.unobserve(element);
        }
      }
    });
  };

  // Create Intersection Observer
  const observer = new IntersectionObserver(observerCallback, {
    threshold: config.threshold,
    rootMargin: config.rootMargin
  });

  /**
   * Initialize scroll animations
   * Observes all elements with animation classes
   */
  const initScrollAnimations = () => {
    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll(`
      .fade-in-up,
      .fade-in-down,
      .fade-in-left,
      .fade-in-right,
      .slide-in-left,
      .slide-in-right,
      .slide-up,
      .slide-down,
      .zoom-in,
      .scale-in,
      .scroll-reveal,
      .scroll-fade,
      .scroll-slide-left,
      .scroll-slide-right,
      .scroll-zoom
    `);

    // Observe each element (starts tracking their visibility)
    animatedElements.forEach(element => {
      observer.observe(element);
    });

    // Scroll animations initialized
  };

  /**
   * Smooth scroll to anchor links
   */
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignore empty anchors and # only
        if (!href || href === '#') return;
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          // Smooth scroll to target
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  };

  /**
   * Add button ripple effect
   */
  const initButtonRipple = () => {
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        // Calculate position
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Set ripple position
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        // Add to button
        this.appendChild(ripple);
        
        // Remove after animation
        setTimeout(() => ripple.remove(), 600);
      });
    });
  };

  /**
   * Parallax effect for hero section
   */
  const initParallax = () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    // Throttle scroll events for performance
    let ticking = false;
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      });
    });
  };

  /**
   * Stagger animation for grid items
   */
  const initStaggerAnimation = () => {
    // Automatically stagger animations for grid children
    const grids = document.querySelectorAll(`
      .quick-links-grid,
      .features-grid,
      .features-showcase-grid,
      .templates-grid,
      .testimonials-grid,
      .pricing-grid
    `);

    grids.forEach(grid => {
      const items = grid.children;
      Array.from(items).forEach((item, index) => {
        // Add delay based on index
        const delay = index * 0.1; // 100ms between each item
        item.style.animationDelay = `${delay}s`;
      });
    });

    console.log('⏱️ Stagger animations initialized');
  };

  /**
   * Navigation scroll effect
   */
  const initNavScroll = () => {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      // Add shadow when scrolled
      if (currentScroll > 10) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
      } else {
        nav.style.boxShadow = 'none';
        nav.style.background = 'white';
        nav.style.backdropFilter = 'none';
      }

      // Hide/show nav on scroll (optional)
      if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    });

    // Smooth transition for nav
    nav.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    console.log('🎯 Navigation scroll effects initialized');
  };

  /**
   * Counter animation for stats
   */
  const initCounterAnimation = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = counter.textContent;
      
      // Only animate if it's a number
      if (/^\d+$/.test(target)) {
        counter.textContent = '0';
        
        const updateCounter = () => {
          const targetValue = +target;
          const current = +counter.textContent;
          const increment = targetValue / 50; // 50 steps
          
          if (current < targetValue) {
            counter.textContent = Math.ceil(current + increment);
            setTimeout(updateCounter, 30);
          } else {
            counter.textContent = target;
          }
        };
        
        // Start animation when visible
        const counterObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCounter();
              counterObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
      }
    });

    if (counters.length > 0) {
      console.log('🔢 Counter animations initialized');
    }
  };

  /**
   * Page load animation
   */
  const initPageLoadAnimation = () => {
    // Fade in body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
    });

    console.log('📄 Page load animation initialized');
  };

  /**
   * Check if user prefers reduced motion
   */
  const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /**
   * Initialize all animations
   */
  const init = () => {
    // Check for reduced motion preference (accessibility feature for users with motion sensitivity)
    if (prefersReducedMotion()) {
      console.log('⚠️ Reduced motion preference detected. Animations disabled.');
      return;
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initializeAnimations();
      });
    } else {
      initializeAnimations();
    }
  };

  /**
   * Initialize all animation features
   */
  const initializeAnimations = () => {
    console.log('🎨 Initializing animations...');
    
    initPageLoadAnimation();
    initScrollAnimations();
    initSmoothScroll();
    initButtonRipple();
    initParallax();
    initStaggerAnimation();
    initNavScroll();
    initCounterAnimation();
    
    console.log('✅ All animations initialized successfully!');
  };

  // Start initialization
  init();

})();
