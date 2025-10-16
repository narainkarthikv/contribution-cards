// main.js - Handles search and theme toggling
// Clean, modular, and consistent with index.js best practices

import {
  debounce,
  setTheme,
  getSystemPrefersDark,
  getSavedTheme,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Cache ---
  const searchInput = document.getElementById("searchInput");
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const themeIconSun = document.getElementById("themeIconSun");
  const themeIconMoon = document.getElementById("themeIconMoon");
  const cards = document.getElementsByClassName("cards");

  // --- Search Filtering ---
  const filterCards = debounce(() => {
    const searchTerm = searchInput?.value.trim().toLowerCase() || "";
    Array.from(cards).forEach((card) => {
      const title =
        card.querySelector(".card-title")?.textContent.toLowerCase() || "";
      card.style.display = title.includes(searchTerm) ? "" : "none";
    });
  }, 300);

  if (searchInput) {
    searchInput.addEventListener("input", filterCards);
  } else {
    console.warn("⚠️ Search input element not found.");
  }

  // --- Theme Handling ---
  const savedTheme = getSavedTheme();
  let isDark =
    savedTheme === "enabled"
      ? true
      : savedTheme === "disabled"
      ? false
      : getSystemPrefersDark();

  setTheme(isDark, false);

  // Set initial icon visibility
  if (themeIconSun && themeIconMoon) {
    themeIconSun.classList.toggle("hidden", isDark);
    themeIconMoon.classList.toggle("hidden", !isDark);
  }

  // Toggle theme on button click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentlyDark = document.body.classList.contains("dark-mode");
      setTheme(!currentlyDark);
    });
  } else {
    console.warn("⚠️ Theme toggle button not found.");
  }
});
