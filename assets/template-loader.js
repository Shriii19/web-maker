// Template Loader for VTC Website Builder
// Loads specific templates from template/ folder based on URL parameter

(function() {
  // Get template parameter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const templateName = urlParams.get('template');
  
  // Wait for DOM and VTCStudio to be ready
  const checkAndLoadTemplate = () => {
    const codeEditor = document.getElementById('code-editor');
    const livePreview = document.getElementById('live-preview');
    
    if (codeEditor && templateName) {
      console.log('Template Loader: Loading template:', templateName);
      
      // Map template names to file paths
      const templatePath = `template/${templateName}.html`;
      
      // Fetch and load the template
      fetch(templatePath)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load template: ${response.statusText}`);
          }
          return response.text();
        })
        .then(htmlCode => {
          console.log('Template Loader: Successfully loaded template');
          
          // Set the code in the editor
          codeEditor.value = htmlCode;
          
          // Update the preview
          if (livePreview) {
            livePreview.srcdoc = htmlCode;
          }
          
          // Show success notification if VTCStudio is available
          if (window.vtcStudio && window.vtcStudio.showNotification) {
            const templateDisplayName = templateName
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            window.vtcStudio.showNotification(`${templateDisplayName} template loaded successfully!`, 'success');
          }
        })
        .catch(error => {
          console.error('Template Loader: Error loading template:', error);
          const errorMsg = `Failed to load template: ${templateName}. Please ensure you're accessing this through a web server.`;
          if (window.vtcStudio && window.vtcStudio.showNotification) {
            window.vtcStudio.showNotification(errorMsg, 'error');
          } else {
            alert(errorMsg);
          }
        });
    } else if (!templateName) {
      console.log('Template Loader: No template parameter found, using default');
    } else {
      console.log('Template Loader: Code editor not ready yet');
    }
  };
  
  // Try to load after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(checkAndLoadTemplate, 500); // Give VTCStudio time to initialize
    });
  } else {
    setTimeout(checkAndLoadTemplate, 500);
  }
  
  // Also try after window load as a fallback
  window.addEventListener('load', () => {
    if (templateName && document.getElementById('code-editor')) {
      setTimeout(checkAndLoadTemplate, 100);
    }
  });
})();
