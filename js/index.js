import Card from "./card.js";

function insertCards(jsonData, container, layout) {
  document.querySelector(".cards-grid").replaceChildren();
  document.querySelector(".cards-list").replaceChildren();

  localStorage.setItem("layout", layout);

  jsonData.forEach((person) => {
    // Normalize socialLinks and studyLinks keys for consistent display
    const links = Object.entries(person.socialLinks || {}).map(
      ([label, url]) => ({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        url,
      })
    );
    const studyLinks = Object.entries(person.studyLinks || {}).map(
      ([label, url]) => ({
        label: label
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s) => s.toUpperCase())
          .trim(),
        url,
      })
    );

    const cardData = {
      title: person.name,
      subtitle: person.title,
      text: person.description,
      links,
      studyLinks,
      updatedAt: person.updatedOn,
    };
    const card = new Card(cardData);
    container.appendChild(card.render());
  });
}

async function fetchAndRenderCards() {
  try {
    const response = await fetch("./data/users.json");
    const jsonData = await response.json();
    const grid = document.querySelector("#grid");
    const list = document.querySelector("#list");
    const cardsGrid = document.querySelector(".cards-grid");
    const cardsList = document.querySelector(".cards-list");

    const layout = localStorage.getItem("layout");
    if (layout === "list") {
      insertCards(jsonData, cardsList, "list");
    } else {
      insertCards(jsonData, cardsGrid, "grid");
    }

    grid.addEventListener("click", () =>
      insertCards(jsonData, cardsGrid, "grid")
    );
    list.addEventListener("click", () =>
      insertCards(jsonData, cardsList, "list")
    );
  } catch (error) {
    console.error("Error fetching and rendering cards:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchAndRenderCards);
