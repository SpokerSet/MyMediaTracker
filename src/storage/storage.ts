import AsyncStorage from '@react-native-async-storage/async-storage';
import { MovieItem } from '../types/movie';

const STORAGE_KEY = '@usePopcorn:movies';

export const loadMovies = async (): Promise<MovieItem[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load movies:', error);
    return [];
  }
};

export const saveMovies = async (movies: MovieItem[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } catch (error) {
    console.error('Failed to save movies:', error);
  }
};