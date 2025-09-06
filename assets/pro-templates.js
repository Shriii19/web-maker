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

// Edit functionality
function updateTemplateColor(color) {
  const iframe = document.querySelector('.edit-iframe');
  if (iframe && iframe.contentDocument) {
    const doc = iframe.contentDocument;
    const style = doc.createElement('style');
    style.textContent = `
      .gradient-text, .btn-primary, .hero-badge { 
        background: ${color} !important; 
        color: white !important;
      }
      .icon-gradient { 
        background: ${color} !important; 
      }
    `;
    doc.head.appendChild(style);
  }
}

function updateTemplateFont(font) {
  const iframe = document.querySelector('.edit-iframe');
  if (iframe && iframe.contentDocument) {
    const doc = iframe.contentDocument;
    const style = doc.createElement('style');
    style.textContent = `
      body, * { 
        font-family: '${font}', sans-serif !important; 
      }
    `;
    doc.head.appendChild(style);
  }
}

function updateCompanyName(name) {
  const iframe = document.querySelector('.edit-iframe');
  if (iframe && iframe.contentDocument && name) {
    const doc = iframe.contentDocument;
    const titleElements = doc.querySelectorAll('h1, .hero-title, .company-name');
    titleElements.forEach(el => {
      if (el.textContent.includes('Transport') || el.textContent.includes('Freight') || el.textContent.includes('Logistics')) {
        el.textContent = name;
      }
    });
  }
}

function updateTagline(tagline) {
  const iframe = document.querySelector('.edit-iframe');
  if (iframe && iframe.contentDocument && tagline) {
    const doc = iframe.contentDocument;
    const taglineElements = doc.querySelectorAll('.hero-subtitle, .tagline, p');
    if (taglineElements.length > 0) {
      taglineElements[0].textContent = tagline;
    }
  }
}

function updateLogo(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const iframe = document.querySelector('.edit-iframe');
      if (iframe && iframe.contentDocument) {
        const doc = iframe.contentDocument;
        const logoElements = doc.querySelectorAll('.logo, img[alt*="logo"]');
        logoElements.forEach(logo => {
          logo.src = e.target.result;
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
