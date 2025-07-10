// Particle.js Configuration
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ['#00d4ff', '#7c3aed', '#f59e0b']
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#00d4ff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearFieldError);
    });
  }
});

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  // Remove existing error/success classes
  field.classList.remove('error', 'success');
  
  // Validate based on field type
  switch(field.type) {
    case 'email':
      if (!validateEmail(value)) {
        field.classList.add('error');
        showFieldError(field, 'Please enter a valid email address');
      } else {
        field.classList.add('success');
      }
      break;
    case 'text':
      if (value.length < 2) {
        field.classList.add('error');
        showFieldError(field, 'This field is required');
      } else {
        field.classList.add('success');
      }
      break;
  }
  
  // Special validation for textarea
  if (field.tagName === 'TEXTAREA') {
    if (value.length < 10) {
      field.classList.add('error');
      showFieldError(field, 'Message must be at least 10 characters long');
    } else {
      field.classList.add('success');
    }
  }
}

function clearFieldError(e) {
  const field = e.target;
  field.classList.remove('error');
  
  // Remove error message if exists
  const errorMsg = field.parentNode.querySelector('.field-error');
  if (errorMsg) {
    errorMsg.remove();
  }
}

function showFieldError(field, message) {
  // Remove existing error message
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Create new error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error text-red-400 text-sm mt-1';
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('.submit-btn');
  const formData = new FormData(form);
  
  // Validate all fields
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;
  
  inputs.forEach(input => {
    validateField({ target: input });
    if (input.classList.contains('error')) {
      isValid = false;
    }
  });
  
  if (!isValid) {
    showFormMessage('Please fix the errors above', 'error');
    return;
  }
  
  // Disable submit button and show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
  
  try {
    // Prepare email data
    const emailData = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      to: 'maz.moazzam345@gmail.com'
    };
    
    // Send email using EmailJS (you'll need to set this up)
    // For now, we'll simulate sending and show success message
    await simulateEmailSend(emailData);
    
    // Show success message
    showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
    
    // Reset form
    form.reset();
    inputs.forEach(input => {
      input.classList.remove('success');
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    showFormMessage('Failed to send message. Please try again or email me directly.', 'error');
  } finally {
    // Re-enable submit button
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Send Message';
  }
}

function simulateEmailSend(emailData) {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      console.log('Email data:', emailData);
      resolve();
    }, 2000);
  });
}

function showFormMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;
  
  // Insert after form
  const form = document.getElementById('contactForm');
  form.parentNode.insertBefore(messageDiv, form.nextSibling);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('nav');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    navbar.style.backdropFilter = 'blur(20px)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    navbar.style.backdropFilter = 'blur(10px)';
  }
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('#home h1 span');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
  }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('#home');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Interactive project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-15px) scale(1.03)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Experience card animations
document.querySelectorAll('.experience-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
    this.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.15)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = 'none';
  });
});

// Tech stack icons animation
document.querySelectorAll('.tech-icon').forEach(icon => {
  icon.addEventListener('mouseenter', function() {
    this.style.animation = 'pulse 1s infinite';
  });
  
  icon.addEventListener('mouseleave', function() {
    this.style.animation = 'none';
  });
});

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
  });
  
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Animate elements on page load
  const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
  animatedElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Cursor trail effect
let mouseX = 0;
let mouseY = 0;
let cursorTrail = [];

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Create cursor trail
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.left = mouseX + 'px';
  trail.style.top = mouseY + 'px';
  document.body.appendChild(trail);
  
  cursorTrail.push(trail);
  
  // Remove old trails
  if (cursorTrail.length > 5) {
    const oldTrail = cursorTrail.shift();
    oldTrail.remove();
  }
  
  // Animate trail
  setTimeout(() => {
    trail.style.opacity = '0';
    trail.style.transform = 'scale(0)';
  }, 100);
});

// Add cursor trail styles
const style = document.createElement('style');
style.textContent = `
  .cursor-trail {
    position: fixed;
    width: 6px;
    height: 6px;
    background: linear-gradient(45deg, #00d4ff, #7c3aed);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  
  .loaded {
    animation: fadeIn 1s ease-out;
  }
  
  .field-error {
    animation: shake 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);

// Smooth reveal animations for sections
function revealOnScroll() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize reveal on page load
revealOnScroll();

// Add some interactive console messages
console.log('%c🚀 Welcome to Mazen\'s Portfolio!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%c💡 Built with modern web technologies', 'color: #7c3aed; font-size: 14px;');
console.log('%c🌟 Feel free to explore the code!', 'color: #f59e0b; font-size: 14px;');
console.log('%c📧 Contact: maz.moazzam345@gmail.com', 'color: #00d4ff; font-size: 14px;');

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  revealOnScroll();
}, 16)); // ~60fps

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowDown':
      e.preventDefault();
      window.scrollBy({ top: 100, behavior: 'smooth' });
      break;
    case 'ArrowUp':
      e.preventDefault();
      window.scrollBy({ top: -100, behavior: 'smooth' });
      break;
    case 'Home':
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
    case 'End':
      e.preventDefault();
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      break;
  }
});

// Add touch gestures for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartY - touchEndY;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe up
      window.scrollBy({ top: 300, behavior: 'smooth' });
    } else {
      // Swipe down
      window.scrollBy({ top: -300, behavior: 'smooth' });
    }
  }
}
