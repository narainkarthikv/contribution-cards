class Card {
  constructor(data) {
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.text = data.text;
    this.links = data.links;
    this.studyLinks = data.studyLinks;
    this.updatedAt = data.updatedAt;
  }

  render() {
    // Define the card background and border based on the theme
    const cardBg = document.body.classList.contains('dark-mode') ? '#2c2c2c' : '#f3f4f6';
    const cardBorder = document.body.classList.contains('dark-mode') ? '#3a3a3a' : '#e2e8f0';
    const hoverBg = document.body.classList.contains('dark-mode') ? '#3a3a3a' : '#e5e7eb';

    const cardElement = document.createElement('div');
    cardElement.className = `
      cards w-full bg-gray-100 h-[450px] 
      flex flex-col justify-between m-4 p-4 
      rounded-[15px] shadow-md transition-all duration-300 ease-in-out 
      cursor-pointer border dark:bg-[#2c2c2c] dark:border-[#3a3a3a] 
      hover:shadow-xl hover:scale-105
    `;

    cardElement.innerHTML = `
        <div class="flex flex-col h-full justify-between">
          <div>
            <h5 class="card-title text-[1.2em] font-bold mb-2">${this.title}</h5>
            <h6 class="card-subtitle text-[0.9rem] font-semibold text-[#888] mb-2">${this.subtitle}</h6>
            <p class="card-text text-[0.95rem] mb-4 leading-[1.4]">${this.text}</p>
            
            <!-- Social Links -->
            <ul class="card-social-links list-none flex flex-wrap gap-2">
              ${this.links.map(link => `
                <li>
                  <a href="${link.url}" class="card-link rounded-lg inline-flex items-center justify-center bg-gray-200 hover:bg-gray-300 p-2 text-[1.2rem] transition-all duration-300 dark:bg-[#333] hover:dark:bg-[#444]">
                    <i class="${this.getIconClass(link.label)} ${this.getIconColor(link.label)}"></i>
                  </a>
                </li>
              `).join('')}
            </ul>

            <!-- Study Links (Vertical Layout) -->
            <p class="card-text mt-4 font-semibold">Study Links:</p>
            <ul class="card-study-links list-none flex flex-col gap-2 mt-2 overflow-y-auto max-h-[120px] pr-1"> 
              ${this.studyLinks.map(link => `
                <li>
                  <a href="${link.url}" class="study-link inline-flex items-center justify-center w-full rounded-lg bg-gray-200 hover:bg-gray-300 p-2 text-[1rem] transition-all duration-300 dark:bg-[#333] hover:dark:bg-[#444]">
                    ${link.label}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>

          <div class="w-full flex justify-center p-2">
            <div class="card-date text-sm text-gray-600 dark:text-gray-400">Updated on ${this.updatedAt}</div>
          </div>
        </div>
      `;

    // Apply the background color dynamically based on the theme
    cardElement.style.backgroundColor = cardBg;
    cardElement.style.borderColor = cardBorder;

    // Change hover color based on the theme
    cardElement.addEventListener('mouseenter', () => {
      cardElement.style.backgroundColor = hoverBg;
    });

    cardElement.addEventListener('mouseleave', () => {
      cardElement.style.backgroundColor = cardBg;
    });

    return cardElement;
  }

  getIconClass(label) {
    const icons = {
      'GitHub': 'fab fa-github',
      'LinkedIn': 'fab fa-linkedin',
      'Twitter': 'fab fa-twitter',
      'Facebook': 'fab fa-facebook',
      'YouTube': 'fab fa-youtube',
      'Instagram': 'fab fa-instagram',
      'Website': 'fas fa-globe',
    };
    return icons[label] || 'fas fa-link';
  }

  getIconColor(label) {
    const colors = {
      'GitHub': 'text-gray-800 dark:text-white', 
      'LinkedIn': 'text-blue-700 dark:text-blue-400', 
      'Twitter': 'text-blue-500 dark:text-blue-300', 
      'Facebook': 'text-blue-600 dark:text-blue-400', 
      'YouTube': 'text-red-600 dark:text-red-400', 
      'Instagram': 'text-pink-500 dark:text-pink-400', 
      'Website': 'text-green-600 dark:text-green-400',
    };
    return colors[label] || 'text-gray-500 dark:text-gray-300';
  }
}

export default Card;
