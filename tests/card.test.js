import Card from "../js/card.js";

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
};

describe("Card Component", () => {
  let mockData;

  beforeEach(() => {
    mockData = {
      title: "Test User",
      subtitle: "Test Title",
      text: "Test Description",
      links: [
        { label: "GitHub", url: "https://github.com/test" },
        { label: "LinkedIn", url: "https://linkedin.com/test" }
      ],
      studyLinks: [
        { label: "FreeCodeCamp", url: "https://freecodecamp.org" }
      ],
      updatedAt: "June 13, 2025"
    };
    document.body.innerHTML = "";
  });

  describe("Basic Rendering", () => {
    test("renders card with correct data", () => {
      const card = new Card(mockData);
      const cardElement = card.render();

      expect(cardElement.querySelector(".card-title").textContent).toBe("Test User");
      expect(cardElement.querySelector(".card-subtitle").textContent).toBe("Test Title");
      expect(cardElement.querySelector(".card-text").textContent).toContain("Test Description");
      expect(cardElement.querySelector(".card-date").textContent).toContain("June 13, 2025");
    });

    test("applies correct Tailwind classes", () => {
      const card = new Card(mockData);
      const cardElement = card.render();

      expect(cardElement.classList.contains("w-full")).toBe(true);
      expect(cardElement.classList.contains("h-[500px]")).toBe(true);
      expect(cardElement.classList.contains("shadow-lg")).toBe(true);
      expect(cardElement.classList.contains("transition-transform")).toBe(true);
    });
  });

  describe("Social Links", () => {
    test("renders social links correctly", () => {
      const card = new Card(mockData);
      const cardElement = card.render();
      const socialLinks = cardElement.querySelectorAll(".card-social-links a");

      expect(socialLinks).toHaveLength(2);
      expect(socialLinks[0].href).toBe("https://github.com/test");
      expect(socialLinks[1].href).toBe("https://linkedin.com/test");
    });

    test("handles empty social links", () => {
      const emptyData = { ...mockData, links: [] };
      const card = new Card(emptyData);
      const cardElement = card.render();
      
      const socialLinks = cardElement.querySelectorAll(".card-social-links a");
      expect(socialLinks).toHaveLength(0);
    });

    test("applies correct icon classes for each platform", () => {
      const platformData = {
        ...mockData,
        links: [
          { label: "GitHub", url: "https://github.com" },
          { label: "LinkedIn", url: "https://linkedin.com" },
          { label: "Twitter", url: "https://twitter.com" },
          { label: "Website", url: "https://example.com" },
          { label: "Unknown", url: "https://unknown.com" }
        ]
      };
      const card = new Card(platformData);
      const cardElement = card.render();
      const icons = cardElement.querySelectorAll(".card-social-links i");

      expect(icons[0].classList.contains("fa-github")).toBe(true);
      expect(icons[1].classList.contains("fa-linkedin")).toBe(true);
      expect(icons[2].classList.contains("fa-twitter")).toBe(true);
      expect(icons[3].classList.contains("fa-globe")).toBe(true);
      expect(icons[4].classList.contains("fa-link")).toBe(true);
    });
  });

  describe("Study Links", () => {
    test("renders study links correctly", () => {
      const card = new Card(mockData);
      const cardElement = card.render();
      const studyLinks = cardElement.querySelectorAll(".card-study-links a");

      expect(studyLinks).toHaveLength(1);
      expect(studyLinks[0].href).toBe("https://freecodecamp.org/");
      expect(studyLinks[0].textContent.trim()).toBe("FreeCodeCamp");
    });

    test("handles empty study links", () => {
      const emptyData = { ...mockData, studyLinks: [] };
      const card = new Card(emptyData);
      const cardElement = card.render();
      
      const studyLinks = cardElement.querySelectorAll(".card-study-links a");
      expect(studyLinks).toHaveLength(0);
    });

    test("handles special case study links", () => {
      const specialData = {
        ...mockData,
        studyLinks: [
          { label: "freeCodeCamp", url: "https://freecodecamp.org" },
          { label: "w3schools", url: "https://w3schools.com" }
        ]
      };
      const card = new Card(specialData);
      const cardElement = card.render();
      const studyLinks = cardElement.querySelectorAll(".card-study-links a");

      studyLinks.forEach(link => {
        expect(link.classList.contains("text-black")).toBe(true);
      });
    });
  });

  describe("Theme Handling", () => {
    test("applies correct light mode styles", () => {
      document.body.classList.remove("dark-mode");
      const card = new Card(mockData);
      const cardElement = card.render();

      expect(cardElement.classList.contains("bg-white")).toBe(true);
      expect(cardElement.classList.contains("border-[#d1d5db]")).toBe(true);
      expect(cardElement.style.backgroundColor).toBe(hexToRgb("#ffffff"));
    });

    test("applies correct dark mode styles", () => {
      document.body.classList.add("dark-mode");
      const card = new Card(mockData);
      const cardElement = card.render();

      expect(cardElement.classList.contains("bg-[#2d2d2d]")).toBe(true);
      expect(cardElement.classList.contains("border-[#4a4a4a]")).toBe(true);
      expect(cardElement.style.backgroundColor).toBe(hexToRgb("#2d2d2d"));
    });

    test("handles theme change hover effects", () => {
      const card = new Card(mockData);
      const cardElement = card.render();

      // Simulate hover in light mode
      cardElement.dispatchEvent(new Event("mouseenter"));
      expect(cardElement.style.backgroundColor).toBe(hexToRgb("#f3f4f6"));

      // Simulate hover in dark mode
      document.body.classList.add("dark-mode");
      cardElement.dispatchEvent(new Event("mouseenter"));
      expect(cardElement.style.backgroundColor).toBe(hexToRgb("#3a3a3a"));
    });
  });

  describe("Accessibility", () => {
    test("ensures links have accessible names", () => {
      const card = new Card(mockData);
      const cardElement = card.render();
      const links = cardElement.querySelectorAll("a");

      links.forEach(link => {
        expect(link.getAttribute("aria-label") || link.textContent).toBeTruthy();
      });
    });

    test("ensures proper heading hierarchy", () => {
      const card = new Card(mockData);
      const cardElement = card.render();
      
      const title = cardElement.querySelector(".card-title");
      const subtitle = cardElement.querySelector(".card-subtitle");
      
      expect(title.tagName).toBe("H5");
      expect(subtitle.tagName).toBe("H6");
    });
  });

  describe("Edge Cases", () => {
    test("handles missing data gracefully", () => {
      const incompleteData = {
        title: "Test User"
      };
      const card = new Card(incompleteData);
      const cardElement = card.render();

      expect(cardElement.querySelector(".card-title").textContent).toBe("Test User");
      expect(cardElement.querySelector(".card-subtitle")).toBeFalsy();
      expect(cardElement.querySelector(".card-social-links")).toBeTruthy();
      expect(cardElement.querySelector(".card-study-links")).toBeTruthy();
    });

    test("handles extremely long content", () => {
      const longData = {
        ...mockData,
        title: "A".repeat(100),
        text: "B".repeat(1000)
      };
      const card = new Card(longData);
      const cardElement = card.render();

      expect(cardElement.querySelector(".card-title").textContent.length).toBe(100);
      expect(cardElement.querySelector(".card-text").textContent.length).toBe(1000);
    });

    test("handles special characters in content", () => {
      const specialData = {
        ...mockData,
        title: "<script>alert('xss')</script>",
        text: "Special chars: <>\"'&"
      };
      const card = new Card(specialData);
      const cardElement = card.render();

      const titleHtml = cardElement.querySelector(".card-title").innerHTML;
      expect(titleHtml).not.toContain("<script>");
      expect(titleHtml).toEqual(expect.stringContaining("&lt;script&gt;"));
    });
  });
});
