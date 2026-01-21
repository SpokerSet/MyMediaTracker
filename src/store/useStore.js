// src/store/useStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // Списки теперь инициализированы всегда
      myMovies: [],
      myBooks: [],
      myGames: [],

      // Универсальный метод
      toggleItem: (item, category) => set((state) => {
        // Определяем, какой массив менять
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

      // Метод для полной очистки (на всякий случай)
      clearCategory: (category) => set({ [`my${category.charAt(0).toUpperCase() + category.slice(1)}s`]: [] })
    }),
    {
      name: 'media-tracker-v1', // Версия v1 поможет избежать старых ошибок
      storage: createJSONStorage(() => localStorage),
    }
  )
);