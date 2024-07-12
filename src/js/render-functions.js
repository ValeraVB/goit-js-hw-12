import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function clearGallery() {
  const gallery = document.querySelector('#gallery');
  gallery.innerHTML = '';
}

export function displayErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topCenter',
  });
}

export function displayNoResultsMessage() {
  iziToast.info({
    title: 'Info',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topCenter',
  });
}

export function showLoader() {
  const loaderContainer = document.getElementById('loaderContainer');
  if (loaderContainer) {
    loaderContainer.style.display = 'block'; // Показуємо завантажувач
  }
}

export function hideLoader() {
  const loaderContainer = document.getElementById('loaderContainer');
  if (loaderContainer) {
    loaderContainer.style.display = 'none'; // Приховуємо завантажувач
  }
}
