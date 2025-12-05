// Navigation functionality
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Page navigation
function navigateToSection(sectionId) {
  // Hide all page sections
  const allSections = document.querySelectorAll('.page-section');
  allSections.forEach(section => {
    section.classList.remove('active-page');
  });

  // Show the selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active-page');
  }

  // Update active nav link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + sectionId) {
      link.classList.add('active');
    }
  });

  // Close mobile menu if open
  if (navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle nav link clicks
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('href').substring(1);
    navigateToSection(sectionId);
  });
});

// Add scroll effect to navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.style.boxShadow = 'var(--shadow-md)';
  } else {
    navbar.style.boxShadow = 'var(--shadow-sm)';
  }
  
  lastScroll = currentScroll;
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      organization: document.getElementById('organization').value,
      service: document.getElementById('service').value,
      message: document.getElementById('message').value
    };
    
    // Log form data (in production, this would be sent to a server)
    console.log('Form submitted:', formData);
    
    // Show success message
    contactForm.style.display = 'none';
    formSuccess.classList.remove('hidden');
    
    // Reset form after 3 seconds and show it again
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = 'block';
      formSuccess.classList.add('hidden');
    }, 3000);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const sectionId = href.substring(1);
      navigateToSection(sectionId);
    }
  });
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  // Show home page by default
  navigateToSection('home');
});