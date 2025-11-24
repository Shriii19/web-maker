// TruckCraft Studio - Centralized Navigation and Footer System

/**
 * Core Site Components
 * Handles dynamic insertion of navigation and footer across all pages
 */
class SiteComponents {
  static init() {
    try {
      this.createNavigation();
      this.createFooter();
      this.setActivePage();
    } catch (error) {
      console.error('SiteComponents initialization failed:', error);
    }
  }

  static createNavigation() {
    // Check if navigation should be excluded
    if (document.body.hasAttribute('data-no-nav')) return;

    // Check for existing navigation
    if (document.querySelector('.navbar .nav-container')) return;

    const pathname = window.location.pathname.split('/').pop();
    const currentPage = pathname || (window.location.pathname === '/' ? 'index.html' : 'index.html');

    const navigationHTML = `
      <nav class="navbar" role="navigation" aria-label="Main Navigation">
        <div class="nav-container">
          <div class="nav-logo">
            <div class="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm5-18v4h3V3h-3z"/>
              </svg>
            </div>
            <span class="nav-title"><a href="index.html" style="color: inherit; text-decoration: none;">TruckCraft Studio</a></span>
          </div>
          
          <button class="mobile-menu-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
          
          <ul class="nav-links">
            <li><a href="index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">Home</a></li>
            <li><a href="about.html" class="nav-link ${currentPage === 'about.html' ? 'active' : ''}">About</a></li>
            <li><a href="features.html" class="nav-link ${currentPage === 'features.html' ? 'active' : ''}">Features</a></li>
            <li><a href="templates.html" class="nav-link ${currentPage === 'templates.html' ? 'active' : ''}">Templates</a></li>
            <li><a href="pro-templates.html" class="nav-link ${currentPage === 'pro-templates.html' ? 'active' : ''}">Pro Templates</a></li>
            <li><a href="pricing.html" class="nav-link ${currentPage === 'pricing.html' ? 'active' : ''}">Pricing</a></li>
            <li><a href="contact.html" class="nav-link ${currentPage === 'contact.html' ? 'active' : ''}">Contact</a></li>
          </ul>
        </div>
      </nav>
    `;

    // Insert after skip link or at beginning of body
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.insertAdjacentHTML('afterend', navigationHTML);
    } else {
      document.body.insertAdjacentHTML('afterbegin', navigationHTML);
    }

    // Mobile menu toggle logic
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', () => {
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        toggleBtn.classList.toggle('active');
      });
    }
  }

  static createFooter() {
    // Check if footer should be excluded
    if (document.body.hasAttribute('data-no-footer')) return;

    // Check for existing footer
    if (document.querySelector('footer.site-footer')) return;

    const footerHTML = `
      <footer class="site-footer" role="contentinfo">
        <div class="footer-container">
          <div class="footer-main">
            <div class="footer-brand">
              <a href="index.html" class="footer-logo" aria-label="TruckCraft Studio Home">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M16 2L3 9v14l13 7 13-7V9L16 2z" fill="currentColor" opacity="0.2"/>
                  <path d="M16 8l8 4.5v9L16 26l-8-4.5v-9L16 8z" fill="currentColor"/>
                  <circle cx="16" cy="16" r="3" fill="white"/>
                </svg>
                <span>TruckCraft Studio</span>
              </a>
              <p class="footer-tagline">Create stunning VTC websites with ease. Professional tools for virtual trucking companies.</p>
              <div class="footer-socials" role="list">
                <!-- Social links will be injected by footer.js -->
              </div>
            </div>
            
            <nav class="footer-links">
              <ul class="footer-links-list">
                <li><a href="about.html">About Us</a></li>
                <li><a href="features.html">Features</a></li>
                <li><a href="pricing.html">Pricing</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </nav>
            
            <nav class="footer-links">
              <ul class="footer-links-list">
                <li><a href="templates.html">Templates</a></li>
                <li><a href="pro-templates.html">Pro Templates</a></li>
                <li><a href="create.html">Create Website</a></li>
              </ul>
            </nav>
            
            <nav class="footer-links">
              <ul class="footer-links-list">
                <li><a href="help.html">Help Center</a></li>
                <li><a href="documentation.html">Documentation</a></li>
                <li><a href="tutorials.html">Tutorials</a></li>
              </ul>
            </nav>
          </div>
          
          <div class="footer-bottom">
            <p class="footer-copyright">© <span id="current-year">${new Date().getFullYear()}</span> TruckCraft Studio. All rights reserved.</p>
            <nav aria-label="Legal">
              <ul class="footer-legal">
                <li><a href="terms.html">Terms of Service</a></li>
                <li><a href="privacy.html">Privacy Policy</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }

  static setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/**
 * VTC Studio - Website Builder Logic
 */
class VTCStudio {
  static init() {
    // Only run on the create page
    if (!document.getElementById('visual-editor')) return;

    console.log('🎨 VTC Studio initializing...');
    this.setupEditor();
    this.setupEventListeners();
    this.loadProject(); // Load saved state if any

    // Expose instance for template loader
    window.vtcStudio = this;
  }

  static setupEditor() {
    this.codeEditor = document.getElementById('code-editor');
    this.previewFrame = document.getElementById('live-preview');
    this.visualEditor = document.getElementById('visual-editor');

    // Initial preview update
    if (this.codeEditor && this.previewFrame) {
      this.updatePreview();

      // Update preview on code change
      this.codeEditor.addEventListener('input', () => {
        this.updatePreview();
      });
    }
  }

  static setupEventListeners() {
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tabId = e.target.dataset.tab;
        this.switchTab(tabId);
      });
    });

    // Device Toggles
    document.querySelectorAll('.device-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const device = e.currentTarget.dataset.device;
        this.setDevice(device);

        // Update active state
        document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
      });
    });

    // Actions
    const applyBtn = document.getElementById('apply-changes');
    if (applyBtn) applyBtn.addEventListener('click', () => this.applyVisualChanges());

    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) downloadBtn.addEventListener('click', () => this.downloadSite());

    const hostBtn = document.getElementById('host-btn');
    if (hostBtn) hostBtn.addEventListener('click', () => this.showHostingOptions());

    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) saveBtn.addEventListener('click', () => this.saveProject());

    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset? All changes will be lost.')) {
        this.resetToTemplate();
      }
    });
  }

  static updatePreview() {
    if (!this.previewFrame || !this.codeEditor) return;
    const content = this.codeEditor.value;
    this.previewFrame.srcdoc = content;
  }

  static switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    if (tabId === 'visual') {
      document.getElementById('visual-editor').classList.add('active');
      this.updatePreview(); // Refresh preview when switching back
    } else {
      document.getElementById('code-editor-pane').classList.add('active');
    }
  }

  static setDevice(device) {
    if (!this.previewFrame) return;
    this.previewFrame.className = `preview-frame ${device}`;
  }

  static applyVisualChanges() {
    // Get values from sidebar inputs
    const companyName = document.getElementById('company-name').value;
    const tagline = document.getElementById('company-tagline').value;
    const discordLink = document.getElementById('discord-link').value;
    const primaryColor = document.getElementById('primary-color').value;

    let code = this.codeEditor.value;

    // Simple string replacements (this is a basic implementation)
    // In a real app, we'd parse the DOM
    if (companyName) {
      code = code.replace(/My VTC/g, companyName);
      // Also try to replace in title tag if possible, but regex is risky
    }

    if (tagline) {
      // Try to find tagline paragraph
      code = code.replace(/class="tagline">[^<]+</, `class="tagline">${tagline}<`);
    }

    if (discordLink) {
      code = code.replace(/href="https:\/\/discord\.gg\/[^"]+"/, `href="${discordLink}"`);
    }

    if (primaryColor) {
      // Update CSS variable if it exists
      code = code.replace(/--vtc-accent: #[0-9a-fA-F]{6}/, `--vtc-accent: ${primaryColor}`);
    }

    this.codeEditor.value = code;
    this.updatePreview();
    this.showNotification('Changes applied successfully!', 'success');
  }

  static downloadSite() {
    const content = this.codeEditor.value;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showNotification('Download started!', 'success');
  }

  static showHostingOptions() {
    // Simple modal or alert
    alert('Hosting features are currently being upgraded. Please download your site and host it manually for now, or join our Discord for assistance.');
  }

  static saveProject() {
    const projectData = {
      code: this.codeEditor.value,
      settings: {
        companyName: document.getElementById('company-name').value,
        tagline: document.getElementById('company-tagline').value,
        discordLink: document.getElementById('discord-link').value,
        primaryColor: document.getElementById('primary-color').value
      },
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('vtc_project', JSON.stringify(projectData));
    this.showNotification('Project saved locally!', 'success');
  }

  static loadProject() {
    const saved = localStorage.getItem('vtc_project');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.code) this.codeEditor.value = data.code;

        if (data.settings) {
          if (data.settings.companyName) document.getElementById('company-name').value = data.settings.companyName;
          if (data.settings.tagline) document.getElementById('company-tagline').value = data.settings.tagline;
          if (data.settings.discordLink) document.getElementById('discord-link').value = data.settings.discordLink;
          if (data.settings.primaryColor) document.getElementById('primary-color').value = data.settings.primaryColor;
        }

        this.updatePreview();
        console.log('Loaded saved project from', data.timestamp);
      } catch (e) {
        console.error('Failed to load project', e);
      }
    }
  }

  static resetToTemplate() {
    // Reload the page with the current template param to reset
    window.location.reload();
  }

  static showNotification(message, type = 'info') {
    // Check if global error handler's notification system is available
    // Otherwise create a simple one
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 1rem 2rem;
      background: ${type === 'success' ? '#10b981' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  SiteComponents.init();
  VTCStudio.init();
});

// Expose classes globally
window.SiteComponents = SiteComponents;
window.VTCStudio = VTCStudio;