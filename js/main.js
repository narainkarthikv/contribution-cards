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
  function updateThemeUI(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    if (themeIconSun && themeIconMoon) {
      themeIconSun.classList.toggle("hidden", isDark);
      themeIconMoon.classList.toggle("hidden", !isDark);
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
      themeToggleBtn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  function getSystemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function setTheme(isDark, persist = true) {
    try {
      updateThemeUI(isDark);
      if (persist) {
        localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
      }
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  }

  // Initialize theme
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("darkMode");
  } catch (e) {}
  let isDark = false;
  if (savedTheme === "enabled") {
    isDark = true;
  } else if (savedTheme === "disabled") {
    isDark = false;
  } else {
    isDark = getSystemPrefersDark();
  }
  setTheme(isDark, false);

  // Set correct icon visibility on load (no flash)
  if (themeIconSun && themeIconMoon) {
    themeIconSun.classList.toggle("hidden", isDark);
    themeIconMoon.classList.toggle("hidden", !isDark);
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
