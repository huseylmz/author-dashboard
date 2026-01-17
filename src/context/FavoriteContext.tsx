import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

type FavoriteContextType = {
  favoriteUsers: number[];
  toggleFavoriteUser: (id: number) => void;
  favoritePosts: number[];
  toggleFavoritePost: (id: number) => void;
};

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteUsers, setFavoriteUsers] = useState<number[]>(() => {
    const saved = localStorage.getItem("favoriteUsers");
    return saved ? JSON.parse(saved) : [];
  });

  const [favoritePosts, setFavoritePosts] = useState<number[]>(() => {
    const saved = localStorage.getItem("favoritePosts");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavoriteUser = (id: number) => {
    setFavoriteUsers((prev) => {
      const updated = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("favoriteUsers", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavoritePost = (id: number) => {
    setFavoritePosts((prev) => {
      const updated = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("favoritePosts", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <FavoriteContext.Provider value={{ favoriteUsers, toggleFavoriteUser, favoritePosts, toggleFavoritePost }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoriteProvider");
  return ctx;
};
