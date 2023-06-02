const moviesContainer = document.querySelector('.movies-container'); 

const LOCALE_VIEW = 'view'
const selectedView = localStorage.getItem(LOCALE_VIEW) || 'grid';
changeView(selectedView);

function changeView(view) {
  localStorage.setItem(LOCALE_VIEW, view);
  if (view === 'list') {
    moviesContainer.classList.remove('grid-view')
    moviesContainer.classList.add(`${view}-view`)
  }
  moviesContainer.classList.remove('list-view')
  moviesContainer.classList.add(`${view}-view`)
}

async function fetchMovies() {
  const response = await fetch(
    `https://desfarik.github.io/star-wars/api/film/all.json`
  );
  let movies = await response.json();
  return movies;
}

const LOCALE_SORTING = 'sorting'
const selectedSorting = localStorage.getItem(LOCALE_SORTING) || 'episode_number_asc';
renderMovies(selectedSorting)

function onSortingChange(selectedObject) {
  let sortingValue = selectedObject.value;
  localStorage.setItem(LOCALE_SORTING, sortingValue);
  renderMovies(sortingValue)
}

async function renderMovies(sortingValue) {
  let listOfMovies = await fetchMovies();

  function sorting() {
    if (sortingValue === 'episode_number_asc') {
      listOfMovies.sort((a, b) => a.episode_id > b.episode_id ? 1 : -1);
    } else if (sortingValue === 'episode_number_desc') {
      listOfMovies.sort((a, b) => a.episode_id > b.episode_id ? -1 : 1);
    }  else if (sortingValue === 'episode_year_asc') {
      listOfMovies.sort((a, b) => a.release_date > b.release_date ? 1 : -1);
    } else if (sortingValue === 'episode_year_desc') {
      listOfMovies.sort((a, b) => a.release_date > b.release_date ? -1 : 1);
    } else if (sortingValue === 'favorites') {
      let favorites = JSON.parse(localStorage.getItem("favorites"));
      let favoriteList = [];
      for(let movie in listOfMovies) {
        for(let favorite of favorites) {
          if(listOfMovies[movie].episode_id === favorite) {
            favoriteList.push(listOfMovies[movie]);
          }
        }
      }
      listOfMovies = favoriteList;
    }
  }
  sorting(sortingValue);


moviesContainer.innerHTML = '';
listOfMovies.forEach(element => {
  const movieItem = document.createElement('div');
  movieItem.classList.add('movie-item');
  movieItem.innerHTML = `
  <button onclick="addToFavorites(${element.episode_id})" class="favorites-button" id="favorites-button${element.episode_id}"></button>
  <a href="./episode.html?episode=${element.episode_id}" class="episode-link">
        <img src="images/episode${element.episode_id}.jpeg" alt="${element.title}" class="movie-poster">
        <div class="movie-details">
          <div class="movie-number">Episode ${element.episode_id}</div>
          <div class="movie-title">${element.title}</div>
          <div class="movie-year">Year: ${element.release_date.slice(0,4)}</div>
        </div>
  </a>
  `
  moviesContainer.append(movieItem);
})
selectedFavoriteButton()
}


let timerId;
function timeToPremiere() {
  const nextEpisodeDate = new Date(2023, 11, 20);

  const diff = nextEpisodeDate - new Date();
  if (diff <= 0) {
    clearInterval(timerId);
  }
  const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
  const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
  const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
  const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;

  _days.textContent = days;
  _hours.textContent = hours;
  _minutes.textContent = minutes;
  _seconds.textContent = seconds;
}
  const _days = document.querySelector('.timer-days');
  const _hours = document.querySelector('.timer-hours');
  const _minutes = document.querySelector('.timer-minutes');
  const _seconds = document.querySelector('.timer-seconds');
  timeToPremiere();
timerId = setInterval(timeToPremiere, 1000);


const LOCALE_FAVORITES = 'favorites';
const storedFavoriteEpisode = JSON.parse(localStorage.getItem(LOCALE_FAVORITES)) || [];
listOfFavorites(storedFavoriteEpisode);

function listOfFavorites(favorites) {
    localStorage.setItem(LOCALE_FAVORITES, JSON.stringify(favorites));
}

function addToFavorites(id) {
  let favButton = document.querySelector(`#favorites-button${id}`);
  let favorites = JSON.parse(localStorage.getItem("favorites"));
  if(favorites.includes(id)) {
    let reducedFav = favorites.filter((favorite) => favorite !== id);
    localStorage.setItem(LOCALE_FAVORITES, JSON.stringify(reducedFav));
    favButton.classList.remove('selected-favorite')
  } else {
    favorites.push(id)
    localStorage.setItem(LOCALE_FAVORITES, JSON.stringify(favorites));
    favButton.classList.add('selected-favorite')
  }
 
}

function selectedFavoriteButton() {
  let favorites = JSON.parse(localStorage.getItem("favorites"));

  for(let favorite of favorites) {
    let favButton = document.querySelector(`#favorites-button${favorite}`);
    favButton.classList.add('selected-favorite')
  }
}

function showFavorites() {
  renderMovies('favorites');
}
function showAll() {
  renderMovies(localStorage.getItem(LOCALE_SORTING));
}