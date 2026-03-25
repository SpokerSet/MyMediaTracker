import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStore = create(
  persist(
    (set) => ({
      myMovies: [],
      myBooks: [],
      myGames: [],

      toggleItem: (item, category) => set((state) => {
        const listMap = {
          movie: 'myMovies',
          book: 'myBooks',
          game: 'myGames'
        };
        const listName = listMap[category];
        if (!listName) return state;

        const currentList = state[listName] || [];
        const isExist = currentList.some(i => i.id === item.id);

        return {
          [listName]: isExist 
            ? currentList.filter(i => i.id !== item.id) 
            : [...currentList, { ...item, type: category }]
        };
      }),
    }),
    {
      name: 'media-storage',
      storage: createJSONStorage(() => AsyncStorage), // Используем AsyncStorage для Arch/Mobile
    }
  )
);