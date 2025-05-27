import Card from './card.js';

async function fetchAndRenderCards() {
    try {
        const response = await fetch('./data/users.json');
        const jsonData = await response.json();
        const cardsContainer = document.querySelector('.cards-container');

        jsonData.forEach(person => {
            // Normalize socialLinks and studyLinks keys for consistent display
            const links = Object.entries(person.socialLinks || {}).map(([label, url]) => ({
                label: label.charAt(0).toUpperCase() + label.slice(1),
                url
            }));
            const studyLinks = Object.entries(person.studyLinks || {}).map(([label, url]) => ({
                label: label.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim(),
                url
            }));

            const cardData = {
                title: person.name,
                subtitle: person.title,
                text: person.description,
                links,
                studyLinks,
                updatedAt: person.updatedOn
            };
            const card = new Card(cardData);
            cardsContainer.appendChild(card.render());
        });
    } catch (error) {
        console.error('Error fetching and rendering cards:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderCards);
