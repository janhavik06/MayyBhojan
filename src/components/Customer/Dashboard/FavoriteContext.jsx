import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(meal) {
    setFavorites(prev => {
      const exists = prev.find(m => m.id === meal.id);
      if (exists) {
        return prev.filter(m => m.id !== meal.id);
      }
      return [...prev, meal];
    });
  }

  function isFavorite(id) {
    return favorites.some(m => m.id === id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
