const contentContainer = document.querySelector('.content-container')
let characterArrayKey = +(location.search.split('=').pop());
console.log(characterArrayKey)

async function getCharacterData() {
    const response = await fetch(
        `https://desfarik.github.io/star-wars/api/people/${characterArrayKey + 1}.json`
      );
    let character = await response.json();
    console.log(character);
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
    console.log(characterData)
    contentContainer.innerHTML = `
        <div class="character-container">
            <img src="${characterData.image}" alt="${characterData.name}" class="character-image">
            <div class="character-info">
                <h2 class="character-name">${characterData.name}</h4>
                <div>Date of birth: ${characterData.birth_year}</div>
                <div>Species: ${characterData.species}</div>
                <div>Gender: ${characterData.gender}</div>
                <div class="character-homeworld">Homeworld: <span>${characterData.homeworld}</span></div>
                </div>
            </div>
        </div>
    `
    generateMovies()
}
renderCharacter()

async function characterMovies() {
    let movies = await fetchMovies();
    console.log(movies)
    let listOfMovies = [];
    for(let i = 0; i< movies.length; i++) {
        if(movies[i].characters.includes(characterArrayKey.toString())) {
            listOfMovies.push(i)
        }
    }
    console.log(listOfMovies)
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
    console.log(movies[element].title)
    moviesContainer.append(episodeItem)
    })
    
}

