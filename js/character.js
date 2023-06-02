const contentContainer = document.querySelector('.content-container')
let characterArrayKey = +(location.search.split('=').pop());

async function getCharacterData() {
    const response = await fetch(
        `https://desfarik.github.io/star-wars/api/people/${characterArrayKey + 1}.json`
      );
    let character = await response.json();
    return character;
}

async function fetchMovies() {
    const response = await fetch(
      `https://desfarik.github.io/star-wars/api/film/all.json`
    );
    let movies = await response.json();
    return movies;
}
fetchMovies()

async function renderCharacter() {
    let characterData = await getCharacterData();

    contentContainer.innerHTML = `
        <div class="character-container">
            <img src="${characterData.image}" alt="${characterData.name}" class="character-image">
            <div class="character-info">
                <h2 class="character-name">${characterData.name}</h2>
                <div>Date of birth: <span>${characterData.birth_year}</span></div>
                <div>Species: <span>${characterData.species}</span></div>
                <div>Gender: <span>${characterData.gender}</span></div>
                <div class="character-homeworld">Homeworld: <span>${characterData.homeworld}</span></div>
                <div class="character-appearance" data-lang-key="Appearance">Appearance</div>
                <div>Eye color: <span>${characterData.eye_color}</span></div>
                <div>Hair color: <span>${characterData.hair_color}</span></div>
                <div>Skin color: <span>${characterData.skin_color}</span></div>
                <div>Height: <span>${characterData.height}</span></div>
                <div>Weight: <span>${characterData.mass}</span></div>
            </div>
        </div>
    `
    generateMovies()
}
renderCharacter()

async function characterMovies() {
    let movies = await fetchMovies();
    let listOfMovies = [];
    for(let i = 0; i< movies.length; i++) {
        if(movies[i].characters.includes(characterArrayKey.toString())) {
            listOfMovies.push(i)
        }
    }
    return listOfMovies;
    
}
async function generateMovies() {
    let moviesContainer = document.querySelector('.character-filmography-list');
    let movies = await fetchMovies();
    let listOfMovies = await characterMovies();
 

    listOfMovies.forEach(element =>{
        let episodeItem = document.createElement('div');
        episodeItem.classList.add('episode-item');
        episodeItem.innerHTML = `
        <a href="./episode.html?episode=${movies[element].episode_id}" class="character-movie-link">
            <img src="images/episode${movies[element].episode_id}.jpeg" class="character-movie-image">
            <p>${movies[element].title}</p>
        </a>
    `
    moviesContainer.append(episodeItem)
    })
    
}

