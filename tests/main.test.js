import { jest } from '@jest/globals';

// Import main.js content as a string
const mainJs = `
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
      const title = card.querySelector(".card-title")?.textContent.toLowerCase() || "";
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
`;

describe("Main Application", () => {
  let container;

  beforeEach(() => {
    // Setup fake timers
    jest.useFakeTimers();

    // Setup DOM
    container = document.createElement("div");
    container.innerHTML = `
      <div class="container">
        <input id="searchInput" type="text" placeholder="Search" aria-label="Search for cards" />
        <button id="themeToggleBtn" aria-label="Toggle theme">
          <img id="themeIconSun" src="./assets/public/sun.png" alt="Light mode" />
          <img id="themeIconMoon" src="./assets/public/moon.png" alt="Dark mode" class="hidden" />
        </button>
        <div class="cards-container">
          <div class="cards">
            <h5 class="card-title">Test Card 1</h5>
            <p class="card-text">Test content 1</p>
          </div>
          <div class="cards">
            <h5 class="card-title">Test Card 2</h5>
            <p class="card-text">Test content 2</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    // Create a new script element and execute main.js
    const script = document.createElement('script');
    script.textContent = mainJs;
    document.body.appendChild(script);

    // Trigger DOMContentLoaded
    document.dispatchEvent(new Event("DOMContentLoaded"));
  });

  afterEach(() => {
    // Cleanup
    document.body.innerHTML = '';
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
    localStorage.clear();
  });

  describe("Search Functionality", () => {
    test("filters multiple cards correctly", () => {
      const searchInput = document.getElementById("searchInput");
      searchInput.value = "Test";
      searchInput.dispatchEvent(new Event("keyup"));
      
      jest.runAllTimers();
      
      const cards = document.querySelectorAll(".cards");
      expect(cards[0].style.display).toBe("");
      expect(cards[1].style.display).toBe("");
    });

    test("shows no cards when no matches found", () => {
      const searchInput = document.getElementById("searchInput");
      searchInput.value = "Nonexistent";
      searchInput.dispatchEvent(new Event("keyup"));
      
      jest.runAllTimers();
      
      const cards = document.querySelectorAll(".cards");
      expect(cards[0].style.display).toBe("none");
      expect(cards[1].style.display).toBe("none");
    });

    test("handles null or undefined card titles", () => {
      const card = document.querySelector(".cards");
      card.querySelector(".card-title").remove();
      
      const searchInput = document.getElementById("searchInput");
      searchInput.value = "Test";
      searchInput.dispatchEvent(new Event("keyup"));
      
      jest.runAllTimers();
      
      expect(card.style.display).toBe("none");
    });

    test("debounces search input with multiple rapid changes", () => {
      const searchInput = document.getElementById("searchInput");
      const searchValues = ["T", "Te", "Tes", "Test", "Tests"];
      
      searchValues.forEach((value, index) => {
        searchInput.value = value;
        searchInput.dispatchEvent(new Event("keyup"));
        jest.advanceTimersByTime(100);
        
        if (index < searchValues.length - 1) {
          const cards = document.querySelectorAll(".cards");
          cards.forEach(card => {
            // Should not have updated display yet due to debounce
            expect(card.style.display).toBe("");
          });
        }
      });
      
      jest.runAllTimers();
      
      const cards = document.querySelectorAll(".cards");
      cards.forEach(card => {
        expect(card.style.display).toBe("");
      });
    });
  });

  describe("Theme Management", () => {
    test("applies dark theme CSS variables correctly", () => {
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      themeToggleBtn.click();

      expect(document.body.style.getPropertyValue("--bg-color")).toBe("#121212");
      expect(document.body.style.getPropertyValue("--text-color")).toBe("#ffffff");
      
      const cards = document.querySelectorAll(".cards");
      cards.forEach(card => {
        expect(card.style.getPropertyValue("--card-bg")).toBe("#1e1e1e");
        expect(card.style.getPropertyValue("--card-border")).toBe("#3a3a3a");
      });
    });

    test("applies light theme CSS variables correctly", () => {
      document.body.classList.add("dark-mode");
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      themeToggleBtn.click();

      expect(document.body.style.getPropertyValue("--bg-color")).toBe("#ffffff");
      expect(document.body.style.getPropertyValue("--text-color")).toBe("#000000");
      
      const cards = document.querySelectorAll(".cards");
      cards.forEach(card => {
        expect(card.style.getPropertyValue("--card-bg")).toBe("#ffffff");
        expect(card.style.getPropertyValue("--card-border")).toBe("#e0e0e0");
      });
    });

    test("handles rapid theme switching", () => {
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      const iterations = 5;
      
      for (let i = 0; i < iterations; i++) {
        themeToggleBtn.click();
      }

      // After odd number of clicks, should be in dark mode
      expect(document.body.classList.contains("dark-mode")).toBe(true);
      expect(localStorage.getItem("darkMode")).toBe("enabled");
    });

    test("persists theme across multiple DOMContentLoaded events", () => {
      localStorage.setItem("darkMode", "enabled");
      
      // Simulate multiple page loads
      for (let i = 0; i < 3; i++) {
        document.dispatchEvent(new Event("DOMContentLoaded"));
        expect(document.body.classList.contains("dark-mode")).toBe(true);
      }
    });
  });

  describe("Error Handling and Edge Cases", () => {
    test("handles missing search input element", () => {
      const consoleSpy = jest.spyOn(console, "error");
      document.getElementById("searchInput").remove();
      
      document.dispatchEvent(new Event("DOMContentLoaded"));
      expect(consoleSpy).toHaveBeenCalledWith("Search input element not found");
    });

    test("handles missing theme toggle button", () => {
      const consoleSpy = jest.spyOn(console, "error");
      document.getElementById("themeToggleBtn").remove();
      
      document.dispatchEvent(new Event("DOMContentLoaded"));
      expect(consoleSpy).toHaveBeenCalledWith("Theme toggle button not found");
    });

    test("handles localStorage access errors", () => {
      const consoleSpy = jest.spyOn(console, "error");
      const mockError = new Error("localStorage error");
      
      Storage.prototype.setItem = jest.fn().mockImplementation(() => {
        throw mockError;
      });
      
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      themeToggleBtn.click();
      
      expect(consoleSpy).toHaveBeenCalledWith("Error setting theme:", mockError);
    });

    test("handles missing theme icons", () => {
      document.getElementById("themeIconSun").remove();
      document.getElementById("themeIconMoon").remove();
      
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      expect(() => themeToggleBtn.click()).not.toThrow();
    });
  });

  describe("Performance and Optimization", () => {
    test("debounce function limits execution rate", () => {
      const searchInput = document.getElementById("searchInput");
      const callCount = 10;
      
      // Simulate rapid typing
      for (let i = 0; i < callCount; i++) {
        searchInput.value = `Test ${i}`;
        searchInput.dispatchEvent(new Event("keyup"));
        jest.advanceTimersByTime(100);
      }
      
      // Only the last value should be processed
      jest.runAllTimers();
      
      const cards = document.querySelectorAll(".cards");
      cards.forEach(card => {
        expect(card.style.display).toBe("none");
      });
    });

    test("applies CSS variables efficiently", () => {
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      const cards = document.querySelectorAll(".cards");
      const startTime = performance.now();
      
      // Toggle theme multiple times
      for (let i = 0; i < 10; i++) {
        themeToggleBtn.click();
      }
      
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // Execution time should be reasonable (adjust threshold as needed)
      expect(executionTime).toBeLessThan(100);
    });
  });

  describe("Search Performance", () => {
    test("debounces search function", () => {
      const searchInput = document.getElementById("searchInput");
      const searchCallback = jest.fn();
      document.addEventListener("keyup", searchCallback);

      // Simulate rapid typing
      for (let i = 0; i < 5; i++) {
        searchInput.value = `test ${i}`;
        searchInput.dispatchEvent(new Event("keyup"));
      }

      // Before debounce timeout
      expect(searchCallback).toHaveBeenCalledTimes(5);
      
      // After debounce timeout
      jest.runAllTimers();
      const cards = document.querySelectorAll(".cards");
      expect(cards[0].style.display).toBe("none");
      expect(cards[1].style.display).toBe("none");
    });

    test("handles large number of cards efficiently", () => {
      // Add many cards
      const cardsContainer = document.querySelector(".cards-container");
      for (let i = 0; i < 100; i++) {
        const card = document.createElement("div");
        card.className = "cards";
        card.innerHTML = `
          <h5 class="card-title">Test Card ${i}</h5>
          <p class="card-text">Content ${i}</p>
        `;
        cardsContainer.appendChild(card);
      }

      const searchInput = document.getElementById("searchInput");
      const startTime = performance.now();

      // Search through all cards
      searchInput.value = "Test";
      searchInput.dispatchEvent(new Event("keyup"));
      jest.runAllTimers();

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100); // Should be fast
    });
  });

  describe("Accessibility and UI States", () => {
    test("maintains focus state after theme toggle", () => {
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      const searchInput = document.getElementById("searchInput");
      
      searchInput.focus();
      themeToggleBtn.click();
      
      expect(document.activeElement).toBe(searchInput);
    });

    test("handles keyboard navigation", () => {
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      
      themeToggleBtn.focus();
      themeToggleBtn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      
      expect(document.body.classList.contains("dark-mode")).toBe(true);
    });

    test("maintains ARIA attributes after theme change", () => {
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      const searchInput = document.getElementById("searchInput");
      
      themeToggleBtn.click();
      
      expect(themeToggleBtn.getAttribute("aria-label")).toBe("Toggle theme");
      expect(searchInput.getAttribute("aria-label")).toBe("Search for cards");
    });
  });

  describe("Theme System Edge Cases", () => {
    test("handles theme transition interruption", () => {
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      
      // Rapid theme toggles
      for (let i = 0; i < 10; i++) {
        themeToggleBtn.click();
      }
      
      const isDarkMode = document.body.classList.contains("dark-mode");
      const storedTheme = localStorage.getItem("darkMode");
      expect(storedTheme === "enabled").toBe(isDarkMode);
    });

    test("maintains theme across multiple events", () => {
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      
      // Set dark mode
      themeToggleBtn.click();
      expect(document.body.classList.contains("dark-mode")).toBe(true);
      
      // Simulate page events
      document.dispatchEvent(new Event("DOMContentLoaded"));
      window.dispatchEvent(new Event("load"));
      
      expect(document.body.classList.contains("dark-mode")).toBe(true);
    });
  });

  describe("Error Boundaries", () => {
    test("handles localStorage unavailability", () => {
      const consoleSpy = jest.spyOn(console, "error");
      
      // Mock localStorage to throw
      Object.defineProperty(window, 'localStorage', {
        get: () => { throw new Error('localStorage disabled'); }
      });
      
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      themeToggleBtn.click();
      
      expect(consoleSpy).toHaveBeenCalled();
      expect(document.body.classList.contains("dark-mode")).toBe(true);
    });

    test("handles missing DOM elements gracefully", () => {
      const consoleSpy = jest.spyOn(console, "error");
      
      // Remove required elements
      document.getElementById("searchInput").remove();
      document.getElementById("themeToggleBtn").remove();
      
      // Reinitialize
      document.dispatchEvent(new Event("DOMContentLoaded"));
      
      expect(consoleSpy).toHaveBeenCalledWith("Search input element not found");
      expect(consoleSpy).toHaveBeenCalledWith("Theme toggle button not found");
    });
  });

  describe("CSS Variable Management", () => {
    test("applies CSS variables correctly in light mode", () => {
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      const card = document.querySelector(".cards");
      
      themeToggleBtn.click(); // To dark mode
      themeToggleBtn.click(); // Back to light mode
      
      expect(document.body.style.getPropertyValue("--bg-color")).toBe("#ffffff");
      expect(card.style.getPropertyValue("--card-bg")).toBe("#ffffff");
    });

    test("transitions CSS variables smoothly", () => {
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      const startTime = performance.now();
      
      themeToggleBtn.click();
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(50); // Should be fast
    });
  });
});
