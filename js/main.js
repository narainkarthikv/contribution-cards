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
