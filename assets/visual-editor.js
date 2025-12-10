/**
 * Visual Editor - Click-to-edit functionality for Pro templates
 * Enables inline editing without code knowledge
 */

class VisualEditor {
  constructor() {
    this.currentElement = null;
    this.history = [];
    this.historyIndex = -1;
    this.maxHistory = 50;
    this.inlineEditor = null;
    this.isDirty = false;
    
    this.init();
  }

  init() {
    // Create toolbar
    this.createToolbar();
    
    // Make elements editable
    this.makeElementsEditable();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Auto-save setup
    this.setupAutoSave();
    
    console.log('Visual Editor initialized');
  }

  createToolbar() {
    const toolbar = document.createElement('div');
    toolbar.className = 'visual-editor-toolbar';
    toolbar.innerHTML = `
      <div class="editor-toolbar-left">
        <div class="editor-logo">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          Visual Editor
        </div>
        <div class="editor-status">
          <span class="editor-status-dot"></span>
          <span>Editing Mode</span>
        </div>
      </div>
      <div class="editor-toolbar-right">
        <div class="editor-history">
          <button id="undo-btn" title="Undo" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 7v6h6"/>
              <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/>
            </svg>
          </button>
          <button id="redo-btn" title="Redo" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 7v6h-6"/>
              <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"/>
            </svg>
          </button>
        </div>
        <button class="editor-btn editor-btn-secondary" onclick="visualEditor.preview()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span>Preview</span>
        </button>
        <button class="editor-btn editor-btn-primary" onclick="visualEditor.save()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          <span>Save</span>
        </button>
        <button class="editor-btn editor-btn-secondary" onclick="visualEditor.export()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>Export</span>
        </button>
      </div>
    `;
    
    document.body.insertBefore(toolbar, document.body.firstChild);
    
    // Set up toolbar buttons
    document.getElementById('undo-btn').addEventListener('click', () => this.undo());
    document.getElementById('redo-btn').addEventListener('click', () => this.redo());
  }

  makeElementsEditable() {
    // Find all elements that should be editable
    const editableSelectors = [
      'h1, h2, h3, h4, h5, h6',
      'p',
      '.editable-text',
      '.hero-title',
      '.hero-description',
      '.section-title',
      '.section-subtitle',
      '.feature-title',
      '.feature-description',
      '.btn',
      'a.nav-link'
    ];
    
    editableSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        // Skip elements inside nav or that are already marked
        if (!el.closest('.visual-editor-toolbar') && !el.hasAttribute('data-editable')) {
          el.setAttribute('data-editable', 'text');
          el.setAttribute('data-original', el.textContent.trim());
        }
      });
    });

    // Make images editable
    document.querySelectorAll('img').forEach(img => {
      if (!img.closest('.visual-editor-toolbar')) {
        img.setAttribute('data-editable', 'image');
        img.setAttribute('data-original', img.src);
      }
    });

    // Make backgrounds editable
    document.querySelectorAll('[style*="background"]').forEach(el => {
      if (!el.closest('.visual-editor-toolbar')) {
        el.setAttribute('data-editable', 'background');
      }
    });
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      const editable = e.target.closest('[data-editable]');
      
      if (editable) {
        e.preventDefault();
        e.stopPropagation();
        this.editElement(editable);
      } else if (!e.target.closest('.inline-editor')) {
        this.closeInlineEditor();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        this.undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        this.redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.save();
      } else if (e.key === 'Escape') {
        this.closeInlineEditor();
      }
    });
  }

  editElement(element) {
    this.currentElement = element;
    const type = element.getAttribute('data-editable');
    
    // Remove previous editing state
    document.querySelectorAll('.editing').forEach(el => el.classList.remove('editing'));
    element.classList.add('editing');
    
    // Close existing editor
    this.closeInlineEditor();
    
    // Create inline editor based on type
    if (type === 'text') {
      this.createTextEditor(element);
    } else if (type === 'image') {
      this.createImageEditor(element);
    } else if (type === 'background') {
      this.createBackgroundEditor(element);
    }
  }

  createTextEditor(element) {
    const isMultiline = element.tagName === 'P' || element.offsetHeight > 60;
    const currentText = element.textContent.trim();
    
    this.inlineEditor = document.createElement('div');
    this.inlineEditor.className = 'inline-editor';
    
    this.inlineEditor.innerHTML = `
      <label class="inline-editor-label">Edit Text</label>
      ${isMultiline 
        ? `<textarea class="inline-editor-textarea" rows="4">${currentText}</textarea>`
        : `<input type="text" class="inline-editor-input" value="${currentText}">`
      }
      <div class="inline-editor-actions">
        <button class="inline-editor-btn inline-editor-btn-save">Save</button>
        <button class="inline-editor-btn inline-editor-btn-cancel">Cancel</button>
      </div>
    `;
    
    document.body.appendChild(this.inlineEditor);
    
    // Position near element
    this.positionEditor(element);
    
    // Focus input
    const input = this.inlineEditor.querySelector('input, textarea');
    input.focus();
    input.select();
    
    // Set up buttons
    this.inlineEditor.querySelector('.inline-editor-btn-save').addEventListener('click', () => {
      this.saveTextEdit(element, input.value);
    });
    
    this.inlineEditor.querySelector('.inline-editor-btn-cancel').addEventListener('click', () => {
      this.closeInlineEditor();
    });
    
    // Save on Enter (for single line)
    if (!isMultiline) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.saveTextEdit(element, input.value);
        }
      });
    }
  }

  createImageEditor(element) {
    const currentSrc = element.src;
    
    this.inlineEditor = document.createElement('div');
    this.inlineEditor.className = 'inline-editor';
    
    this.inlineEditor.innerHTML = `
      <label class="inline-editor-label">Edit Image</label>
      <input type="text" class="inline-editor-input" value="${currentSrc}" placeholder="Enter image URL">
      <div class="inline-editor-image-upload">
        <label class="image-upload-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload Image
          <input type="file" accept="image/*" style="display: none;">
        </label>
      </div>
      <div class="inline-editor-actions">
        <button class="inline-editor-btn inline-editor-btn-save">Save</button>
        <button class="inline-editor-btn inline-editor-btn-cancel">Cancel</button>
      </div>
    `;
    
    document.body.appendChild(this.inlineEditor);
    this.positionEditor(element);
    
    const input = this.inlineEditor.querySelector('.inline-editor-input');
    const fileInput = this.inlineEditor.querySelector('input[type="file"]');
    
    // Handle file upload
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          input.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Set up buttons
    this.inlineEditor.querySelector('.inline-editor-btn-save').addEventListener('click', () => {
      this.saveImageEdit(element, input.value);
    });
    
    this.inlineEditor.querySelector('.inline-editor-btn-cancel').addEventListener('click', () => {
      this.closeInlineEditor();
    });
  }

  createBackgroundEditor(element) {
    const style = window.getComputedStyle(element);
    const currentBg = style.backgroundColor;
    
    this.inlineEditor = document.createElement('div');
    this.inlineEditor.className = 'inline-editor';
    
    const colors = [
      '#7c3aed', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', 
      '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
    ];
    
    this.inlineEditor.innerHTML = `
      <label class="inline-editor-label">Choose Background Color</label>
      <div class="inline-editor-colors">
        ${colors.map(color => `
          <div class="color-swatch" style="background: ${color};" data-color="${color}"></div>
        `).join('')}
      </div>
      <div class="inline-editor-actions">
        <button class="inline-editor-btn inline-editor-btn-cancel">Cancel</button>
      </div>
    `;
    
    document.body.appendChild(this.inlineEditor);
    this.positionEditor(element);
    
    // Color swatch handlers
    this.inlineEditor.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', () => {
        const color = swatch.dataset.color;
        this.saveBackgroundEdit(element, color);
      });
    });
    
    this.inlineEditor.querySelector('.inline-editor-btn-cancel').addEventListener('click', () => {
      this.closeInlineEditor();
    });
  }

  positionEditor(element) {
    const rect = element.getBoundingClientRect();
    const editor = this.inlineEditor;
    
    // Position below element by default
    let top = rect.bottom + window.scrollY + 10;
    let left = rect.left + window.scrollX;
    
    // Adjust if off screen
    if (left + 300 > window.innerWidth) {
      left = window.innerWidth - 320;
    }
    
    if (top + 200 > window.innerHeight + window.scrollY) {
      top = rect.top + window.scrollY - 210;
    }
    
    editor.style.top = `${top}px`;
    editor.style.left = `${left}px`;
  }

  saveTextEdit(element, newText) {
    // Validate input
    if (!newText || newText.trim() === '') {
      console.warn('Empty text not saved');
      this.closeInlineEditor();
      return;
    }
    
    if (newText !== element.textContent.trim()) {
      this.addToHistory({
        element: element,
        property: 'textContent',
        oldValue: element.textContent,
        newValue: newText
      });
      
      element.textContent = newText;
      element.classList.add('edit-success');
      setTimeout(() => element.classList.remove('edit-success'), 300);
      
      this.isDirty = true;
    }
    
    this.closeInlineEditor();
  }

  saveImageEdit(element, newSrc) {
    // Validate URL
    if (!newSrc || newSrc.trim() === '') {
      console.warn('Empty image URL not saved');
      this.closeInlineEditor();
      return;
    }
    
    if (newSrc && newSrc !== element.src) {
      this.addToHistory({
        element: element,
        property: 'src',
        oldValue: element.src,
        newValue: newSrc
      });
      
      element.src = newSrc;
      element.classList.add('edit-success');
      setTimeout(() => element.classList.remove('edit-success'), 300);
      
      this.isDirty = true;
    }
    
    this.closeInlineEditor();
  }

  saveBackgroundEdit(element, newColor) {
    const oldColor = element.style.backgroundColor;
    
    this.addToHistory({
      element: element,
      property: 'backgroundColor',
      oldValue: oldColor,
      newValue: newColor
    });
    
    element.style.backgroundColor = newColor;
    element.classList.add('edit-success');
    setTimeout(() => element.classList.remove('edit-success'), 300);
    
    this.isDirty = true;
    this.closeInlineEditor();
  }

  closeInlineEditor() {
    if (this.inlineEditor) {
      // Remove event listeners to prevent memory leaks
      const saveBtn = this.inlineEditor.querySelector('.inline-editor-btn-save');
      const cancelBtn = this.inlineEditor.querySelector('.inline-editor-btn-cancel');
      if (saveBtn) saveBtn.replaceWith(saveBtn.cloneNode(true));
      if (cancelBtn) cancelBtn.replaceWith(cancelBtn.cloneNode(true));
      
      this.inlineEditor.remove();
      this.inlineEditor = null;
    }
    
    document.querySelectorAll('.editing').forEach(el => el.classList.remove('editing'));
    this.currentElement = null;
  }

  addToHistory(change) {
    // Remove any future history if we're not at the end
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    
    this.history.push(change);
    
    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }
    
    this.updateHistoryButtons();
  }

  undo() {
    if (this.historyIndex >= 0) {
      const change = this.history[this.historyIndex];
      
      if (change.property === 'textContent') {
        change.element.textContent = change.oldValue;
      } else if (change.property === 'src') {
        change.element.src = change.oldValue;
      } else if (change.property === 'backgroundColor') {
        change.element.style.backgroundColor = change.oldValue;
      }
      
      this.historyIndex--;
      this.updateHistoryButtons();
      this.isDirty = true;
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      const change = this.history[this.historyIndex];
      
      if (change.property === 'textContent') {
        change.element.textContent = change.newValue;
      } else if (change.property === 'src') {
        change.element.src = change.newValue;
      } else if (change.property === 'backgroundColor') {
        change.element.style.backgroundColor = change.newValue;
      }
      
      this.updateHistoryButtons();
      this.isDirty = true;
    }
  }

  updateHistoryButtons() {
    document.getElementById('undo-btn').disabled = this.historyIndex < 0;
    document.getElementById('redo-btn').disabled = this.historyIndex >= this.history.length - 1;
  }

  preview() {
    // Open preview in new window
    const previewWindow = window.open('', 'Preview', 'width=1200,height=800');
    previewWindow.document.write(document.documentElement.outerHTML);
    
    // Remove editor elements from preview
    const previewDoc = previewWindow.document;
    previewDoc.querySelector('.visual-editor-toolbar')?.remove();
    previewDoc.querySelectorAll('[data-editable]').forEach(el => {
      el.removeAttribute('data-editable');
      el.removeAttribute('data-original');
    });
    
    // Remove editor styles
    const editorStyleLink = previewDoc.querySelector('link[href*="visual-editor"]');
    if (editorStyleLink) editorStyleLink.remove();
  }

  save() {
    // Collect all edited elements
    const changes = {};
    document.querySelectorAll('[data-editable]').forEach(el => {
      const original = el.getAttribute('data-original');
      const current = el.getAttribute('data-editable') === 'image' ? el.src : el.textContent.trim();
      
      if (original !== current) {
        changes[el.tagName + '-' + Array.from(el.parentNode.children).indexOf(el)] = {
          original,
          current,
          type: el.getAttribute('data-editable')
        };
      }
    });
    
    // Save to localStorage
    const templateName = new URLSearchParams(window.location.search).get('template') || 'custom';
    localStorage.setItem(`template-${templateName}`, JSON.stringify({
      changes,
      html: document.documentElement.outerHTML,
      savedAt: new Date().toISOString()
    }));
    
    this.isDirty = false;
    
    // Show success message
    this.showNotification('Changes saved successfully!', 'success');
  }

  export() {
    // Generate clean HTML without editor elements
    const clone = document.documentElement.cloneNode(true);
    
    // Remove editor elements
    clone.querySelector('.visual-editor-toolbar')?.remove();
    clone.querySelectorAll('[data-editable]').forEach(el => {
      el.removeAttribute('data-editable');
      el.removeAttribute('data-original');
      el.classList.remove('editing', 'edit-success');
    });
    
    // Remove editor styles and scripts
    clone.querySelector('link[href*="visual-editor"]')?.remove();
    clone.querySelector('script[src*="visual-editor"]')?.remove();
    
    // Create download
    const html = '<!DOCTYPE html>\\n' + clone.outerHTML;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `website-${Date.now()}.html`;
    a.click();
    
    URL.revokeObjectURL(url);
    
    this.showNotification('Website exported successfully!', 'success');
  }

  setupAutoSave() {
    // Auto-save every 2 minutes if there are changes
    this.autoSaveInterval = setInterval(() => {
      if (this.isDirty) {
        this.save();
        console.log('Auto-saved at', new Date().toLocaleTimeString());
      }
    }, 120000);
    
    // Warn before closing if there are unsaved changes
    this.beforeUnloadHandler = (e) => {
      if (this.isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  destroy() {
    // Cleanup method to prevent memory leaks
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
    if (this.beforeUnloadHandler) {
      window.removeEventListener('beforeunload', this.beforeUnloadHandler);
    }
    this.closeInlineEditor();
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#7c3aed'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      z-index: 10003;
      font-weight: 600;
      animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize visual editor when page loads
let visualEditor;
document.addEventListener('DOMContentLoaded', () => {
  // Check if in visual editor mode
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('mode') === 'visual' || urlParams.get('pro') === 'true') {
    visualEditor = new VisualEditor();
  }
});
