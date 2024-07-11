import axios from 'axios';

const apiKey = '44778442-2a526b123707daef27dd3bad3'; // ключ доступу
const baseUrl = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error('Запит завершився з помилкою ' + response.status);
    }

    const total = response.data.totalHits || 0;
    const images = response.data.hits || [];

    return { images, total };
  } catch (error) {
    console.error('Помилка при отриманні даних:', error);
    return { images: [], total: 0 };
  }
}
