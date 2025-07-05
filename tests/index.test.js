import { jest } from '@jest/globals';
import '../js/index.js';

describe("Index", () => {
  let mockData;

  beforeEach(() => {
    mockData = [{
      name: "Test User",
      title: "Test Title",
      description: "Test Description",
      socialLinks: {
        GitHub: "https://github.com/test"
      },
      studyLinks: {
        FreeCodeCamp: "https://freecodecamp.org"
      },
      updatedOn: "June 13, 2025"
    }];

    // Setup DOM
    document.body.innerHTML = `
      <div class="cards-grid"></div>
      <div class="cards-list"></div>
      <button id="grid"></button>
      <button id="list"></button>
    `;

    // Initialize fetch mock
    global.fetch.mockClear();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe("Card Layout Management", () => {
    beforeEach(() => {
      // Mock successful data fetch
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockData)
        })
      );
    });

    test("renders cards in grid layout by default", async () => {
      document.dispatchEvent(new Event("DOMContentLoaded"));
      await new Promise(resolve => setTimeout(resolve, 0));
      
      expect(document.querySelector(".cards-grid").children.length).toBe(1);
      expect(document.querySelector(".cards-list").children.length).toBe(0);
      expect(localStorage.getItem("layout")).toBe("grid");
    });

    test("switches to list layout when list button clicked", async () => {
      document.dispatchEvent(new Event("DOMContentLoaded"));
      await new Promise(resolve => setTimeout(resolve, 0));
      
      const listButton = document.getElementById("list");
      listButton.click();

      expect(document.querySelector(".cards-list").children.length).toBe(1);
      expect(document.querySelector(".cards-grid").children.length).toBe(0);
      expect(localStorage.getItem("layout")).toBe("list");
    });

    test("persists layout preference", async () => {
      localStorage.setItem("layout", "list");
      document.dispatchEvent(new Event("DOMContentLoaded"));
      await new Promise(resolve => setTimeout(resolve, 0));
      
      expect(document.querySelector(".cards-list").children.length).toBe(1);
      expect(document.querySelector(".cards-grid").children.length).toBe(0);
    });
  });

  describe("Data Fetching and Processing", () => {
    test("normalizes social links case and format", async () => {
      const testData = [{
        name: "Test User",
        socialLinks: {
          github: "https://github.com/test",
          LINKEDIN: "https://linkedin.com/test"
        }
      }];

      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(testData)
        })
      );

      document.dispatchEvent(new Event("DOMContentLoaded"));
      await new Promise(resolve => setTimeout(resolve, 0));

      const card = document.querySelector(".cards-grid .cards");
      const links = card.querySelectorAll(".card-social-links a");
      expect(links[0].href).toBe("https://github.com/test");
      expect(links[1].href).toBe("https://linkedin.com/test");
    });

    test("handles missing or malformed data gracefully", async () => {
      const malformedData = [{
        name: "Test User"
        // Missing other fields
      }];

      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(malformedData)
        })
      );

      document.dispatchEvent(new Event("DOMContentLoaded"));
      await new Promise(resolve => setTimeout(resolve, 0));

      const card = document.querySelector(".cards-grid .cards");
      expect(card.querySelector(".card-title").textContent).toBe("Test User");
      expect(card.querySelector(".card-social-links")).toBeTruthy();
      expect(card.querySelector(".card-study-links")).toBeTruthy();
    });

    test("handles network errors gracefully", async () => {
      const consoleSpy = jest.spyOn(console, "error");
      global.fetch.mockImplementationOnce(() =>
        Promise.reject(new Error("Network error"))
      );

      document.dispatchEvent(new Event("DOMContentLoaded"));
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching and rendering cards:",
        expect.any(Error)
      );
    });

    test("handles malformed JSON response", async () => {
      const consoleSpy = jest.spyOn(console, "error");
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.reject(new Error("Invalid JSON"))
        })
      );

      document.dispatchEvent(new Event("DOMContentLoaded"));
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error fetching and rendering cards:",
        expect.any(Error)
      );
    });
  });

  describe("Event Handling", () => {
    beforeEach(() => {
      global.fetch.mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockData)
        })
      );
    });

    test("attaches grid button event listener correctly", async () => {
      document.dispatchEvent(new Event("DOMContentLoaded"));
      await new Promise(resolve => setTimeout(resolve, 0));

      const gridButton = document.getElementById("grid");
      gridButton.click();
      
      expect(document.querySelector(".cards-grid").children.length).toBe(1);
      expect(localStorage.getItem("layout")).toBe("grid");
    });

    test("attaches list button event listener correctly", async () => {
      document.dispatchEvent(new Event("DOMContentLoaded"));
      await new Promise(resolve => setTimeout(resolve, 0));

      const listButton = document.getElementById("list");
      listButton.click();
      
      expect(document.querySelector(".cards-list").children.length).toBe(1);
      expect(localStorage.getItem("layout")).toBe("list");
    });

    test("handles rapid layout switching", async () => {
      document.dispatchEvent(new Event("DOMContentLoaded"));
      await new Promise(resolve => setTimeout(resolve, 0));

      const gridButton = document.getElementById("grid");
      const listButton = document.getElementById("list");
      
      // Rapid switching
      for (let i = 0; i < 5; i++) {
        gridButton.click();
        listButton.click();
      }

      expect(localStorage.getItem("layout")).toBe("list");
      expect(document.querySelector(".cards-list").children.length).toBe(1);
    });
  });
});
