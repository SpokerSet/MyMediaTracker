import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create(
  persist(
    (set) => ({
      myMovies: [],
      toggleMovie: (movie) => set((state) => {
        const exists = state.myMovies.some((m) => m.id === movie.id);
        return {
          myMovies: exists
            ? state.myMovies.filter((m) => m.id !== movie.id)
            : [...state.myMovies, movie],
        };
      }),
    }),
    {
      name: 'movies-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);