// Voice Explanation System (Refined)

class VoiceGuide {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.selectedVoice = null;
    this.isSpeaking = false;
    this.queue = [];

    // Platform descriptions
    this.descriptions = {
      youtube: "YouTube channel featuring technology tutorials and content.",
      github: "GitHub profile with code repositories and development projects.",
      linkedin: "LinkedIn professional networking profile.",
      peerlist: "Peerlist professional community and opportunities platform.",
      orcid: "ORCID research profile and academic identifier.",
      bluesky: "Bluesky decentralized social networking platform.",
      mastodon: "Mastodon federated social network instance.",
      twitter: "X, formerly Twitter, microblogging platform.",
      threads: "Threads text-based social network by Meta.",
      instagram: "Instagram visual content platform.",
      facebook: "Facebook social networking profile.",
      blog: "Personal blog for articles and thoughts.",
    };

    this.init();
  }

  // Initialize voice synthesis
  init() {
    // Load available voices
    const loadVoices = () => {
      this.voices = this.synth.getVoices();

      // Select a natural-sounding voice
      this.selectedVoice =
        this.voices.find(
          (voice) =>
            voice.lang.startsWith("en") && voice.name.includes("Natural")
        ) ||
        this.voices.find((voice) => voice.lang.startsWith("en")) ||
        this.voices[0];

      console.log(
        "Voice guide initialized with:",
        this.selectedVoice?.name || "default"
      );
    };

    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }

  // Speak text
  speak(text, priority = "normal") {
    if (!this.synth || !text || !window.voiceEnabled) return;

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);

    // Configure voice
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    // Configure speech properties
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    // Set language
    utterance.lang = "en-US";

    // Event handlers
    utterance.onstart = () => {
      this.isSpeaking = true;
      this.updateStatus("Speaking");
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.updateStatus("Ready");
      this.processQueue();
    };

    utterance.onerror = (e) => {
      console.error("Speech error:", e);
      this.isSpeaking = false;
      this.updateStatus("Error");
      this.processQueue();
    };

    // Handle based on priority
    if (priority === "high" || !this.isSpeaking) {
      if (this.isSpeaking) this.synth.cancel();
      this.synth.speak(utterance);
    } else {
      this.queue.push(utterance);
    }
  }

  // Process speech queue
  processQueue() {
    if (this.queue.length > 0 && !this.isSpeaking) {
      const next = this.queue.shift();
      this.synth.speak(next);
    }
  }

  // Update status display
  updateStatus(status) {
    const statusElement = document.getElementById("voice-status-text");
    if (!statusElement) return;

    statusElement.textContent = status;

    // Update color based on status
    switch (status) {
      case "Ready":
        statusElement.style.color = "#60a5fa";
        break;
      case "Speaking":
        statusElement.style.color = "#fbbf24";
        break;
      case "Error":
        statusElement.style.color = "#ef4444";
        break;
      default:
        statusElement.style.color = "#60a5fa";
    }
  }

  // Welcome message
  welcome() {
    const messages = [
      "Welcome to Dar Rehan Rasool's digital connection hub.",
      "Explore my presence across the digital landscape.",
      "Connect with me through various social platforms.",
      "Navigate through my digital ecosystem.",
    ];

    const message = messages[Math.floor(Math.random() * messages.length)];
    this.speak(message, "high");
  }

  // Describe platform
  describe(platform) {
    const description = this.descriptions[platform];
    if (description) {
      this.speak(`Opening ${platform}. ${description}`, "normal");
    }
  }

  // Stop speaking
  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.queue = [];
      this.updateStatus("Stopped");
    }
  }

  // Check support
  isSupported() {
    return "speechSynthesis" in window;
  }
}

// Initialize voice guide
document.addEventListener("DOMContentLoaded", function () {
  const voiceGuide = new VoiceGuide();

  // Check support
  if (!voiceGuide.isSupported()) {
    console.warn("Speech synthesis not supported");
    const statusElement = document.getElementById("voice-status-text");
    if (statusElement) {
      statusElement.textContent = "Not Supported";
      statusElement.style.color = "#94a3b8";
    }
    const voiceBtn = document.getElementById("voice-toggle");
    if (voiceBtn) {
      voiceBtn.disabled = true;
      voiceBtn.innerHTML = '<i class="fas fa-headset-slash"></i>';
    }
    return;
  }

  // Set up platform hover descriptions
  const socialCards = document.querySelectorAll(".social-link-card");

  socialCards.forEach((card) => {
    const platform = card.dataset.platform;

    // Add hover for description
    let hoverTimer;
    card.addEventListener("mouseenter", () => {
      if (!window.voiceEnabled) return;

      hoverTimer = setTimeout(() => {
        voiceGuide.describe(platform);
      }, 1000);
    });

    card.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimer);
    });

    // Click feedback
    card.addEventListener("click", () => {
      if (window.voiceEnabled) {
        setTimeout(() => {
          voiceGuide.speak(`Opening ${platform}`, "normal");
        }, 300);
      }
    });
  });

  // Voice toggle functionality
  const voiceToggle = document.getElementById("voice-toggle");
  if (voiceToggle) {
    voiceToggle.addEventListener("click", () => {
      if (window.voiceEnabled) {
        voiceGuide.welcome();
      }
    });
  }

  // Global voice enabled state
  window.voiceEnabled = true;
  window.voiceGuide = voiceGuide;

  // Auto welcome after delay
  setTimeout(() => {
    if (window.voiceEnabled) {
      voiceGuide.welcome();
    }
  }, 2500);

  // Handle page visibility changes
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && voiceGuide.isSpeaking) {
      voiceGuide.stop();
    }
  });
});
