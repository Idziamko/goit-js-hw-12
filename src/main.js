import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

// DOM элементы
const form = document.querySelector('.form');
const searchInput = document.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

// Глобальные переменные для пагинации
let searchQuery = '';
let currentPage = 1;
const perPage = 15;

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();

  searchQuery = searchInput.value.trim();

  if (searchQuery === '') {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  // При новом поиске скидываем страницу на 1 и очищаем интерфейс
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, currentPage);

    if (data.hits.length === 0) {
      hideLoader();
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    hideLoader();

    // Проверяем, есть ли смысл показывать кнопку "Load more"
    const totalPages = Math.ceil(data.totalHits / perPage);
    if (currentPage >= totalPages) {
      // Если результаты закончились уже на 1-й странице
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }

    searchInput.value = '';
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
    console.error('Error fetching images:', error);
  }
}

async function onLoadMore() {
  currentPage++;

  // Прячем кнопку и показываем лоадер во время загрузки
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, currentPage);

    createGallery(data.hits);
    hideLoader();

    smoothScroll();

    // Проверяем, достигли ли мы конца коллекции
    const totalPages = Math.ceil(data.totalHits / perPage);
    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        color: 'blue', // Используем синий тост для информационного сообщения
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong while loading more images!',
      position: 'topRight',
    });
    console.error('Error loading more images:', error);
  }
}

function smoothScroll() {
  // Находим первую карточку в галерее, чтобы узнать её высоту
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    // getBoundingClientRect() возвращает объект с размерами элемента
    const itemHeight = galleryItem.getBoundingClientRect().height;

    // Прокручиваем страницу на две высоты карточки
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  }
}
