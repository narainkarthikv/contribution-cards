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
    const cardBg = document.body.classList.contains('dark-mode') ? '#2d2d2d' : '#ffffff';
    const cardBorder = document.body.classList.contains('dark-mode') ? '#4a4a4a' : '#d1d5db';
    const hoverBg = document.body.classList.contains('dark-mode') ? '#3a3a3a' : '#f3f4f6';

    const cardElement = document.createElement('div');
    cardElement.className = `
      cards w-full bg-white h-[500px] 
      flex flex-col justify-between m-5 p-5
      shadow-lg transition-transform duration-500 ease-in-out 
      cursor-pointer border dark:bg-[#2d2d2d] dark:border-[#4a4a4a] 
      hover:shadow-2xl hover:scale-105 rounded-lg
    `;

    cardElement.innerHTML = `
        <div class="flex flex-col h-full justify-between align-center">
          
          <div>
            <div class="flex justify-between items-center mb-2">
              <h5 class="card-title text-[1.4em] font-bold">${this.title}</h5>
              <div class="card-date text-sm text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-[#4a4a4a] rounded-full px-3 py-1 inline-flex items-center">
                <i class="fas fa-calendar-alt mr-2"></i>${this.updatedAt}
              </div>
            </div>
            <h6 class="card-subtitle text-[1rem] font-semibold text-[#6b7280] mb-2">${this.subtitle}</h6>
            <p class="card-text text-[1rem] mb-4 leading-[1.6]">${this.text}</p>
            
            <!-- Social Links -->
            <ul class="card-social-links list-none flex flex-wrap gap-3">
              ${this.links.map(link => `
                <li>
                  <a href="${link.url}" class="card-link rounded-lg inline-flex items-center justify-center bg-gray-200 hover:bg-gray-300 p-3 text-[1.4rem] transition-all duration-300 dark:bg-[#4a4a4a] hover:dark:bg-[#5a5a5a]">
                    <i class="${this.getIconClass(link.label)} ${this.getIconColor(link.label)}"></i>
                  </a>
                </li>
              `).join('')}
            </ul>

            <!-- Study Links (Vertical Layout) -->
            <p class="card-text mt-4 font-semibold">Study Links:</p>
            <ul class="card-study-links list-none flex flex-col gap-3 mt-2 overflow-y-auto max-h-[120px] pr-1"> 
              ${this.studyLinks.map((link, index) => `
                <li class="flex items-center">
                  <a href="${link.url}" class="study-link inline-flex items-center justify-center w-full rounded-lg bg-gray-200 hover:bg-gray-300 p-3 text-[1rem] transition-all duration-300 dark:bg-[#4a4a4a] dark:hover:bg-[#5a5a5a] ${this.isAlwaysBlackLink(link.label) ? 'text-black dark:text-white' : 'text-gray-800 dark:text-white'}">
                    ${link.label}
                  </a>
                </li>
              `).join('')}
            </ul>
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

  // Get the icon class based on the label
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

  // Get the icon color based on the label
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

  // Check if the link should always be black
  isAlwaysBlackLink(label) {
    const alwaysBlackLinks = ['freecodecamp', 'w3Schools'];
    return alwaysBlackLinks.includes(label.toLowerCase());
  }
}

export default Card;
