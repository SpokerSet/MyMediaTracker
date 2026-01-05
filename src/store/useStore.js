import { create } from 'zustand';

export const useStore = create((set) => ({
  myMovies: [],
  toggleItem: (item, category) => set((state) => {
    const isExist = state.myMovies.some(i => i.id === item.id);
    return {
      myMovies: isExist 
        ? state.myMovies.filter(i => i.id !== item.id) 
        : [...state.myMovies, item]
    };
  }),
}));