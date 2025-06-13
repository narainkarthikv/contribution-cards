import { jest } from "@jest/globals";
import "../js/index.js";

describe("index.js", () => {
  let container;
  
  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = `
      <div class="cards-grid"></div>
      <div class="cards-list"></div>
      <button id="grid"></button>
      <button id="list"></button>
    `;
    document.body.appendChild(container);

    global.fetch.mockReset();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("fetches and renders cards on load", async () => {
    const mockData = [{
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

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );

    // Trigger DOMContentLoaded
    const event = new Event("DOMContentLoaded");
    document.dispatchEvent(event);

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(global.fetch).toHaveBeenCalledWith("./data/users.json");
    expect(document.querySelector(".cards-grid").children.length).toBe(1);
  });

  test("switches between grid and list views", async () => {
    const mockData = [{
      name: "Test User",
      title: "Test Title",
      description: "Test Description",
      socialLinks: {},
      studyLinks: {},
      updatedOn: "June 13, 2025"
    }];

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );

    // Trigger DOMContentLoaded
    document.dispatchEvent(new Event("DOMContentLoaded"));
    await new Promise(resolve => setTimeout(resolve, 0));

    const listButton = document.getElementById("list");
    listButton.click();

    expect(localStorage.getItem("layout")).toBe("list");
    expect(document.querySelector(".cards-list").children.length).toBe(1);

    const gridButton = document.getElementById("grid");
    gridButton.click();

    expect(localStorage.getItem("layout")).toBe("grid");
    expect(document.querySelector(".cards-grid").children.length).toBe(1);
  });

  test("handles fetch errors gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "error");
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch failed"))
    );

    document.dispatchEvent(new Event("DOMContentLoaded"));
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching and rendering cards:",
      expect.any(Error)
    );
  });
});
