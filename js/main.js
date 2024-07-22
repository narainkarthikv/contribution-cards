function filterCards() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
        const cardTitle = cards[i].querySelector('.card-title').textContent.toLowerCase();
        if (cardTitle.includes(searchInput)) {
            cards[i].style.display = '';
        } else {
            cards[i].style.display = 'none';
        }
    }
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});