document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const searchInput = document.getElementById("searchInput");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIconSun = document.getElementById("themeIconSun");
  const themeIconMoon = document.getElementById("themeIconMoon");
  const cards = document.getElementsByClassName("cards");

  // Debounce utility with proper this binding
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Optimized card filtering using cached elements and avoiding unnecessary queries
  const filterCards = debounce(() => {
    const searchTerm = searchInput.value.toLowerCase();
    Array.from(cards).forEach((card) => {
      const title =
        card.querySelector(".card-title")?.textContent.toLowerCase() || "";
      card.style.display = title.includes(searchTerm) ? "" : "none";
    });
  }, 300);

  // Error-handled event listener
  if (searchInput) {
    searchInput.addEventListener("keyup", filterCards);
  } else {
    console.error("Search input element not found");
  }

  // Theme management
  function setTheme(isDark) {
    try {
      document.body.classList.toggle("dark-mode", isDark);
      themeIconSun.classList.toggle("hidden", isDark);
      themeIconMoon.classList.toggle("hidden", !isDark);

      // Apply theme styles efficiently
      if (isDark) {
        applyDarkModeStyles();
      } else {
        applyLightModeStyles();
      }

      localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  }

  // Optimized style application using classList
  function applyDarkModeStyles() {
    document.body.style.setProperty("--bg-color", "#121212");
    document.body.style.setProperty("--text-color", "#ffffff");
    Array.from(cards).forEach((card) => {
      card.style.setProperty("--card-bg", "#1e1e1e");
      card.style.setProperty("--card-border", "#3a3a3a");
    });
  }

  function applyLightModeStyles() {
    document.body.style.setProperty("--bg-color", "#ffffff");
    document.body.style.setProperty("--text-color", "#000000");
    Array.from(cards).forEach((card) => {
      card.style.setProperty("--card-bg", "#ffffff");
      card.style.setProperty("--card-border", "#e0e0e0");
    });
  }

  // Initialize theme
  const savedTheme = localStorage.getItem("darkMode");
  if (savedTheme === "enabled") {
    setTheme(true);
  }

  // Event listener with error handling
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDarkMode = document.body.classList.contains("dark-mode");
      setTheme(!isDarkMode);
    });
  } else {
    console.error("Theme toggle button not found");
  }
});
