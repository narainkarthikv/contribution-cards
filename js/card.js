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
    const cardElement = document.createElement('div');
    cardElement.className = 'cards bg-gray-100  max-w-[250px] h-auto m-4 px-4 pt-4 rounded-[15px] shadow-md hover:shadow-lg transition-[transform,box-shadow] duration-300 ease-in-out cursor-pointer border dark:bg-[#2c2c2c] dark:border-[#3a3a3a]';

    cardElement.innerHTML = `
        <div class="flex flex-col justify-between">
          <div>
            <h5 class="card-title text-[1.3em] font-bold mb-2.5">${this.title}</h5>
            <h6 class="card-subtitle text-[0.9rem] font-bold text-[#888] mb-2.5">${this.subtitle}</h6>
            <p class="card-text text-[1rem] mb-5 leading-[1.5]">${this.text}</p>
            <ul class="card-social-links list-none flex gap-2.5">
              ${this.links.map(link => `
                <li>
                  <a href="${link.url}" class="card-link rounded-lg inline-flex items-center justify-center bg-gray-200 text-blue-600 hover:text-blue-500 hover:bg-gray-300 rounded-[8px] px-2.5 py-2.5 text-[1rem] transition-[color,background-color] duration-300 ease-in-out dark:bg-[#333] dark:text-[#bb86fc] hover:dark:bg-[#444] hover:dark:text-white">
                    ${link.label}
                  </a>
                </li>
              `).join('')}
            </ul>
            <p class="card-text mt-5"><strong>Study Links:</strong></p>
            <ul class="card-study-links list-none flex justify-center gap-2.5">
              ${this.studyLinks.map(link => `
                <li>
                  <a href="${link.url}" class="study-link inline-flex items-center justify-center rounded-lg bg-gray-200 text-blue-600 hover:text-blue-500 hover:bg-gray-300  px-2.5 py-2.5 text-[1rem] transition-[color,background-color] duration-300 ease-in-out dark:bg-[#333] dark:text-[#bb86fc] hover:dark:bg-[#444] hover:dark:text-white">
                    ${link.label}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
         <div class='w-full  justify-center p-2 bottom-0 flex'>  
            
            <div class="card-date text-sm ">Updated on ${this.updatedAt}</div>
            </div>
        </div>
      `;

    return cardElement;
  }
}

export default Card;