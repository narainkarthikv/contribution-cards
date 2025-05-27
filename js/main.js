document.addEventListener('DOMContentLoaded', () => {
    // Debounce utility
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Card filtering
    const filterCards = debounce(() => {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        document.querySelectorAll('.cards').forEach(card => {
            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            card.style.display = cardTitle.includes(searchInput) ? '' : 'none';
        });
    }, 300);

    document.getElementById('searchInput').addEventListener('keyup', filterCards);

    // Theme toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIconSun = document.getElementById('themeIconSun');
    const themeIconMoon = document.getElementById('themeIconMoon');

    function setTheme(isDark) {
        document.body.classList.toggle('dark-mode', isDark);
        if (isDark) {
            themeIconSun.classList.add('hidden');
            themeIconMoon.classList.remove('hidden');
            applyDarkModeStyles();
        } else {
            themeIconSun.classList.remove('hidden');
            themeIconMoon.classList.add('hidden');
            applyLightModeStyles();
        }
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    }

    function applyDarkModeStyles() {
        document.body.style.backgroundColor = '#121212';
        document.body.style.color = '#ffffff';
        document.querySelectorAll('.cards').forEach(card => {
            card.style.backgroundColor = '#1e1e1e';
            card.style.borderColor = '#3a3a3a';
        });
        document.querySelectorAll('.card-title').forEach(title => {
            title.style.color = '#e0e0e0';
        });
        document.querySelectorAll('.card-text').forEach(text => {
            text.style.color = '#ccc';
        });
    }

    function applyLightModeStyles() {
        document.body.style.backgroundColor = '#f3f4f6';
        document.body.style.color = '#222';
        document.querySelectorAll('.cards').forEach(card => {
            card.style.backgroundColor = '#f3f4f6';
            card.style.borderColor = '#e2e8f0';
        });
        document.querySelectorAll('.card-title').forEach(title => {
            title.style.color = '#333';
        });
        document.querySelectorAll('.card-text').forEach(text => {
            text.style.color = '#555';
        });
    }

    // Initialize theme on load
    setTheme(localStorage.getItem('darkMode') === 'enabled');

    themeToggleBtn.addEventListener('click', () => {
        setTheme(!document.body.classList.contains('dark-mode'));
    });
});
