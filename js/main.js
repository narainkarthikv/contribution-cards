document.addEventListener('DOMContentLoaded', () => {

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

    // Handle theme toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');

    // Check stored dark mode setting on load
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('bi-sun', 'bi-moon');
        applyDarkModeStyles();
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeIcon.classList.toggle('bi-moon');
        themeIcon.classList.toggle('bi-sun');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
        
        // Apply appropriate styles based on the mode
        if (isDarkMode) {
            applyDarkModeStyles();
        } else {
            applyLightModeStyles();
        }
        // Reload the page to apply changes
    setTimeout(() => {
        location.reload();
    }, 100); // This gives the time to toggle the theme before the refresh happens
    });

    // Apply styles for dark mode
    function applyDarkModeStyles() {
        const cards = document.querySelectorAll('.cards');
        document.body.style.backgroundColor = '#121212';  // Dark background for body
        cards.forEach(card => {
            card.style.backgroundColor = '#2c2c2c';  // Dark card background
            card.style.borderColor = '#3a3a3a';  // Dark card border
        });

        const cardTitles = document.querySelectorAll('.card-title');
        cardTitles.forEach(title => {
            title.style.color = '#e0e0e0';  // Light text color for dark mode
        });

        const cardTexts = document.querySelectorAll('.card-text');
        cardTexts.forEach(text => {
            text.style.color = '#ccc';  // Slightly lighter text color for dark mode
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
            card.style.backgroundColor = '#f3f4f6';  // Light card background
            document.body.style.backgroundColor = '#f3f4f6';  // Light background for body
            card.style.borderColor = '#e2e8f0';  // Light card border
        });

        const cardTitles = document.querySelectorAll('.card-title');
        cardTitles.forEach(title => {
            title.style.color = '#333';  // Dark text color for light mode
        });

        const cardTexts = document.querySelectorAll('.card-text');
        cardTexts.forEach(text => {
            text.style.color = '#555';  // Darker text for light mode
        });

        const cardBorders = document.querySelectorAll('.cards');
        cardBorders.forEach(card => {
            card.style.borderColor = '#e2e8f0';
        });
    }

    // Attach filterCards function to the search input event
    document.getElementById('searchInput').addEventListener('keyup', filterCards);
});
