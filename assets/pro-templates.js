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
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
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
        border-radius: 20px;
        width: 95%;
        max-width: 1400px;
        height: 90%;
        display: flex;
        overflow: hidden;
        box-shadow: 0 25px 80px rgba(124, 58, 237, 0.15);
        border: 1px solid rgba(124, 58, 237, 0.1);
      }
      
      .edit-sidebar {
        width: 320px;
        background: linear-gradient(135deg, #ffffff, #f8fafc);
        border-right: 1px solid rgba(124, 58, 237, 0.1);
        padding: 2rem;
        overflow-y: auto;
        box-shadow: inset -1px 0 0 rgba(124, 58, 237, 0.05);
      }
      
      .edit-preview {
        flex: 1;
        position: relative;
        background: #f8fafc;
        display: flex;
        flex-direction: column;
      }
      
      .edit-toolbar {
        background: linear-gradient(135deg, #7c3aed, #8b5cf6);
        color: white;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: none;
        box-shadow: 0 2px 20px rgba(124, 58, 237, 0.2);
      }
      
      .edit-iframe {
        width: 100%;
        height: 100%;
        border: none;
        background: white;
        border-radius: 0 0 20px 0;
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
  // Allow direct access to editing mode
  showEditMode(templateId);
}

function previewTemplate(templateId) {
  showPreview(templateId);
}

function showEditMode(templateId) {
  // Create edit overlay
  const overlay = document.createElement('div');
  overlay.className = 'edit-overlay';
  overlay.innerHTML = `
    <div class="edit-container">
      <div class="edit-sidebar">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(124, 58, 237, 0.1);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #7c3aed, #8b5cf6); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 16px;">✨</span>
            </div>
            <h3 style="font-size: 1.125rem; font-weight: 600; color: #1e293b; margin: 0;">Edit Template</h3>
          </div>
          <button onclick="closeEditMode()" style="background: #f1f5f9; color: #64748b; border: none; border-radius: 8px; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; transition: all 0.2s;" onmouseover="this.style.background='#e2e8f0'; this.style.color='#475569'" onmouseout="this.style.background='#f1f5f9'; this.style.color='#64748b'">×</button>
        </div>
        
        <div class="edit-controls">
          <div style="margin-bottom: 2rem; background: white; border-radius: 12px; padding: 1.5rem; border: 1px solid rgba(124, 58, 237, 0.1);">
            <h4 style="font-weight: 600; margin-bottom: 1.5rem; color: #1e293b; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">🎨 Customize Design</h4>
            <div style="margin-bottom: 1.5rem;">
              <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.75rem; color: #475569;">Primary Color</label>
              <div style="display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap;">
                <button onclick="setThemeColor('#7c3aed')" style="width: 36px; height: 36px; background: #7c3aed; border: 3px solid #fff; border-radius: 8px; cursor: pointer; box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></button>
                <button onclick="setThemeColor('#3b82f6')" style="width: 36px; height: 36px; background: #3b82f6; border: 3px solid #fff; border-radius: 8px; cursor: pointer; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></button>
                <button onclick="setThemeColor('#10b981')" style="width: 36px; height: 36px; background: #10b981; border: 3px solid #fff; border-radius: 8px; cursor: pointer; box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></button>
                <button onclick="setThemeColor('#f59e0b')" style="width: 36px; height: 36px; background: #f59e0b; border: 3px solid #fff; border-radius: 8px; cursor: pointer; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></button>
                <button onclick="setThemeColor('#ef4444')" style="width: 36px; height: 36px; background: #ef4444; border: 3px solid #fff; border-radius: 8px; cursor: pointer; box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3); transition: all 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'"></button>
              </div>
              <input type="color" id="primary-color" value="#7c3aed" style="width: 100%; height: 48px; border: 1px solid #d1d5db; border-radius: 8px; cursor: pointer; background: white;" onchange="updateTemplateColor(this.value)">
            </div>
            <div style="margin-bottom: 0;">
              <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.75rem; color: #475569;">Font Family</label>
              <select id="font-family" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; background: white; font-size: 0.875rem;" onchange="updateTemplateFont(this.value)">
                <option value="Inter">Inter (Modern)</option>
                <option value="Roboto">Roboto (Clean)</option>
                <option value="Open Sans">Open Sans (Friendly)</option>
                <option value="Montserrat">Montserrat (Bold)</option>
                <option value="Lato">Lato (Professional)</option>
                <option value="Poppins">Poppins (Trendy)</option>
              </select>
            </div>
          </div>
          
          <div style="margin-bottom: 2rem; background: white; border-radius: 12px; padding: 1.5rem; border: 1px solid rgba(124, 58, 237, 0.1);">
            <h4 style="font-weight: 600; margin-bottom: 1.5rem; color: #1e293b; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">📝 Content</h4>
            <div style="margin-bottom: 1.5rem;">
              <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.75rem; color: #475569;">Company Name</label>
              <input type="text" id="company-name" placeholder="Your VTC Name" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.875rem; background: white;" onkeyup="updateCompanyName(this.value)">
            </div>
            <div style="margin-bottom: 0;">
              <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.75rem; color: #475569;">Tagline</label>
              <input type="text" id="tagline" placeholder="Your company tagline" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.875rem; background: white;" onkeyup="updateTagline(this.value)">
            </div>
          </div>
          
          <div style="margin-bottom: 2rem; background: white; border-radius: 12px; padding: 1.5rem; border: 1px solid rgba(124, 58, 237, 0.1);">
            <h4 style="font-weight: 600; margin-bottom: 1.5rem; color: #1e293b; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">🖼️ Images</h4>
            <div style="margin-bottom: 0;">
              <label style="display: block; font-size: 0.875rem; font-weight: 500; margin-bottom: 0.75rem; color: #475569;">Logo Upload</label>
              <input type="file" accept="image/*" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 0.875rem; background: white;" onchange="updateLogo(this)">
            </div>
          </div>
          
          <div style="background: white; border-radius: 12px; padding: 1.5rem; border: 1px solid rgba(124, 58, 237, 0.1);">
            <h4 style="font-weight: 600; margin-bottom: 1.5rem; color: #1e293b; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">💾 Export</h4>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              <button onclick="downloadTemplate()" style="width: 100%; background: linear-gradient(135deg, #10b981, #059669); color: white; border: none; padding: 0.875rem; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(16, 185, 129, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">📥 Download HTML</button>
              <button onclick="saveTemplate()" style="width: 100%; background: linear-gradient(135deg, #7c3aed, #8b5cf6); color: white; border: none; padding: 0.875rem; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 0.875rem; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(124, 58, 237, 0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">💾 Save Template</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="edit-preview">
        <div class="edit-toolbar">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-weight: 600;">Editing: ${getTemplateName(templateId)}</span>
            <div style="display: flex; gap: 0.5rem;">
              <button onclick="switchDevice('desktop')" class="device-btn active" style="padding: 0.5rem 1rem; background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">🖥️ Desktop</button>
              <button onclick="switchDevice('tablet')" class="device-btn" style="padding: 0.5rem 1rem; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">📱 Tablet</button>
              <button onclick="switchDevice('mobile')" class="device-btn" style="padding: 0.5rem 1rem; background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">📱 Mobile</button>
            </div>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button onclick="previewMode()" style="background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">👁️ Live Preview</button>
            <button onclick="closeEditMode()" style="background: rgba(239, 68, 68, 0.9); color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(239, 68, 68, 1)'" onmouseout="this.style.background='rgba(239, 68, 68, 0.9)'">✕ Close</button>
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
function setThemeColor(color) {
  document.getElementById('primary-color').value = color;
  updateTemplateColor(color);
}

function updateTemplateColor(color) {
  const iframe = document.querySelector('.edit-iframe');
  if (iframe && iframe.contentDocument) {
    const doc = iframe.contentDocument;
    
    // Remove existing color styles
    const existingStyle = doc.querySelector('#dynamic-color-style');
    if (existingStyle) existingStyle.remove();
    
    // Calculate theme colors based on your site's patterns
    const lightColor = adjustColor(color, 20);
    const darkColor = adjustColor(color, -20);
    const ultraLight = adjustColor(color, 40);
    
    // Create comprehensive color update matching your site's theme
    const style = doc.createElement('style');
    style.id = 'dynamic-color-style';
    style.textContent = `
      /* Update CSS custom properties first */
      :root {
        --primary-color: ${color} !important;
        --primary-light: ${lightColor} !important;
        --primary-dark: ${darkColor} !important;
      }
      
      /* Primary elements - matching your site's gradient style */
      .company-name, 
      .gradient-text {
        background: linear-gradient(135deg, ${color}, ${lightColor}) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
      }
      
      /* Buttons and interactive elements */
      .btn-primary {
        background: linear-gradient(135deg, ${color}, ${lightColor}) !important;
        -webkit-text-fill-color: white !important;
        color: white !important;
        border: none !important;
      }
      
      .btn-primary:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 25px ${color}66 !important;
      }
      
      /* Icons and decorative elements */
      .feature-icon, 
      .logo,
      .icon-gradient {
        background: linear-gradient(135deg, ${color}, ${lightColor}) !important;
        color: white !important;
      }
      
      /* Editing interface theme */
      .editable-element:hover {
        outline: 2px dashed ${color} !important;
        background: ${color}1a !important;
      }
      
      .editable-element.editing {
        outline: 2px solid ${color} !important;
        background: ${color}2a !important;
      }
      
      .edit-tooltip {
        background: ${color} !important;
        color: white !important;
      }
      
      /* Links and accent colors */
      a:not(.btn), 
      .accent-color {
        color: ${color} !important;
      }
      
      /* Borders and highlights */
      .border-accent {
        border-color: ${color} !important;
      }
      
      /* Hero badge and special elements */
      .hero-badge,
      .pricing-badge {
        background: linear-gradient(135deg, ${color}, ${darkColor}) !important;
        color: white !important;
      }
      
      /* Section backgrounds with theme integration */
      .bg-accent {
        background: ${color} !important;
      }
      
      .bg-accent-light {
        background: ${ultraLight} !important;
      }
      
      /* Form elements theme */
      input:focus, 
      textarea:focus,
      select:focus {
        border-color: ${color} !important;
        box-shadow: 0 0 0 3px ${color}20 !important;
      }
      
      /* Progress and loading elements */
      .progress-bar,
      .loading-spinner {
        background: ${color} !important;
      }
    `;
    doc.head.appendChild(style);
    
    // Update the template's theme configuration if it exists
    if (doc.documentElement) {
      doc.documentElement.style.setProperty('--primary-color', color);
      doc.documentElement.style.setProperty('--primary-light', lightColor);
      doc.documentElement.style.setProperty('--primary-dark', darkColor);
    }
  }
}

function updateTemplateFont(font) {
  const iframe = document.querySelector('.edit-iframe');
  if (iframe && iframe.contentDocument) {
    const doc = iframe.contentDocument;
    
    // Remove existing font styles
    const existingStyle = doc.querySelector('#dynamic-font-style');
    if (existingStyle) existingStyle.remove();
    
    // Create comprehensive font update matching your site's typography
    const style = doc.createElement('style');
    style.id = 'dynamic-font-style';
    style.textContent = `
      /* Import font from Google Fonts */
      @import url('https://fonts.googleapis.com/css2?family=${font.replace(' ', '+')}:wght@300;400;500;600;700;800;900&display=swap');
      
      /* Apply font to all elements following your site's hierarchy */
      * { 
        font-family: '${font}', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important; 
      }
      
      /* Maintain your site's font weight hierarchy */
      .company-name, 
      .hero-title,
      .section-title,
      h1, h2 {
        font-family: '${font}', 'Inter', sans-serif !important;
        font-weight: 700 !important;
        letter-spacing: -0.025em !important;
      }
      
      .tagline, 
      .hero-subtitle,
      .section-description,
      h3, h4 {
        font-family: '${font}', 'Inter', sans-serif !important;
        font-weight: 600 !important;
        letter-spacing: -0.015em !important;
      }
      
      .feature-title,
      h5, h6 {
        font-family: '${font}', 'Inter', sans-serif !important;
        font-weight: 600 !important;
      }
      
      /* Button typography matching your site */
      .btn, 
      .template-select-btn,
      .btn-primary,
      .btn-outline {
        font-family: '${font}', 'Inter', sans-serif !important;
        font-weight: 600 !important;
        letter-spacing: 0.025em !important;
      }
      
      /* Body text and descriptions */
      p, 
      .hero-description,
      .feature-description,
      .template-description {
        font-family: '${font}', 'Inter', sans-serif !important;
        font-weight: 400 !important;
        line-height: 1.6 !important;
      }
      
      /* Navigation and UI elements */
      nav, 
      .nav-link,
      .template-category,
      .feature-tag {
        font-family: '${font}', 'Inter', sans-serif !important;
        font-weight: 500 !important;
      }
      
      /* Ensure proper line heights for readability */
      h1, .company-name { line-height: 1.1 !important; }
      h2, .section-title { line-height: 1.2 !important; }
      h3, h4, .feature-title { line-height: 1.3 !important; }
      p, .description { line-height: 1.6 !important; }
    `;
    doc.head.appendChild(style);
    
    // Update CSS custom property for font
    doc.documentElement.style.setProperty('--font-family', `'${font}', 'Inter', sans-serif`);
    
    // Force font refresh by triggering a reflow
    if (doc.body) {
      doc.body.style.fontFamily = `'${font}', 'Inter', sans-serif`;
    }
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
  
  // Update button styles with clean theme
  buttons.forEach(btn => {
    btn.style.background = 'rgba(255,255,255,0.1)';
    btn.style.color = 'rgba(255,255,255,0.7)';
    btn.style.border = '1px solid rgba(255,255,255,0.2)';
  });
  
  // Highlight active button
  event.target.style.background = 'rgba(255,255,255,0.2)';
  event.target.style.color = 'white';
  event.target.style.border = '1px solid rgba(255,255,255,0.3)';
  
  // Update iframe size with smooth transition
  if (iframe) {
    iframe.style.transition = 'all 0.3s ease';
    switch(device) {
      case 'mobile':
        iframe.style.width = '375px';
        iframe.style.height = '100%';
        iframe.style.margin = '10px auto';
        iframe.style.borderRadius = '16px';
        iframe.style.border = '1px solid #e2e8f0';
        iframe.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        break;
      case 'tablet':
        iframe.style.width = '768px';
        iframe.style.height = '100%';
        iframe.style.margin = '10px auto';
        iframe.style.borderRadius = '12px';
        iframe.style.border = '1px solid #e2e8f0';
        iframe.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        break;
      default:
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.margin = '0';
        iframe.style.borderRadius = '0 0 20px 0';
        iframe.style.border = 'none';
        iframe.style.boxShadow = 'none';
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
