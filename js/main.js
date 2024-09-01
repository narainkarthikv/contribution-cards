document.addEventListener('DOMContentLoaded', () => {
    // Load users data and generate cards
    fetch('data/users.json')
        .then(response => response.json())
        .then(users => {
            const cardsContainer = document.getElementById('cardsContainer');

            users.forEach(user => {
                const card = createCard(user);
                cardsContainer.appendChild(card);
                adjustCardTextColor(card);
            });
        });

    // Function to create a card element
    function createCard(user) {
        const card = document.createElement('div');
        card.classList.add('cards', formatClassName(user.name));
        card.style.backgroundColor = generateConsistentColor(user.name);

        card.innerHTML = `
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
        return card;
    }

    // Function to format the user's name into a valid CSS class
    function formatClassName(name) {
        return name.toLowerCase().replace(/\s+/g, '-');
    }

    // Function to filter cards based on search input with debouncing
    const filterCards = debounce(() => {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const cards = document.querySelectorAll('.cards');

        cards.forEach(card => {
            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            card.style.display = cardTitle.includes(searchInput) ? '' : 'none';
        });
    }, 300); // Adjusted debounce delay

    // Debounce function to limit the rate of function execution
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Generate a consistent color based on a string (user's name)
    function generateConsistentColor(name) {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return `#${((hash >> 24) & 0xFF).toString(16).padStart(2, '0')}${((hash >> 16) & 0xFF).toString(16).padStart(2, '0')}${((hash >> 8) & 0xFF).toString(16).padStart(2, '0')}`;
    }

    // Calculate optimal text color for best contrast with the background
    function getContrastingTextColor(backgroundColor) {
        const hex = backgroundColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        const lightColors = ['#ffffff', '#f0f0f0', '#e0e0e0', '#d0d0d0'];
        const darkColors = ['#000000', '#333333', '#666666', '#999999'];

        const palette = luminance < 128 ? lightColors : darkColors;

        return palette.reduce((bestColor, color) => {
            const [r2, g2, b2] = hexToRgb(color);
            const contrast = Math.abs(r - r2) + Math.abs(g - g2) + Math.abs(b - b2);
            return contrast > (bestColor.contrast || 0) ? { color, contrast } : bestColor;
        }, {}).color;
    }

    // Convert hex color to RGB array
    function hexToRgb(hex) {
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return [r, g, b];
    }

    // Adjust text color for better contrast with the card background
    function adjustCardTextColor(card) {
        const backgroundColor = window.getComputedStyle(card).backgroundColor;
        const hex = rgbToHex(backgroundColor);
        const textColor = getContrastingTextColor(hex);

        card.querySelectorAll('.card-title, .card-text').forEach(el => {
            el.style.color = textColor;
        });
    }

    // Convert RGB color to HEX
    function rgbToHex(rgb) {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

    // Handle theme toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');

    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('bi-sun', 'bi-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeIcon.classList.toggle('bi-moon');
        themeIcon.classList.toggle('bi-sun');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    // Attach filterCards function to the search input event
    document.getElementById('searchInput').addEventListener('keyup', filterCards);
});
