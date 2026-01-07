import { create } from 'zustand';

export const useStore = create((set) => ({
  myMovies: [],
  myBooks: [],
  myGames: [],

  loadData: async () => {
    console.log("Стор готов (без сохранения)");
  },

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
}));