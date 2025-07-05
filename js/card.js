class Card {
  constructor(data) {
    this.title = data.title || "";
    this.subtitle = data.subtitle || "";
    this.text = data.text || "";
    this.links = data.links || [];
    this.studyLinks = data.studyLinks || [];
    this.updatedAt = data.updatedAt || "";
  }

  #sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  render() {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('role', 'article');
    cardElement.className = [
      'cards w-full h-[500px]',
      'flex flex-col justify-between m-5 p-5',
      'shadow-lg transition-transform duration-500 ease-in-out',
      'cursor-pointer border rounded-lg',
      'hover:shadow-2xl hover:scale-105'
    ].join(' ');

    cardElement.innerHTML = `
      <div class="flex flex-col h-full justify-between align-center">
        <div>
          <div class="flex justify-between items-center mb-2">
            <h5 class="card-title text-[1.4em] font-bold" style="color: var(--text-color)">${this.#sanitizeHTML(this.title)}</h5>
            <div class="card-date text-sm bg-gray-200 rounded-full px-3 py-1 inline-flex items-center" style="background: var(--accent-bg); color: var(--accent-color)">
              <i class="fas fa-calendar-alt mr-2" aria-hidden="true" style="color: var(--accent-color)"></i>
              <span>${this.#sanitizeHTML(this.updatedAt)}</span>
            </div>
          </div>
          <h6 class="card-subtitle text-[1rem] font-semibold mb-2" style="color: var(--text-color); opacity: 0.85">${this.#sanitizeHTML(this.subtitle)}</h6>
          <p class="card-text text-[1rem] mb-4 leading-[1.6]" style="color: var(--text-color)">${this.#sanitizeHTML(this.text)}</p>
          <ul class="card-social-links list-none flex flex-wrap gap-3" role="list">
            ${this.links.map(link => `
              <li>
                <a href="${this.#sanitizeHTML(link.url)}" 
                   class="card-link rounded-lg inline-flex items-center justify-center p-3 text-[1.4rem] transition-all duration-300"
                   style="background: var(--accent-bg); color: var(--accent-color)"
                   aria-label="${this.#sanitizeHTML(link.label)}"
                   rel="noopener noreferrer"
                   target="_blank">
                  <i class="${this.#getIconClass(link.label)}" aria-hidden="true" style="color: var(--accent-color)"></i>
                </a>
              </li>
            `).join('')}
          </ul>
          ${this.studyLinks.length > 0 ? `
            <p class="card-text mt-4 font-semibold" style="color: var(--text-color)">Study Links:</p>
            <ul class="card-study-links list-none flex flex-col gap-3 mt-2 overflow-y-auto max-h-[120px] pr-1" role="list"> 
              ${this.studyLinks.map(link => `
                <li class="flex items-center">
                  <a href="${this.#sanitizeHTML(link.url)}" 
                     class="study-link inline-flex items-center justify-center w-full rounded-lg p-3 text-[1rem] transition-all duration-300"
                     style="background: var(--card-bg); color: var(--text-color); border: 1px solid var(--card-border)"
                     rel="noopener noreferrer"
                     target="_blank">
                    ${this.#sanitizeHTML(link.label)}
                  </a>
                </li>
              `).join('')}
            </ul>
          ` : ''}
        </div>
      </div>
    `;

    cardElement.addEventListener('mouseenter', () => {
      cardElement.style.boxShadow = '0 8px 32px rgba(34, 48, 74, 0.16)';
      cardElement.style.transform = 'translateY(-4px) scale(1.03)';
    });
    cardElement.addEventListener('mouseleave', () => {
      cardElement.style.boxShadow = '';
      cardElement.style.transform = '';
    });

    return cardElement;
  }

  #getIconClass(label) {
    const icons = {
      'GitHub': 'fab fa-github',
      'LinkedIn': 'fab fa-linkedin',
      'Twitter': 'fab fa-twitter',
      'Facebook': 'fab fa-facebook',
      'YouTube': 'fab fa-youtube',
      'Instagram': 'fab fa-instagram',
      'Website': 'fas fa-globe',
      'Portfolio': 'fas fa-globe',
      'portfolio': 'fas fa-globe'
    };
    return icons[label] || 'fas fa-link';
  }

  #getIconColor(label) {
    const colors = {
      'GitHub': 'text-gray-800 dark:text-white', 
      'LinkedIn': 'text-blue-700 dark:text-blue-400', 
      'Twitter': 'text-blue-500 dark:text-blue-300', 
      'Facebook': 'text-blue-600 dark:text-blue-400', 
      'YouTube': 'text-red-600 dark:text-red-400', 
      'Instagram': 'text-pink-500 dark:text-pink-400', 
      'Website': 'text-green-600 dark:text-green-400',
      'Portfolio': 'text-green-600 dark:text-green-400',
      'portfolio': 'text-green-600 dark:text-green-400'
    };
    return colors[label] || 'text-gray-500 dark:text-gray-300';
  }

  #isAlwaysBlackLink(label) {
    const alwaysBlackLinks = ['freecodecamp', 'w3schools'];
    return alwaysBlackLinks.includes(label.toLowerCase().replace(/\s/g, ''));
  }
}

export default Card;
