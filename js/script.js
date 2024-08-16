document.addEventListener('DOMContentLoaded', () => {
    const filterInput = document.getElementById('filterInput');
    const emojiContainer = document.getElementById('emojiContainer');

    // Debounce function to limit rapid calls to filterEmojis
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    fetch('./data/NmojiList.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(NmojiList => {
            displayEmojis(NmojiList);
            // Use debounce to improve performance
            filterInput.addEventListener('input', debounce(() => filterEmojis(NmojiList), 300));
        })
        .catch(error => {
            console.error('Error fetching the JSON data:', error);
        });

    function displayEmojis(emojis) {
        emojiContainer.innerHTML = '';
        emojis.forEach(emoji => {
            const emojiElement = document.createElement('div');
            emojiElement.classList.add('emoji');
            emojiElement.textContent = emoji.emoji;
            emojiElement.title = `${emoji.description} - Category: ${emoji.category}`;
            emojiElement.addEventListener('click', () => copyToClipboard(emoji.emoji, emojiElement));
            emojiContainer.appendChild(emojiElement);
        });
    }

    function filterEmojis(NmojiList) {
        const filterValue = filterInput.value.toLowerCase();
        const filteredEmojis = NmojiList.filter(emoji =>
            emoji.emoji.toLowerCase().includes(filterValue) ||
            emoji.description.toLowerCase().includes(filterValue) ||
            emoji.category.toLowerCase().includes(filterValue) ||
            (emoji.tags && emoji.tags.some(tag => tag.toLowerCase().includes(filterValue)))
        );
        displayEmojis(filteredEmojis);
    }

    function copyToClipboard(text, element) {
        element.classList.add('clicked'); // Add the class to trigger the animation

        if (navigator.clipboard) { // Modern async clipboard API
            navigator.clipboard.writeText(text).then(() => {
                console.log('Text copied to clipboard');
                setTimeout(() => {
                    element.classList.remove('clicked'); // Remove the class after the animation
                }, 750); // Match the duration of the CSS transition
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        } else { // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                const successful = document.execCommand('copy');
                const msg = successful ? 'successful' : 'unsuccessful';
                console.log('Fallback: Copying text command was ' + msg);
                setTimeout(() => {
                    element.classList.remove('clicked'); // Remove the class after the animation
                }, 750); // Match the duration of the CSS transition
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            document.body.removeChild(textArea);
        }
    }

});
