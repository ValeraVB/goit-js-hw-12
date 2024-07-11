import { fetchImages } from './js/pixabay-api.js';
import {
  clearGallery,
  displayErrorToast,
  displayNoResultsMessage,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const gallery = document.querySelector('#gallery');
const lightbox = new SimpleLightbox('.gallery a');
const loadMoreBtn = document.querySelector('#loadMoreBtn');
const endMessage = document.querySelector('#endMessage');

let searchTerm = '';
let currentPage = 1;
let totalHits = 0;
let cardHeight = 0; // Висота карточки галереї

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    displayErrorToast('Будь ласка, введіть пошуковий запит');
    return;
  }

  clearGallery();
  showLoader();

  try {
    const { images, total } = await fetchImages(searchTerm, currentPage);

    hideLoader();

    totalHits = total;

    if (images.length === 0) {
      displayNoResultsMessage();
      return;
    }

    images.forEach(image => {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');
      galleryItem.innerHTML = `
        <a href="${image.largeImageURL}" data-lightbox="image">
          <img src="${image.webformatURL}" alt="${image.tags}">
          <div class="details">
            <p>Likes: ${image.likes}</p>
            <p>Views: ${image.views}</p>
            <p>Comments: ${image.comments}</p>
            <p>Downloads: ${image.downloads}</p>
          </div>
        </a>
      `;
      gallery.appendChild(galleryItem);
    });

    lightbox.refresh(); // Оновлюємо SimpleLightbox після додавання нових елементів

    // Отримуємо висоту першої карточки
    if (gallery.children.length > 0) {
      const firstCard = gallery.children[0];
      const rect = firstCard.getBoundingClientRect();
      cardHeight = rect.height;
    }

    // Плавне прокручування сторінки
    window.scrollBy({
      top: cardHeight * 2, // Прокручуємо на дві висоти карточки
      behavior: 'smooth', // Плавна анімація
    });

    // Перевіряємо, чи показувати кнопку "Load more"
    if (images.length < 15 || gallery.children.length >= totalHits) {
      loadMoreBtn.style.display = 'none';
      endMessage.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'block';
      endMessage.style.display = 'none';
    }
  } catch (error) {
    hideLoader();
    console.error('Помилка пошуку зображень:', error);
    displayErrorToast(
      'Не вдалося отримати зображення. Будь ласка, спробуйте ще раз пізніше.'
    );
  }
});

loadMoreBtn.addEventListener('click', async function () {
  currentPage++;

  showLoader();

  try {
    const { images } = await fetchImages(searchTerm, currentPage);

    hideLoader();

    if (images.length === 0) {
      displayNoResultsMessage();
      return;
    }

    images.forEach(image => {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');
      galleryItem.innerHTML = `
        <a href="${image.largeImageURL}" data-lightbox="image">
          <img src="${image.webformatURL}" alt="${image.tags}">
          <div class="details">
            <p>Likes: ${image.likes}</p>
            <p>Views: ${image.views}</p>
            <p>Comments: ${image.comments}</p>
            <p>Downloads: ${image.downloads}</p>
          </div>
        </a>
      `;
      gallery.appendChild(galleryItem);
    });

    lightbox.refresh(); // Оновлюємо SimpleLightbox після додавання нових елементів

    // Плавне прокручування сторінки
    window.scrollBy({
      top: cardHeight * 2, // Прокручуємо на дві висоти карточки
      behavior: 'smooth', // Плавна анімація
    });

    // Перевіряємо, чи показувати кнопку "Load more" або повідомлення про кінець
    if (gallery.children.length >= totalHits) {
      loadMoreBtn.style.display = 'none';
      endMessage.style.display = 'block';
    }
  } catch (error) {
    hideLoader();
    console.error('Помилка завантаження додаткових зображень:', error);
    displayErrorToast(
      'Не вдалося завантажити додаткові зображення. Будь ласка, спробуйте ще раз пізніше.'
    );
  }
});
