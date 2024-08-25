document.addEventListener('DOMContentLoaded', function () {
    // Function to dynamically generate cards from users.json data
    fetch('data/users.json')
        .then(response => response.json())
        .then(users => {
            const cardsContainer = document.getElementById('cardsContainer');

            users.forEach(user => {
                const card = document.createElement('div');
                card.classList.add('cards');
                card.classList.add(user.name.toLowerCase().replace(/\s+/g, '-'));

                const cardColor = generateConsistentColor(user.name);
                card.style.backgroundColor = cardColor;

                // Create the card content
                const cardContent = `
                    <div class="card-head">
                        <h5 class="card-title">${user.name}</h5>
                        <ul class="card-social-links">
                            <li><a href="${user.socialLinks.linkedin}" class="card-link" data-toggle="tooltip" title="LinkedIn"><i class="bi bi-linkedin"></i></a></li>
                            <li><a href="${user.socialLinks.github}" class="card-link" data-toggle="tooltip" title="GitHub"><i class="bi bi-github"></i></a></li>
                            <li><a href="${user.socialLinks.portfolio}" class="card-link" data-toggle="tooltip" title="Portfolio"><i class="bi bi-globe"></i></a></li>
                        </ul>
                    </div>
                    <p class="card-text">${user.description}</p>
                    <ul class="card-study-links">
                        <li><a href="${user.studyLinks.freeCodeCamp}" target="_blank" class="study-link" data-toggle="tooltip" title="FreeCodeCamp"><i class="bi bi-book"></i></a></li>
                        <li><a href="${user.studyLinks.w3Schools}" target="_blank" class="study-link" data-toggle="tooltip" title="W3Schools"><i class="bi bi-mortarboard"></i></a></li>
                        <li><a href="${user.studyLinks.githubDocs}" target="_blank" class="study-link" data-toggle="tooltip" title="GitHub Docs"><i class="bi bi-file-code"></i></a></li>
                    </ul>
                    <h6 class="mb-2 card-date">Updated on: ${user.updatedOn}</h6>
                `;
                card.innerHTML = cardContent;

                // Append card to container
                cardsContainer.appendChild(card);

                // Adjust the card text color for contrast
                adjustCardTextColor(card);
            });
        });

    // Function to filter cards based on search input
    function filterCards() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const cards = document.getElementsByClassName('cards');
        for (let i = 0; i < cards.length; i++) {
            const cardTitle = cards[i].querySelector('.card-title').textContent.toLowerCase();
            //search debouncing
            setTimeout(()=>{
                if (cardTitle.includes(searchInput)) {
                    cards[i].style.display = '';
                } else {
                    cards[i].style.display = 'none';
                }
            }, 1000)
        }
    }

    // Function to generate a consistent color based on the user's name
    function generateConsistentColor(name) {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = `#${((hash >> 24) & 0xFF).toString(16).padStart(2, '0')}${((hash >> 16) & 0xFF).toString(16).padStart(2, '0')}${((hash >> 8) & 0xFF).toString(16).padStart(2, '0')}`;
        return color;
    }

    // Function to calculate the optimal text color for best contrast with background color
    function getContrastingTextColor(backgroundColor) {
        const hex = backgroundColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        // Calculate the luminance of the background color
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        // Define a high-contrast color palette
        const lightColors = ['#ffffff', '#f0f0f0', '#e0e0e0', '#d0d0d0'];
        const darkColors = ['#000000', '#333333', '#666666', '#999999'];

        // Find the color from the palette with the best contrast
        const getBestContrastColor = (colors) => {
            return colors.reduce((bestColor, color) => {
                const [r2, g2, b2] = hexToRgb(color);
                const contrast = Math.abs(r - r2) + Math.abs(g - g2) + Math.abs(b - b2);
                return contrast > (bestColor.contrast || 0) ? { color, contrast } : bestColor;
            }, {}).color;
        };

        return luminance < 128 ? getBestContrastColor(lightColors) : getBestContrastColor(darkColors);
    }

    // Helper function to convert hex to RGB
    function hexToRgb(hex) {
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return [r, g, b];
    }

    // Function to adjust text color for a single card
    function adjustCardTextColor(card) {
        const backgroundColor = window.getComputedStyle(card).backgroundColor;
        const hex = rgbToHex(backgroundColor);
        const textColor = getContrastingTextColor(hex);
        card.querySelectorAll('.card-title, .card-text').forEach(el => {
            el.style.color = textColor;
        });
    }

    // Helper function to convert RGB to HEX
    function rgbToHex(rgb) {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    // Attach filterCards function to the search input event
    document.getElementById('searchInput').addEventListener('keyup', filterCards);
});
