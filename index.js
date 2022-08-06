const searchButton = document.querySelector('.search-button')
searchButton.addEventListener('click',function(){
    const inputKeyword = document.querySelector('.input-keyword')

    fetch("https://api.jikan.moe/v4/anime?q=" + inputKeyword.value)
    .then(response => response.json())
    .then(response => {
        const animes = response.data;
        let cards = '';
        animes.forEach(m => cards += showCards(m));
        const animeContainer = document.querySelector('.anime-container');
        animeContainer.innerHTML = cards;

        // ketika tombol detail di klik
        const modalDetailButton = document.querySelectorAll('.modal-detail-button');
        modalDetailButton.forEach(btn => {
            btn.addEventListener('click', function() {
                const animeid = this.dataset.animeid;
                console.log(animeid);
                fetch("https://api.jikan.moe/v4/anime/"+animeid)
                .then(response => response.json())
                .then(m => {
                    console.log(m);
                    const animeDetail = showAnimeDetails(m.data);
                    const modalBody = document.querySelector('.modal-body');
                    modalBody.innerHTML = animeDetail;
                })
            })
        })
    });
})

function showCards(m){
    return `<div class="col-md-4 my-5">
                <div class="card">
                    <img src="${m.images.jpg.image_url}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${m.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#animeDetailModal" data-animeid="${m.mal_id}">Show Details</a>
                    </div>
                </div>
            </div>`;
}


function showAnimeDetails(m){
    return `
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <img src="${m.images.jpg.image_url}" class="img-fluid">
            </div>
            <div class="col-md">
                <ul class="list-group">
                    <li class="list-group-item"><h4>${m.title}</h4></li>
                    <li class="list-group-item"><strong>Episode : </strong> ${m.episodes}</li>
                    <li class="list-group-item"><strong>Score : </strong>${m.score}</li>
                    <li class="list-group-item">
                        <h4>Sinopsis</h4>
                        <hr>
                        <p>${m.synopsis}</p>
                    </li>
                    
                </ul>
            </div>
        </div>
    </div>
    `;
}