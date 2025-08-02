// VIBE SHOP Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme functionality
  initTheme();
});

function initTheme() {
  // Add to cart functionality
  initAddToCart();
  
  // Search functionality
  initSearch();
  
  // Mobile menu toggle
  initMobileMenu();
  
  // Smooth scrolling
  initSmoothScrolling();
}

function initAddToCart() {
  // Handle add to cart form submissions
  const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');
  
  addToCartForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const button = form.querySelector('button[type="submit"]');
      const originalText = button.innerHTML;
      
      // Show loading state
      button.innerHTML = 'Adding...';
      button.disabled = true;
      
      // Reset after a short delay (in real implementation, this would be handled by AJAX)
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Show success message
        showNotification('Product added to cart!', 'success');
      }, 1000);
    });
  });
}

function initSearch() {
  // Handle search form submissions
  const searchForm = document.querySelector('form[action*="search"]');
  
  if (searchForm) {
    const searchInput = searchForm.querySelector('input[name="q"]');
    
    searchInput.addEventListener('input', function(e) {
      // Real-time search functionality could be added here
      console.log('Searching for:', e.target.value);
    });
  }
}

function initMobileMenu() {
  // Mobile menu toggle functionality
  const mobileMenuToggle = document.querySelector('[data-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function initSmoothScrolling() {
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg text-white ${
    type === 'success' ? 'bg-green-500' : 
    type === 'error' ? 'bg-red-500' : 
    'bg-blue-500'
  }`;
  notification.textContent = message;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Utility functions
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export for use in other scripts
window.VIBESHOP = {
  showNotification,
  formatPrice,
  debounce
}; 