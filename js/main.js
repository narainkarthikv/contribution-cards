function filterCards() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        const cardTitle = cards[i].querySelector('.card-title').textContent.toLowerCase();
        //search debouncing
        setTimeout(()=>{
            if (cardTitle.includes(searchInput)) {
                cards[i].style.display = '';
            } else {
                cards[i].style.display = 'none';
            }
        }, 1000)
    }
}

fetch('data/users.json')
  .then(response => response.json())
  .then(data => {
    user = data;
    const users = data;
    const cardContainer = document.getElementById('cardsContainer');

    data.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-head">
                <h5 class="card-title">${user.name}</h5>
                <ul class="card-social-links">
                    <li><a href="${user.socialLinks.linkedin}" class="card-link" data-toggle="tooltip" title="LinkedIn"><i class="bi bi-linkedin"></i></a></li>
                    <li><a href="${user.socialLinks.github}" class="card-link" data-toggle="tooltip" title="GitHub"><i class="bi bi-github"></i></a></li>
                    <li><a href="${user.socialLinks.portfolio}" class="card-link" data-toggle="tooltip" title="Portfolio"><i class="bi bi-globe"></i></a></li>
                </ul>
            </div>
            <p class="card-text">${user.description}</p>
            <ul class="card-study-links">
                <li><a href="${user.studyLinks.freeCodeCamp}" target="_blank" class="study-link" data-toggle="tooltip" title="FreeCodeCamp"><i class="bi bi-book"></i></a></li>
                <li><a href="${user.studyLinks.w3Schools}" target="_blank" class="study-link" data-toggle="tooltip" title="W3Schools"><i class="bi bi-mortarboard"></i></a></li>
                <li><a href="${user.studyLinks.githubDocs}" target="_blank" class="study-link" data-toggle="tooltip" title="GitHub Docs"><i class="bi bi-file-code"></i></a></li>
            </ul>
            <h6 class="card-subtitle mb-2 text-muted card-date">Updated on: ${user.updatedOn}</h6>
        `;
        cardContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});