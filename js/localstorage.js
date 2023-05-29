const LOCALE_THEME = 'theme';
const storedLocalTheme = localStorage.getItem(LOCALE_THEME) || 'dark';
changeTheme(storedLocalTheme);

function changeTheme(theme) {
  document.body.className = `${theme}-theme`;
  localStorage.setItem(LOCALE_THEME, theme);
}

