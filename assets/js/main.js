document.addEventListener('DOMContentLoaded', function() {
  // Add animation classes to elements as they scroll into view
  const animatedElements = document.querySelectorAll(
    '.animal-card, .fact-card, .category-card, .favorite-animal, .post-header, .about-image'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // Handle smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Handle search form submission
  const searchForm = document.querySelector('form[action="/search/"]');
  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      const searchInput = this.querySelector('input[name="q"]');
      if (!searchInput.value.trim()) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }
  
  // Add hover effects to animal cards
  const animalCards = document.querySelectorAll('.animal-card');
  animalCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
    });
  });
});

// Create confetti effect for the subscribe button
const subscribeBtn = document.querySelector('.newsletter button');
if (subscribeBtn) {
  subscribeBtn.addEventListener('click', function(e) {
    const input = document.querySelector('.newsletter input[type="email"]');
    if (!input.value.trim()) {
      e.preventDefault();
      input.focus();
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
      e.preventDefault();
      alert('Please enter a valid email address!');
      input.focus();
      return;
    }
    
    e.preventDefault();
    input.value = '';
    alert('Thanks for subscribing to Rebecca\'s Animal Adventures!');
    
    // Create confetti effect
    createConfetti();
  });
}

function createConfetti() {
  const colors = ['#8A4FFF', '#FF6B98', '#FFD53F', '#4FCF6A'];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.zIndex = '9999';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.opacity = Math.random() + 0.5;
    
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    
    confetti.style.left = startX + 'px';
    confetti.style.top = startY + 'px';
    
    document.body.appendChild(confetti);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const destinationX = startX + Math.cos(angle) * distance;
    const destinationY = startY + Math.sin(angle) * distance;
    
    const animation = confetti.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${destinationX - startX}px, ${destinationY - startY}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: Math.random() * 1000 + 1000,
      easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
    });
    
    animation.onfinish = () => {
      confetti.remove();
    };
  }
}