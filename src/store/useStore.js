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
        const listName = category === 'movie' ? 'myMovies' : category === 'book' ? 'myBooks' : 'myGames';
        const isExist = state[listName].some(i => i.id === item.id);
        
        if (isExist) {
          return { [listName]: state[listName].filter(i => i.id !== item.id) };
        } else {
          return { [listName]: [...state[listName], item] };
        }
      }),
    }),
    { name: 'media-tracker-storage', storage: createJSONStorage(() => AsyncStorage) }
  )
);