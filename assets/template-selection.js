// ====================================
// Template Selection & Payment System
// ====================================

// Pro template IDs that require payment
const PRO_TEMPLATES = [
  'vtc-fleet-management',
  'vtc-event-convoy',
  'vtc-recruitment',
  'vtc-premium-showcase',
  'vtc-ultimate-elite',
  'vtc-ultimate-pro'
];

// Check if user has pro access
function hasProAccess() {
  // Check localStorage for pro subscription
  const proSubscription = localStorage.getItem('proSubscription');
  if (proSubscription) {
    try {
      const subscription = JSON.parse(proSubscription);
      const expiryDate = new Date(subscription.expiryDate);
      const now = new Date();
      return expiryDate > now;
    } catch (e) {
      return false;
    }
  }
  return false;
}

// Select template function
function selectTemplate(templateId) {
  console.log('Selecting template:', templateId);
  
  // Check if this is a pro template
  if (PRO_TEMPLATES.includes(templateId)) {
    if (!hasProAccess()) {
      showUpgradeModal(templateId);
      return;
    }
  }
  
  // If free template or user has pro access, proceed to editor
  window.location.href = `vtc-template-editor.html?template=${templateId}`;
}

// New function to handle when user clicks edit/customize on pro template
function editTemplate(templateId) {
  console.log('Attempting to edit template:', templateId);
  
  // Check if this is a pro template
  if (PRO_TEMPLATES.includes(templateId)) {
    if (!hasProAccess()) {
      showPaymentRequiredModal(templateId);
      return;
    }
  }
  
  // If free template or user has pro access, proceed to editor
  window.location.href = `vtc-template-editor.html?template=${templateId}&mode=edit`;
}

// Show payment required modal specifically for editing pro templates
function showPaymentRequiredModal(templateId) {
  const modal = document.createElement('div');
  modal.className = 'upgrade-modal-overlay';
  modal.innerHTML = `
    <div class="upgrade-modal">
      <button class="upgrade-modal-close" onclick="closeUpgradeModal()">&times;</button>
      <div class="upgrade-modal-content">
        <div class="upgrade-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        </div>
        <h2>🔒 Pro Template - Payment Required</h2>
        <p class="upgrade-main-text">To edit and customize this premium template, you need to subscribe to our Pro plan.</p>
        <div class="upgrade-benefits">
          <div class="upgrade-benefit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Edit & Customize Pro Templates</span>
          </div>
          <div class="upgrade-benefit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Access to 6 Premium Templates</span>
          </div>
          <div class="upgrade-benefit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Advanced Editing Tools</span>
          </div>
          <div class="upgrade-benefit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Lifetime Updates & Support</span>
          </div>
        </div>
        <div class="upgrade-pricing">
          <div class="price-highlight">
            <span class="price-amount">$9.99</span>
            <span class="price-period">/month</span>
          </div>
          <p class="trial-info">✨ One-time payment unlocks all pro templates</p>
        </div>
        <div class="upgrade-actions">
          <a href="https://razorpay.me/@horizon19" target="_blank" rel="noopener noreferrer" class="btn btn-primary" onclick="trackPaymentClick('${templateId}')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Make Payment & Unlock
          </a>
          <button class="btn btn-outline" onclick="closeUpgradeModal(); selectTemplate('${templateId}')">Preview Only</button>
        </div>
        <button class="upgrade-cancel" onclick="closeUpgradeModal()">Maybe Later</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Add click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeUpgradeModal();
    }
  });
  
  // Add escape key to close
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeUpgradeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

// Track payment click for analytics
function trackPaymentClick(templateId) {
  console.log('Payment initiated for template:', templateId);
  // Store the template ID in localStorage so after payment, user can continue
  localStorage.setItem('pendingTemplate', templateId);
  localStorage.setItem('paymentInitiated', Date.now());
}

// Preview template function
function previewTemplate(templateId) {
  console.log('Previewing template:', templateId);
  // Open preview in new window/tab
  window.open(`template-preview.html?template=${templateId}`, '_blank');
}

// Show template info
function showTemplateInfo(templateId) {
  console.log('Showing info for template:', templateId);
  // Create info modal
  const isPro = PRO_TEMPLATES.includes(templateId);
  const modal = document.createElement('div');
  modal.className = 'info-modal-overlay';
  modal.innerHTML = `
    <div class="upgrade-modal">
      <button class="upgrade-modal-close" onclick="closeInfoModal()">&times;</button>
      <div class="upgrade-modal-content">
        <h2>Template Information</h2>
        <p>Template ID: ${templateId}</p>
        <p>Type: ${isPro ? 'Pro Template' : 'Free Template'}</p>
        ${isPro ? '<p class="pro-note">⭐ This is a premium template requiring a Pro subscription</p>' : ''}
        <div class="upgrade-actions">
          <button class="btn btn-primary" onclick="closeInfoModal(); selectTemplate('${templateId}')">Use Template</button>
          <button class="btn btn-outline" onclick="closeInfoModal()">Close</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeInfoModal();
    }
  });
}

// Close info modal
function closeInfoModal() {
  const modal = document.querySelector('.info-modal-overlay');
  if (modal) {
    document.body.style.overflow = '';
    modal.remove();
  }
}

// Show upgrade modal for pro templates
function showUpgradeModal(templateId) {
  const modal = document.createElement('div');
  modal.className = 'upgrade-modal-overlay';
  modal.innerHTML = `
    <div class="upgrade-modal">
      <button class="upgrade-modal-close" onclick="closeUpgradeModal()">&times;</button>
      <div class="upgrade-modal-content">
        <div class="upgrade-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <h2>🌟 Upgrade to Pro Required</h2>
        <p class="upgrade-main-text">This is a premium template available only with our Pro subscription.</p>
        <div class="upgrade-benefits">
          <div class="upgrade-benefit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Access to 6 Premium Templates</span>
          </div>
          <div class="upgrade-benefit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Advanced Editing Tools</span>
          </div>
          <div class="upgrade-benefit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Priority Support</span>
          </div>
          <div class="upgrade-benefit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Regular Updates & New Features</span>
          </div>
        </div>
        <div class="upgrade-pricing">
          <div class="price-highlight">
            <span class="price-amount">$9.99</span>
            <span class="price-period">/month</span>
          </div>
          <p class="trial-info">✨ Start with a 14-day free trial</p>
        </div>
        <div class="upgrade-actions">
          <a href="https://razorpay.me/@horizon19" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Subscribe Now
          </a>
          <a href="pro-trial.html" class="btn btn-outline">Start Free Trial</a>
        </div>
        <button class="upgrade-cancel" onclick="closeUpgradeModal()">Maybe Later</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Add click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeUpgradeModal();
    }
  });
  
  // Add escape key to close
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeUpgradeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

// Close upgrade modal
function closeUpgradeModal() {
  const modal = document.querySelector('.upgrade-modal-overlay');
  if (modal) {
    document.body.style.overflow = '';
    modal.remove();
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Template selection system initialized');
  
  // Add pro badges to pro templates
  PRO_TEMPLATES.forEach(templateId => {
    const templateCard = document.querySelector(`[data-template="${templateId}"]`)?.closest('.template-card');
    if (templateCard && !templateCard.querySelector('.pro-badge')) {
      const badge = document.createElement('div');
      badge.className = 'pro-badge-overlay';
      badge.innerHTML = '<span>⭐ PRO</span>';
      templateCard.querySelector('.template-preview-img').appendChild(badge);
    }
  });
});

// Make functions globally available
window.selectTemplate = selectTemplate;
window.editTemplate = editTemplate;
window.previewTemplate = previewTemplate;
window.showTemplateInfo = showTemplateInfo;
window.closeUpgradeModal = closeUpgradeModal;
window.closeInfoModal = closeInfoModal;
window.hasProAccess = hasProAccess;
window.trackPaymentClick = trackPaymentClick;

// Check for successful payment on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log('Template selection system initialized');
  
  // Check if user just completed payment
  const paymentInitiated = localStorage.getItem('paymentInitiated');
  const pendingTemplate = localStorage.getItem('pendingTemplate');
  
  if (paymentInitiated && pendingTemplate) {
    // Check if payment was recent (within last 30 minutes)
    const paymentTime = parseInt(paymentInitiated);
    const now = Date.now();
    const thirtyMinutes = 30 * 60 * 1000;
    
    if (now - paymentTime < thirtyMinutes) {
      // Show confirmation modal asking if payment was successful
      showPaymentConfirmation(pendingTemplate);
    }
  }
  
  // Add pro badges to pro templates
  PRO_TEMPLATES.forEach(templateId => {
    const templateCard = document.querySelector(`[data-template="${templateId}"]`)?.closest('.template-card');
    if (templateCard && !templateCard.querySelector('.pro-badge')) {
      const badge = document.createElement('div');
      badge.className = 'pro-badge-overlay';
      badge.innerHTML = '<span>⭐ PRO</span>';
      const previewImg = templateCard.querySelector('.template-preview-img');
      if (previewImg) {
        previewImg.appendChild(badge);
      }
    }
  });
});

// Show payment confirmation modal
function showPaymentConfirmation(templateId) {
  const modal = document.createElement('div');
  modal.className = 'upgrade-modal-overlay';
  modal.innerHTML = `
    <div class="upgrade-modal">
      <div class="upgrade-modal-content">
        <div class="upgrade-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h2>Payment Confirmation</h2>
        <p class="upgrade-main-text">Did you complete the payment successfully?</p>
        <div class="upgrade-actions">
          <button class="btn btn-primary" onclick="confirmPaymentSuccess('${templateId}')">
            Yes, Payment Done
          </button>
          <button class="btn btn-outline" onclick="closePaymentConfirmation()">
            No, Not Yet
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

// Confirm payment success
function confirmPaymentSuccess(templateId) {
  // Grant pro access (set expiry for 1 year from now)
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  
  const subscription = {
    type: 'pro',
    expiryDate: expiryDate.toISOString(),
    activatedOn: new Date().toISOString()
  };
  
  localStorage.setItem('proSubscription', JSON.stringify(subscription));
  localStorage.removeItem('paymentInitiated');
  localStorage.removeItem('pendingTemplate');
  
  // Close modal and redirect to editor
  closePaymentConfirmation();
  
  // Show success message
  showSuccessMessage();
  
  // Redirect to editor after 2 seconds
  setTimeout(() => {
    window.location.href = `vtc-template-editor.html?template=${templateId}&mode=edit`;
  }, 2000);
}

// Close payment confirmation
function closePaymentConfirmation() {
  const modal = document.querySelector('.upgrade-modal-overlay');
  if (modal) {
    document.body.style.overflow = '';
    modal.remove();
  }
  localStorage.removeItem('paymentInitiated');
  localStorage.removeItem('pendingTemplate');
}

// Show success message
function showSuccessMessage() {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-notification';
  successDiv.innerHTML = `
    <div class="success-content">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      <span>Pro access activated! Redirecting to editor...</span>
    </div>
  `;
  
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.remove();
  }, 3000);
}

// Make all functions globally available
window.selectTemplate = selectTemplate;
window.editTemplate = editTemplate;
window.previewTemplate = previewTemplate;
window.showTemplateInfo = showTemplateInfo;
window.closeUpgradeModal = closeUpgradeModal;
window.closeInfoModal = closeInfoModal;
window.hasProAccess = hasProAccess;
window.trackPaymentClick = trackPaymentClick;
window.confirmPaymentSuccess = confirmPaymentSuccess;
window.closePaymentConfirmation = closePaymentConfirmation;
