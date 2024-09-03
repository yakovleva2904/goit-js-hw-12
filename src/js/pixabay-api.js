const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotos = searchedQuery => {
  const urlParams = new URLSearchParams({
    key: '45763885-c72d1bc3425850e6a878d2d7a',
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`${BASE_URL}?${urlParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};