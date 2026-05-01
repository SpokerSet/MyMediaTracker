import axios from 'axios';
import { OMDB_API_KEY, OMDB_BASE_URL } from '../constants/config';
import { OmdbSearchResult, OmdbDetail } from '../types/movie';

export const searchMovies = async (query: string): Promise<OmdbSearchResult[]> => {
  const response = await axios.get(OMDB_BASE_URL, {
    params: { apikey: OMDB_API_KEY, s: query },
  });

  if (response.data.Response === 'True') {
    return response.data.Search || [];
  }
  throw new Error(response.data.Error || 'Search failed');
};

export const getMovieDetails = async (imdbID: string): Promise<OmdbDetail> => {
  const response = await axios.get(OMDB_BASE_URL, {
    params: { apikey: OMDB_API_KEY, i: imdbID, plot: 'full' },
  });

  if (response.data.Response === 'True') {
    return response.data;
  }
  throw new Error(response.data.Error || 'Failed to fetch details');
};