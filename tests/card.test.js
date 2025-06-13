import Card from "../js/card.js";

describe("Card", () => {
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

  test("renders card with correct data", () => {
    const card = new Card(mockData);
    const cardElement = card.render();

    expect(cardElement.querySelector(".card-title").textContent).toBe("Test User");
    expect(cardElement.querySelector(".card-subtitle").textContent).toBe("Test Title");
    expect(cardElement.querySelector(".card-text").textContent).toContain("Test Description");
  });

  test("renders social links correctly", () => {
    const card = new Card(mockData);
    const cardElement = card.render();
    const socialLinks = cardElement.querySelectorAll(".card-social-links a");

    expect(socialLinks).toHaveLength(2);
    expect(socialLinks[0].href).toBe("https://github.com/test");
    expect(socialLinks[1].href).toBe("https://linkedin.com/test");
  });

  test("renders study links correctly", () => {
    const card = new Card(mockData);
    const cardElement = card.render();
    const studyLinks = cardElement.querySelectorAll(".card-study-links a");

    expect(studyLinks).toHaveLength(1);
    expect(studyLinks[0].href).toBe("https://freecodecamp.org/");
    expect(studyLinks[0].textContent.trim()).toBe("FreeCodeCamp");
  });

  test("applies correct icon classes", () => {
    const card = new Card(mockData);
    const cardElement = card.render();
    const githubIcon = cardElement.querySelector(".card-social-links li:first-child i");
    
    expect(githubIcon.classList.contains("fab")).toBe(true);
    expect(githubIcon.classList.contains("fa-github")).toBe(true);
  });

  test("handles dark mode correctly", () => {
    document.body.classList.add("dark-mode");
    const card = new Card(mockData);
    const cardElement = card.render();

    expect(cardElement.classList.contains("bg-[#2d2d2d]")).toBe(true);
    expect(cardElement.classList.contains("border-[#4a4a4a]")).toBe(true);
  });
});
