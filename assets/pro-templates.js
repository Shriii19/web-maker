// Pro Templates JavaScript - Click-to-Edit Functionality
// TruckCraft Studio Pro

class ProTemplateEditor {
  constructor() {
    this.currentTemplate = null;
    this.editMode = false;
    this.init();
  }

  init() {
    // Category filter functionality
    this.initCategoryFilters();
    
    // Template hover effects
    this.initTemplateHovers();
    
    // Initialize edit functionality
    this.initEditMode();
  }

  initCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const templateCards = document.querySelectorAll('.template-card');

    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        categoryButtons.forEach(b => {
          b.classList.remove('active');
          b.style.background = 'transparent';
          b.style.color = '#7c3aed';
        });
        btn.classList.add('active');
        btn.style.background = '#7c3aed';
        btn.style.color = 'white';

        // Filter templates
        const category = btn.dataset.category;
        templateCards.forEach(card => {
          if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease-out';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  initTemplateHovers() {
    const templateCards = document.querySelectorAll('.template-card');
    
    templateCards.forEach(card => {
      const overlay = card.querySelector('.template-overlay');
      
      card.addEventListener('mouseenter', () => {
        if (overlay) overlay.style.opacity = '1';
      });
      
      card.addEventListener('mouseleave', () => {
        if (overlay) overlay.style.opacity = '0';
      });
    });
  }

  initEditMode() {
    // Add edit overlay styles to head
    const style = document.createElement('style');
    style.textContent = `
      .edit-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      
      .edit-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      
      .edit-container {
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 1200px;
        height: 90%;
        display: flex;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }
      
      .edit-sidebar {
        width: 300px;
        background: #f8fafc;
        border-right: 1px solid #e2e8f0;
        padding: 2rem;
        overflow-y: auto;
      }
      
      .edit-preview {
        flex: 1;
        position: relative;
        background: white;
      }
      
      .edit-toolbar {
        background: #1e293b;
        color: white;
        padding: 1rem 2rem;
        display: flex;
        justify-content: between;
        align-items: center;
        border-bottom: 1px solid #334155;
      }
      
      .edit-iframe {
        width: 100%;
        height: calc(100% - 60px);
        border: none;
      }
      
      .editable-element {
        outline: 2px dashed transparent;
        transition: outline 0.2s;
        cursor: pointer;
        position: relative;
      }
      
      .editable-element:hover {
        outline: 2px dashed #7c3aed;
        background: rgba(124, 58, 237, 0.1);
      }
      
      .editable-element.editing {
        outline: 2px solid #7c3aed;
        background: rgba(124, 58, 237, 0.1);
      }
      
      .edit-tooltip {
        position: absolute;
        top: -30px;
        left: 0;
        background: #7c3aed;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.75rem;
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
      }
      
      .editable-element:hover .edit-tooltip {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }
}

// Template editing functions
function editTemplate(templateId) {
  // Check if user has pro access (simulate check)
  const hasProAccess = checkProAccess();
  
  if (!hasProAccess) {
    showProTrialModal();
    return;
  }
  
  showEditMode(templateId);
}

function previewTemplate(templateId) {
  showPreview(templateId);
}

function checkProAccess() {
  // In real implementation, this would check user's subscription status
  // For now, we'll simulate that user needs pro access
  return false; // Change to true to test editing mode
}

function showProTrialModal() {
  const modal = document.createElement('div');
  modal.className = 'edit-overlay';
  modal.style.zIndex = '2000';
  modal.innerHTML = `
    <div style="background: white; border-radius: 20px; max-width: 600px; width: 90%; padding: 3rem; text-align: center; position: relative;">
      <button onclick="closeProModal()" style="position: absolute; top: 1rem; right: 1rem; background: #f3f4f6; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; color: #6b7280;">×</button>
      
      <div style="width: 100px; height: 100px; margin: 0 auto 2rem; background: linear-gradient(135deg, #7c3aed, #3b82f6); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="white">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      
      <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem; color: #1a1a2e;">🔒 Pro Feature</h2>
      <p style="font-size: 1.2rem; margin-bottom: 2rem; color: #6b7280; line-height: 1.6;">
        Template editing with click-to-edit functionality is available for Pro users only. 
        <br><strong>Upgrade now to unlock this amazing feature!</strong>
      </p>
      
      <div style="background: rgba(124, 58, 237, 0.1); border-radius: 12px; padding: 2rem; margin-bottom: 2rem;">
        <h3 style="font-size: 1.3rem; font-weight: 600; margin-bottom: 1rem; color: #7c3aed;">✨ With Pro Access You Get:</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; text-align: left;">
          <div>
            <div style="font-weight: 600; color: #374151; margin-bottom: 0.5rem;">✏️ Click-to-Edit Templates</div>
            <div style="font-size: 0.9rem; color: #6b7280;">Edit any text, image, or color instantly</div>
          </div>
          <div>
            <div style="font-weight: 600; color: #374151; margin-bottom: 0.5rem;">🎨 Custom Themes</div>
            <div style="font-size: 0.9rem; color: #6b7280;">Match your VTC's branding perfectly</div>
          </div>
          <div>
            <div style="font-weight: 600; color: #374151; margin-bottom: 0.5rem;">📱 Mobile Preview</div>
            <div style="font-size: 0.9rem; color: #6b7280;">Test on desktop, tablet, and mobile</div>
          </div>
          <div>
            <div style="font-weight: 600; color: #374151; margin-bottom: 0.5rem;">💾 Download Code</div>
            <div style="font-size: 0.9rem; color: #6b7280;">Get complete HTML/CSS files</div>
          </div>
        </div>
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="https://discord.gg/webmaker" target="_blank" style="background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; text-decoration: none; padding: 1rem 2rem; border-radius: 10px; font-weight: 600; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem; transition: transform 0.2s;" 
           onmouseover="this.style.transform='translateY(-2px)'" 
           onmouseout="this.style.transform='translateY(0)'">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          Get Pro Access Now
        </a>
        <button onclick="closeProModal()" style="background: transparent; color: #6b7280; border: 2px solid #e5e7eb; padding: 1rem 2rem; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 1.1rem;">Maybe Later</button>
      </div>
      
      <p style="font-size: 0.9rem; color: #9ca3af; margin-top: 1.5rem;">
        💬 Join our Discord for instant Pro access and connect with 500+ VTC owners!
      </p>
    </div>
  `;
  
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('active'), 10);
}

function closeProModal() {
  const modal = document.querySelector('.edit-overlay');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
}

function showEditMode(templateId) {
  // Create edit overlay
  const overlay = document.createElement('div');
  overlay.className = 'edit-overlay';
  overlay.innerHTML = `
    <div class="edit-container">
      <div class="edit-sidebar">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: #1e293b;">Edit Template</h3>
          <button onclick="closeEditMode()" style="background: #ef4444; color: white; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center;">×</button>
        </div>
        
        <div class="edit-controls">
          <div style="margin-bottom: 2rem;">
            <h4 style="font-weight: 600; margin-bottom: 1rem; color: #374151;">🎨 Customize Design</h4>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">Primary Color</label>
              <input type="color" id="primary-color" value="#7c3aed" style="width: 100%; height: 40px; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer;" onchange="updateTemplateColor(this.value)">
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">Font Family</label>
              <select id="font-family" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 6px;" onchange="updateTemplateFont(this.value)">
                <option value="Inter">Inter (Modern)</option>
                <option value="Roboto">Roboto (Clean)</option>
                <option value="Open Sans">Open Sans (Friendly)</option>
                <option value="Montserrat">Montserrat (Bold)</option>
                <option value="Lato">Lato (Professional)</option>
              </select>
            </div>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h4 style="font-weight: 600; margin-bottom: 1rem; color: #374151;">📝 Content</h4>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">Company Name</label>
              <input type="text" id="company-name" placeholder="Your VTC Name" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 6px;" onkeyup="updateCompanyName(this.value)">
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">Tagline</label>
              <input type="text" id="tagline" placeholder="Your company tagline" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 6px;" onkeyup="updateTagline(this.value)">
            </div>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h4 style="font-weight: 600; margin-bottom: 1rem; color: #374151;">🖼️ Images</h4>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.5rem;">Logo Upload</label>
              <input type="file" accept="image/*" style="width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 6px;" onchange="updateLogo(this)">
            </div>
          </div>
          
          <div>
            <h4 style="font-weight: 600; margin-bottom: 1rem; color: #374151;">💾 Export</h4>
            <button onclick="downloadTemplate()" style="width: 100%; background: #10b981; color: white; border: none; padding: 0.75rem; border-radius: 6px; font-weight: 600; cursor: pointer; margin-bottom: 0.5rem;">Download HTML</button>
            <button onclick="saveTemplate()" style="width: 100%; background: #7c3aed; color: white; border: none; padding: 0.75rem; border-radius: 6px; font-weight: 600; cursor: pointer;">Save to Account</button>
          </div>
        </div>
      </div>
      
      <div class="edit-preview">
        <div class="edit-toolbar">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-weight: 600;">Editing: ${getTemplateName(templateId)}</span>
            <div style="display: flex; gap: 0.5rem;">
              <button onclick="switchDevice('desktop')" class="device-btn active" style="padding: 0.25rem 0.75rem; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 0.75rem;">Desktop</button>
              <button onclick="switchDevice('tablet')" class="device-btn" style="padding: 0.25rem 0.75rem; background: transparent; color: #94a3b8; border: 1px solid #475569; border-radius: 4px; font-size: 0.75rem;">Tablet</button>
              <button onclick="switchDevice('mobile')" class="device-btn" style="padding: 0.25rem 0.75rem; background: transparent; color: #94a3b8; border: 1px solid #475569; border-radius: 4px; font-size: 0.75rem;">Mobile</button>
            </div>
          </div>
          <div style="display: flex; gap: 1rem;">
            <button onclick="previewMode()" style="background: #f59e0b; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.875rem;">Live Preview</button>
            <button onclick="closeEditMode()" style="background: #ef4444; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.875rem;">Close</button>
          </div>
        </div>
        <iframe class="edit-iframe" src="${getTemplatePreviewUrl(templateId)}"></iframe>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Show overlay with animation
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);
  
  // Initialize edit functionality in iframe
  setTimeout(() => {
    initIframeEditing();
  }, 1000);
}

function showPreview(templateId) {
  // Create full-screen preview
  const overlay = document.createElement('div');
  overlay.className = 'edit-overlay';
  overlay.innerHTML = `
    <div style="width: 100%; height: 100%; position: relative;">
      <div style="position: absolute; top: 20px; right: 20px; z-index: 1001;">
        <button onclick="closePreview()" style="background: rgba(0,0,0,0.8); color: white; border: none; border-radius: 50%; width: 48px; height: 48px; cursor: pointer; font-size: 24px;">×</button>
      </div>
      <iframe src="${getTemplatePreviewUrl(templateId)}" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>
  `;
  
  document.body.appendChild(overlay);
  overlay.classList.add('active');
}

function closeEditMode() {
  const overlay = document.querySelector('.edit-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }
}

function closePreview() {
  closeEditMode();
}

function getTemplateName(templateId) {
  const names = {
    'elite-transport': 'Elite Transport Pro',
    'cargo-masters': 'Cargo Masters Corporate',
    'highway-heroes': 'Highway Heroes Creative',
    'classic-freight': 'Classic Freight Traditional',
    'swift-logistics': 'Swift Logistics Modern',
    'prime-haulers': 'Prime Haulers Premium'
  };
  return names[templateId] || 'Pro Template';
}

function getTemplatePreviewUrl(templateId) {
  // In a real implementation, these would be actual template URLs
  return `template-preview.html?template=${templateId}`;
}

// Edit functionality with improved theme matching
function updateTemplateColor(color) {
  const iframe = document.querySelector('.edit-iframe');
  if (iframe && iframe.contentDocument) {
    const doc = iframe.contentDocument;
    
    // Remove existing color styles
    const existingStyle = doc.querySelector('#dynamic-color-style');
    if (existingStyle) existingStyle.remove();
    
    // Create comprehensive color update
    const style = doc.createElement('style');
    style.id = 'dynamic-color-style';
    style.textContent = `
      /* Primary color updates */
      .company-name, 
      .btn-primary, 
      .hero-badge,
      .feature-icon,
      .logo { 
        background: linear-gradient(135deg, ${color}, ${adjustColor(color, -20)}) !important; 
        color: white !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
      }
      
      .btn-primary {
        -webkit-text-fill-color: white !important;
        background: linear-gradient(135deg, ${color}, ${adjustColor(color, -20)}) !important;
      }
      
      /* Accent colors */
      .gradient-text {
        background: linear-gradient(135deg, ${color}, ${adjustColor(color, 30)}) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
      }
      
      /* Interactive elements */
      .editable-element:hover {
        outline-color: ${color} !important;
        background-color: ${color}1a !important;
      }
      
      .edit-tooltip {
        background: ${color} !important;
      }
      
      /* Hover effects */
      .btn-primary:hover {
        box-shadow: 0 8px 25px ${color}66 !important;
      }
      
      /* Icons and decorative elements */
      .icon-gradient {
        background: linear-gradient(135deg, ${color}, ${adjustColor(color, -15)}) !important;
      }
      
      /* Links and accents */
      a, .accent-color {
        color: ${color} !important;
      }
      
      /* Borders and dividers */
      .border-accent {
        border-color: ${color} !important;
      }
    `;
    doc.head.appendChild(style);
    
    // Update CSS custom properties for better theme integration
    doc.documentElement.style.setProperty('--primary-color', color);
    doc.documentElement.style.setProperty('--primary-light', adjustColor(color, 20));
    doc.documentElement.style.setProperty('--primary-dark', adjustColor(color, -20));
  }
}

function updateTemplateFont(font) {
  const iframe = document.querySelector('.edit-iframe');
  if (iframe && iframe.contentDocument) {
    const doc = iframe.contentDocument;
    
    // Remove existing font styles
    const existingStyle = doc.querySelector('#dynamic-font-style');
    if (existingStyle) existingStyle.remove();
    
    // Create comprehensive font update
    const style = doc.createElement('style');
    style.id = 'dynamic-font-style';
    style.textContent = `
      /* Import font if needed */
      @import url('https://fonts.googleapis.com/css2?family=${font.replace(' ', '+')}:wght@300;400;500;600;700&display=swap');
      
      /* Apply font to all elements */
      body, * { 
        font-family: '${font}', sans-serif !important; 
      }
      
      /* Maintain font weights */
      .company-name, .section-title, .feature-title {
        font-weight: 700 !important;
      }
      
      .tagline, .section-description {
        font-weight: 500 !important;
      }
      
      .btn {
        font-weight: 600 !important;
      }
    `;
    doc.head.appendChild(style);
    
    // Update CSS custom property
    doc.documentElement.style.setProperty('--font-family', `'${font}', sans-serif`);
  }
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
  const usePound = color[0] === "#";
  const col = usePound ? color.slice(1) : color;
  const num = parseInt(col, 16);
  let r = (num >> 16) + amount;
  let g = (num >> 8 & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  r = r > 255 ? 255 : r < 0 ? 0 : r;
  g = g > 255 ? 255 : g < 0 ? 0 : g;
  b = b > 255 ? 255 : b < 0 ? 0 : b;
  return (usePound ? "#" : "") + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

function updateCompanyName(name) {
  const iframe = document.querySelector('.edit-iframe');
  if (iframe && iframe.contentDocument && name) {
    const doc = iframe.contentDocument;
    
    // Update all company name elements
    const companyElements = doc.querySelectorAll('.company-name, h1, .hero-title');
    companyElements.forEach(el => {
      if (el.classList.contains('company-name') || 
          el.textContent.includes('Transport') || 
          el.textContent.includes('Freight') || 
          el.textContent.includes('Logistics') ||
          el.textContent.includes('Elite') ||
          el.textContent.includes('Cargo') ||
          el.textContent.includes('Highway') ||
          el.textContent.includes('Classic') ||
          el.textContent.includes('Swift') ||
          el.textContent.includes('Prime')) {
        el.textContent = name;
      }
    });
    
    // Update logo abbreviation
    const logoAbbr = name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
    const logoElements = doc.querySelectorAll('.logo');
    logoElements.forEach(logo => {
      logo.textContent = logoAbbr;
    });
    
    // Update page title
    if (doc.title) {
      doc.title = `${name} - Professional VTC Services`;
    }
  }
}

function updateTagline(tagline) {
  const iframe = document.querySelector('.edit-iframe');
  if (iframe && iframe.contentDocument && tagline) {
    const doc = iframe.contentDocument;
    
    // Update all tagline elements
    const taglineElements = doc.querySelectorAll('.tagline, .hero-subtitle, .hero-description');
    taglineElements.forEach((el, index) => {
      if (index === 0 || el.classList.contains('tagline')) {
        el.textContent = tagline;
      }
    });
  }
}

function updateLogo(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const iframe = document.querySelector('.edit-iframe');
      if (iframe && iframe.contentDocument) {
        const doc = iframe.contentDocument;
        
        // Find logo elements and replace with image
        const logoElements = doc.querySelectorAll('.logo');
        logoElements.forEach(logo => {
          // Create image element
          const img = doc.createElement('img');
          img.src = e.target.result;
          img.alt = 'Company Logo';
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'contain';
          img.style.borderRadius = '50%';
          
          // Clear existing content and add image
          logo.innerHTML = '';
          logo.appendChild(img);
          
          // Adjust styling for image
          logo.style.background = 'white';
          logo.style.padding = '8px';
        });
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function switchDevice(device) {
  const iframe = document.querySelector('.edit-iframe');
  const buttons = document.querySelectorAll('.device-btn');
  
  // Update button styles
  buttons.forEach(btn => {
    btn.style.background = 'transparent';
    btn.style.color = '#94a3b8';
  });
  event.target.style.background = '#3b82f6';
  event.target.style.color = 'white';
  
  // Update iframe size
  if (iframe) {
    switch(device) {
      case 'mobile':
        iframe.style.width = '375px';
        iframe.style.margin = '0 auto';
        break;
      case 'tablet':
        iframe.style.width = '768px';
        iframe.style.margin = '0 auto';
        break;
      default:
        iframe.style.width = '100%';
        iframe.style.margin = '0';
    }
  }
}

function previewMode() {
  const iframe = document.querySelector('.edit-iframe');
  if (iframe) {
    window.open(iframe.src, '_blank');
  }
}

function downloadTemplate() {
  // In a real implementation, this would generate and download the HTML file
  alert('🎉 Template downloaded! Your customized website is ready to upload to any hosting provider.');
}

function saveTemplate() {
  // In a real implementation, this would save to user account
  alert('💾 Template saved to your account! You can access it anytime from your dashboard.');
}

function initIframeEditing() {
  const iframe = document.querySelector('.edit-iframe');
  if (iframe && iframe.contentDocument) {
    const doc = iframe.contentDocument;
    
    // Add editing capabilities to text elements
    const textElements = doc.querySelectorAll('h1, h2, h3, p, span, a');
    textElements.forEach(el => {
      if (!el.closest('script') && !el.closest('style')) {
        el.classList.add('editable-element');
        el.setAttribute('contenteditable', 'true');
        
        // Add tooltip
        const tooltip = doc.createElement('div');
        tooltip.className = 'edit-tooltip';
        tooltip.textContent = 'Click to edit';
        el.appendChild(tooltip);
        
        // Add edit events
        el.addEventListener('focus', () => {
          el.classList.add('editing');
        });
        
        el.addEventListener('blur', () => {
          el.classList.remove('editing');
        });
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProTemplateEditor();
});
