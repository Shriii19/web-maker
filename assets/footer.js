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

  // Update social links to Discord and Email only
  const updateSocialLinks = () => {
    const socialContainers = document.querySelectorAll('.footer-socials');
    const newSocialsHTML = `
      <a href="https://discord.gg/D442vYePUR" class="footer-social-link" aria-label="Join our Discord" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      </a>
      <a href="mailto:contact@truckcraft.studio" class="footer-social-link" aria-label="Email us" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      </a>
    `;
    
    socialContainers.forEach(container => {
      container.innerHTML = newSocialsHTML;
    });
  };

  // Initialize all footer functionality
  const init = () => {
    setCurrentYear();
    updateSocialLinks();
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
