import { debounce, setTheme, getSystemPrefersDark, getSavedTheme } from "./utils.js";

// main.js - Handles search and theme toggling
// Follows separation of concerns and frontend best practices

document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const searchInput = document.getElementById("searchInput");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIconSun = document.getElementById("themeIconSun");
  const themeIconMoon = document.getElementById("themeIconMoon");
  const cards = document.getElementsByClassName("cards");

  // Card filtering
  const filterCards = debounce(() => {
    const searchTerm = searchInput.value.toLowerCase();
    Array.from(cards).forEach((card) => {
      const title =
        card.querySelector(".card-title")?.textContent.toLowerCase() || "";
      card.style.display = title.includes(searchTerm) ? "" : "none";
    });
  }, 300);

  if (searchInput) {
    searchInput.addEventListener("keyup", filterCards);
  } else {
    console.error("Search input element not found");
  }

  // Theme management
  let savedTheme = getSavedTheme();
  let isDark = false;
  if (savedTheme === "enabled") {
    isDark = true;
  } else if (savedTheme === "disabled") {
    isDark = false;
  } else {
    isDark = getSystemPrefersDark();
  }
  setTheme(isDark, false);

  // Set correct icon visibility on load
  if (themeIconSun && themeIconMoon) {
    themeIconSun.classList.toggle("hidden", isDark);
    themeIconMoon.classList.toggle("hidden", !isDark);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDarkMode = document.body.classList.contains("dark-mode");
      setTheme(!isDarkMode);
    });
  } else {
    console.error("Theme toggle button not found");
  }
});
