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
let cardHeight = 0; // Висота картки галереї

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    displayErrorToast('Please enter a search term');
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
        <div class="detail-row">
          <p>Likes:</p>
          <p>${image.likes}</p>
        </div>
        <div class="detail-row">
          <p>Views:</p>
          <p>${image.views}</p>
        </div>
        <div class="detail-row">
          <p>Comments:</p>
          <p>${image.comments}</p>
        </div>
        <div class="detail-row">
          <p>Downloads:</p>
          <p>${image.downloads}</p>
        </div>
      </div>
    </a>
  `;
      gallery.appendChild(galleryItem);
    });

    lightbox.refresh(); // Оновлюємо SimpleLightbox після додавання нових елементів

    // Отримуємо висоту першої картки
    if (gallery.children.length > 0) {
      const firstCard = gallery.children[0];
      const rect = firstCard.getBoundingClientRect();
      cardHeight = rect.height;
    }

    // Плавне прокручування сторінки
    window.scrollBy({
      top: cardHeight * 2, // Прокручуємо на дві висоти картки
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
    console.error('Error fetching images:', error);
    displayErrorToast('Failed to fetch images. Please try again later.');
  }
});

loadMoreBtn.addEventListener('click', async function () {
  currentPage++;

  showLoader();

  try {
    const { images } = await fetchImages(searchTerm, currentPage);

    hideLoader();

    if (images.length === 0) {
      loadMoreBtn.style.display = 'none';
      endMessage.style.display = 'block';
      return;
    }

    images.forEach(image => {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');
      galleryItem.innerHTML = `
    <a href="${image.largeImageURL}" data-lightbox="image">
      <img src="${image.webformatURL}" alt="${image.tags}">
      <div class="details">
        <div class="detail-row">
          <p>Likes:</p>
          <p>${image.likes}</p>
        </div>
        <div class="detail-row">
          <p>Views:</p>
          <p>${image.views}</p>
        </div>
        <div class="detail-row">
          <p>Comments:</p>
          <p>${image.comments}</p>
        </div>
        <div class="detail-row">
          <p>Downloads:</p>
          <p>${image.downloads}</p>
        </div>
      </div>
    </a>
  `;
      gallery.appendChild(galleryItem);
    });

    lightbox.refresh(); // Оновлюємо SimpleLightbox після додавання нових елементів

    // Плавне прокручування сторінки
    window.scrollBy({
      top: cardHeight * 2, // Прокручиваем на две высоты карточки
      behavior: 'smooth', // Плавная анимация
    });

    // Перевіряємо, чи показувати кнопку "Load more"
    if (gallery.children.length >= totalHits) {
      loadMoreBtn.style.display = 'none';
      endMessage.style.display = 'block';
    }
  } catch (error) {
    hideLoader();
    console.error('Error fetching more images:', error);
    displayErrorToast('Failed to load more images. Please try again later.');
  }
});
