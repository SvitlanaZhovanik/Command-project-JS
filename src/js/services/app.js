import { showAlert, showError } from '../vendors/alerts';
import ALERTS from '../data/alertsMsgs';

export default class Application {
  #API_KEY = '6759d249684e99a49309af19f6af0ff2';
  #BASE_API_URL = 'https://api.themoviedb.org/3';
  #CATEGORIES = {
    topRated: 'movie/top_rated',
  };

  constructor({ makeMoviesCards, makeMovieDetails, makeHeaderForm, makeLibraryBtns, refs, CSS }) {
    this.makeMoviesCards = makeMoviesCards;
    this.makeMovieDetails = makeMovieDetails;
    this.makeHeaderForm = makeHeaderForm;
    this.makeLibraryBtns = makeLibraryBtns;
    this.page = 1;
    this.refs = refs;
    this.CSS = CSS;
  }

  // Методы лучше записывать как стрелочные функции, в таком случае не теряется контекст, если метод передается как коллбек-функция

  loadListeners = () => {
    this.refs.navigation.addEventListener('click', this.onNavigationListClick);
    // Сюда добавляем слушатели событий, которые должны подключиться при первой загрузке страницы (например клики на кнопки HOME и My Library)
  };

  init = () => {
    // Сюда добавляем все действия, которые должны произойти при загрузке стартовой страницы, например слушатели событий, отрисовка популярных фильмов.
    this.loadListeners();
  };

  // Ниже можно добавлять методы, которые касаются работы с API

  // Пример ассинхронной функции

  // fecthTopRatedFilms = async () => {
  //   try {
  //     const urlParams = new URLSearchParams({
  //       api_key: this.#API_KEY,
  //       language: 'en-US',
  //       page: this.page,
  //     });

  //     const res = await fetch(`${this.#BASE_API_URL}/${this.#CATEGORIES.topRated}?${urlParams}`); // await
  //     if (res.ok) {
  //       console.log('OK');
  //       return res.json();
  //     }
  //     console.log('No OK');
  //     return Promise.reject({
  //       title: res.status,
  //       message: res.statusText,
  //     });
  //   } catch (error) {
  //     console.log('No OK. error');
  //     return Promise.reject({
  //       title: error.message,
  //     });
  //   }
  // };

  // Пример стандартной фукнции (метода)

  fecthTopRatedFilms = () => {
    const urlParams = new URLSearchParams({
      api_key: this.#API_KEY,
      language: 'en-US',
      page: this.page,
    });

    fetch(`${this.#BASE_API_URL}/${this.#CATEGORIES.topRated}?${urlParams}`)
      .then(res => {
        if (res.ok) {
          console.log('OK', res);
          return res.json();
        }
        console.log('No OK', res, res.status, res.statusText);
        return Promise.reject({
          title: res.status,
          message: res.statusText,
        });
      })
      .catch(err => {
        console.log('No OK. error', err);
        return Promise.reject({
          title: err.message,
        });
      });
  };

  // Ниже можно добавлять методы, которые касаются работы с DOM

  onNavigationListClick = e => {
    if (e.target.tagName !== 'BUTTON' || e.target.classList.contains(this.CSS.ACCENT)) {
      return;
    }
    if (e.target.classList.contains('js-home-btn')) {
      this.refs.homeBtn.classList.add(this.CSS.ACCENT);
      this.refs.myLibraryBtn.classList.remove(this.CSS.ACCENT);
      this.refs.header.classList.add('home');
      this.refs.header.classList.remove('library');
      const headerFormMarkup = this.makeHeaderForm();
      this.refs.headerBottomContainer.innerHTML = headerFormMarkup;
      return;
    }

    if (e.target.classList.contains('js-mylibrary-btn')) {
      this.refs.myLibraryBtn.classList.add(this.CSS.ACCENT);
      this.refs.homeBtn.classList.remove(this.CSS.ACCENT);
      this.refs.header.classList.add('library');
      this.refs.header.classList.remove('home');
      const libraryBtnMarkup = this.makeLibraryBtns();
      this.refs.headerBottomContainer.innerHTML = libraryBtnMarkup;
      return;
    }
  };

  // Ниже можно добавлять методы, которые касаются обработки событий
}