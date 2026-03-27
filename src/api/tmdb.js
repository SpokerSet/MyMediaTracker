import axios from 'axios';

const API_KEY = '54b3c5b386030268e11e866ea34e27fb'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query) => {
  if (!query) return [];
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, query, language: 'ru-RU' },
    });
    return response.data.results;
  } catch (error) {
    console.error("API Error", error);
    return [];
  }
};