// Global Error Handler for Web Maker
// This script provides comprehensive error handling across all pages

/**
 * Global Error Handler for Web Maker Project
 * Catches and handles JavaScript errors, providing user-friendly notifications
 */

(function() {
  'use strict';

  // Error tracking storage
  let errorCount = 0;
  const maxErrors = 3; // Reduced from 10
  const errorLog = [];
  const shownErrors = new Set(); // Track which errors we've already shown

  // Create error notification system
  function createErrorNotification() {
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'error-notification-container';
    notificationContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
      pointer-events: none;
    `;
    document.body.appendChild(notificationContainer);
    return notificationContainer;
  }

  function showErrorNotification(message, type = 'error') {
    const container = document.getElementById('error-notification-container') || createErrorNotification();
    
    const notification = document.createElement('div');
    notification.className = `error-notification ${type}`;
    notification.style.cssText = `
      background: ${type === 'error' ? '#ef4444' : '#f59e0b'};
      color: white;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-size: 14px;
      max-width: 300px;
      pointer-events: auto;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span>${type === 'error' ? '⚠️' : 'ℹ️'}</span>
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" style="background:none;border:none;color:white;cursor:pointer;margin-left:auto;">×</button>
      </div>
    `;
    
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Log error with details
  function logError(error, context = '') {
    // Create a unique error signature to prevent duplicates
    const errorSignature = `${error.message || String(error)}-${context}`;
    
    // Skip if we've already shown this error
    if (shownErrors.has(errorSignature)) {
      return;
    }
    
    shownErrors.add(errorSignature);
    errorCount++;
    
    const errorInfo = {
      timestamp: new Date().toISOString(),
      message: error.message || String(error),
      stack: error.stack || '',
      context: context,
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    errorLog.push(errorInfo);
    console.error('🚨 Error logged:', errorInfo);

    // Store in localStorage for debugging
    try {
      const storedErrors = JSON.parse(localStorage.getItem('webmaker_errors') || '[]');
      storedErrors.push(errorInfo);
      // Keep only last 50 errors
      if (storedErrors.length > 50) {
        storedErrors.splice(0, storedErrors.length - 50);
      }
      localStorage.setItem('webmaker_errors', JSON.stringify(storedErrors));
    } catch (e) {
      console.warn('Could not store error in localStorage:', e);
    }

    // Show user notification if not too many errors
    if (errorCount <= maxErrors) {
      showErrorNotification('A technical issue occurred. Please refresh if problems persist.', 'error');
    }
  }

  // Handle JavaScript errors
  function handleJavaScriptError(event) {
    const error = event.error || event;
    logError(error, 'JavaScript Error');
    return true; // Prevent default browser error handling
  }

  // Handle unhandled promise rejections
  function handleUnhandledRejection(event) {
    logError(event.reason || new Error('Unhandled Promise Rejection'), 'Promise Rejection');
    event.preventDefault(); // Prevent console warning
  }

  // Handle resource loading errors
  function handleResourceError(event) {
    if (event.target && event.target !== window) {
      const resource = event.target;
      
      // Ignore certain resource types that commonly fail
      if (resource.tagName === 'IMG') {
        return; // Don't show errors for missing images
      }
      
      const errorMsg = `Failed to load ${resource.tagName.toLowerCase()}: ${resource.src || resource.href || 'unknown'}`;
      logError(new Error(errorMsg), 'Resource Load Error');
      
      // Try to provide fallbacks for critical resources
      if (resource.tagName === 'SCRIPT') {
        console.warn('Script failed to load:', resource.src);
      } else if (resource.tagName === 'LINK' && resource.rel === 'stylesheet') {
        console.warn('Stylesheet failed to load:', resource.href);
      }
    }
  }

  // Monitor network status
  function handleNetworkStatus() {
    if (!navigator.onLine) {
      showErrorNotification('You appear to be offline. Some features may not work.', 'warning');
    }
  }

  // Initialize error handling
  function initializeErrorHandling() {
    // Global error listeners
    window.addEventListener('error', handleJavaScriptError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    // Resource error listener (with capture)
    window.addEventListener('error', handleResourceError, true);
    
    // Network status
    window.addEventListener('online', () => showErrorNotification('Connection restored!', 'info'));
    window.addEventListener('offline', handleNetworkStatus);
    
    // Initial network check
    if (!navigator.onLine) {
      setTimeout(handleNetworkStatus, 1000);
    }
    
    console.log('🛡️ Global error handler initialized');
  }

  // Expose error log for debugging
  window.getErrorLog = function() {
    return {
      currentSession: errorLog,
      stored: JSON.parse(localStorage.getItem('webmaker_errors') || '[]'),
      count: errorCount
    };
  };

  // Clear error log
  window.clearErrorLog = function() {
    errorLog.length = 0;
    errorCount = 0;
    localStorage.removeItem('webmaker_errors');
    console.log('Error log cleared');
  };

  // Initialize when DOM is ready or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeErrorHandling);
  } else {
    initializeErrorHandling();
  }

})();