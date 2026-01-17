import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

        const currentList = state[listName];
        const exists = currentList.some(i => i.id === item.id);

        return {
          [listName]: exists 
            ? currentList.filter(i => i.id !== item.id) 
            : [...currentList, item]
        };
      }),

      
      clearCategory: (category) => set({ [`my${category.charAt(0).toUpperCase() + category.slice(1)}s`]: [] })
    }),
    {
      name: 'media-tracker-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);