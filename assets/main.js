// TruckCraft Studio - Centralized Navigation and Footer System

// Navigation and Footer Components
class SiteComponents {
  static init() {
    try {
      console.log('🚀 SiteComponents.init() called');
      this.createNavigation();
      this.createFooter();
      this.setActivePage();
      console.log('✅ SiteComponents initialized successfully');
    } catch (error) {
      console.error('❌ SiteComponents initialization failed:', error);
    }
  }

  static createNavigation() {
    console.log('🎯 createNavigation() called');
    
    // Check if navigation should be excluded
    if (document.body.hasAttribute('data-no-nav')) {
      console.log('Navigation creation skipped - data-no-nav attribute');
      return;
    }
    
    // Check for existing TruckCraft navigation specifically (must have navbar class AND nav-container)
    const existingNavbar = document.querySelector('.navbar .nav-container');
    if (existingNavbar) {
      console.log('TruckCraft navigation already exists, skipping creation');
      return;
    }
    
    console.log('No existing TruckCraft navigation found, creating new one...');

    console.log('Creating navigation...');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navigationHTML = `
      <nav class="navbar" role="navigation" aria-label="Main Navigation">
        <div class="nav-container">
          <div class="nav-logo">
            <div class="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm5-18v4h3V3h-3z"/>
              </svg>
            </div>
            <span class="nav-title"> <a href="index.html" style="color: inherit; text-decoration: none;">TruckCraft Studio</a></span>
          </div>
          
          <!-- Mobile hamburger menu button -->
          <button class="mobile-menu-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
          
          <ul class="nav-links">
            <li><a href="index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              Home
            </a></li>
            <li><a href="about.html" class="nav-link ${currentPage === 'about.html' ? 'active' : ''}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              About
            </a></li>
            <li><a href="features.html" class="nav-link ${currentPage === 'features.html' ? 'active' : ''}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Features
            </a></li>
            <li><a href="templates.html" class="nav-link ${currentPage === 'templates.html' ? 'active' : ''}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8s0-6-6-6zm4 18H6V4h7v5h5v11z"/>
              </svg>
              Templates
            </a></li>
            <li><a href="pro-templates.html" class="nav-link ${currentPage === 'pro-templates.html' ? 'active' : ''}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Pro Templates
            </a></li>
            <li><a href="pricing.html" class="nav-link ${currentPage === 'pricing.html' ? 'active' : ''}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
              </svg>
              Pricing
            </a></li>
            <li><a href="pro-trial.html" class="nav-link ${currentPage === 'pro-trial.html' ? 'active' : ''}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Pro Trial
            </a></li>
            <li><a href="contact.html" class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Contact
            </a></li>
          </ul>
        </div>
      </nav>
    `;

    // Insert navigation at the beginning of body
    console.log('📍 Inserting navigation into DOM...');
    document.body.insertAdjacentHTML('afterbegin', navigationHTML);
    
    console.log('✅ Navigation inserted successfully');
    
    // Verify navigation was created
    const verifyNav = document.querySelector('.navbar .nav-container');
    if (verifyNav) {
      console.log('✅ Navigation verification: Found .navbar .nav-container');
    } else {
      console.error('❌ Navigation verification failed: .navbar .nav-container not found');
    }

    // Add mobile menu functionality after navigation is created
    this.initMobileMenu();
  }

  static initMobileMenu() {
    try {
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      const navLinks = document.querySelector('.nav-links');
      
      if (!mobileToggle || !navLinks) {
        console.warn('Mobile menu elements not found, skipping mobile menu initialization');
        return;
      }
      
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = navLinks.classList.contains('mobile-open');
        
        if (isOpen) {
          // Close menu
          navLinks.classList.remove('mobile-open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
          
          // Add closing animation
          navLinks.style.animation = 'slideOutRight 0.3s ease-in';
        } else {
          // Open menu
          navLinks.classList.add('mobile-open');
          mobileToggle.classList.add('active');
          mobileToggle.setAttribute('aria-expanded', 'true');
          document.body.classList.add('menu-open');
          
          // Add opening animation
          navLinks.style.animation = 'slideInRight 0.3s ease-out';
        }
      });

      // Close menu when clicking on a link
      const navLinksArray = navLinks.querySelectorAll('.nav-link');
      navLinksArray.forEach((link, index) => {
        link.addEventListener('click', () => {
          // Add stagger effect
          setTimeout(() => {
            navLinks.classList.remove('mobile-open');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
          }, index * 50); // Stagger each link
        });
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove('mobile-open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
          navLinks.classList.remove('mobile-open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
        }
      });
    } catch (error) {
      console.error('Mobile menu initialization failed:', error);
    }
  }

  static createFooter() {
    // Check if footer should be excluded or already exists
    if (document.body.hasAttribute('data-no-footer') || document.querySelector('footer, .footer, .simple-footer')) {
      console.log('Footer creation skipped');
      return;
    }

    const footerHTML = `
      <footer class="simple-footer">
        <div class="simple-footer-container">
          <div class="simple-footer-content">
            <!-- Logo & Brand -->
            <div class="simple-footer-brand">
              <div class="simple-footer-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Web Maker</span>
              </div>
              <p class="simple-footer-tagline">Create beautiful websites with ease</p>
            </div>

            <!-- Right Section: Navigation & Social -->
            <div class="simple-footer-right">
              <!-- Navigation Links -->
              <div class="simple-footer-nav">
                <a href="index.html">Home</a>
                <a href="about.html">About</a>
                <a href="features.html">Features</a>
                <a href="templates.html">Templates</a>
                <a href="pricing.html">Pricing</a>
                <a href="contact.html">Contact</a>
              </div>

              <!-- Social Links -->
              <div class="simple-footer-social">
                <a href="https://discord.gg/D442vYePUR" target="_blank" title="Join our Discord">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
                <a href="mailto:contact@webmaker.com" title="Send us an email">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Copyright -->
          <div class="simple-footer-bottom">
            <p>&copy; 2025 Web Maker. All rights reserved.</p>
            <p>Built with ❤️ for creators with <a href="https://shrinivasmudabe.me" target="_blank" style="color: inherit; text-decoration: none; hover:underline;">Shrinivas Mudabe</a></p>
          </div>
        </div>
      </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  static setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
}

// ETS2 VTC Studio - Enhanced Platform JavaScript

class VTCStudio {
  constructor() {
    this.currentTab = 'visual';
    this.currentDevice = 'desktop';
    this.isCodeSyncing = false;
    this.vtcTemplate = this.getVTCTemplate();
  this.selectedTemplateId = new URLSearchParams(window.location.search).get('t');
    
    this.init();
  }

  init() {
    try {
      this.setupNavigation();
      this.setupEditor();
      this.setupPreview();
      this.setupEventListeners();
      this.loadTemplate();
      if (this.selectedTemplateId) {
        this.showNotification(`Loaded selected template: ${this.selectedTemplateId}`, 'info');
      }
      console.log('VTCStudio initialized successfully');
    } catch (error) {
      console.error('VTCStudio initialization failed:', error);
      throw error;
    }
  }

  setupNavigation() {
    const navHome = document.getElementById('nav-home');
    const navAbout = document.getElementById('nav-about');
    const navFeatures = document.getElementById('nav-features');
    const navTemplates = document.getElementById('nav-templates');
    const navPricing = document.getElementById('nav-pricing');
    const navCreate = document.getElementById('nav-create');
    
    const homeSection = document.getElementById('home-section');
    const aboutSection = document.getElementById('about-section');
    const featuresSection = document.getElementById('features-section');
    const templatesSection = document.getElementById('templates-section');
    const pricingSection = document.getElementById('pricing-section');
    const createSection = document.getElementById('create-section');
    
    const goCreateBtn = document.getElementById('go-create');

    const showSection = (section) => {
      // Hide all sections
      [homeSection, aboutSection, featuresSection, templatesSection, pricingSection, createSection].forEach(s => {
        if (s) s.style.display = 'none';
      });
      
      // Remove active class from all nav links
      [navHome, navAbout, navFeatures, navTemplates, navPricing, navCreate].forEach(nav => {
        if (nav) nav.classList.remove('active');
      });

      // Show selected section and activate nav
      switch(section) {
        case 'home':
          if (homeSection) homeSection.style.display = '';
          if (navHome) navHome.classList.add('active');
          break;
        case 'about':
          if (aboutSection) aboutSection.style.display = '';
          if (navAbout) navAbout.classList.add('active');
          break;
        case 'features':
          if (featuresSection) featuresSection.style.display = '';
          if (navFeatures) navFeatures.classList.add('active');
          break;
        case 'templates':
          if (templatesSection) templatesSection.style.display = '';
          if (navTemplates) navTemplates.classList.add('active');
          break;
        case 'pricing':
          if (pricingSection) pricingSection.style.display = '';
          if (navPricing) navPricing.classList.add('active');
          break;
        case 'create':
          if (createSection) createSection.style.display = '';
          if (navCreate) navCreate.classList.add('active');
          if (this.currentTab === 'code') {
            this.updatePreview();
          }
          break;
      }
    };

    // Add event listeners
    if (navHome) navHome.addEventListener('click', (e) => { e.preventDefault(); showSection('home'); });
    if (navAbout) navAbout.addEventListener('click', (e) => { e.preventDefault(); showSection('about'); });
    if (navFeatures) navFeatures.addEventListener('click', (e) => { e.preventDefault(); showSection('features'); });
    if (navTemplates) navTemplates.addEventListener('click', (e) => { e.preventDefault(); showSection('templates'); });
    if (navPricing) navPricing.addEventListener('click', (e) => { e.preventDefault(); showSection('pricing'); });
    if (navCreate) navCreate.addEventListener('click', (e) => { e.preventDefault(); showSection('create'); });
    if (goCreateBtn) goCreateBtn.addEventListener('click', () => showSection('create'));

    // Template and pricing actions
    this.setupTemplateActions();
    this.setupPricingActions();
  }

  setupTemplateActions() {
    // Add event listeners for template preview and use buttons
    document.addEventListener('click', (e) => {
      if (e.target.textContent === 'Preview') {
        e.preventDefault();
        this.previewTemplate(e.target);
      } else if (e.target.textContent === 'Use Template') {
        e.preventDefault();
        this.useTemplate(e.target);
      }
    });
  }

  setupPricingActions() {
    // Add event listeners for pricing buttons
    document.addEventListener('click', (e) => {
      if (e.target.textContent === 'Get Started Free') {
        e.preventDefault();
        this.showSectionByName('create');
      } else if (e.target.textContent === 'Start Pro Trial') {
        e.preventDefault();
        this.showProSignup();
      } else if (e.target.textContent === 'Contact Sales') {
        e.preventDefault();
        this.showContactSales();
      }
    });
  }

  previewTemplate(button) {
    const templateCard = button.closest('.template-card');
    const templateName = templateCard.querySelector('h3').textContent;
    
    // Create a preview modal
    const modal = this.createModal({
      title: `Preview: ${templateName}`,
      content: `
        <div style="padding: 1rem;">
          <iframe src="data:text/html,${encodeURIComponent(this.vtcTemplate)}" 
                  style="width: 100%; height: 500px; border: 1px solid var(--border); border-radius: var(--radius);">
          </iframe>
          <div style="margin-top: 1rem; text-align: center;">
            <button class="btn-primary" onclick="this.closest('[style*=\"position: fixed\"]').remove(); window.vtcStudio.useTemplate('${templateName}')">
              Use This Template
            </button>
          </div>
        </div>
      `
    });
    
    document.body.appendChild(modal);
    window.vtcStudio = this; // Make instance available globally for the modal
  }

  useTemplate(templateName) {
    // Switch to create section and load template
    this.showSectionByName('create');
    this.loadTemplate();
    this.showNotification(`${templateName || 'Template'} loaded successfully!`, 'success');
  }

  showProSignup() {
    const modal = this.createModal({
      title: 'Start Your Pro Trial',
      content: `
        <div style="padding: 2rem; text-align: center;">
          <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--accent); margin-bottom: 1rem;">🚀 7-Day Free Trial</h3>
            <p>Start your Pro trial today and unlock all premium features!</p>
          </div>
          <form style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px; margin: 0 auto;">
            <input type="email" placeholder="Your email address" 
                   style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);" required>
            <input type="text" placeholder="VTC Name" 
                   style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);" required>
            <button type="submit" class="btn-primary">Start Free Trial</button>
          </form>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 1rem;">
            No credit card required. Cancel anytime.
          </p>
        </div>
      `
    });
    
    document.body.appendChild(modal);
  }

  showContactSales() {
    const modal = this.createModal({
      title: 'Contact Enterprise Sales',
      content: `
        <div style="padding: 2rem;">
          <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--primary); margin-bottom: 1rem;">Let's Build Something Great Together</h3>
            <p>Our enterprise team will help you find the perfect solution for your organization.</p>
          </div>
          <form style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <input type="text" placeholder="First Name" 
                     style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);" required>
              <input type="text" placeholder="Last Name" 
                     style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);" required>
            </div>
            <input type="email" placeholder="Work Email" 
                   style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);" required>
            <input type="text" placeholder="Organization Name" 
                   style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);" required>
            <textarea placeholder="Tell us about your needs..." rows="4"
                      style="padding: 0.75rem; border: 1px solid var(--border); border-radius: var(--radius); resize: vertical;"></textarea>
            <button type="submit" class="btn-primary">Contact Sales</button>
          </form>
        </div>
      `
    });
    
    document.body.appendChild(modal);
  }

  showSectionByName(section) {
    // Navigation helper method
    const sections = {
      'home': 'home-section',
      'about': 'about-section', 
      'features': 'features-section',
      'templates': 'templates-section',
      'pricing': 'pricing-section',
      'create': 'create-section'
    };

    // Hide all sections
    Object.values(sections).forEach(sectionId => {
      const el = document.getElementById(sectionId);
      if (el) el.style.display = 'none';
    });

    // Show target section
    const targetSection = document.getElementById(sections[section]);
    if (targetSection) {
      targetSection.style.display = '';
    }

    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    const activeNav = document.getElementById(`nav-${section}`);
    if (activeNav) {
      activeNav.classList.add('active');
    }

    if (section === 'create') {
      this.updatePreview();
    }
  }

  setupEditor() {
    try {
      // Tab switching
      const tabBtns = document.querySelectorAll('.tab-btn');
      const tabPanes = document.querySelectorAll('.tab-pane');

      if (tabBtns && tabBtns.length) {
        tabBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            this.switchTab(tab);
          });
        });
      }

      // Device switching
      const deviceBtns = document.querySelectorAll('.device-btn');
      if (deviceBtns && deviceBtns.length) {
        deviceBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const device = btn.dataset.device;
            this.switchDevice(device);
          });
        });
      }

      // Code editor
      const codeEditor = document.getElementById('code-editor');
      let debounceTimer;
      
      if (codeEditor) {
        codeEditor.addEventListener('input', () => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            if (!this.isCodeSyncing) {
              this.updatePreview();
            }
          }, 500);
        });
      } else {
        console.warn('Code editor element not found');
      }

      // Visual editor controls
      this.setupVisualControls();
    } catch (error) {
      console.error('Setup editor failed:', error);
    }
  }

  setupVisualControls() {
    try {
      const controls = {
        'company-name': 'My VTC',
        'company-tagline': 'Drive together. Deliver success.',
        'discord-link': 'https://discord.gg/D442vYePUR',
        'primary-color': '#00b894'
      };

      Object.keys(controls).forEach(id => {
        const input = document.getElementById(id);
        if (input) {
          input.addEventListener('input', () => {
            this.syncVisualChanges();
          });
        } else {
          console.warn(`Visual control element '${id}' not found`);
        }
      });

      // Apply changes button
      const applyBtn = document.getElementById('apply-changes');
      if (applyBtn) {
        applyBtn.addEventListener('click', () => {
          this.applyVisualChanges();
        });
      } else {
        console.warn('Apply changes button not found');
      }
    } catch (error) {
      console.error('Setup visual controls failed:', error);
    }
  }

  setupPreview() {
    try {
      this.preview = document.getElementById('live-preview');
      if (!this.preview) {
        console.warn('Live preview element not found');
      }
    } catch (error) {
      console.error('Setup preview failed:', error);
    }
  }

  setupEventListeners() {
    // Download functionality
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        this.downloadWebsite();
      });
    }

    // Host functionality
    const hostBtn = document.getElementById('host-btn');
    if (hostBtn) {
      console.log('Host button found, adding event listener');
      hostBtn.addEventListener('click', () => {
        console.log('Host button clicked, showing hosting options');
        this.showHostingOptions();
      });
    } else {
      console.log('Host button not found');
    }

    // Reset functionality
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetToTemplate();
      });
    }

    // Save functionality
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.saveProject();
      });
    }
  }

  switchTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });

    // Update tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `${tab}-editor` || pane.id === `${tab}-editor-pane`);
    });

    this.currentTab = tab;

    if (tab === 'code') {
      // Sync visual changes to code editor
      this.syncToCodeEditor();
    }
  }

  switchDevice(device) {
    // Update device buttons
    document.querySelectorAll('.device-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.device === device);
    });

    // Update preview frame
    const preview = document.getElementById('live-preview');
    preview.className = `preview-frame ${device}`;
    
    this.currentDevice = device;
  }

  loadTemplate() {
    try {
      const codeEditor = document.getElementById('code-editor');
      if (codeEditor) {
        codeEditor.value = this.vtcTemplate;
        this.updatePreview();
      } else {
        console.warn('Code editor not found, template loading skipped');
      }
    } catch (error) {
      console.error('Load template failed:', error);
    }
  }

  updatePreview() {
    try {
      const codeEditor = document.getElementById('code-editor');
      if (!codeEditor) {
        console.warn('Code editor not found, preview update skipped');
        return;
      }
      const code = codeEditor.value;
      if (this.preview) {
        this.preview.srcdoc = code;
      } else {
        console.warn('Preview iframe not found');
      }
    } catch (error) {
      console.error('Update preview failed:', error);
    }
  }

  syncVisualChanges() {
    // This would update the template with visual editor values
    // For now, we'll just mark that changes are pending
    const applyBtn = document.getElementById('apply-changes');
    if (applyBtn) {
      applyBtn.style.background = 'var(--accent-light)';
      applyBtn.textContent = 'Apply Changes*';
    }
  }

  applyVisualChanges() {
    const companyName = document.getElementById('company-name').value;
    const tagline = document.getElementById('company-tagline').value;
    const discordLink = document.getElementById('discord-link').value;
    const primaryColor = document.getElementById('primary-color').value;

    let code = document.getElementById('code-editor').value;

    // Replace template values
    code = code.replace(/My VTC/g, companyName);
    code = code.replace(/Drive together\. Deliver success\./g, tagline);
    code = code.replace(/https:\/\/discord\.gg\/yourvtc/g, discordLink);
    code = code.replace(/--vtc-accent: #00b894/g, `--vtc-accent: ${primaryColor}`);

    this.isCodeSyncing = true;
    document.getElementById('code-editor').value = code;
    this.updatePreview();
    this.isCodeSyncing = false;

    // Reset apply button
    const applyBtn = document.getElementById('apply-changes');
    applyBtn.style.background = '';
    applyBtn.textContent = 'Apply Changes';

    this.showNotification('Changes applied successfully!', 'success');
  }

  syncToCodeEditor() {
    // Sync any pending visual changes to code editor
    if (this.currentTab === 'code') {
      // Could implement automatic syncing here
    }
  }

  downloadWebsite() {
    const code = document.getElementById('code-editor').value;
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vtc-website.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.showNotification('Website downloaded successfully!', 'success');
  }

  showHostingOptions() {
    console.log('showHostingOptions called');
    const modal = this.createModal({
      title: 'Deploy Your Website Online',
      content: `
        <div style="padding: 2rem; text-align: center;">
          <div style="margin-bottom: 2rem;">
            <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 8px; padding: 1.5rem; margin-bottom: 2rem;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1rem;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <h3 style="margin: 0; color: #f59e0b; font-size: 1.1rem;">Important Notice</h3>
              </div>
              <p style="color: var(--text-secondary); line-height: 1.6; margin: 0;">
                Deploying your website requires some technical setup. We recommend using Vercel for easy deployment, 
                or join our Discord community where our team can help guide you through the hosting process step-by-step.
              </p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <a href="https://vercel.com/new/" target="_blank" class="btn-primary" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem; text-decoration: none;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l10 18H2L12 2z"/>
                </svg>
                <div style="text-align: left;">
                  <div style="font-weight: 600;">Deploy with Vercel</div>
                  <div style="font-size: 0.85rem; opacity: 0.8;">Free & Easy Setup</div>
                </div>
              </a>
              
              <a href="https://discord.gg/D442vYePUR" target="_blank" class="btn-outline" style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 1rem; text-decoration: none;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0003 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"/>
                </svg>
                <div style="text-align: left;">
                  <div style="font-weight: 600;">Get Help on Discord</div>
                  <div style="font-size: 0.85rem; opacity: 0.8;">We'll Help You Deploy</div>
                </div>
              </a>
            </div>
          </div>
          
          <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 1.5rem;">
            💡 <strong>Tip:</strong> Download your website first, then follow our deployment guide or ask for help in Discord!
          </p>
        </div>
      `
    });
    
    document.body.appendChild(modal);
  }

  resetToTemplate() {
    if (confirm('Are you sure you want to reset to the original template? This will lose all your changes.')) {
      this.loadTemplate();
      
      // Reset visual controls
      document.getElementById('company-name').value = 'My VTC';
      document.getElementById('company-tagline').value = 'Drive together. Deliver success.';
      document.getElementById('discord-link').value = 'https://discord.gg/D442vYePUR';
      document.getElementById('primary-color').value = '#00b894';

      this.showNotification('Template reset successfully!', 'info');
    }
  }

  saveProject() {
    const projectData = {
      code: document.getElementById('code-editor').value,
      settings: {
        companyName: document.getElementById('company-name').value,
        tagline: document.getElementById('company-tagline').value,
        discordLink: document.getElementById('discord-link').value,
        primaryColor: document.getElementById('primary-color').value
      },
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('vtc-studio-project', JSON.stringify(projectData));
    this.showNotification('Project saved to browser storage!', 'success');
  }

  loadProject() {
    const saved = localStorage.getItem('vtc-studio-project');
    if (saved) {
      try {
        const projectData = JSON.parse(saved);
        
        document.getElementById('code-editor').value = projectData.code;
        document.getElementById('company-name').value = projectData.settings.companyName;
        document.getElementById('company-tagline').value = projectData.settings.tagline;
        document.getElementById('discord-link').value = projectData.settings.discordLink;
        document.getElementById('primary-color').value = projectData.settings.primaryColor;
        
        this.updatePreview();
        this.showNotification('Project loaded from browser storage!', 'info');
      } catch (e) {
        console.error('Failed to load project:', e);
      }
    }
  }

  createModal({ title, content }) {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(4px);
    `;

    modal.innerHTML = `
      <div style="
        background: var(--surface);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        border: 1px solid var(--border);
      ">
        <div style="
          padding: var(--space-6);
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600;">${title}</h3>
          <button class="modal-close-btn" style="
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-secondary);
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: all 0.2s ease;
          " onmouseover="this.style.background='var(--surface-hover)'" onmouseout="this.style.background='none'">&times;</button>
        </div>
        <div>${content}</div>
      </div>
    `;

    // Add close button functionality
    const closeBtn = modal.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    return modal;
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      info: '#3b82f6',
      warning: '#f59e0b'
    };

    notification.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: ${colors[type]};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      font-weight: 500;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  getVTCTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My VTC - Virtual Trucking Company</title>
  <style>
    :root {
      --vtc-primary: #1e293b;
      --vtc-accent: #00b894;
      --vtc-bg: #f8fafc;
      --vtc-text: #222;
      --vtc-card: #fff;
      --vtc-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      --vtc-gradient: linear-gradient(135deg, var(--vtc-accent) 0%, #4ade80 100%);
    }
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: var(--vtc-bg);
      color: var(--vtc-text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    
    /* Navigation */
    nav {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 50;
    }
    
    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
    }
    
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 700;
      font-size: 1.25rem;
      color: var(--vtc-primary);
    }
    
    .nav-logo img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .nav-links {
      display: flex;
      list-style: none;
      gap: 2rem;
    }
    
    .nav-links a {
      text-decoration: none;
      color: var(--vtc-text);
      font-weight: 500;
      transition: color 0.2s;
      position: relative;
    }
    
    .nav-links a:hover {
      color: var(--vtc-accent);
    }
    
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -1.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: var(--vtc-accent);
      border-radius: 50%;
    }
    
    /* Hero Section */
    .hero {
      text-align: center;
      padding: 6rem 0 4rem;
      background: var(--vtc-gradient);
      color: white;
      position: relative;
      overflow: hidden;
    }
    
    .hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.05)" points="0,1000 1000,800 1000,1000"/></svg>') no-repeat bottom;
      background-size: cover;
    }
    
    .hero-content {
      position: relative;
      z-index: 1;
    }
    
    .hero-logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 0 auto 1.5rem;
      border: 4px solid rgba(255, 255, 255, 0.2);
      object-fit: cover;
    }
    
    .hero h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }
    
    .hero .tagline {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .hero .cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);
      padding: 1rem 2rem;
      border-radius: 2rem;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }
    
    .hero .cta-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-2px);
    }
    
    /* Content Sections */
    .section {
      padding: 4rem 0;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 3rem;
      color: var(--vtc-primary);
    }
    
    .card {
      background: var(--vtc-card);
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: var(--vtc-shadow);
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.15);
    }
    
    .card h3 {
      color: var(--vtc-primary);
      margin-bottom: 1rem;
      font-size: 1.25rem;
      font-weight: 600;
    }
    
    .card p, .card li {
      color: #64748b;
      line-height: 1.7;
    }
    
    /* Team Grid */
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .member-card {
      text-align: center;
      transition: transform 0.3s ease;
    }
    
    .member-card:hover {
      transform: translateY(-4px);
    }
    
    .member-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 auto 1rem;
      background: linear-gradient(135deg, var(--vtc-accent), #4ade80);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 1.5rem;
    }
    
    .member-name {
      font-weight: 600;
      color: var(--vtc-primary);
      margin-bottom: 0.25rem;
    }
    
    .member-role {
      color: #64748b;
      font-size: 0.9rem;
    }
    
    /* Rules List */
    .rules-list {
      list-style: none;
      margin-top: 1rem;
    }
    
    .rules-list li {
      position: relative;
      padding-left: 2rem;
      margin-bottom: 0.75rem;
    }
    
    .rules-list li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--vtc-accent);
      font-weight: bold;
    }
    
    /* Contact Section */
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .contact-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--vtc-card);
      border-radius: 0.75rem;
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
    }
    
    .contact-item:hover {
      border-color: var(--vtc-accent);
      transform: translateY(-2px);
    }
    
    .contact-icon {
      width: 48px;
      height: 48px;
      background: var(--vtc-gradient);
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    
    .contact-item a {
      color: var(--vtc-accent);
      text-decoration: none;
      font-weight: 500;
    }
    
    /* Footer */
    footer {
      background: var(--vtc-primary);
      color: white;
      text-align: center;
      padding: 3rem 0 2rem;
    }
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    
    .footer-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-weight: 700;
    }
    
    .footer-links {
      display: flex;
      gap: 2rem;
    }
    
    .footer-links a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: color 0.2s;
    }
    
    .footer-links a:hover {
      color: white;
    }
    
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 2rem;
      color: rgba(255, 255, 255, 0.7);
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .hero h1 { font-size: 2.5rem; }
      .hero .tagline { font-size: 1.1rem; }
      .nav-links { gap: 1rem; }
      .team-grid { grid-template-columns: 1fr; }
      .footer-content { flex-direction: column; gap: 2rem; }
      .footer-links { flex-wrap: wrap; justify-content: center; }
    }
    
    @media (max-width: 640px) {
      .container { padding: 0 0.5rem; }
      .section { padding: 3rem 0; }
      .nav-content { flex-direction: column; gap: 1rem; }
      .nav-links { gap: 0.5rem; }
    }
  </style>
</head>
<body>
  <nav>
    <div class="container">
      <div class="nav-content">
        <div class="nav-logo">
          <img src="https://placehold.co/40x40/00b894/ffffff?text=VTC" alt="VTC Logo">
          <span>My VTC</span>
        </div>
        <ul class="nav-links">
          <li><a href="#home" class="active">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#rules">Rules</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
        <img src="https://placehold.co/100x100/ffffff/00b894?text=VTC" alt="VTC Logo" class="hero-logo">
        <h1>My VTC</h1>
        <p class="tagline">Drive together. Deliver success. Join our professional Virtual Trucking Company and experience the best of ETS2 multiplayer!</p>
        <a href="https://discord.gg/D442vYePUR" target="_blank" class="cta-btn">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.1a.074.074 0 0 0-.079.037c-.34.607-.719 1.396-.984 2.013a18.524 18.524 0 0 0-5.59 0 12.51 12.51 0 0 0-.997-2.013.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.07.07 0 0 0-.032.027C.533 9.09-.32 13.579.099 18.021a.08.08 0 0 0 .031.056c2.104 1.548 4.13 2.488 6.102 3.104a.077.077 0 0 0 .084-.027c.47-.646.888-1.329 1.245-2.049a.076.076 0 0 0-.041-.104c-.662-.251-1.292-.549-1.899-.892a.077.077 0 0 1-.008-.128c.127-.096.254-.192.377-.291a.074.074 0 0 1 .077-.01c3.967 1.813 8.27 1.813 12.199 0a.073.073 0 0 1 .078.009c.123.099.25.195.378.291a.077.077 0 0 1-.006.128 12.298 12.298 0 0 1-1.9.892.076.076 0 0 0-.04.105c.36.72.778 1.403 1.246 2.049a.076.076 0 0 0 .084.028c1.978-.616 4.004-1.556 6.107-3.104a.077.077 0 0 0 .03-.055c.5-5.177-.838-9.637-3.61-13.625a.061.061 0 0 0-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z"/>
          </svg>
          Join Our Discord
        </a>
      </div>
    </div>
  </section>

  <section id="about" class="section">
    <div class="container">
      <h2 class="section-title">About Our VTC</h2>
      <div class="card">
        <h3>🚛 Our Story</h3>
        <p>Founded in 2022, My VTC has grown from a small group of trucking enthusiasts to one of the most respected Virtual Trucking Companies in the ETS2 community. We pride ourselves on professionalism, friendship, and creating memorable experiences on European roads.</p>
        
        <h3 style="margin-top: 2rem;">🎯 Our Mission</h3>
        <p>To provide a welcoming, professional, and fun environment for ETS2 players to come together, participate in organized convoys, and build lasting friendships while exploring the virtual roads of Europe.</p>
        
        <h3 style="margin-top: 2rem;">⭐ Our Values</h3>
        <p>Respect, teamwork, professionalism, and most importantly - having fun! We believe that trucking is better when shared with friends, and we're committed to maintaining a positive community atmosphere.</p>
      </div>
    </div>
  </section>

  <section id="team" class="section">
    <div class="container">
      <h2 class="section-title">Meet Our Team</h2>
      <div class="team-grid">
        <div class="card member-card">
          <div class="member-avatar">A</div>
          <div class="member-name">Alex Thompson</div>
          <div class="member-role">Founder & CEO</div>
          <p style="margin-top: 1rem; font-size: 0.9rem;">Leading our VTC with passion and dedication since day one.</p>
        </div>
        <div class="card member-card">
          <div class="member-avatar">J</div>
          <div class="member-name">Jamie Wilson</div>
          <div class="member-role">HR Manager</div>
          <p style="margin-top: 1rem; font-size: 0.9rem;">Ensuring our community remains welcoming and professional.</p>
        </div>
        <div class="card member-card">
          <div class="member-avatar">T</div>
          <div class="member-name">Taylor Rodriguez</div>
          <div class="member-role">Convoy Lead</div>
          <p style="margin-top: 1rem; font-size: 0.9rem;">Organizing and leading our weekly convoy events.</p>
        </div>
        <div class="card member-card">
          <div class="member-avatar">M</div>
          <div class="member-name">Morgan Chen</div>
          <div class="member-role">Event Coordinator</div>
          <p style="margin-top: 1rem; font-size: 0.9rem;">Planning special events and community activities.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="rules" class="section">
    <div class="container">
      <h2 class="section-title">Rules & Requirements</h2>
      <div class="card">
        <h3>📋 General Requirements</h3>
        <ul class="rules-list">
          <li>Minimum age of 16 years</li>
          <li>Own a legal copy of Euro Truck Simulator 2</li>
          <li>Have Discord installed and working microphone</li>
          <li>Be respectful and professional at all times</li>
          <li>Participate in at least one convoy per month</li>
        </ul>
        
        <h3 style="margin-top: 2rem;">🚛 Driving Standards</h3>
        <ul class="rules-list">
          <li>Follow all TruckersMP rules and regulations</li>
          <li>Maintain realistic driving speeds (90 km/h max)</li>
          <li>Use appropriate truck configurations for convoys</li>
          <li>No ramming, blocking, or inappropriate overtaking</li>
          <li>Stay in designated convoy positions</li>
        </ul>
        
        <h3 style="margin-top: 2rem;">💬 Community Guidelines</h3>
        <ul class="rules-list">
          <li>Be respectful to all members and other players</li>
          <li>No offensive language or inappropriate content</li>
          <li>Help new members learn our procedures</li>
          <li>Report any issues to management promptly</li>
          <li>Represent our VTC positively in the community</li>
        </ul>
      </div>
    </div>
  </section>

  <section id="contact" class="section">
    <div class="container">
      <h2 class="section-title">Get In Touch</h2>
      <div class="contact-grid">
        <div class="contact-item">
          <div class="contact-icon">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.369A19.791 19.791 0 0 0 16.885 3.1a.074.074 0 0 0-.079.037c-.34.607-.719 1.396-.984 2.013a18.524 18.524 0 0 0-5.59 0 12.51 12.51 0 0 0-.997-2.013.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.369a.07.07 0 0 0-.032.027C.533 9.09-.32 13.579.099 18.021a.08.08 0 0 0 .031.056c2.104 1.548 4.13 2.488 6.102 3.104a.077.077 0 0 0 .084-.027c.47-.646.888-1.329 1.245-2.049a.076.076 0 0 0-.041-.104c-.662-.251-1.292-.549-1.899-.892a.077.077 0 0 1-.008-.128c.127-.096.254-.192.377-.291a.074.074 0 0 1 .077-.01c3.967 1.813 8.27 1.813 12.199 0a.073.073 0 0 1 .078.009c.123.099.25.195.378.291a.077.077 0 0 1-.006.128 12.298 12.298 0 0 1-1.9.892.076.076 0 0 0-.04.105c.36.72.778 1.403 1.246 2.049a.076.076 0 0 0 .084.028c1.978-.616 4.004-1.556 6.107-3.104a.077.077 0 0 0 .03-.055c.5-5.177-.838-9.637-3.61-13.625a.061.061 0 0 0-.03-.028zM8.02 15.331c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.955 2.419-2.156 2.419zm7.974 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.334-.946 2.419-2.156 2.419z"/>
            </svg>
          </div>
          <div>
            <h4>Discord Server</h4>
            <a href="https://discord.gg/D442vYePUR" target="_blank">discord.gg/D442vYePUR</a>
            <p style="font-size: 0.9rem; margin-top: 0.25rem; color: #64748b;">Join our community hub</p>
          </div>
        </div>
        
        <div class="contact-item">
          <div class="contact-icon">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div>
            <h4>Location</h4>
            <p>Based in Europe</p>
            <p style="font-size: 0.9rem; margin-top: 0.25rem; color: #64748b;">Open to drivers worldwide</p>
          </div>
        </div>
        
        <div class="contact-item">
          <div class="contact-icon">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <h4>TruckersMP</h4>
            <p>My VTC Official</p>
            <p style="font-size: 0.9rem; margin-top: 0.25rem; color: #64748b;">Find us in-game</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="https://placehold.co/30x30/ffffff/00b894?text=VTC" alt="VTC Logo" style="width: 30px; height: 30px;">
          <span>My VTC</span>
        </div>
        <div class="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#team">Team</a>
          <a href="#rules">Rules</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 My VTC. Built with ETS2 VTC Studio. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-links a');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  </script>
</body>
</html>`;
  }

  // Template 2: Dashboard Pro (Modern Dashboard Design with Sidebar, Stats Cards, and Charts)
  getDashboardProTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VTC Dashboard Pro - My VTC</title>
  <style>
    :root {
      --vtc-primary: #2c3e50;
      --vtc-accent: #3498db;
      --vtc-bg: #ecf0f1;
      --vtc-text: #333;
      --vtc-card: #fff;
      --vtc-shadow: 0 2px 10px rgba(0,0,0,0.1);
      --vtc-gradient: linear-gradient(135deg, var(--vtc-accent) 0%, #2980b9 100%);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Roboto', sans-serif;
      background: var(--vtc-bg);
      color: var(--vtc-text);
      line-height: 1.5;
    }

    .dashboard {
      display: flex;
      min-height: 100vh;
    }

    .sidebar {
      width: 250px;
      background: var(--vtc-primary);
      color: white;
      padding: 2rem 1rem;
      position: fixed;
      height: 100%;
      overflow-y: auto;
    }

    .sidebar-logo {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .sidebar-nav {
      list-style: none;
    }

    .sidebar-nav li {
      margin-bottom: 1rem;
    }

    .sidebar-nav a {
      color: white;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      transition: background 0.3s;
    }

    .sidebar-nav a:hover {
      background: rgba(255,255,255,0.1);
    }

    .main-content {
      flex: 1;
      margin-left: 250px;
      padding: 2rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: var(--vtc-card);
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: var(--vtc-shadow);
      text-align: center;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: var(--vtc-accent);
    }

    .chart-container {
      background: var(--vtc-card);
      padding: 1.5rem;
      border-radius: 0.75rem;
      box-shadow: var(--vtc-shadow);
      margin-bottom: 2rem;
    }

    /* Simple chart placeholder */
    .chart {
      height: 200px;
      background: linear-gradient(to right, var(--vtc-accent), transparent);
      border-radius: 0.5rem;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .dashboard {
        flex-direction: column;
      }
      .sidebar {
        width: 100%;
        height: auto;
        position: relative;
      }
      .main-content {
        margin-left: 0;
        padding: 1rem;
      }
    }
  </style>
</head>
<body>
  <div class="dashboard">
    <nav class="sidebar">
      <div class="sidebar-logo">
        <img src="https://placehold.co/30x30/ffffff/3498db?text=VTC" alt="Logo">
        My VTC Dashboard
      </div>
      <ul class="sidebar-nav">
        <li><a href="#dashboard"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg> Dashboard</a></li>
        <li><a href="#drivers"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> Drivers</a></li>
        <li><a href="#fleet"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 5V3H6v2H5v14h14V5h-1zm-2 0H8V3h8v2zM7 17h10V7H7v10z"/></svg> Fleet</a></li>
        <li><a href="#convoys"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2v-2H6v2H4v14h16V6zm-2 12H6V8h12v10z"/></svg> Convoys</a></li>
        <li><a href="#settings"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg> Settings</a></li>
      </ul>
    </nav>

    <main class="main-content">
      <header class="header">
        <h1>VTC Dashboard</h1>
        <button class="btn" style="background: var(--vtc-accent); color: white; padding: 0.5rem 1rem; border-radius: 0.5rem;">Logout</button>
      </header>

      <section class="stats-grid">
        <div class="stat-card">
          <h3>Total Drivers</h3>
          <p class="stat-value">150</p>
        </div>
        <div class="stat-card">
          <h3>Active Convoys</h3>
          <p class="stat-value">5</p>
        </div>
        <div class="stat-card">
          <h3>Fleet Size</h3>
          <p class="stat-value">320</p>
        </div>
        <div class="stat-card">
          <h3>Monthly Deliveries</h3>
          <p class="stat-value">2,450</p>
        </div>
      </section>

      <section class="chart-container">
        <h2>Delivery Analytics</h2>
        <div class="chart"></div> <!-- Placeholder for chart -->
      </section>

      <section class="chart-container">
        <h2>Driver Performance</h2>
        <div class="chart"></div> <!-- Placeholder for chart -->
      </section>
    </main>
  </div>

  <script>
    // Add any dashboard-specific scripts here
    console.log('Dashboard loaded');
  </script>
</body>
</html>`;
  }

  // Template 3: Recruitment Hub (Modern Design with Application Form and Modal Popups)
  getRecruitmentHubTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recruitment Hub - My VTC</title>
  <style>
    :root {
      --vtc-primary: #34495e;
      --vtc-accent: #e67e22;
      --vtc-bg: #f4f6f8;
      --vtc-text: #2c3e50;
      --vtc-card: #ffffff;
      --vtc-shadow: 0 5px 15px rgba(0,0,0,0.08);
      --vtc-gradient: linear-gradient(135deg, var(--vtc-accent) 0%, #d35400 100%);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Montserrat', sans-serif;
      background: var(--vtc-bg);
      color: var(--vtc-text);
      line-height: 1.6;
    }

    .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

    header {
      background: var(--vtc-gradient);
      color: white;
      text-align: center;
      padding: 5rem 0;
      position: relative;
    }

    header h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    header p {
      font-size: 1.2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .section {
      padding: 4rem 0;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .benefit-card {
      background: var(--vtc-card);
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: var(--vtc-shadow);
      text-align: center;
      transition: transform 0.3s;
    }

    .benefit-card:hover {
      transform: translateY(-5px);
    }

    .benefit-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: var(--vtc-accent);
    }

    .form-container {
      background: var(--vtc-card);
      padding: 3rem;
      border-radius: 1rem;
      box-shadow: var(--vtc-shadow);
      max-width: 600px;
      margin: 0 auto;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    input, textarea {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 0.5rem;
      font-size: 1rem;
    }

    button {
      background: var(--vtc-gradient);
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 0.5rem;
      font-size: 1.1rem;
      cursor: pointer;
      transition: opacity 0.3s;
    }

    button:hover {
      opacity: 0.9;
    }

    /* Modal Styles */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }

    .modal.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      max-width: 400px;
      text-align: center;
    }

    .modal-close {
      float: right;
      cursor: pointer;
      font-size: 1.5rem;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      header h1 { font-size: 2.5rem; }
      .form-container { padding: 2rem; }
    }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>Join My VTC Today!</h1>
      <p>Become part of a thriving community of truckers. Experience organized convoys and professional hauling.</p>
    </div>
  </header>

  <section class="section" id="benefits">
    <div class="container">
      <h2 style="text-align: center; margin-bottom: 3rem; font-size: 2.5rem;">Why Join Us?</h2>
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">🚚</div>
          <h3>Regular Convoys</h3>
          <p>Participate in weekly organized events across Europe.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🏆</div>
          <h3>Achievements</h3>
          <p>Earn badges and ranks for your performance.</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">🤝</div>
          <h3>Community</h3>
          <p>Make friends with fellow trucking enthusiasts.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="apply">
    <div class="container">
      <h2 style="text-align: center; margin-bottom: 2rem; font-size: 2.5rem;">Apply Now</h2>
      <div class="form-container">
        <form onsubmit="submitApplication(); return false;">
          <input type="text" placeholder="Your Name" required>
          <input type="email" placeholder="Your Email" required>
          <input type="text" placeholder="Discord Username" required>
          <textarea placeholder="Why do you want to join?" rows="4" required></textarea>
          <button type="submit">Submit Application</button>
        </form>
      </div>
    </div>
  </section>

  <!-- Modal for Submission Confirmation -->
  <div class="modal" id="successModal">
    <div class="modal-content">
      <span class="modal-close" onclick="closeModal()">&times;</span>
      <h3>Application Submitted!</h3>
      <p>We'll review your application and get back to you soon via Discord.</p>
    </div>
  </div>

  <script>
    function submitApplication() {
      // Simulate form submission
      document.getElementById('successModal').classList.add('active');
    }

    function closeModal() {
      document.getElementById('successModal').classList.remove('active');
    }
  </script>
</body>
</html>`;
  }

  // Template 4: Driver Hub (Clean Profile Design with Stats and Modern Layout)
  getDriverHubTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Driver Hub - My VTC</title>
  <style>
    :root {
      --vtc-primary: #16a085;
      --vtc-accent: #f39c12;
      --vtc-bg: #ffffff;
      --vtc-text: #333;
      --vtc-card: #f9f9f9;
      --vtc-shadow: 0 3px 12px rgba(0,0,0,0.1);
      --vtc-gradient: linear-gradient(135deg, var(--vtc-primary) 0%, var(--vtc-accent) 100%);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Open Sans', sans-serif;
      background: var(--vtc-bg);
      color: var(--vtc-text);
      line-height: 1.6;
    }

    .profile-header {
      background: var(--vtc-gradient);
      color: white;
      text-align: center;
      padding: 4rem 0;
    }

    .profile-avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 5px solid white;
      margin-bottom: 1rem;
    }

    .profile-name {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .profile-role {
      font-size: 1.2rem;
      opacity: 0.9;
    }

    .stats-section {
      padding: 3rem 0;
      max-width: 1200px;
      margin: 0 auto;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      padding: 0 2rem;
    }

    .stat-card {
      background: var(--vtc-card);
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: var(--vtc-shadow);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-icon {
      font-size: 3rem;
      color: var(--vtc-accent);
      margin-bottom: 1rem;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: bold;
      color: var(--vtc-primary);
    }

    .stat-label {
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #777;
    }

    /* Modern Progress Bar */
    .progress-bar {
      width: 100%;
      background: #eee;
      border-radius: 2rem;
      overflow: hidden;
      margin-top: 1rem;
    }

    .progress-fill {
      height: 10px;
      background: var(--vtc-gradient);
      transition: width 0.5s;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .profile-name { font-size: 2rem; }
      .stats-grid { padding: 0 1rem; }
    }
  </style>
</head>
<body>
  <header class="profile-header">
    <img src="https://placehold.co/150x150/16a085/ffffff?text=Driver" alt="Driver Avatar" class="profile-avatar">
    <h1 class="profile-name">John Doe</h1>
    <p class="profile-role">Senior Driver | Since 2022</p>
  </header>

  <section class="stats-section">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-number">1,250</div>
        <div class="stat-label">Deliveries Completed</div>
        <div class="progress-bar"><div class="progress-fill" style="width: 85%;"></div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🛣️</div>
        <div class="stat-number">45,000</div>
        <div class="stat-label">Kilometers Driven</div>
        <div class="progress-bar"><div class="progress-fill" style="width: 70%;"></div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏅</div>
        <div class="stat-number">15</div>
        <div class="stat-label">Achievements Unlocked</div>
        <div class="progress-bar"><div class="progress-fill" style="width: 60%;"></div></div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🚛</div>
        <div class="stat-number">8</div>
        <div class="stat-label">Trucks Owned</div>
        <div class="progress-bar"><div class="progress-fill" style="width: 40%;"></div></div>
      </div>
    </div>
  </section>

  <script>
    // Add animation to progress bars on load
    window.addEventListener('load', () => {
      document.querySelectorAll('.progress-fill').forEach(bar => {
        bar.style.width = '0%';
        setTimeout(() => bar.style.width = bar.getAttribute('style').match(/width:\s*(\d+)%/)[1] + '%', 100);
      });
    });
  </script>
</body>
</html>`;
  }

  // Template 5: Fleet Monitor (Grid-Based Design with Vehicle Cards and Modal Details)
  getFleetMonitorTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fleet Monitor - My VTC</title>
  <style>
    :root {
      --vtc-primary: #27ae60;
      --vtc-accent: #e74c3c;
      --vtc-bg: #f0f3f4;
      --vtc-text: #2c3e50;
      --vtc-card: #fff;
      --vtc-shadow: 0 4px 8px rgba(0,0,0,0.1);
      --vtc-gradient: linear-gradient(135deg, var(--vtc-primary) 0%, var(--vtc-accent) 100%);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Lato', sans-serif;
      background: var(--vtc-bg);
      color: var(--vtc-text);
    }

    .fleet-header {
      background: var(--vtc-gradient);
      color: white;
      padding: 3rem;
      text-align: center;
    }

    .fleet-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      padding: 3rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .vehicle-card {
      background: var(--vtc-card);
      border-radius: 1rem;
      overflow: hidden;
      box-shadow: var(--vtc-shadow);
      transition: transform 0.3s;
      cursor: pointer;
    }

    .vehicle-card:hover {
      transform: scale(1.03);
    }

    .vehicle-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .vehicle-info {
      padding: 1.5rem;
    }

    .vehicle-title {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .vehicle-status {
      font-size: 0.9rem;
      color: #777;
      margin-bottom: 1rem;
    }

    .vehicle-stats {
      display: flex;
      justify-content: space-between;
    }

    .stat {
      text-align: center;
    }

    .stat-value {
      font-weight: bold;
      color: var(--vtc-primary);
    }

    /* Modal for Vehicle Details */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }

    .modal.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      max-width: 500px;
      position: relative;
    }

    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
      font-size: 1.5rem;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .fleet-grid { padding: 2rem 1rem; }
    }
  </style>
</head>
<body>
  <header class="fleet-header">
    <h1>My VTC Fleet Monitor</h1>
    <p>Track and manage your fleet in real-time</p>
  </header>

  <section class="fleet-grid">
    <div class="vehicle-card" onclick="showVehicleModal('Truck 1', 'Active', '15000 km', 'Volvo FH16', 'Excellent')">
      <img src="https://placehold.co/300x200/27ae60/ffffff?text=Truck+1" alt="Truck 1" class="vehicle-image">
      <div class="vehicle-info">
        <h2 class="vehicle-title">Volvo FH16</h2>
        <p class="vehicle-status">Status: Active</p>
        <div class="vehicle-stats">
          <div class="stat"><span class="stat-value">15,000</span><br>Mileage (km)</div>
          <div class="stat"><span class="stat-value">Excellent</span><br>Condition</div>
        </div>
      </div>
    </div>
    <div class="vehicle-card" onclick="showVehicleModal('Truck 2', 'Maintenance', '32000 km', 'Scania R730', 'Good')">
      <img src="https://placehold.co/300x200/e74c3c/ffffff?text=Truck+2" alt="Truck 2" class="vehicle-image">
      <div class="vehicle-info">
        <h2 class="vehicle-title">Scania R730</h2>
        <p class="vehicle-status">Status: Maintenance</p>
        <div class="vehicle-stats">
          <div class="stat"><span class="stat-value">32,000</span><br>Mileage (km)</div>
          <div class="stat"><span class="stat-value">Good</span><br>Condition</div>
        </div>
      </div>
    </div>
    <!-- Add more vehicle cards as needed -->
  </section>

  <!-- Modal for Vehicle Details -->
  <div class="modal" id="vehicleModal">
    <div class="modal-content">
      <span class="modal-close" onclick="closeVehicleModal()">&times;</span>
      <h2 id="modalTitle"></h2>
      <p id="modalStatus"></p>
      <p id="modalMileage"></p>
      <p id="modalModel"></p>
      <p id="modalCondition"></p>
    </div>
  </div>

  <script>
    function showVehicleModal(title, status, mileage, model, condition) {
      document.getElementById('modalTitle').textContent = title;
      document.getElementById('modalStatus').textContent = 'Status: ' + status;
      document.getElementById('modalMileage').textContent = 'Mileage: ' + mileage;
      document.getElementById('modalModel').textContent = 'Model: ' + model;
      document.getElementById('modalCondition').textContent = 'Condition: ' + condition;
      document.getElementById('vehicleModal').classList.add('active');
    }

    function closeVehicleModal() {
      document.getElementById('vehicleModal').classList.remove('active');
    }
  </script>
</body>
</html>`;
  }

  // Template 6: Convoy Organizer (Calendar-Based Design with Event Modals)
  getConvoyOrganizerTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Convoy Organizer - My VTC</title>
  <style>
    :root {
      --vtc-primary: #8e44ad;
      --vtc-accent: #2ecc71;
      --vtc-bg: #f5f5f5;
      --vtc-text: #333;
      --vtc-card: #fff;
      --vtc-shadow: 0 2px 8px rgba(0,0,0,0.15);
      --vtc-gradient: linear-gradient(135deg, var(--vtc-primary) 0%, var(--vtc-accent) 100%);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Raleway', sans-serif;
      background: var(--vtc-bg);
      color: var(--vtc-text);
    }

    .organizer-header {
      background: var(--vtc-gradient);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }

    .calendar {
      max-width: 1000px;
      margin: 3rem auto;
      padding: 0 2rem;
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1rem;
    }

    .day-header {
      font-weight: bold;
      text-align: center;
      color: #777;
    }

    .day {
      background: var(--vtc-card);
      padding: 1rem;
      border-radius: 0.75rem;
      box-shadow: var(--vtc-shadow);
      min-height: 120px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .day:hover {
      background: #f0f0f0;
    }

    .day-number {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    .event {
      background: var(--vtc-accent);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      margin-top: 0.5rem;
      font-size: 0.85rem;
    }

    /* Modal for Event Details */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }

    .modal.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      max-width: 400px;
    }

    .modal-close {
      float: right;
      cursor: pointer;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .calendar-grid { grid-template-columns: repeat(1, 1fr); }
    }
  </style>
</head>
<body>
  <header class="organizer-header">
    <h1>Convoy Organizer</h1>
    <p>Plan and join upcoming convoys</p>
  </header>

  <section class="calendar">
    <div class="calendar-grid">
      <div class="day-header">Sun</div>
      <div class="day-header">Mon</div>
      <div class="day-header">Tue</div>
      <div class="day-header">Wed</div>
      <div class="day-header">Thu</div>
      <div class="day-header">Fri</div>
      <div class="day-header">Sat</div>

      <!-- Example Days -->
      <div class="day" onclick="showEventModal('October 1', 'No Events')">
        <div class="day-number">1</div>
      </div>
      <div class="day" onclick="showEventModal('October 2', 'Weekly Convoy - Paris to Berlin')">
        <div class="day-number">2</div>
        <div class="event">Weekly Convoy</div>
      </div>
      <!-- Add more days as needed for a full calendar -->
    </div>
  </section>

  <!-- Modal for Event Details -->
  <div class="modal" id="eventModal">
    <div class="modal-content">
      <span class="modal-close" onclick="closeEventModal()">&times;</span>
      <h2 id="eventDate"></h2>
      <p id="eventDescription"></p>
      <button style="background: var(--vtc-accent); color: white; padding: 0.75rem; border: none; border-radius: 0.5rem; margin-top: 1rem;">Join Event</button>
    </div>
  </div>

  <script>
    function showEventModal(date, description) {
      document.getElementById('eventDate').textContent = date;
      document.getElementById('eventDescription').textContent = description;
      document.getElementById('eventModal').classList.add('active');
    }

    function closeEventModal() {
      document.getElementById('eventModal').classList.remove('active');
    }
  </script>
</body>
</html>`;
  }

  // Template 7: Premium Showcase (Elegant Gallery Design with Image Modals and Modern Hover Effects)
  getPremiumShowcaseTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Premium Showcase - My VTC</title>
  <style>
    :root {
      --vtc-primary: #2980b9;
      --vtc-accent: #f1c40f;
      --vtc-bg: #2c3e50;
      --vtc-text: #ecf0f1;
      --vtc-card: rgba(255,255,255,0.05);
      --vtc-shadow: 0 8px 20px rgba(0,0,0,0.2);
      --vtc-gradient: linear-gradient(135deg, var(--vtc-primary) 0%, var(--vtc-accent) 100%);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Poppins', sans-serif;
      background: var(--vtc-bg);
      color: var(--vtc-text);
    }

    .showcase-header {
      text-align: center;
      padding: 5rem 0;
      background: var(--vtc-gradient);
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      padding: 3rem 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: 1rem;
      box-shadow: var(--vtc-shadow);
      cursor: pointer;
    }

    .gallery-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      transition: transform 0.5s;
    }

    .gallery-item:hover .gallery-image {
      transform: scale(1.1);
    }

    .gallery-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background: rgba(0,0,0,0.6);
      padding: 1rem;
      text-align: center;
      transition: bottom 0.3s;
    }

    .gallery-item:hover .gallery-overlay {
      bottom: 0;
    }

    /* Modal for Image Zoom */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }

    .modal.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-image {
      max-width: 90%;
      max-height: 90%;
      border-radius: 1rem;
    }

    .modal-close {
      position: absolute;
      top: 2rem;
      right: 2rem;
      color: white;
      font-size: 2rem;
      cursor: pointer;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .gallery { padding: 2rem 1rem; }
    }
  </style>
</head>
<body>
  <header class="showcase-header">
    <h1>Premium VTC Showcase</h1>
    <p>Explore our premium fleet and convoys</p>
  </header>

  <section class="gallery">
    <div class="gallery-item" onclick="showImageModal('https://placehold.co/300x300/2980b9/ecf0f1?text=Convoy+1')">
      <img src="https://placehold.co/300x300/2980b9/ecf0f1?text=Convoy+1" alt="Convoy 1" class="gallery-image">
      <div class="gallery-overlay">
        <h3>Convoy Event 1</h3>
      </div>
    </div>
    <div class="gallery-item" onclick="showImageModal('https://placehold.co/300x300/f1c40f/2c3e50?text=Truck+Premium')">
      <img src="https://placehold.co/300x300/f1c40f/2c3e50?text=Truck+Premium" alt="Truck Premium" class="gallery-image">
      <div class="gallery-overlay">
        <h3>Premium Truck</h3>
      </div>
    </div>
    <!-- Add more gallery items as needed -->
  </section>

  <!-- Modal for Image Zoom -->
  <div class="modal" id="imageModal" onclick="closeImageModal()">
    <span class="modal-close" onclick="closeImageModal()">&times;</span>
    <img id="modalImg" class="modal-image" src="">
  </div>

  <script>
    function showImageModal(src) {
      document.getElementById('modalImg').src = src;
      document.getElementById('imageModal').classList.add('active');
    }

    function closeImageModal() {
      document.getElementById('imageModal').classList.remove('active');
    }
  </script>
</body>
</html>`;
  }
}

// Payment Maintenance System
class PaymentMaintenance {
  static init() {
    try {
      // Intercept payment-related links on pricing page
      this.interceptPaymentLinks();
      console.log('PaymentMaintenance initialized successfully');
    } catch (error) {
      console.error('PaymentMaintenance initialization failed:', error);
    }
  }

  static interceptPaymentLinks() {
    try {
      // Wait for page to load and then attach listeners
      setTimeout(() => {
        try {
          // Target payment buttons (but allow pro-trial.html to load since it has its own maintenance notice)
          const paymentButtons = document.querySelectorAll('a[href*="payment"], a[href*="checkout"], a[href*="billing"]');
          
          paymentButtons.forEach(button => {
            if (button) {
              button.addEventListener('click', (e) => {
                e.preventDefault();
                this.showMaintenanceModal();
              });
            }
          });

          // Also intercept any button with payment-related text (except pro-trial links)
          const allButtons = document.querySelectorAll('a.btn-primary, button.btn-primary');
          allButtons.forEach(button => {
            if (button) {
              const text = button.textContent.toLowerCase();
              const href = button.getAttribute('href');
              
              // Skip pro-trial.html links since that page handles maintenance properly
              if (href === 'pro-trial.html') {
                return;
              }
              
              if (text.includes('upgrade') || text.includes('subscribe') || text.includes('buy') || text.includes('purchase')) {
                button.addEventListener('click', (e) => {
                  e.preventDefault();
                  this.showMaintenanceModal();
                });
              }
            }
          });
        } catch (innerError) {
          console.error('Error setting up payment link interceptors:', innerError);
        }
      }, 500);
    } catch (error) {
      console.error('Intercept payment links failed:', error);
    }
  }

  static showMaintenanceModal() {
    // Create modal using existing createModal method from VTCStudio class
    const modal = this.createModal({
      title: 'Payment System Under Maintenance',
      content: `
        <div style="padding: 2rem; text-align: center;">
          <div style="margin-bottom: 2rem;">
            <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1.5rem;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#f59e0b">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                <h3 style="margin: 0; color: #f59e0b; font-size: 1.3rem; font-weight: 600;">System Maintenance</h3>
              </div>
              <p style="color: var(--text-secondary); line-height: 1.6; margin: 0; font-size: 1rem;">
                Our payment system is currently under maintenance to improve your experience. 
                We're working hard to get everything back online as soon as possible.
              </p>
            </div>
            
            <div style="background: var(--surface-hover); border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem;">
              <h4 style="color: var(--text-primary); margin-bottom: 1rem; font-size: 1.1rem;">Need immediate assistance?</h4>
              <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.5;">
                Join our Discord community where our team can help you with pricing questions, 
                custom solutions, and provide updates on when payments will be available again.
              </p>
              
              <a href="https://discord.gg/D442vYePUR" target="_blank" style="
                display: inline-flex; 
                align-items: center; 
                gap: 0.75rem; 
                padding: 1rem 1.5rem; 
                background: var(--gradient-accent); 
                color: white; 
                text-decoration: none; 
                border-radius: var(--radius-lg); 
                font-weight: 600;
                transition: all 0.3s ease;
                box-shadow: var(--shadow-sm);
              " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-sm)'">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Join Discord Community</span>
              </a>
            </div>
          </div>
          
          <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 1.5rem;">
            💡 <strong>In the meantime:</strong> You can still use our free plan and all website building features!
          </p>
        </div>
      `
    });
    
    document.body.appendChild(modal);
  }

  static createModal({ title, content }) {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(4px);
    `;

    modal.innerHTML = `
      <div style="
        background: var(--surface);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        border: 1px solid var(--border);
      ">
        <div style="
          padding: var(--space-6);
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600;">${title}</h3>
          <button class="modal-close-btn" style="
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-secondary);
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: all 0.2s ease;
          " onmouseover="this.style.background='var(--surface-hover)'" onmouseout="this.style.background='none'">&times;</button>
        </div>
        <div>${content}</div>
      </div>
    `;

    // Add close button functionality
    const closeBtn = modal.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    return modal;
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Core components initialization with error handling
    SiteComponents.init();
    AnimationController.init();
    
    // Initialize payment maintenance system
    PaymentMaintenance.init();
    
    // Start the editor only on pages that have its elements
    if (document.getElementById('code-editor') && document.getElementById('live-preview')) {
      try { 
        new VTCStudio(); 
        console.log('VTC Studio initialized successfully');
      } catch (e) { 
        console.error('Editor init failed:', e); 
      }
    }
    
    // Initialize Templates page behaviors when on templates.html
    try {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      if (currentPage === 'templates.html') {
        initTemplateFilters();
        // Expose actions globally for inline handlers in generated modals/buttons
        window.selectTemplate = selectTemplate;
        window.previewTemplate = previewTemplate;
        window.showTemplateInfo = showTemplateInfo;
        window.closeModal = closeModal;
        window.showNotification = showNotification;
        console.log('Templates page initialized successfully');
      }
    } catch (e) {
      console.error('Templates page init failed:', e);
    }
    
    console.log('Application initialization completed successfully');
  } catch (error) {
    console.error('Critical initialization error:', error);
  }
});

// =============================
// Templates Page Helpers
// =============================
function initTemplateFilters() {
  try {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const templateCards = document.querySelectorAll('.template-card');

    if (filterTabs.length === 0) {
      console.warn('No filter tabs found');
      return;
    }

    if (templateCards.length === 0) {
      console.warn('No template cards found');
      return;
    }

    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const category = tab.dataset.category;
        templateCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('fade-in-up'), 10);
          } else {
            card.style.display = 'none';
            card.classList.remove('fade-in-up');
          }
        });
      });
    });
  } catch (error) {
    console.error('Init template filters failed:', error);
  }
}

function selectTemplate(templateId) {
  const button = document.querySelector(`[data-template="${templateId}"]`);
  if (button) {
    const originalContent = button.innerHTML;
    button.innerHTML = `
      <div class="btn-content">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="loading-spinner">
          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
        </svg>
        <span class="btn-text">Loading...</span>
        <span class="btn-subtext">Preparing template</span>
      </div>
    `;
    button.disabled = true;
    setTimeout(() => {
      button.innerHTML = originalContent;
      button.disabled = false;
    }, 2000);
  }
  
  // Check if this is a VTC template (our new templates)
  if (templateId.startsWith('vtc-')) {
    showNotification(`Template "${getTemplateDisplayName(templateId)}" selected! Opening in editor...`, 'success');
    setTimeout(() => {
      window.location.href = `vtc-template-editor.html?template=${templateId}`;
    }, 1000);
  } else {
    // Original template workflow
    showNotification(`Template "${getTemplateDisplayName(templateId)}" selected! Redirecting to editor...`, 'success');
    setTimeout(() => {
      window.location.href = 'create.html?t=' + encodeURIComponent(templateId);
    }, 2000);
  }
}

function previewTemplate(templateId) {
  // Check if this is a VTC template
  if (templateId.startsWith('vtc-')) {
    // Open the actual VTC template file in a new window
    const templateFiles = {
      'vtc-dashboard': 'vtc-dashboard-template.html',
      'vtc-recruitment': 'vtc-recruitment-template.html',
      'vtc-community': 'vtc-community-template.html',
      'vtc-fleet-management': 'vtc-fleet-management-template.html',
      'vtc-event-convoy': 'vtc-event-convoy-template.html',
      'vtc-premium-showcase': 'vtc-premium-showcase-template.html'
    };
    
    const templateFile = templateFiles[templateId];
    if (templateFile) {
      window.open(templateFile, '_blank');
      showNotification(`Opening preview for "${getTemplateDisplayName(templateId)}"...`, 'info');
    } else {
      showNotification('Template preview not available', 'error');
    }
  } else {
    // Original template preview
    showTemplatePreview(templateId);
    showNotification(`Opening preview for "${getTemplateDisplayName(templateId)}"...`, 'info');
  }
}

function showTemplateInfo(templateId) {
  if (templateId.startsWith('vtc-')) {
    showVTCTemplateInfoModal(templateId);
  } else {
    showTemplateInfoModal(templateId);
  }
}

function showVTCTemplateInfoModal(templateId) {
  const templateDetails = {
    'vtc-dashboard': {
      name: 'Modern VTC Dashboard',
      description: 'A comprehensive dashboard template designed specifically for VTC management.',
      features: [
        'Real-time driver statistics and analytics',
        'Interactive charts and data visualization',
        'Driver management with detailed profiles',
        'Job tracking and completion status',
        'Notification system for important updates',
        'Dark theme with purple/cyan gradients',
        'Fully responsive design for all devices',
        'Accessibility features with ARIA labels'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Grid', 'Responsive Design'],
      difficulty: 'Intermediate',
      customizable: true
    },
    'vtc-recruitment': {
      name: 'Advanced Recruitment Hub',
      description: 'Modern recruitment platform with comprehensive application management.',
      features: [
        'Multi-step application form with validation',
        'Testimonial carousel system',
        'Interactive FAQ with smooth animations',
        'Company showcase and benefits section',
        'Application status tracking',
        'Blue/orange color scheme',
        'Mobile-first responsive design',
        'Form validation and submission handling'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Flexbox', 'Form Validation'],
      difficulty: 'Beginner to Intermediate',
      customizable: true
    },
    'vtc-community': {
      name: 'Community Hub',
      description: 'Social platform for VTC members with community features.',
      features: [
        'Member directory with profile management',
        'Event calendar with interactive events',
        'Achievement and badge system',
        'Online status tracking',
        'Community statistics dashboard',
        'Green/red color palette',
        'Profile modal system',
        'Real-time member activity'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Grid', 'Local Storage'],
      difficulty: 'Intermediate',
      customizable: true
    },
    'vtc-fleet-management': {
      name: 'Fleet Management System',
      description: 'Professional fleet tracking and vehicle management platform.',
      features: [
        'Vehicle tracking with status indicators',
        'Maintenance scheduling system',
        'Fleet overview with search and filters',
        'Vehicle detail modals',
        'Real-time status updates',
        'Slate/cyan professional theme',
        'Tabbed interface for organization',
        'Data export capabilities'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Grid', 'Data Management'],
      difficulty: 'Intermediate to Advanced',
      customizable: true
    },
    'vtc-event-convoy': {
      name: 'Event & Convoy Manager',
      description: 'Complete event management with calendar and booking system.',
      features: [
        'Interactive calendar with event grid',
        'Event registration and booking forms',
        'Countdown timers for events',
        'Route visualization system',
        'Event categories and filtering',
        'Purple/green gradient theme',
        'Modal-based event details',
        'Attendee management'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Grid', 'Date/Time APIs'],
      difficulty: 'Advanced',
      customizable: true
    },
    'vtc-premium-showcase': {
      name: 'Premium Showcase',
      description: 'Luxury template with advanced animations and premium feel.',
      features: [
        'Particle animation background',
        'Parallax scrolling effects',
        'Premium gold/black color scheme',
        'Interactive portfolio gallery',
        'Team member profiles',
        'Statistics counter animations',
        'Multiple modal systems',
        'Advanced hover effects'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'CSS Animations', 'Advanced Effects'],
      difficulty: 'Advanced',
      customizable: true
    }
  };

  const template = templateDetails[templateId];
  if (!template) {
    showNotification('Template information not available', 'error');
    return;
  }

  const modal = createModal({
    title: template.name,
    content: `
      <div style="padding: 2rem;">
        <div style="margin-bottom: 2rem;">
          <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.6; margin-bottom: 1.5rem;">
            ${template.description}
          </p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
            <div>
              <h4 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.1rem;">Template Details</h4>
              <div style="background: var(--surface-hover); padding: 1rem; border-radius: 8px;">
                <p style="margin-bottom: 0.5rem;"><strong>Difficulty:</strong> ${template.difficulty}</p>
                <p style="margin-bottom: 0.5rem;"><strong>Customizable:</strong> ${template.customizable ? 'Yes' : 'No'}</p>
                <p><strong>Technologies:</strong> ${template.technologies.join(', ')}</p>
              </div>
            </div>
            
            <div>
              <h4 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.1rem;">Quick Actions</h4>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <button onclick="previewTemplate('${templateId}'); this.closest('[style*=\"position: fixed\"]').remove();" 
                        style="padding: 0.75rem; background: var(--primary); color: white; border: none; border-radius: 6px; cursor: pointer;">
                  👁️ Live Preview
                </button>
                <button onclick="selectTemplate('${templateId}'); this.closest('[style*=\"position: fixed\"]').remove();" 
                        style="padding: 0.75rem; background: var(--accent); color: white; border: none; border-radius: 6px; cursor: pointer;">
                  🚀 Use Template
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.1rem;">Features Included</h4>
          <div style="background: var(--surface-hover); padding: 1.5rem; border-radius: 8px;">
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${template.features.map(feature => `
                <li style="display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.75rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">
                  <span style="color: var(--accent); font-size: 1rem; margin-top: 0.1rem;">✅</span>
                  <span style="color: var(--text-secondary); line-height: 1.5;">${feature}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `
  });
  
  document.body.appendChild(modal);
}

function showComingSoonInfo() {
  const modal = createModal({
    title: 'More Templates Coming Soon!',
    content: `
      <div style="padding: 2rem; text-align: center;">
        <div style="margin-bottom: 2rem;">
          <div style="background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 0.2); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 1.5rem;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--primary)">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <h3 style="margin: 0; color: var(--primary); font-size: 1.3rem; font-weight: 600;">Exciting Templates in Development</h3>
            </div>
            <p style="color: var(--text-secondary); line-height: 1.6; margin: 0; font-size: 1rem;">
              We're working on even more amazing VTC templates to help you create the perfect website for your trucking company.
            </p>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
            <div style="background: var(--surface-hover); padding: 1.5rem; border-radius: 8px;">
              <h4 style="color: var(--primary); margin-bottom: 1rem;">📊 Analytics Dashboard</h4>
              <p style="color: var(--text-secondary); font-size: 0.9rem;">Advanced analytics with charts, graphs, and business intelligence for your VTC</p>
            </div>
            
            <div style="background: var(--surface-hover); padding: 1.5rem; border-radius: 8px;">
              <h4 style="color: var(--primary); margin-bottom: 1rem;">📱 Mobile-First Design</h4>
              <p style="color: var(--text-secondary); font-size: 0.9rem;">Templates optimized specifically for mobile users and touch interfaces</p>
            </div>
            
            <div style="background: var(--surface-hover); padding: 1.5rem; border-radius: 8px;">
              <h4 style="color: var(--primary); margin-bottom: 1rem;">🛍️ E-Commerce Integration</h4>
              <p style="color: var(--text-secondary); font-size: 0.9rem;">Sell merchandise and services directly from your VTC website</p>
            </div>
            
            <div style="background: var(--surface-hover); padding: 1.5rem; border-radius: 8px;">
              <h4 style="color: var(--primary); margin-bottom: 1rem;">📚 Knowledge Base</h4>
              <p style="color: var(--text-secondary); font-size: 0.9rem;">Documentation and tutorial systems for driver training and support</p>
            </div>
          </div>
          
          <div style="background: var(--surface-hover); border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem;">
            <h4 style="color: var(--text-primary); margin-bottom: 1rem; font-size: 1.1rem;">Want to be notified when they're ready?</h4>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.5;">
              Join our Discord community to get instant updates on new templates, features, and exclusive early access!
            </p>
            
            <a href="https://discord.gg/D442vYePUR" target="_blank" style="
              display: inline-flex; 
              align-items: center; 
              gap: 0.75rem; 
              padding: 1rem 1.5rem; 
              background: var(--gradient-accent); 
              color: white; 
              text-decoration: none; 
              border-radius: var(--radius-lg); 
              font-weight: 600;
              transition: all 0.3s ease;
              box-shadow: var(--shadow-sm);
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-lg)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-sm)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Join Discord for Updates</span>
            </a>
          </div>
        </div>
        
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 1.5rem;">
          💡 <strong>In the meantime:</strong> Try our existing VTC templates - they're fully functional and ready to use!
        </p>
      </div>
    `
  });
  
  document.body.appendChild(modal);
}

function showTemplatePreview(templateId) {
  const modal = document.createElement('div');
  modal.className = 'template-modal';
  modal.innerHTML = `
    <div class="modal-overlay" onclick="closeModal()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>Template Preview: ${getTemplateDisplayName(templateId)}</h3>
        <button class="modal-close" onclick="closeModal()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="preview-container">
          <div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f8fafc;color:#64748b;">
            <div style="text-align:center;">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style="margin-bottom:1rem;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-8 8z"/>
              </svg>
              <p>Template preview would be displayed here</p>
            </div>
          </div>
        </div>
        <div class="preview-actions">
          <button class="btn btn-primary" onclick="selectTemplate('${templateId}'); closeModal();">Use This Template</button>
          <button class="btn btn-outline" onclick="closeModal()">Close Preview</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
  document.addEventListener('keydown', onKey, { once: true });
  setTimeout(() => modal.classList.add('active'), 10);
}

function showTemplateInfoModal(templateId) {
  const templateData = getTemplateData(templateId);
  const modal = document.createElement('div');
  modal.className = 'template-modal';
  modal.innerHTML = `
    <div class="modal-overlay" onclick="closeModal()"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3>Template Details: ${templateData.name}</h3>
        <button class="modal-close" onclick="closeModal()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="template-details">
          <div class="detail-section">
            <h4>Description</h4>
            <p>${templateData.description}</p>
          </div>
          <div class="detail-section">
            <h4>Features</h4>
            <ul class="feature-list">
              ${templateData.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
          <div class="detail-section">
            <h4>Technical Details</h4>
            <div class="tech-specs">
              <div class="spec-item">
                <span class="spec-label">Category:</span>
                <span class="spec-value">${templateData.category}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Responsive:</span>
                <span class="spec-value">✓ Mobile & Desktop</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Browser Support:</span>
                <span class="spec-value">Chrome, Firefox, Safari, Edge</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-primary" onclick="selectTemplate('${templateId}'); closeModal();">Use This Template</button>
          <button class="btn btn-outline" onclick="closeModal(); previewTemplate('${templateId}');">Preview Template</button>
          <button class="btn btn-outline" onclick="closeModal()">Close</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
  document.addEventListener('keydown', onKey, { once: true });
  setTimeout(() => modal.classList.add('active'), 10);
}

function closeModal() {
  const modal = document.querySelector('.template-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
}

function getTemplateDisplayName(templateId) {
  const names = {
    'dashboard-pro': 'VTC Dashboard Pro',
    'landing-modern': 'VTC Landing Page',
    'profile-dashboard': 'Driver Profile Dashboard',
    'fleet-tracker': 'Fleet Tracking System',
    'convoy-planner': 'Convoy Planner Suite',
    'recruitment-classic': 'Recruitment Classic',
    // VTC Templates
    'vtc-dashboard': 'Modern VTC Dashboard',
    'vtc-recruitment': 'Advanced Recruitment Hub',
    'vtc-community': 'Community Hub',
    'vtc-fleet-management': 'Fleet Management System',
    'vtc-event-convoy': 'Event & Convoy Manager',
    'vtc-premium-showcase': 'Premium Showcase'
  };
  return names[templateId] || templateId;
}

function getTemplateData(templateId) {
  const templates = {
    'dashboard-pro': {
      name: 'VTC Dashboard Pro',
      category: 'Dashboard',
      description: 'Complete VTC management dashboard with driver stats, job tracking, fleet management, and analytics. Perfect for managing your virtual trucking company operations.',
      features: [
        'Driver Management System',
        'Job Tracking & Analytics',
        'Fleet Management Tools',
        'Performance Analytics',
        'Real-time Statistics',
        'Custom Reporting'
      ]
    },
    'landing-modern': {
      name: 'VTC Landing Page',
      category: 'Landing Page',
      description: 'Modern landing page perfect for VTC recruitment and showcasing your company\'s services and achievements. Designed to convert visitors into drivers.',
      features: [
        'Recruitment Focus',
        'Service Showcase',
        'Mobile Ready Design',
        'Contact Forms',
        'Achievement Display',
        'SEO Optimized'
      ]
    },
    'profile-dashboard': {
      name: 'Driver Profile Dashboard',
      category: 'Profile',
      description: 'Comprehensive driver profile with performance metrics, achievements, and detailed analytics for VTC members. Motivate your drivers with detailed insights.',
      features: [
        'Performance Tracking',
        'Achievement System',
        'Detailed Analytics',
        'Progress Visualization',
        'Ranking System',
        'Personal Statistics'
      ]
    },
    'fleet-tracker': {
      name: 'Fleet Tracking System',
      category: 'Dashboard',
      description: 'Real-time fleet tracking interface with live maps, vehicle status monitoring, and route management. Keep track of your entire fleet in real-time.',
      features: [
        'Live GPS Tracking',
        'Route Management',
        'Vehicle Status Monitoring',
        'Real-time Updates',
        'Map Integration',
        'Alert System'
      ]
    },
    'convoy-planner': {
      name: 'Convoy Planner Suite',
      category: 'Dashboard',
      description: 'Plan, schedule, and coordinate convoys with integrated routes, waypoints, and role assignments for smooth weekly events.',
      features: [
        'Event Scheduling',
        'Route & Waypoints',
        'Role Assignments',
        'Registration Forms',
        'Exports & Sharing',
        'Organizer Tools'
      ]
    },
    'recruitment-classic': {
      name: 'Recruitment Classic',
      category: 'Landing Page',
      description: 'Clean recruitment-focused landing page designed to convert visitors into applicants. Great for fast setup and clarity.',
      features: [
        'Hero + CTA',
        'Benefits Sections',
        'Requirements List',
        'FAQ & Contact',
        'SEO Basics',
        'Mobile Ready'
      ]
    }
  };
  return templates[templateId] || {};
}

function showNotification(message, type = 'success') {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) existingNotification.remove();

  const icons = {
    success: '<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    info: '<path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    warning: '<path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>',
    error: '<path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>'
  };
  const colors = { success: '#059669', info: '#0ea5e9', warning: '#d97706', error: '#dc2626' };

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.setAttribute('role', 'status');
  notification.setAttribute('aria-live', 'polite');
  notification.innerHTML = `
    <div class="notification-content">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color: ${colors[type]}">
        ${icons[type]}
      </svg>
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('active'), 10);
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.remove('active');
      setTimeout(() => notification.remove(), 300);
    }
  }, 4000);
}

// Animation Controller for scroll-triggered animations
class AnimationController {
  static init() {
    try {
      this.observeElements();
      this.addInteractionAnimations();
      console.log('AnimationController initialized successfully');
    } catch (error) {
      console.error('AnimationController initialization failed:', error);
    }
  }

  static observeElements() {
    try {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate');
          }
        });
      }, observerOptions);

      // Observe all animated elements
      const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-right, .slide-in-left, .slide-in-right, .slide-up, .scale-in');
      
      if (animatedElements.length === 0) {
        console.warn('No animated elements found');
        return;
      }
      
      animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
      });
    } catch (error) {
      console.error('Observe elements failed:', error);
    }
  }

  static addInteractionAnimations() {
    try {
      // Add hover effects to cards
      const cards = document.querySelectorAll('.quick-link-card, .feature-card, .template-card');
      cards.forEach(card => {
        if (card) {
          card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
          });
          
          card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
          });
        }
      });

      // Add click effects to buttons
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(button => {
        if (button) {
          button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.position = 'absolute';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
              if (ripple.parentNode) {
                ripple.remove();
              }
            }, 600);
          });
        }
      });
    } catch (error) {
      console.error('Add interaction animations failed:', error);
    }
  }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('🔧 DOM Content Loaded - Starting initialization...');
  try {
    // Initialize core components
    SiteComponents.init();
    
    // Initialize animations only if the page has animated elements
    const hasAnimatedElements = document.querySelectorAll('.fade-in-up, .fade-in-right, .slide-in-left, .slide-in-right').length > 0;
    if (hasAnimatedElements) {
      AnimationController.init();
    }
    
    // Initialize VTC Studio only on create page
    if (window.location.pathname.includes('create.html') || document.getElementById('create-section')) {
      try {
        window.vtcStudio = new VTCStudio();
      } catch (error) {
        console.warn('VTC Studio not needed on this page:', error.message);
      }
    }
    
    console.log('🚀 Web Maker initialized successfully');
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    // Still try to show basic navigation even if other components fail
    try {
      console.log('🔄 Attempting fallback navigation creation...');
      SiteComponents.createNavigation();
      SiteComponents.createFooter();
    } catch (fallbackError) {
      console.error('❌ Fallback initialization also failed:', fallbackError);
    }
  }
});

// Fallback for older browsers without DOMContentLoaded
if (document.readyState === 'loading') {
  // DOM is still loading, wait for DOMContentLoaded
  console.log('⏳ DOM still loading, waiting for DOMContentLoaded...');
} else {
  // DOM is already loaded, initialize immediately
  console.log('⚡ DOM already loaded, initializing immediately...');
  setTimeout(() => {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  }, 0);
}

// Emergency fallback - force navigation creation after 2 seconds if still missing
setTimeout(() => {
  const navCheck = document.querySelector('.navbar .nav-container');
  if (!navCheck) {
    console.log('🚨 Emergency: TruckCraft navigation missing after timeout, creating now...');
    try {
      SiteComponents.createNavigation();
      
      // Double check after emergency creation
      setTimeout(() => {
        const finalCheck = document.querySelector('.navbar .nav-container');
        if (finalCheck) {
          console.log('✅ Emergency navigation creation successful');
        } else {
          console.error('❌ Emergency navigation creation failed - still not found');
        }
      }, 100);
    } catch (error) {
      console.error('❌ Emergency navigation creation failed:', error);
    }
  } else {
    console.log('✅ Navigation verified present after 2 seconds');
  }
}, 2000);