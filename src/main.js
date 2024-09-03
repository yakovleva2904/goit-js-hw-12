import { createGalleryCardTemplate } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';

import axios from 'axios';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
loader.classList.add('is-hidden');

const onSearchFormSubmit = event => {
  event.preventDefault();
  const searchedValue = searchFormEl.elements.user_query.value.trim();
  loader.classList.remove('is-hidden');

  if (!searchedValue) {
    loader.classList.add('is-hidden');
    iziToast.warning({
      message: 'Please fill in the search field!',
      position: 'topRight',
    });
    return;
  }

  fetchPhotos(searchedValue)
    .then(data => {
      loader.classList.add('is-hidden');
      if (data.hits.length === 0) {
        iziToast.error({
         message: 'Sorry, there are no images matching your search query. Please try again!',
         position: 'topRight',
        });

      galleryEl.innerHTML = '';
      searchFormEl.reset();

      return;
      }

  const galleryCardsTemplate = data.hits.map(imgDetails => createGalleryCardTemplate(imgDetails)).join('');

  galleryEl.innerHTML = galleryCardsTemplate;

  const lightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    overlayOpacity: 0.8,
  });
        
  searchFormEl.reset();
  lightBox.refresh();
    
  })
  .catch(err => {
      console.log(err);
  });
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);

