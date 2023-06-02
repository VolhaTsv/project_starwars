const LOCALE_THEME = 'theme';
const storedLocalTheme = localStorage.getItem(LOCALE_THEME) || 'dark';
changeTheme(storedLocalTheme);

function changeTheme(theme) {
  document.body.className = `${theme}-theme`;
  localStorage.setItem(LOCALE_THEME, theme);
}

const DICTIONARIES = {
  'ru': RU,
  'en': EN,
}

const LOCALE_LANG = 'language';
const selectedLang = localStorage.getItem(LOCALE_LANG) || 'eng';
changeLang(selectedLang);

function changeLang(lang) {
  const dictionary = DICTIONARIES[lang];
  localStorage.setItem('language', lang);
  document.querySelectorAll('[data-lang-key]')
    .forEach(element => {
      const translateKey = element.dataset.langKey;
      element.textContent = dictionary[translateKey];
    })
}

