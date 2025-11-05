// index.js - Handles card rendering, layout switching, and smoother UX transitions
// Enhanced version with subtle animations, loading states, and accessibility improvements

import Card from "./card.js";
import { debounce } from "./utils.js";

// Set active tab visual and aria state
function setActiveTab(tab) {
  const gridTab = document.getElementById("gridTab");
  const listTab = document.getElementById("listTab");
  if (!gridTab || !listTab) return;

  const activeClasses = ["bg-blue-600", "dark:bg-blue-500", "text-white"];
  const inactiveClasses = ["bg-gray-200", "dark:bg-gray-700", "text-gray-800", "dark:text-gray-200"];

  if (tab === "grid") {
    gridTab.classList.add(...activeClasses);
    gridTab.classList.remove(...inactiveClasses);
    gridTab.setAttribute("aria-pressed", "true");

    listTab.classList.remove(...activeClasses);
    listTab.classList.add(...inactiveClasses);
    listTab.setAttribute("aria-pressed", "false");
  } else {
    listTab.classList.add(...activeClasses);
    listTab.classList.remove(...inactiveClasses);
    listTab.setAttribute("aria-pressed", "true");

    gridTab.classList.remove(...activeClasses);
    gridTab.classList.add(...inactiveClasses);
    gridTab.setAttribute("aria-pressed", "false");
  }
}

// Shimmer loader while cards fetch
function showLoadingSkeleton(container, count = 6) {
  container.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className = "animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-[250px] w-full my-2";
    container.appendChild(skeleton);
  }
}

// Insert cards with fade-in and smooth transition
function insertCards(jsonData, container, layout) {
  const gridContainer = document.querySelector(".cards-grid");
  const listContainer = document.querySelector(".cards-list");

  if (gridContainer && listContainer) {
    gridContainer.replaceChildren();
    listContainer.replaceChildren();
  }

  localStorage.setItem("layout", layout);
  setActiveTab(layout);

  // Fade transition
  container.style.opacity = "0";
  container.style.transition = "opacity 0.4s ease";

  requestAnimationFrame(() => {
    container.innerHTML = "";

    jsonData.forEach((person) => {
      const links = Object.entries(person.socialLinks || {}).map(([label, url]) => ({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        url,
      }));
      const studyLinks = Object.entries(person.studyLinks || {}).map(([label, url]) => ({
        label: label
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s) => s.toUpperCase())
          .trim(),
        url,
      }));

      const cardData = {
        title: person.name,
        subtitle: person.title,
        text: person.description,
        links,
        studyLinks,
        updatedAt: person.updatedOn,
      };
      const card = new Card(cardData);
      const renderedCard = layout === "list" ? card.renderList() : card.render();

      // Animate individual cards on mount
      renderedCard.style.opacity = "0";
      renderedCard.style.transform = "translateY(10px)";
      renderedCard.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      container.appendChild(renderedCard);

      setTimeout(() => {
        renderedCard.style.opacity = "1";
        renderedCard.style.transform = "translateY(0)";
      }, 80);
    });

    // Reveal container after short delay for smoother UX
    setTimeout(() => (container.style.opacity = "1"), 120);
  });
}

// Fetch data, manage layout toggle, add debounce for performance
async function fetchAndRenderCards() {
  try {
    const gridTab = document.getElementById("gridTab");
    const listTab = document.getElementById("listTab");
    const cardsGrid = document.getElementById("gridView");
    const cardsList = document.getElementById("listView");

    if (!cardsGrid || !cardsList) {
      console.error("Card containers missing in DOM");
      return;
    }

    // Show loader while fetching
    showLoadingSkeleton(cardsGrid);

    const response = await fetch("./data/users.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const jsonData = await response.json();

    const savedLayout = localStorage.getItem("layout") || "grid";
    const container = savedLayout === "list" ? cardsList : cardsGrid;
    insertCards(jsonData, container, savedLayout);

    // Layout toggle listeners
    if (gridTab && listTab) {
      gridTab.addEventListener("click", () => insertCards(jsonData, cardsGrid, "grid"));
      listTab.addEventListener("click", () => insertCards(jsonData, cardsList, "list"));

      // Keyboard accessibility (Enter/Space toggles layout)
      [gridTab, listTab].forEach((tab) =>
        tab.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            tab.click();
          }
        })
      );
    }

    // Optional: responsive layout hint (auto adjust based on screen width)
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      if (width < 640 && localStorage.getItem("layout") !== "list") {
        insertCards(jsonData, cardsList, "list");
      } else if (width >= 640 && localStorage.getItem("layout") !== "grid") {
        insertCards(jsonData, cardsGrid, "grid");
      }
    }, 300);

    window.addEventListener("resize", handleResize);
  } catch (error) {
    console.error("Error fetching and rendering cards:", error);
    const fallbackContainer = document.querySelector(".cards-grid");
    if (fallbackContainer) {
      fallbackContainer.innerHTML = `
        <div class="text-center p-8 text-gray-600 dark:text-gray-300">
          <p>⚠️ Failed to load contributions. Please refresh the page.</p>
        </div>
      `;
    }
  }
}

document.addEventListener("DOMContentLoaded", fetchAndRenderCards);
