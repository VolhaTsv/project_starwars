const LOCALE_THEME = 'theme';
const storedLocalTheme = localStorage.getItem(LOCALE_THEME) || 'dark';
changeTheme(storedLocalTheme);

function changeTheme(theme) {
  document.body.className = `${theme}-theme`;
  localStorage.setItem(LOCALE_THEME, theme);
}


const RU = {
  'days': 'дней',
  'hours': 'часов',
  'minutes': 'минут',
  'seconds': 'секунд',
  'Sort by': 'Сортировать по',
  'Time to premiere': 'До премьеры осталось',
  'Star Wars: Rogue Squadron': 'Звёздные войны: Эскадрилья «Изгой»',
  'Episodes:': 'Эпизоды:',
  // 'Episode number': 'Номеру эпизода',
  // 'Year': 'Году выхода',
};
const EN = {
  'days': 'days',
  'hours': 'hours',
  'minutes': 'minutes',
  'seconds': 'seconds',
  'Sort by': 'Sort by',
  'Time to premiere': 'Time to premiere',
  'Star Wars: Rogue Squadron': 'Star Wars: Rogue Squadron',
  'Episodes:': 'Episodes:',
  // 'Episode number': 'Episode number',
  // 'Year': 'Year',

};

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

