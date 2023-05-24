const moviesContainer = document.querySelector('.movies-container'); 

const LOCALE_THEME = 'theme'
const storedLocalTheme = localStorage.getItem(LOCALE_THEME) || 'dark';
changeTheme(storedLocalTheme);

function changeTheme(theme) {
  document.body.className = `${theme}-theme`;
  localStorage.setItem(LOCALE_THEME, theme);
}

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
let sortingValue = '';

const LOCALE_SORTING = 'sorting'
const selectedSorting = localStorage.getItem(LOCALE_SORTING) || 'episode_number_asc';
renderMovies(selectedSorting)

function onSortingChange(selectedObject) {
  sortingValue = selectedObject.value;
  renderMovies(sortingValue)
  localStorage.setItem(LOCALE_SORTING, sortingValue);
}
console.log()

async function renderMovies() {
  const listOfMovies = await fetchMovies();

  if (sortingValue === 'episode_number_asc' || sortingValue === '') {
    listOfMovies.sort((a, b) => a.episode_id > b.episode_id ? 1 : -1);
  } else if (sortingValue === 'episode_number_desc') {
    listOfMovies.sort((a, b) => a.episode_id > b.episode_id ? -1 : 1);
  }  else if (sortingValue === 'episode_year_asc') {
    listOfMovies.sort((a, b) => a.release_date > b.release_date ? 1 : -1);
  } else if (sortingValue === 'episode_year_desc') {
    listOfMovies.sort((a, b) => a.release_date > b.release_date ? -1 : 1);
  }

  moviesContainer.innerHTML = '';
  listOfMovies.forEach(element => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieItem.innerHTML =
    `
          <img src="images/episode${element.episode_id}.jpeg" alt="${element.title}" class="movie-poster">
          <div class="movie-details">
            <div class="movie-name">Episode ${element.episode_id} &mdash; ${element.title}</div>
            <div class="movie-year">(${element.release_date.slice(0,4)})</div>
          </div>
    `
    moviesContainer.append(movieItem);
  })
  }

