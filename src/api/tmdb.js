import axios from 'axios';

const API_KEY = '54b3c5b386030268e11e866ea34e27fb'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ru-RU', // Сразу ставим русский язык
  },
});

export const searchMovies = async (query) => {
  try {
    const response = await tmdb.get('/search/movie', {
      params: { query },
    });
    return response.data.results; // Возвращает массив сырых данных
  } catch (error) {
    console.error("Ошибка при поиске фильмов:", error);
    return [];
  }
};

export default tmdb;