import "../js/main.js";

describe("main.js", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = `
      <input id="searchInput" type="text" />
      <button id="themeToggleBtn">
        <img id="themeIconSun" src="" />
        <img id="themeIconMoon" src="" class="hidden" />
      </button>
      <div class="cards">
        <h5 class="card-title">Test Card</h5>
        <p class="card-text">Test content</p>
      </div>
    `;
    document.body.appendChild(container);
    
    // Trigger DOMContentLoaded
    document.dispatchEvent(new Event("DOMContentLoaded"));
  });

  afterEach(() => {
    document.body.innerHTML = "";
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("Search functionality", () => {
    test("filters cards correctly", () => {
      const searchInput = document.getElementById("searchInput");
      searchInput.value = "Test";
      searchInput.dispatchEvent(new Event("keyup"));
      
      // Wait for debounce
      jest.advanceTimersByTime(300);
      
      const cards = document.querySelectorAll(".cards");
      expect(cards[0].style.display).toBe("");
      
      // Test non-matching search
      searchInput.value = "NonExistent";
      searchInput.dispatchEvent(new Event("keyup"));
      jest.advanceTimersByTime(300);
      expect(cards[0].style.display).toBe("none");
    });

    test("is case insensitive", () => {
      const searchInput = document.getElementById("searchInput");
      searchInput.value = "test";
      searchInput.dispatchEvent(new Event("keyup"));
      
      jest.advanceTimersByTime(300);
      
      const cards = document.querySelectorAll(".cards");
      expect(cards[0].style.display).toBe("");
    });
  });

  describe("Theme toggle", () => {
    test("switches between light and dark mode", () => {
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      const themeIconSun = document.getElementById("themeIconSun");
      const themeIconMoon = document.getElementById("themeIconMoon");

      // Initial state (light mode)
      expect(document.body.classList.contains("dark-mode")).toBeFalsy();
      expect(themeIconSun.classList.contains("hidden")).toBeFalsy();
      expect(themeIconMoon.classList.contains("hidden")).toBeTruthy();

      // Toggle to dark mode
      themeToggleBtn.click();
      expect(document.body.classList.contains("dark-mode")).toBeTruthy();
      expect(themeIconSun.classList.contains("hidden")).toBeTruthy();
      expect(themeIconMoon.classList.contains("hidden")).toBeFalsy();

      // Toggle back to light mode
      themeToggleBtn.click();
      expect(document.body.classList.contains("dark-mode")).toBeFalsy();
      expect(themeIconSun.classList.contains("hidden")).toBeFalsy();
      expect(themeIconMoon.classList.contains("hidden")).toBeTruthy();
    });

    test("persists theme preference in localStorage", () => {
      const themeToggleBtn = document.getElementById("themeToggleBtn");
      
      themeToggleBtn.click();
      expect(localStorage.getItem("darkMode")).toBe("enabled");
      
      themeToggleBtn.click();
      expect(localStorage.getItem("darkMode")).toBe("disabled");
    });
  });

  describe("Debounce functionality", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test("limits execution rate of search function", () => {
      const searchInput = document.getElementById("searchInput");
      
      // Trigger multiple keyup events rapidly
      for (let i = 0; i < 5; i++) {
        searchInput.value = "Test " + i;
        searchInput.dispatchEvent(new Event("keyup"));
      }

      // Only the last value should be used
      jest.runAllTimers();
      
      const cards = document.querySelectorAll(".cards");
      expect(cards[0].style.display).toBe("none"); // Because last value was "Test 4"
    });
  });

  test("toggles theme correctly", () => {
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const themeIconSun = document.getElementById("themeIconSun");
    const themeIconMoon = document.getElementById("themeIconMoon");

    // Initial state should be light mode
    expect(document.body.classList.contains("dark-mode")).toBe(false);
    expect(themeIconSun.classList.contains("hidden")).toBe(false);
    expect(themeIconMoon.classList.contains("hidden")).toBe(true);

    // Toggle to dark mode
    themeToggleBtn.click();
    expect(document.body.classList.contains("dark-mode")).toBe(true);
    expect(themeIconSun.classList.contains("hidden")).toBe(true);
    expect(themeIconMoon.classList.contains("hidden")).toBe(false);
    expect(localStorage.getItem("darkMode")).toBe("enabled");

    // Toggle back to light mode
    themeToggleBtn.click();
    expect(document.body.classList.contains("dark-mode")).toBe(false);
    expect(themeIconSun.classList.contains("hidden")).toBe(false);
    expect(themeIconMoon.classList.contains("hidden")).toBe(true);
    expect(localStorage.getItem("darkMode")).toBe("disabled");
  });

  test("applies correct theme styles", () => {
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const card = document.querySelector(".cards");
    const cardTitle = document.querySelector(".card-title");
    const cardText = document.querySelector(".card-text");

    // Toggle to dark mode
    themeToggleBtn.click();
    expect(document.body.style.backgroundColor).toBe("#121212");
    expect(document.body.style.color).toBe("#ffffff");
    expect(card.style.backgroundColor).toBe("#1e1e1e");
    expect(card.style.borderColor).toBe("#3a3a3a");
    expect(cardTitle.style.color).toBe("#e0e0e0");
    expect(cardText.style.color).toBe("#ccc");

    // Toggle to light mode
    themeToggleBtn.click();
    expect(document.body.style.backgroundColor).toBe("#f3f4f6");
    expect(document.body.style.color).toBe("#222");
    expect(card.style.backgroundColor).toBe("#f3f4f6");
    expect(card.style.borderColor).toBe("#e2e8f0");
    expect(cardTitle.style.color).toBe("#333");
    expect(cardText.style.color).toBe("#555");
  });
});
