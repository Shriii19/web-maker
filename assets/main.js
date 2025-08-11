// ETS2 VTC Studio - Enhanced Platform JavaScript

class VTCStudio {
  constructor() {
    this.currentTab = 'visual';
    this.currentDevice = 'desktop';
    this.isCodeSyncing = false;
    this.vtcTemplate = this.getVTCTemplate();
    
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupEditor();
    this.setupPreview();
    this.setupEventListeners();
    this.loadTemplate();
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
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Device switching
    const deviceBtns = document.querySelectorAll('.device-btn');
    deviceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const device = btn.dataset.device;
        this.switchDevice(device);
      });
    });

    // Code editor
    const codeEditor = document.getElementById('code-editor');
    let debounceTimer;
    
    codeEditor.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (!this.isCodeSyncing) {
          this.updatePreview();
        }
      }, 500);
    });

    // Visual editor controls
    this.setupVisualControls();
  }

  setupVisualControls() {
    const controls = {
      'company-name': 'My VTC',
      'company-tagline': 'Drive together. Deliver success.',
      'discord-link': 'https://discord.gg/yourvtc',
      'primary-color': '#00b894'
    };

    Object.keys(controls).forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => {
          this.syncVisualChanges();
        });
      }
    });

    // Apply changes button
    const applyBtn = document.getElementById('apply-changes');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        this.applyVisualChanges();
      });
    }
  }

  setupPreview() {
    this.preview = document.getElementById('live-preview');
  }

  setupEventListeners() {
    // Download functionality
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.addEventListener('click', () => {
      this.downloadWebsite();
    });

    // Host functionality
    const hostBtn = document.getElementById('host-btn');
    hostBtn.addEventListener('click', () => {
      this.showHostingOptions();
    });

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
    const codeEditor = document.getElementById('code-editor');
    codeEditor.value = this.vtcTemplate;
    this.updatePreview();
  }

  updatePreview() {
    const codeEditor = document.getElementById('code-editor');
    const code = codeEditor.value;
    
    if (this.preview) {
      this.preview.srcdoc = code;
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
    const modal = this.createModal({
      title: 'Deploy Your VTC Website',
      content: `
        <div style="text-align: center; padding: 2rem;">
          <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
            <button class="btn-primary" onclick="window.open('https://netlify.com', '_blank')">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              Deploy to Netlify (Free)
            </button>
            <button class="btn-secondary" onclick="window.open('https://vercel.com', '_blank')">
              Deploy to Vercel (Free)
            </button>
            <button class="btn-secondary" onclick="window.open('https://pages.github.com', '_blank')">
              Deploy to GitHub Pages (Free)
            </button>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">
            Choose a platform to host your VTC website for free. You'll need to create an account and follow their deployment instructions.
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
      document.getElementById('discord-link').value = 'https://discord.gg/yourvtc';
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
          <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-secondary);
          ">&times;</button>
        </div>
        <div>${content}</div>
      </div>
    `;

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
        <a href="https://discord.gg/yourvtc" target="_blank" class="cta-btn">
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
            <a href="https://discord.gg/yourvtc" target="_blank">discord.gg/yourvtc</a>
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
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new VTCStudio();
});
