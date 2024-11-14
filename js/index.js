import Card from './card.js';

async function fetchAndRenderCards() {
    try {
        console.log('fetching data');
        const response = await fetch('./data/users.json'); // Replace with your actual JSON file path or endpoint
        const jsonData = await response.json();
        console.log(jsonData);
        const cardsContainer = document.querySelector('.cards-container'); // Assume a div with id 'card-container' in HTML
        console.log("cards container", cardsContainer);
        jsonData.forEach(person => {
            // Map JSON properties to Card properties
            const cardData = {
                title: person.name,
                subtitle: person.title,
                text: person.description,
                links: Object.entries(person.socialLinks).map(([label, url]) => ({ label, url })),
                studyLinks: Object.entries(person.studyLinks).map(([label, url]) => ({ label, url })),
                updatedAt: person.updatedOn
            };
            console.log(cardData);
            // Create a Card instance and render it
            const card = new Card(cardData);
            cardsContainer.appendChild(card.render());
            console.log("cards made ")
        });
    } catch (error) {
        console.error('Error fetching and rendering cards:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderCards);
