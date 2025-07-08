// Card.js - Card component for Contribution Cards
// Follows separation of concerns, accessibility, and frontend best practices

class Card {
  constructor(data) {
    this.title = data.title || "";
    this.subtitle = data.subtitle || "";
    this.text = data.text || "";
    this.links = Array.isArray(data.links) ? data.links : [];
    this.studyLinks = Array.isArray(data.studyLinks) ? data.studyLinks : [];
    this.updatedAt = data.updatedAt || "";
  }

  // Sanitize HTML to prevent XSS
  #sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Utility: get icon class for social links
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

  // Utility: always black text for certain study links
  #isAlwaysBlackLink(label) {
    const alwaysBlackLinks = ['freecodecamp', 'w3schools'];
    return alwaysBlackLinks.includes(label.toLowerCase().replace(/\s/g, ''));
  }

  // Render grid card
  render() {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('role', 'article');
    cardElement.setAttribute('tabindex', '0'); // Accessibility: make card focusable
    cardElement.className = [
      'cards', 'w-full', 'h-[500px]',
      'flex', 'flex-col', 'justify-between', 'm-5', 'p-5',
      'shadow-lg', 'transition-transform', 'duration-500', 'ease-in-out',
      'cursor-pointer', 'border', 'rounded-lg',
      'hover:shadow-2xl', 'hover:scale-105',
      'bg-white', 'dark:bg-[#2d2d2d]', 'border-[#d1d5db]', 'dark:border-[#4a4a4a]'
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
          ${this.subtitle ? `<h6 class="card-subtitle text-[1rem] font-semibold mb-2" style="color: var(--text-color); opacity: 0.85">${this.#sanitizeHTML(this.subtitle)}</h6>` : ''}
          ${this.text ? `<p class="card-text text-[1rem] mb-4 leading-[1.6]" style="color: var(--text-color)">${this.#sanitizeHTML(this.text)}</p>` : ''}
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
          <div class="card-study-links-wrapper">
            ${this.studyLinks.length > 0 ? `
              <p class="card-text mt-4 font-semibold" style="color: var(--text-color)">Study Links:</p>
              <ul class="card-study-links list-none flex flex-col gap-3 mt-2 overflow-y-auto max-h-[120px] pr-1" role="list"> 
                ${this.studyLinks.map(link => `
                  <li class="flex items-center">
                    <a href="${this.#sanitizeHTML(link.url)}" 
                       class="study-link inline-flex items-center justify-center w-full rounded-lg p-3 text-[1rem] transition-all duration-300 ${this.#isAlwaysBlackLink(link.label) ? 'text-black' : ''}"
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
      </div>
    `;

    // Hover effect
    cardElement.addEventListener('mouseenter', () => {
      cardElement.style.boxShadow = '0 8px 32px rgba(34, 48, 74, 0.16)';
      cardElement.style.transform = 'translateY(-4px) scale(1.03)';
      cardElement.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#3a3a3a' : '#f3f4f6';
    });
    cardElement.addEventListener('mouseleave', () => {
      cardElement.style.boxShadow = '';
      cardElement.style.transform = '';
      cardElement.style.backgroundColor = '';
    });
    // Keyboard accessibility: focus/blur
    cardElement.addEventListener('focus', () => {
      cardElement.style.outline = '2px solid #2563eb';
    });
    cardElement.addEventListener('blur', () => {
      cardElement.style.outline = '';
    });
    return cardElement;
  }

  // Render list card (accordion style)
  renderList() {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('role', 'article');
    cardElement.className = [
      'card-list-item',
      'flex', 'flex-col', 'w-full', 'p-0', 'my-2', 'rounded-lg', 'border', 'shadow-sm',
      'transition-transform', 'duration-500', 'ease-in-out',
      'hover:shadow-lg', 'hover:scale-[1.01]', 'bg-[var(--card-bg)]',
      'border-[#d1d5db]', 'dark:border-[#4a4a4a]'
    ].join(' ');

    // Unique ID for aria-controls
    const descId = `desc-${this.title.replace(/\s/g, '')}`;
    const toggleId = `toggle-${this.title.replace(/\s/g, '')}`;

    cardElement.innerHTML = `
      <div class="flex items-center gap-4 w-full px-4 py-3">
        <div class="card-date text-xs bg-gray-200 rounded-full px-2 py-1 text-center min-w-[80px] max-w-[120px]" style="background: var(--accent-bg); color: var(--accent-color)">
          <i class="fas fa-calendar-alt mr-1" aria-hidden="true" style="color: var(--accent-color)"></i>
          <span>${this.#sanitizeHTML(this.updatedAt)}</span>
        </div>
        <div class="flex-1 min-w-0">
          <h5 class="card-title text-base font-bold truncate" style="color: var(--text-color)">${this.#sanitizeHTML(this.title)}</h5>
        </div>
        <ul class="card-social-links list-none flex flex-row gap-2" role="list">
          ${this.links.map(link => `
            <li>
              <a href="${this.#sanitizeHTML(link.url)}" 
                 class="card-link rounded-lg inline-flex items-center justify-center p-2 text-[1.2rem] transition-all duration-300"
                 style="background: var(--accent-bg); color: var(--accent-color)"
                 aria-label="${this.#sanitizeHTML(link.label)}"
                 rel="noopener noreferrer"
                 target="_blank">
                <i class="${this.#getIconClass(link.label)}" aria-hidden="true" style="color: var(--accent-color)"></i>
              </a>
            </li>
          `).join('')}
        </ul>
        <button class="accordion-toggle text-sm font-semibold px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-300 ml-4 flex items-center gap-1"
          aria-expanded="false" aria-controls="${descId}" id="${toggleId}">
          <span>Show Description</span>
          <span class="chevron" aria-hidden="true" style="display:inline-block;transition:transform 0.3s;"><svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        </button>
      </div>
      <div id="${descId}" class="accordion-content max-h-0 overflow-hidden transition-all duration-400 px-4 border-t border-[var(--card-border)] bg-[var(--card-bg)]" aria-hidden="true">
        <div class="py-3">
          ${this.text ? `<p class="card-text text-sm mb-2 leading-[1.5]" style="color: var(--text-color)">${this.#sanitizeHTML(this.text)}</p>` : ''}
          ${this.studyLinks.length > 0 ? `
            <p class="card-text font-semibold mt-2" style="color: var(--text-color)">Study Links:</p>
            <ul class="card-study-links list-none flex flex-col gap-2 mt-1 overflow-y-auto max-h-[80px] pr-1" role="list"> 
              ${this.studyLinks.map(link => `
                <li class="flex items-center">
                  <a href="${this.#sanitizeHTML(link.url)}" 
                     class="study-link inline-flex items-center justify-center w-full rounded-lg p-2 text-[0.95rem] transition-all duration-300 ${this.#isAlwaysBlackLink(link.label) ? 'text-black' : ''}"
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

    // Accordion logic
    const toggleBtn = cardElement.querySelector('.accordion-toggle');
    const content = cardElement.querySelector('.accordion-content');
    const chevron = toggleBtn.querySelector('.chevron');
    const toggleText = toggleBtn.querySelector('span');
    if (toggleBtn && content) {
      toggleBtn.addEventListener('click', () => {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', String(!expanded));
        content.setAttribute('aria-hidden', String(expanded));
        if (!expanded) {
          content.style.maxHeight = content.scrollHeight + 'px';
          toggleText.textContent = 'Hide Description';
          chevron.style.transform = 'rotate(180deg)';
          content.classList.add('expanded');
        } else {
          content.style.maxHeight = '0';
          toggleText.textContent = 'Show Description';
          chevron.style.transform = 'rotate(0deg)';
          content.classList.remove('expanded');
        }
        // Focus management for accessibility
        if (!expanded) {
          setTimeout(() => content.querySelector('a,button,input,select,textarea')?.focus(), 400);
        } else {
          toggleBtn.focus();
        }
      });
      // Keyboard accessibility
      toggleBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleBtn.click();
        }
      });
      // Accessibility: allow closing with Escape
      content.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && content.classList.contains('expanded')) {
          toggleBtn.click();
          toggleBtn.focus();
        }
      });
    }

    cardElement.addEventListener('mouseenter', () => {
      cardElement.style.boxShadow = '0 8px 32px rgba(34, 48, 74, 0.16)';
      cardElement.style.transform = 'translateY(-2px) scale(1.01)';
    });
    cardElement.addEventListener('mouseleave', () => {
      cardElement.style.boxShadow = '';
      cardElement.style.transform = '';
    });

    return cardElement;
  }
}

export default Card;
