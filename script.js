// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  initTypingEffect();
  initParticleField();
  initSocialLinkAnimations();
  initStatCounters();
  initScrollAnimations();
  initCursorEffects();
  initCardTilt();
});

// ==================== TYPING EFFECT ====================
function initTypingEffect() {
  const texts = [
    "Building connections across platforms...",
    "Creating digital experiences...",
    "Innovating one project at a time...",
    "Connecting the digital world...",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typingText");
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentText.length) {
      speed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  type();
}

// ==================== PARTICLE FIELD ====================
function initParticleField() {
  const particleField = document.getElementById("particleField");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, 0.5);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: particleFloat ${duration}s ${delay}s infinite ease-in-out;
            box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
        `;

    particleField.appendChild(particle);
  }

  // Add particle float animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0);
                opacity: 0;
            }
            10%, 90% {
                opacity: 1;
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${
    Math.random() * 100 - 50
  }px);
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${
    Math.random() * 100 - 50
  }px);
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${
    Math.random() * 100 - 50
  }px);
            }
        }
    `;
  document.head.appendChild(style);
}

// ==================== SOCIAL LINK ANIMATIONS ====================
function initSocialLinkAnimations() {
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link, index) => {
    // Stagger animation on load
    link.style.opacity = "0";
    link.style.transform = "translateY(20px)";

    setTimeout(() => {
      link.style.transition = "all 0.5s ease";
      link.style.opacity = "1";
      link.style.transform = "translateY(0)";
    }, index * 50);

    // Click effect
    link.addEventListener("click", function (e) {
      if (this.classList.contains("coming-soon")) {
        e.preventDefault();
        createRipple(e, this);
        showComingSoonMessage(this);
      } else {
        createRipple(e, this);
      }
    });

    // Hover particles
    link.addEventListener("mouseenter", function () {
      createLinkParticles(this);
    });
  });
}

function createRipple(event, element) {
  const ripple = document.createElement("div");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        z-index: 10;
    `;

  element.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

function createLinkParticles(element) {
  const particles = element.querySelector(".link-particles");
  if (!particles) return;

  for (let i = 0; i < 5; i++) {
    const particle = document.createElement("div");
    const angle = (Math.PI * 2 * i) / 5;
    const velocity = 30;
    const x = Math.cos(angle) * velocity;
    const y = Math.sin(angle) * velocity;

    particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary);
            border-radius: 50%;
            left: 50%;
            top: 50%;
            pointer-events: none;
            animation: particleExplode 1s ease-out forwards;
            --tx: ${x}px;
            --ty: ${y}px;
        `;

    particles.appendChild(particle);

    setTimeout(() => particle.remove(), 1000);
  }
}

function showComingSoonMessage(element) {
  const message = document.createElement("div");
  message.textContent = "🚀 Coming Soon!";
  message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        padding: 1.5rem 3rem;
        border-radius: 15px;
        font-size: 1.5rem;
        font-weight: 700;
        z-index: 1000;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        animation: popIn 0.5s ease-out forwards;
    `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.style.animation = "popOut 0.5s ease-out forwards";
    setTimeout(() => message.remove(), 500);
  }, 2000);
}

// ==================== STAT COUNTERS ====================
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.dataset.target);

        if (targetValue) {
          animateCounter(target, targetValue);
        }

        observer.unobserve(target);
      }
    });
  }, observerOptions);

  statNumbers.forEach((stat) => observer.observe(stat));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 2000;
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

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".stat-item").forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.6s ease";
    observer.observe(item);
  });
}

// ==================== CURSOR EFFECTS ====================
function initCursorEffects() {
  let mouseX = 0;
  let mouseY = 0;
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    `;
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 10 + "px";
    cursor.style.top = mouseY - 10 + "px";
  });

  document.querySelectorAll(".social-link, .stat-item").forEach((elem) => {
    elem.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(2)";
      cursor.style.borderColor = "var(--secondary)";
    });

    elem.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
      cursor.style.borderColor = "var(--primary)";
    });
  });
}

// ==================== CARD TILT EFFECT ====================
function initCardTilt() {
  const card = document.querySelector(".digital-card");

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
}

// ==================== ANIMATIONS STYLESHEET ====================
const animationStyles = document.createElement("style");
animationStyles.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes particleExplode {
        to {
            transform: translate(var(--tx), var(--ty));
            opacity: 0;
        }
    }

    @keyframes popIn {
        to {
            transform: translate(-50%, -50%) scale(1);
        }
    }

    @keyframes popOut {
        to {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }

    .custom-cursor {
        display: none;
    }

    @media (min-width: 1024px) {
        .custom-cursor {
            display: block;
        }
        * {
            cursor: none !important;
        }
    }
`;
document.head.appendChild(animationStyles);

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
  document.body.classList.add("reduce-motion");
  const style = document.createElement("style");
  style.textContent = `
        .reduce-motion * {
            animation-duration: 0.5s !important;
            transition-duration: 0.2s !important;
        }
    `;
  document.head.appendChild(style);
}

// ==================== EASTER EGG ====================
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.join("") === konamiSequence.join("")) {
    activateEasterEgg();
  }
});

function activateEasterEgg() {
  const card = document.querySelector(".digital-card");
  card.style.animation = "rainbow 2s infinite";

  const style = document.createElement("style");
  style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
  document.head.appendChild(style);

  setTimeout(() => {
    card.style.animation = "";
    style.remove();
  }, 5000);
}

console.log(
  "%c✨ Digital Connection Hub ✨",
  "font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #6366f1, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
);
console.log(
  "%cBuilt with ❤️ by Dar Rehan Rasool",
  "font-size: 14px; color: #6366f1;"
);
