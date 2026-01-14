// ==================== DOM READY ====================
document.addEventListener("DOMContentLoaded", () => {
  initBioTyping();
  initStatCounters();
  initPlatformInteractions();
  initSmoothAnimations();
  checkImages();
});

// ==================== BIO TYPING ANIMATION ====================
function initBioTyping() {
  const bioTexts = [
    "Connecting people through technology",
    "Building digital experiences that matter",
    "Always learning, always creating",
    "Open to collaboration and new ideas",
  ];

  const bioElement = document.getElementById("animatedBio");
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = bioTexts[textIndex];

    if (isDeleting) {
      bioElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      bioElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % bioTexts.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// ==================== STAT COUNTERS ====================
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number[data-count]");
  let hasAnimated = false;

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        const element = entry.target;
        const targetValue = parseInt(element.getAttribute("data-count"));
        animateCounter(element, targetValue);
      }
    });
  }, observerOptions);

  statNumbers.forEach((stat) => observer.observe(stat));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 1500;
  const stepTime = duration / 50;

  const counter = setInterval(() => {
    current += increment;

    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// ==================== PLATFORM INTERACTIONS ====================
function initPlatformInteractions() {
  const platformLinks = document.querySelectorAll(
    ".platform-link:not(.coming-soon)"
  );
  const comingSoonCard = document.querySelector(".platform-link.coming-soon");

  // Add click ripple effect
  platformLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      createRipple(e, this);
    });

    // Add subtle tilt on mouse move
    link.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const icon = this.querySelector(".platform-icon");
      icon.style.transform = `scale(1.1) rotate(-5deg) translate(${
        deltaX * 3
      }px, ${deltaY * 3}px)`;
    });

    link.addEventListener("mouseleave", function () {
      const icon = this.querySelector(".platform-icon");
      icon.style.transform = "";
    });
  });

  // Coming soon feedback
  if (comingSoonCard) {
    comingSoonCard.addEventListener("click", function (e) {
      e.preventDefault();
      showNotification("Personal blog coming soon! Stay tuned.");
    });
  }
}

function createRipple(event, element) {
  const ripple = document.createElement("span");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(245, 175, 175, 0.4);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        z-index: 1;
    `;

  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

function showNotification(message) {
  // Check if notification already exists
  if (document.querySelector(".notification-toast")) return;

  const toast = document.createElement("div");
  toast.className = "notification-toast";
  toast.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>${message}</span>
    `;

  toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: linear-gradient(135deg, #456882, #92487A);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.95rem;
        z-index: 1000;
        animation: slideUp 0.4s ease-out forwards;
    `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideDown 0.4s ease-out forwards";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ==================== SMOOTH ANIMATIONS ====================
function initSmoothAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, observerOptions);

  // Observe animated elements
  document.querySelectorAll(".intro-card, .stat-card").forEach((el) => {
    observer.observe(el);
  });
}

// ==================== CHECK IMAGES ====================
function checkImages() {
  const coverImg = document.querySelector(".cover-img");
  const profileImg = document.querySelector(".profile-img");

  // Handle cover image error
  coverImg.addEventListener("error", function () {
    this.style.display = "none";
  });

  // Handle profile image error
  profileImg.addEventListener("error", function () {
    // Create placeholder with initials
    const placeholder = document.createElement("div");
    placeholder.style.cssText = `
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #456882, #92487A);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2.5rem;
            font-weight: 700;
            font-family: 'Space Grotesk', sans-serif;
        `;
    placeholder.textContent = "DR";

    this.style.display = "none";
    this.parentElement.appendChild(placeholder);
  });
}

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-navigation");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation");
});

// ==================== SCROLL TO TOP ====================
let scrollTimeout;
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (window.scrollY > 500) {
      showScrollToTop();
    } else {
      hideScrollToTop();
    }
  }, 100);
});

function showScrollToTop() {
  let scrollBtn = document.querySelector(".scroll-to-top");

  if (!scrollBtn) {
    scrollBtn = document.createElement("button");
    scrollBtn.className = "scroll-to-top";
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute("aria-label", "Scroll to top");

    scrollBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: linear-gradient(135deg, #456882, #92487A);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.3s ease;
            z-index: 1000;
        `;

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    document.body.appendChild(scrollBtn);
  }

  setTimeout(() => {
    scrollBtn.style.opacity = "1";
    scrollBtn.style.transform = "scale(1)";
  }, 100);
}

function hideScrollToTop() {
  const scrollBtn = document.querySelector(".scroll-to-top");
  if (scrollBtn) {
    scrollBtn.style.opacity = "0";
    scrollBtn.style.transform = "scale(0.8)";
  }
}

// ==================== ANIMATIONS STYLESHEET ====================
const animationStyles = document.createElement("style");
animationStyles.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    @keyframes slideUp {
        to {
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes slideDown {
        to {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
    }

    .keyboard-navigation *:focus {
        outline: 3px solid #F5AFAF;
        outline-offset: 2px;
    }

    .scroll-to-top:hover {
        transform: scale(1.1) !important;
    }

    .scroll-to-top:active {
        transform: scale(0.95) !important;
    }
`;
document.head.appendChild(animationStyles);

// ==================== PERFORMANCE ====================
// Debounce function
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

// Handle window resize
window.addEventListener(
  "resize",
  debounce(() => {
    // Reset transforms on resize
    document.querySelectorAll(".platform-icon").forEach((icon) => {
      icon.style.transform = "";
    });
  }, 250)
);

// ==================== PAGE VISIBILITY ====================
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations when page is hidden
    document.body.style.animationPlayState = "paused";
  } else {
    document.body.style.animationPlayState = "running";
  }
});

// ==================== CONSOLE MESSAGE ====================
console.log(
  "%c🌐 Digital Connection Hub",
  "font-size: 18px; font-weight: bold; color: #456882;"
);
console.log(
  "%c✨ Built with care by Dar Rehan Rasool",
  "font-size: 12px; color: #92487A;"
);

// ==================== SERVICE WORKER (Optional) ====================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment to enable service worker for PWA
    // navigator.serviceWorker.register('/sw.js')
    //     .then(reg => console.log('Service Worker registered'))
    //     .catch(err => console.log('Service Worker registration failed'));
  });
}
