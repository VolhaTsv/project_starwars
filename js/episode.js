const contentContainer = document.querySelector('.content-container')
let episodeArrayKey = +(location.search.split('=').pop());

async function getEpisodeID() {
    const response = await fetch(
      `https://desfarik.github.io/star-wars/api/film/all.json`
    );
    let movies = await response.json();

    let moviesIds = movies.map((element)=> element.episode_id);
    let selectedEpisode = moviesIds[episodeArrayKey - 1];
    return selectedEpisode;
}

async function fetchPeople() {
    const response = await fetch(
        `https://desfarik.github.io/star-wars/api/people/all.json`
      );
    let people = await response.json();
    return people;
 }
  
async function renderEpisode() {
let episode = await fetchEpisode();
contentContainer.innerHTML = `
<div class="episode-container">
    <img src="images/episode${episode.episode_id}.jpeg" alt="${episode.title}" class="episode-poster">
    <div class="episode-details">
        <h3 class="episode-no">Episode ${episode.episode_id}</h3>
        <h2 class="episode-name">${episode.title}</h4>
        <div class="episode-producers">Producer(s): ${episode.producer}</div>
        <div class="episode-director">Director: ${episode.director}</div>
        <div class="episode-release-date">Year of release &mdash; ${episode.release_date.slice(0,4)}</div>
        <div class="episode-description">${episode.opening_crawl}</div>
    </div>
</div>
<h2 class="characters-heading" data-lang-key="Characters">Characters</h2>
<div class="characters"></div>
`
await listOfCharacters(0, 10)

}

async function fetchEpisode() {
    const episodeId = await getEpisodeID();
    const response = await fetch(`https://desfarik.github.io/star-wars/api/film/${episodeId}.json`);
    const episode = await response.json();
    return episode;
}

function spinner() {
    const loadingElement = document.querySelector('.characters');

    loadingElement.classList.add('spinner');
    setTimeout(function(){
        loadingElement.classList.remove('spinner');
    }, 1500)
}

async function listOfCharacters() {
    const episodeId = await getEpisodeID();
    const people = await fetchPeople();
    const episode = await fetchEpisode(episodeId);
    const peopleId = episode.characters;
    const charactersContainer = document.querySelector('.characters');

    spinner()

    for(let i = 0; i < people.length; i++) {
        const charactersList = document.createElement('div');
        charactersList.classList.add('character-item');

        charactersList.innerHTML = `
        <a href="./character.html?character=${peopleId[i]}" class="character-link">
        <img src="${people[peopleId[i]].image}" alt="${people[peopleId[i]].name}" class="character-image">
        <div>
            <div class="character-name">${people[peopleId[i]].name}</div>
            <div class="character-details">
                <div>Born: ${people[peopleId[i]].birth_year}</div>
                <div>Species: ${people[peopleId[i]].species}</div>
                <div>Gender: ${people[peopleId[i]].gender}</div>
                <div>Homeworld: ${people[peopleId[i]].homeworld}</div>
            </div>
        </div>
        </a>
        `
        charactersContainer.append(charactersList);
    }
}
renderEpisode()

