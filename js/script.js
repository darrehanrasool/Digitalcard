// Main JavaScript for Elegant Social Card

document.addEventListener("DOMContentLoaded", function () {
  // Initialize elements
  const socialCards = document.querySelectorAll(".social-link-card");
  const welcomeText = document.getElementById("welcome-text");
  const voiceToggle = document.getElementById("voice-toggle");
  const voiceStatus = document.getElementById("voice-status-text");
  const welcomeAudio = document.getElementById("welcome-audio");
  const soundWave = document.querySelector(".sound-wave");

  // Welcome messages
  const welcomeMessages = [
    "Welcome to my digital hub. Connect with me across platforms.",
    "Explore my digital presence across the web.",
    "Connecting ideas and people through technology.",
    "Your gateway to my digital ecosystem.",
  ];

  let messageIndex = 0;
  let voiceEnabled = true;

  // Update welcome text
  function updateWelcomeText() {
    welcomeText.textContent = welcomeMessages[messageIndex];
    messageIndex = (messageIndex + 1) % welcomeMessages.length;

    // Animate text change
    welcomeText.style.opacity = "0";
    setTimeout(() => {
      welcomeText.style.transition = "opacity 0.5s ease";
      welcomeText.style.opacity = "1";
    }, 300);
  }

  // Initialize welcome text
  updateWelcomeText();

  // Change text every 10 seconds
  setInterval(updateWelcomeText, 10000);

  // Add ripple effect to social cards
  socialCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Create ripple
      const ripple = document.createElement("div");
      ripple.classList.add("ripple");

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;

      this.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Play subtle click sound
      if (voiceEnabled) {
        playSound("click");
      }
    });

    // Add hover effects
    card.addEventListener("mouseenter", function () {
      if (voiceEnabled) {
        playSound("hover");
      }

      // Add shimmer effect
      const shimmer = document.createElement("div");
      shimmer.classList.add("shimmer");
      this.appendChild(shimmer);

      // Remove shimmer after animation
      setTimeout(() => {
        if (shimmer.parentNode === this) {
          shimmer.remove();
        }
      }, 3000);
    });

    // Platform-specific effects
    const platform = card.dataset.platform;
    card.addEventListener("mouseenter", () => {
      // Platform color pulse
      card.style.boxShadow = `0 20px 40px ${getPlatformColor(platform, 0.2)}`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "";
    });
  });

  // Get platform color with opacity
  function getPlatformColor(platform, opacity = 1) {
    const colors = {
      youtube: `rgba(255, 0, 0, ${opacity})`,
      github: `rgba(110, 84, 148, ${opacity})`,
      linkedin: `rgba(0, 119, 181, ${opacity})`,
      peerlist: `rgba(0, 184, 148, ${opacity})`,
      orcid: `rgba(166, 206, 57, ${opacity})`,
      bluesky: `rgba(0, 133, 255, ${opacity})`,
      mastodon: `rgba(99, 100, 255, ${opacity})`,
      twitter: `rgba(0, 0, 0, ${opacity})`,
      threads: `rgba(0, 0, 0, ${opacity})`,
      instagram: `rgba(228, 64, 95, ${opacity})`,
      facebook: `rgba(24, 119, 242, ${opacity})`,
      blog: `rgba(245, 158, 11, ${opacity})`,
    };

    return colors[platform] || `rgba(59, 130, 246, ${opacity})`;
  }

  // Play sound effects
  function playSound(type) {
    if (!voiceEnabled) return;

    let sound;
    switch (type) {
      case "click":
        sound =
          "https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3";
        break;
      case "hover":
        sound =
          "https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3";
        break;
      default:
        return;
    }

    const audio = new Audio(sound);
    audio.volume = 0.2;
    audio.play().catch((e) => console.log("Audio play failed:", e));
  }

  // Voice toggle functionality
  voiceToggle.addEventListener("click", function () {
    voiceEnabled = !voiceEnabled;

    if (voiceEnabled) {
      voiceStatus.textContent = "Ready";
      voiceStatus.style.color = "#60a5fa";
      voiceToggle.innerHTML = '<i class="fas fa-headset"></i>';
      playWelcomeMessage();

      // Animate sound wave
      animateSoundWave(true);
    } else {
      voiceStatus.textContent = "Muted";
      voiceStatus.style.color = "#94a3b8";
      voiceToggle.innerHTML = '<i class="fas fa-headset-slash"></i>';
      welcomeAudio.pause();
      welcomeAudio.currentTime = 0;

      // Stop sound wave animation
      animateSoundWave(false);
    }
  });

  // Animate sound wave
  function animateSoundWave(animate) {
    const waveBars = soundWave.querySelectorAll("span");

    waveBars.forEach((bar) => {
      if (animate) {
        bar.style.animationPlayState = "running";
      } else {
        bar.style.animationPlayState = "paused";
      }
    });
  }

  // Play welcome message
  function playWelcomeMessage() {
    if (!voiceEnabled) return;

    voiceStatus.textContent = "Playing...";
    voiceStatus.style.color = "#fbbf24";

    welcomeAudio.play().catch((e) => {
      console.log("Auto-play prevented:", e);
      voiceStatus.textContent = "Click to play";
    });

    welcomeAudio.onended = function () {
      if (voiceEnabled) {
        voiceStatus.textContent = "Ready";
        voiceStatus.style.color = "#60a5fa";
      }
    };
  }

  // Auto-play welcome message
  setTimeout(() => {
    if (voiceEnabled) {
      playWelcomeMessage();
    }
  }, 2000);

  // Add parallax effect to background
  document.addEventListener("mousemove", function (e) {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    const blobs = document.querySelectorAll(".gradient-blob");
    blobs.forEach((blob, index) => {
      const speed = 0.3 + index * 0.1;
      blob.style.transform = `translate(${x * speed}px, ${y * speed}px) scale(${
        1 + speed * 0.1
      })`;
    });
  });

  // Initialize typing effect
  function initTypingEffect() {
    const text = "Building connections through technology";
    const typingElement = document.querySelector(".typing-text");
    const cursor = document.querySelector(".typing-cursor");

    typingElement.textContent = "";
    cursor.style.animation = "none";

    let charIndex = 0;
    function type() {
      if (charIndex < text.length) {
        typingElement.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
      } else {
        cursor.style.animation = "blink 1s infinite";
      }
    }

    setTimeout(type, 1500);
  }

  // Start typing effect
  initTypingEffect();

  // Animate stats
  function animateStats() {
    const statValues = document.querySelectorAll(".stat-value");

    statValues.forEach((stat) => {
      const originalValue = stat.textContent;

      if (!isNaN(parseInt(originalValue))) {
        // Animate number
        let count = 0;
        const target = parseInt(originalValue);
        const duration = 2000;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          stat.textContent = Math.floor(count) + "+";
        }, 16);
      }
    });
  }

  // Animate stats when in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".animated-stats");
  if (statsSection) {
    observer.observe(statsSection);
  }

  // Add keyboard navigation
  document.addEventListener("keydown", function (e) {
    // Space to toggle voice
    if (e.code === "Space") {
      e.preventDefault();
      voiceToggle.click();
    }

    // Escape to mute
    if (e.code === "Escape") {
      if (voiceEnabled) {
        voiceToggle.click();
      }
    }
  });

  // Make voice toggle focusable and accessible
  voiceToggle.setAttribute("tabindex", "0");
  voiceToggle.setAttribute("role", "button");
  voiceToggle.setAttribute("aria-pressed", voiceEnabled);

  voiceToggle.addEventListener("keydown", function (e) {
    if (e.code === "Enter" || e.code === "Space") {
      e.preventDefault();
      this.click();
    }
  });

  // Update aria-pressed attribute
  voiceToggle.addEventListener("click", function () {
    this.setAttribute("aria-pressed", voiceEnabled);
  });
});
