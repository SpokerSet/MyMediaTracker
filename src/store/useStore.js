import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Описываем интерфейсы
interface Item {
  id: string | number;
  title: string;
  // другие поля...
}

type Category = 'movie' | 'book' | 'game';

interface StoreState {
  myMovies: Item[];
  myBooks: Item[];
  myGames: Item[];
  
  // Экшены выносим отдельно для удобства
  actions: {
    toggleItem: (item: Item, category: Category) => void;
    loadData: () => Promise<void>;
  };
}

// Карта соответствия категорий и ключей стора
const CATEGORY_MAP: Record<Category, keyof Omit<StoreState, 'actions'>> = {
  movie: 'myMovies',
  book: 'myBooks',
  game: 'myGames',
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      myMovies: [],
      myBooks: [],
      myGames: [],

      actions: {
        loadData: async () => {
          console.log("Данные загружены из хранилища автоматически");
        },

        toggleItem: (item, category) => set((state) => {
          const key = CATEGORY_MAP[category];
          const list = state[key];
          const isExist = list.some((i) => i.id === item.id);

          return {
            [key]: isExist 
              ? list.filter((i) => i.id !== item.id) 
              : [...list, item],
          };
        }),
      },
    }),
    {
      name: 'user-favorites-storage', // Ключ в localStorage
      partialize: (state) => ({ 
        myMovies: state.myMovies, 
        myBooks: state.myBooks, 
        myGames: state.myGames 
      }), // Сохраняем только данные, не экшены
    }
  )
);

// Кастомный хук для удобного доступа к экшенам
export const useStoreActions = () => useStore((state) => state.actions);