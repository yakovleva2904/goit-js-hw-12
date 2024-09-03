import { createGalleryCardTemplate } from './js/render-functions.js';
import { fetchPhotos } from './js/pixabay-api.js';

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
loader.classList.add('is-hidden');
const loadMoreBtnEl = document.querySelector('.js-load-more');
let currentPage = 1;
let searchedValue = '';



const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

const onSearchFormSubmit = async event => {

  try {
    event.preventDefault();
    searchedValue = searchFormEl.elements.user_query.value.trim();
    currentPage = 1;
    loader.classList.remove('is-hidden');

    if (!searchedValue) {
      loader.classList.add('is-hidden');
      iziToast.warning({
        message: 'Please fill in the search field!',
        position: 'topRight',
      });
      return;
    }

    const response = await fetchPhotos(searchedValue, currentPage);

    if (response.data.hits.length === 0) {
      loader.classList.add('is-hidden');
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });

      galleryEl.innerHTML = '';
      searchFormEl.reset();
      return;
    }

    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');
    
    galleryEl.innerHTML = galleryCardsTemplate;

    loadMoreBtnEl.classList.remove('is-hidden');
    loader.classList.add('is-hidden');
    searchFormEl.reset();
    lightBox.refresh();


  } catch (err) {
    loader.classList.add('is-hidden');
    iziToast.error({
      message: `Ooops! Error: ${err}`,
      position: 'topRight',
    });
  }
};

const onLoadMoreBtnClick = async event => {
  try {
    currentPage++;
    loader.classList.remove('is-hidden');
    const response = await fetchPhotos(searchedValue, currentPage);

    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);

    if (currentPage === Math.ceil(response.data.totalHits / 15)) {
      loadMoreBtnEl.classList.add('is-hidden');

      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
    smoothScroll();
    loader.classList.add('is-hidden');
    searchFormEl.reset();
    lightBox.refresh();

  } catch (err) {
    loader.classList.add('is-hidden');
    iziToast.error({
      message: `Ooops! Error: ${err}`,
      position: 'topRight',
    });
  }
};

function smoothScroll() {
  const firstCard = document.querySelector('.gallery-card');
  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
  
//console.log(searchFormEl);