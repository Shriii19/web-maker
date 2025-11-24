// TruckCraft Studio - Preloader Handler
// Only shows on page refresh/initial load, not on navigation

class PreloaderHandler {
  static init() {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
      console.warn('Preloader element not found');
      return;
    }

    // Check if this is a page refresh (not navigation)
    const isPageRefresh = performance.navigation.type === 1 || 
                          performance.getEntriesByType('navigation')[0]?.type === 'reload' ||
                          !sessionStorage.getItem('site_visited');

    if (!isPageRefresh) {
      // Hide immediately if navigating within site
      preloader.remove();
      return;
    }

    // Mark that user has visited the site in this session
    sessionStorage.setItem('site_visited', 'true');

    // Wait exactly 5 seconds before hiding
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Remove from DOM after fade animation
      setTimeout(() => {
        preloader.remove();
      }, 500);
    }, 5000);
  }

  static getHTML() {
    return `
      <div id="preloader" class="preloader">
        <div class="preloader-content">
          <div class="truck-container">
            <svg class="truck" viewBox="0 0 200 100" width="200" height="100">
              <!-- Truck Body -->
              <rect x="80" y="30" width="70" height="35" fill="var(--primary)" rx="3"/>
              <!-- Truck Cabin -->
              <path d="M 150 30 L 165 30 L 175 45 L 175 65 L 150 65 Z" fill="var(--primary-light)"/>
              <!-- Truck Window -->
              <path d="M 155 35 L 168 35 L 173 45 L 173 50 L 155 50 Z" fill="var(--accent)" opacity="0.3"/>
              <!-- Cargo Area -->
              <rect x="85" y="35" width="60" height="25" fill="var(--primary-dark)" rx="2"/>
              <!-- Wheels -->
              <circle cx="100" cy="65" r="8" fill="var(--text-primary)" stroke="var(--border)" stroke-width="2"/>
              <circle cx="100" cy="65" r="4" fill="var(--accent)"/>
              <circle cx="160" cy="65" r="8" fill="var(--text-primary)" stroke="var(--border)" stroke-width="2"/>
              <circle cx="160" cy="65" r="4" fill="var(--accent)"/>
              <!-- Headlights -->
              <circle cx="172" cy="50" r="2" fill="var(--accent)"/>
              <circle cx="172" cy="56" r="2" fill="var(--accent)"/>
            </svg>
            <div class="road"></div>
          </div>
          <div class="loading-text">Loading TruckCraft Studio...</div>
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
        </div>
      </div>
    `;
  }
}

// Auto-initialize when loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => PreloaderHandler.init());
} else {
  PreloaderHandler.init();
}

// Expose globally
window.PreloaderHandler = PreloaderHandler;
