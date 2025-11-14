/**
 * ==========================================
 * FOOTER FUNCTIONALITY
 * Newsletter validation, theme toggle, auto year
 * ==========================================
 */

(function() {
  'use strict';

  // Set current year automatically
  const setCurrentYear = () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  };

  // Newsletter form handling with validation
  const initNewsletter = () => {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    const input = document.getElementById('newsletter-email');
    const button = form.querySelector('.newsletter-button');
    const statusEl = document.getElementById('newsletter-status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = input.value.trim();

      // Client-side email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email) {
        showStatus('Please enter your email address', 'error');
        input.focus();
        return;
      }

      if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address', 'error');
        input.focus();
        return;
      }

      // Disable button during submission
      button.disabled = true;
      button.textContent = 'Subscribing...';

      // Simulate API call (replace with your actual endpoint)
      try {
        // Replace this with your actual fetch call:
        // const response = await fetch('/api/newsletter', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email })
        // });

        // Simulated delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Success simulation (replace with actual response handling)
        showStatus('🎉 Thanks for subscribing! Check your inbox.', 'success');
        input.value = '';

      } catch (error) {
        showStatus('Something went wrong. Please try again.', 'error');
      } finally {
        button.disabled = false;
        button.textContent = 'Subscribe';
      }
    });

    // Show status message
    function showStatus(message, type) {
      if (!statusEl) return;

      statusEl.textContent = message;
      statusEl.className = `newsletter-status ${type} show`;
      statusEl.setAttribute('aria-live', 'polite');

      // Auto-hide after 5 seconds
      setTimeout(() => {
        statusEl.classList.remove('show');
      }, 5000);
    }

    // Clear error on input
    input.addEventListener('input', () => {
      if (statusEl.classList.contains('error')) {
        statusEl.classList.remove('show');
      }
    });
  };

  // Theme toggle functionality
  const initThemeToggle = () => {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);

    toggle.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
      const icon = toggle.querySelector('svg');
      const text = toggle.querySelector('span');
      
      if (theme === 'dark') {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
        text.textContent = 'Dark';
      } else {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
        text.textContent = 'Light';
      }
    }
  };

  // Smooth scroll for footer links (if linking to page sections)
  const initSmoothScroll = () => {
    document.querySelectorAll('.footer-links-list a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  // Initialize all footer functionality
  const init = () => {
    setCurrentYear();
    initNewsletter();
    initThemeToggle();
    initSmoothScroll();
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
