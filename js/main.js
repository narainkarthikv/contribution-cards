document.addEventListener('DOMContentLoaded', () => {
    // Function to filter cards based on search input with debouncing
    const filterCards = debounce(() => {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const cards = document.querySelectorAll('.cards');

        cards.forEach(card => {
            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            card.style.display = cardTitle.includes(searchInput) ? '' : 'none';
        });
    }, 300);

    // Debounce function to limit the rate of function execution
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Handle theme toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIconSun = document.getElementById('themeIconSun');
    const themeIconMoon = document.getElementById('themeIconMoon');

    // Check stored dark mode setting on load
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeIconSun.classList.add('hidden');
        themeIconMoon.classList.remove('hidden');
        applyDarkModeStyles();
    } else {
        themeIconSun.classList.remove('hidden');
        themeIconMoon.classList.add('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

        if (isDarkMode) {
            themeIconSun.classList.add('hidden');
            themeIconMoon.classList.remove('hidden');
            applyDarkModeStyles();
        } else {
            themeIconSun.classList.remove('hidden');
            themeIconMoon.classList.add('hidden');
            applyLightModeStyles();
        }

        setTimeout(() => {
            location.reload();
        }, 100);
    });

    // Apply styles for dark mode
    function applyDarkModeStyles() {
        const cards = document.querySelectorAll('.cards');
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#ffffff'; // Change font color to white
        cards.forEach(card => {
            card.style.backgroundColor = '#1e1e1e';
            card.style.borderColor = '#3a3a3a';
        });

        const cardTitles = document.querySelectorAll('.card-title');
        cardTitles.forEach(title => {
            title.style.color = '#e0e0e0';
        });

        const cardTexts = document.querySelectorAll('.card-text');
        cardTexts.forEach(text => {
            text.style.color = '#ccc';
        });

        const cardBorders = document.querySelectorAll('.cards');
        cardBorders.forEach(card => {
            card.style.borderColor = '#3a3a3a';
        });
    }

    // Apply styles for light mode
    function applyLightModeStyles() {
        const cards = document.querySelectorAll('.cards');
        cards.forEach(card => {
            card.style.backgroundColor = '#f3f4f6';
            document.body.style.backgroundColor = '#f3f4f6';
            card.style.borderColor = '#e2e8f0';
        });

        const cardTitles = document.querySelectorAll('.card-title');
        cardTitles.forEach(title => {
            title.style.color = '#333';
        });

        const cardTexts = document.querySelectorAll('.card-text');
        cardTexts.forEach(text => {
            text.style.color = '#555';
        });

        const cardBorders = document.querySelectorAll('.cards');
        cardBorders.forEach(card => {
            card.style.borderColor = '#e2e8f0';
        });
    }

    // Attach filterCards function to the search input event
    document.getElementById('searchInput').addEventListener('keyup', filterCards);
});
