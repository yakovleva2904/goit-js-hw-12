import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchPhotos = (searchedQuery, page) => {
  
  const axiosOptions = {
    params: {
      key: '45763885-c72d1bc3425850e6a878d2d7a',
      q: searchedQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      page: page,
      per_page: 15,
      safesearch: true,
    },
  };

  return axios.get('', axiosOptions);
};