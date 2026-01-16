import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      myMovies: [],
      myBooks: [],
      myGames: [],
      toggleItem: (item, category) => set((state) => {
        const listName = 
          category === 'movie' ? 'myMovies' : 
          category === 'book' ? 'myBooks' : 'myGames';
        const currentList = state[listName] || [];
        const isExist = currentList.some(i => i.id === item.id);
        return {
          [listName]: isExist 
            ? currentList.filter(i => i.id !== item.id) 
            : [...currentList, item]
        };
      }),
    }),
    
  )
);