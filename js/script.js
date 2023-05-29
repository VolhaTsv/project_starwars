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
  console.log(movies)
  return movies;
}

const LOCALE_SORTING = 'sorting'
const selectedSorting = localStorage.getItem(LOCALE_SORTING) || 'episode_number_asc';
renderMovies(selectedSorting)

function onSortingChange(selectedObject) {
  let sortingValue = selectedObject.value;
  console.log(selectedObject.value)
  localStorage.setItem(LOCALE_SORTING, sortingValue);
  renderMovies(sortingValue)
}

async function renderMovies(sortingValue) {
  const listOfMovies = await fetchMovies();

  function sorting() {
    if (sortingValue === 'episode_number_asc') {
      listOfMovies.sort((a, b) => a.episode_id > b.episode_id ? 1 : -1);
    } else if (sortingValue === 'episode_number_desc') {
      listOfMovies.sort((a, b) => a.episode_id > b.episode_id ? -1 : 1);
    }  else if (sortingValue === 'episode_year_asc') {
      listOfMovies.sort((a, b) => a.release_date > b.release_date ? 1 : -1);
    } else if (sortingValue === 'episode_year_desc') {
      listOfMovies.sort((a, b) => a.release_date > b.release_date ? -1 : 1);
    }
  }
  sorting(sortingValue);


moviesContainer.innerHTML = '';
listOfMovies.forEach(element => {
  const movieItem = document.createElement('div');
  movieItem.classList.add('movie-item');
  movieItem.innerHTML =
  `<a href="./episode.html?episode=${element.episode_id}" class="episode-link">
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

}